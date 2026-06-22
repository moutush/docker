import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Docker Compose Overview - Docker Documentation",
  description: "Learn what Docker Compose is, its history, and how it compares to Docker CLI, Dockerfiles, and Kubernetes."
};

export default function ComposeOverviewPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-stack text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Docker Compose Overview</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 1 — What Compose is, why it exists, and how it fits into the Docker ecosystem.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* WHAT IS COMPOSE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">What is Docker Compose?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Docker Compose is a tool that lets you define and run <strong>multi-container Docker applications</strong> using a single YAML file. Instead of running five separate <code>docker run</code> commands with long flags every time you start your project, you describe your entire application stack in one file and launch everything with one command:
            </p>
            <pre className="doc-code-block bg-dark text-success border-secondary p-3 x-small mb-3">
{`docker compose up`}
            </pre>
            <p className="text-secondary mb-0">
              That single command can start a web server, a database, a cache layer, a background worker — all wired together, with the correct environment variables, volumes, and networks — automatically.
            </p>
          </div>
        </div>

        {/* ANALOGY */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-egg-fried"></i></div>
            <h2 className="doc-card-heading text-success">Real-World Analogy</h2>
          </div>
          <div className="doc-card-body">
            <div className="p-3 bg-dark rounded border border-success border-opacity-25">
              <p className="text-secondary small mb-2">
                🍕 <strong>Think of Docker Compose as a restaurant franchise operations manual.</strong>
              </p>
              <p className="text-secondary small mb-2">
                A single Dockerfile is like a recipe for <em>one dish</em> — say, a pizza. But a restaurant doesn't just serve pizza. It has a kitchen (<strong>backend API</strong>), a dining room system (<strong>frontend</strong>), a cold storage unit (<strong>database</strong>), and a delivery coordinator (<strong>message queue</strong>).
              </p>
              <p className="text-secondary small mb-0">
                Docker Compose is the <strong>complete operations manual</strong> that says: "Start the kitchen at 200°C, cold storage at -18°C, and dining system on port 80 — and make sure they can all communicate with each other." One manual, everything runs in sync.
              </p>
            </div>
          </div>
        </div>

        {/* HISTORY */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-clock-history"></i></div>
            <h2 className="doc-card-heading">History & Evolution</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Milestone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>2013</td><td>Docker launches. Developers start writing long <code>docker run</code> commands manually.</td></tr>
                  <tr><td>2014</td><td><strong>Fig</strong> — a third-party tool — is created to define multi-container apps in YAML. Docker acquires it.</td></tr>
                  <tr><td>2015</td><td>Fig is officially reborn as <strong>Docker Compose v1</strong> (<code>docker-compose</code> CLI, Python-based).</td></tr>
                  <tr><td>2020</td><td>Compose Specification is open-sourced, separating the format from the tool.</td></tr>
                  <tr><td>2022</td><td><strong>Compose V2</strong> ships as a Docker CLI plugin (<code>docker compose</code>, Go-based). V1 deprecated.</td></tr>
                  <tr><td>2023+</td><td>Compose is built into Docker Desktop and Docker Engine by default. File renamed to <code>compose.yaml</code>.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <strong className="text-info">V1 vs V2:</strong>
                <span className="text-secondary x-small"> The old command was <code>docker-compose up</code> (with a hyphen). The modern V2 command is <code>docker compose up</code> (space, no hyphen). Always use V2 for new projects.</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPOSE vs OTHERS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-question-diamond-fill"></i></div>
            <h2 className="doc-card-heading">Compose vs Everything Else</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Purpose</th>
                    <th>Scope</th>
                    <th>When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dockerfile</strong></td>
                    <td>Builds a <em>single</em> image from source code</td>
                    <td>One image</td>
                    <td>Defining your app's build recipe</td>
                  </tr>
                  <tr>
                    <td><strong>docker CLI</strong></td>
                    <td>Runs individual containers manually</td>
                    <td>One container at a time</td>
                    <td>Quick experiments, debugging</td>
                  </tr>
                  <tr>
                    <td><strong>Docker Compose</strong></td>
                    <td>Orchestrates multiple containers on <em>one host</em></td>
                    <td>Multi-container, single machine</td>
                    <td>Local development, staging, small apps</td>
                  </tr>
                  <tr>
                    <td><strong>Docker Swarm</strong></td>
                    <td>Orchestrates containers across <em>multiple hosts</em></td>
                    <td>Multi-container, multi-machine cluster</td>
                    <td>Production HA clusters (simpler than K8s)</td>
                  </tr>
                  <tr>
                    <td><strong>Kubernetes</strong></td>
                    <td>Enterprise-grade orchestration at massive scale</td>
                    <td>Multi-container, multi-machine, auto-scaling</td>
                    <td>Large production deployments, cloud-native</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="doc-alert doc-alert-warning mt-3 mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong className="text-warning">Key mental model:</strong>
                <span className="text-secondary x-small"> Dockerfile builds ONE image. Compose <em>runs</em> MANY containers together. They are complementary — Compose often uses Dockerfiles to build its service images.</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPOSE FILE PREVIEW */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-file-earmark-code-fill"></i></div>
            <h2 className="doc-card-heading">Your First Glance at a Compose File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Don't worry about understanding every line yet. Just notice the structure — it reads like plain English:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# compose.yaml
services:

  web:                        # ← Service 1: your Node.js app
    build: .                  # ← Build from local Dockerfile
    ports:
      - "3000:3000"           # ← Expose port 3000
    environment:
      - DB_HOST=database      # ← Tell the app where the DB is

  database:                   # ← Service 2: PostgreSQL
    image: postgres:16        # ← Pull official image
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data  # ← Persist data

volumes:
  db-data:`}
            </pre>
            <p className="text-secondary small mb-0">
              To launch the entire stack: <code className="text-success">docker compose up -d</code>. To tear it down: <code className="text-danger">docker compose down</code>. That's it.
            </p>
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
                <h6 className="fw-bold mb-1 text-info">Q: What is the difference between Docker Compose and Kubernetes?</h6>
                <p className="mb-0 x-small text-secondary">
                  Compose orchestrates containers on a <strong>single host</strong> — ideal for development and small deployments. Kubernetes orchestrates across <strong>multiple machines</strong> with auto-scaling, self-healing, and rolling updates built in. Compose is simpler; Kubernetes is more powerful but far more complex.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-3">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is the difference between Compose V1 and V2?</h6>
                <p className="mb-0 x-small text-secondary">
                  V1 (<code>docker-compose</code>) was a standalone Python binary. V2 (<code>docker compose</code>) is a Go-based plugin integrated directly into the Docker CLI — faster, maintained by Docker, and the current standard. V1 reached end-of-life in 2023.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: Can Docker Compose be used in production?</h6>
                <p className="mb-0 x-small text-secondary">
                  Yes, for <strong>small-to-medium workloads on a single host</strong>. Many startups run production on Compose successfully. For high-availability, multi-host, or auto-scaling requirements, Swarm or Kubernetes is more appropriate. DCA expects you to know both the use cases and the limitations.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
