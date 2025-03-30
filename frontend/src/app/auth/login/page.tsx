"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Loader2, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { loginSchema } from "@/services/auth/schemas";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/services";
import { useAuth } from "@/services/auth/hooks";
import type { z } from "zod";
import Link from "next/link";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 20 * 1000;

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  const f = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLocked) return;

    const endTime = Date.now() + LOCK_TIME;

    const timer = setInterval(() => {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timer);
        setIsLocked(false);
        setAttempts(0);
        setLockTimeLeft(0);
        return;
      }
      setLockTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked]);

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if (isLocked) {
      toast.error(
        `Espera ${lockTimeLeft} segundos antes de intentar nuevamente.`
      );
      return;
    }

    try {
      await login(data);
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimeLeft(Math.floor(LOCK_TIME / 1000));
        toast.error("Demasiados intentos fallidos.", {
          description: `Intenta nuevamente en ${LOCK_TIME / 1000} segundos.`,
        });
        return;
      }

      toast.error("Credenciales inválidas", {
        description: `Intentos restantes: ${MAX_ATTEMPTS - newAttempts}`,
      });
    }
  }

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
          <form onSubmit={f.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={f.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@mail.com"
                      type="email"
                    />
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
                    <Input {...field} placeholder="********" type="password" />
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
