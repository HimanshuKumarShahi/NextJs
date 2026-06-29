"use client";

import { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>

        <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/courses/web-development">
              Web Development
            </HoveredLink>
            <HoveredLink href="/courses/ai-agents">AI & Agents</HoveredLink>
            <HoveredLink href="/courses/backend">
              Backend Masterclass
            </HoveredLink>
            <HoveredLink href="/courses/production">
              Production Ready
            </HoveredLink>
          </div>
        </MenuItem>

        <Link href={"/contact"}>
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
