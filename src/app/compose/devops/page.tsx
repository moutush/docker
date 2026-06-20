import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DevOps Integration - Docker Compose",
  description: "Learn how to integrate Docker Compose into CI/CD pipelines like GitHub Actions, GitLab CI, and Jenkins."
};

export default function ComposeDevopsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-cpu-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>DevOps Integration</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 7 — How to use Docker Compose in automated CI/CD pipelines for testing and deployment.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* WHY USE IN CI/CD */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Compose in CI/CD</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Docker Compose isn't just for local development. It is an incredibly powerful tool for Continuous Integration (CI) because it allows you to spin up a complete, identical replica of your production environment on the CI server to run integration tests.
            </p>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25">
              <h6 className="text-info fw-bold small mb-2">The Standard CI Workflow:</h6>
              <ol className="text-secondary small mb-0 ps-3">
                <li className="mb-1">Code is pushed to GitHub/GitLab.</li>
                <li className="mb-1">CI runner executes <code>docker compose up -d db cache</code>.</li>
                <li className="mb-1">CI runner executes <code>docker compose run --rm app npm test</code>.</li>
                <li>CI runner executes <code>docker compose down -v</code> to clean up.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* GITHUB ACTIONS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-github"></i></div>
            <h2 className="doc-card-heading">GitHub Actions Example</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# .github/workflows/test.yml
name: Integration Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Start Database and Cache
        run: docker compose up -d db cache

      - name: Wait for Database to be ready
        run: |
          echo "Waiting for PostgreSQL..."
          while ! docker compose exec db pg_isready -U postgres; do
            sleep 1
          done
          echo "Database is ready!"

      - name: Run Tests
        run: docker compose run --rm app npm test

      - name: Cleanup
        if: always()
        run: docker compose down -v`}
            </pre>
          </div>
        </div>

        {/* GITLAB CI */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-gitlab"></i></div>
            <h2 className="doc-card-heading">GitLab CI Example</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# .gitlab-ci.yml
image: docker:24.0.5

services:
  - docker:24.0.5-dind

variables:
  DOCKER_HOST: tcp://docker:2375
  DOCKER_TLS_CERTDIR: ""

integration_tests:
  stage: test
  script:
    - apk add --no-cache docker-compose
    - docker-compose up -d db cache
    # Use Docker's built in wait utility or healthchecks
    - docker-compose run --rm app npm test
  after_script:
    - docker-compose down -v`}
            </pre>
          </div>
        </div>

        {/* PRODUCTION DEPLOYMENT */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-rocket-takeoff-fill"></i></div>
            <h2 className="doc-card-heading">Deploying to Production Servers</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              If you are deploying to a single VM (like an AWS EC2 instance or DigitalOcean Droplet), CI can deploy via SSH:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`deploy:
  runs-on: ubuntu-latest
  steps:
    - name: Deploy via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${'$'}{{ secrets.SERVER_IP }}
        username: ubuntu
        key: ${'$'}{{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /opt/myapp
          git pull origin main
          docker compose -f compose.yaml -f compose.prod.yaml pull
          docker compose -f compose.yaml -f compose.prod.yaml up -d`}
            </pre>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong className="text-warning">Zero-Downtime Warning:</strong>
                <span className="x-small text-secondary"> <code>docker compose up -d</code> is <strong>not</strong> zero-downtime by default. It stops the old container before starting the new one. For true zero-downtime deployments on a single host, you need a reverse proxy (like Traefik) and advanced deployment scripts, or you should graduate to Docker Swarm.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
