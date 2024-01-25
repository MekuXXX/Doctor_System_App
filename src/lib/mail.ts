import nodemailer from "nodemailer";
const domain = process.env.NEXT_PUBLIC_APP_URL;

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Replace with your SMTP credentials

export const sendEmail = async (data: EmailPayload) => {
  const smtpOptions = {
    service: "gmail",
    auth: {
      user: process.env.SMTP_FROM_EMAIL,
      pass: process.env.SMTP_FROM_PASS,
    },
  };

  const mailObject = {
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  };

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    ...mailObject,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail({
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
