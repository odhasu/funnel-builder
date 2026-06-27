import { useState } from 'react';
import { FunnelType } from '../types';
import { getTemplates } from '../templates';
import { createSite } from '../services/storage';
import { TemplateCard } from './TemplateCard';

interface Props {
  onSelect: (type: FunnelType, templateId: string) => void;
  onClose: () => void;
}

export function TemplateGallery({ onSelect, onClose }: Props) {
  const [filter, setFilter] = useState<FunnelType | 'all'>('all');
  const templates = filter === 'all' ? getTemplates() : getTemplates(filter);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['all', 'vsl', 'waitlist'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'vsl' ? 'VSL Funnels' : 'Waitlists'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map(t => (
            <TemplateCard
              key={t.id}
              template={t}
              onSelect={() => {
                const site = createSite(`${t.name} - ${Date.now()}`, t.type, t.id);
                onSelect(site.type, t.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
