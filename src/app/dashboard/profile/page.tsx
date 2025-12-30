"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

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
    image: session.user.image ?? "https://avatars.githubusercontent.com/u/47919550?v=4",
    email: session.user.email ?? "no-email",
    username: session.user.name ?? "Usuario",
    roles: session.user.roles || [],
  };
};

export default function ProfilePage() {

  const { data: session } = useSession();

   const userSession = mapUserFromSession(session);

  useEffect(() => {
    console.log("Client Side");
  }, []);

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center">
        {/* Avatar */}
        <div className="flex justify-center">
          <Image
            src={userSession.image}
            alt={userSession.username}
            width={96}
            height={96}
            className="rounded-full object-cover border-4 border-gray-100"
          />
        </div>

        {/* Info */}
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          {userSession.username}
        </h2>

        <p className="text-sm text-gray-500">{userSession.email}</p>

        <p className="text-sm text-gray-500"> {userSession.roles.join(", ")}</p>
        {/* Divider */}
        <div className="my-4 border-t" />

        {/* Actions (opcional) */}
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Editar perfil
        </button>
      </div>
    </div>
  );
}
