import { TableHead, TableHeadCell } from "flowbite-react";
import React, { useState } from "react";
import { useSortBy } from 'react-instantsearch';

type SortType = "asc" | "desc";

const CompaniesTableHeader = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortType;
  }>({ key: "company_name", direction: "asc" });
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: 'Company Name (asc)', value: 'companies_companyName_asc' },
      { label: 'Company Name (desc)', value: 'companies_companyName_desc' },
      { label: 'Registration Date (asc)', value: 'companies_registrationDate_asc' },
      { label: 'Registration Date (desc)', value: 'companies_registrationDate_desc' },
      { label: 'City (asc)', value: 'companies_postTown_asc' },
      { label: 'City (desc)', value: 'companies_postTown_desc' },
      { label: 'SIC (asc)', value: 'companies_sicText_asc' },
      { label: 'SIC (desc)', value: 'companies_sicText_desc' },
    ],
  });

  const requestSort = (key: string) => {
    let direction: SortType = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    if(key == 'uri' || key == 'name')
      return

    let sortValue = key + direction;
    refine(sortValue);
  };

  return (
    <TableHead>
      <TableHeadCell
        className="px-2 py-3"
        onClick={() => requestSort("companies_companyName_")}
      >
        COMPANY NAME{" "}
        {sortConfig.key === "companies_companyName_" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell
        className="px-2 py-3"
        onClick={() => requestSort("companies_registrationDate_")}
      >
        REGISTRATION DATE{" "}
        {sortConfig.key === "companies_registrationDate_" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell
        className="px-2 py-3"
        onClick={() => requestSort("companies_postTown_")}
      >
        CITY{" "}
        {sortConfig.key === "companies_postTown_" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell className="px-2 py-3" onClick={() => requestSort("uri")}>
        COMPANIES HOUSE LINK{" "}
        {sortConfig.key === "uri" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell className="px-2 py-3" onClick={() => requestSort("companies_sicText_")}>
        SIC (NATURE OF BUSINESS){" "}
        {sortConfig.key === "companies_sicText_" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell className="px-2 py-3" onClick={() => requestSort("name")}>
        DIRECTORS
      </TableHeadCell>
      <TableHeadCell className="px-2 py-3 min-w-48">OPTION</TableHeadCell>
      <TableHeadCell className="px-2 py-3 min-w-48">SHOW PAGE</TableHeadCell>
    </TableHead>
  );
};

export default CompaniesTableHeader;
