import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { ActiveAutomation } from '@/icons/active-automation'



type Props = {
    id: string
}

/**
 * ActivateAutomationButton component.
 *
 * This component renders a button that is intended to activate or deactivate an automation process.
 * It includes a loader to indicate the loading state and displays the current state of the automation.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the automation.
 *
 * @example
 * <ActivateAutomationButton id="automation-123" />
 *
 * @remarks
 * - The button currently has a static label "Activate".
 * - The loading state and the actual activation/deactivation logic are work-in-progress (WIP).
 */
const ActivateAutomationButton = ({ id }: Props) => {

    // WIP : setup optimistic ui
    // fetch automation data

    return (
        <Button
            //   disabled={isPending}
            //   onClick={() => mutate({ state: !data?.data?.active })}
            className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4"
        >

            {/* WIP : Set the loading state */}
            <Loader state={false}>
                <ActiveAutomation/>
                <p className="lg:inline hidden">
                    {/* {data?.data?.active ? 'Disable' : 'Activate'} */}
                    Acitivate
                </p>
            </Loader>
        </Button>
    )
}

export default ActivateAutomationButton