import { z } from 'zod';

export const userSignUpSchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
    userType: z.enum(['admin', 'noice']),
  });

export const userSignInSchema = z.object({
    password: z.string(),
    email: z.string().email(),
});