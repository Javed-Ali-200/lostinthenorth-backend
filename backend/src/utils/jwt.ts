import jwt from 'jsonwebtoken';
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
    return jwt.sign(payload, env.JWT_SECRET as any, { expiresIn: env.JWT_EXPIRES_IN });
};

/**
 * Verify and decode a JWT token.
 * @param token
 * @returns Decoded payload
 */
export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
