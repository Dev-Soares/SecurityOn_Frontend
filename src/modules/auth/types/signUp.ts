import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirmação obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignUpPayload = Omit<SignUp, 'confirmPassword'>;
