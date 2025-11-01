"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// Providers component to wrap the app and expose auth session to client components
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
