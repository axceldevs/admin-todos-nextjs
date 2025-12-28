"react-icons/ci";
import {
  IoLogoReact,
  IoBrowsersOutline,
  IoServerOutline,
  IoGridOutline,
  IoLogOutOutline,
  IoSaveOutline,
  IoBagOutline
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";
import Image from "next/image";
import Link from "next/link";
import path from "node:path";

const menuItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <IoBrowsersOutline size={30} />,
  },
  {
    path: "/dashboard/rest-todos",
    name: "Rest Todos",
    icon: <IoGridOutline size={30} />,
  },
  {
    path: "/dashboard/server-todos",
    name: "Server Todos",
    icon: <IoServerOutline size={30} />,
  },
  {
    path: "/dashboard/cookies",
    name: "Cookies",
    icon: <IoSaveOutline size={30} />,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <IoBagOutline size={30} />,
  }
];
export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white border-r border-gray-200/60 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      {" "}
      <div>
        {" "}
        <div className="-mx-6 px-6 py-4">
          {" "}
          <Link
            className="flex items-center justify-center"
            href="/dashboard"
            title="home"
          >
            {" "}
            <IoLogoReact className="mr-2 text-3xl text-gray-400" />{" "}
          </Link>{" "}
        </div>{" "}
        <div className="mt-8 text-center">
          {" "}
          <Image
            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
            alt=""
            width={112}
            height={112}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />{" "}
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {" "}
            Cynthia J. Watts{" "}
          </h5>{" "}
          <span className="hidden text-gray-400 lg:block">Admin</span>{" "}
        </div>{" "}
        <ul className="space-y-2 tracking-wide mt-8">
          {" "}
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              path={item.path}
              name={item.name}
              icon={item.icon}
            />
          ))}{" "}
        </ul>{" "}
      </div>{" "}
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-200/60">
        {" "}
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          {" "}
          <IoLogOutOutline /> <span className="group-hover:text-gray-700">
            Logout
          </span>{" "}
        </button>{" "}
      </div>{" "}
    </aside>
  );
};
