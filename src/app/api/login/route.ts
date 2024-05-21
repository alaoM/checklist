import { loginUser } from '@/app/lib/models/login';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log(email,
    password);

  try {
    const user  = await loginUser(email, password);
    if (user ) {             
      return NextResponse.json(user, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }
  } catch (error) {
     
    if (error instanceof Error && error.message === 'Incorrect password' || 'User not found') {
      return NextResponse.json({ error: 'Incorrect user details' }, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
    
  }
}

// export const config = {
//   runtime: 'edge',
// };
