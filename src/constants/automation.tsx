import { PlaneBlue, SmartAi, TinyInstagram } from '@/icons'
import { v4 } from 'uuid'
import React, {JSX} from 'react'


export type AutomationListenerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'SMARTAI' | 'MESSAGE'
}

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
    {
        id: v4(),
        label: 'Send the user a message',
        icon: <PlaneBlue />,
        description: 'Enter the message that you want to send the user.',
        type: 'MESSAGE',
    },
    {
        id: v4(),
        label: 'Let Smart AI take over',
        icon: <SmartAi />,
        description: 'Tell AI about your project. (Upgrade to use this feature)',
        type: 'SMARTAI',
    },
]