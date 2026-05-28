import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API route that returns a trimmed list of Vercel deployments for the SAMARIA site.
 * The VERCEL_API_TOKEN is stored in `.env.local` and is never committed to the repository
 * (the .gitignore contains `.env*`). This ensures the secret does not leak to GitHub.
 */
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'VERCEL_API_TOKEN is not defined' });
  }

  try {
    // Fetch recent deployments (limit to 20 to allow filtering). Adjust the endpoint as needed.
    const apiUrl = 'https://api.vercel.com/v6/deployments?limit=20';
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }
    const data = await response.json();
    const deployments = data.deployments ?? [];
    // Keep only READY deployments and take the first three.
    const projects = deployments
      .filter((d: any) => d.readyState === 'READY')
      .slice(0, 3)
      .map((d: any) => ({
        id: d.uid,
        name: d.name,
        url: `https://${d.url}`,
        // Placeholder image – you can replace with a real screenshot later.
        image: '/vercel.svg',
        tag: d.name,
        category: 'Deployment',
        techStack: ['Next.js', 'Vercel'],
        problem: 'N/A',
        solution: 'N/A',
        result: 'N/A',
      }));

    return res.status(200).json({ projects });
  } catch (err: any) {
    console.error('Error fetching Vercel projects:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
