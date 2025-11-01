import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    role: string;
    name?: string;
    username?: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      username?: string;
    };
  }
}