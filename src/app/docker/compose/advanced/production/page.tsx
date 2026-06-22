import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Production Patterns - Docker Documentation",
  description: "Learn how to use multiple Compose files and overrides to manage development, staging, and production environments."
};

export default function ComposeProductionPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-building-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Production Patterns</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 5.4 — How to structure your Compose files for multiple environments.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE PROBLEM */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">The Multi-Environment Problem</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Your application needs to run differently depending on where it is deployed:
            </p>
            <ul className="text-secondary small mb-3">
              <li><strong>Development:</strong> You want hot-reloading (bind mounts), exposed debugging ports, and local databases.</li>
              <li><strong>Production:</strong> You want fixed image tags, resource limits, secrets, and restart policies.</li>
            </ul>
            <p className="text-secondary mb-0">
              You <em>could</em> maintain a completely separate <code>compose.dev.yaml</code> and <code>compose.prod.yaml</code>, but that leads to duplication and drift. The solution is <strong>Compose Overrides</strong>.
            </p>
          </div>
        </div>

        {/* THE BASE FILE */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-file-earmark"></i></div>
            <h2 className="doc-card-heading">Step 1: The Base File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Create a base <code>compose.yaml</code> that contains ONLY the configuration that is identical across ALL environments.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# compose.yaml (The Base)
services:
  web:
    image: my-app:${'$'}{VERSION}
    # No ports, no volumes, no restart policies here!
    # Just the absolute core definitions.

  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`}
            </pre>
          </div>
        </div>

        {/* THE OVERRIDES */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-files"></i></div>
            <h2 className="doc-card-heading">Step 2: The Overrides</h2>
          </div>
          <div className="doc-card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-warning h-100">
                  <h6 className="text-warning fw-bold small mb-2">compose.override.yaml (Dev)</h6>
                  <p className="x-small text-secondary mb-2">Docker reads this automatically if present.</p>
                  <pre className="x-small text-light mb-0">
{`services:
  web:
    build: .             # build locally
    ports:
      - "3000:3000"      # expose port
    volumes:
      - ./src:/app/src   # hot reload
    environment:
      - NODE_ENV=development`}
                  </pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-danger h-100">
                  <h6 className="text-danger fw-bold small mb-2">compose.prod.yaml (Prod)</h6>
                  <p className="x-small text-secondary mb-2">Must be explicitly passed via CLI flags.</p>
                  <pre className="x-small text-light mb-0">
{`services:
  web:
    restart: unless-stopped
    ports:
      - "80:3000"
    deploy:
      resources:
        limits:
          memory: 512M
    environment:
      - NODE_ENV=production`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEPLOYING */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-terminal"></i></div>
            <h2 className="doc-card-heading">Step 3: Running the Merge</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              When you run <code>docker compose up</code>, Compose automatically merges <code>compose.yaml</code> + <code>compose.override.yaml</code>. 
              <br/>To run production, you explicitly pass the files in order using the <code>-f</code> flag.
            </p>
            
            <div className="mb-3">
              <h6 className="text-light fw-bold small">Local Development (Automatic)</h6>
              <pre className="doc-code-block bg-dark text-success border-secondary p-2 x-small mb-0">
{`# Automatically merges compose.yaml AND compose.override.yaml
docker compose up -d`}
              </pre>
            </div>

            <div>
              <h6 className="text-light fw-bold small">Production Deployment (Explicit)</h6>
              <pre className="doc-code-block bg-dark text-danger border-secondary p-2 x-small mb-0">
{`# Merges base file + production overrides. Order matters!
docker compose -f compose.yaml -f compose.prod.yaml up -d`}
              </pre>
            </div>
            
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">Debugging overrides:</strong> Run <code>docker compose -f compose.yaml -f compose.prod.yaml config</code> to see the final merged YAML before deploying it.
              </div>
            </div>
          </div>
        </div>

        {/* DCA INTERVIEW */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview &amp; DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: What is the purpose of the compose.override.yaml file?</h6>
                <p className="mb-0 x-small text-secondary">It is used to store development-specific configuration (like bind mounts and exposed ports). If it exists in the same directory as <code>compose.yaml</code>, Docker Compose automatically reads and merges it without requiring any CLI flags.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: How do you deploy a Compose stack using a base file and a production override file?</h6>
                <p className="mb-0 x-small text-secondary">By using the <code>-f</code> flag sequentially: <code>docker compose -f compose.yaml -f compose.prod.yaml up -d</code>. Compose reads the files in the order they are passed, so the second file overrides values in the first file.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
