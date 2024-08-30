"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Prisma, companies } from '@prisma/client';

// export async function getCompanies(
//   skip: number = 0,
//   take: number = 10,
//   filters: Prisma.companiesWhereInput,
//   sortConfig: any
// ) {
//   try {
//     // Construct the WHERE condition if filters are provided
//     let whereCondition = Prisma.empty;
//     const filterEntries = Object.entries(filters);

//     if (filterEntries.length > 0) {
//       whereCondition = Prisma.sql`WHERE ${Prisma.join(
//         filterEntries.map(([key, value]) => Prisma.sql`${Prisma.raw(key)} = ${value}`),
//         ' AND '
//       )}`;
//     }

//     // Construct the full query
//     const query = Prisma.sql`
//       SELECT c.company_name, 
//        c.incorporation_date, 
//        c.uri, 
//        c.post_town, 
//        STRING_AGG(CONCAT(o.forenames, ' ', o.surname), ', ') AS officers,
//        s.sic_text
//        FROM companies c
//       JOIN company_officer_appointments coa
//       ON c.company_number = coa.company_number
//       JOIN officers o 
//       ON coa.person_number = o.person_number
//       JOIN sic_codes s
//       ON c.sic1 = s.sic_id
//       ${whereCondition}
//       GROUP BY c.company_number, c.company_name, c.incorporation_date, c.uri, c.post_town, s.sic_text
//       ORDER BY ${Prisma.raw(sortConfig.key)} ${Prisma.raw(sortConfig.direction)}
//       OFFSET ${skip} LIMIT ${take}
//     `;

//     const result = await prisma.$queryRaw(query);

//     const total = await prisma.companies.count({
//       where: filters
//     });

//     return {
//       data: result, 
//       total
//     };
//   } catch (error) {
//     console.error('Error fetching companies with officer appointments and SIC codes:', error);

//     return {
//       data: [],
//       total: 0
//     };
//   }
//}

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
      select: {
        company_name: true,
        post_town: true,
        uri: true,
        incorporation_date: true,
        sic_codes_companies_sic1Tosic_codes: {
          select: {
            sic_text: true  
          }
        },
        company_officer_appointments: {
          include: {
            officers: {
              select: {
                surname: true,
                forenames: true
              }
            }
          }
        }
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
