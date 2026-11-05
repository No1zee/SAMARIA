import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'templates', 'scope.html');
  
  if (!fs.existsSync(filePath)) {
    return new Response('Scope template not found', { status: 404 });
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
