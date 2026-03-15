import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getFiles(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else if (file.endsWith('page.tsx')) {
      fileList.push(name);
    }
  }
  return fileList;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase();

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        const appDir = path.join(process.cwd(), 'src/app');
        const allFiles = getFiles(appDir);
        
        const files = allFiles.filter(f => {
            const rel = path.relative(appDir, f);
            return !rel.startsWith('api') && 
                   !rel.startsWith('db-contents') && 
                   !rel.startsWith('[...') &&
                   rel !== 'page.tsx' &&
                   rel !== 'layout.tsx' &&
                   !rel.includes('_'); // Skip private folders
        });

        const searchResults: any[] = [];

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf8');
            const lowerContent = content.toLowerCase();

            // Extract title
            let title = "";
            const titleMatch = content.match(/title:\s*"(.*?)"/);
            if (titleMatch) {
                title = titleMatch[1].replace(" - Docker Documentation", "");
            } else {
                const h1Match = content.match(/<h1.*?>\s*(.*?)\s*<\/h1>/);
                if (h1Match) title = h1Match[1];
            }

            if (!title) continue;

            const lowerTitle = title.toLowerCase();

            // Extract description
            let description = "";
            const descMatch = content.match(/description:\s*"(.*?)"/);
            if (descMatch) description = descMatch[1];
            const lowerDesc = description.toLowerCase();

            // Extract slug
            const relPath = path.relative(appDir, file);
            const slug = '/' + path.dirname(relPath)
                .split(path.sep)
                .filter(p => !p.startsWith('(') && !p.endsWith(')'))
                .join('/');

            let score = 0;
            if (lowerTitle === query) score += 100;
            else if (lowerTitle.includes(query)) score += 50;
            
            if (lowerDesc.includes(query)) score += 20;
            if (lowerContent.includes(query)) score += 10;

            if (score > 0) {
                searchResults.push({
                    title: title,
                    slug: slug,
                    snippet: description || "Docker documentation page.",
                    score: score
                });
            }
        }

        // Sort by score descending
        searchResults.sort((a, b) => b.score - a.score);

        const finalResults = searchResults.slice(0, 8).map(({ score, ...rest }) => rest);

        return NextResponse.json({ results: finalResults });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Failed to search" }, { status: 500 });
    }
}
