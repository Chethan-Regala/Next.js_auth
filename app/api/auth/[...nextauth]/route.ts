import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import connectToDatabase from "../../../../utils/mongodb";
import User from "../../../models/User";

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    
                    // Basic presence validation
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                    // Simple email format validation
                    const emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(credentials.email)) {
                        throw new Error("Invalid email format");
                    }

                    // Find user in MongoDB
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error('Invalid email or password');
                    }

                    // Check password with bcrypt
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) {
                        throw new Error('Invalid email or password');
                    }

                    // Return only the necessary user data
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    throw new Error('Authentication failed');
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add role and username to the token if user exists
            if (user) {
                const u = user as { role?: string; name?: string; email?: string };
                if (u.role) token.role = u.role;
                token.username = u.name ?? u.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Add user data to the session
            if (session.user) {
                session.user.role = token.role as string;
                // token.sub may be undefined; coerce to string when available
                if (token.sub) session.user.id = token.sub;
                // Expose username on session.user for client use
                (session.user as unknown as { username?: string }).username = token.username as string | undefined;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
};

// Create handler for API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };