import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(50, 'Mínimo de 50 caracteres'),
  imgUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

export type CreatePost = z.infer<typeof createPostSchema>;
