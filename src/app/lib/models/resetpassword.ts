import bcrypt from 'bcrypt';
import pool from '../db';
import {  ResultSetHeader } from 'mysql2';

export const resetPassword = async (userId: string, newPassword: string): Promise<boolean> => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE users SET password = ? WHERE userId = ?',
    [hashedPassword, userId]
  );

  return result.affectedRows > 0;
};
