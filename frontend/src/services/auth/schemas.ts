import { z } from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export const loginSchema = z.object({
  email: z.coerce.string().trim().email("El correo electrónico no es válido"),
  password: z.coerce.string().trim().nonempty("La contraseña es requerida"),
});

export const registerSchema = z.object({
  name: z.coerce.string().trim().nonempty("El nombre es requerido"),
  email: z.coerce.string().trim().email("El correo electrónico no es válido"),
  password: z.coerce
    .string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
