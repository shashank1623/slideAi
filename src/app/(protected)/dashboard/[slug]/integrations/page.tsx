import React from 'react'
import { INTEGRATION_CARDS } from '@/constants/integrations'
import IntegrationCard from './_components/integration-card'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-full lg:w/812 gap-y-5'>
        {/* yha aap intergration kr skte hai */}
        {INTEGRATION_CARDS.map((card, key) => (
          <IntegrationCard
            key={key}
            {...card}
          />
          
        ))}
      </div>
    </div>
  )
}

export default page