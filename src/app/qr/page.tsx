/**
 * /qr — Dynamic QR Redirect Page
 *
 * This server component immediately issues a 307 Temporary Redirect
 * to the URL stored in the NEXT_PUBLIC_QR_REDIRECT_URL environment variable.
 *
 * ✅ No client-side JavaScript involved.
 * ✅ No external libraries.
 * ✅ Destination is fully controlled via env var — the QR code never changes.
 *
 * To change the destination:
 *   1. Update NEXT_PUBLIC_QR_REDIRECT_URL in Vercel → Settings → Environment Variables
 *   2. Trigger a Redeploy (Deployments → Redeploy)
 */

import { redirect } from 'next/navigation';

// Force dynamic rendering on every request.
// Without this, Next.js may statically render the redirect at build time,
// which would bake in the env value and ignore future changes.
export const dynamic = 'force-dynamic';

export default function QRRedirectPage() {
  // Read destination from env — falls back to home if variable is missing.
  const destination = process.env.NEXT_PUBLIC_QR_REDIRECT_URL?.trim() || '/';

  // redirect() from next/navigation issues a 307 Temporary Redirect server-side.
  redirect(destination);
}
