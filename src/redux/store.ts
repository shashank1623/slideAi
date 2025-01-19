"use client"
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AutmationReducer from '@/redux/slices/automation'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
    AutmationReducer,

})

/**
 * Configures and creates the Redux store with the specified root reducer and middleware.
 * 
 * The middleware is configured to disable the serializable check.
 * 
 * @constant
 * @type {Store}
 */
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
  
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector