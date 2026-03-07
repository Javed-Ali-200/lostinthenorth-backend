import prisma from '../../config/prisma.js';
import { User, Prisma } from '@prisma/client';

/**
 * Find a user by email.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email },
    });
};

/**
 * Find a user by ID.
 */
export const findUserById = async (id: string): Promise<Partial<User> | null> => {
    return prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
};

/**
 * Update a user's password.
 */
export const updatePassword = async (id: string, hashedPassword: string): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
};
