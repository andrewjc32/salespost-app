import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  Spinner,
} from "flowbite-react";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useHits, UseHitsProps } from "react-instantsearch";

type Props = {
  loading: boolean;
  companies: any;
};

const CompaniesTableBody = (props: UseHitsProps) => {
    const { items, sendEvent } = useHits(props);

//   if (loading) {
//     return (
//       <TableBody>
//         <TableRow>
//           <TableCell colSpan={8} className="text-center">
//             <Spinner size="lg" aria-label="Loading companies..." />
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     );
//   }

//   if (companies.length === 0) {
//     return (
//       <TableBody>
//         <TableRow>
//           <TableCell colSpan={8} className="text-center">
//             No companies found.
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     );
//   }

  return (
    <TableBody className="divide-y">
      {items.map((company: any, idx: number) => {
        console.log('company: ', company)
        return (
        <TableRow
          key={idx}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <TableCell className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
            {company.companyName}
          </TableCell>
          <TableCell className="px-2 py-1">
            {company.incorporationDate}
          </TableCell>
          <TableCell className="px-2 py-1">{company.postTown}</TableCell>
          <TableCell className="px-2 py-1">
            <Link
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href={company.uri as string}
            >
              View Profile
            </Link>
          </TableCell>
          <TableCell className="px-2 py-1">{company.sic_text}</TableCell>
          <TableCell className="px-2 py-1">{company.officers}</TableCell>
          <TableCell className="px-2 py-1">
            <Button
              size="sm"
              className="text-sm font-medium text-center inline-flex items-center text-white bg-orange-600 rounded-lg hover:bg-orange-700"
              aria-label="Add to Mail List"
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
              aria-label="View Company"
            >
              View Company
            </Button>
          </TableCell>
        </TableRow>
      )})}
    </TableBody>
  );
};

export default CompaniesTableBody;
