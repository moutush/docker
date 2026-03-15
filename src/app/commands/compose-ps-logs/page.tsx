import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker compose ps / logs - Docker Documentation",
  description: "Check the status of compose services and view their combined log output."
};

export default function DockerComposePsLogsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker compose ps / logs</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Check the status of compose services and view their combined log output.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker compose ps</code><br><code>docker compose logs [SERVICE]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker compose ps</code> lists the containers managed by the current compose stack and their status. <code>docker compose logs</code> aggregates and streams logs from all services in one view — optionally filtered to a single service.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-emoji-smile-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Noob-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>After running <code>docker compose up -d</code>, your app is running silently in the background. <code>compose ps</code> tells you which services are healthy and running. <code>compose logs</code> opens the combined log stream of all services so you can spot errors across the whole stack at once.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Check status of all compose services
docker compose ps

# View combined logs from all services
docker compose logs

# Follow (stream) logs from all services
docker compose logs -f`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-code-slash"}></i>
              </div>
              <h2 className="doc-card-heading">Tech-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Follow only the backend service's logs with timestamps, and check which compose services have unhealthy health checks.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Stream logs for only one service with timestamps
docker compose logs -f --timestamps backend

# Check services that are not running (exit code != 0)
docker compose ps --status exited

# Show only the last 50 lines from each service
docker compose logs --tail 50`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-table"}></i>
              </div>
              <h2 className="doc-card-heading">Flag / Parameter Reference</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `
        <div className="doc-table-wrapper shadow-sm mt-4">
            <table className="table table-dark table-hover doc-table mb-0">
                <thead>
                    <tr>
                        <th>Flag / Argument</th>
                        <th>Type</th>
                        <th>What it does</th>
                    </tr>
                </thead>
                <tbody>
        <tr>
            <td><code>docker compose ps --status</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter by status: running, exited, paused, restarting.</td>
        </tr>
        <tr>
            <td><code>docker compose ps -q</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print only container IDs.</td>
        </tr>
        <tr>
            <td><code>docker compose logs SERVICE</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Filter logs to a specific service name. Omit for all services.</td>
        </tr>
        <tr>
            <td><code>docker compose logs -f</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Follow log output in real-time.</td>
        </tr>
        <tr>
            <td><code>docker compose logs --tail N</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show only the last N lines from each service.</td>
        </tr>
        <tr>
            <td><code>docker compose logs -t</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Include timestamps on each log line.</td>
        </tr></tbody>
            </table>
        </div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
