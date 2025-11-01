/**
 * User Type Definitions
 * 
 * This module defines TypeScript types for:
 * 1. User data structure
 * 2. Authentication-related types
 * 3. API request/response types
 */

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}