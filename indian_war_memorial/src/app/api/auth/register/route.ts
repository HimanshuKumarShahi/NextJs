import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';

// ─── Constants ────────────────────────────────────────────────────────────────
const SALT_ROUNDS = 12;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

// ─── Types ────────────────────────────────────────────────────────────────────
interface RegisterRequestBody {
  name?: unknown;
  email?: unknown;
  password?: unknown;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ success: false, message }, { status });
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // ── 1. Parse body ──────────────────────────────────────────────────────────
    let body: RegisterRequestBody;

    try {
      body = (await request.json()) as RegisterRequestBody;
    } catch {
      return errorResponse('Invalid or malformed JSON body.', 400);
    }

    const { name, email, password } = body;

    // ── 2. Presence validation ─────────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return errorResponse('Name is required.', 400);
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return errorResponse('Email is required.', 400);
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      return errorResponse('Password is required.', 400);
    }

    // ── 3. Format & length validation ─────────────────────────────────────────
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      return errorResponse('Name must be at least 2 characters long.', 400);
    }

    if (trimmedName.length > 100) {
      return errorResponse('Name must not exceed 100 characters.', 400);
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return errorResponse('Please provide a valid email address.', 400);
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return errorResponse(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
        400,
      );
    }

    if (password.length > 128) {
      return errorResponse('Password must not exceed 128 characters.', 400);
    }

    // ── 4. Connect to database ─────────────────────────────────────────────────
    await connectToDatabase();

    // ── 5. Duplicate email check ───────────────────────────────────────────────
    const existingUser = await User.findOne({ email: normalizedEmail })
      .select('_id')
      .lean();

    if (existingUser) {
      return errorResponse(
        'An account with this email already exists. Please sign in or use a different email.',
        409,
      );
    }

    // ── 6. Hash password ───────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // ── 7. Persist new user ────────────────────────────────────────────────────
    await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'USER',
    });

    // ── 8. Success ─────────────────────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully. You can now sign in.',
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('[POST /api/auth/register] Unhandled error:', error);

    // Mongoose duplicate-key error — race-condition safety net
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      return errorResponse(
        'An account with this email already exists.',
        409,
      );
    }

    return errorResponse(
      'An unexpected server error occurred. Please try again later.',
      500,
    );
  }
}
