import nodemailer from "nodemailer";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "Himanshu@nextauth.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      text: "Work with Auth in Next js ",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
