import dbConnect, { disconnectDB } from "@/db/dbcon";
import toolModel from "@/db/schema/tool";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await dbConnect();
        const tools = await toolModel.find();
        if(tools) return NextResponse.json({tools},{status : 200});
        return NextResponse.json({message : "failed"},{status : 404});
    } catch(err){
        return NextResponse.json({message : "error"},{status : 500});
    }
}