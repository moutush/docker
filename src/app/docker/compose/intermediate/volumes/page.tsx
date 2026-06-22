import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Volumes & Bind Mounts - Docker Documentation",
  description: "Learn named volumes, bind mounts, and anonymous volumes in Docker Compose with production patterns."
};

export default function ComposeVolumesPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-hdd-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Volumes &amp; Bind Mounts</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">Section 4.1 — Persist data, share code, and manage storage in Docker Compose.</p>
      </div>

      <div className="doc-content-grid">

        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Why Volumes Matter</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Containers are <strong>ephemeral</strong>. When a container is removed, all data written inside it is gone. A PostgreSQL container without a volume loses every database row the moment you run <code>docker compose down</code>.</p>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25">
              <p className="text-secondary small mb-0">📦 <strong>Analogy:</strong> A container is like a hotel room — everything is cleaned out when you check out. A volume is like a personal storage locker in the lobby — your belongings persist no matter how many times you check in and out.</p>
            </div>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-list-check"></i></div>
            <h2 className="doc-card-heading">3 Volume Types in Compose</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  app:
    image: node:20-alpine
    volumes:
      # 1. BIND MOUNT — sync local folder into container (dev)
      - ./src:/app/src

      # 2. NAMED VOLUME — Docker-managed, persists across restarts (prod)
      - app-data:/app/data

      # 3. ANONYMOUS VOLUME — container-scoped, auto-deleted
      - /app/node_modules

volumes:
  app-data:`}
            </pre>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Type</th><th>Syntax</th><th>Persists?</th><th>Best For</th></tr></thead>
                <tbody>
                  <tr><td>Bind Mount</td><td><code>./local:/container</code></td><td>✅ On host</td><td>Source code hot-reload in development</td></tr>
                  <tr><td>Named Volume</td><td><code>vol-name:/container</code></td><td>✅ Docker-managed</td><td>Database files, uploads in production</td></tr>
                  <tr><td>Anonymous</td><td><code>/container/path</code></td><td>❌ Deleted on down</td><td>Masking directories (node_modules)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-hdd-stack-fill"></i></div>
            <h2 className="doc-card-heading">Named Volumes — Production Pattern</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  postgres:
    image: postgres:16
    volumes:
      - pg-data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data

volumes:
  pg-data:
  redis-data:`}
            </pre>
            <pre className="doc-code-block bg-dark text-success border-success p-2 x-small mb-0">
{`# Inspect a named volume:
docker volume inspect myapp_pg-data

# ⚠️ Delete volumes (DATA LOSS!):
docker compose down -v`}
            </pre>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-link-45deg"></i></div>
            <h2 className="doc-card-heading">Bind Mounts — Hot Reload in Dev</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  app:
    image: node:20-alpine
    working_dir: /app
    command: npm run dev
    volumes:
      - ./src:/app/src          # live code sync
      - ./package.json:/app/package.json
      - /app/node_modules       # keep container's own node_modules`}
            </pre>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong className="text-warning">The node_modules trick:</strong>
                <span className="x-small text-secondary"> Adding <code>- /app/node_modules</code> as an anonymous volume shields the container's Linux-compiled modules from being overwritten by your host OS modules when bind-mounting the project directory.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview &amp; DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: What happens to named volumes when you run docker compose down?</h6>
                <p className="mb-0 x-small text-secondary">Named volumes <strong>persist</strong> by default. Only <code>docker compose down -v</code> removes them. This protects your database data from accidental deletion during stack restarts.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: Why add an anonymous volume for /app/node_modules?</h6>
                <p className="mb-0 x-small text-secondary">To prevent the host's OS-specific <code>node_modules</code> from overwriting the container's Linux-compiled ones when using a bind mount. The anonymous volume "shadows" that path, keeping the container's own dependencies intact.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
