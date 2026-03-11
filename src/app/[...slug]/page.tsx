import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

type PageProps = {
    params: Promise<{ slug: string[] }>
};
// export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
//     const awaitedParams = await params;
//     const fullSlug = "/" + awaitedParams.slug.join("/");

//     const page = await prisma.page.findUnique({
//         where: { slug: fullSlug },
//     });

//     return {
//         title: page ? `${page.title} - Docker Documentation` : "Page Not Found",
//         description: page?.description || "Documentation page",
//     };
// }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const fullSlug = "/" + slug.join("/");

    const page = await prisma.page.findUnique({
        where: { slug: fullSlug },
    });

    return {
        title: page ? `${page.title} - Docker Documentation` : "Page Not Found",
        description: page?.description || "Documentation page",
    };
}

// ULTIMATE SIMPLIFIED RENDERER: Just output the HTML from DB
const PageComponentRenderer = ({ comp }: { comp: any }) => {
    switch (comp.type) {
        case "heading":
            return null; // Headings are handled by the section grouping logic
        case "code":
            return (
                <pre className="doc-code-block">
                    <code className={`language-${comp.language || 'text'}`}>{comp.content}</code>
                </pre>
            );
        default:
            // For paragraph, sub-heading, table, and anything else:
            // The DB already contains the raw HTML tags (e.g. <p>, <h3>, <table>)
            return (
                <div dangerouslySetInnerHTML={{ __html: comp.content }} />
            );
    }
};

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const fullSlug = "/" + slug.join("/");

    const page = await prisma.page.findUnique({
        where: { slug: fullSlug },
        include: {
            components: {
                orderBy: { order: "asc" },
            },
        },
    });

    if (!page) notFound();

    // Group components into Cards (Sections)
    const sections: { heading: string, icon?: string, description?: string, components: any[] }[] = [];

    page.components.forEach(comp => {
        if (comp.type === "heading") {
            sections.push({
                heading: comp.heading || page.title,
                icon: comp.icon,
                description: comp.content,
                components: []
            });
        } else {
            // If no heading was found yet, create a default "Section"
            if (sections.length === 0) {
                sections.push({
                    heading: page.title,
                    icon: "bi-bookmark-fill",
                    components: []
                });
            }
            sections[sections.length - 1].components.push(comp);
        }
    });

    return (
        <div className="container-fluid py-5 px-md-5">
            <div className="page-intro-header mb-5 text-center text-md-start">
                <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>{page.title}</h1>
                {page.description && <p className="text-secondary opacity-75 fs-5 mb-0"> {page.description} </p>}
            </div>

            <div className="doc-content-grid">
                {sections.map((section, idx) => (
                    <div key={idx} className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className={`bi ${section.icon || 'bi-bookmark-fill'}`}></i>
                            </div>
                            <h2 className="doc-card-heading">{section.heading}</h2>
                        </div>

                        <div className="doc-card-body">
                            {section.description && (
                                <div dangerouslySetInnerHTML={{ __html: section.description }} />
                            )}
                            {section.components.map((comp) => (
                                <PageComponentRenderer key={comp.id} comp={comp} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
