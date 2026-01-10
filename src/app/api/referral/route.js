import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: {
      totalPartners: 4,
      totalLeads: 677,
      activation: 224,
      totalCommission: 'Rp 112M'
    },
    partners: [
      {
        id: 1,
        name: 'PT Digital Marketing Solution',
        email: 'partner@dms.co.id',
        code: 'DMS2024',
        leads: 245,
        activation: 89,
        commission: 'Rp 44.500.000',
        status: 'Aktif',
        statusType: 'active'
      },
      {
        id: 2,
        name: 'Konsultan Bisnis Indonesia',
        email: 'info@kbi.id',
        code: 'KBI2024',
        leads: 178,
        activation: 62,
        commission: 'Rp 31.000.000',
        status: 'Aktif',
        statusType: 'active'
      },
      {
        id: 3,
        name: 'Komunitas UMKM Jakarta',
        email: 'hello@umkmjakarta.com',
        code: 'UMKMJKT',
        leads: 156,
        activation: 45,
        commission: 'Rp 22.500.000',
        status: 'Aktif',
        statusType: 'active'
      },
      {
        id: 4,
        name: 'Agensi Kreatif Nusantara',
        email: 'agency@kreatif.co.id',
        code: 'KREATIV24',
        leads: 98,
        activation: 28,
        commission: 'Rp 14.000.000',
        status: 'Pending',
        statusType: 'pending'
      }
    ]
  };

  return NextResponse.json(data);
}
