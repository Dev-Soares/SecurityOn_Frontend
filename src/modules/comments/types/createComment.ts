import { z } from 'zod';

// Mesmo limite do MaxLength(500) do CreateCommentDto no backend.
export const COMMENT_MAX_LENGTH = 500;

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comentário obrigatório')
    .max(COMMENT_MAX_LENGTH, `Máximo ${COMMENT_MAX_LENGTH} caracteres`),
});

export type CreateComment = z.infer<typeof createCommentSchema>;
