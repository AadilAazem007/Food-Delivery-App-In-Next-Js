import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel";

export async function GET(req:NextApiRequest)
{
    await connectToDatabase()
    let result = await Restaurant.find()
    result = result.map((item) => item.city)
    result = [...new Set(result.map((item) => item))]
    return NextResponse.json({success:true, result})
}