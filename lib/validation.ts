import { z } from 'zod';

/**
 * Validation Schemas
 * 
 * This module defines Zod validation schemas for:
 * 1. Login form data
 * 2. Signup form data
 * 3. Other user-related input validation
 */

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});