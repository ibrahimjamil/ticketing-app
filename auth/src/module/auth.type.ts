import { z } from 'zod';

export const userSignUpSchema = z.object({
    name: z.string().min(5),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    email: z.string().email(),
    userType: z.enum(['admin', 'noice']),
  });

export const userSignInSchema = z.object({
    password: z.string(),
    email: z.string().email(),
});