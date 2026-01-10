import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: {
      totalPages: 4,
      active: 3,
      totalLeads: '2,938',
      conversionRate: '18.5%'
    },
    landingPages: [
      {
        id: 1,
        name: 'Daftar Gratis AST PAY',
        goal: 'Sign Up',
        url: 'astpay.id/daftar-gratis',
        leads: '1,245',
        status: 'Dipublikasikan',
        statusType: 'published'
      },
      {
        id: 2,
        name: 'Webinar Marketing Digital',
        goal: 'Event Registration',
        url: 'astpay.id/webinar-marketing',
        leads: '567',
        status: 'Dipublikasikan',
        statusType: 'published'
      },
      {
        id: 3,
        name: 'Promo Akhir Tahun 2024',
        goal: 'Promotion',
        url: 'astpay.id/promo-akhir-tahun',
        leads: '892',
        status: 'Dipublikasikan',
        statusType: 'published'
      },
      {
        id: 4,
        name: 'Request Demo',
        goal: 'Demo Request',
        url: 'astpay.id/request-demo',
        leads: '234',
        status: 'Draft',
        statusType: 'draft'
      }
    ]
  };

  return NextResponse.json(data);
}
