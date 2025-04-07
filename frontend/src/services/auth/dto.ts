import { z } from "zod";

export type JWTPayload = {
  id: string;
  username: string;
  fullname: string;
};

export const loginSchema = z.object({
  username: z.string().trim().nonempty("El nombre de usuario es requerido"),
  password: z.string().trim().nonempty("La contraseña es requerida"),
});

export const registerSchema = z.object({
  fullname: z.string().trim().nonempty("El nombre completo es requerido"),
  username: z
    .string()
    .trim()
    .nonempty("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z
    .string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;

export type AuthData = {
  token: string;
  user: JWTPayload;
};
