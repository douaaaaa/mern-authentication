import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../mailtrap/emailsTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "email verification",
    });
  } catch (error) {
    throw new Error(`Mailtrap, verify token: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "a2708953-1edc-4bad-936e-1bbf58174992",
      template_variables: {
        company_info_name: "Doua's Company",
        name: name,
        company_info_address: "Algeria",
        company_info_city: "Skikda",
        company_info_zip_code: "21001",
        company_info_country: "Skikda",
      },
    });
  } catch (error) {
    console.log("sending welcome email ", error);
    throw new Error(`Mailtrap, welcome email: ${error}`);
  }
};

export const resetPasswordEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "reset password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "password reset",
    });
  } catch (error) {
    throw new Error(`Mailtrap, reset password: ${error}`);
  }
};

export const resetPasswordSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "reset password successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "reset password success",
    });
  } catch (error) {
    throw new Error(`Mailtrap, password success: ${error}`);
  }
};
