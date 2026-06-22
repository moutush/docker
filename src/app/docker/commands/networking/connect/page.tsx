import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker network connect - Docker Documentation",
  description: "Connect a running container to an existing network (or disconnect it) without restarting."
};

export default function DockerNetworkConnectPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker network connect</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Connect a running container to an existing network (or disconnect it) without restarting.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker network connect [OPTIONS] NETWORK CONTAINER</code><br>Syntax: <code>docker network disconnect NETWORK CONTAINER</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>A container can be a member of multiple networks simultaneously. <code>docker network connect</code> plugs a running container into an additional network without restarting it. <code>docker network disconnect</code> does the reverse.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Your laptop can be connected to both your home Wi-Fi and a corporate VPN at the same time. <code>docker network connect</code> does the same for a container — plug it into a second (or third) network while it keeps running normally on its current network.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Connect a running container to an additional network
docker network connect my-app-network my-nginx

# Disconnect a container from a network
docker network disconnect my-app-network my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Connect a container to a network and assign it a specific static IP address on that network.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Connect with a specific IP address on the network
docker network connect --ip 172.20.0.50 production-net backend-container

# Connect and add a network alias (so other containers can find it by alias)
docker network connect --alias db production-net postgres-container`}</code>
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
            <td>Name or ID of the network to connect or disconnect from.</td>
        </tr>
        <tr>
            <td><code>CONTAINER</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Name or ID of the container to connect or disconnect.</td>
        </tr>
        <tr>
            <td><code>--ip STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Assign a specific IPv4 address to the container on this network.</td>
        </tr>
        <tr>
            <td><code>--alias STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Add a network-scoped alias — other containers on the network can reach this container by the alias.</td>
        </tr>
        <tr>
            <td><code>--link CONTAINER:ALIAS</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Add a legacy link (deprecated; prefer DNS-based service discovery).</td>
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
