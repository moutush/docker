import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile Practical Projects - Docker Documentation",
  description: "Hands-on projects building optimized, production-ready Dockerfiles for Python, Node, React, and Nginx."
};

export default function DockerfileProjectsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-flask text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Practical Projects</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Reinforce your knowledge by reviewing and building professional, production-grade Dockerfile architectures for different programming languages.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* PROJECT 1: Python Flask API */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-filetype-py"></i>
            </div>
            <h2 className="doc-card-heading">Project 1: Python Flask API</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This setup uses a Python Slim base, sets up a separate `appuser` for security, maps port 5000, and mounts a persistent volume for uploaded files:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM python:3.10-slim

# Set system variables
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

WORKDIR /code

# Create unprivileged system user
RUN groupadd -g 999 appgroup && \\
    useradd -r -u 999 -g appgroup appuser

# Isolate requirements for cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and bind ownership
COPY --chown=appuser:appgroup . .

# Setup persistent directory
RUN mkdir -p /code/uploads && chown -R appuser:appgroup /code/uploads
VOLUME ["/code/uploads"]

# Switch to security user
USER appuser

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]`}
            </pre>
          </div>
        </div>

        {/* PROJECT 2: Production Node.js Express App */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-filetype-js"></i>
            </div>
            <h2 className="doc-card-heading">Project 2: Node.js Express App</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Highly optimized using the built-in `node` user, utilizing `npm ci` for lockfile consistency, and mapping logs to volume persistence:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM node:20-alpine
WORKDIR /usr/src/app

# Copy lockfiles
COPY package*.json ./

# Install only production dependencies cleanly
RUN npm ci --only=production

# Copy source code with built-in node user ownership
COPY --chown=node:node . .

# Setup node environment settings
ENV NODE_ENV=production \\
    PORT=3000

# Switch context for runtime
USER node

EXPOSE 3000
CMD ["node", "src/server.js"]`}
            </pre>
          </div>
        </div>

        {/* PROJECT 3: Static Nginx Site */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-globe"></i>
            </div>
            <h2 className="doc-card-heading">Project 3: Static HTML/JS Website</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Perfect for standard vanilla HTML / JS websites. We copy our directory straight into Nginx's default public directories and override the config:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM nginx:1.25-alpine

# Remove Nginx default index pages
RUN rm -rf /usr/share/nginx/html/*

# Copy local web files to public hosting root
COPY ./dist /usr/share/nginx/html

# Copy custom reverse proxy / server settings
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </pre>
          </div>
        </div>

        {/* PROJECT 4: React SPA (Multi-Stage Build) */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-stack"></i>
            </div>
            <h2 className="doc-card-heading">Project 4: React SPA (Multi-Stage Build)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              **Masterclass Design:** Compiles high-weight Node.js packages in Stage 1, and then ports the output static bundles to Nginx in Stage 2. The resulting production container is only 15MB!
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`# ==========================================
# STAGE 1: Compiler Engine (Node.js Build)
# ==========================================
FROM node:20-alpine AS compiler
WORKDIR /app

# Copy package registries
COPY package*.json ./
RUN npm ci

# Copy React code and build static distribution bundle
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Lightweight Production Server
# ==========================================
FROM nginx:1.25-alpine

# Copy built React files from compiler stage
COPY --from=compiler /app/build /usr/share/nginx/html

# Custom config to route SPA links correctly back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </pre>
          </div>
        </div>

        {/* INTERVIEW TIPS */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">DCA &amp; Practical Interview Tips</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Why use npm ci instead of npm install in Dockerfiles?</h6>
                <p className="mb-0 x-small text-secondary">
                  `npm ci` (Clean Install) is designed for automated environments (like CI/CD pipelines and Docker builds). It strictly reads the exact versions locked inside <code>package-lock.json</code>, completely bypassing dependency resolving. It is much faster and guarantees identical builds every time.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Why daemon off; in Nginx CMD?</h6>
                <p className="mb-0 x-small text-secondary">
                  Docker containers require the main process (PID 1) to run in the **foreground** to keep the container active. By default, Nginx spawns background worker processes and terminates the master service. <code>daemon off;</code> forces Nginx to stay active in the foreground, keeping the container alive!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOCK PROJECT EXERCISE */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h2 className="doc-card-heading text-info">Hands-on Mini Project</h2>
          </div>
          <div className="doc-card-body">
            <p className="small text-secondary">
              Prepare a mock React-Nginx container layout:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Write out a custom <code>nginx.conf</code> to handle React Router client routing:
                <pre className="x-small text-secondary mt-1 mb-1">
{`server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}`}
                </pre>
              </li>
              <li className="mb-2">Create the multi-stage Dockerfile exactly as written in Project 4.</li>
              <li>Build it and check container logs to see how Nginx handles connections cleanly.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
