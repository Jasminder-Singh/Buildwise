import userModel from "@/db/schema/user";
import { NextResponse } from "next/server";
import dbConnect, { disconnectDB } from "@/db/dbcon";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
    
        const { email, password } = await req.json();    
        await dbConnect();
        const isAuthorizedUser = await userModel.findOne({ email: email });
        if (isAuthorizedUser) {
            const isMatch = await bcrypt.compare(password, isAuthorizedUser.password);
            if (isMatch) {
                return NextResponse.json({user : isAuthorizedUser }, { status: 200 });
            }
            else return NextResponse.json({ message: "unauthorized" }, { status: 401 });
        }
        else return NextResponse.json({ message: "invalidEmail" }, { status: 401 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "failed" }, { status: 500 });
    }finally{
        await disconnectDB();
    }
}