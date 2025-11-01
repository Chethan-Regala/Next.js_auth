# SecureAuth - Next.js Authentication System

A clean and secure authentication system built with Next.js 16, NextAuth.js, and Tailwind CSS.

## Features

- **Secure Authentication**: Built with NextAuth.js for robust session management
- **Role-Based Access Control**: Admin and Consumer roles with protected routes
- **Modern UI**: Clean design with dark blue, white, red, and black color palette
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Greetings**: Dynamic time-based greetings and live clock
- **Session Management**: Secure JWT-based sessions with proper logout

## Color Palette

- **Primary**: Dark Blue (#1e3a8a, #1e40af)
- **Accent**: Red (#dc2626)
- **Text**: Black (#000000), White (#ffffff)
- **Backgrounds**: Light (#f8fafc), Dark gradients

## Project Structure

```
nextjs_auth_workflow/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth API routes
│   ├── consumer/                   # Consumer dashboard
│   ├── dashboard/                  # Admin dashboard
│   ├── login/                      # Login page
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page (redirects)
│   └── providers.tsx               # Session provider
├── components/
│   ├── AuthForm.tsx               # Login form component
│   └── Navbar.tsx                 # Navigation component
├── lib/
│   ├── auth.ts                    # Auth utilities
│   ├── users.json                 # Demo user data
│   └── validation.ts              # Form validation
└── middleware.ts                  # Route protection
```

## Demo Users

- **Admin**: admin@example.com / adminpass
- **Consumer**: consumer@example.com / consumerpass
- **Author**: author@example.com / authorpass

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create `.env.local` with:
   ```
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Improvements

- ✅ **Removed signup functionality** - Only signin is available
- ✅ **Enhanced navbar styling** with improved color scheme
- ✅ **Better dashboard design** with greeting messages and real-time clock
- ✅ **Consistent color palette** throughout the application
- ✅ **Improved user experience** with loading states and transitions
- ✅ **Clean code structure** with removed unused components
- ✅ **Better typography** and spacing
- ✅ **Enhanced security** with proper route protection

## Authentication Flow

1. **Unauthenticated users** → Redirected to `/login`
2. **Successful login** → Redirected based on role:
   - Admin → `/dashboard`
   - Consumer → `/consumer`
   - Others → `/dashboard`
3. **Protected routes** → Middleware checks authentication
4. **Logout** → Secure session termination and redirect to login

## Technologies Used

- **Next.js 16** - React framework
- **NextAuth.js** - Authentication library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Zod** - Schema validation

## Security Features

- JWT-based sessions
- CSRF protection
- Secure cookie handling
- Route-level protection
- Input validation
- XSS prevention

---

Built with ❤️ using modern web technologies for a secure and user-friendly authentication experience.