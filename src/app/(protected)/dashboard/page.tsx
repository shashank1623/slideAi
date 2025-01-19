import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation';

import React from 'react'

type Props = {}

const Page = async (props: Props) => {
    // WIP : Completed
    // server action on board the user
    // if there are a new user into our application we have to essentially onbard them
    // and if the user is sucessfully created and if they already have an account
    // we're going to check the status which is 200 or 201 
    // and then accordingly we're going to redirect them to their specific dashboard
    // we may be have something like dashboard/user.id
    // and if that's is not the case then we're going to redirect them to the 
    // signin page

    const user = await onBoardUser();
    if(user?.status === 200 || user?.status === 201){
         return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}`);
    }
    return redirect('/sign-in');
}

export default Page