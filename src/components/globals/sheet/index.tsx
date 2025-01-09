import React from 'react'
import { Sheet as ShadcnSheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    clasName?: string
    side : 'left' | 'right'
}

const Sheet = ({ children, trigger, clasName , side }: Props) => {
    return <ShadcnSheet>
        <SheetTrigger className={clasName}>
            {trigger}
        </SheetTrigger>
        <SheetContent side={side} className='p-0'>
            {children}
        </SheetContent>
    </ShadcnSheet>
}

export default Sheet