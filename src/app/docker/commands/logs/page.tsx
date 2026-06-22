import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker logs - Docker Documentation",
  description: "Fetch and stream the log output from a container."
};

export default function DockerLogsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker logs</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Fetch and stream the log output from a container.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker logs [OPTIONS] CONTAINER</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker logs</code> fetches the stdout and stderr output produced by a container's main process. You can view all past output, tail the last N lines, or follow the output live like <code>tail -f</code>.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Every container is like a worker quietly doing a job in a sealed room. <code>docker logs</code> is a microphone you hold up to the room's air vent — you can hear everything the worker said since they started, or stay and listen live.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# View all logs from a container
docker logs my-nginx

# Follow live log output (like tail -f)
docker logs -f my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Debug a crashing container by viewing the last 50 lines of logs with timestamps, so you can see exactly when and what error occurred before it exited.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show last 50 lines with timestamps
docker logs --tail 50 --timestamps my-app

# Show logs since a specific time (useful after a deployment)
docker logs --since "2024-01-15T10:00:00" my-app

# Follow logs AND show the last 20 lines as a starting point
docker logs -f --tail 20 my-app`}</code>
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
            <td><code>CONTAINER</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Name or ID of the container to fetch logs from.</td>
        </tr>
        <tr>
            <td><code>-f / --follow</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Stream log output continuously. New lines appear in real-time. Press Ctrl+C to stop.</td>
        </tr>
        <tr>
            <td><code>--tail N</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show only the last N lines of logs instead of the full history. Use all for everything.</td>
        </tr>
        <tr>
            <td><code>-t / --timestamps</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Prefix each log line with the timestamp of when it was produced.</td>
        </tr>
        <tr>
            <td><code>--since TIMESTAMP</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show logs produced after a specific timestamp or duration (e.g. 10m, 1h, 2024-01-15T10:00:00).</td>
        </tr>
        <tr>
            <td><code>--until TIMESTAMP</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show logs produced before a specific timestamp or duration.</td>
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
