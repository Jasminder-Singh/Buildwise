import dbConnect, { disconnectDB } from "@/db/dbcon";
import customerModel from "@/db/schema/customer";
import toolModel from "@/db/schema/tool";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
    try {
        const { id } = params;
        await dbConnect();
        const user = await customerModel.findById({ _id: id });
        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "failed" }, { status: 500 });
    } finally {
        await disconnectDB();
    }
}

export async function PUT(req, { params }) { // This is for increase rent and days and change the tool status.
    try {
        const { tools, newAmount, increaseDay, days } = await req.json();
        const { id } = params;
       // tools = [{tools}];
       // newAmont = Number;
       // increaseDay = Number;
       // days = Number;
       
        await dbConnect();
        const customer = await customerModel.findByIdAndUpdate({ _id: id }, { $set: { amount: newAmount, rentedTools: tools } });

        if (customer && !increaseDay) {
            const updatedTools = tools.map((tool) => {
                if (tool.status === "cancel" || tool.status === "return") {
                    return toolModel.updateOne({ punjabiName: tool.punjabi }, { $inc: { quantity: tool.quantity } });
                }
            });
            Promise.all(updatedTools)
                .then((result) => { })
                .catch((err) => {
                    console.log(err);
                    return NextResponse.json({ message: "failed" }, { status: 500 });
                });
            return NextResponse.json({ message: "Updated" }, { status: 200 });

        }else if(increaseDay){
            const updatedTools = await customerModel.findByIdAndUpdate({_id:id},{$set : {amount : newAmount, rentDays : days}});
            if(updatedTools) return NextResponse.json({ message: "Updated" }, { status: 200 });
            else return NextResponse.json({ message: "failed" }, { status: 500 });
        } else return NextResponse.json({ message: "customer not found" }, { status: 404 });

    } catch (err) {
        return NextResponse.json({ message: "failed" }, { status: 500 });
    }
}