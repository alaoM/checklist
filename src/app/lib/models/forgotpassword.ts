import { sendResetEmail } from '../nodemailer';
import { User, findUserByEmail } from './signup';
import { randomUUID } from 'crypto';


export const sendResetLink = async (email: string): Promise<boolean> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = randomUUID();

  // Store the reset token in the database or send it via email to the user
  // For demonstration purposes, let's assume we're sending it via email
  const resetLink = `https://example.com/reset?token=${resetToken}`;
  await sendResetEmail(email, resetLink);

  return true;
};
