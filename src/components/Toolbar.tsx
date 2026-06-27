import { TemplatePage } from '../types';

interface Props {
  siteName: string;
  onBack: () => void;
  onSave: () => void;
  onExport: () => void;
  currentPage: string;
  pages: TemplatePage[];
  onPageChange: (id: string) => void;
}

export function Toolbar({ siteName, onBack, onSave, onExport, currentPage, pages, onPageChange }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
      <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">
        &larr; Dashboard
      </button>
      <div className="w-px h-6 bg-gray-200" />
      <h2 className="font-semibold text-gray-900 text-sm">{siteName}</h2>
      <div className="flex-1" />
      <select
        value={currentPage}
        onChange={e => onPageChange(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1"
      >
        {pages.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button
        onClick={onExport}
        className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 border border-gray-300 rounded"
      >
        Export
      </button>
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
