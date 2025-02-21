"use server"

import { client } from "@/lib/prisma"

export const matchKeyword = async ( keyword : string) => {

    return await client.keyword.findFirst({
        where : {
            word :{
                equals : keyword,
                mode : 'insensitive'
            }
        }
    })
}

export const getKeyWordAutomation = async (automationId : string , dm : boolean) => {

    return await client.automation.findFirst({
        where : {
            id : automationId
        },

        include : {
            dms : dm,
            trigger : {
                where : {
                    type : dm ? 'DM' : 'COMMENT'
                }
            },
            listener : true,
            User : {
                select : {
                    subscription : {
                        select : {
                            plan : true,
                        },
                    },
                    integrations : {
                        select : {
                            token : true,
                        }
                    }
                },
            },
        },
    })
}