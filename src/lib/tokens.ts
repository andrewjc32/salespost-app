import { TokenType } from '@prisma/client'
import crypto from 'crypto';
import { prisma } from './prisma';

export async function getTokenByEmail(email: string) {
    try {
        return prisma.token.findFirst({
            where: {
                email
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTokenByToken(token: string) {
    try {
        return prisma.token.findFirst({
            where: {
                token
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function generateToken(email: string, type: TokenType) {
    const randomBuffer = new Uint8Array(48);
    crypto.getRandomValues(randomBuffer);
    const token = Array.from(randomBuffer, byte => byte.toString(16).padStart(2, '0')).join('');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const existingToken = await getTokenByEmail(email);

    if(existingToken) {
        await prisma.token.delete({
            where: {
                id: existingToken.id
            }
        });
    }

    return prisma.token.create({
        data: {
            email,
            token,
            type,
            expires
        }
    });
}