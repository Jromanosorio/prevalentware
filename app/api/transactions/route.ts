import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({headers: req.headers})

        if(!session){
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const { amount, date, concept, description } = await req.json()

        const transaction = await prisma.transaction.create({
            data: {
                Amount: parseFloat(amount),
                Description: description,
                Date: date ? new Date(date) : new Date(),
                Concept: concept,
                User: session.user.name
            }
        })

        return Response.json(transaction)

    } catch (error) {
        console.log(error)
    }
}

export async function GET(req: Request){
    try {
        const session = await auth.api.getSession({headers: req.headers})

        if(!session){
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const transactionList = await prisma.transaction.findMany({
            orderBy: {
                Date: 'desc'
            }
        })

        return Response.json(transactionList)

    } catch (error) {
        console.log(error)   
    }
}