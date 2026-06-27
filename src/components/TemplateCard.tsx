import { Template } from '../types';

interface Props {
  template: Template;
  onSelect: () => void;
}

const typeColors: Record<string, string> = {
  vsl: 'border-blue-200 bg-blue-50',
  waitlist: 'border-green-200 bg-green-50',
};

export function TemplateCard({ template, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
        typeColors[template.type] || 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-sm">
        {template.thumbnail ? (
          <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>Preview</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{template.name}</h3>
      <p className="text-sm text-gray-500 mt-1 capitalize">{template.type} &bull; {template.pages.length} pages</p>
    </button>
  );
}
