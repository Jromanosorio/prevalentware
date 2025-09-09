import { auth } from '@/lib/auth'

// Rutas que maneja Better-Auth para los procesos de autenticacion

export const GET = auth.handler
export const POST = auth.handler