import { z } from 'zod';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const createPostSchema = postSchema;
export const updatePostSchema = postSchema.partial();

export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
