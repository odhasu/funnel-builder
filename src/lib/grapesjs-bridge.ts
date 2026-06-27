import grapesjs, { Editor as GjsEditor } from 'grapesjs';
import { Template, FunnelSite } from '../types';

// Register custom component types for each funnel section
function registerFunnelComponents(editor: GjsEditor) {
  const sectionMap: Record<string, { html: (attrs: Record<string, any>) => string }> = {
    'vsl-hero': {
      html: (attrs) => `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:720px;width:100%;position:relative;z-index:1;">
            <h1 style="font-size:3rem;font-weight:800;color:#fff;margin:0 0 1rem;line-height:1.2;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0 0 2rem;">${attrs.subheadline || ''}</p>
            <a style="display:inline-block;background:#3b82f6;color:white;padding:1rem 2.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;cursor:pointer;">${attrs.ctaText || 'Apply Now'}</a>
          </div>
        </div>`
    },
    'wl-hero': {
      html: (attrs) => `
        <div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:560px;width:100%;position:relative;z-index:1;">
            <h1 style="font-size:2.5rem;font-weight:800;color:#fff;margin:0 0 1rem;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0;">${attrs.subheadline || ''}</p>
          </div>
        </div>`
    },
    'video-player': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;display:flex;justify-content:center;background:#f8fafc;">
          <div style="max-width:720px;width:100%;aspect-ratio:16/9;background:#000;border-radius:1rem;overflow:hidden;display:flex;align-items:center;justify-content:center;color:white;position:relative;">
            <span style="font-size:4rem;opacity:0.5;">&#9654;</span>
            ${attrs.coverImage ? `<img src="${attrs.coverImage}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />` : ''}
          </div>
        </div>`
    },
    'app-form': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;background:${attrs.bgColor || '#fff'};">
          <div style="max-width:480px;margin:0 auto;">
            <form style="display:flex;flex-direction:column;gap:1rem;">
              ${(attrs.fields || []).map((f: any) => `
                <div>
                  <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem;">${f.label}${f.required ? ' *' : ''}</label>
                  <input type="${f.type || 'text'}" placeholder="${f.label}" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:0.5rem;font-size:1rem;" />
                </div>
              `).join('')}
              <button type="submit" style="background:#3b82f6;color:white;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;">${attrs.buttonText || 'Submit'}</button>
            </form>
          </div>
        </div>`
    },
    'wl-form': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;background:${attrs.bgColor || '#fff'};">
          <div style="max-width:400px;margin:0 auto;text-align:center;">
            <h2 style="font-size:1.5rem;font-weight:700;color:#111827;margin:0 0 1.5rem;">${attrs.headline || ''}</h2>
            <form style="display:flex;flex-direction:column;gap:0.75rem;">
              <input type="email" placeholder="${attrs.emailPlaceholder || 'Enter your email'}" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:0.5rem;font-size:1rem;text-align:center;" />
              <button type="submit" style="background:#3b82f6;color:white;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;">${attrs.buttonText || 'Join Waitlist'}</button>
            </form>
            ${attrs.incentiveText ? `<p style="font-size:0.8rem;color:#6b7280;margin-top:1rem;">${attrs.incentiveText}</p>` : ''}
          </div>
        </div>`
    },
    'contact-info': {
      html: (attrs) => `
        <div style="padding:3rem 2rem;background:#f9fafb;">
          <div style="max-width:480px;margin:0 auto;text-align:center;">
            <h3 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 1.5rem;">Contact Us</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;color:#4b5563;">
              ${attrs.phone ? `<div>📞 ${attrs.phone}</div>` : ''}
              ${attrs.email ? `<div>✉️ ${attrs.email}</div>` : ''}
              ${attrs.address ? `<div>📍 ${attrs.address}</div>` : ''}
            </div>
          </div>
        </div>`
    },
    'thank-you': {
      html: (attrs) => `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:560px;">
            <div style="font-size:4rem;margin-bottom:1rem;">&#10004;&#65039;</div>
            <h1 style="font-size:2.5rem;font-weight:800;color:#fff;margin:0 0 1rem;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0;">${attrs.subheadline || ''}</p>
          </div>
        </div>`
    },
  };

  Object.entries(sectionMap).forEach(([type, def]) => {
    editor.DomComponents.addType(type, {
      model: {
        defaults: {
          draggable: false,
          droppable: false,
          copyable: false,
          removable: false,
          traits: [],
        },
      },
      view: {
        init() {
          const model = this.model;
          // Re-render when attributes change
          this.listenTo(model, 'change', () => this.render());
        },
        render() {
          const attrs = this.model.getAttributes();
          const html = def.html(attrs);
          this.el.innerHTML = html;
          return this;
        },
      },
    });
  });
}

// Template HTML wrapper per component type (for rendering outside canvas)
export function getComponentHtml(
  component: string,
  attrs: Record<string, any>
): string {
  const renderers: Record<string, (a: Record<string, any>) => string> = {
    'vsl-hero': (a) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:3rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
    'wl-hero': (a) => `<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:2.5rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
    'thank-you': (a) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:2.5rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
  };
  return renderers[component]?.(attrs) || `<div>Unknown: ${component}</div>`;
}

export function initGrapesJS(container: HTMLElement): GjsEditor {
  const editor = grapesjs.init({
    container,
    width: '100%',
    height: '100%',
    canvas: { scripts: [], styles: [] },
    storageManager: { type: 'none' } as any,
    panels: { defaults: [] } as any,
    deviceManager: { devices: [] } as any,
    layerManager: { appendTo: '' } as any,
    selectorManager: { appendTo: '' } as any,
    styleManager: { appendTo: '' } as any,
    traitManager: { appendTo: '' } as any,
    blockManager: { appendTo: '' } as any,
    undoManager: { trackSelection: false } as any,
  });

  registerFunnelComponents(editor);
  return editor;
}

export function loadTemplateIntoCanvas(
  editor: GjsEditor,
  template: Template,
  site: FunnelSite,
  pageId: string
) {
  const page = template.pages.find(p => p.id === pageId);
  if (!page) return;

  editor.DomComponents.clear();
  const wrapper = editor.DomComponents.getWrapper();
  if (!wrapper) return;

  page.sections.forEach(section => {
    const overrides = site.overrides[section.id] || {};
    const attrs = { ...section.defaultAttributes, ...overrides };
    const comps = wrapper.append(`<div data-section-id="${section.id}" data-gjs-type="${section.component}"></div>`);
    const comp = comps instanceof Array ? comps[0] : comps;
    if (comp && comp.setAttributes) {
      comp.setAttributes(attrs);
    }
  });
}
