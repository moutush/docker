import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Restart Policies - Docker Documentation",
  description: "Learn all four Docker Compose restart policies with examples, use cases, and DCA exam tips."
};

export default function ComposeRestartPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-arrow-clockwise text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Restart Policies</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 3.5 — Control exactly how Docker handles container crashes, reboots, and deliberate stops.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* WHY */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Why Restart Policies Matter</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              In production, containers crash. Servers reboot. Processes run out of memory. A restart policy is Docker's automatic recovery mechanism — it tells the Docker daemon what to do when a container stops unexpectedly.
            </p>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25">
              <p className="text-secondary small mb-0">
                🏥 <strong>Analogy:</strong> Think of a restart policy like an ICU nurse instruction card. <code>no</code> = "do not resuscitate." <code>always</code> = "revive no matter what." <code>on-failure</code> = "only revive if the patient collapsed on their own." <code>unless-stopped</code> = "revive unless the doctor explicitly says to stop."
              </p>
            </div>
          </div>
        </div>

        {/* THE 4 POLICIES */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-list-check"></i></div>
            <h2 className="doc-card-heading">The 4 Restart Policies</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Restarts on crash?</th>
                    <th>Restarts on reboot?</th>
                    <th>Restarts after docker stop?</th>
                    <th>Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>no</code></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td>Default. One-off tasks, test runners</td>
                  </tr>
                  <tr>
                    <td><code>always</code></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td>Critical services that must always run</td>
                  </tr>
                  <tr>
                    <td><code>on-failure</code></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td>Jobs that should retry on error but not on normal exit</td>
                  </tr>
                  <tr>
                    <td><code>unless-stopped</code></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td>⭐ Best for most production services</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* POLICY EXAMPLES */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-code-slash"></i></div>
            <h2 className="doc-card-heading">Policy Examples in compose.yaml</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:

  # ── Production web server — restart unless manually stopped:
  nginx:
    image: nginx:alpine
    restart: unless-stopped   # ⭐ Best for most services
    ports:
      - "80:80"

  # ── Critical database — always restart no matter what:
  postgres:
    image: postgres:16
    restart: always

  # ── Background worker — only restart on non-zero exit code:
  worker:
    image: my-worker
    restart: on-failure       # Won't restart if it exits cleanly (code 0)
    # Limit retries to prevent crash loops:
    # (use deploy.restart_policy for fine-grained control)

  # ── Database migration — run once and never restart:
  migrate:
    image: my-app
    command: npm run migrate
    restart: "no"             # Default, but explicit is clearer`}
            </pre>
          </div>
        </div>

        {/* ALWAYS vs UNLESS-STOPPED */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-question-diamond-fill"></i></div>
            <h2 className="doc-card-heading"><code>always</code> vs <code>unless-stopped</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">This is a classic DCA exam question. The difference is subtle but important:</p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-danger h-100">
                  <span className="badge bg-danger mb-2">always</span>
                  <pre className="x-small text-secondary mb-2">
{`# Scenario:
# 1. Container is running
# 2. You run: docker compose stop web
# 3. Server reboots
# Result: Container STARTS again on reboot!
# (even though YOU manually stopped it)`}
                  </pre>
                  <p className="x-small text-danger mb-0">⚠️ Ignores your manual stop on reboot.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success h-100">
                  <span className="badge bg-success mb-2">unless-stopped ⭐</span>
                  <pre className="x-small text-secondary mb-2">
{`# Scenario:
# 1. Container is running
# 2. You run: docker compose stop web
# 3. Server reboots
# Result: Container stays STOPPED on reboot!
# (respects your manual stop intention)`}
                  </pre>
                  <p className="x-small text-success mb-0">✅ Respects your explicit stop decision.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ON-FAILURE MAX */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-shield-check"></i></div>
            <h2 className="doc-card-heading">Limiting Retries with <code>on-failure</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Use the extended <code>deploy.restart_policy</code> syntax to cap how many times a container retries before giving up (prevents infinite crash loops):
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  worker:
    image: my-worker
    deploy:
      restart_policy:
        condition: on-failure   # only restart on non-zero exit
        delay: 5s               # wait 5s between retries
        max_attempts: 3         # give up after 3 failures
        window: 120s            # evaluation window`}
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
                <h6 className="fw-bold mb-1 text-info">Q: What restart policy would you use for a production web server? Why?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>unless-stopped</code>. It automatically restarts after crashes and server reboots (like <code>always</code>), but it respects intentional manual stops — critical for controlled deployments where you explicitly stop a service for maintenance.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: A container keeps crashing and restarting in a loop. How do you investigate?</h6>
                <p className="mb-0 x-small text-secondary">
                  First, check the exit logs: <code>docker compose logs --tail=50 servicename</code>. Then check the restart count: <code>docker compose ps</code> shows restarts. To prevent the loop while debugging, temporarily change the restart policy to <code>"no"</code> or use <code>docker compose stop servicename</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
