'use server'

import { prisma } from '@/lib/prisma';

export async function getCompanies(skip: number = 0, take: number = 10) {
    try {
        const companies = await prisma.company.findMany({
            skip,
            take
        });

        const total = await prisma.company.count();

        return {
            data: companies,
            total
        }
    } catch (error) {
        console.log(error);

        return {
            data: [],
            total: 0
        }
    }
}