'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Search } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import AssetFilters from '@/components/Assets/AssetFilters';
import AssetGrid from '@/components/Assets/AssetGrid';
import AssetSidebar from '@/components/Assets/AssetSidebar';
import styles from '@/components/Assets/Assets.module.css';

export default function AssetsPage() {
  const { data, error, isLoading } = useSWR('/api/assets', fetcher);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredAssets = data.assets.filter(asset => {
    const matchesFilter = activeFilter === 'all' || asset.category === activeFilter;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.wrapper}>
      {/* Header with Search */}
      <div className={styles.searchWrapper}>
        <Search size={18} color="#94A3B8" />
        <input 
          type="text" 
          placeholder="Cari..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <AssetFilters 
        currentFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        counts={data.counts}
      />

      <AssetGrid 
        assets={filteredAssets} 
        onAssetClick={setSelectedAsset} 
      />

      <AssetSidebar 
        isOpen={!!selectedAsset}
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}
