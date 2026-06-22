import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker events - Docker Documentation",
  description: "Stream real-time events from the Docker daemon — container starts, stops, image pulls, and more."
};

export default function DockerEventsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker events</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Stream real-time events from the Docker daemon — container starts, stops, image pulls, and more.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker events [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker events</code> listens to the Docker daemon and prints every event as it happens — container lifecycle events (start, stop, die, kill), image events (pull, push, delete), volume and network events.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of the Docker daemon as a busy office. <code>docker events</code> is a security camera feed — you can watch everything that happens in real time. Every time a container starts, crashes, or a new image is downloaded, it shows up on the feed.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Stream ALL live events from Docker
docker events`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Filter events to only show container die/crash events from the last hour, useful for post-mortem debugging of a flapping service.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Watch only container 'die' events from the last hour
docker events --since "1h" --filter "event=die" --filter "type=container"

# Capture events in JSON format for log ingestion
docker events --format '{{json .}}' --filter "type=container"`}</code>
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
            <td><code>--since TIMESTAMP</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show events logged after a timestamp or duration (e.g. 1h, 2024-01-15T10:00:00).</td>
        </tr>
        <tr>
            <td><code>--until TIMESTAMP</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Stop streaming after a given timestamp or duration.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter events by type (container, image, volume, network), event name, or container/image name.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format output using a Go template. Use {{json .}} for full JSON output.</td>
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
