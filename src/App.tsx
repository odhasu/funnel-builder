import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  return (
    <>
      {view === 'dashboard' ? (
        <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />
      ) : (
        <Editor siteId={selectedSiteId!} onBack={() => setView('dashboard')} />
      )}
      <ToastContainer />
    </>
  );
}
