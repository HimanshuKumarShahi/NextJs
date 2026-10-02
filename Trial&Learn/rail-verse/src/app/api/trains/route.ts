import { NextResponse } from 'next/server';
import { mockTrains } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source')?.toUpperCase();
  const destination = searchParams.get('destination')?.toUpperCase();

  if (!source || !destination) {
    return NextResponse.json({ success: false, message: 'Source and Destination are required' }, { status: 400 });
  }

  // Filter exact matches
  let matchingTrains = mockTrains.filter(
    t => t.source.toUpperCase() === source && t.destination.toUpperCase() === destination
  );

  // If no exact match found, provide fallback mock data (dynamically changing the stations so UI works)
  if (matchingTrains.length === 0) {
    matchingTrains = mockTrains.map(train => ({
      ...train,
      source: source.substring(0, 4).toUpperCase(),
      destination: destination.substring(0, 4).toUpperCase()
    }));
  }

  return NextResponse.json({ success: true, data: matchingTrains });
}
