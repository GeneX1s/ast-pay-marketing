'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import CampaignHeader from '@/components/Campaign/Detail/CampaignHeader';
import CampaignStats from '@/components/Campaign/Detail/CampaignStats';
import CampaignTabs from '@/components/Campaign/Detail/CampaignTabs';
import CampaignOverview from '@/components/Campaign/Detail/CampaignOverview';
import styles from '@/components/Campaign/Detail/CampaignDetail.module.css';

// Mock Data based on screenshot
const MOCK_CAMPAIGN = {
    id: '1',
    name: 'Promo Akhir Tahun 2024',
    type: 'WhatsApp Campaign',
    status: 'Aktif',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    targetAudience: 'Merchant Baru Jakarta',
    targetCount: '2.450',
    description: 'Kampanye promosi akhir tahun untuk menarik merchant baru dengan penawaran spesial dan diskon menarik.',
    budget: 15000000,
    spent: 9500000,
    stats: {
        impressions: '45.230',
        ctr: '2.75%',
        leads: '1.243',
        leadsChange: '+12.5%',
        conversions: '89',
        cvr: '25.6%',
        roi: '4.2x',
        cac: 'Rp 125.000'
    }
};

export default function CampaignDetailPage({ params }) {
    const [activeTab, setActiveTab] = useState('Overview');

    // In a real app, we would fetch data using params.id
    // const { id } = params;
    // const { id } = params;
    const [campaign, setCampaign] = useState(MOCK_CAMPAIGN);

    const handleToggleStatus = () => {
        setCampaign(prev => ({
            ...prev,
            status: prev.status === 'Aktif' ? 'Jeda' : 'Aktif'
        }));
    };

    const handleEndCampaign = () => {
        setCampaign(prev => ({
            ...prev,
            status: 'Berakhir'
        }));
    };

    if (!campaign) {
        notFound();
    }

    return (
        <div className={styles.wrapper}>
            <CampaignHeader
                campaign={campaign}
                onToggleStatus={handleToggleStatus}
                onEndCampaign={handleEndCampaign}
            />

            <CampaignStats stats={campaign.stats} />

            <CampaignTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'Overview' && <CampaignOverview campaign={campaign} />}
            {activeTab !== 'Overview' && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    Konten tab {activeTab} akan segera hadir
                </div>
            )}
        </div>
    );
}
