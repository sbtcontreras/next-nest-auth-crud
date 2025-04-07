"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { loginSchema } from "@/services/auth/dto";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserMustBeLoggedOut } from "@/services/auth/hooks";

const MAX_ATTEMPTS = 3;
const LOCK_TIME_SECONDS = 20;

export default function LoginPage() {
  const { login } = useUserMustBeLoggedOut();

  const [attempts, setAttempts] = useState(0);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);
  const isLocked = attempts >= MAX_ATTEMPTS;

  const f = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    if (isLocked) {
      toast.error("Demasiados intentos fallidos.", {
        description: `Intenta nuevamente en ${lockTimeLeft} segundos.`,
      });
      return;
    }

    try {
      await login(data);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        toast.error("Demasiados intentos fallidos.", {
          description: `Intenta nuevamente en ${LOCK_TIME_SECONDS} segundos.`,
        });

        setLockTimeLeft(LOCK_TIME_SECONDS);
        const timer = setInterval(() => {
          setLockTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setAttempts(0);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return;
      }

      toast.error("Credenciales inválidas", {
        description: `Intentos restantes: ${MAX_ATTEMPTS - newAttempts}`,
      });
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-lg rounded-none md:rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">¡Hola! 👋</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...f}>
          <form onSubmit={f.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={f.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={f.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={f.formState.isSubmitting || isLocked}
            >
              {f.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : isLocked ? (
                `Espera ${lockTimeLeft} segundos`
              ) : (
                <>
                  <LogIn className="mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="text-primary underline">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
