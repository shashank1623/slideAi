import { getAutomationInfo } from '@/actions/automation'
import PostNode from '@/components/globals/automations/post/node'
import ThenNode from '@/components/globals/automations/then/node'
import Trigger from '@/components/globals/automations/trigger'
import AutomationBreadCrumb from '@/components/globals/bread-crumbs'
import { Warning } from '@/icons'
import { PrefetchUserAutomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: { id: string }
}

// WIP : set some meta data
export async function generateMetaData({
  params,
}: {
  params: { id: string }
}) {

  const info = await getAutomationInfo(params.id)
  return {
    title: typeof info.data === 'string' ? '' : info.data?.name,

  }
}


const Page = async ({ params }: Props) => {
  //  wip : prefetch user automation data

  const query = new QueryClient()
  await PrefetchUserAutomation(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex flex-col items-center gap-y-20'>

        <AutomationBreadCrumb id={params.id} />
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex
            flex-col bg-[#1D1D1D] gap-y-3'>

          <div className='flex gap-x-2'>
            <Warning />
            When....
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id} />
        <PostNode id ={params.id} />
      </div>
    </HydrationBoundary>
  )
}

export default Page