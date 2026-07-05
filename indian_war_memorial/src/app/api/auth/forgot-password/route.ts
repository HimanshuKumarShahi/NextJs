import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Generic success message (security: never reveal if email exists) ─────────
const SUCCESS_MESSAGE =
  'If that email is registered, a password reset link has been sent.';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ForgotPasswordRequestBody {
  email?: unknown;
}

// ─── Nodemailer transporter (created lazily per request) ──────────────────────
function createTransporter(): nodemailer.Transporter {
  const host = process.env.MAILTRAP_HOST;
  const port = parseInt(process.env.MAILTRAP_PORT ?? '587', 10);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'Mailtrap configuration is incomplete. Check MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS env vars.',
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
    // Mailtrap sandbox does not need TLS — safe for both port 25 and 587
    secure: port === 465,
  });
}

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmailHtml(resetUrl: string, recipientName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7f0000 0%,#b22222 50%,#7f0000 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffd700;font-size:22px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                🪖 Indian War Memorial
              </h1>
              <p style="margin:6px 0 0;color:#f0c040;font-size:13px;letter-spacing:1px;">
                Honoring the Brave
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#e0e0e0;font-size:20px;font-weight:600;">
                Password Reset Request
              </h2>
              <p style="margin:0 0 12px;color:#aaaaaa;font-size:15px;line-height:1.6;">
                Hello <strong style="color:#e0e0e0;">${recipientName}</strong>,
              </p>
              <p style="margin:0 0 24px;color:#aaaaaa;font-size:15px;line-height:1.6;">
                We received a request to reset the password for your account. Click the button below to create a new password. This link will expire in <strong style="color:#ffd700;">1 hour</strong>.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#b22222,#7f0000);border-radius:6px;">
                    <a href="${resetUrl}"
                       style="display:inline-block;padding:14px 36px;color:#ffd700;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#888888;font-size:13px;line-height:1.6;">
                If the button above doesn't work, copy and paste the link below into your browser:
              </p>
              <p style="margin:0 0 24px;word-break:break-all;">
                <a href="${resetUrl}" style="color:#ffd700;font-size:13px;">${resetUrl}</a>
              </p>

              <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 24px;" />

              <p style="margin:0;color:#666666;font-size:13px;line-height:1.6;">
                If you did not request a password reset, please ignore this email. Your password will remain unchanged and your account is secure.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0d0d;padding:20px 40px;text-align:center;border-top:1px solid #2a2a2a;">
              <p style="margin:0;color:#555555;font-size:12px;">
                © ${new Date().getFullYear()} Indian War Memorial. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Plain-text fallback ──────────────────────────────────────────────────────
function buildEmailText(resetUrl: string, recipientName: string): string {
  return [
    'Indian War Memorial – Password Reset',
    '=====================================',
    '',
    `Hello ${recipientName},`,
    '',
    'We received a request to reset the password for your account.',
    'Click the link below (or paste it into your browser) to reset your password.',
    'This link will expire in 1 hour.',
    '',
    resetUrl,
    '',
    'If you did not request this, please ignore this email.',
    '',
    '© ' + new Date().getFullYear() + ' Indian War Memorial',
  ].join('\n');
}

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Generic success response — always returned so attackers cannot enumerate emails
  const secureSuccess = NextResponse.json(
    { success: true, message: SUCCESS_MESSAGE },
    { status: 200 },
  );

  try {
    // ── 1. Parse & validate body ───────────────────────────────────────────────
    let body: ForgotPasswordRequestBody;

    try {
      body = (await request.json()) as ForgotPasswordRequestBody;
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid or malformed JSON body.' },
        { status: 400 },
      );
    }

    const { email } = body;

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    // ── 2. Connect to database ─────────────────────────────────────────────────
    await connectToDatabase();

    // ── 3. Look up user (silently return success if not found) ────────────────
    const user = await User.findOne({ email: normalizedEmail }).select(
      'name email',
    );

    if (!user) {
      // Security: do NOT reveal that the email doesn't exist
      console.info(
        `[POST /api/auth/forgot-password] No account found for email: ${normalizedEmail}`,
      );
      return secureSuccess;
    }

    // ── 4. Generate reset token ────────────────────────────────────────────────
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + TOKEN_EXPIRY_MS);

    // ── 5. Persist token on the user document ──────────────────────────────────
    // These fields must exist on the User model / schema.
    // If they don't yet, add them: resetToken: String, resetTokenExpiry: Date
    await User.findByIdAndUpdate(user._id, {
      $set: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // ── 6. Build reset URL ─────────────────────────────────────────────────────
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '');
    const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

    // ── 7. Send email ──────────────────────────────────────────────────────────
    const transporter = createTransporter();

    const fromAddress =
      process.env.EMAIL_FROM ?? 'Indian War Memorial <noreply@indianwarmemorial.in>';

    await transporter.sendMail({
      from: fromAddress,
      to: `${user.name as string} <${user.email as string}>`,
      subject: '🔐 Reset Your Password – Indian War Memorial',
      text: buildEmailText(resetUrl, user.name as string),
      html: buildEmailHtml(resetUrl, user.name as string),
    });

    console.info(
      `[POST /api/auth/forgot-password] Reset email sent to: ${normalizedEmail}`,
    );

    // ── 8. Return generic success ──────────────────────────────────────────────
    return secureSuccess;
  } catch (error: unknown) {
    console.error('[POST /api/auth/forgot-password] Unhandled error:', error);

    // Still return the generic message — do not leak internal details
    return secureSuccess;
  }
}
