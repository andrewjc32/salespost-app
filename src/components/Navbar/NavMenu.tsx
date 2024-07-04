"use client";

import {
  NavbarToggle,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import Link from "next/link";
import { signOutUser } from "@/actions/authActions";

const NavMenu = () => {
  return (
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <DropdownItem as={Link} href="/profile">
          My profile
        </DropdownItem>
        <DropdownItem as={Link} href="/companies">
          Companies
        </DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Customer Service</DropdownItem>
        <DropdownDivider />
        <DropdownItem
          onClick={async () => signOutUser()}
          className="text-red-400"
        >
          Sign out
        </DropdownItem>
      </Dropdown>
      <NavbarToggle />
    </div>
  );
};

export default NavMenu;
