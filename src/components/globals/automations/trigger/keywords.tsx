import { Input } from '@/components/ui/input'
import { useKeywords } from '@/hooks/use-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/user-queries'
import { X } from 'lucide-react'
import React from 'react'

type Props = {
    id: string
}

/**
 * Component for managing and displaying keywords that trigger automations.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {string} props.id - The unique identifier for the keywords.
 *
 * @returns {JSX.Element} The rendered Keywords component.
 *
 * @example
 * <Keywords id="12345" />
 *
 * @remarks
 * This component uses several hooks to manage state and perform operations:
 * - `useKeywords`: Manages keyword input and deletion.
 * - `useMutationDataState`: Retrieves the latest mutation state.
 * - `useQueryAutomation`: Fetches automation data based on the provided ID.
 *
 * The component renders a list of keywords, an input field for adding new keywords,
 * and handles deletion of existing keywords.
 */
const Keywords = ({ id }: Props) => {
    const { keyword, onValueChange, onKeyPress, deleteMutation } = useKeywords(id);
    const { latestVariable } = useMutationDataState(['add-keyword'])
    const { data } = useQueryAutomation(id);
    return (
        <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">

            <p className="text-sm text-text-secondary">
                Add words that trigger automations
            </p>

            <div className='flex flex-wrap justify-start gap-2 items-center'>
                {typeof data?.data !== 'string' && data?.data?.keywords &&
                    data?.data?.keywords.length > 0 &&
                    data?.data?.keywords.map(
                        (word) =>
                            word.id !== latestVariable?.variables?.id && (
                                <div
                                    className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
                                    key={word.id}
                                >
                                    <p>{word.word}</p>
                                    <X
                                        size={20}
                                        className="hover:cursor-pointer"
                                        onClick={() => deleteMutation({id : word.id})}
                                    />
                                </div>
                            )
                    )}
                {latestVariable && latestVariable.status === 'pending' && (
                    <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
                        {latestVariable.variables.keyword}
                    </div>
                )}

                <Input
                    placeholder="Add keyword..."
                    style={{
                        width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
                    }}
                    value={keyword}
                    className="p-0 bg-transparent ring-0 border-none outline-none"
                    onChange={onValueChange}
                    onKeyUp={onKeyPress}
                />
            </div>
        </div>
    )
}

export default Keywords