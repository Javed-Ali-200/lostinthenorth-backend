import bcrypt from 'bcryptjs';
import { findUserByEmail, findUserById, updatePassword } from './admin.repository.js';
import { generateToken } from '../../utils/jwt.js';
import { AppError } from '../../middlewares/error.middleware.js';
import prisma from '../../config/prisma.js';
import { User } from '@prisma/client';

export interface LoginResult {
    token: string;
    admin: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
}

/**
 * Validate admin credentials and return a JWT token.
 */
export const loginAdmin = async (email: string, password: string): Promise<LoginResult> => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError('Invalid email or password.', 401);
    }

    if (user.role !== 'ADMIN') {
        throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid email or password.', 401);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    const admin = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    return { token, admin };
};

/**
 * Get full admin profile by ID.
 */
export const getAdminProfile = async (id: string): Promise<Partial<User>> => {
    const admin = await findUserById(id);
    if (!admin) {
        throw new AppError('Admin not found.', 404);
    }
    return admin;
};

/**
 * Change admin password safely.
 */
export const changeAdminPassword = async (id: string, oldPassword: string, newPassword: string): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new AppError('Admin not found.', 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError('Current password is incorrect.', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return updatePassword(id, hashedPassword);
};
