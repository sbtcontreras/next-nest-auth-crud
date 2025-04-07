import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().min(1, 'El contenido es obligatorio'),
});

export const createPostSchema = postSchema;
export const updatePostSchema = postSchema.partial();

export type CreatePostDTO = z.infer<typeof createPostSchema>;
export type UpdatePostDTO = z.infer<typeof updatePostSchema>;
