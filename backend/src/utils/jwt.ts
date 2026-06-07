import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/env.js';

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

/**
 * Generate a signed JWT token.
 * @param payload - Data to encode
 * @returns Signed JWT token
 */
export const generateToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: (env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, env.JWT_SECRET, options);
};

/**
 * Generate a refresh token.
 * @param payload - Data to encode
 * @returns Signed refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: '7d', // Refresh token valid for 7 days
    };
    return jwt.sign(payload, env.JWT_SECRET, options);
};

/**
 * Verify a refresh token.
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

/**
 * Verify and decode a JWT token.
 * @param token
 * @returns Decoded payload
 */
export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
