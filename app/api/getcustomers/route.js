import dbConnect, { disconnectDB } from '@/db/dbcon';
import customerModel from '@/db/schema/customer';
import cusomterModel from '@/db/schema/customer';
import toolModel from '@/db/schema/tool';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        await dbConnect();
        const customers = await cusomterModel.find();
        if (customers) {
            return NextResponse.json({ data: customers }, { status: 200 });
        } else return NextResponse.json({ message: 'empty' }, { status: 404 });
    } catch (err) {
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    } finally {
        await disconnectDB();
    }
}
export async function PUT(req) { // This is used when customer pay the amount or cancel.
    try {
        const { user, userStatus } = await req.json();
        // user = {key : values};
        //userStatus = "cancel" , "completed";
        await dbConnect();
        const updatedTools = user.rentedTools.map((obj) => {
            if (obj.status === "active") {
                return toolModel.updateOne({ punjabiName: obj.punjabi }, { $inc: { quantity: obj.quantity } });
            }
        });

        Promise.all(updatedTools)
            .then((result) => { })
            .catch((err) => console.log(err));
        
        // mark status cancel or return to each tool.
        const markStatus = user.rentedTools.map((tool)=>{
            if(userStatus === "cancel" && tool.status !== "return"){
                const newDate = new Date();
                return {...tool, status : "cancel", date : newDate.toLocaleDateString()};
            }
            if(userStatus === "completed" && tool.status !== "cancel"){
                const newDate = new Date();
                return {...tool, status : "return", date : newDate.toLocaleDateString()};
            }
            return tool;
        })

        const updateStatus = await customerModel.findByIdAndUpdate({ _id: user._id }, { $set: { status: userStatus, rentedTools : markStatus } }, { new: true });

        if (updateStatus) return NextResponse.json({ message: "success" }, { status: 200 });
        else return NextResponse.json({ message: "Network error" }, { status: 511 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "failed" }, { status: 500 });
    }
}