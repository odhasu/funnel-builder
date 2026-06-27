import { useState } from 'react';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {view === 'dashboard' ? (
        <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />
      ) : (
        <EditorShell
          siteId={selectedSiteId!}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  );
}

// Placeholder — filled in later tasks
function Dashboard({ onSelect }: { onSelect: (id: string) => void }) {
  return <div className="p-8"><h1 className="text-2xl">Dashboard</h1></div>;
}

function EditorShell({ siteId, onBack }: { siteId: string; onBack: () => void }) {
  return <div className="p-8"><h1 className="text-2xl">Editor: {siteId}</h1></div>;
}
