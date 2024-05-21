import bcrypt from 'bcrypt';
import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { randomUUID } from 'crypto';
import { isValidEmail, psd, validateAndSanitize } from '../validateandsanitize';
import { generateTokens } from '../jwt';

export interface User {
  fullName: string;
  email: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  password?: string;
}

type ValidationRule = (value: any) => string | null;

interface ValidationRules {
  [key: string]: ValidationRule[];
}

// Define custom validation and sanitization rules for each field
const validationRules: ValidationRules = {
  fullName: [
    (value: any) => {
      if (!value) {
        return 'Full name is required';
      }
      return null;
    },
  ],
  email: [isValidEmail],
  password: [
    psd
  ],
  // Add more fields and their validation rules as needed
};

export const createUser = async (fullName: string, email: string, password: string): Promise<User | { [key: string]: string }> => {
  const validationResult = validateAndSanitize({ fullName, email, password }, validationRules);
  if (!validationResult.isValid) {
    throw (validationResult.errors);
  }

  // Check if the user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = randomUUID();
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO users (fullName, userId, email, password) VALUES (?, ?, ?, ?)',
    [fullName, userId, email, hashedPassword]
  );




  const payload = {
    fullName, userId, email
  }

  const { accessToken, refreshToken } = generateTokens(payload);

  const user: User = {
    fullName,
    userId,
    email,
    accessToken,
    refreshToken,
  };

  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.execute<RowDataPacket[] & User[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows.length > 0 ? rows[0] : null;
};
