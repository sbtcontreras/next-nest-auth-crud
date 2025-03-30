import { z } from "zod";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const postSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().min(1, "El contenido es obligatorio"),
});

export const createPostSchema = postSchema;
export const updatePostSchema = postSchema.extend({
  id: z.string(),
});
export const deletePostSchema = z.object({
  id: z.string(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
export type DeletePostDto = z.infer<typeof deletePostSchema>;
