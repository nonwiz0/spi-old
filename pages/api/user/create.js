import { getSession } from "next-auth/react"
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
    const session = await getSession({ req })
    console.log("Triggered", session)
    const password = "Asd,car15"
    const hash_pw = await hash(password, 12)
    const data = {
        username: "chanrose", name: "name", email: "email@email.com", password: hash_pw 
    }
    try {
    new_user = await prisma.user.create({data})
    console.log("Created user successfully")
    res.status(200).json({name: "Broset"})
    } catch (err) {
        console.log("Error", err)
        res.status(400).json({message: err})
    }
}
 
export default handler;