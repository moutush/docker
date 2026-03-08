# Docker Tutorial — Project Documentation

This document is the single source of truth for understanding, maintaining, and extending this project. It is written for both **humans and AI assistants**.

---

## 1. What This Project Is

A **Docker Tutorial documentation site** built with **Next.js (App Router)**. Content is **not** stored in `.md` or `.tsx` files — it lives entirely in a **SQLite database** managed by **Prisma v7**. The Next.js app reads from this database and renders pages dynamically.

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Database | SQLite (`dev.db`) |
| ORM | Prisma v7 with `better-sqlite3` Driver Adapter |
| Styling | Bootstrap 5 + custom dark theme (`globals.css`) |
| Icons | Bootstrap Icons (`bi-*`) |

---

## 2. Directory Map

```
/
├── prisma/
│   ├── schema.prisma        # Database schema (source of truth for models)
│   └── seed.ts              # ALL CONTENT LIVES HERE — add new pages here
├── prisma.config.ts         # Prisma v7 driver adapter config
├── dev.db                   # SQLite database file (auto-generated)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (sidebar + topbar wrapper)
│   │   ├── page.tsx         # Home/landing page (static)
│   │   ├── [...slug]/
│   │   │   └── page.tsx     # CORE ENGINE — renders any DB page dynamically
│   │   ├── db-contents/
│   │   │   └── page.tsx     # Debug view — shows raw DB content as plain text
│   │   ├── api/
│   │   │   ├── menu/        # GET /api/menu — returns sidebar navigation tree
│   │   │   └── search/      # GET /api/search?q= — full-text search
│   │   ├── analytics/       # Analytics page (placeholder)
│   │   ├── settings/        # Settings page (placeholder)
│   │   └── users/           # Users page (placeholder)
│   ├── components/
│   │   ├── Sidebar.tsx      # Navigation sidebar (Client Component)
│   │   └── SearchBar.tsx    # Full-width search bar (Client Component)
│   └── lib/
│       └── prisma.ts        # Prisma singleton (prevents HMR connection leaks)
```

---

## 3. Database Schema (Prisma)

Three models power everything. Defined in `prisma/schema.prisma`.

### `Page` — The content shell

```prisma
model Page {
  id          Int             @id @default(autoincrement())
  title       String          // Page heading displayed at the top
  slug        String          @unique  // URL path e.g. "/core-concepts/images"
  description String          @default("")  // Subtitle shown under title
  components  PageComponent[]
}
```

### `PageComponent` — Individual content blocks within a page

```prisma
model PageComponent {
  id       Int    @id @default(autoincrement())
  pageId   Int
  type     String @default("text")  // "heading" | "paragraph" | "code"
  heading  String @default("")      // Used when type = "heading"
  icon     String @default("")      // Bootstrap icon class e.g. "bi-info-circle"
  content  String                   // Raw HTML or code string
  language String @default("")      // Used when type = "code" (e.g. "bash", "dockerfile")
  order    Int    @default(0)       // Controls render order (ascending)
}
```

### `MenuItem` — Sidebar navigation tree

```prisma
model MenuItem {
  id       Int
  label    String      // Text shown in sidebar
  icon     String      // Bootstrap icon class
  parentId Int?        // null = top-level section header
  pageId   Int?        // Links this menu item to a Page
  order    Int         // Controls display order
}
```

**Hierarchy:** A `MenuItem` with `parentId = null` is a **section header** (e.g., "Getting Started"). Its children are individual **page links**.

---

## 4. Dynamic Page Rendering Flow

**File:** `src/app/[...slug]/page.tsx`

This is the core engine. Every URL like `/introduction` or `/core-concepts/images` hits this single file. Here is exactly what happens, step by step:

### Step 1 — URL Capture
Next.js's `[...slug]` catch-all route captures the URL segments as an array.
- URL `/core-concepts/images` → `params.slug = ['core-concepts', 'images']`

### Step 2 — Slug Reconstruction
The array is joined into a full path string:
```typescript
const fullSlug = "/" + awaitedParams.slug.join("/");
// Result: "/core-concepts/images"
```

### Step 3 — Database Lookup
The slug is used to find the page and all its ordered components in one query:
```typescript
const page = await prisma.page.findUnique({
    where: { slug: fullSlug },
    include: {
        components: { orderBy: { order: "asc" } },
    },
});
if (!page) notFound(); // renders Next.js 404
```

### Step 4 — Section Grouping (Card Layout)
Components are grouped into **cards** (visual sections). A `type: "heading"` component starts a new card. All subsequent non-heading components are children of that card.

```
Component stream from DB:
  { type: "heading",   heading: "Prerequisites", icon: "bi-check" }
  { type: "paragraph", content: "<p>You need 64-bit OS...</p>" }
  { type: "code",      content: "sudo apt install...", language: "bash" }
  { type: "heading",   heading: "Installation", icon: "bi-terminal" }
  { type: "paragraph", content: "<p>Run these commands...</p>" }

Grouped into sections:

  Section 1: heading="Prerequisites"
    - paragraph
    - code block
  Section 2: heading="Installation"
    - paragraph
```

If no `heading` component exists at all, a default section is created using `page.title`.

### Step 5 — Rendering
Each section becomes a `doc-section-card`. Inside, components are rendered by `PageComponentRenderer`:

| Component `type` | Rendered As |
| :--- | :--- |
| `heading` | Card header (handled by grouping, not rendered inline) |
| `code` | `<pre><code class="language-{lang}">` block |
| `paragraph` (or anything else) | `<div dangerouslySetInnerHTML>` — raw HTML from DB is injected directly |

> **Important:** All content in `paragraph` components must be **valid HTML strings** (e.g. `<p>text</p>`, `<h3>title</h3>`, `<table>...</table>`). There is no Markdown parsing.

### Step 6 — SEO Metadata
`generateMetadata()` runs before the page renders and sets `<title>` and `<meta description>` dynamically from the DB.

---

## 5. DB Contents Viewer

**URL:** `/db-contents`
**File:** `src/app/db-contents/page.tsx`

This is a **debugging/inspection page**. Visit it to see the raw content of every page in the database, displayed as plain flowing text without any application chrome (sidebar and topbar are hidden via inline CSS). It is useful for:
- Confirming that seeded content was saved correctly.
- Reviewing all notes and text in a distraction-free view.
- Checking what HTML strings are stored in each `PageComponent`.

---

## 6. How to Add Content

**All content is managed in `prisma/seed.ts`.** To add a new page:

### Step A — Create a `Page` record with its `PageComponent`s

```typescript
const pMyNewPage = await prisma.page.create({
    data: {
        title: "My New Topic",
        slug: "/my-new-topic",         // This becomes the URL
        description: "Short subtitle shown under the title.",
        components: {
            create: [
                // --- Card 1 ---
                {
                    type: "heading",
                    heading: "Overview",
                    icon: "bi-eye-fill",       // Any Bootstrap icon class
                    content: "",               // Optional HTML subtitle for the card
                    order: 1,
                },
                {
                    type: "paragraph",
                    content: "<p>Your content as an HTML string goes here.</p>",
                    order: 2,
                },
                // --- Card 2: Code Example ---
                {
                    type: "heading",
                    heading: "Example Command",
                    icon: "bi-terminal-fill",
                    content: "",
                    order: 3,
                },
                {
                    type: "code",
                    content: `docker run hello-world`,
                    language: "bash",          // "bash", "dockerfile", "json", etc.
                    order: 4,
                },
            ],
        },
    },
});
```

### Step B — Link the Page to the Sidebar Menu

```typescript
// Option 1: Add to an existing section
await prisma.menuItem.create({
    data: {
        label: "My New Topic",
        icon: "bi-file-earmark-text",
        parentId: menuGettingStarted.id, // ID of the parent section header
        pageId: pMyNewPage.id,
        order: 3,
    },
});

// Option 2: Create a new section header + child link
const myNewSection = await prisma.menuItem.create({
    data: { label: "Advanced Topics", icon: "bi-layers-fill", order: 3 },
});
await prisma.menuItem.create({
    data: {
        label: "My New Topic",
        icon: "bi-file-earmark-text",
        parentId: myNewSection.id,
        pageId: pMyNewPage.id,
        order: 1,
    },
});
```

### Step C — Re-seed the Database

```bash
npx tsx prisma/seed.ts
```

> **Warning:** The seed script runs `deleteMany()` on all tables first. It is a **full reset** — not an incremental add. Always keep all content in `seed.ts`.

---

## 7. Database Operations Reference

| Task | Command |
| :--- | :--- |
| Re-seed all content | `npx tsx prisma/seed.ts` |
| Regenerate Prisma client after schema change | `npx prisma generate` |
| Push schema changes to `dev.db` | `npx prisma db push` |
| Open Prisma Studio (GUI) | `npx prisma studio` |
| Start the dev server | `npm run dev` |

---

## 8. Theming & Component Classes

Custom CSS classes used throughout the renderer (defined in `src/app/globals.css`):

| Class | Description |
| :--- | :--- |
| `doc-section-card` | The outer card wrapper for each section |
| `doc-card-header-wrapper` | Flex row containing the icon + heading |
| `doc-card-heading` | The `<h2>` section title |
| `doc-card-body` | Inner padding wrapper for card content |
| `doc-code-block` | `<pre>` block for code components |
| `doc-table-wrapper` | Wrapper for HTML tables in content |
| `heading-icon` | The icon circle on the left of a card header |

**Dark Theme Tokens:**

| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--bg-dark` | `#0d1117` | Main background |
| `--bg-dark-accent` | `#161b22` | Card / sidebar backgrounds |
| `--text-primary` | `#c9d1d9` | Body text |
| `--accent-blue` | `#58a6ff` | Links, headings, highlights |

---

## 9. API Endpoints

### `GET /api/menu`
Returns the full sidebar navigation tree. Consumed by `Sidebar.tsx`.

**Response shape:**
```json
[
  {
    "section": "Getting Started",
    "label": "Getting Started",
    "icon": "bi-rocket-takeoff-fill",
    "children": [
      { "label": "Introduction", "href": "/introduction", "icon": "bi-book-fill" },
      { "label": "Installation", "href": "/installation", "icon": "bi-download" }
    ]
  }
]
```

### `GET /api/search?q={query}`
Full-text search across page titles, descriptions, and component content. Debounced 300ms on the frontend.

---

## 10. Key Gotchas

1. **Content is raw HTML, not Markdown.** When writing `paragraph` content in `seed.ts`, wrap everything in proper HTML tags (`<p>`, `<h3>`, `<ul>`, etc.).
2. **`order` field is critical.** Components render in ascending `order`. Plan your order values with gaps (e.g. 10, 20, 30) so you can insert items later.
3. **`heading` type is invisible inline.** It is consumed by the grouping logic to start a new card — it does not render on its own.
4. **Seeding is destructive.** Every `npx tsx prisma/seed.ts` run wipes the database and rebuilds from scratch. Do not manually insert data via Prisma Studio expecting it to persist.
5. **Prisma singleton.** `src/lib/prisma.ts` uses `globalThis` to cache the Prisma client. This prevents "too many open files" errors during Next.js Hot Module Replacement (HMR).

---

## 11. Future: Incremental Seeding Strategy (RECOMMENDED)

Currently, all content lives in a **single massive `seed.ts` file** that performs a full database wipe on every seed run. This approach has serious limitations:

### Current Problems
- ❌ **Single point of failure** — One syntax error breaks the entire seed
- ❌ **Poor version control** — All pages are in one file; difficult to track which sections changed when
- ❌ **Token waste** — Large files consume many LLM tokens on every edit
- ❌ **Merge conflicts** — Multiple developers editing the same file = constant conflicts
- ❌ **No incremental updates** — Every seed run is a full reset (slow, risky)

### RECOMMENDED Future Approach: Modular Seed + JSON Data

**Architecture:**
```
prisma/
├── seed.ts                    # Main orchestrator (keep minimal)
├── seeders/
│   ├── 00-getting-started.ts  # Seed Getting Started section  
│   ├── 01-commands.ts         # Seed Commands section
│   ├── 02-debugging.ts        # Seed Debugging section
│   └── index.ts               # Exports all seeders to main seed.ts
└── data/
    ├── getting-started/
    │   ├── introduction.json
    │   ├── docker-architecture.json
    │   ├── layers.json
    │   └── ... (one JSON per page)
    └── commands/
        ├── common-linux-commands.json
        ├── docker-run.json
        └── ... (one JSON per page)
```

**Benefits:**
- ✅ **Modular** — Edit/seed one section without touching others
- ✅ **Version controlled** — Each page is a separate file in git; clear commit history
- ✅ **Token efficient** — Edit small files, not 3000+ line monoliths
- ✅ **Collaborative** — Multiple people can edit different sections with no conflicts
- ✅ **Safer** — Can incrementally update database without full reset
- ✅ **Maintainable** — New pages = new JSON file + register in seeder
- ✅ **Reusable** — JSON data can be published as API, migrated to other systems, exported, etc.

**Implementation Strategy (when ready):**
1. Create `prisma/seeders/` directory with one file per section
2. Move page definitions into `prisma/data/*.json` files (keeps content pure, code separate)
3. Update `seed.ts` to conditionally run seeders based on environment flag: `SEED_SECTION=getting-started npm run seed`
4. Keep destructive full-reset as `npm run seed:full` for emergency purposes
5. Add git-tracking of `prisma/data/` for content version control
6. Implement rollback capability (store previous JSON backups)

**When to migrate:** Once the project grows beyond ~10 pages or multiple contributors join.

---

## 12. Running the Project

```bash
# Install dependencies
npm install

# Start development server (rebuilds when you edit files)
npm run dev
# Server runs on http://localhost:3001 (port 3000 may be in use)

# Seed/re-seed the database
npx prisma db seed

# Open Prisma Studio GUI to inspect database
npx prisma studio

# View raw database content as plain text
curl http://localhost:3001/db-contents
```