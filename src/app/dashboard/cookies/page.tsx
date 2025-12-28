import { TabBar } from "@/components/sidebar/TabBar";

import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Manage your cookies settings and preferences.",
};

export default async function CookiesPage() {

  const cookieStore = await cookies();
  const currentTab = parseInt(cookieStore.get("selectedTab")?.value || "1");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <span className="text-3xl mb-2">Tabs</span>
        <TabBar currentTab={currentTab} />
      </div>
    </div>
  );
}
