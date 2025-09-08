import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        
        const session = await auth.api.getSession({headers: req.headers})
        if(!session) {
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const usersList = await prisma.user.findMany()

        return Response.json(usersList)

    } catch (error) {
        console.log(error)
    }   
}

export async function PATCH(req: Request){
    try {
        
        const session = await auth.api.getSession({headers: req.headers})
        if(!session) {
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const { id, name, role } = await req.json()
        
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                role
            }
        })

        return Response.json(updateUser)

    } catch (error) {
        console.log(error)
    }   
}