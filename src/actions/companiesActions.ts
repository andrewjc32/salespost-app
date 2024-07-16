"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Prisma, Company } from '@prisma/client';

export async function getCompanies(
  skip: number = 0,
  take: number = 10,
  filters: Prisma.CompanyWhereInput,
  sortConfig: any
) {
  try {
    const whereCompany = Prisma.validator<Prisma.CompanyWhereInput>()({ ...filters });
    const orderBy = { [sortConfig.key]: sortConfig.direction };

    const companies = await prisma.company.findMany({
      orderBy,
      skip,
      take,
      where: whereCompany,
      include: {
        sic_codes_companies_sic1Tosic_codes: true
      }
    });

    const total = await prisma.company.count({
      where: whereCompany
    });

    return {
      data: companies, 
      total
    };
  } catch(error) {
    console.log(error);

    return {
      data: [],
      total: 0
    };
  }
}
