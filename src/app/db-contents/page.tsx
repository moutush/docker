import fs from "fs";
import path from "path";

function getFiles(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(name);
    }
  }
  return fileList;
}

export default async function DbContentsPage() {
    const appDir = path.join(process.cwd(), 'src/app');
    const allFiles = getFiles(appDir);
    
    const docFiles = allFiles.filter(f => {
        const rel = path.relative(appDir, f);
        return !rel.startsWith('api') && 
               !rel.startsWith('db-contents') && 
               !rel.startsWith('[...') &&
               rel !== 'page.tsx' &&
               rel !== 'layout.tsx' &&
               !rel.includes('_');
    });

    const docPages = docFiles.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Extract title
        let title = "";
        const titleMatch = content.match(/title:\s*"(.*?)"/);
        if (titleMatch) {
            title = titleMatch[1].replace(" - Docker Documentation", "");
        } else {
            const h1Match = content.match(/<h1.*?>\s*(.*?)\s*<\/h1>/);
            if (h1Match) title = h1Match[1];
        }

        // Extract "sections" - basically parts inside dangerouslySetInnerHTML or code blocks
        const sections: string[] = [];
        const htmlMatches = content.matchAll(/dangerouslySetInnerHTML=\{\{\s*__html:\s*[`"']([\s\S]*?)[`"']\s*\}\}/g);
        for (const match of htmlMatches) {
            sections.push(match[1]);
        }
        
        const codeMatches = content.matchAll(/<code.*?>\{[`"']([\s\S]*?)[`"']\}/g);
        for (const match of codeMatches) {
            sections.push(`CODE BLOCK:\n${match[1]}`);
        }

        return { title, sections };
    }).filter(p => p.title);

    return (
        <div className="pure-content-view p-4">
            <style dangerouslySetInnerHTML={{
                __html: `
                .sidebar, .topbar { display: none !important; }
                .main-content { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
                .content-area { padding: 0 !important; }
                .app-wrapper { display: block !important; }
                
                body { background-color: #0d1117; color: #c9d1d9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 1.1rem; }
                .pure-content-view { max-width: 900px; margin: 0 auto; line-height: 1.8; }
                .page-section { margin-bottom: 2rem; border-bottom: 1px solid #30363d; padding-bottom: 2rem; }
                .component-note { white-space: pre-wrap; margin-bottom: 1.5rem; background: #161b22; padding: 15px; border-radius: 6px; border: 1px solid #30363d; }
                .page-title { color: #58a6ff; margin-top: 3rem; margin-bottom: 1.5rem; font-weight: 700; font-size: 2.2rem; border-bottom: 2px solid #58a6ff; padding-bottom: 0.5rem; }
            `}} />

            <div className="alert alert-info py-2 mb-4" style={{ background: '#112b3c', border: '1px solid #1c4e72', color: '#79c0ff' }}>
                Note: This is a static content view gathered from documentation files.
            </div>

            {docPages.map((page, idx) => (
                <div key={idx} className="page-section">
                    <h1 className="page-title">{page.title}</h1>
                    <div className="notes-container">
                        {page.sections.map((section, sidx) => (
                            <div key={sidx} className="component-note">
                                {section}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
