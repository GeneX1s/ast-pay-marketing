'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Plus } from 'lucide-react';
import { fetcher } from '@/utils/fetcher';
import ExperimentStats from '@/components/Experiments/ExperimentStats';
import ExperimentTable from '@/components/Experiments/ExperimentTable';
import ExperimentSidebar from '@/components/Experiments/ExperimentSidebar';
import CreateExperimentModal from '@/components/Experiments/CreateExperimentModal';
import Toast from '@/components/UI/Toast';
import styles from '@/components/Experiments/Experiments.module.css';

export default function ExperimentsPage() {
  const { data, error, isLoading, mutate } = useSWR('/api/experiments', fetcher);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); 

  // Handle Play/Pause Logic
  const handleToggleStatus = async (id) => {
    if (!data) return;

    const experiment = data.experiments.find(e => e.id === id);
    if (!experiment) return;

    let newStatus;
    let message;
    let type = 'success';

    if (experiment.status === 'Berjalan') {
       newStatus = 'Jeda';
       message = 'Eksperimen dijeda';
       type = 'warning'; // Warning color (Yellow)
    } else {
       newStatus = 'Berjalan';
       message = 'Eksperimen dimulai';
       type = 'success';
    }

    // Optimistic Update
    const updatedExperiments = data.experiments.map(e => 
      e.id === id ? { ...e, status: newStatus } : e
    );
    
    // Calculate new running count (simple approximation for UI)
    const runningDiff = newStatus === 'Berjalan' ? 1 : -1;
    const updatedStats = { ...data.stats, running: data.stats.running + runningDiff };

    mutate({ ...data, stats: updatedStats, experiments: updatedExperiments }, false);

    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCreateSuccess = (newExperiment) => {
    setIsCreateModalOpen(false);
    
    // Optimistic Add
    if (data) {
        const optimisticExperiment = {
            id: Date.now(), // Temp ID
            name: newExperiment.name,
            target: newExperiment.target,
            variants: [
                { name: `A: ${newExperiment.variantA.name}`, ctr: '-', conversions: 0, impressions: 0 },
                { name: `B: ${newExperiment.variantB.name}`, ctr: '-', conversions: 0, impressions: 0 }
            ],
            status: 'Draft',
            startDate: new Date().toISOString().split('T')[0],
            endDate: null
        };

        const updatedExperiments = [optimisticExperiment, ...data.experiments];
        const updatedStats = { ...data.stats, total: data.stats.total + 1 };
        
        mutate({ ...data, stats: updatedStats, experiments: updatedExperiments }, false);
    }

    setToastMessage('Eksperimen berhasil dibuat');
    setToastType('success');
    setShowToast(true);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Eksperimen (A/B Test)</h2>
          <p className={styles.subtitle}>Kelola eksperimen A/B testing untuk optimasi konversi</p>
        </div>
        <button className={styles.createBtn} onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Buat Eksperimen
        </button>
      </div>

      <ExperimentStats stats={data.stats} />
      
      <ExperimentTable 
        experiments={data.experiments} 
        onToggleStatus={handleToggleStatus}
        onViewDetail={setSelectedExperiment} // Opens sidebar
      />

      {/* Sidebar */}
      {selectedExperiment && (
        <ExperimentSidebar 
          experiment={selectedExperiment} 
          onClose={() => setSelectedExperiment(null)} 
        />
      )}

      {/* Create Modal */}
      <CreateExperimentModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Custom Toast Logic for different types */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)}
          type={toastType} // We might need to update Toast component to support types if not already
        />
      )}
    </div>
  );
}
