import { getSession } from "next-auth/react"
import { hash } from "bcryptjs";
import { prisma } from "@/auth"

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (req.method != "POST" || !session.user.email) {
        return res.status(403).json({ message: "Request forbidden" });
    }
    const { name, budget } = req.body;
 
    try {
    const new_department = await prisma.department.create({data: {
        name, budget: Number(budget)
    }})
    console.log("Created department successfully")
    return res.status(200).json(new_department)
    } catch (err) {
        console.log("Error", err)
        res.status(400).json({message: err})
    }
}
 
export default handler;