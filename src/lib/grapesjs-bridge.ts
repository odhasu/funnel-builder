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
        <div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:68px 1rem 1.5rem;position:relative;background:${attrs.bgColor || '#000000'};text-align:center;">
          <div style="max-width:670px;width:100%;position:relative;z-index:1;">
            <h1 style="font-size:52.8px;line-height:58.08px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(167deg,${attrs.gradientFrom || '#ffffff'} 0%,${attrs.gradientTo || '#919191'} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 1.5rem;">${attrs.headline || ''}</h1>
            <p style="font-size:20px;line-height:30px;color:${attrs.mutedColor || '#d4d4d4'};max-width:510px;margin:0 auto;">${attrs.subheadline || ''}</p>
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
        <div style="padding:0 0 1rem;background:${attrs.bgColor || '#000000'};text-align:center;">
          <h1 style="font-size:47.8px;line-height:52.58px;font-weight:700;letter-spacing:-0.02em;background:linear-gradient(135deg,${attrs.gradientFrom || '#ffffff'} 0%,${attrs.gradientTo || '#969696'} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 1.5rem;">${attrs.headline || ''}</h1>
          <div style="max-width:400px;margin:0 auto;text-align:center;">
            <form style="display:flex;flex-direction:column;gap:0.75rem;">
              <input type="email" placeholder="${attrs.emailPlaceholder || 'Enter your email'}" style="width:100%;padding:0.75rem;border:2px solid ${attrs.cardBorder || 'rgba(57, 255, 20, 0.3)'};border-radius:0.5rem;font-size:1rem;text-align:center;background:rgba(255,255,255,0.04);color:#fff;" />
              <button type="submit" style="background:${attrs.accentColor || '#39ff14'};color:#000;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;">${attrs.buttonText || 'Join Waitlist'}</button>
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
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:68px 1rem;background:${attrs.bgColor || '#000000'};text-align:center;">
          <div style="max-width:670px;">
            <h1 style="font-size:52.8px;line-height:58.08px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(167deg,${attrs.gradientFrom || '#ffffff'} 0%,${attrs.gradientTo || '#919191'} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 1rem;">${attrs.headline || ''}</h1>
            <p style="font-size:20px;line-height:30px;color:#d4d4d4;margin:1rem auto 0;max-width:510px;">${attrs.subheadline || ''}</p>
          </div>
        </div>`
    },
    'testimonials': {
      html: (attrs) => `
        <div style="padding:2.375rem 1rem;background:${attrs.bgColor || '#000000'};text-align:center;">
          <h2 style="font-size:47.8px;line-height:52.58px;font-weight:700;color:${attrs.textColor || '#ffffff'};margin:0 0 3rem;">${attrs.headline || ''}</h2>
          <div style="max-width:75%;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;">
            <div style="aspect-ratio:16/9;border-radius:0.75rem;overflow:hidden;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#555;font-size:0.75rem;">Video</div>
            <div style="aspect-ratio:16/9;border-radius:0.75rem;overflow:hidden;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#555;font-size:0.75rem;">Video</div>
            <div style="aspect-ratio:16/9;border-radius:0.75rem;overflow:hidden;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#555;font-size:0.75rem;">Video</div>
            <div style="aspect-ratio:16/9;border-radius:0.75rem;overflow:hidden;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#555;font-size:0.75rem;">Video</div>
          </div>
        </div>`
    },
    'wins-section': {
      html: (attrs) => `
        <div style="padding:2.375rem 1rem;background:${attrs.bgColor || '#000000'};text-align:center;">
          <h2 style="font-size:45.8px;line-height:50.38px;font-weight:700;letter-spacing:-0.025em;color:${attrs.textColor || '#ffffff'};margin:0 0 2.5rem;">${attrs.headline || ''}</h2>
          <div style="max-width:75%;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;">
            <div style="aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;color:#333;font-size:0.75rem;">Win</div>
            <div style="aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;color:#333;font-size:0.75rem;">Win</div>
            <div style="aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;color:#333;font-size:0.75rem;">Win</div>
            <div style="aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;color:#333;font-size:0.75rem;">Win</div>
          </div>
        </div>`
    },
    'cta-section': {
      html: (attrs) => `
        <div style="padding:2rem 1rem;background:${attrs.bgColor || '#000000'};text-align:center;">
          <button style="display:inline-flex;align-items:center;justify-content:center;cursor:pointer;background:linear-gradient(to bottom,#5bff3d,#39ff14,#22d600);color:#000;font-weight:600;font-size:0.875rem;border-radius:14.4px;padding:14.08px 18.4px;border:none;box-shadow:0 18px 40px -15px rgba(57,255,20,0.85),0 3px 6px 0 rgba(255,255,255,0.7) inset,0 -3px 6px 0 rgba(0,0,0,0.2) inset;">${attrs.buttonText || 'Get Started Now'}</button>
        </div>`
    },
    'wl-footer': {
      html: (attrs) => `
        <footer style="width:100%;display:flex;justify-content:center;padding:2.25rem 1rem;background:${attrs.bgColor || '#000000'};">
          <a href="${attrs.link || 'https://clyro.io/'}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:0 10.8px;font-size:0.875rem;color:#919191;text-decoration:none;">${attrs.text || 'Built using clyro'} &#8599;</a>
        </footer>`
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
    'wl-hero': (a) => `<div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:68px 1rem 1.5rem;background:${a.bgColor || '#000'};text-align:center;"><h1 style="font-size:52.8px;line-height:58.08px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(167deg,${a.gradientFrom || '#fff'} 0%,${a.gradientTo || '#919191'} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 1.5rem;">${a.headline}</h1><p style="font-size:20px;line-height:30px;color:${a.mutedColor || '#d4d4d4'};max-width:510px;">${a.subheadline}</p></div>`,
    'wl-form': (a) => `<div style="padding:0 0 1rem;background:${a.bgColor || '#000'};text-align:center;"><h1 style="font-size:47.8px;line-height:52.58px;font-weight:700;letter-spacing:-0.02em;background:linear-gradient(135deg,${a.gradientFrom || '#fff'} 0%,${a.gradientTo || '#969696'} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 1.5rem;">${a.headline}</h1><div style="max-width:400px;margin:0 auto;"><form style="display:flex;flex-direction:column;gap:0.75rem;"><input type="email" placeholder="Enter your email" style="width:100%;padding:0.75rem;border:2px solid ${a.cardBorder || 'rgba(57,255,20,0.3)'};border-radius:0.5rem;text-align:center;background:rgba(255,255,255,0.04);color:#fff;" /><button style="background:${a.accentColor || '#39ff14'};color:#000;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;cursor:pointer;">${a.buttonText || 'Join Waitlist'}</button></form></div></div>`,
    'thank-you': (a) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor || '#000'};text-align:center;"><h1 style="font-size:2.5rem;font-weight:800;color:#fff;">${a.headline}</h1><p style="color:#94a3b8;">${a.subheadline}</p></div>`,
    'testimonials': (a) => `<div style="padding:2.375rem 1rem;background:${a.bgColor || '#000'};text-align:center;"><h2 style="font-size:47.8px;line-height:52.58px;font-weight:700;color:#fff;margin:0 0 3rem;">${a.headline}</h2><div style="max-width:75%;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;"><div style="aspect-ratio:16/9;border-radius:0.75rem;background:#1a1a1a;"></div><div style="aspect-ratio:16/9;border-radius:0.75rem;background:#1a1a1a;"></div><div style="aspect-ratio:16/9;border-radius:0.75rem;background:#1a1a1a;"></div><div style="aspect-ratio:16/9;border-radius:0.75rem;background:#1a1a1a;"></div></div></div>`,
    'wins-section': (a) => `<div style="padding:2.375rem 1rem;background:${a.bgColor || '#000'};text-align:center;"><h2 style="font-size:45.8px;line-height:50.38px;font-weight:700;letter-spacing:-0.025em;color:#fff;margin:0 0 2.5rem;">${a.headline}</h2><div style="max-width:75%;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;"><div style="aspect-ratio:1/1;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);"></div><div style="aspect-ratio:1/1;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);"></div><div style="aspect-ratio:1/1;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);"></div><div style="aspect-ratio:1/1;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);"></div></div></div>`,
    'cta-section': (a) => `<div style="padding:2rem 1rem;background:${a.bgColor || '#000'};text-align:center;"><button style="background:linear-gradient(to bottom,#5bff3d,#39ff14,#22d600);color:#000;font-weight:600;padding:14.08px 18.4px;border-radius:14.4px;border:none;box-shadow:0 18px 40px -15px rgba(57,255,20,0.85),0 3px 6px 0 rgba(255,255,255,0.7) inset,0 -3px 6px 0 rgba(0,0,0,0.2) inset;">${a.buttonText || 'Get Started Now'}</button></div>`,
    'wl-footer': (a) => `<footer style="padding:2.25rem 1rem;background:${a.bgColor || '#000'};text-align:center;"><a href="${a.link || 'https://clyro.io/'}" style="color:#919191;text-decoration:none;font-size:0.875rem;display:inline-flex;align-items:center;gap:6px;">${a.text || 'Built using clyro'} &#8599;</a></footer>`,
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

export function updateSectionAttribute(
  editor: GjsEditor,
  sectionId: string,
  key: string,
  value: any
) {
  const all = editor.DomComponents.getComponents();
  all.forEach((c: any) => {
    const el = c.getEl();
    if (el?.dataset?.sectionId === sectionId) {
      c.setAttributes({ [key]: value });
    }
  });
}

export function getAllSectionAttributes(
  editor: GjsEditor
): Record<string, Record<string, any>> {
  const result: Record<string, Record<string, any>> = {};
  const all = editor.DomComponents.getComponents();
  all.forEach((c: any) => {
    const el = c.getEl();
    if (el?.dataset?.sectionId) {
      result[el.dataset.sectionId] = c.getAttributes();
    }
  });
  return result;
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
      // Force re-render so inline template reads the freshly-set attrs
      comp.view?.render();
    }
  });
}
