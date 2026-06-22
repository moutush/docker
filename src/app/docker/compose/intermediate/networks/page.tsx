import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Networks - Docker Documentation",
  description: "Learn Docker Compose networking — default networks, custom networks, and isolating services."
};

export default function ComposeNetworksPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-diagram-2-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Networks</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">Section 4.2 — How Compose handles service-to-service communication and network isolation.</p>
      </div>

      <div className="doc-content-grid">

        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">The Default Network</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">When you run <code>docker compose up</code>, Compose automatically creates a single shared network named <code>&lt;project&gt;_default</code>. Every service joins it automatically — no configuration needed.</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  web:
    image: nginx:alpine
  api:
    image: my-api
  db:
    image: postgres:16
# All three are on "myapp_default" network automatically.
# "api" can reach "db" using: postgres://db:5432
# "web" can reach "api" using: http://api:3000`}
            </pre>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div className="x-small text-secondary"><strong className="text-info">DNS resolution:</strong> Each service's name becomes its DNS hostname on the shared network. No IP addresses needed — just use the service name.</div>
            </div>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-shield-check"></i></div>
            <h2 className="doc-card-heading">Custom Networks — Isolation Pattern</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">Split your stack into isolated networks so the frontend can never directly reach the database — only the backend can:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  frontend:
    image: my-react-app
    networks:
      - public-net    # only on public network

  api:
    image: my-backend
    networks:
      - public-net    # reachable from frontend
      - private-net   # can reach database

  db:
    image: postgres:16
    networks:
      - private-net   # isolated — frontend CANNOT reach db

networks:
  public-net:    # frontend ↔ api
  private-net:   # api ↔ db`}
            </pre>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# Verify network topology:
docker network ls
docker network inspect myapp_private-net`}
            </pre>
          </div>
        </div>

        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-gear-fill"></i></div>
            <h2 className="doc-card-heading">Network Configuration Options</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`networks:
  frontend:
    driver: bridge          # default for single-host
    name: my-frontend-net   # custom name instead of "project_frontend"

  backend:
    driver: bridge
    ipam:                   # custom IP address management
      config:
        - subnet: 172.28.0.0/16
          gateway: 172.28.0.1

  external-proxy:
    external: true          # use a pre-existing network (created outside Compose)
    name: nginx-proxy`}
            </pre>
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
                <h6 className="fw-bold mb-1 text-info">Q: How do services communicate in Docker Compose?</h6>
                <p className="mb-0 x-small text-secondary">Compose creates a shared bridge network for all services. Services reach each other using their <strong>service name as a DNS hostname</strong>. A service named <code>db</code> is reachable at <code>db:5432</code> from any other service in the same Compose file.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is an external network in Compose?</h6>
                <p className="mb-0 x-small text-secondary">A network declared with <code>external: true</code> tells Compose to use a pre-existing Docker network (created with <code>docker network create</code>) instead of creating a new one. Useful when multiple Compose stacks need to communicate.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
