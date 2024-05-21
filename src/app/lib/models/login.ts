import bcrypt from 'bcrypt';
import pool from '../db';
import {  findUserByEmail } from './signup';
import { generateTokens } from '../jwt'; 
interface User {
  fullName: string;
  email: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  password?: string; 
}
 

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the user has a password property before comparing passwords
  if (!user.password) {
    throw new Error('User has no password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Incorrect password');
  }

  const { fullName, userId } = user;
  const payload = { fullName, userId, email };
  const { accessToken, refreshToken } = generateTokens(payload);

  return { ...payload, accessToken, refreshToken };
};
