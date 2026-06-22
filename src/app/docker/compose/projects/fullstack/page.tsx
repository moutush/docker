import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project: Full-Stack App - Docker Compose",
  description: "Build a complete microservices architecture with a frontend, backend, database, and a reverse proxy using Docker Compose."
};

export default function ComposeProjectFullstackPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-boxes text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Project: Full-Stack App</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 6.5 — The ultimate test: A React frontend, Python API, Postgres database, and Nginx reverse proxy.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* OVERVIEW */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-diagram-3-fill"></i></div>
            <h2 className="doc-card-heading">Architecture Overview</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This is a production-style microservices architecture. Instead of exposing multiple ports to the host machine, we use an <strong>Nginx Reverse Proxy</strong> as the single entry point.
            </p>
            <ul className="text-secondary small mb-3">
              <li><strong>proxy:</strong> Listens on port 80. Routes <code>/api</code> traffic to the backend, and all other traffic to the frontend.</li>
              <li><strong>frontend:</strong> React/Next.js UI. Not exposed directly.</li>
              <li><strong>backend:</strong> Python FastAPI/Flask app. Not exposed directly.</li>
              <li><strong>database:</strong> PostgreSQL. Isolated on a private network.</li>
            </ul>
          </div>
        </div>

        {/* THE COMPOSE FILE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-file-earmark-code-fill"></i></div>
            <h2 className="doc-card-heading">The Compose File</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# compose.yaml
services:

  # 1. Reverse Proxy (The only public service)
  proxy:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - public

  # 2. Frontend React App
  frontend:
    build: ./frontend
    networks:
      - public

  # 3. Backend Python API
  backend:
    build: ./backend
    environment:
      - DB_HOST=database
      - DB_USER=admin
      - DB_PASS=supersecret
    depends_on:
      database:
        condition: service_healthy
    networks:
      - public
      - private

  # 4. Database (Isolated)
  database:
    image: postgres:16
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=supersecret
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - private
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  public:
  private:

volumes:
  pgdata:`}
            </pre>
            <div className="doc-alert doc-alert-success mt-3 mb-0">
              <i className="bi bi-shield-check"></i>
              <div className="x-small text-secondary">
                <strong className="text-success">Notice the security:</strong> The <code>database</code> service is only on the <code>private</code> network. The <code>proxy</code> and <code>frontend</code> are only on the <code>public</code> network. Only the <code>backend</code> is on both, acting as a bridge. The frontend cannot physically reach the database.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
