import Navbar from '@/components/globals/navbar'
import Sidebar from '@/components/globals/sidebar'
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { PrefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'

type Props = {
  children: React.ReactNode
  params: { slug: string }
  firstname: string
}

const Layout = async ({ children, params }: Props) => {
  // react query
  // WIP : Query client fetch data

  const query = new QueryClient();


  await PrefetchUserProfile(query)

  await PrefetchUserAutomations(query)

  return (
    // if we need to access server side cache and value we need to wrap inside
    // Hydration boundary
    <HydrationBoundary state={dehydrate(query)}>
      <div className='p-3'>

        {/* Sidebar */}
        <Sidebar slug={params.slug} />

        {/* Navbar */}
        <div className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>
          <Navbar slug={params.slug} />
          {children}
        </div>

      </div>
    </HydrationBoundary>
  )
}

export default Layout