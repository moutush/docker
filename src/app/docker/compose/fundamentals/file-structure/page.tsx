import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose File Structure - Docker Documentation",
  description: "Learn the anatomy of a compose.yaml file — top-level keys, YAML syntax rules, and how Docker reads it."
};

export default function ComposeFileStructurePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-file-earmark-code-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Compose File Structure</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 3.1 — Anatomy of a <code>compose.yaml</code> file, YAML rules, and every top-level key explained.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* FILENAME */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-file-earmark-fill"></i></div>
            <h2 className="doc-card-heading">What to Name the File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Docker looks for these filenames automatically (in priority order):</p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Filename</th><th>Status</th><th>Notes</th></tr></thead>
                <tbody>
                  <tr><td><code>compose.yaml</code></td><td><span className="badge bg-success">Preferred</span></td><td>Modern standard. Use this for all new projects.</td></tr>
                  <tr><td><code>compose.yml</code></td><td><span className="badge bg-info text-dark">Supported</span></td><td>Same as above, alternate extension.</td></tr>
                  <tr><td><code>docker-compose.yaml</code></td><td><span className="badge bg-warning text-dark">Legacy</span></td><td>Old V1 name. Still works in V2.</td></tr>
                  <tr><td><code>docker-compose.yml</code></td><td><span className="badge bg-warning text-dark">Legacy</span></td><td>Old V1 name. Still works in V2.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* YAML CRASH COURSE */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-code-slash"></i></div>
            <h2 className="doc-card-heading">YAML Crash Course for Compose</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Compose files use YAML. Here are the three things you absolutely need to know:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# 1. Indentation = hierarchy (use 2 spaces, NEVER tabs)
services:
  web:           # 2 spaces in = child of "services"
    image: nginx # 4 spaces in = child of "web"

# 2. Colon+space = key: value
image: nginx:alpine    # key is "image", value is "nginx:alpine"

# 3. Dash = list item
ports:
  - "80:80"     # list item 1
  - "443:443"   # list item 2`}
            </pre>
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong className="text-danger">Never use tabs in YAML.</strong>
                <span className="text-secondary x-small"> YAML is whitespace-sensitive and tabs are invalid. Always use 2 spaces for each indent level. A tab will cause a parse error that can be very hard to debug.</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP-LEVEL KEYS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-layers-fill"></i></div>
            <h2 className="doc-card-heading">The Top-Level Keys</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">A <code>compose.yaml</code> has four top-level keys. Only <code>services</code> is required:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:     # REQUIRED — defines what containers to run
  web: ...
  db: ...

volumes:      # OPTIONAL — declares named volumes
  db-data:
  uploads:

networks:     # OPTIONAL — declares custom networks
  frontend-net:
  backend-net:

secrets:      # OPTIONAL — declares production secrets
  db-password:
    file: ./secrets/db-password.txt`}
            </pre>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Key</th><th>Required?</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td><code>services</code></td><td><span className="badge bg-danger">Required</span></td><td>Defines each container (service) to run</td></tr>
                  <tr><td><code>volumes</code></td><td><span className="badge bg-secondary">Optional</span></td><td>Declares named volumes for data persistence</td></tr>
                  <tr><td><code>networks</code></td><td><span className="badge bg-secondary">Optional</span></td><td>Declares custom Docker networks</td></tr>
                  <tr><td><code>secrets</code></td><td><span className="badge bg-secondary">Optional</span></td><td>Declares secret values (passwords, tokens)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <strong className="text-info">Top-level vs. Service-level keys:</strong>
                <span className="text-secondary x-small"> Notice that things like <code>image:</code>, <code>ports:</code>, and <code>environment:</code> are <strong>not</strong> top-level keys. They are <em>service-level</em> keys because they must be indented underneath a specific service inside the <code>services:</code> block. <strong className="text-light">We will cover all the Service-Level keys in deep detail on the very next page!</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ANNOTATED FULL EXAMPLE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-code-square"></i></div>
            <h2 className="doc-card-heading">Fully Annotated Example</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# compose.yaml
# ─────────────────────────────────────────────────────────────
# TOP LEVEL: services (mandatory)
# ─────────────────────────────────────────────────────────────
services:

  web:                        # Service name (you choose this)
    image: nginx:1.25-alpine  # Which image to use
    container_name: my-web    # Optional: custom container name
    ports:
      - "80:80"               # HOST_PORT:CONTAINER_PORT
    volumes:
      - ./html:/usr/share/nginx/html   # Bind mount (We know this because it starts with a local path './'. Named volumes start with just a word, e.g., 'db-data')
    networks:
      - frontend              # attach to custom network
    restart: unless-stopped   # restart policy
    depends_on:
      - api                   # start "api" service first

  api:
    build:                    # Build from local Dockerfile
      context: ./api          # folder with Dockerfile
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_URL=postgres://db:5432/mydb
    networks:
      - frontend
      - backend
    depends_on:
      db:
        condition: service_healthy   # wait for healthcheck

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${'$'}{DB_PASSWORD}  # from .env file
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5

# ─────────────────────────────────────────────────────────────
# TOP LEVEL: volumes (named volumes)
# ─────────────────────────────────────────────────────────────
volumes:
  db-data:        # Managed by Docker; persists across restarts

# ─────────────────────────────────────────────────────────────
# TOP LEVEL: networks (custom networks)
# ─────────────────────────────────────────────────────────────
networks:
  # These are custom networks because we explicitly defined them.
  # If we left this section out, Docker would create one "default" network for everything.
  frontend:       # web + api can talk to each other
  backend:        # api + db can talk; web cannot reach db`}
            </pre>
          </div>
        </div>

        {/* DCA INTERVIEW */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview & DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: What is the default filename Docker Compose looks for?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>compose.yaml</code> is the modern preferred name. Docker also accepts <code>compose.yml</code>, <code>docker-compose.yaml</code>, and <code>docker-compose.yml</code> for backward compatibility.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What are the four top-level keys in a Compose file?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>services</strong> (required — defines containers), <strong>volumes</strong> (optional — named storage), <strong>networks</strong> (optional — custom networking), and <strong>secrets</strong> (optional — sensitive values). Only <code>services</code> is mandatory.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
