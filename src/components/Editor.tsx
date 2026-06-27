import { useState, useMemo } from 'react';
import { getSite, saveSite, updateOverrides } from '../services/storage';
import { getTemplate } from '../templates';
import { SectionsSidebar } from './SectionsSidebar';
import { EditorCanvas } from './EditorCanvas';
import { SettingsPanel } from './SettingsPanel';
import { Toolbar } from './Toolbar';
import { FunnelSite, Template } from '../types';

interface Props {
  siteId: string;
  onBack: () => void;
}

export function Editor({ siteId, onBack }: Props) {
  const [site, setSite] = useState<FunnelSite>(() => getSite(siteId)!);
  const template = useMemo<Template | undefined>(
    () => getTemplate(site.templateId),
    [site.templateId]
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string>('home');

  if (!template) {
    return <div className="p-8 text-red-500">Template not found</div>;
  }

  const currentPage = template.pages.find(p => p.id === currentPageId);
  if (!currentPage) return <div className="p-8">Page not found</div>;

  const selectedSection = currentPage.sections.find(s => s.id === selectedSectionId) || null;

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };

  const handleOverrideChange = (sectionId: string, key: string, value: any) => {
    const updated = updateOverrides(site, sectionId, { [key]: value });
    setSite(updated);
    saveSite(updated);
  };

  const handleSave = () => {
    saveSite(site);
    alert('Saved!');
  };

  // Merge default attributes with overrides
  const getMergedAttributes = (sectionId: string, defaults: Record<string, any>) => {
    const overrides = site.overrides[sectionId] || {};
    return { ...defaults, ...overrides };
  };

  return (
    <div className="h-full flex flex-col">
      <Toolbar
        siteName={site.name}
        onBack={onBack}
        onSave={handleSave}
        currentPage={currentPageId}
        pages={template.pages}
        onPageChange={setCurrentPageId}
      />
      <div className="flex-1 flex overflow-hidden">
        <SectionsSidebar
          sections={currentPage.sections}
          selectedSectionId={selectedSectionId}
          onSelect={handleSectionClick}
          mergedAttributes={currentPage.sections.reduce((acc, s) => {
            acc[s.id] = getMergedAttributes(s.id, s.defaultAttributes);
            return acc;
          }, {} as Record<string, Record<string, any>>)}
        />
        <EditorCanvas
          template={template}
          site={site}
          selectedSectionId={selectedSectionId}
          onSelectSection={handleSectionClick}
        />
        {selectedSection && (
          <SettingsPanel
            key={selectedSection.id}
            section={selectedSection}
            mergedAttributes={getMergedAttributes(selectedSection.id, selectedSection.defaultAttributes)}
            onChange={(key, value) => handleOverrideChange(selectedSection.id, key, value)}
          />
        )}
      </div>
    </div>
  );
}
