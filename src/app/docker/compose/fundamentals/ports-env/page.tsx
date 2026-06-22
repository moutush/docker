import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Ports & Environment - Docker Documentation",
  description: "Master ports, expose, environment variables, and env_file in Docker Compose with production examples."
};

export default function ComposePortsEnvPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-diagram-3-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Ports &amp; Environment</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 3.3 — Control how containers expose ports and receive runtime configuration.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* PORTS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-door-open-fill"></i></div>
            <h2 className="doc-card-heading"><code>ports</code> — Publishing to the Host</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              <code>ports:</code> maps a port on your host machine to a port inside the container. Traffic arriving on the host port is forwarded into the container.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  web:
    image: nginx:alpine
    ports:
      # Short syntax: "HOST:CONTAINER"
      - "80:80"             # host port 80 → container port 80
      - "8443:443"          # host port 8443 → container port 443

      # Bind to specific host IP (security best practice):
      - "127.0.0.1:3000:3000"   # only localhost, not 0.0.0.0

      # Let Docker choose a random host port:
      - "3000"              # host port is random; check with docker compose ps

      # UDP protocol:
      - "5353:5353/udp"

      # Long syntax (more readable for complex mappings):
      - target: 80          # container port
        published: 8080     # host port
        protocol: tcp
        mode: host`}
            </pre>
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-shield-exclamation"></i>
              <div>
                <strong className="text-danger">Always quote port mappings!</strong>
                <span className="x-small text-secondary"> Writing <code>- 9000:9000</code> without quotes can be parsed by YAML as a base-60 float in old parsers. Always use <code>- "9000:9000"</code>.</span>
              </div>
            </div>
          </div>
        </div>

        {/* EXPOSE vs PORTS */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-question-diamond-fill"></i></div>
            <h2 className="doc-card-heading"><code>ports</code> vs <code>expose</code></h2>
          </div>
          <div className="doc-card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success h-100">
                  <span className="badge bg-success mb-2">ports: — public</span>
                  <pre className="x-small text-secondary mb-2">
{`ports:
  - "3000:3000"
# Accessible from:
# ✅ Your browser (localhost:3000)
# ✅ Other containers
# ✅ External network`}
                  </pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-info h-100">
                  <span className="badge bg-info text-dark mb-2">expose: — internal only</span>
                  <pre className="x-small text-secondary mb-2">
{`expose:
  - "3000"
# Accessible from:
# ✅ Other containers (same network)
# ❌ Host machine
# ❌ External network`}
                  </pre>
                </div>
              </div>
            </div>
            <p className="text-secondary small mb-0">
              Use <code>expose:</code> for internal services (databases, caches) that should only be reachable by other containers — never directly from the internet. Use <code>ports:</code> only for services that need to be publicly accessible.
            </p>
          </div>
        </div>

        {/* ENVIRONMENT */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-sliders"></i></div>
            <h2 className="doc-card-heading"><code>environment</code> — Injecting Variables</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Two equivalent syntaxes — map form (recommended) and list form:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  api:
    image: my-api:latest

    # FORM 1: Map syntax (key: value) — cleaner, preferred
    environment:
      NODE_ENV: production
      PORT: 3000
      DB_HOST: db               # other service name as hostname!
      DB_PORT: 5432
      REDIS_URL: redis://cache:6379

    # FORM 2: List syntax ("KEY=VALUE") — compatible with shell .env files
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=db

    # FORM 3: Pass-through from host (no value = inherit from host shell)
    environment:
      - NODE_ENV                # inherits current $NODE_ENV from your terminal`}
            </pre>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">Variable substitution:</strong> Use <code>{"${VARNAME}"}</code> to pull from your <code>.env</code> file: <code>DB_PASSWORD: {"${DB_PASSWORD}"}</code>. The value is resolved at <code>docker compose up</code> time, not baked into the image.
              </div>
            </div>
          </div>
        </div>

        {/* ENV_FILE */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-file-earmark-lock2-fill"></i></div>
            <h2 className="doc-card-heading"><code>env_file</code> — Loading from a File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Load environment variables from a file directly into the container. Different from the top-level <code>.env</code> file — this injects variables <em>into the container's environment</em>, not into the Compose file itself.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  api:
    image: my-api
    env_file:
      - .env              # shared defaults
      - .env.production   # environment-specific overrides

# The .env.production file:
# NODE_ENV=production
# PORT=3000
# DB_HOST=prod-db.example.com
# DB_PASSWORD=ultrasecretpassword`}
            </pre>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Feature</th><th>Top-level <code>.env</code></th><th>Service <code>env_file:</code></th></tr></thead>
                <tbody>
                  <tr>
                    <td>Auto-loaded</td>
                    <td><span className="badge bg-success">Yes</span> — Compose reads it automatically</td>
                    <td><span className="badge bg-warning text-dark">No</span> — must be explicitly declared</td>
                  </tr>
                  <tr>
                    <td>Visible in Compose YAML</td>
                    <td><span className="badge bg-success">Yes</span> — via <code>{"${VAR}"}</code> substitution</td>
                    <td><span className="badge bg-danger">No</span> — only inside the container</td>
                  </tr>
                  <tr>
                    <td>Scope</td>
                    <td>Compose file variable resolution</td>
                    <td>Container runtime environment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FULL LAB */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-play-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success">Hands-On Lab: Environment-Aware App</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create these three files in one folder:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-2">
{`# .env (top-level — variable substitution in compose.yaml)
APP_PORT=3000
DB_PASSWORD=devsecret
NODE_ENV=development`}
            </pre>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-2">
{`# compose.yaml
services:
  app:
    image: node:20-alpine
    working_dir: /app
    command: >
      node -e "
        const http = require('http');
        http.createServer((req, res) => {
          res.end(JSON.stringify({
            env: process.env.NODE_ENV,
            port: process.env.PORT,
            db: process.env.DB_HOST
          }));
        }).listen(process.env.PORT || 3000);
      "
    ports:
      - "${'$'}{APP_PORT}:3000"
    environment:
      NODE_ENV: ${'$'}{NODE_ENV}
      PORT: 3000
      DB_HOST: db
      DB_PASSWORD: ${'$'}{DB_PASSWORD}

  db:
    image: postgres:16-alpine
    expose:
      - "5432"             # internal only — NOT published to host
    environment:
      POSTGRES_PASSWORD: ${'$'}{DB_PASSWORD}

volumes: {}`}
            </pre>
            <pre className="doc-code-block bg-dark text-success border-success p-2 x-small mb-0">
{`docker compose up -d
curl http://localhost:3000
# {"env":"development","port":"3000","db":"db"}`}
            </pre>
          </div>
        </div>

        {/* DCA */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview &amp; DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: What is the difference between ports: and expose: in Compose?</h6>
                <p className="mb-0 x-small text-secondary"><code>ports:</code> publishes the container port to the host — accessible from outside Docker. <code>expose:</code> documents that a port is open but only makes it reachable from other containers on the same network — never from the host or internet. Use <code>expose:</code> for internal services like databases.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is the difference between environment: and env_file: in Compose?</h6>
                <p className="mb-0 x-small text-secondary"><code>environment:</code> declares variables inline in the compose.yaml. <code>env_file:</code> loads variables from an external file directly into the container's environment. The top-level <code>.env</code> file is different from both — it supplies values for <code>{"${VAR}"}</code> substitutions within the compose.yaml itself at parse time.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
