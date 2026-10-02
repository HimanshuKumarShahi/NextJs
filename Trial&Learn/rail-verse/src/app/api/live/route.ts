import { NextResponse } from 'next/server';
import { mockLiveStatus } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trainNumber = searchParams.get('trainNumber');

  if (!trainNumber) {
    return NextResponse.json({ success: false, message: 'Train number is required' }, { status: 400 });
  }

  const data = mockLiveStatus[trainNumber];

  // Fallback to a default mock live status if not found
  const responseData = data || mockLiveStatus["12309"];

  if (trainNumber.length >= 4) {
    // Dynamically replace the train number in the fallback data
    return NextResponse.json({ success: true, data: { ...responseData, trainNumber } });
  } else {
    return NextResponse.json({ success: false, message: 'Please enter a valid train number (e.g., 12309)' }, { status: 400 });
  }
}
