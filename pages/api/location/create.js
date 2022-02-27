import { getSession } from "next-auth/react"
import { hash } from "bcryptjs";
import { prisma } from "@/auth"

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (req.method != "POST" || !session.user.email) {
        return res.status(403).json({ message: "Request forbidden" });
    }
    const { building, floor, room_number, description } = req.body;
 
    try {
    const new_location = await prisma.location.create({data: {
        building, floor: Number(floor), room_number: Number(room_number), description
    }})
    console.log("Created location successfully")
    return res.status(200).json(new_location)
    } catch (err) {
        console.log("Error", err)
        res.status(400).json({message: err})
    }
}
 
export default handler;