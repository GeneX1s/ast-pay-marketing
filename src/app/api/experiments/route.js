import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: {
      total: 4,
      running: 2,
      finished: 1,
      avgUplift: '+18.5%'
    },
    experiments: [
      { 
        id: 1, 
        name: 'CTA Button Test - Landing Page Utama', 
        target: 'Landing Page Daftar Gratis', 
        variants: [
            { name: 'A: Daftar Sekarang', ctr: '11.7%', conversions: 287, impressions: 2450 },
            { name: 'B: Mulai Gratis', ctr: '14.0%', conversions: 334, impressions: 2389, isWinner: true }
        ],
        status: 'Selesai', 
        startDate: '2024-12-01',
        endDate: '2024-12-08'
      },
      { 
        id: 2, 
        name: 'Email Subject Line Test', 
        target: 'Welcome Email Campaign', 
        variants: [
            { name: 'A: Selamat Datang di AST PAY!', ctr: '11.7%', conversions: 120, impressions: 1000 },
            { name: 'B: Aktifkan Akun Anda Sekarang', ctr: '14.9%', conversions: 180, impressions: 1200 }
        ],
        status: 'Berjalan', 
        startDate: '2024-12-10',
        endDate: null
      },
      { 
        id: 3, 
        name: 'Pricing Page Layout Test', 
        target: 'Halaman Paket & Harga', 
        variants: [
            { name: 'A: Grid 3 Kolom', ctr: '11.0%', conversions: 150, impressions: 1360 },
            { name: 'B: Tabel Comparison', ctr: '13.3%', conversions: 190, impressions: 1420 }
        ],
        status: 'Berjalan', 
        startDate: '2024-12-12',
        endDate: null
      },
      { 
        id: 4, 
        name: 'Banner Color Test', 
        target: 'Promo Akhir Tahun Banner', 
        variants: [
            { name: 'A: Biru (#3B82F6)', ctr: '-', conversions: 0, impressions: 0 },
            { name: 'B: Hijau (#10B981)', ctr: '-', conversions: 0, impressions: 0 }
        ],
        status: 'Draft', 
        startDate: '2024-12-20',
        endDate: null
      }
    ]
  };

  return NextResponse.json(data);
}
