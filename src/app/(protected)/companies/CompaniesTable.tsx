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
  Spinner
} from "flowbite-react";
import { useState, useEffect } from "react";
import { getCompanies } from "@/actions/companiesActions";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { companies } from "@prisma/client";

type SortType = 'asc' | 'desc';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterBy, setFilterBy] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [sortCol, setSortCol] = useState('companyname');
  const [sortType, setSortType] = useState<SortType>('asc');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      const { data, total } = await getCompanies((page - 1) * limit, limit, filterBy, filterValue, sortCol, sortType);
      
      console.log(data);

      setCompanies(data);
      setTotal(total);

      setIsLoading(false);
    };

    fetchCompanies();
  }, [page, limit, sortCol, filterBy, filterValue]);

  const filter = (filterCategory: string | null, filterValue: string | null) => {
    setFilterBy(filterCategory);
    setFilterValue(filterValue);
  }

  if(isLoading)
    return(<section className="p-3 sm:p-5">
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
                  <DropdownItem onClick={() => filter('dissolutiondate', 'Active')}>Active</DropdownItem>
                  <DropdownItem onClick={() => filter('dissolutiondate', 'Dissolved')}>Dissolved</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={() => filter(null, null)} className="text-red-600">Reset</DropdownItem>
                </Dropdown>
              </div>
              <div>
                <Dropdown color="light" label="Sort By">
                  <DropdownItem id="sortby1" onClick={() => setSortCol('companyname')}>Company Name</DropdownItem>
                  <DropdownItem id="sortby2" onClick={() => setSortCol('incorporationdate')}>Registration Date</DropdownItem>
                  <DropdownItem id="sortby3" onClick={() => setSortCol('sic1')}>SIC</DropdownItem>
                  <DropdownItem id="sortby4" onClick={() => setSortCol('posttown')}>City</DropdownItem>
                  <DropdownItem id="sortby5" onClick={() => setSortCol('companyname')}>Directors</DropdownItem>
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
                <TableHeadCell className="px-2 py-3">
                  COMPANY NAME
                </TableHeadCell>
                <TableHeadCell className="px-2 py-3">
                  REGISTRATION DATE
                </TableHeadCell>
                <TableHeadCell className="px-2 py-3">CITY</TableHeadCell>
                <TableHeadCell className="px-2 py-3">
                  COMPANIES HOUSE LINK
                </TableHeadCell>
                <TableHeadCell className="px-2 py-3">
                  SIC (NATURE OF BUSINESS)
                </TableHeadCell>
                <TableHeadCell className="px-2 py-3">DIRECTORS</TableHeadCell>
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
            />
          </nav>
        </div>
      </div>
    </section>)
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
                    <DropdownItem onClick={() => filter('dissolutiondate', 'Active')}>Active</DropdownItem>
                    <DropdownItem onClick={() => filter('dissolutiondate', 'Dissolved')}>Dissolved</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={() => filter(null, null)} className="text-red-600">Reset</DropdownItem>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown color="light" label="Sort By">
                    <DropdownItem id="sortby1" onClick={() => setSortCol('companyname')}>Company Name</DropdownItem>
                    <DropdownItem id="sortby2" onClick={() => setSortCol('incorporationdate')}>Registration Date</DropdownItem>
                    <DropdownItem id="sortby3" onClick={() => setSortCol('sic1')}>SIC</DropdownItem>
                    <DropdownItem id="sortby4" onClick={() => setSortCol('posttown')}>City</DropdownItem>
                    <DropdownItem id="sortby5" onClick={() => setSortCol('companyname')}>Directors</DropdownItem>
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
                  <TableHeadCell className="px-2 py-3">
                    COMPANY NAME
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3">
                    REGISTRATION DATE
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3">CITY</TableHeadCell>
                  <TableHeadCell className="px-2 py-3">
                    COMPANIES HOUSE LINK
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3">
                    SIC (NATURE OF BUSINESS)
                  </TableHeadCell>
                  <TableHeadCell className="px-2 py-3">DIRECTORS</TableHeadCell>
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
                        {company.companyname}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        {company.incorporationdate?.toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        {company.posttown}
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
                        {company.sic_codes_companies_sic1Tosic_codes.sic_text}
                      </TableCell>
                      <TableCell className="px-2 py-1">Directors</TableCell>
                      <TableCell className="px-2 py-1">
                        <Button size="sm" className="text-sm font-medium text-center inline-flex items-center text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                          <div className="flex justify-between">
                            Add to Mail List
                            <FaEnvelope className="ml-2 h-4 w-4" />
                          </div>
                        </Button>
                      </TableCell>
                      <TableCell className="px-2 py-1">
                        <Button size="sm" className="max-h-18 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
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
