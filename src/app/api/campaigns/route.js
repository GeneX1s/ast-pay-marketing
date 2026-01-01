import { NextResponse } from 'next/server';

export async function GET() {
  const campaigns = [
    {
      id: 1,
      name: 'Promo Akhir Tahun 2024',
      channel: 'Email + Social',
      audience: '5.234',
      leads: '1243',
      conversion: '28%',
      cost: 'Rp 15M',
      status: 'Aktif',
      statusType: 'active',
    },
    {
      id: 2,
      name: 'Campaign Merchant Baru',
      channel: 'Ads + Email',
      audience: '3.892',
      leads: '892',
      conversion: '22%',
      cost: 'Rp 12M',
      status: 'Aktif',
      statusType: 'active',
    },
    {
      id: 3,
      name: 'Referral Program Q4',
      channel: 'Referral',
      audience: '2.654',
      leads: '654',
      conversion: '31%',
      cost: 'Rp 8M',
      status: 'Aktif',
      statusType: 'active',
    },
    {
      id: 4,
      name: 'Webinar Series Marketing',
      channel: 'Email + Webinar',
      audience: '1.432',
      leads: '432',
      conversion: '19%',
      cost: 'Rp 5M',
      status: 'Jeda',
      statusType: 'paused',
    },
  ];

  return NextResponse.json(campaigns);
}
