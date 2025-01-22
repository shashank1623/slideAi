import {
  createAutomations,
  deleteKeyword,
  saveKeyword,
  saveListener,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automation";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod-form";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ["create-automation"],
    () => createAutomations(id),
    "user-autmations"
  );

  return { isPending, mutate };
};

/**
 * Custom hook to handle editing automation names.
 *
 * @param {string} automationId - The ID of the automation to be edited.
 * @returns {object} - An object containing the following properties:
 *   - `edit` (boolean): A state indicating whether the edit mode is enabled.
 *   - `inputRef` (React.RefObject<HTMLInputElement | null>): A reference to the input element.
 *   - `enableEdit` (function): A function to enable the edit mode.
 *   - `isPending` (boolean): A state indicating whether the mutation is pending.
 */
export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-autoamtion"],
    (data: { name: string }) =>
      updateAutomationName(automationId, {
        name: data.name,
      }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    edit,
    inputRef,
    enableEdit,
    isPending,
  };
};

export const useListener = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null);

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  });

  const { isPending, mutate } = useMutationData(
    ["create-listener"],
    (data: { prompt: string; reply: string }) =>
      saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
    "automation-info"
  );

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(
    promptSchema,
    mutate
  );

  const onSetListener = (type: "MESSAGE" | "SMARTAI") => setListener(type);

  return {
    onSetListener,
    register,
    onFormSubmit,
    listener,
    isPending,
  };
};

export const useTriggers = (id: string) => {
  const types = useAppSelector(
    (state) => state.AutmationReducer.trigger?.types
  );

  const dispatch: AppDispatch = useDispatch();

  const onSetTrigger = (type: "COMMENT" | "DM") =>
    dispatch(TRIGGER({ trigger: { type } }));

  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info"
  );

  const onSaveTrigger = () => mutate({ types });
  return { types, onSetTrigger, onSaveTrigger, isPending };
};

export const useKeywords = (id : string) =>{
    const [keyword , setKeyword] = useState('')
    const onValueChange = (e:React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

    const {mutate} = useMutationData(
        ['add-keyword'],
        (data : {keyword : string}) => saveKeyword(id , data.keyword),
        'automation-info',
        () => setKeyword('')
    )

    const onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            mutate({keyword})
            setKeyword('')
        }
    }

    const {mutate : deleteMutation} = useMutationData(
        ['delete-keyword'],
        (data : {id : string}) => deleteKeyword(data.id),
        'automation-info',
    )


    return {keyword , onValueChange , onKeyPress , deleteMutation}
}