import type { Metadata } from 'next';

export interface DocSection {
  heading?: string;
  icon?: string;
  description?: string;
  body: string; // raw HTML
}

interface DocPageProps {
  title: string;
  description?: string;
  sections: DocSection[];
}

export function buildMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} - Docker Documentation`,
    description: description || 'Docker documentation page.',
  };
}

export default function DocPage({ title, description, sections }: DocPageProps) {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>{title}</h1>
        {description && (
          <p className="text-secondary opacity-75 fs-5 mb-0">{description}</p>
        )}
      </div>

      <div className="doc-content-grid">
        {sections.map((section, idx) => (
          <div key={idx} className="doc-section-card shadow-lg">
            {section.heading && (
              <div className="doc-card-header-wrapper">
                <div className="heading-icon">
                  <i className={`bi ${section.icon || 'bi-bookmark-fill'}`} />
                </div>
                <h2 className="doc-card-heading">{section.heading}</h2>
              </div>
            )}

            <div className="doc-card-body">
              {section.description && (
                <div dangerouslySetInnerHTML={{ __html: section.description }} />
              )}
              {/* Only render body if it's not empty to avoid empty divs */}
              {section.body && section.body.trim() !== "" && (
                <div dangerouslySetInnerHTML={{ __html: section.body }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
