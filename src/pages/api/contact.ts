import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactBrief {
  name: string;
  company: string;
  email: string;
  systemType: string;
  timeline: string;
  brief: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, systemType, timeline, brief } = req.body as ContactBrief;

  // Basic validation
  if (!name || !email || !systemType || !brief) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Construct Email Content
  const subject = `[Samaria System Build Brief] - ${name} (${company || 'Individual'})`;
  const textContent = `
NEW PROJECT BRIEF SUBMISSION
============================
Name: ${name}
Company: ${company || 'N/A'}
Work Email: ${email}
System Type: ${systemType}
Desired Timeline: ${timeline || 'Not specified'}

Project Brief:
----------------------------
${brief}
============================
Submitted via Samaria Web Intake Pipeline.
`;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #c9a84c; background-color: #0b0b0b; color: #f5f5f5;">
      <h2 style="color: #c9a84c; border-bottom: 1px solid rgba(201, 168, 76, 0.3); padding-bottom: 10px; text-transform: uppercase; font-size: 18px; letter-spacing: 0.1em;">
        New Project Brief Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 12px; width: 120px;">01 // NAME</td>
          <td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 12px;">02 // COMPANY</td>
          <td style="padding: 8px 0; color: #fff;">${company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 12px;">03 // WORK EMAIL</td>
          <td style="padding: 8px 0; color: #c9a84c; font-weight: bold;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 12px;">04 // SYSTEM TYPE</td>
          <td style="padding: 8px 0; color: #fff;">${systemType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 12px;">05 // TIMELINE</td>
          <td style="padding: 8px 0; color: #fff;">${timeline || 'Not specified'}</td>
        </tr>
      </table>
      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
        <span style="font-size: 10px; color: #c9a84c; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">06 // PROJECT BRIEF</span>
        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 4px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #e0e0e0;">${brief}</div>
      </div>
      <div style="margin-top: 30px; border-top: 1px solid rgba(201, 168, 76, 0.2); padding-top: 15px; font-size: 10px; color: #666; text-align: center; letter-spacing: 0.05em;">
        SAMARIA WEB INTAKE PIPELINE
      </div>
    </div>
  `;

  // Destination configuration
  const toEmail = process.env.EMAIL_TO || 'hello@samaria.io';
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  // 1. Check Resend API first
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log('Attempting to dispatch brief using Resend API...');
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: subject,
          html: htmlContent,
          text: textContent,
          reply_to: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Brief dispatched successfully via Resend:', data);
        return res.status(200).json({ success: true, method: 'resend', id: data.id });
      } else {
        const errorText = await response.text();
        console.error('Resend API response failed:', errorText);
        throw new Error(`Resend API failed with status ${response.status}: ${errorText}`);
      }
    } catch (error: any) {
      console.error('Resend dispatch failed, falling back/reporting error:', error);
    }
  }

  // 2. Check SMTP transport configuration
  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    try {
      console.log('Attempting to dispatch brief via SMTP (Nodemailer)...');
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: textContent,
        html: htmlContent,
        replyTo: email,
      });

      console.log('Brief dispatched successfully via SMTP:', info.messageId);
      return res.status(200).json({ success: true, method: 'smtp', id: info.messageId });
    } catch (error) {
      console.error('SMTP dispatch failed:', error);
    }
  }

  // 3. Fallback: Log to Server Console in development
  console.warn('\n--- [DEVELOPMENT FALLBACK LOG] ---');
  console.warn(`No email credentials (RESEND_API_KEY or SMTP_HOST) found in environment variables.`);
  console.warn('Brief Details Received:');
  console.log(textContent);
  console.warn('----------------------------------\n');

  return res.status(200).json({ 
    success: true, 
    method: 'console_log', 
    message: 'Brief logged to server console (Development Fallback).' 
  });
}
