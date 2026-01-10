import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: {
      total: 5,
      active: 3,
      usage: '2,760',
      scheduled: 1,
    },
    coupons: [
      {
        id: 1,
        code: 'ASTNEW50',
        type: 'Persentase',
        value: '50%',
        period: '2024-12-01 s/d 2024-12-31',
        status: 'Aktif',
        statusType: 'active',
        used: 245,
        limit: 1000,
        target: 'Merchant Baru',
      },
      {
        id: 2,
        code: 'PAYDAY20',
        type: 'Persentase',
        value: '20%',
        period: '2024-12-15 s/d 2024-12-25',
        status: 'Aktif',
        statusType: 'active',
        used: 892,
        limit: 2000,
        target: 'Semua Merchant',
      },
      {
        id: 3,
        code: 'CASHBACK100K',
        type: 'Nominal',
        value: 'Rp 100.000',
        period: '2024-11-01 s/d 2024-11-30',
        status: 'Kadaluarsa',
        statusType: 'expired',
        used: 1500,
        limit: 1500,
        target: 'Premium Merchant',
      },
      {
        id: 4,
        code: 'EARLYBIRD',
        type: 'Persentase',
        value: '30%',
        period: '2024-12-20 s/d 2025-01-05',
        status: 'Terjadwal',
        statusType: 'scheduled',
        used: 0,
        limit: 500,
        target: 'Merchant Jakarta',
      },
      {
        id: 5,
        code: 'FREEMONTH',
        type: 'Free Trial',
        value: '1 Bulan Gratis',
        period: '2024-12-01 s/d 2025-01-31',
        status: 'Aktif',
        statusType: 'active',
        used: 123,
        limit: 300,
        target: 'Merchant Baru',
      },
    ],
  };

  return NextResponse.json(data);
}
