"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Prisma, companies } from '@prisma/client';

export async function getCompanies(
  skip: number = 0,
  take: number = 10,
  filterBy: string | null,
  filterValue: string | null,
  sortCol: string = "companyname",
  sortType: 'asc' | 'desc' = "asc"
) {
  try {
    const orderBy = { [sortCol]: sortType };
    const where =
      filterBy && filterValue ? { [filterBy]: { equals: filterValue } } : {};

    const companies = await prisma.companies.findMany({
      orderBy,
      skip,
      take,
      where,
      include: {
        sic_codes_companies_sic1Tosic_codes: true
      }
    });

    const total = await prisma.companies.count();

    return {
      data: companies, 
      total
    };
  } catch (error) {
    console.log(error);

    return {
      data: [],
      total: 0
    };
  }
}
