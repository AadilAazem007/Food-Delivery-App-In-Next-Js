import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db"
import foodsModel from "@/app/lib/foodsModel";

interface FoodDataType {
    name: string,
    price: string,
    path: string,
    description: string,
    restro_id?:any
}
export async function GET(req:NextApiRequest, res: NextApiResponse): Promise<NextResponse>
{
    try{
        await connectToDatabase()
        const data = await foodsModel.find()
        return NextResponse.json({ result:true, message:'Food Data is here', data })
    }
    catch(error)
    {
        return NextResponse.json({ result:false, error:error })
        //res.status(500).json({ error: "Failed to fetch restaurants" });
    }
}

export async function POST(req:NextApiRequest, res:NextApiResponse): Promise<NextResponse> {
    const payload: FoodDataType = await req.json()
    let success = false
    await connectToDatabase()
    try {
        const data = new foodsModel(payload);
        const result = await data.save();
        if (result) {
            success = true;
        }
        return NextResponse.json({success, result})
    } catch (error) {
        console.error("Error converting resto_id or saving data:", error);
        // Handle specific errors if needed
    }

    
}