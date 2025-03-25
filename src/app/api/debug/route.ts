import { NextResponse } from 'next/server';

// Storage for browser logs
let browserLogs: any[] = [];

export async function GET() {
  return NextResponse.json({ logs: browserLogs });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.clear) {
    browserLogs = [];
    return NextResponse.json({ status: 'Logs cleared' });
  }

  if (body.log) {
    browserLogs.push(body.log);
    return NextResponse.json({ status: 'Log added' });
  }

  return NextResponse.json({ status: 'Invalid request' }, { status: 400 });
}
