import dbConnect, { disconnectDB } from '@/db/dbcon';
import userModel from '@/db/schema/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) { // For collect the data of signup form.
    try {

        const { name, email, password, gender, picture } = await req.json();
       
        const salt = password ? await bcrypt.genSalt(10) : "";
        const hashPassword = password ? await bcrypt.hash(password, salt) : "";
        
        await dbConnect();
        const isAlreadyPresentUser = await userModel.findOne({ email: email }); // checking if email is present or not.
        if (isAlreadyPresentUser) {
            return NextResponse.json({ message: "conflict" }, { status: 409 }); // email is already present.
        }
        else {
            const user = new userModel({
                name: name,
                email: email,
                password: hashPassword,
                gender: gender,
                image: picture?.data?.url ? picture.data.url : picture
            })
            await user.save();

            return NextResponse.json({ message: "success" }, { status: 201 });
        }
    } catch (err) {
        console.log("Error server side signUP " + err);
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    } finally {
        await disconnectDB();
    }
}