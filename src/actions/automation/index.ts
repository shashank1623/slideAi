"use server";

import { onCurrentUser } from "../user";
import { findUser } from "../user/queries";
import {
  addKeyWord,
  addListener,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeywordQuery,
  findAutomation,
  getAutomation,
  updateAutomation,
} from "./queries";

export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id, id);
    if (create) return { status: 200, data: "Automation created" };
    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const getAllAutomation = async () => {
  const user = await onCurrentUser();
  try {
    const automations = await getAutomation(user.id);
    if (automations) return { status: 200, data: automations.automations };
    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const getAutomationInfo = async (id: string) => {
  const user = await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };
    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string;
    active?: boolean;
    automation?: string;
  }
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) return { status: 200, data: "Automation successfully updated" };

    return { status: 404, data: "Oops! could not find automation" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const saveListener = async (
  automationId: string,
  listener: "MESSAGE" | "SMARTAI",
  prompt: string,
  reply?: string
) => {
  await onCurrentUser();
  try {
    const create = await addListener(automationId, listener, prompt, reply);

    if (create) return { status: 200, data: "Listener created" };
    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) return { status: 200, data: "Trigger saved" };
    return { status: 404, data: "Cannot save trigger" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyWord(automationId, keyword);

    if (create) return { status: 200, data: "Keyword added successfully" };

    return { status: 404, data: "Cannot add this keyword" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const deleteKeyword = async (id: string) => {
  await onCurrentUser();
  try {
    const deleted = await deleteKeywordQuery(id);
    if (deleted)
      return {
        status: 200,
        data: "Keyword deleted",
      };
    return { status: 404, data: "Keyword not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};


export const getProfilePosts = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    // fetching the post from instagram api
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )

    const parsed = await posts.json();
    if(parsed) return { status: 200, data: parsed.data }
    console.log('🔴🔴Error in getting post 🔴🔴')
    return { status: 404, data: "Cannot fetch posts" }

  } catch (error) {
    console.log('🔴🔴 Server side error in getting posts 🔴🔴',error)
    return { status: 500, data: "Internal server error" };
  }
}

export const savePosts = async (
  autmationId: string,
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }[]
) => {
  await onCurrentUser()
  try {
    const create = await addPost(autmationId, posts)

    if (create) return { status: 200, data: 'Posts attached' }

    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}


export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(id, { active: state })
    if (update) return { status: 200,
      data : `Automation ${state ? 'activated' : 'deactivated'}`
     }

    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }

}