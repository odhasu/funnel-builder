import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Template, FunnelSite } from '../types';
import { initGrapesJS, loadTemplateIntoCanvas } from '../lib/grapesjs-bridge';
import type { Editor as GjsEditor } from 'grapesjs';

interface Props {
  template: Template;
  site: FunnelSite;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
}

export const EditorCanvas = forwardRef<any, Props>(function EditorCanvas({ template, site, selectedSectionId, onSelectSection }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<GjsEditor | null>(null);

  useImperativeHandle(ref, () => ({
    get editor() { return editorRef.current; },
  }));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;
    const editor = initGrapesJS(containerRef.current);
    editorRef.current = editor;

    setReady(true);

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !ready) return;
    loadTemplateIntoCanvas(editorRef.current, template, site, 'home');
  }, [template.id, ready]);

  // Highlight selected section
  useEffect(() => {
    if (!editorRef.current) return;
    const all = editorRef.current.DomComponents.getComponents();
    all.forEach((c: any) => {
      const el = c.getEl();
      if (!el) return;
      const sectionId = el.dataset?.sectionId;
      el.style.outline = sectionId === selectedSectionId ? '3px solid #3b82f6' : 'none';
      el.style.outlineOffset = sectionId === selectedSectionId ? '2px' : '0';
    });
  }, [selectedSectionId]);

  // Click handler on canvas — find section id from clicked element
  useEffect(() => {
    if (!editorRef.current || !ready) return;
    const canvasEl = editorRef.current.Canvas.getBody();
    const handler = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== canvasEl) {
        const sectionId = target.dataset?.sectionId;
        if (sectionId) {
          onSelectSection(sectionId);
          return;
        }
        target = target.parentElement;
      }
    };
    canvasEl.addEventListener('click', handler);
    return () => canvasEl.removeEventListener('click', handler);
  }, [ready, onSelectSection]);

  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[length:20px_20px]" />
      <div
        className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
})
