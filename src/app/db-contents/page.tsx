import { prisma } from "@/lib/prisma";

function stripTags(html: string) {
    if (!html) return "";
    // Replace block-level tags with newlines to preserve structure
    let text = html

    // Trim extra newlines
    return text.trim();
}

export default async function DbContentsPage() {
    const pages = await prisma.page.findMany({
        include: {
            components: {
                orderBy: { order: 'asc' }
            },
        },
        orderBy: { id: 'asc' }
    });

    return (
        <div className="pure-content-view p-4">
            {/* Page-specific CSS to hide layout chrome */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .sidebar, .topbar { display: none !important; }
                .main-content { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
                .content-area { padding: 0 !important; }
                .app-wrapper { display: block !important; }
                
                body { background-color: #0d1117; color: #c9d1d9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 1.1rem; }
                .pure-content-view { max-width: 900px; margin: 0 auto; line-height: 1.8; }
                .page-section { margin-bottom: 2rem; border-bottom: 1px solid #30363d; padding-bottom: 2rem; }
                .component-note { white-space: pre-wrap; margin-bottom: 2rem; }
                .component-heading { color: #58a6ff; margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; font-size: 1.2rem; border-bottom: 1px solid #21262d; padding-bottom: 0.5rem; }
            `}} />

            {pages.map((page) => (
                <div key={page.id} className="page-section">
                    <div className="notes-container">
                        {page.components.map((component) => (
                            <div key={component.id}>
                                {component.heading && (
                                    <div className="component-heading">
                                        {stripTags(component.heading)}
                                    </div>
                                )}
                                <div className="component-note">
                                    {stripTags(component.content)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
