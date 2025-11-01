import { getSession } from 'next-auth/react';

/**
 * Authentication Helper Functions
 * 
 * This module provides utility functions for:
 * 1. Checking authentication status
 * 2. Protecting API routes
 * 3. Managing user sessions
 */

export async function isAuthenticated(req: any) {
  const session = await getSession({ req });
  return !!session;
}

export async function requireAuth(req: any) {
  const isAuthed = await isAuthenticated(req);
  if (!isAuthed) {
    throw new Error('Authentication required');
  }
}