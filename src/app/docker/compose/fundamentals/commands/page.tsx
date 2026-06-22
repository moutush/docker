import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Docker Compose CLI Commands - Docker Documentation",
  description: "Master every docker compose command with examples, expected outputs, and DCA exam tips."
};

export default function ComposeCommandsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-terminal-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Docker Compose CLI Commands</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 3.4 — Every <code>docker compose</code> command you need, with real examples and expected output.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* QUICK REFERENCE TABLE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-lightning-charge-fill"></i></div>
            <h2 className="doc-card-heading">Quick Reference</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Command</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><code>docker compose up</code></td><td>Create and start all services</td></tr>
                  <tr><td><code>docker compose up -d</code></td><td>Start in background (detached)</td></tr>
                  <tr><td><code>docker compose up --build</code></td><td>Force rebuild images before starting</td></tr>
                  <tr><td><code>docker compose down</code></td><td>Stop and remove containers + networks</td></tr>
                  <tr><td><code>docker compose down -v</code></td><td>Also delete named volumes (⚠️ data loss)</td></tr>
                  <tr><td><code>docker compose stop</code></td><td>Stop containers (keep them, don't remove)</td></tr>
                  <tr><td><code>docker compose start</code></td><td>Start stopped containers</td></tr>
                  <tr><td><code>docker compose restart</code></td><td>Restart all (or one) service</td></tr>
                  <tr><td><code>docker compose ps</code></td><td>List running containers in the stack</td></tr>
                  <tr><td><code>docker compose logs</code></td><td>Show logs for all services</td></tr>
                  <tr><td><code>docker compose logs -f web</code></td><td>Follow live logs for "web" service</td></tr>
                  <tr><td><code>docker compose exec web sh</code></td><td>Open a shell inside "web" container</td></tr>
                  <tr><td><code>docker compose run web npm test</code></td><td>Run a one-off command in a new container</td></tr>
                  <tr><td><code>docker compose build</code></td><td>Build (or rebuild) images without starting</td></tr>
                  <tr><td><code>docker compose pull</code></td><td>Pull latest images from registry</td></tr>
                  <tr><td><code>docker compose config</code></td><td>Validate and view the merged compose file</td></tr>
                  <tr><td><code>docker compose top</code></td><td>List processes running in each container</td></tr>
                  <tr><td><code>docker compose pause</code></td><td>Pause all services</td></tr>
                  <tr><td><code>docker compose unpause</code></td><td>Unpause all services</td></tr>
                  <tr><td><code>docker compose kill</code></td><td>Force-kill all running containers</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* UP IN DETAIL */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-play-circle-fill"></i></div>
            <h2 className="doc-card-heading"><code>docker compose up</code> — Deep Dive</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# Start all services in foreground (you see all logs, Ctrl+C stops):
docker compose up

# Start in background — most common for development:
docker compose up -d

# Rebuild your custom images first, then start:
docker compose up -d --build

# Start only specific services (and their dependencies):
docker compose up -d web db

# Scale a service to 3 replicas:
docker compose up -d --scale worker=3

# Force recreate containers even if nothing changed:
docker compose up -d --force-recreate`}
            </pre>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25">
              <h6 className="text-success fw-bold small mb-2">Expected output of docker compose up -d:</h6>
              <pre className="x-small text-secondary mb-0">
{`[+] Running 4/4
 ✔ Network myapp_default       Created       0.1s
 ✔ Volume "myapp_db-data"      Created       0.0s
 ✔ Container myapp-db-1        Started       0.5s
 ✔ Container myapp-web-1       Started       0.7s`}
              </pre>
            </div>
          </div>
        </div>

        {/* LOGS IN DETAIL */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-file-text-fill"></i></div>
            <h2 className="doc-card-heading"><code>docker compose logs</code></h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# Show all logs (all services, historical):
docker compose logs

# Follow live logs (like tail -f):
docker compose logs -f

# Follow logs for one specific service only:
docker compose logs -f web

# Show last 50 lines:
docker compose logs --tail=50

# Show timestamps:
docker compose logs --timestamps`}
            </pre>
            <div className="p-3 bg-dark rounded border border-secondary border-opacity-25">
              <h6 className="text-light fw-bold small mb-2">Example output:</h6>
              <pre className="x-small text-secondary mb-0">
{`web-1  | [2024-01-15 10:23:01] Server running on port 3000
db-1   | LOG: database "myapp" created
web-1  | [2024-01-15 10:23:02] Connected to database
db-1   | LOG: autovacuum launcher started`}
              </pre>
            </div>
          </div>
        </div>

        {/* EXEC vs RUN */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-terminal"></i></div>
            <h2 className="doc-card-heading"><code>exec</code> vs <code>run</code></h2>
          </div>
          <div className="doc-card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-info h-100">
                  <span className="badge bg-info text-dark mb-2">docker compose exec</span>
                  <p className="x-small text-secondary mb-2">Runs a command <strong>inside an already-running container</strong>. Does not create a new one.</p>
                  <pre className="x-small text-secondary mb-0">
{`# Open shell in running web container:
docker compose exec web sh

# Run a DB command in running db:
docker compose exec db psql -U admin myapp

# Check environment inside container:
docker compose exec api env`}
                  </pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-warning h-100">
                  <span className="badge bg-warning text-dark mb-2">docker compose run</span>
                  <p className="x-small text-secondary mb-2">Starts a <strong>brand new container</strong> from a service's image, runs the command, then exits. Used for one-off tasks.</p>
                  <pre className="x-small text-secondary mb-0">
{`# Run migrations (new container, then exit):
docker compose run api npm run migrate

# Run tests:
docker compose run --rm web npm test
# --rm removes the container after it exits`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONFIG COMMAND */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-check-circle-fill"></i></div>
            <h2 className="doc-card-heading"><code>docker compose config</code> — Validate Your File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This command reads your <code>compose.yaml</code>, resolves all <code>{"${VAR}"}</code> substitutions from <code>.env</code>, and prints the fully merged, validated output. Invaluable for debugging.
            </p>
            <pre className="doc-code-block bg-dark text-success border-secondary p-3 x-small mb-0">
{`# Validate the compose file (exits with error code if invalid):
docker compose config

# Just check if it's valid without printing:
docker compose config --quiet && echo "Valid!"

# Show only service names:
docker compose config --services

# Show all volume names:
docker compose config --volumes`}
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
                <h6 className="fw-bold mb-1 text-info">Q: What is the difference between docker compose stop and docker compose down?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>stop</code> gracefully halts containers but keeps them on disk — you can <code>start</code> them again quickly. <code>down</code> stops AND removes the containers and auto-created networks. Adding <code>-v</code> to <code>down</code> also deletes named volumes (permanent data loss).
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-3">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: How do you run database migrations with Docker Compose?</h6>
                <p className="mb-0 x-small text-secondary">
                  Use <code>docker compose run --rm api npm run migrate</code>. The <code>run</code> command starts a fresh container from the <code>api</code> service image, runs the migration command, and <code>--rm</code> removes the temporary container automatically when it finishes.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: How do you force a rebuild of all images in Compose?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>docker compose up -d --build</code> — the <code>--build</code> flag forces Compose to re-run <code>docker build</code> for any service using a <code>build:</code> key, even if the image already exists locally. Use this after changing a Dockerfile.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
