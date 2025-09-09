"use client";

import { useSession } from "@/lib/auth-client";
import LoginForm from "../form/login";
import RegisterForm from "../form/register";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "../navbar/navbar";

// SessionWrapper para centralizar el inicio de sesion y separarlo del layout

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (!session.data?.user.name || !session.data.user.email) {
    return (
      <Tabs defaultValue="login" className="max-w-md mx-auto mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
