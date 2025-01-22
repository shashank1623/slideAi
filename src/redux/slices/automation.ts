import { duplicateValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IntialStateTriggerProps = {
    trigger? : {
        type? : "COMMENT" | "DM"
        keyword? : string
        types : string[]
        keywords : string[]
    }
}

const InitialState : IntialStateTriggerProps = {
    trigger : {
        type : undefined,
        keyword : undefined,
        types : [],
        keywords : []
    },
}

/**
 * Slice for automation state management.
 * 
 * @constant
 * @name AUTOMATION
 * @type {Slice}
 * 
 * @property {string} name - The name of the slice.
 * @property {InitialState} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.TRIGGER - Reducer to handle the trigger action.
 * @param {InitialState} state - The current state of the slice.
 * @param {PayloadAction<IntialStateTriggerProps>} action - The action dispatched to the reducer.
 * @returns {InitialState} The updated state after applying the trigger action.
 */
export const AUTOMATION = createSlice({
    name : 'automation',
    initialState : InitialState,
    reducers : {
        TRIGGER : (state, action : PayloadAction<IntialStateTriggerProps>) => {
            state.trigger!.types = duplicateValidation(
                state.trigger?.types!,
                action.payload.trigger?.type!
            )
            return state
        }
    }
})

export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.reducer