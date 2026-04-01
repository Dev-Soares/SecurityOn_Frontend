import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Conteúdo obrigatório').max(5000, 'Máximo 5000 caracteres'),
  imgUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

export type CreatePost = z.infer<typeof createPostSchema>;
