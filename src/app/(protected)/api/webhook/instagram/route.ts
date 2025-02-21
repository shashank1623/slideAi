import { getKeyWordAutomation, matchKeyword } from "@/actions/webhook/queries";
import { NextRequest, NextResponse } from "next/server";

// the below function is a method to validate the webhook from instagram
export async function GET(req : NextRequest){
    const hub = req.nextUrl.searchParams.get('hub.challenge')

    return new NextResponse(hub);
}


export async function POST(req : NextRequest){
    const webhook_payload = await req.json()

    let matcher 
    try{
        // messages
        if(webhook_payload.entry[0].messaging){
            matcher = await matchKeyword(webhook_payload.entry[0].messaging[0].message.text)

        }

        // comments
        if(webhook_payload.entry[0].changes){
            matcher = await matchKeyword(webhook_payload.entry[0].changes[0].value.text)
        }


        if(matcher && matcher.automationId){
            // we have a keyword matcher
            // we need to trigger the automation

            if(webhook_payload.entry[0].messaging){
                // send a message
                //dm

                const automation = await getKeyWordAutomation(matcher.automationId,true)

            }
        }

    }catch(error){

    }
}