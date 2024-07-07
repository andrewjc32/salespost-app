"use client";

import {
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableCell,
  TableRow,
  Pagination,
  Button,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { getCompanies } from "@/actions/companiesActions";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, total } = await getCompanies((page - 1) * limit, limit);
      console.log(data);
      setCompanies(data);
      setTotal(total);
    };

    fetchCompanies();
  }, [page, limit]);

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="overflow-x-auto">
            <Table
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              hoverable
            >
              <TableHead>
                <TableHeadCell>COMPANY NAME</TableHeadCell>
                <TableHeadCell>REGISTRATION DATE</TableHeadCell>
                <TableHeadCell>CITY</TableHeadCell>
                <TableHeadCell>COMPANIES HOUSE LINK</TableHeadCell>
                <TableHeadCell>SIC (NATURE OF BUSINESS)</TableHeadCell>
                <TableHeadCell>DIRECTORS</TableHeadCell>
                <TableHeadCell>OPTION</TableHeadCell>
                <TableHeadCell>SHOW PAGE</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {companies?.map((company: any, idx: number) => (
                  <TableRow
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {company.CompanyName}
                    </TableCell>
                    <TableCell>{company.IncorporationDate}</TableCell>
                    <TableCell>
                      {company.RegAddress?.PostTown
                        ? company.RegAddress?.PostTown
                        : company.CountryOfOrigin}
                    </TableCell>
                    <TableCell>
                      <Link
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        href={company.URI as string}
                      >
                        View Profile
                      </Link>
                    </TableCell>
                    <TableCell>{company.SICCode?.SicText_1}</TableCell>
                    <TableCell>Directors</TableCell>
                    <TableCell>
                      <Button className="bg-red-700">
                        <div className="max-h-18 text-sm font-medium text-white">
                          Add to Mail List
                          <FaEnvelope className="mr-2 h-5 w-5" />
                        </div>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button>
                        <div className="max-h-18 text-sm font-medium text-white">
                          View Company
                        </div>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {page * limit - limit + 1 + " - " + page * limit}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {total}
                </span>
              </span>
            </div>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
              onPageChange={setPage}
            />
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CompaniesTable;
