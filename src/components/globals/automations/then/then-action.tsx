import { useListener } from '@/hooks/use-automation';
import React from 'react'
import TriggerButton from '../trigger-button';
import { AUTOMATION_LISTENERS } from '@/constants/automation';
import { Subscript } from 'lucide-react';
import { SubscriptionPlan } from '../../subscription-plan';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '../../loader';

type Props = {
  id: string
}

/**
 * Component representing the "Then" action in the automation flow.
 * 
 * @component
 * @param {Props} props - The properties object.
 * @param {string} props.id - The unique identifier for the listener.
 * 
 * @returns {JSX.Element} The rendered ThenAction component.
 * 
 * @example
 * <ThenAction id="unique-listener-id" />
 * 
 * @description
 * This component renders a button labeled "Then" which, when clicked, displays a list of automation listeners.
 * Each listener can be selected to set a specific type of action. If the listener type is 'SMARTAI', it is wrapped
 * in a SubscriptionPlan component. The component also includes a form for submitting additional details related to the listener.
 * 
 * @remarks
 * The component uses the `useListener` hook to manage the state and actions related to the listener.
 * It also utilizes Tailwind CSS classes for styling and conditional rendering based on the selected listener type.
 */
const ThenAction = ({ id }: Props) => {

  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id);
  return (
    <TriggerButton label='Then'>
      <div className='flex flex-col gap-y-2'>
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === 'SMARTAI' ? (
            <SubscriptionPlan
              key={listener.type}
              type='PRO'
            >
              <div onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                    : 'bg-background-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 curosor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className='flex gap-x-2 items-center'>
                  {listener.icon}
                  <p className='text-white'>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                  : 'bg-background-80',
                'p-3 rounded-xl flex flex-col gap-y-2 curosor-pointer hover:opacity-80 transition duration-100'
              )}
            >
              <div className='flex gap-x-2 items-center'>
                {listener.icon}
                <p className='text-white'>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          ))}
        <form onSubmit={onFormSubmit} className='flex flex-col gap-y-2'>
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : "Add a message you want send to your customer"
            }
            {...register('prompt')}
            className='bg-background-80 outline-none border-none ring-0 focus:ring-0'
          />
          <Input
            {...register('reply')}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />

          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>

        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction