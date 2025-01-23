import { InstagramBlue, PlaneBlue } from '@/icons'
import React from 'react'

type Props = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string | null
    }[]
}

/**
 * Component that displays an active trigger based on the provided type and keywords.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.keywords - An array of keyword objects to display.
 * @param {string} props.type - The type of trigger, either 'COMMENT' or another type.
 *
 * @returns {JSX.Element} The rendered ActiveTrigger component.
 *
 * @example
 * <ActiveTrigger
 *   keywords={[{ id: 1, word: 'example' }, { id: 2, word: 'test' }]}
 *   type="COMMENT"
 * />
 */
const ActiveTrigger = ({ keywords, type }: Props) => {
    return (
        <div className='bg-background-80 p-3 rounded-xl w-full'>
            <div className="flex gap-x-2 items-center">

                {type === 'COMMENT' ? <InstagramBlue /> : <PlaneBlue />}
                <p className="text-lg">
                    {type === 'COMMENT'
                        ? 'User comments on my post.'
                        : 'User sends me a direct message.'}
                </p>

            </div>
            <p className="text-text-secondary">
                {type === 'COMMENT'
                    ? 'If the user comments on a video that is setup to listen for keyworks, this automation will fire'
                    : 'If the user send your a message that contains a keyword, this automation will fire'}
            </p>
            <div className="flex  ga-2 mt-5 flex-wrap">
                {keywords.map((word) => (
                    <div
                        key={word.id}
                        className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
                    >
                        <p>{word.word}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ActiveTrigger