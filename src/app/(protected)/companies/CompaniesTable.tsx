"use client";

import { Table, Dropdown, DropdownItem, DropdownDivider, Datepicker } from "flowbite-react";
import { useState, useEffect } from "react";
import CompaniesTableHeader from "./CompaniesTableHeader";
import CompaniesTableBody from "./CompaniesTableBody";
import CompaniesTableFooter from "./CompaniesTableFooter";
import SearchInput from "./SearchInput";
import { searchClient } from "@/lib/searchClient";
import { InstantSearch, Configure } from "react-instantsearch";
import { getStatusList, getCityList } from "@/actions/companiesActions";

const CompaniesTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusList, setStatusList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  const [registrationDate, setRegistrationDate] = useState('');

  useEffect(() => {
    const fetchStatusList = async () => {
      const data = await getStatusList();

      console.log(data);
      setStatusList(data);
    };

    const fetchCityList = async () => {
      const data = await getCityList();

      console.log(data);
      setCityList(data);
    };

    fetchStatusList();
    fetchCityList();
  }, []);

  const handleDateChange = (date: any) => {
    console.log(date);
  };

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
                    {statusList.map((status: any, idx: any) => {
                      return (
                        <DropdownItem key={idx} onClick={() => console.log(true)}>
                          { status.status }
                        </DropdownItem>
                      );
                    })}
                    <DropdownDivider />
                    <DropdownItem
                      onClick={() => console.log(null)}
                      className="text-red-600"
                    >
                      Reset
                    </DropdownItem>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown className="z-10 h-60 overflow-auto rounded-lg shadow w-44" color="light" label="City">
                    {cityList.map((city: any, idx: any) => {
                      return (
                        <DropdownItem key={idx} onClick={() => console.log(true)}>
                          { city.city_name }
                        </DropdownItem>
                      );
                    })}
                    <DropdownDivider />
                    <DropdownItem
                      onClick={() => console.log(null)}
                      className="text-red-600"
                    >
                      Reset
                    </DropdownItem>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown color="light" label="Target Audience"></Dropdown>
                </div>
                <div>
                  <Datepicker placeholder='Registration Date' value={registrationDate} onSelectedDateChanged={handleDateChange}/>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                hoverable
              >
                <CompaniesTableHeader />
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
