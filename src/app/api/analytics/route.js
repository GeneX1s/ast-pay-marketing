import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    stats: {
      totalLeads: { value: '2,845', change: '+12.5%' },
      conversionRate: { value: '23.4%', change: '+2.1%' },
      cac: { value: 'Rp 125K', change: '-5.3%' }, 
      roi: { value: '4.2x', change: '+0.8x' }
    },
    trend: [
      { date: '1 Des', leads: 120, conversions: 40, paid: 10 },
      { date: '3 Des', leads: 145, conversions: 55, paid: 15 },
      { date: '5 Des', leads: 180, conversions: 65, paid: 20 },
      { date: '7 Des', leads: 160, conversions: 60, paid: 18 },
      { date: '9 Des', leads: 200, conversions: 75, paid: 25 },
      { date: '11 Des', leads: 220, conversions: 90, paid: 35 },
      { date: '13 Des', leads: 240, conversions: 100, paid: 38 },
      { date: '15 Des', leads: 255, conversions: 110, paid: 40 }
    ],
    funnel: [
      { label: 'Pengunjung', value: 12500, percentage: 100, color: '#2563EB' },
      { label: 'Prospek', value: 2845, percentage: 22.8, color: '#3B82F6' },
      { label: 'Pendaftar', value: 534, percentage: 4.3, color: '#60A5FA' },
      { label: 'Berbayar', value: 289, percentage: 2.3, color: '#10B981' }
    ],
    campaigns: [
      { name: 'Promo Akhir Tahun 2024', leads: '1,245 leads', cvr: '28% CVR', change: '+18%', isPositive: true },
      { name: 'Campaign Merchant Baru', leads: '892 leads', cvr: '22% CVR', change: '+12%', isPositive: true },
      { name: 'Referral Program Q4', leads: '654 leads', cvr: '31% CVR', change: '+24%', isPositive: true },
      { name: 'Webinar Series Marketing', leads: '432 leads', cvr: '15% CVR', change: '-3%', isPositive: false }
    ],
    channelData: [
      { name: 'Google Ads', leads: 892, spend: 'Rp 25M', cvr: 28.5, color: '#3B82F6' },
      { name: 'Facebook Ads', leads: 654, spend: 'Rp 18M', cvr: 22.3, color: '#3B82F6' },
      { name: 'Instagram Ads', leads: 543, spend: 'Rp 15M', cvr: 25.1, color: '#3B82F6' },
      { name: 'Email Campaign', leads: 432, spend: 'Rp 8M', cvr: 31.2, color: '#3B82F6' },
      { name: 'Organic Search', leads: 324, spend: 'Rp 0', cvr: 35.8, color: '#3B82F6' }
    ],
    campaignFullData: [
      { id: 1, name: 'Promo Akhir Tahun 2024', leads: '1,243', cvr: '28%', budget: 'Rp 15M', roi: '4.5x' },
      { id: 2, name: 'Campaign Merchant Baru', leads: '892', cvr: '22%', budget: 'Rp 12M', roi: '3.8x' },
      { id: 3, name: 'Referral Program Q4', leads: '654', cvr: '31%', budget: 'Rp 8M', roi: '5.2x' },
      { id: 4, name: 'Webinar Series Marketing', leads: '432', cvr: '19%', budget: 'Rp 5M', roi: '3.1x' },
      { id: 5, name: 'Partnership Q4', leads: '321', cvr: '25%', budget: 'Rp 10M', roi: '2.5x' }
    ],
    cohortData: {
      headers: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      rows: [
        { name: 'Nov W1', values: [100, 78, 65, 58] },
        { name: 'Nov W2', values: [100, 82, 71, 64] },
        { name: 'Nov W3', values: [100, 75, 68, 62] },
        { name: 'Nov W4', values: [100, 88, 76, 70] },
        { name: 'Dec W1', values: [100, 85, 74, 68] }
      ]
    },
    attributionData: {
      pie: [
        { label: 'First Touch: 35%', value: 35, color: '#3B82F6', id: 'ft' },
        { label: 'Last Touch: 28%', value: 28, color: '#10B981', id: 'lt' },
        { label: 'Linear: 22%', value: 22, color: '#F59E0B', id: 'ln' },
        { label: 'Multi-Touch: 15%', value: 15, color: '#8B5CF6', id: 'mt' }
      ],
      comparison: [
        { model: 'First Touch', value: 85, color: '#3B82F6' },
        { model: 'Last Touch', value: 65, color: '#10B981' },
        { model: 'Linear', value: 45, color: '#F59E0B' },
        { model: 'Multi Touch', value: 30, color: '#8B5CF6' }
      ],
      journey: [
        { step: 'Google Ads', type: 'primary' },
        { step: 'Landing Page', type: 'success' },
        { step: 'Email Follow-up', type: 'warning' },
        { step: 'Demo', type: 'purple' },
        { step: 'Conversion', type: 'danger' } // Using danger for red/pink color in screenshot
      ]
    }
  };

  return NextResponse.json(data);
}
