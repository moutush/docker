import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Services - Docker Documentation",
  description: "Learn how to define services in Docker Compose — image, build, ports, environment, command, and all essential service-level keys."
};

export default function ComposeServicesPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-gear-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Services</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 3.2 — The core of every Compose file. Each service = one running container.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* WHAT IS A SERVICE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">What is a Service?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              In Docker Compose, a <strong>service</strong> is the definition of one containerized application component. Every key inside <code>services:</code> defines one container — its image, ports, environment, and behavior.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  web:        # ← service name (you choose it; becomes the DNS hostname)
    image: nginx:alpine
  db:         # ← another service
    image: postgres:16`}
            </pre>
          </div>
        </div>

        {/* IMAGE vs BUILD */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-box-seam-fill"></i></div>
            <h2 className="doc-card-heading"><code>image</code> vs <code>build</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Every service needs either <code>image</code> or <code>build</code> to know what container to run:</p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-success h-100">
                  <span className="badge bg-success mb-2">image: — pull from registry</span>
                  <pre className="x-small text-secondary mb-1">
{`services:
  db:
    image: postgres:16
    # Pulls postgres:16 from Docker Hub`}
                  </pre>
                  <p className="text-secondary x-small mb-0">Use when the image already exists (official or custom pushed to registry).</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-info h-100">
                  <span className="badge bg-info text-dark mb-2">build: — compile from Dockerfile</span>
                  <pre className="x-small text-secondary mb-1">
{`services:
  api:
    build: .        # uses ./Dockerfile
    # OR:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
      args:
        NODE_ENV: development`}
                  </pre>
                  <p className="text-secondary x-small mb-0">Use when you're developing your own image from source code.</p>
                </div>
              </div>
            </div>
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div className="x-small text-secondary">
                You can use <strong>both together</strong>: <code>build:</code> compiles the image and <code>image:</code> gives it a name/tag to cache it in the registry.
              </div>
            </div>
          </div>
        </div>

        {/* PORTS */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-door-open-fill"></i></div>
            <h2 className="doc-card-heading"><code>ports</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Maps a port on your host machine to a port inside the container. Format: <code>"HOST:CONTAINER"</code></p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"          # host:80 → container:80
      - "443:443"        # host:443 → container:443
      - "8080:80"        # host:8080 → container:80 (common for local dev)
      - "127.0.0.1:80:80"  # bind to localhost ONLY (security best practice)`}
            </pre>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong className="text-warning">Security tip:</strong>
                <span className="x-small text-secondary"> Always quote port mappings in Compose files. <code>9000:9000</code> unquoted is parsed as a YAML float in some versions and can cause errors. Use <code>"9000:9000"</code>.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ENVIRONMENT */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-sliders"></i></div>
            <h2 className="doc-card-heading"><code>environment</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Sets environment variables inside the container. Two valid syntaxes:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  api:
    image: my-api
    environment:
      # Syntax 1: map (key: value) — recommended, clearer
      NODE_ENV: production
      PORT: 3000
      DB_HOST: db          # reference another service by name!

    # Syntax 2: list ("KEY=VALUE") — also valid
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_PASSWORD=${'$'}{DB_PASSWORD}  # from .env file`}
            </pre>
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-shield-exclamation"></i>
              <div>
                <strong className="text-danger">Never hardcode secrets.</strong>
                <span className="x-small text-secondary"> Use <code>{"${VARIABLE}"}</code> to pull from a <code>.env</code> file, or use Compose Secrets for production. Passwords in plain YAML files will end up in Git history.</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMMAND / ENTRYPOINT */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-terminal-fill"></i></div>
            <h2 className="doc-card-heading"><code>command</code> & <code>entrypoint</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Override the default CMD/ENTRYPOINT from the image's Dockerfile:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  web:
    image: node:20-alpine
    # Override CMD — run dev server instead of production server
    command: ["npm", "run", "dev"]
    # OR as a string (shell form):
    command: npm run dev

  worker:
    image: my-app
    # Override ENTRYPOINT completely:
    entrypoint: ["/bin/sh", "-c"]
    command: ["python", "worker.py", "--concurrency", "4"]`}
            </pre>
          </div>
        </div>

        {/* VOLUMES (short intro) */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-hdd-fill"></i></div>
            <h2 className="doc-card-heading"><code>volumes</code> (service-level)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Mounts a volume or directory into the container at the service level:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  db:
    image: postgres:16
    volumes:
      # Named volume (persists data, managed by Docker)
      - db-data:/var/lib/postgresql/data

  web:
    image: node:20-alpine
    volumes:
      # Bind mount (syncs your local source code into container)
      - ./src:/app/src
      # Anonymous volume (container-local, deleted on compose down)
      - /app/node_modules

volumes:
  db-data:   # declares the named volume at top level`}
            </pre>
          </div>
        </div>

        {/* FULL WORKING EXAMPLE */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-play-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success">Hands-On Lab: Node.js + PostgreSQL</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create this <code>compose.yaml</code> in an empty folder and run it:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  app:
    image: node:20-alpine
    working_dir: /app
    command: node -e "const http=require('http');http.createServer((_,r)=>{r.end('Hello from Compose!')}).listen(3000)"
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:`}
            </pre>
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <strong className="text-info">Where is the network?</strong>
                <p className="x-small text-secondary mb-2"> You might notice we didn't declare a <code>networks:</code> block! That's because Docker Compose <strong>automatically creates a default network</strong> for every <code>compose.yaml</code> file. Both the <code>app</code> and <code>db</code> containers are automatically attached to it.</p>
                <div className="p-2 bg-dark rounded border border-info border-opacity-25 mt-2">
                  <strong className="text-info x-small">Crucial DCA Distinction:</strong>
                  <p className="x-small text-secondary mb-0 mt-1">In standard Docker (<code>docker run</code>), the default network is the legacy <code>bridge</code> which lacks DNS resolution. But in Docker Compose, the "default" network it creates is actually a brand new <strong>custom bridge network</strong> specifically for this project (named <code>folder_default</code>). That is why automatic DNS resolution works flawlessly here without you having to define a custom network manually!</p>
                </div>
              </div>
            </div>
            <pre className="doc-code-block bg-dark text-success border-success p-2 x-small mb-2">
{`# Start both containers:
docker compose up -d

# Check status:
docker compose ps

# Test the app:
curl http://localhost:3000

# View logs:
docker compose logs -f app

# Stop and remove:
docker compose down`}
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
                <h6 className="fw-bold mb-1 text-info">Q: How do services communicate with each other in Compose?</h6>
                <p className="mb-0 x-small text-secondary">
                  Compose automatically creates a shared network for all services in the same file. Services can reach each other using the <strong>service name</strong> as a hostname. If your service is named <code>db</code>, other services can connect to it at <code>db:5432</code> — no IP addresses needed.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is the difference between ports and expose in Compose?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>ports:</code> publishes a port to the <strong>host machine</strong> — accessible from your laptop browser or external clients.
                  <br />
                  <code>expose:</code> documents that a container listens on a port but does <strong>not publish it to the host</strong> — only other containers in the same network can access it. Used for internal service-to-service communication.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
