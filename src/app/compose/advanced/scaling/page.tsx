import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Scaling & Resources - Docker Documentation",
  description: "Learn how to scale Docker Compose services, set CPU/Memory limits, and configure logging drivers."
};

export default function ComposeScalingPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-speedometer2 text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Scaling &amp; Resources</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 5.3 — Run multiple container replicas and prevent them from eating all your server's RAM.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* SCALING REPLICAS */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-layers-fill"></i></div>
            <h2 className="doc-card-heading">Scaling Services (Replicas)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              You can run multiple identical containers (replicas) for a single service to handle more traffic or process background jobs faster. Compose automatically load-balances requests across all replicas via DNS round-robin.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <h6 className="text-light fw-bold small mb-2">Method 1: via CLI flag</h6>
                  <pre className="x-small text-success mb-0">
{`# Scale the 'worker' service to 3 containers:
docker compose up -d --scale worker=3`}
                  </pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-primary h-100">
                  <h6 className="text-primary fw-bold small mb-2">Method 2: via compose.yaml</h6>
                  <pre className="x-small text-light mb-0">
{`services:
  worker:
    image: my-worker
    deploy:
      replicas: 3`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="doc-alert doc-alert-danger mt-3 mb-0">
              <i className="bi bi-bug-fill"></i>
              <div>
                <strong className="text-danger">The Port Conflict Trap:</strong>
                <span className="x-small text-secondary"> You <strong>cannot</strong> scale a service if it publishes a static host port (like <code>ports: ["80:80"]</code>). Multiple containers cannot bind to the exact same host port. If you need to scale a web service, either omit the host port (<code>ports: ["80"]</code>) so Docker picks random ones, or put a load balancer (like Nginx) in front of them.</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE LIMITS */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-cpu-fill"></i></div>
            <h2 className="doc-card-heading">CPU &amp; Memory Limits</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              By default, a container can consume 100% of the host machine's CPU and RAM. A memory leak in one container could crash your entire server. Use the <code>deploy.resources</code> block to restrict them.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  db:
    image: postgres:16
    deploy:
      resources:
        limits:
          cpus: '0.50'         # Max 50% of a single CPU core
          memory: 512M         # Hard limit: container killed if it exceeds this
        reservations:
          cpus: '0.25'         # Soft guarantee
          memory: 256M         # Soft guarantee`}
            </pre>
            <p className="text-secondary small mb-0">
              Verify your limits are working by running <code className="text-success">docker stats</code> while the containers are running.
            </p>
          </div>
        </div>

        {/* LOGGING LIMITS */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-file-earmark-text"></i></div>
            <h2 className="doc-card-heading">Limiting Log Sizes</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Docker captures all container logs to disk. If you leave a verbose application running for months, its log file can consume your entire hard drive. Always limit log sizes in production.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  web:
    image: nginx:alpine
    logging:
      driver: "json-file"
      options:
        max-size: "10m"       # Rotate log file when it hits 10 Megabytes
        max-file: "3"         # Keep only the last 3 files (30MB total max)`}
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
                <h6 className="fw-bold mb-1 text-info">Q: You try to scale a web service to 3 replicas but get a "port is already allocated" error. Why?</h6>
                <p className="mb-0 x-small text-secondary">The service likely has a static host port mapping like <code>ports: ["8080:80"]</code>. The first replica binds successfully to host port 8080, but replicas 2 and 3 fail because the port is already taken. To fix this, map a range (<code>"8080-8082:80"</code>) or let Docker assign random ports by only specifying the container port (<code>ports: ["80"]</code>).</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is the difference between limits and reservations in resources?</h6>
                <p className="mb-0 x-small text-secondary"><code>limits</code> are hard caps — if a container exceeds its memory limit, the Linux Out-Of-Memory (OOM) killer will terminate it. <code>reservations</code> are soft guarantees — Docker will try to ensure this amount of memory/CPU is always available to the container, even when the host is under heavy load.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
