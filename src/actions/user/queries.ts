"use server";

import { client } from "@/lib/prisma";

// to create all our queries file

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      subscription: true,
      integrations: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
          name: true,
        },
      },
    },
  });
};


export const createUser = async (
  clerkId: string,
  firstname: string,
  lastname: string,
  email: string
) => {
  return await client.user.create({
    data: {
      clerkId,
      firstname,
      lastname,
      email,
      username: `${firstname}.${lastname}.${Math.floor(Math.random() * 1000)}`,

      subscription: {
        create: {},
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  });
};

