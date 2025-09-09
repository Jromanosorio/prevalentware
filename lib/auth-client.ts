import { createAuthClient } from "better-auth/react"
const authClient =  createAuthClient()

// Funciones de autenticacion que se usaran en el frontend

export const { signIn, signUp, signOut, useSession } = authClient