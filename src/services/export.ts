import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FunnelSite, Template, SectionMeta } from '../types';
import { getSectionMeta } from '../meta';

// Generate Next.js page component content for a given page
function generatePageComponent(
  pageId: string,
  template: Template,
  site: FunnelSite
): string {
  const page = template.pages.find(p => p.id === pageId);
  if (!page) return '';

  const sectionImports: string[] = [];
  const sectionUses: string[] = [];

  page.sections.forEach((section, idx) => {
    const meta = getSectionMeta(section.component);
    const name = meta?.label?.replace(/\s+/g, '') || `Section${idx}`;
    const attrs = { ...section.defaultAttributes, ...(site.overrides[section.id] || {}) };
    sectionImports.push(`import ${name} from '../components/${name}';`);
    sectionUses.push(`      <${name} {...${JSON.stringify(attrs)}} />`);
  });

  return `import Head from 'next/head';

${sectionImports.join('\n')}

export default function ${pageId === 'home' ? 'Home' : 'ThankYou'}() {
  return (
    <>
      <Head>
        <title>${site.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
${sectionUses.join('\n')}
      </main>
    </>
  );
}
`;
}

// Generate React component file for a single section
function generateSectionComponent(
  sectionMeta: SectionMeta,
  overrides: Record<string, any> | undefined
): string {
  const defaults = sectionMeta.settings.reduce((acc, s) => {
    acc[s.id] = overrides?.[s.id] ?? s.default;
    return acc;
  }, {} as Record<string, any>);

  // Simple HTML-based render per component type
  const renderMap: Record<string, (p: Record<string, any>) => string> = {
    'vsl-hero': (p) =>
`      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', margin: '0 0 2rem' }}>{props.subheadline}</p>
          <a style={{ display: 'inline-block', background: '#3b82f6', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>{props.ctaText}</a>
        </div>
      </section>`,
    'wl-hero': (p) =>
`      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{props.subheadline}</p>
        </div>
      </section>`,
    'video-player': () =>
`      <section style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <p>Video Player</p>
        </div>
      </section>`,
    'app-form': (p) => {
      const fields = ((p.fields || []) as any[]).map(f =>
`          <div key="${f.id}">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>${f.label}${f.required ? ' *' : ''}</label>
            <input type="${f.type || 'text'}" placeholder="${f.label}" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
          </div>`
      ).join('\n');
      return `      <section style={{ padding: '4rem 2rem', background: '${p.bgColor}' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
${fields}
            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '1rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>{props.buttonText}</button>
          </form>
        </div>
      </section>`;
    },
    'wl-form': (p) =>
`      <section style={{ padding: '4rem 2rem', background: '${p.bgColor}', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0 0 1.5rem' }}>{props.headline}</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="email" placeholder={props.emailPlaceholder} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', textAlign: 'center' as const }} />
            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '1rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>{props.buttonText}</button>
          </form>
          {props.incentiveText && <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem' }}>{props.incentiveText}</p>}
        </div>
      </section>`,
    'contact-info': (p) =>
`      <section style={{ padding: '3rem 2rem', background: '#f9fafb', textAlign: 'center' as const }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 1.5rem' }}>Contact Us</h3>
          <div style={{ color: '#4b5563' }}>
            {props.phone && <div>📞 {props.phone}</div>}
            {props.email && <div>✉️ {props.email}</div>}
            {props.address && <div>📍 {props.address}</div>}
          </div>
        </div>
      </section>`,
    'thank-you': (p) =>
`      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{props.subheadline}</p>
        </div>
      </section>`,
  };

  const renderBody = renderMap[sectionMeta.component]?.(defaults) || '';

  return `interface Props {
${sectionMeta.settings.map(s => `  ${s.id}: ${s.type === 'number' || s.type === 'boolean' ? s.type : 'string'};`).join('\n')}
}

export default function ${sectionMeta.label.replace(/\s+/g, '')}(props: Props) {
  return (
${renderBody}
  );
}
`;
}

export async function exportAsNextJSProject(site: FunnelSite, template: Template, siteName: string) {
  const zip = new JSZip();
  const slug = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'funnel';

  // package.json
  zip.file('package.json', JSON.stringify({
    name: slug,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      next: '^14.2.0',
      react: '^18.3.0',
      'react-dom': '^18.3.0',
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.3.0',
      '@types/react-dom': '^18.3.0',
      typescript: '^5.5.0',
    },
  }, null, 2));

  // next.config.js
  zip.file('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
module.exports = nextConfig;
`);

  // vercel.json
  zip.file('vercel.json', JSON.stringify({ version: 2 }, null, 2));

  // tsconfig.json
  zip.file('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
    exclude: ['node_modules'],
  }, null, 2));

  // Pages
  template.pages.forEach(page => {
    const content = generatePageComponent(page.id, template, site);
    const fileName = `pages/${page.id === 'home' ? 'index' : page.id}.tsx`;
    zip.file(fileName, content);
  });

  // Components - one per section type used in this template
  const usedComponents = new Set(template.pages.flatMap(p => p.sections.map(s => s.component)));
  usedComponents.forEach(comp => {
    const meta = getSectionMeta(comp);
    if (!meta) return;
    const overrides = template.pages.flatMap(p =>
      p.sections.filter(s => s.component === comp).map(s => site.overrides[s.id])
    ).find(Boolean);
    const content = generateSectionComponent(meta, overrides);
    zip.file(`components/${meta.label.replace(/\s+/g, '')}.tsx`, content);
  });

  // next-env.d.ts
  zip.file('next-env.d.ts', `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`);

  // .gitignore
  zip.file('.gitignore', 'node_modules\n.next\nout\n');

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${slug}.zip`);
}
