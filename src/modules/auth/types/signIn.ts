import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres')
})


export type SignIn = z.infer<typeof signInSchema>