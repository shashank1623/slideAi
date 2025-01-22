import { getAllAutomation, getAutomationInfo } from "@/actions/automation";
import { onUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";

const prefetch = async (client : QueryClient , action : QueryFunction , key : string) =>{

    return await client.prefetchQuery({
        queryKey : [key],
        queryFn : action,
        staleTime : 60000
    })
}

export const PrefetchUserProfile = async (client : QueryClient) =>{

    return await prefetch(client , onUserInfo ,'user-profile' )
}


export const PrefetchUserAutomations = async (client : QueryClient) =>{

    return await prefetch(client , getAllAutomation ,'user-automation' )
}


/**
 * Prefetches user automation information.
 *
 * This function uses the provided `QueryClient` to prefetch automation information
 * based on the given `automationId`. The prefetched data is stored under the key
 * 'automation-info'.
 *
 * @param client - The QueryClient instance used for prefetching.
 * @param automationId - The ID of the automation to fetch information for.
 * @returns A promise that resolves when the prefetching is complete.
 */
export const PrefetchUserAutomation = async (client : QueryClient , automationId : string) =>{

    return await prefetch(
        client ,
        ()=> getAutomationInfo(automationId),
        'automation-info'    
    )
}
