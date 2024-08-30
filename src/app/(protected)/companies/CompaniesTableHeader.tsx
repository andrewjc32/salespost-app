import { TableHead, TableHeadCell } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";

type SortType = "asc" | "desc";

type SortConfig = {
  key: string;
  direction: SortType;
};

type Props = {
  sortConfig: SortConfig;
  setSortConfig: Dispatch<SetStateAction<SortConfig>>;
};

const CompaniesTableHeader = ({ sortConfig, setSortConfig }: Props) => {
  const requestSort = (key: string) => {
    let direction: SortType = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
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
      <TableHeadCell className="px-2 py-3" onClick={() => requestSort("uri")}>
        COMPANIES HOUSE LINK{" "}
        {sortConfig.key === "uri" &&
          (sortConfig.direction === "asc" ? "▲" : "▼")}
      </TableHeadCell>
      <TableHeadCell className="px-2 py-3" onClick={() => requestSort("sic1")}>
        SIC (NATURE OF BUSINESS){" "}
        {sortConfig.key === "sic1" &&
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
