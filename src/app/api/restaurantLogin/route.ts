import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";

interface UserDataType {
    email:string,
    password: string,
}

export async function POST(req:NextApiRequest, res:NextApiResponse)
{
    const payload: UserDataType = await req.json();
    await connectToDatabase()
    let success = false
    let result = await Restaurant.findOne({email:payload.email, password: payload.password})
    if(result)
    {
        success = true
    }
    return NextResponse.json({success, result})
    
}