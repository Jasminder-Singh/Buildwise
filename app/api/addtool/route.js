import dbConnect, { disconnectDB } from "@/db/dbcon";
import toolModel from "@/db/schema/tool";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {


        const { name, quantity, price, punjabiName } = await req.json();

        await dbConnect();
        const isExist = await toolModel.findOne({ punjabiName: punjabiName });
    
        if (isExist) return NextResponse.json({ message: "Conflict" }, { status: 409 });
        else {
            const tool = await toolModel({
                name: name,
                punjabiName: punjabiName,
                quantity: quantity,
                price: price
            });
            await tool.save();
            return NextResponse.json({ message: "success" }, { status: 201 });
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "failed" }, { status: 500 })
    } finally {
        await disconnectDB();
    }
}