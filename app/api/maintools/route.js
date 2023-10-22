import { NextResponse } from "next/server";
import toolModel from "@/db/schema/tool";
import dbConnect, { disconnectDB } from "@/db/dbcon";

export async function GET(req,res) {
    try {
        await dbConnect();
        const date = req.nextUrl.searchParams.get('date');
        console.log(date);
        const tools = await toolModel.find();

        if (tools) return NextResponse.json({ tools }, { status: 200 });

        return NextResponse.json({ message: "failed" }, { status: 404 });
    } catch (err) {

        return NextResponse.json({ message: "error" }, { status: 500 });

    } finally {
        await disconnectDB();
    }
}