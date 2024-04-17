import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import foodsModel from "@/app/lib/foodsModel";

interface ContentTypeData {
    params:{
        id: string
    }
}

export async function GET(req:NextApiRequest, content:ContentTypeData): Promise<NextResponse>
{
    try{
        const id = content.params.id
        let success = false
        await connectToDatabase()
        const result = await foodsModel.find({"_id":id})
        if(result)
        {
            success=true
        }
        return NextResponse.json({result,success})
    }
    catch(error)
    {
        return NextResponse.json({result: false, error})
    }
}

export async function PUT(req:NextApiRequest, content:ContentTypeData): Promise<NextResponse>
{
    const id = content.params.id
    const payload = await req.json()
    let success = false
    await connectToDatabase()
    const result = await foodsModel.findOneAndUpdate({_id:id}, payload)
    if(result)
    {
        success=true
    }
    return NextResponse.json({payload,success})
}