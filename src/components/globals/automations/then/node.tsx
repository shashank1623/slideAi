'use client'
import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { PlaneBlue, SmartAi, Warning } from '@/icons'
import React from 'react'
import PostButton from '../post'

type Props = {
  id: string
}

/**
 * ThenNode component renders a UI element based on the automation data fetched using the provided id.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.id - The unique identifier for the automation.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * The component performs the following:
 * - Fetches automation data using the `useQueryAutomation` hook with the provided id.
 * - Checks if the automation data has a listener.
 * - If no listener is found, it returns an empty fragment.
 * - If a listener is found, it renders a styled div containing:
 *   - A connector element.
 *   - A warning icon and text "Then...".
 *   - A message or Smart AI indicator based on the listener type.
 *   - A prompt message from the listener.
 *   - A conditional rendering of a PostButton component if there are no posts but a comment trigger is found.
 */
const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)
  const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <Warning />
        Then...
      </div>
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listener.listener === 'MESSAGE' ? (
            <PlaneBlue />
          ) : (
            <SmartAi />
          )}
          <p className=" text-lg">
            {data.data.listener.listener === 'MESSAGE'
              ? 'Send the user a message.'
              : 'Let Smart AI take over'}
          </p>
        </div>
        <p className="flont-light text-text-secondary">
          {data.data.listener.prompt}
        </p>
      </div>
      {data.data.posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ThenNode