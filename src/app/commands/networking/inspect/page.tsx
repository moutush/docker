import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker network inspect - Docker Documentation",
  description: "Display detailed information about a Docker network, including connected containers and their IPs."
};

export default function DockerNetworkInspectPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker network inspect</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Display detailed information about a Docker network, including connected containers and their IPs.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker network inspect [OPTIONS] NETWORK [NETWORK...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker network inspect</code> prints a detailed JSON description of a network: its driver, subnet, gateway, and most importantly — every container currently connected to it along with their assigned IP addresses.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>If a Docker network is a Wi-Fi router, <code>docker network inspect</code> is the router's admin panel — it shows you the network settings, which devices are connected, and what IP address each device has been assigned.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Inspect a network by name
docker network inspect my-app-network`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Extract just the list of container names and their IPs on a given network using a Go template — useful for scripted service discovery.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Extract container names and IPs from a network
docker network inspect my-app-network \\
  --format '{{range .Containers}}{{.Name}}: {{.IPv4Address}}{{println}}{{end}}'`}</code>
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
            <td><code>NETWORK</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Network name or ID. Multiple can be specified.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format output with a Go template to extract specific fields.</td>
        </tr>
        <tr>
            <td><code>-v / --verbose</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Show detailed information including services (useful in Swarm mode).</td>
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
