import { z } from 'zod';

// Mesmo limite do MaxLength(2000) do CreateCommentDto no backend.
export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comentário obrigatório').max(2000, 'Máximo 2000 caracteres'),
});

export type CreateComment = z.infer<typeof createCommentSchema>;
