import { getSession } from "next-auth/react"
import { hash } from "bcryptjs";
import { prisma } from "@/auth"

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (req.method != "POST" || !session.user.email) {
        return res.status(403).json({ message: "Request forbidden" });
    }
    const { email, username, name, password, role } = req.body;
    const hash_pw = await hash(password, 12)
 
    try {
    const new_user = await prisma.user.create({data: {
        email, username, name, role, password: hash_pw
    }})
    console.log("Created user successfully")
    return res.status(200).json(new_user)
    } catch (err) {
        console.log("Error", err)
        res.status(400).json({message: err})
    }
}
 
export default handler;