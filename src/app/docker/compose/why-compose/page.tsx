import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Docker Compose? - Docker Documentation",
  description: "Understand the real-world problems Docker Compose solves: multi-container apps, networking, dependency management, and environment consistency."
};

export default function WhyComposePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-question-circle-fill text-warning fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Why Docker Compose Exists</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 2 — The real-world problems Compose solves. Understanding the "why" makes the "how" effortless.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE PROBLEM */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger"><i className="bi bi-bug-fill"></i></div>
            <h2 className="doc-card-heading">The Problem: Real Apps Have Multiple Containers</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A "Hello World" tutorial uses one container. A real-world web application looks like this:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`┌─────────────────────────────────────────────────────────────┐
│                    YOUR WEB APPLICATION                      │
│                                                             │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐             │
│  │  Frontend │──▶│  Backend  │──▶│ PostgreSQL │             │
│  │  React    │   │  Node.js  │   │  Database  │             │
│  └───────────┘   └─────┬─────┘   └───────────┘             │
│                        │                                    │
│                  ┌─────▼─────┐   ┌───────────┐             │
│                  │   Redis   │   │  Worker   │             │
│                  │   Cache   │   │  (Queue)  │             │
│                  └───────────┘   └───────────┘             │
└─────────────────────────────────────────────────────────────┘`}
            </pre>
            <p className="text-secondary">
              Without Compose, you would start each container <strong>manually</strong>, in the correct order, with every flag typed by hand:
            </p>
            <pre className="doc-code-block bg-dark text-danger border-danger p-3 x-small mb-0">
{`# The painful manual way — 5 separate commands, every single time:
docker run -d --name postgres -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data --network mynet postgres:16

docker run -d --name redis --network mynet redis:alpine

docker run -d --name backend -e DB_HOST=postgres \\
  -e REDIS_URL=redis://redis:6379 --network mynet \\
  -p 3001:3001 my-backend:latest

docker run -d --name worker -e DB_HOST=postgres \\
  --network mynet my-worker:latest

docker run -d --name frontend -e API_URL=http://backend:3001 \\
  --network mynet -p 80:80 my-frontend:latest`}
            </pre>
          </div>
        </div>

        {/* THE SOLUTION */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-check-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success">The Solution: One File, One Command</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              The exact same stack with Compose — everything is declared once, readable, and version-controlled:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# compose.yaml — all 5 services in one readable file
services:
  frontend:
    image: my-frontend:latest
    ports: ["80:80"]
    environment:
      - API_URL=http://backend:3001

  backend:
    image: my-backend:latest
    ports: ["3001:3001"]
    environment:
      - DB_HOST=postgres
      - REDIS_URL=redis://redis:6379
    depends_on: [postgres, redis]

  worker:
    image: my-worker:latest
    environment:
      - DB_HOST=postgres
    depends_on: [postgres]

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:alpine

volumes:
  pgdata:`}
            </pre>
            <pre className="doc-code-block bg-dark text-success border-success p-2 x-small mb-0">
{`# Start everything with ONE command:
docker compose up -d`}
            </pre>
          </div>
        </div>

        {/* 5 KEY PROBLEMS SOLVED */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-list-check"></i></div>
            <h2 className="doc-card-heading">5 Core Problems Compose Solves</h2>
          </div>
          <div className="doc-card-body">
            <div className="row g-3">
              {[
                {
                  num: "1", color: "info", title: "Startup Ordering",
                  body: "Your API can't connect to a database that hasn't started yet. Compose's depends_on (and healthchecks) ensures services start in the correct order."
                },
                {
                  num: "2", color: "success", title: "Automatic Networking",
                  body: "All services in a Compose file can reach each other by service name (e.g. ping postgres). Compose creates a shared private network automatically — no manual docker network create needed."
                },
                {
                  num: "3", color: "warning", title: "Environment Consistency",
                  body: "The same compose.yaml works on every developer's laptop, CI server, and staging environment. No more 'it works on my machine' problems."
                },
                {
                  num: "4", color: "danger", title: "Volume Management",
                  body: "Named volumes (pgdata, redis-data) are declared once and Compose handles creation, mounting, and lifecycle. Data persists across container restarts automatically."
                },
                {
                  num: "5", color: "primary", title: "Single Lifecycle",
                  body: "docker compose up starts everything. docker compose down stops and removes everything (containers, networks). docker compose logs streams all service logs in one view."
                },
              ].map((item) => (
                <div key={item.num} className="col-md-6">
                  <div className={`p-3 rounded bg-dark border border-${item.color} border-opacity-25 h-100`}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className={`badge bg-${item.color} text-dark`}>{item.num}</span>
                      <strong className={`text-${item.color} small`}>{item.title}</strong>
                    </div>
                    <p className="text-secondary x-small mb-0">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DEV vs PROD */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-arrow-left-right"></i></div>
            <h2 className="doc-card-heading">Development vs Production Differences</h2>
          </div>
          <div className="doc-card-body">
            <div className="row g-2">
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-info h-100">
                  <span className="badge bg-info text-dark mb-2">🖥️ Development</span>
                  <ul className="text-secondary x-small mb-0 ps-3">
                    <li className="mb-1">Bind-mount source code so changes are instant</li>
                    <li className="mb-1">Use <code>build:</code> to compile local Dockerfile</li>
                    <li className="mb-1">Expose all ports for debugging</li>
                    <li className="mb-1">Run database on localhost</li>
                    <li>Use <code>NODE_ENV=development</code></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-warning h-100">
                  <span className="badge bg-warning text-dark mb-2">🚀 Production</span>
                  <ul className="text-secondary x-small mb-0 ps-3">
                    <li className="mb-1">Use pre-built registry images (<code>image:</code>)</li>
                    <li className="mb-1">Only expose necessary ports</li>
                    <li className="mb-1">Use Compose Secrets for credentials</li>
                    <li className="mb-1">Set resource limits (CPU/memory)</li>
                    <li>Use restart policies (<code>restart: always</code>)</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-secondary small mt-3 mb-0">
              You can maintain two files — <code>compose.yaml</code> (base) and <code>compose.prod.yaml</code> (overrides) — and merge them at deploy time: <code>docker compose -f compose.yaml -f compose.prod.yaml up -d</code>
            </p>
          </div>
        </div>

        {/* DCA / INTERVIEW */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview & DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: Why would you use Docker Compose instead of multiple docker run commands?</h6>
                <p className="mb-0 x-small text-secondary">
                  Compose keeps your entire stack definition in a single version-controlled file, handles networking automatically (services communicate by name), manages startup ordering, and reduces human error by eliminating repeated manual flag typing.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What happens to containers when you run docker compose down vs docker compose stop?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>docker compose stop</code> — stops the containers but keeps them (and their local state) on disk. You can restart them with <code>docker compose start</code>.
                  <br />
                  <code>docker compose down</code> — stops AND removes the containers and the auto-created networks. Named volumes persist unless you add <code>-v</code> flag (<code>docker compose down -v</code> wipes volumes too).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
