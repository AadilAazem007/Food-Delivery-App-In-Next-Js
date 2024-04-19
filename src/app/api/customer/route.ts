import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { NextApiRequest } from "next";
import Restaurant from "@/app/lib/restaurantModel";

export async function GET(req:NextApiRequest, content)
{
    let success=false
    let queryParams = req.nextUrl.searchParams
    await connectToDatabase
    let filter = {}
    if(queryParams.get('location'))
    {
        let city = queryParams.get('location')
        filter = {city:{$regex:new RegExp(city,'i')}}
    }
    else if(queryParams.get('restaurant'))
    {
        let restaurantName = queryParams.get('restaurant')
        filter = {restaurantName:{$regex:new RegExp(restaurantName, 'i')}}
    }
    const result = await Restaurant.find(filter)
    if(result)
    {
        success = true
    }
    return NextResponse.json({success, result})
}