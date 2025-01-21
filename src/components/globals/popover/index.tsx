import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
  import { cn } from '@/lib/utils'
  import React, { JSX } from 'react'
  
  type Props = {
    trigger: JSX.Element
    children: React.ReactNode
    className?: string
  }
  
  /**
   * PopOver component that renders a popover with customizable trigger and content.
   *
   * @param {React.ReactNode} children - The content to be displayed inside the popover.
   * @param {React.ReactNode} trigger - The element that triggers the popover when interacted with.
   * @param {string} className - Additional class names to style the popover content.
   *
   * @returns {JSX.Element} The rendered PopOver component.
   */
  const PopOver = ({ children, trigger, className }: Props) => {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          className={cn('bg-[#1D1D1D] shadow-lg rounded-xl', className)}
          align="end"
          side="bottom"
        >
          {children}
        </PopoverContent>
      </Popover>
    )
  }
  
  export default PopOver