export const verifiedEmailTemplate = async (to, fullName) => {
  const mailOptions = {
    from: `"PackMate AI" <ap214893@gmail.com>`,
    to,
    subject: "Email Verified Successfully - PackMate AI",
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
              <h2 style="color: #333333; margin-bottom: 20px;">Email Verified Successfully!</h2>
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Hello <b>${fullName}</b>, your email has been successfully verified. 🎉
              </p>
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                You can now enjoy full access to all PackMate AI features.
              </p>
              <a href="${process.env.FRONTEND_URL || "#"}" target="_blank"
                style="display: inline-block; padding: 14px 28px; background: #4f46e5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px;">
                Go to Dashboard
              </a>
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
