import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Profiles - Docker Documentation",
  description: "Learn how to use Docker Compose profiles to selectively start services for development, testing, and production."
};

export default function ComposeProfilesPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-person-badge-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Profiles</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 5.1 — Selectively start parts of your stack.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE PROBLEM */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Why Profiles?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Imagine you have a large <code>compose.yaml</code> with 10 services: a frontend, a backend, a database, Redis, a machine learning worker, and a heavy data-analytics pipeline. 
              <br /><br />
              When a frontend developer runs <code>docker compose up</code>, they don't want to start the heavy ML worker or the analytics pipeline — it slows down their laptop. They only need the API and the DB.
            </p>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25">
              <p className="text-secondary small mb-0">
                🏷️ <strong>Profiles let you tag services.</strong> A service with a profile will <strong>not</strong> start by default. It only starts if you explicitly activate that profile.
              </p>
            </div>
          </div>
        </div>

        {/* SYNTAX & EXAMPLES */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-code-slash"></i></div>
            <h2 className="doc-card-heading">How to Use Profiles</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  # No profile = Starts ALWAYS (default)
  api:
    image: my-api
  db:
    image: postgres:16

  # Profile: "frontend"
  webapp:
    image: my-react-app
    profiles:
      - frontend

  # Profile: "ml" and "data"
  ml-worker:
    image: my-ml-worker
    profiles:
      - ml
      - data

  # Profile: "debug"
  pgadmin:
    image: dpage/pgadmin4
    profiles:
      - debug`}
            </pre>
            <div className="row g-2">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <h6 className="text-light small mb-2">Command</h6>
                  <pre className="x-small text-secondary mb-0">{`docker compose up`}</pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success h-100">
                  <h6 className="text-success small mb-2">What Starts?</h6>
                  <p className="x-small text-secondary mb-0">Only <code>api</code> and <code>db</code>.</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <pre className="x-small text-secondary mb-0">{`docker compose --profile frontend up`}</pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success h-100">
                  <p className="x-small text-secondary mb-0"><code>api</code>, <code>db</code>, and <code>webapp</code>.</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <pre className="x-small text-secondary mb-0">{`docker compose --profile debug up`}</pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success h-100">
                  <p className="x-small text-secondary mb-0"><code>api</code>, <code>db</code>, and <code>pgadmin</code>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVATING PROFILES */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-terminal-fill"></i></div>
            <h2 className="doc-card-heading">3 Ways to Activate Profiles</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">You can enable profiles via CLI flags, environment variables, or targeting services directly.</p>
            
            <div className="mb-3">
              <h6 className="text-light fw-bold small">1. The CLI Flag (Recommended)</h6>
              <pre className="doc-code-block bg-dark text-light border-secondary p-2 x-small mb-0">
{`docker compose --profile frontend --profile debug up -d`}
              </pre>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold small">2. The Environment Variable</h6>
              <p className="x-small text-secondary mb-1">Useful to set in a <code>.env</code> file so developers don't have to type it every time.</p>
              <pre className="doc-code-block bg-dark text-light border-secondary p-2 x-small mb-0">
{`COMPOSE_PROFILES=frontend,debug docker compose up -d`}
              </pre>
            </div>

            <div>
              <h6 className="text-light fw-bold small">3. Target the Service Directly</h6>
              <p className="x-small text-secondary mb-1">If you specifically ask Compose to start a service, its profile is automatically activated.</p>
              <pre className="doc-code-block bg-dark text-light border-secondary p-2 x-small mb-0">
{`# This will start the ML worker AND the core services
docker compose up -d ml-worker`}
              </pre>
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
                <h6 className="fw-bold mb-1 text-info">Q: A service has `profiles: ["test"]` defined. What happens when you run `docker compose up`?</h6>
                <p className="mb-0 x-small text-secondary">The service will <strong>not</strong> start. Services with a profile are ignored by default unless that specific profile is activated via the <code>--profile</code> flag or the <code>COMPOSE_PROFILES</code> environment variable.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: How do you activate multiple profiles at once?</h6>
                <p className="mb-0 x-small text-secondary">You can pass the flag multiple times: <code>docker compose --profile db --profile backend up</code>, or use a comma-separated list in the environment variable: <code>COMPOSE_PROFILES=db,backend docker compose up</code>.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
