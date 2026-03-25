import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Conteúdo Obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres') 
})


export type SignUp = z.infer<typeof signUpSchema>