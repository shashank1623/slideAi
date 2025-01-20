

import React from 'react'

type Props = {
    type : 'FREE' | 'PRO' 
    children : React.ReactNode
}

/**
 * SubscriptionPlan component renders a subscription plan based on the provided type.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of the subscription plan.
 * @param {React.ReactNode} props.children - The children elements to be rendered within the subscription plan.
 *
 * @returns {JSX.Element} The rendered subscription plan component.
 */
export const SubscriptionPlan = ({type , children}: Props) => {
    // WIP : Return subscription plan based on type
  return (
    children
  )
}

