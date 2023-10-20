import customerModel from "@/db/schema/customer";
import dbConnect, { disconnectDB } from "@/db/dbcon";
import { NextResponse } from "next/server";
import toolModel from "@/db/schema/tool";

export async function POST(req) {
    try {
        const { values: { name, city, phone, email, identityCard }, tools, image, identity } = await req.json();
        let totalAmount = 0;
        
        const filteredTools = tools.filter((obj) => { // Filtering tools which have quantity greater then 0.
            if (obj.quantity > 0) {
                totalAmount += obj.quantity * obj.rent;
            }
            return obj.quantity > 0;
        });
        if (filteredTools.length === 0) {
            return NextResponse.json({ message: "EmptyTools" }, { status: 404 }); // Tools not seletcted by customer.
        }
        await dbConnect();

        const isUserAlreadyExist = await customerModel.findOne({ $and: [{ name: name, city: city, phone: phone }] });

        if (isUserAlreadyExist) return NextResponse.json({ message: "conflict" }, { status: 409 });

        else {

            const result = filteredTools.map((obj) => {
                return toolModel.updateOne({ $and : [ { punjabiName: obj.punjabi } , { quantity : {$gt : 0} } ] },{$inc : {quantity : -obj.quantity}});
            })
            
            Promise.all(result)
            .then((ans)=>{})
            .catch(
                (err)=>{
                    console.log(err)
                    return NextResponse.json({message : "Failed to update"},{status : 500});
                });
           
            
            const user = new customerModel({
                name: name,
                city: city,
                phone: phone,
                email: email,
                cardtype: identity,
                identityCard: identityCard,
                image: image,
                rentedTools: filteredTools,
                date: new Date(),
                amount : totalAmount,
                rentDays : 1,
                status : "active"
            })
            await user.save();
            return NextResponse.json({ message: "success" }, { status: 201 });
        }
    } catch (err) {
        console.log("Error ", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    } 
}