import nodemailer, { Transport } from "nodemailer";
import Mailgen from "mailgen";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendMail = async (options: {
  email: string;
  mailgenContent: Mailgen.Content;
  subject: string;
}) => {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "QuickBite",
      link: "https://qb.com",
    },
  });

  const emailHTML = mailGenerator.generate(options.mailgenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const smtpConfig: SMTPTransport.Options = {
    host: process.env.SMTP_MAILTRAP_HOST,
    port: parseInt(process.env.SMTP_MAILTRAP_PORT!),
    auth: {
      user: process.env.SMTP_MAILTRAP_USER,
      pass: process.env.SMTP_MAILTRAP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const mail = {
    from: "qb@company.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    console.log(`Email service failed: ${err}`);
  }
};

export const generateEmailVerificationMailgenContent = (
  fullName: string,
  url: string
) => {
  return {
    body: {
      name: fullName,
      intro: "Welcome to QuiBite!",
      action: {
        instructions:
          "To verify your email address, please click on the button below:",
        button: {
          color: "orange",
          text: "Verify Email",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const generateResetForgottenPasswordMailgenContent = (
  fullName: string,
  url: string
) => {
  return {
    body: {
      name: fullName,
      intro: "Welcome to QuickBite!",
      action: {
        instructions:
          "To reset your password, please click on the button below:",
        button: {
          color: "red",
          text: "Reset password",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
