import { NextResponse } from "next/server";
import customerModel from "@/db/schema/customer";
import dbConnect from "@/db/dbcon";

export async function GET(req,res){
    try {
        await dbConnect();
        const currDate = new Date();
        const customers = await customerModel.find({status : "active"});
        
        // Calculating total amount according to the rentDay;
        
        const updateRentDays = customers.map((customer)=>{
            let totalAmount = 0;

            if(customer.date.getDate() !== currDate.getDate() || customer.date.getMonth() !== currDate.getMonth() || customer.date.getFullYear() !== currDate.getFullYear()){
             
                customer.rentedTools.forEach((tool)=>{

                    if(tool.status === "active"){
                    
                        totalAmount += tool.rent * tool.quantity * customer.rentDays + 1;
                    }
                })
                
                return customerModel.findByIdAndUpdate({_id:customer._id},{$set : {amount : totalAmount}, $inc : {rentDays : 1}}, {new : true});

            }
            return null;
           
        })

        Promise.all(updateRentDays)
        .then((result)=>{})
        .catch((err)=>{
            
            return NextResponse.json({message : "Promise failed"}, {status : 500});
        })        
        return NextResponse.json({message : "success"}, {status : 200});
       
    } catch (err) {
        console.log(err);
        return NextResponse.json({message : "failed"}, {status : 500});
    }
}