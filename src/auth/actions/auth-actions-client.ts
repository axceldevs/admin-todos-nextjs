'use client'
import { User } from "@/generated/prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface UserSession {
  user: User;
}

const mapUserFromSession = (session: any): UserSession => {
   if (!session) {
      redirect("/api/auth/signin");
    }
  
  return {
    user: {
      id: session.user.id ?? '',
      image:
        session.user.image ??
        "https://avatars.githubusercontent.com/u/47919550?v=4",
      email: session.user.email ?? "no-email",
      name: session.user.name ?? "Usuario",
      roles: session.user.roles || [],
      password: "",
      emailVerified: session.user.emailVerified,
      isActive: session.user.isActive
    },
  };
};

export const getUserSessionFromClient =  () => {
  const { data: session } = useSession();
  const userSession = mapUserFromSession(session);
  return userSession.user;
};
