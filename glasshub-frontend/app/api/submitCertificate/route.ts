import { NextResponse } from 'next/server';

const SERVICES_URL = process.env.SERVICES_URL;
const X_API_KEY = process.env.X_API_KEY;

export async function POST(request: Request) {
  try {
    const { companyName, issueDate, logo, content } = await request.json();
    const response = await fetch(`${SERVICES_URL}/v1/certificates/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${X_API_KEY}`,
      },
      body: JSON.stringify({ companyName, issueDate, logo, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit certificate');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
