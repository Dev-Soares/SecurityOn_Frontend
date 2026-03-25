import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const createPostSchema = z.object({
  content: z.string().min(1, 'Conteúdo obrigatório'),
  image: z
    .instanceof(FileList)
    .transform((list) => list.item(0))
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Imagem deve ter no máximo 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Formato aceito: JPEG, PNG, WebP ou GIF'
    )
    .optional(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
