import User from "@/models/user.models";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken },
        { verifyTokenExpiry: Date.now() + 3600000 },
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgotPasswordToken: hashedToken },
        { forgotPasswordTokenExpiry: Date.now() + 3600000 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const actionUrl = `${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${hashedToken}`;

    const mailOptions = {
      from: "Himanshu@nextauth.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      text: "Work with Auth in Next js ",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailType === "VERIFY" ? "Verify Your Account" : "Reset Your Password"}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7f9; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
              
              <!-- Header -->
              <tr>
                <td align="center" style="background-color: #000000; padding: 40px 20px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">
                    NextAuth<span style="color: #0070f3;">.ai</span>
                  </h1>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td align="center" style="padding: 40px 30px;">
                  <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">
                    ${emailType === "VERIFY" ? "Verify your email address" : "Reset your password"}
                  </h2>
                  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    ${
                      emailType === "VERIFY"
                        ? "Welcome! You're almost ready to get started. Please click the button below to verify your email address and activate your account."
                        : "We received a request to reset your password. If you didn't make this request, you can safely ignore this email."
                    }
                  </p>
                  
                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" bgcolor="#0070f3" style="border-radius: 6px;">
                        <a href="${actionUrl}" style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px;">
                          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Fallback Link -->
                  <p style="color: #777777; font-size: 14px; line-height: 1.5; margin: 40px 0 0 0; word-break: break-all;">
                    Or copy and paste this link into your browser:<br>
                    <a href="${actionUrl}" style="color: #0070f3; text-decoration: underline;">${actionUrl}</a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f9fafb; padding: 24px; border-top: 1px solid #eeeeee;">
                  <p style="color: #999999; font-size: 12px; line-height: 1.5; margin: 0;">
                    This email was sent to you because an action was triggered on your account.<br>
                    © ${new Date().getFullYear()} NextAuth.ai. All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
