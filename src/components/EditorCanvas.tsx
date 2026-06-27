import { useRef } from 'react';
import { Template, FunnelSite } from '../types';

interface Props {
  template: Template;
  site: FunnelSite;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
}

export function EditorCanvas({ template, site, selectedSectionId, onSelectSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[length:20px_20px]" />
      <div
        ref={containerRef}
        className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-2xl overflow-y-auto"
        id="gjs-canvas-container"
      >
        {/* GrapesJS will mount here in Task 5 */}
      </div>
    </div>
  );
}
