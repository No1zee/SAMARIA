import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const htmlPath = path.join(process.cwd(), 'public', 'coin.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (err) {
    return new NextResponse('Coin showcase not found', { status: 404 });
  }
}
