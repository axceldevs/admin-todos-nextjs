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
          min-h-screen
          w-full
          lg:w-[75%]
          xl:w-[80%]
          2xl:w-[85%]
          flex
          flex-col
        "
      >
        <TopMenu />

        <main className="flex-1 px-6 pt-6 pb-6">
          {children}
        </main>
      </div>
    </>
  );
}
