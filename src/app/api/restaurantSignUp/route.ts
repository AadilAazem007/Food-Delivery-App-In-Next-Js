import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Restaurant from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";

interface Restaurant {
    _id: string,
    name: string,
    error?: string
}

interface UserDataType {
    email:string,
    password: string,
    confirmPassword: string,
    restaurantName:string,
    city: string,
    mobile: string,
    address: string
}

export async function GET(req:NextApiRequest, res:NextApiResponse<Restaurant[]>)
{
    try{
        await connectToDatabase()
        const data = await Restaurant.find()
        return NextResponse.json({ result:true, message:'Data is here', data:data })
    }
    catch(error)
    {
        return NextResponse.json({ result:false, error:error })
        //res.status(500).json({ error: "Failed to fetch restaurants" });
    }
}

export async function POST(req:NextApiRequest, res: NextApiResponse)
{
    const payload: UserDataType = await req.json();
    let result
    await connectToDatabase()
        const restaurant = new Restaurant(payload)
        result = await restaurant.save()
    return NextResponse.json({success: true, message:"Data saved successfully", result})
}
