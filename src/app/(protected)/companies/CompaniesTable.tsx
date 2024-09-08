"use client";

import { Table, Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";
import { useState, useEffect } from "react";
import CompaniesTableHeader from "./CompaniesTableHeader";
import CompaniesTableBody from "./CompaniesTableBody";
import CompaniesTableFooter from "./CompaniesTableFooter";
import SearchInput from "./SearchInput";
import { searchClient } from "@/lib/searchClient";
import { InstantSearch, Configure } from "react-instantsearch";

type SortType = "asc" | "desc";

const CompaniesTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortType;
  }>({ key: "company_name", direction: "asc" });
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className="p-3 sm:p-5">
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName="companies"
          insights={true}
        >
          <Configure hitsPerPage={limit} page={page - 1} />
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div>
                <SearchInput />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <Dropdown color="light" label="Status">
                    <DropdownItem onClick={() => console.log(true)}>
                      Active
                    </DropdownItem>
                    <DropdownItem onClick={() => console.log(false)}>
                      Dissolved
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                      onClick={() => console.log(null)}
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
                <CompaniesTableHeader
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                />
                <CompaniesTableBody />
              </Table>
            </div>
            <CompaniesTableFooter limit={limit} />
          </div>
        </InstantSearch>
      </div>
    </section>
  );
};

export default CompaniesTable;
