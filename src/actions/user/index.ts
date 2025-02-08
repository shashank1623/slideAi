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

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  try {
    const found = await findUser(user.id);

    if (found) {
      // the reason why we need to do the belwo check
      // when we're integrating the user's instagram account
      // there is something called refresh token acess token
      // this token will refresh based on certain span of time
      // like 5 days or something like that
      // si we pretty much refresh this toekn agin

      if (found.integrations.length > 0) {
        const today = new Date();
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime();

        const days = Math.round(time_left / (1000 * 60 * 60 * 24));

        // the whole process here is that is trying to crate the user
        // in the database but we have to check if there is a refresh token
        // any time they log in the app

        if (days < 5) {
          console.log("refresh");

          const refresh = await refreshToken(found.integrations[0].token);

          const today = new Date();
          const expiresAt = today.setDate(today.getDate() + 60);
          //update the token in the database

          const update_token = await updateIntegration(
            refresh.access_token,
            new Date(expiresAt),
            found.integrations[0].id
          );

          if (!update_token) {
            console.log("Update token failed");
          }
        }
      }

      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }

    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses![0].emailAddress!
    );
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: "Internal server error",
      },
    };
  }
};


