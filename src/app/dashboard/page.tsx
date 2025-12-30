import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface UserSession {
  image: string;
  email: string;
  username: string;
  roles: string[];
}

const mapUserFromSession = (session: any): UserSession => {
  if (!session) {
    redirect("/api/auth/signin");
  }

  return {
    image:
      session.user.image ??
      "https://avatars.githubusercontent.com/u/47919550?v=4",
    email: session.user.email ?? "no-email",
    username: session.user.name ?? "Usuario",
    roles: session.user.roles || [],
  };
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userSession = mapUserFromSession(session);



  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado server side" />
      <div className="flex items-center gap-4 p-4 rounded-xl border bg-white shadow-sm">
        <Image
          src={userSession.image}
          alt={userSession.username}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-gray-900">{userSession.username}</p>
          <p className="text-sm text-gray-500">{userSession.email}</p>
        </div>
      </div>
    </div>
  );
}
