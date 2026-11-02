import fs from 'fs';
import path from 'path';

const SLUG_MAP: Record<string, string> = {
  'a-new-economy-is-knocking': 'post-a-new-economy-is-knocking.html',
  'engineering-the-systems-of-abundance': 'post-engineering-the-systems-of-abundance.html',
  'turning-sci-fi-into-economic-fact': 'post-turning-sci-fi-into-economic-fact.html',
  'we-engineer-the-future-economy-in-the-real-world-not-in-theory': 'post-we-engineer-the-future-economy-in-the-real-world-not-in-theory.html',
};

function get404Response() {
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const templateName = SLUG_MAP[slug];

  if (!templateName) {
    return get404Response();
  }

  const filePath = path.join(process.cwd(), 'src', 'templates', templateName);
  if (!fs.existsSync(filePath)) {
    return get404Response();
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
