"use server";

import { prisma } from "@/lib/prisma";

export async function getCompanies(
  skip: number = 0,
  take: number = 10,
  filterBy?: string,
  filterValue?: string,
  sortCol: string = "CompanyName",
  sortType: "asc" | "desc" = "asc"
) {
  try {
    const orderBy = { [sortCol]: sortType };
    const where =
      filterBy && filterValue ? { [filterBy]: { equals: filterValue } } : {};
    const companies = await prisma.company.findMany({
      orderBy,
      skip,
      take,
      where
    });

    const total = await prisma.company.count();

    return {
      data: companies,
      total,
    };
  } catch (error) {
    console.log(error);

    return {
      data: [],
      total: 0,
    };
  }
}
