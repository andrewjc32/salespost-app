import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Tooltip,
  Avatar,
  Dropdown,
} from "flowbite-react";
import NavMenu from "./NavMenu";
import { Button } from "flowbite-react";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import logo from "@/assets/megaman-logo.png";

const Nav = async () => {
  const session = await auth();

  return (
    <header>
      <Navbar
        fluid
        rounded
        className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-[0px_4px_4px_0px_#0000000D]"
      >
        <NavbarBrand href="https://flowbite.com">
          <Image src={logo} className="mr-3 h-6 sm:h-9" alt="Salespost Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Salespost
          </span>
        </NavbarBrand>
        <div className="flex items-center md:order-2">
          <Tooltip content="Toggle dark mode" placement="bottom">
            <button
              type="button"
              className="inline-flex items-center p-2 mr-1 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
          </Tooltip>
          {session ? (
            <>
              <span className="text-sm text-gray-400 font-medium mr-2 hidden lg:block">
                Welcome {session?.user?.name?.split(' ')[0]}
              </span>
              <NavMenu />
            </>
          ) : (
            <>
              <Button as={Link} href="/login" className="mr-2" color="light">
                Log In
              </Button>
              <Button as={Link} href="/signup" className="mr-2" color="blue">
                Sign Up
              </Button>
              <NavbarToggle />
            </>
          )}
        </div>
        <NavbarCollapse>
          <NavbarLink href="#">Mailing List</NavbarLink>
          <NavbarLink href="#">Lead Generation</NavbarLink>
          <NavbarLink href="#">Customer Service</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </header>
  );
};

export default Nav;
