import { Sidebar, TopMenu } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Layout for the admin dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <div
        className="
          ml-auto
          lg:w-[75%]
          xl:w-[80%]
          2xl:w-[85%]
          min-h-screen
        "
      >
        <TopMenu />

        <main className="px-6 pt-6 bg-white p-2 m-2 rounded">
          {children}
        </main>
      </div>
    </>
  );
}
