import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Target site returned status ${response.status}`);
    }

    let html = await response.text();

    // Inject <base href="..."> to ensure relative resources load from the original domain
    const targetOrigin = new URL(url).origin;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head><base href="${targetOrigin}/">`);
    } else {
      html = `<head><base href="${targetOrigin}/"></head>${html}`;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Explicitly allow framing in our response to ensure the browser doesn't block it
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    return res.status(200).send(html);

  } catch (error: any) {
    console.warn(`Proxy failed to fetch ${url}, serving archived mockup template:`, error.message);

    // Extract site identifier to serve a tailored mockup if offline
    let siteName = 'Samaria Build';
    let bodyGradient = 'from-zinc-950 via-stone-900 to-zinc-950';
    let contentHtml = '';

    if (url.includes('carhub')) {
      siteName = 'Carhub Zimbabwe';
      bodyGradient = 'from-zinc-950 via-stone-900 to-red-950';
      contentHtml = `
        <div style="text-align: center; max-width: 500px; padding: 40px; border: 1px solid rgba(220,38,38,0.2); background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border-radius: 8px;">
          <span style="color: #dc2626; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 10px;">ARCHIVED SYSTEM PREVIEW</span>
          <h1 style="font-size: 32px; color: #fff; margin: 0 0 15px 0; font-family: sans-serif; font-weight: 300;">CARHUB ZIMBABWE</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 25px;">The live domain is currently undergoing DNS relocation. Below is the system outline registered in the Samaria deployment archive:</p>
          <div style="text-align: left; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #ccc;">
            <strong>System Type:</strong> Automotive Marketplace & Catalog<br/>
            <strong>Inventory Capacity:</strong> Dynamic Multi-Image Uploads<br/>
            <strong>Outcome achieved:</strong> Reduced catalog upload time to &lt; 2 minutes
          </div>
        </div>
      `;
    } else if (url.includes('valkubu')) {
      siteName = 'Valkubu Limited';
      bodyGradient = 'from-slate-900 via-stone-900 to-zinc-950';
      contentHtml = `
        <div style="text-align: center; max-width: 500px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border-radius: 8px;">
          <span style="color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 10px;">ARCHIVED SYSTEM PREVIEW</span>
          <h1 style="font-size: 32px; color: #fff; margin: 0 0 15px 0; font-family: sans-serif; font-weight: 300;">VALKUBU LIMITED</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 25px;">The live domain is currently undergoing DNS relocation. Below is the system outline registered in the Samaria deployment archive:</p>
          <div style="text-align: left; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #ccc;">
            <strong>System Type:</strong> Enterprise Resource Management Portal<br/>
            <strong>Compliance Standard:</strong> International Contract Ready<br/>
            <strong>Outcome achieved:</strong> Accelerated international client verification cycles
          </div>
        </div>
      `;
    } else if (url.includes('smiles')) {
      siteName = 'Smiles Dental';
      bodyGradient = 'from-teal-950 via-slate-900 to-emerald-950';
      contentHtml = `
        <div style="text-align: center; max-width: 500px; padding: 40px; border: 1px solid rgba(13,148,136,0.2); background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border-radius: 8px;">
          <span style="color: #0d9488; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 10px;">ARCHIVED SYSTEM PREVIEW</span>
          <h1 style="font-size: 32px; color: #fff; margin: 0 0 15px 0; font-family: sans-serif; font-weight: 300;">SMILES DENTAL</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 25px;">The live domain is currently undergoing DNS relocation. Below is the system outline registered in the Samaria deployment archive:</p>
          <div style="text-align: left; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #ccc;">
            <strong>System Type:</strong> Healthcare Scheduling Portal<br/>
            <strong>Features:</strong> SMS Notifications & Intake Records<br/>
            <strong>Outcome achieved:</strong> Cut appointment call volume by 60%
          </div>
        </div>
      `;
    } else {
      contentHtml = `
        <div style="text-align: center; max-width: 500px; padding: 40px; border: 1px solid rgba(201,168,76,0.2); background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border-radius: 8px;">
          <span style="color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 10px;">ARCHIVED SYSTEM PREVIEW</span>
          <h1 style="font-size: 32px; color: #fff; margin: 0 0 15px 0; font-family: sans-serif; font-weight: 300;">SAMARIA DEPLOYMENT</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 25px;">The live domain is currently undergoing DNS relocation. Below is the system outline registered in the Samaria deployment archive:</p>
          <div style="text-align: left; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #ccc;">
            <strong>URL Requested:</strong> ${url}<br/>
            <strong>Status:</strong> DNS lookup failed (Archived State)<br/>
            <strong>Codebase:</strong> Active & fully maintained
          </div>
        </div>
      `;
    }

    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${siteName} - Archived Preview</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: 'Outfit', sans-serif;
              color: #f5f5f5;
              background: linear-gradient(135deg, ${bodyGradient.replace('from-', '').replace('via-', '').replace('to-', '')});
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          ${contentHtml}
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    return res.status(200).send(fallbackHtml);
  }
}
