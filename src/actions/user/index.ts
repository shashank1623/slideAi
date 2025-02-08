"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import { stat } from "fs";
import { stripe } from "@/app/(protected)/api/payment/route";

// the first one is to create a helper function that we
// are going to need authentication and authorize the user
// for any type of server action

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return user;
};


