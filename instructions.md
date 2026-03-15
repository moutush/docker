# Docker Tutorial — Project Documentation

This document is the single source of truth for understanding, maintaining, and extending this project. It is now a **100% static Next.js application**.

---

## 1. What This Project Is

A **Docker Tutorial documentation site** built with **Next.js (App Router)**. 

### Architecture Change
Previously, content was stored in a SQLite database. To ensure maximum performance, SEO, and developer experience, the project has been migrated to **Static React Components**. Each page is a pre-rendered static asset.

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Content | Static JSX/TSX Components |
| Styling | Bootstrap 5 + custom dark theme (`globals.css`) |
| Icons | Bootstrap Icons (`bi-*`) |

---

## 2. Directory Map

The project uses a clean, categorized directory structure:

```
src/app/
├── (getting-started)/    # Grouped: /introduction, /installation, etc.
├── commands/             # Categorized Docker commands
│   ├── cleanup/          # system prune, container prune, etc.
│   ├── debugging/        # inspect, stats, top, etc.
│   └── networking/       # network ls, create, etc.
├── storage/              # Volumes, Bind Mounts, Drivers
├── db-contents/          # TEXT VIEW: Crawls all static files for review
└── api/
    └── search/           # FILE SEARCH: Crawls .tsx files for results
```

---

## 3. Core Architecture: `DocPage`

To maintain a consistent "Diamond Standard" look, all documentation pages utilize the shared [DocPage](file:///home/rajatsubhra/Learn/Docker/src/components/DocPage.tsx) component.

### Page Structure
A typical documentation page (`page.tsx`) follows this pattern:

```tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Topic Title - Docker Documentation",
  description: "Brief overview of the topic."
};

export default function MyTopicPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <h1>Topic Title</h1>
        <div className="doc-content-grid">
           {/* Section Cards go here */}
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Search API (Static)

**File:** `src/app/api/search/route.ts`

The search feature no longer requires a database. It uses a **File Crawling System**:
1. It recursively scans the `src/app` directory for `page.tsx` files.
2. It extracts `title` and `description` from the exported `metadata`.
3. It maps the file paths to URLs (cleaning up route groups like `(getting-started)`).
4. Results are ranked by relevance (Title matches > Description matches > Content matches).

---

## 5. How to Add Content

Adding a new page is now as simple as adding a new file:

1. **Create Directory**: Create a new folder in the appropriate category (e.g., `src/app/commands/my-new-cmd`).
2. **Create page.tsx**: Add a `page.tsx` file using the `DocPage` structure.
3. **Update Sidebar**: Add your new page to the `NAV_CONFIG` in [Sidebar.tsx](file:///home/rajatsubhra/Learn/Docker/src/components/Sidebar.tsx).

---

## 6. Maintenance & Performance

- **Build Time**: All pages are pre-rendered at build time.
- **Production**: Run `npm run build` followed by `npm start`.
- **Search Refresh**: The search index is built dynamically from the filesystem on every request (fast enough for static file counts).

---

## 7. Running the Project

```bash
# Start development server
npm run dev

# Production Build
npm run build

# Production Start
npm start
```