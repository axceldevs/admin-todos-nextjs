"react-icons/ci";
import {
  IoLogoReact,
  IoBrowsersOutline,
  IoServerOutline,
  IoGridOutline,
  IoLogOutOutline,
  IoSaveOutline,
  IoBagOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";
import Image from "next/image";
import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const sizeIcon = 20;

const menuItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <IoBrowsersOutline size={sizeIcon} />,
  },
  {
    path: "/dashboard/rest-todos",
    name: "Rest Todos",
    icon: <IoGridOutline size={sizeIcon} />,
  },
  {
    path: "/dashboard/server-todos",
    name: "Server Todos",
    icon: <IoServerOutline size={sizeIcon} />,
  },
  {
    path: "/dashboard/cookies",
    name: "Cookies",
    icon: <IoSaveOutline size={sizeIcon} />,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <IoBagOutline size={sizeIcon} />,
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: <IoPersonOutline size={sizeIcon} />,
  },
];

interface UserSession {
  image: string;
  username: string;
  roles: string[];
}

const mapUserFromSession = (session: Session): UserSession => {
  
   if (!session) {
    redirect("/api/auth/signin");
  }

  return {
    image: session.user!.image ?? "https://avatars.githubusercontent.com/u/47919550?v=4",
    username: session.user!.name ?? "Usuario",
    roles: session.user!.roles || [],
  };
};

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userSession = mapUserFromSession(session);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-white border-r border-gray-200/60 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link
            className="flex items-center justify-center"
            href="/dashboard"
            title="home"
          >
            <IoLogoReact className="mr-2 text-3xl text-gray-400" />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Image
            src={userSession.image ?? "/avatar-placeholder.png"}
            alt={userSession.username ?? "Usuario"}
            width={112}
            height={112}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-sm font-semibold text-gray-600 lg:block">
            {userSession.username}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {userSession.roles.join(", ")}
          </span>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              path={item.path}
              name={item.name}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-200/60">
        <LogoutButton />
      </div>
    </aside>
  );
};
