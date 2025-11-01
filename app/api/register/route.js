import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../../utils/mongodb';
import User from '../../models/User';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const { name, email, password, role } = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Role must be student or admin.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password hashed successfully');

    // Create new user
    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      name, 
      role 
    });

    console.log(`📡 Registration attempt from IP: ${ip}`);
    console.log('New registration:', { email, role });
    console.log('User saved: id:', newUser._id);
    console.log('Registration successful!');

    const redirectPath = role === 'admin' ? '/admin_dashboard' : '/student_dashboard';
    const redirectMessage = `User registered successfully. Redirecting to ${redirectPath}`;

    return NextResponse.json({ 
      message: redirectMessage,
      redirectPath,
      user: { 
        id: newUser._id, 
        email: newUser.email, 
        name: newUser.name, 
        role: newUser.role 
      } 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}