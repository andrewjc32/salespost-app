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
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Spinner,
  FlowbitePaginationTheme,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { getCompanies } from "@/actions/companiesActions";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { Prisma, companies } from "@prisma/client";

type SortType = "asc" | "desc";

const customTheme: FlowbitePaginationTheme = {
  base: "",
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      active:
        "bg-red-50 text-red-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
};

const CompaniesTable = () => {
  const [companies, setCompanies] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Prisma.companiesWhereInput>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortType;
  }>({ key: "company_name", direction: "asc" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      const { data, total } = await getCompanies(
        (page - 1) * limit,
        limit,
        filters,
        sortConfig
      );

      console.log(data);

      setCompanies(data);
      setTotal(total);

      setIsLoading(false);
    };

    fetchCompanies();
  }, [page, limit, filters, sortConfig]);

  const filterStatus = (active: boolean | null) => {
    if (active) setFilters({ ...filters, dissolution_date: null });
    else if (active === false)
      setFilters({ ...filters, dissolution_date: { not: null } });
    else {
      const { dissolution_date, ...restOfFilters } = filters;
      setFilters(restOfFilters);
    }
  };

  const requestSort = (key: string) => {
    let direction: SortType = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (isLoading)
    return (
      <section className="p-3 sm:p-5">
        <div>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4">
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
              <div className="flex items-center space-x-4">
                <div>
                <Dropdown color="light" label="Status">
                    <DropdownItem onClick={() => filterStatus(true)}>
                      Active
                    </DropdownItem>
                    <DropdownItem onClick={() => filterStatus(false)}>
                      Dissolved
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                      onClick={() => filterStatus(null)}
                      className="text-red-600"
                    >
                      Reset
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                hoverable
              >
                <TableHead>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("company_name")}
                  >
                    COMPANY NAME{" "}
                    {sortConfig.key === "company_name" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("incorporation_date")}
                  >
                    REGISTRATION DATE{" "}
                    {sortConfig.key === "incorporation_date" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("post_town")}
                  >
                    CITY{" "}
                    {sortConfig.key === "post_town" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("uri")}
                  >
                    COMPANIES HOUSE LINK{" "}
                    {sortConfig.key === "uri" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("sic1")}
                  >
                    SIC (NATURE OF BUSINESS){" "}
                    {sortConfig.key === "sic1" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3"
                    onClick={() => requestSort("name")}
                  >
                    DIRECTORS
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3 min-w-48">
                    OPTION
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3 min-w-48">
                    SHOW PAGE
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="flex flex-wrap gap-2">
                      <Spinner color="failure" />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
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
                theme={customTheme}
              />
            </nav>
          </div>
        </div>
      </section>
    );
  else
    return (
      <section className="p-3 sm:p-5">
        <div>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4">
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
              <div className="flex items-center space-x-4">
                <div>
                  <Dropdown color="light" label="Status">
                    <DropdownItem onClick={() => filterStatus(true)}>
                      Active
                    </DropdownItem>
                    <DropdownItem onClick={() => filterStatus(false)}>
                      Dissolved
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                      onClick={() => filterStatus(null)}
                      className="text-red-600"
                    >
                      Reset
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                hoverable
              >
                <TableHead>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("company_name")}
                  >
                    COMPANY NAME{" "}
                    {sortConfig.key === "company_name" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("incorporation_date")}
                  >
                    REGISTRATION DATE{" "}
                    {sortConfig.key === "incorporation_date" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("post_town")}
                  >
                    CITY{" "}
                    {sortConfig.key === "post_town" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("uri")}
                  >
                    COMPANIES HOUSE LINK{" "}
                    {sortConfig.key === "uri" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("sic1")}
                  >
                    SIC (NATURE OF BUSINESS){" "}
                    {sortConfig.key === "sic1" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </TableHeadCell>
                  <TableHeadCell
                    className="px-2 py-3 cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    DIRECTORS
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3 min-w-48">
                    OPTION
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3 min-w-48">
                    SHOW PAGE
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {companies.map((company: any, idx: number) => (
                    <TableRow
                      key={idx}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
                        {company.company_name}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        {company.incorporation_date?.toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        {company.post_town}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <Link
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          href={company.uri as string}
                        >
                          View Profile
                        </Link>
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        {company.sic_codes_companies_sic1Tosic_codes?.sic_text}
                      </TableCell>
                      <TableCell className="px-2 py-1">Directors</TableCell>
                      <TableCell className="px-2 py-1">
                        <Button
                          size="sm"
                          className="text-sm font-medium text-center inline-flex items-center text-white bg-orange-600 rounded-lg hover:bg-orange-700"
                        >
                          <div className="flex justify-between">
                            Add to Mail List
                            <FaEnvelope className="ml-2 h-4 w-4" />
                          </div>
                        </Button>
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <Button
                          size="sm"
                          className="max-h-18 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
                        >
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
                theme={customTheme}
              />
            </nav>
          </div>
        </div>
      </section>
    );
};

export default CompaniesTable;
