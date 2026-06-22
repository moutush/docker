import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose depends_on & Healthchecks - Docker Documentation",
  description: "Learn how to control service startup order in Docker Compose using depends_on and container healthchecks."
};

export default function ComposeDependsOnPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-heart-pulse-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>depends_on &amp; Healthchecks</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 4.3 — Control the exact startup sequence of your services.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE PROBLEM */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger"><i className="bi bi-exclamation-octagon-fill"></i></div>
            <h2 className="doc-card-heading">The Startup Race Condition</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              When you run <code>docker compose up</code>, Compose attempts to start all containers <strong>at the exact same time</strong>. 
              If your Node.js API starts in 1 second, but PostgreSQL takes 5 seconds to initialize, your API will fail to connect and crash immediately.
            </p>
          </div>
        </div>

        {/* BASIC DEPENDS_ON */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-diagram-3-fill"></i></div>
            <h2 className="doc-card-heading">Basic <code>depends_on</code> (The Old Way)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              <code>depends_on</code> tells Compose to wait for another container to <em>start</em> before starting this one.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  api:
    image: my-api
    depends_on:
      - db     # Compose waits until the 'db' container has STARTED.

  db:
    image: postgres:16`}
            </pre>
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-bug-fill"></i>
              <div>
                <strong className="text-danger">The Flaw:</strong>
                <span className="x-small text-secondary"> Basic <code>depends_on</code> only waits until the container is running. It does <strong>not</strong> wait for the database to actually be ready to accept connections. Your API might still crash!</span>
              </div>
            </div>
          </div>
        </div>

        {/* HEALTHCHECKS */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-heart-pulse"></i></div>
            <h2 className="doc-card-heading">Healthchecks — The Foundation</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A <code>healthcheck</code> is a command Docker runs inside the container periodically to check if the application is actually healthy (e.g., accepting connections).
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s       # run check every 10 seconds
      timeout: 5s         # fail if check takes longer than 5s
      retries: 5          # mark as "unhealthy" after 5 consecutive failures
      start_period: 10s   # give container 10s to boot before first check`}
            </pre>
          </div>
        </div>

        {/* LONG DEPENDS_ON (THE SOLUTION) */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-check-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success"><code>service_healthy</code> — The Production Solution</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Combine <code>depends_on</code> with <code>healthcheck</code> using the long syntax. Now, Compose waits until the database is <strong>fully ready and accepting connections</strong> before starting the API.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  api:
    image: my-api
    depends_on:
      db:
        condition: service_healthy   # WAIT FOR HEALTHCHECK TO PASS!

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5`}
            </pre>
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
                <h6 className="fw-bold mb-1 text-info">Q: Why is basic depends_on often insufficient for database connections?</h6>
                <p className="mb-0 x-small text-secondary">Because basic <code>depends_on</code> only ensures the dependency container has <em>started</em>. It does not wait for the application inside (like Postgres or MySQL) to finish its internal startup scripts and begin accepting network connections. You must use a <code>healthcheck</code> and <code>condition: service_healthy</code> to wait for actual readiness.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What happens if a healthcheck fails repeatedly?</h6>
                <p className="mb-0 x-small text-secondary">The container's status changes from <code>starting</code> to <code>unhealthy</code>. Any service that depends on it with <code>condition: service_healthy</code> will fail to start, and <code>docker compose up</code> will halt with a dependency error.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
