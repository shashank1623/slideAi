import { NextRequest, NextResponse } from "next/server";

// the below function is a method to validate the webhook from instagram
export async function GET(req : NextRequest){
    const hub = req.nextUrl.searchParams.get('hub.challenge')

    return new NextResponse(hub);
}

