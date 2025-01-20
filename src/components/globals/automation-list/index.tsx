"use client"
import { usePaths } from '@/hooks/user-nav'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {}

/**
 * Component that renders a list of automations.
 * 
 * @component
 * @param {Props} props - The properties passed to the component.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component fetches automation data using `useQueryAutomations` and manages optimistic UI updates with `useMutationDataState`.
 * If no automations exist, it displays a message and a `CreateAutomation` component.
 * Each automation is displayed as a link with its name, creation date, and a button indicating its type (Smart AI or Standard).
 * 
 * @example
 * ```tsx
 * <AutomationList />
 * ```
 */
const AutomationList = (props: Props) => {
    // WIP : Completed 
    // Get the automation list data
    // use client becauzse we require the path name
    const { data } = useQueryAutomations()
    // console.log(data)

    const {latestVariable} = useMutationDataState(['create-automation'])
    //console.log(latestVariable)


    const { pathname } = usePaths()

    const optimisticUiData = useMemo(() => {
        if (latestVariable?.variables) {
          const test = [latestVariable.variables, ...(Array.isArray(data?.data) ? data.data : [])]
          //console.log(test)
          return { data: test }
        }
        return data || { data: [] }
      }, [latestVariable, data])


    // WIP : Completed 
    // if no automation exists show no autmations.
    if (data?.status !== 200 || data.data.length <= 0) {
        return (
            <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
                <h3 className="text-lg text-gray-400">No Automations </h3>
                <CreateAutomation />
            </div>
        )
    }

    
      
    return (
        <div className='flex flex-col gap-y-3'>
            {Array.isArray(optimisticUiData.data) && optimisticUiData.data!.map((automation) => (
                <Link href={`${pathname}/${automation.id}`}
                    key={automation.id}
                    className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
                >
                    <div className='flex flex-col flex-1 items-start '>
                        {/* WIP : Automation Name */}
                        <h2 className="text-xl font-semibold">{automation.name}</h2>
                        {/* WIP : Automation Msg */}
                        <p className="text-[#9B9CA0] text-sm font-light mb-2">
                            This is from the comment
                        </p>

                        {/* WIP : Automation Keywords */}
                        {automation.keywords.length > 0 ? (
                            ''
                        )

                            : (
                                <div className='rounded-full border-2 mt-3 border-dashed border-white/60
                        px-3 py-1'>
                                    <p className='text-sm text-[#bfc0c3]'>No Keywords</p>
                                </div>
                            )}

                    </div>
                    <div className='flex flex-col justify-between'>

                        <p className='capitalize text-sm font-light text-[#9B9CA0]'>
                            {/* WIP : attach the real date */}
                            {/* WIP : Completed */}
                            {/* Januart 7th 2025 */}
                            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
                            {automation.createdAt.getUTCDate() === 1
                                ? `${automation.createdAt.getUTCDate()}st`
                                : `${automation.createdAt.getUTCDate()}th`}{' '}
                            {automation.createdAt.getUTCFullYear()}
                        </p>
                        {/* WIP :Render the button based on the listener  */}
                        {/* WIP : Completed */}
                        {automation.listener?.listener === 'SMARTAI' ? (
                            <GradientButton
                                type="BUTTON"
                                className="w-full bg-background-80 text-white hover:bg-background-80"
                            >
                                Smart AI
                            </GradientButton>
                        ) : (
                            <Button className="bg-background-80 hover:bg-background-80 text-white">
                                Standard
                            </Button>
                        )}
                    </div>
                </Link>
            ))}
        </div>

    )
}

export default AutomationList