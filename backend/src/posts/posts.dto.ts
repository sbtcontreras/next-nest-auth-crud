import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const CreatePostSchema = PostSchema;
export const UpdatePostSchema = PostSchema.extend({
  id: z.string(),
}).partial();

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
