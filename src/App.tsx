import { useState } from 'react';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  if (view === 'dashboard') {
    return <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />;
  }

  // Editor placeholder — filled in Task 4
  return (
    <div className="h-full flex flex-col">
      <div className="text-center py-4 bg-gray-100 border-b">
        <button
          onClick={() => setView('dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          &larr; Back to Dashboard
        </button>
        <span className="ml-4 text-gray-600">Editing: {selectedSiteId}</span>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Editor coming next...
      </div>
    </div>
  );
}
