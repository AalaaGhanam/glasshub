import { NextResponse } from 'next/server';
const SERVICES_URL = process.env.SERVICES_URL;
const X_API_KEY = process.env.X_API_KEY;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const response = await fetch(`${SERVICES_URL}/v1/certificates/${id}`, {
      method: 'GET',
      headers: {
        'x-api-key': `${X_API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch certificate');
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
