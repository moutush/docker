import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker network create - Docker Documentation",
  description: "Create a custom Docker network so containers can communicate with each other by name."
};

export default function DockerNetworkCreatePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker network create</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Create a custom Docker network so containers can communicate with each other by name.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker network create [OPTIONS] NETWORK</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker network create</code> creates a new isolated network. Containers on the same custom network can reach each other using their container names as hostnames — no IP addresses needed. This is the foundation for multi-container applications.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine you are setting up a small office. You create a private Wi-Fi network called <code>office-net</code>. Anyone connected to <code>office-net</code> can talk to each other just by name ("Hey, printer" instead of "Hey, 192.168.1.45"). That is exactly what a Docker network does for your containers.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Create a simple bridge network
docker network create my-app-network

# Run containers on that network so they can talk to each other
docker run -d --name backend --network my-app-network my-backend-image
docker run -d --name frontend --network my-app-network my-frontend-image
# The frontend container can now reach the backend at http://backend:3000`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Create a custom bridge network with a specific subnet and gateway for a controlled networking environment.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Create a network with a specific subnet and gateway
docker network create \\
  --driver bridge \\
  --subnet 172.20.0.0/16 \\
  --gateway 172.20.0.1 \\
  --ip-range 172.20.240.0/20 \\
  production-net`}</code>
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
            <td>The name to give the new network.</td>
        </tr>
        <tr>
            <td><code>-d / --driver STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Network driver to use. bridge (default, single-host), overlay (multi-host Swarm), macvlan, none.</td>
        </tr>
        <tr>
            <td><code>--subnet STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>CIDR block for the network, e.g. 172.20.0.0/16.</td>
        </tr>
        <tr>
            <td><code>--gateway STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>IPv4 or IPv6 gateway for the subnet.</td>
        </tr>
        <tr>
            <td><code>--ip-range STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Allocate container IPs from a sub-range of the subnet.</td>
        </tr>
        <tr>
            <td><code>--internal</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Restrict external access — containers on this network cannot reach the internet.</td>
        </tr>
        <tr>
            <td><code>--attachable</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Allow standalone containers to attach to this network (required for overlay networks outside Swarm).</td>
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
