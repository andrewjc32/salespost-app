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
      setCompanies(data);
      setTotal(total);
    };

    fetchCompanies();
  }, [page, limit]);

  return (
    <section className="p-3 sm:p-5">
      <div>
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/4">
              <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip="evenodd"
                    fill="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    className="-ml-1 mr-1.5 w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip="evenodd"
                      fill="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                  Actions
                </button>
                <div
                  id="actionsDropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mass Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete all
                    </a>
                  </div>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    fill="currentColor"
                  >
                    <path
                      fill="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip="evenodd"
                      fill="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                <div
                  id="filterDropdown"
                  className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Apple (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Microsoft (16)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Razor (49)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="nikon"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Nikon (12)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="benq"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      /{" "}
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        BenQ (74)
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
             <Table
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              hoverable
            >
              <TableHead>
                <TableHeadCell className="px-2 py-1">COMPANY NAME</TableHeadCell>
                <TableHeadCell className="px-2 py-1">REGISTRATION DATE</TableHeadCell>
                <TableHeadCell className="px-2 py-1">CITY</TableHeadCell>
                <TableHeadCell className="px-2 py-1">COMPANIES HOUSE LINK</TableHeadCell>
                <TableHeadCell className="px-2 py-1">SIC (NATURE OF BUSINESS)</TableHeadCell>
                <TableHeadCell className="px-2 py-1">DIRECTORS</TableHeadCell>
                <TableHeadCell className="px-2 py-1 min-w-48">OPTION</TableHeadCell>
                <TableHeadCell className="px-2 py-1 min-w-48">SHOW PAGE</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {companies?.map((company: any, idx: number) => (
                  <TableRow
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
                      {company.CompanyName}
                    </TableCell>
                    <TableCell className="px-2 py-1">{company.IncorporationDate}</TableCell>
                    <TableCell className="px-2 py-1">
                      { company.PostTown }
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <Link
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        href={company.URI as string}
                      >
                        View Profile
                      </Link>
                    </TableCell>
                    <TableCell className="px-2 py-1">{company.SicText_1}</TableCell>
                    <TableCell className="px-2 py-1">Directors</TableCell>
                    <TableCell className="px-2 py-1">
                      <Button className="text-sm font-medium text-center inline-flex items-center text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                        <div className="flex justify-between">
                          Add to Mail List
                          <FaEnvelope className="ml-2 h-4 w-4" />
                        </div>
                      </Button>
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <Button className="max-h-18 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
                        View Company
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
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
