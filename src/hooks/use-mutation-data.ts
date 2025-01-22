import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook to handle mutation data using React Query.
 *
 * @param {MutationKey} mutationKey - The key for the mutation.
 * @param {MutationFunction<any, any>} mutationFn - The mutation function to execute.
 * @param {string} [queryKey] - Optional key for the query to invalidate after mutation.
 * @param {() => void} [onSuccess] - Optional callback function to execute on successful mutation.
 *
 * @returns {{ mutate: Function, isPending: boolean }} - Returns an object containing the mutate function and a boolean indicating if the mutation is pending.
 */
export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
        return toast(data?.status === 200 ? "success" : "error", {
          description: data?.data,
        });
      }
    },
    onSettled : async () =>{
        return await client.invalidateQueries({queryKey : [queryKey]})
    }
  });

  return { mutate, isPending };
};


export const useMutationDataState = (mutationKey : MutationKey) =>{
  const data  = useMutationState({
    filters : {mutationKey},
    select : (mutation) =>{
      return {
        variables : mutation.state.variables as any,
        status : mutation.state.status,
      }
    }
  })
  const latestVariable = data[data.length - 1]
  //console.log(latestVariable)
  return {
    latestVariable
  }
}
