import { useState, useMemo } from 'react';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { ToastContainer } from './components/Toast';
import { createSite } from './services/storage';

function useInitialView() {
  return useMemo(() => {
    const hash = window.location.hash;
    if (hash === '#/lucasresellz' || hash === '#/waitlist') {
      const site = createSite('Lucas Resell Waitlist', 'waitlist', 'waitlist-basic');
      // Clean hash so refresh doesn't duplicate
      window.history.replaceState(null, '', window.location.pathname);
      return { view: 'editor' as const, siteId: site.id };
    }
    return { view: 'dashboard' as const, siteId: null as string | null };
  }, []);
}

export default function App() {
  const initial = useInitialView();
  const [view, setView] = useState<'dashboard' | 'editor'>(initial.view);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(initial.siteId);

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
