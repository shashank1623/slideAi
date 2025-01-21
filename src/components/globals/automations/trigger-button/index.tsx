import React from 'react'
import PopOver from '../../popover'
import { BlueAddIcon } from '@/icons'

type Props = {
  children: React.ReactNode
  label: string
}

/**
 * TriggerButton component renders a button that triggers a PopOver component.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the PopOver.
 * @param {string} props.label - The label text to be displayed on the button.
 *
 * @returns {JSX.Element} The rendered TriggerButton component.
 */
const TriggerButton = ({ children, label }: Props) => {
  return (
    <PopOver
      className="w-[400px]"
      trigger={
        <div className="border-2 border-dashed w-full border-[#3352cc] hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5 mt-4">
          <BlueAddIcon />
          <p className="text-[#768BDD] font-bold">{label}</p>
        </div>
      }
    >
      {children}
    </PopOver>
  )
}

export default TriggerButton