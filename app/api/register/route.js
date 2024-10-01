import { NextResponse } from "next/server";
import { connectMongoDB} from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const {name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword })

        return NextResponse.json({ message: "ลงทะเบียนผู้ใช้งานแล้ว"}, { status: 201})

    } catch(error) {
        return NextResponse.json({ message: "มีข้อผิดพลาดเกิดขึ้นระหว่างการลงทะเบียน"}, { status: 500})
    }
}