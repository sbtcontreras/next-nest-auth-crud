"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useUserMustBeLogged } from "@/services/auth/hooks";

export default function Page() {
  const { logout } = useUserMustBeLogged();

  async function onSubmit() {
    logout();
    toast.success("Sesión cerrada exitosamente");
  }

  return (
    <Card className="w-full max-w-lg rounded-none md:rounded-xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          ¡Adiós! 👋
        </CardTitle>
        <CardDescription className="text-center">
          ¿Estás seguro de que deseas cerrar sesión?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="destructive" onClick={onSubmit}>
            <LogOut className="mr-2" />
            Cerrar Sesión
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
