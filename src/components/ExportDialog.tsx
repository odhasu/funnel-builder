import { useState } from 'react';
import { FunnelSite, Template } from '../types';
import { exportAsNextJSProject } from '../services/export';

interface Props {
  site: FunnelSite;
  template: Template;
  siteName: string;
  onClose: () => void;
}

export function ExportDialog({ site, template, siteName, onClose }: Props) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportAsNextJSProject(site, template, siteName);
      setDone(true);
    } catch (err) {
      alert('Export failed: ' + (err as Error).message);
    }
    setExporting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Export Funnel</h2>
        <p className="text-gray-600 text-sm mb-6">
          Generate a Next.js project with all your sections and settings.
          Upload the zip to Claude to deploy to Vercel.
        </p>
        {done ? (
          <div className="text-center py-4">
            <p className="text-green-600 font-medium mb-2">Exported successfully!</p>
            <p className="text-xs text-gray-400">Upload the zip to Claude, then ask: "Deploy this to Vercel"</p>
            <button onClick={onClose} className="mt-4 text-blue-600 hover:text-blue-700 text-sm">Done</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {exporting ? 'Exporting...' : 'Download ZIP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
