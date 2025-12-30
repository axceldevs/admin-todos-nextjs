import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { getServerSession, Session } from "next-auth";


export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export const signInEmailPassword = async (email: string, password: string) : Promise<User | null> => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if(!user){
    return await createUser(email, password);
  }

  if(!bcrypt.compareSync(password, user.password ?? 'xxxxx')){
    return null
  }

  return user;
};


const createUser = async (email: string, password: string ): Promise<User> => {

    const userCreated = await prisma.user.create({
        data:{
            email: email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0]
        }
    });

    return userCreated;
}