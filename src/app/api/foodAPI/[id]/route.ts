import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db"
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
        let success=false
        await connectToDatabase()
        const result = await foodsModel.find({restro_id:id})
        if(result)
        {
            success=true
        }
        return NextResponse.json({ result, success })
    }
    catch(error)
    {
        return NextResponse.json({ result:false, error:error })
        //res.status(500).json({ error: "Failed to fetch restaurants" });
    }
}

export async function DELETE(req:NextApiRequest, content:ContentTypeData): Promise<NextResponse>
{
    try{
        const id = content.params.id
        let success = false
        await connectToDatabase()
        const result = await foodsModel.deleteOne({_id:id})
        if(result)
        {
            success=true
        }
        return NextResponse.json({ result, success })
    }
    catch(error)
    {
        return NextResponse.json({ result:false, error:error })
    }

}