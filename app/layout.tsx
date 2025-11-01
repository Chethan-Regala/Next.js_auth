import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Navbar from '../components/Navbar';
import connectToDatabase from '../utils/mongodb';
import User from './models/User';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureAuth - Secure Authentication System",
  description: "A secure authentication system built with Next.js and NextAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Test MongoDB connection
  connectToDatabase()
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ Connection failed:', err));

  // Test User model
  console.log('👤 User model loaded:', !!User);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
