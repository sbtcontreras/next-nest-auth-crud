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
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth/services";
import { useAuth } from "@/services/auth/hooks";
import { useEffect } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  async function onSubmit() {
    logout();
    queryClient.clear();
    toast.success("Sesión cerrada exitosamente");
    router.push("/auth/login");
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
