import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import NavMenu from "./NavMenu";
import { Button } from "flowbite-react";
import Link from "next/link";
import { auth } from '@/auth';
import Image from "next/image";
import logo from '@/assets/megaman-logo.jpg';

const Nav = async () => {
  const session = await auth();

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <Image
          src={logo}
          width={80}
          className="mr-3 h-6 sm:h-9"
          alt="Megaman Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LEAD HERO
        </span>
      </NavbarBrand>
      <NavbarCollapse>
        <NavbarLink as={Link} href="#">
          About Us
        </NavbarLink>
        <NavbarLink href="#">Learn</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
      {session ? (
        <NavMenu />
      ) : (
        <div className="flex md:order-2">
          <Button as={Link} href="/login" className="mr-2" color="light">Log In</Button>
          <Button as={Link} href="/signup" className="mr-2" color="blue">Sign Up</Button>
          <NavbarToggle />
        </div>
      )}
    </Navbar>
  );
};

export default Nav;
