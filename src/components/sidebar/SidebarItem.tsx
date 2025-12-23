"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./ActiveLink.module.css";

interface SidebarItemProps {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ path, name, icon }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          href={path}
          className={`${style.link} ${pathname === path ? style.activeLink : ""}`}
        >
          {icon}
          <span className="-mr-1 font-medium">{name}</span>
        </Link>
      </li>
    </>
  );
};
