import { getAllAutomation, getAutomationInfo } from "@/actions/automation"
import { onUserInfo } from "@/actions/user"
import { useQuery } from "@tanstack/react-query"


/**
 * Custom hook to fetch user automations using React Query.
 *
 * This hook utilizes the `useQuery` hook from React Query to fetch
 * all user automations. The query is identified by the key 'user-automations'
 * and the data fetching function is `getAllAutomation`.
 *
 * @returns {QueryObserverResult} The result of the query, including the data, status, and error if any.
 */
export const useQueryAutomations = () =>{
    // return userQuery
    return useQuery({
        queryKey: ['user-autmations'],
        queryFn: getAllAutomation,
    })
    
}

export const useQueryAutomation = (id : string) =>{
    return useQuery({
        queryKey: ['automation-info'],
        queryFn: () => getAutomationInfo(id),
    })
}

export const useQueryUser = () =>{
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: () => onUserInfo,
    })
}