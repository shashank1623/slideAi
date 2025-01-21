import { UseMutateFunction } from "@tanstack/react-query";
import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom hook that integrates Zod schema validation with React Hook Form.
 *
 * @param schema - The Zod schema to validate the form data.
 * @param mutation - The mutation function to be called on form submission.
 * @param defaultValues - Optional default values for the form fields.
 *
 * @returns An object containing:
 * - `register`: Function to register form fields.
 * - `errors`: Object containing form validation errors.
 * - `onFormSubmit`: Function to handle form submission.
 * - `watch`: Function to watch form field values.
 * - `reset`: Function to reset the form.
 */
const useZodForm = (
    schema : ZodSchema,
    mutation : UseMutateFunction,
    defaultValues ?: any
) => {
    const {
        register ,
        formState : {errors},
        handleSubmit,
        watch,
        reset,
    }  = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues : {
            ...defaultValues
        },
    })

    const onFormSubmit = handleSubmit(async (values)=> mutation({...values}))

    return {
        register,
        errors,
        onFormSubmit,
        watch,
        reset,
    }
}

export default useZodForm