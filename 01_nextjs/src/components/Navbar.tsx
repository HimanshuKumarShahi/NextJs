"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          >

          </MenuItem>
        </Link>
        <MenuItem
            setActive={setActive}
            active={active}
            item="Courses"
          >
            <div className="flex flex-col space-y-4 text-">
              <HoveredLink href="/courses">All Courses </HoveredLink>
              <HoveredLink href="/courses">Web Development </HoveredLink>
              <HoveredLink href="/courses">Advance Composition </HoveredLink>
              <HoveredLink href="/courses"> Blog Writing </HoveredLink>
              <HoveredLink href="/courses">Production </HoveredLink>
            </div>
          </MenuItem>
           <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact Us"
          >
            <div className="flex flex-col space-y-4 text-">
              <HoveredLink href="/courses">Email </HoveredLink>
              <HoveredLink href="/courses">Instagram </HoveredLink>
              <HoveredLink href="/courses">LinkedIn </HoveredLink>
              <HoveredLink href="/courses">X </HoveredLink>
            </div>
            
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
export default Navbar;
