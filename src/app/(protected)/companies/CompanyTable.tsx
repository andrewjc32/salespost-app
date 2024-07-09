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

const CompanyTable = () => {
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

export default CompanyTable;

{/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-1">
                    COMPANY NAME
                  </th>
                  <th scope="col" className="px-2 py-1">
                    REGISTRATION DATE
                  </th>
                  <th scope="col" className="px-2 py-1">
                    CITY
                  </th>
                  <th scope="col" className="px-2 py-1">
                    COMPANIES HOUSE LINK
                  </th>
                  <th scope="col" className="px-2 py-1">
                    SIC (NATURE OF BUSINESS)
                  </th>
                  <th scope="col" className="px-2 py-1">
                    DIRECTORS
                  </th>
                  <th scope="col" className="px-2 py-1">
                    OPTION
                  </th>
                  <th scope="col" className="px-2 py-1">
                    SHOW PAGE
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company: any, idx: number) => (
                  <tr
                    id={idx.toString()}
                    className="border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {company.CompanyName}
                    </th>
                    <td className="px-2 py-1">{company.IncorporationDate}</td>
                    <td className="px-2 py-1">{company.PostTown}</td>
                    <td className="px-2 py-1">
                      <Link
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        href={company.URI as string}
                      >
                        View Profile
                      </Link>
                    </td>
                    <td className="px-2 py-1">{company.SicText_1}</td>
                    <td className="px-2 py-1">Directors</td>
                    <td className="px-2 py-1">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to Mail List
                        <svg
                          className="w-3 h-3 text-white me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-2 py-1">
                      <button
                        type="button"
                        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        View Company
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            {/* <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul> */}
