import { NextResponse } from 'next/server';
import { mockPNR } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pnr = searchParams.get('pnr');

  if (!pnr) {
    return NextResponse.json({ success: false, message: 'PNR number is required' }, { status: 400 });
  }

  const data = mockPNR[pnr];

  // Fallback to a default mock if the user enters any random 10-digit number
  const responseData = data || mockPNR["1234567890"];

  if (pnr.length === 10) {
    // Dynamically replace the PNR number in the fallback data so it looks real
    return NextResponse.json({ success: true, data: { ...responseData, pnr } });
  } else {
    return NextResponse.json({ success: false, message: 'Please enter a valid 10-digit PNR number' }, { status: 400 });
  }
}
