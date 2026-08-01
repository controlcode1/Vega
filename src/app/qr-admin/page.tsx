/**
 * /qr-admin — QR Code Generator Page
 *
 * Generates a high-resolution QR Code pointing to this site's /qr redirect route.
 * Download it and print it — it will work forever regardless of where /qr redirects.
 *
 * This is a server component: the QR is generated on the server and sent as SVG.
 * No client-side JS required for generation.
 */

import QRCode from 'qrcode';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Generator — Vega Gaming Arena',
  robots: 'noindex, nofollow', // Keep this page private
};

export const dynamic = 'force-dynamic';

export default async function QRAdminPage() {
  // The permanent QR URL — this never changes, only the env var behind /qr changes
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://vega-gamma.vercel.app';
  const qrUrl = `${host}/qr`;

  // Generate SVG string server-side
  const svgString = await QRCode.toString(qrUrl, {
    type: 'svg',
    width: 400,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H', // Highest error correction (survives damage/dirt)
  });

  return (
    <main className="min-h-screen bg-[#070708] flex flex-col items-center justify-center px-6 py-16 text-[#F8FAFC]">

      {/* Header */}
      <div className="text-center mb-10 space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#A66DDB]">Vega Gaming Arena</p>
        <h1 className="text-3xl font-black">Your QR Code</h1>
        <p className="text-sm text-[#64748B] max-w-sm mx-auto">
          Print this once. Change the destination anytime from Vercel without reprinting.
        </p>
      </div>

      {/* QR Code Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_0_60px_rgba(166,109,219,0.3)]">
        {/* Render the SVG inline */}
        <div
          className="w-64 h-64"
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
      </div>

      {/* URL label below QR */}
      <p className="mt-6 text-[#A66DDB] font-mono text-sm tracking-wide">{qrUrl}</p>

      {/* Current destination */}
      <div className="mt-8 bg-[#0E0E12] border border-[#1E2230] rounded-2xl px-6 py-4 text-center space-y-1 max-w-sm w-full">
        <p className="text-xs uppercase tracking-widest text-[#64748B]">Currently redirects to</p>
        <p className="text-sm font-semibold text-[#72B4FF] break-all">
          {process.env.NEXT_PUBLIC_QR_REDIRECT_URL || '/ (home — env var not set)'}
        </p>
      </div>

      {/* Download button — downloads the SVG */}
      <a
        href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`}
        download="vega-qr-code.svg"
        className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)' }}
      >
        ⬇ Download QR Code (SVG)
      </a>

      <p className="mt-4 text-xs text-[#64748B]">
        SVG format — infinite resolution, perfect for print.
      </p>
    </main>
  );
}
