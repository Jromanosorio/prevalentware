import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Controller para guardar los registros de transacciones

export async function POST(req: Request) {
    try {

        // Comprobacion de la sesion para proteger la ruta

        const session = await auth.api.getSession({headers: req.headers})

        if(!session){
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const { amount, date, concept, description } = await req.json()

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                description: description,
                date: date ? new Date(date) : new Date(),
                concept,
                user: session.user.name
            }
        })

        return Response.json(transaction)

    } catch (error) {
        console.log(error)
    }
}

// Controller para obtener los registros de transacciones

export async function GET(req: Request){
    try {
        const session = await auth.api.getSession({headers: req.headers})

        if(!session){
            return new Response(JSON.stringify({error: "Acceso no autorizado"}), {status: 401})
        }

        const transactionList = await prisma.transaction.findMany({
            orderBy: {
                date: 'desc'
            }
        })

        return Response.json(transactionList)

    } catch (error) {
        console.log(error)   
    }
}