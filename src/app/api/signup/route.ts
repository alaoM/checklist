import { createUser, findUserByEmail } from '@/app/lib/models/signup';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.json();
 

  try {
    const newUser = await createUser(payload.fullName, payload.email, payload.password);
    if (newUser) {    
      return NextResponse.json(newUser, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Email is taken' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json({ error: 'Email is taken' }, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }
}

// export const config = {
//   runtime: 'edge',
// };
