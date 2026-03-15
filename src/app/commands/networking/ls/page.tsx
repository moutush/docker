import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker network ls - Docker Documentation",
  description: "List all Docker networks available on this machine."
};

export default function DockerNetworkLsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker network ls</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            List all Docker networks available on this machine.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker network ls [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker network ls</code> lists every network Docker knows about. By default Docker creates three networks: <code>bridge</code> (the default for containers), <code>host</code> (shares the host's networking stack), and <code>none</code> (no networking). Any networks you create also appear here.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of Docker networks as Wi-Fi routers. Each router creates its own private network. <code>docker network ls</code> lists all the routers in your Docker house. Containers on the same router can talk to each other; containers on different routers cannot (unless you bridge them).</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# List all networks
docker network ls`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Filter to show only user-created bridge networks to audit what custom networks exist in your environment.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show only custom bridge networks
docker network ls --filter "driver=bridge" --filter "type=custom"

# Show only network IDs (useful for scripting)
docker network ls -q`}</code>
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
            <td><code>-q / --quiet</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print only network IDs.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter by driver (bridge, overlay, host), type (custom, builtin), name, or id.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Pretty-print the output using a Go template.</td>
        </tr>
        <tr>
            <td><code>--no-trunc</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Do not truncate the output. Shows full network IDs.</td>
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
