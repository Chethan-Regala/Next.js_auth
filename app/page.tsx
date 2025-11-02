"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions as any);

    if (!session) {
      return redirect('/signin');
    }

    const role = (session as any)?.user?.role;
    if (role === 'admin') return redirect('/admin_dashboard');
    if (role === 'consumer') return redirect('/consumer');
    if (role === 'student') return redirect('/student_dashboard');
    
    return redirect('/student_dashboard');
  } catch (error) {
    return redirect('/signin');
  }
}
