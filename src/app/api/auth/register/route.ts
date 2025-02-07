import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hashPassword } from '@/lib/password';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    console.log('Registration attempt failed: Email and password are required');
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log(`Registration attempt failed: User with email ${email} already exists`);
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log(`User registered successfully: ${newUser.id}`);
    return NextResponse.json({ message: 'User created successfully', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
