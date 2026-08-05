import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json({ error: 'Server misconfiguration: missing CONTACT_TO_EMAIL.' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Vega Gaming Arena <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: [email],
      subject: `📩 رسالة جديدة من ${name} — Vega Contact Form`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0E0E12; color: #F8FAFC; padding: 32px; border-radius: 16px; border: 1px solid #1E2230;">
          <div style="text-align:center; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 22px; background: linear-gradient(135deg,#72B4FF,#A66DDB,#E91E8C); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Vega Gaming Arena
            </h1>
            <p style="color:#64748B; font-size:12px; margin:4px 0 0;">رسالة جديدة من نموذج التواصل</p>
          </div>

          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding: 12px 16px; background:#121217; border-radius:10px 10px 0 0; border-bottom: 1px solid #1E2230;">
                <p style="margin:0; font-size:11px; color:#64748B; text-transform:uppercase; letter-spacing:2px;">الاسم</p>
                <p style="margin:4px 0 0; font-size:16px; font-weight:600; color:#F8FAFC;">${name}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background:#121217; border-bottom: 1px solid #1E2230;">
                <p style="margin:0; font-size:11px; color:#64748B; text-transform:uppercase; letter-spacing:2px;">البريد الإلكتروني</p>
                <p style="margin:4px 0 0; font-size:16px; color:#72B4FF;">${email}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background:#121217; border-radius:0 0 10px 10px;">
                <p style="margin:0; font-size:11px; color:#64748B; text-transform:uppercase; letter-spacing:2px;">الرسالة</p>
                <p style="margin:4px 0 0; font-size:15px; color:#F8FAFC; line-height:1.7; white-space:pre-wrap;">${message}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align:center;">
            <a href="mailto:${email}"
              style="display:inline-block; padding: 12px 28px; background: linear-gradient(135deg,#72B4FF,#A66DDB,#E91E8C); color:#fff; text-decoration:none; border-radius:10px; font-size:14px; font-weight:600;">
              الرد على ${name}
            </a>
          </div>

          <p style="color:#1E2230; font-size:11px; text-align:center; margin-top:24px;">Vega Gaming Arena • Baghdad, Iraq</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend] Full error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to send email.', details: error },
        { status: 500 }
      );
    }

    console.log('[Resend] Email sent successfully, id:', data?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
