import { FunnelSite } from '../types';

interface Props {
  site: FunnelSite;
  onSelect: () => void;
  onDelete: () => void;
}

const typeLabels: Record<string, string> = { vsl: 'VSL Funnel', waitlist: 'Waitlist' };

export function SiteCard({ site, onSelect, onDelete }: Props) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{site.name}</h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full mt-1">
            {typeLabels[site.type] || site.type}
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-sm"
          title="Delete"
        >
          ✕
        </button>
      </div>
      <div className="text-xs text-gray-400">
        Updated {new Date(site.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
