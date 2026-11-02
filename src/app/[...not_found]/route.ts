import fs from 'fs';
import path from 'path';

export async function GET() {
  const notFoundPath = path.join(process.cwd(), 'src', 'templates', '404.html');
  const html = fs.existsSync(notFoundPath) ? fs.readFileSync(notFoundPath, 'utf-8') : '404 - Page not found';

  return new Response(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
