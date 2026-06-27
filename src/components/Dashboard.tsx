import { useState, useEffect } from 'react';
import { FunnelSite } from '../types';
import { loadSites, deleteSite } from '../services/storage';
import { SiteCard } from './SiteCard';
import { TemplateGallery } from './TemplateGallery';

interface Props {
  onSelect: (siteId: string) => void;
}

export function Dashboard({ onSelect }: Props) {
  const [sites, setSites] = useState<FunnelSite[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  const refresh = () => setSites(loadSites());

  useEffect(refresh, []);

  const handleDelete = (id: string) => {
    deleteSite(id);
    refresh();
  };

  const handleCreate = () => setShowGallery(true);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funnel Builder</h1>
          <p className="text-gray-500 mt-1">Create and manage your funnel websites</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          + New Funnel
        </button>
      </header>

      {sites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-lg mb-4">No funnels yet</p>
          <button
            onClick={handleCreate}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first funnel &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map(site => (
            <SiteCard
              key={site.id}
              site={site}
              onSelect={() => onSelect(site.id)}
              onDelete={() => handleDelete(site.id)}
            />
          ))}
        </div>
      )}

      {showGallery && (
        <TemplateGallery
          onSelect={(type, templateId) => {
            setShowGallery(false);
            onSelect(`new-${type}-${templateId}`);
          }}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}
