import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: [
      {
        id: '1',
        icon: 'Users',
        label: 'Prospek',
        value: '2,845',
        trend: 'up',
        trendValue: '+12.5%',
        subLabel: 'Prospek',
      },
      {
        id: '2',
        icon: 'UserPlus',
        label: 'Pendaftar',
        value: '1,234',
        trend: 'up',
        trendValue: '+8.2%',
        subLabel: 'Pendaftar',
      },
      {
        id: '3',
        icon: 'Store',
        label: 'Merchant Aktif',
        value: '567',
        trend: 'up',
        trendValue: '+15.3%',
        subLabel: 'Merchant Aktif',
      },
      {
        id: '4',
        icon: 'TrendingUp',
        label: 'Konversi Berbayar',
        value: '23.4%',
        trend: 'up',
        trendValue: '+2.1%',
        subLabel: 'Konversi Berbayar',
      },
      {
        id: '5',
        icon: 'DollarSign',
        label: 'Pendapatan Teratribusi',
        value: 'Rp 45.2M',
        trend: 'up',
        trendValue: '+18.7%',
        subLabel: 'Pendapatan Teratribusi',
      },
      {
        id: '6',
        icon: 'Target',
        label: 'CAC',
        value: 'Rp 125K',
        trend: 'down',
        trendValue: '-5.3%',
        subLabel: 'CAC',
      },
      {
        id: '7',
        icon: 'BarChart',
        label: 'ROI/ROAS',
        value: '4.2x',
        trend: 'up',
        trendValue: '+0.8x',
        subLabel: 'ROI/ROAS',
      },
    ],
    topCampaigns: [
      {
        id: 1,
        title: 'Promo Akhir Tahun 2024',
        status: 'Aktif',
        statusType: 'active',
        stats: '1,213 prospek • 20% konversi • Rp 15M budget',
      },
      {
        id: 2,
        title: 'Campaign Merchant Baru',
        status: 'Aktif',
        statusType: 'active',
        stats: '632 prospek • 22% konversi • Rp 12M budget',
      },
      {
        id: 3,
        title: 'Referral Program Q4',
        status: 'Aktif',
        statusType: 'black',
        stats: '456 prospek • 17% konversi • Rp 8M budget',
      },
      {
        id: 4,
        title: 'Webinar Series Marketing',
        status: 'Selesai',
        statusType: 'gray',
        stats: '432 prospek • 15% konversi • Rp 5M budget',
      },
    ]
  };

  return NextResponse.json(data);
}
