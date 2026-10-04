import { render } from "react-email";
import { mailtrapClient } from "@/lib/mailtrap";
import VerificationEmail from "../../emails/VerificationEmail";
import { APIResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<APIResponse> {
  try {
    const emailHtml = await render(
      <VerificationEmail username={username} otp={verifyCode} />,
    );

    const options = {
      from: '"MystryMessage" <onboarding@mystrymessage.com>',
      to: email,
      subject: "MystryMessage | Verify your account",
      html: emailHtml,
    };

    await mailtrapClient.sendMail(options);

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
