import { z } from 'zod';

export const createComplaintSchema = z.object({
  title: z.string().min(1, 'Título obrigatório').max(80, 'Máximo 80 caracteres'),
  store: z.string().max(50, 'Máximo 50 caracteres'),
  danger: z.enum(['aviso', 'cuidado', 'perigo', 'critico'], {
    message: 'Selecione o nível de perigo',
  }),
  content: z.string().min(1, 'Descrição obrigatória').max(500, 'Máximo 500 caracteres'),
  link: z.string().max(200, 'Máximo 200 caracteres'),
});

export type CreateComplaint = z.infer<typeof createComplaintSchema>;
