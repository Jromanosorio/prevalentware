import { NextResponse } from "next/server";

// Funcion de prueba de los endpoint

export async function GET(){
    return NextResponse.json({message: "pong"})
}