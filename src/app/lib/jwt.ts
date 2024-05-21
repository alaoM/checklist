import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { generateAndPrintKeys } from './_hs';
// Load private and public keys from the generated values
const { publicKey, privateKey } = await generateAndPrintKeys();

 
// Set token expiration times
const accessTokenExpiration = '15m'; // 15 minutes
const refreshTokenExpiration = '7d'; // 7 days

// In-memory store for revoked tokens (replace with a database or cache)
const revokedTokens: Set<string> = new Set();

// Generate a secure random string for refresh token
const generateRefreshToken = () => crypto.randomBytes(64).toString('hex');

// Sign and return access and refresh tokens
export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: accessTokenExpiration });
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
};

// Verify and return payload from access token
const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    // Verify claims like issuer, audience, expiration, etc.
    return payload;
  } catch (err) {
    // Token is invalid
    return null;
  }
};

// Verify and return payload from refresh token
const verifyRefreshToken = (token: string) => {
  if (revokedTokens.has(token)) {
    // Refresh token has been revoked
    return null;
  }
  // Verify refresh token signature (no expiration check)
  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return payload;
  } catch (err) {
    // Refresh token is invalid
    return null;
  }
};

// Revoke a refresh token
const revokeRefreshToken = (token: string) => {
  revokedTokens.add(token);
};

// Example usage
const payload = { userId: 123 };
const { accessToken, refreshToken } = generateTokens(payload);

// Verify access token
const accessTokenPayload = verifyAccessToken(accessToken);
if (accessTokenPayload) {
  console.log('Access token is valid:', accessTokenPayload);
} else {
  console.log('Access token is invalid');
}

// Verify refresh token
const refreshTokenPayload = verifyRefreshToken(refreshToken);
if (refreshTokenPayload) {
  console.log('Refresh token is valid:', refreshTokenPayload);
} else {
  console.log('Refresh token is invalid');
}

// Revoke refresh token
revokeRefreshToken(refreshToken);
