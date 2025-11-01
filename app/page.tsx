"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  // Route users to an appropriate landing based on role to avoid redirect loops.
  const session = await getServerSession(authOptions as any);

  if (!session) {
    return redirect('/signin');
  }

  // If authenticated, route by role to avoid a loop where / -> /dashboard -> / -> ...
  const role = (session as any)?.user?.role;
  if (role === 'admin') return redirect('/admin_dashboard');
  if (role === 'consumer') return redirect('/consumer');
  if (role === 'student') return redirect('/student_dashboard');
  // Default for other authenticated users - redirect to student dashboard
  return redirect('/student_dashboard');
}
