import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  if (view === 'dashboard') {
    return <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />;
  }

  return <Editor siteId={selectedSiteId!} onBack={() => setView('dashboard')} />;
}
