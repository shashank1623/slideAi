import {
  Sheet as ShadcnSheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

import React from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  side: 'left' | 'right'
}

/**
 * A component that renders a sheet with a trigger and content.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the sheet.
 * @param {React.ReactNode} props.trigger - The element that triggers the sheet to open.
 * @param {string} [props.className] - Optional additional class names for the trigger element.
 * @param {string} props.side - The side from which the sheet should appear (e.g., 'left', 'right', 'top', 'bottom').
 *
 * @returns {JSX.Element} The rendered sheet component.
 */
const Sheet = ({ children, trigger, className, side }: Props) => {
  return (
    <ShadcnSheet>
      <SheetTrigger className={className}>{trigger}</SheetTrigger>
      <SheetContent
        side={side}
        className="p-0"
      >
        {children}
      </SheetContent>
    </ShadcnSheet>
  )
}

export default Sheet