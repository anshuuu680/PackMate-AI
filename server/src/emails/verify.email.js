import { transporter } from "../config/nodemailer.config.js";

export const verifyEmail = async (to, otp) => {
  const mailOptions = {
    from: `"PackMate AI"`,
    to,
    subject: "Your OTP Code - PackMate AI",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7fb; padding: 40px 0;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(90deg, #4f46e5, #3b82f6); padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">PackMate AI</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <h2 style="color: #333333; margin-bottom: 20px;">Verify Your Email</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Use the OTP below to verify your email address. This code will expire in <b>10 minutes</b>.
              </p>
              <div style="display: inline-block; padding: 16px 30px; background: #f4f7fb; border: 2px dashed #4f46e5; border-radius: 8px; margin-bottom: 30px;">
                <span style="font-size: 28px; font-weight: bold; color: #4f46e5; letter-spacing: 4px;">
                  ${otp}
                </span>
              </div>
              <p style="color: #888888; font-size: 14px; margin-top: 10px;">
                Didn’t request this? Please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background: #f4f7fb; padding: 20px; text-align: center; color: #999999; font-size: 12px;">
              © ${new Date().getFullYear()} PackMate AI. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
