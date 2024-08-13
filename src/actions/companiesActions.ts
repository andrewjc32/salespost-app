"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Prisma, companies } from '@prisma/client';

export async function getCompanies(
  skip: number = 0,
  take: number = 10,
  filters: Prisma.companiesWhereInput,
  sortConfig: any
) {
  try {
    const whereCompany = Prisma.validator<Prisma.companiesWhereInput>()({ ...filters });
    const orderBy = { [sortConfig.key]: sortConfig.direction };

    const companies = await prisma.companies.findMany({
      orderBy,
      skip,
      take,
      where: whereCompany,
      include: {
        sic_codes_companies_sic1Tosic_codes: true
      }
    });

    const total = await prisma.companies.count({
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
