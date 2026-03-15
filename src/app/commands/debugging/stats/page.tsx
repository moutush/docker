import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker stats - Docker Documentation",
  description: "Display a live stream of container resource usage: CPU, memory, network I/O, and disk I/O."
};

export default function DockerStatsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker stats</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Display a live stream of container resource usage: CPU, memory, network I/O, and disk I/O.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker stats [OPTIONS] [CONTAINER...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker stats</code> streams live metrics from one or more containers. It is Docker's built-in <code>top</code>-like resource monitor — showing CPU %, memory usage/limit, network I/O, and block I/O, updating every second.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker stats</code> is like the Activity Monitor or Task Manager, but only for your Docker containers. You can watch in real time if a container is eating too much CPU or RAM and causing trouble.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Watch live stats for ALL running containers
docker stats

# Watch stats for only one container
docker stats my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Take a one-shot snapshot of all container stats (no live update) and output it as JSON for ingestion into a monitoring pipeline.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# One-shot snapshot (no streaming) in JSON format
docker stats --no-stream --format json

# Custom table format: name, CPU, and memory
docker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"`}</code>
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
            <td>Container name or ID. Omit to show stats for all running containers.</td>
        </tr>
        <tr>
            <td><code>--no-stream</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print a single snapshot of stats and exit. No continuous live update.</td>
        </tr>
        <tr>
            <td><code>--no-trunc</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Do not truncate container IDs or names in the output.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format the output using a Go template or the special value json.</td>
        </tr>
        <tr>
            <td><code>-a / --all</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Show stats for all containers, including stopped ones (which show zeroes).</td>
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
