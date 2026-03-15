import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker network rm - Docker Documentation",
  description: "Remove one or more Docker networks. Networks must have no active endpoints."
};

export default function DockerNetworkRmPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker network rm</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove one or more Docker networks. Networks must have no active endpoints.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker network rm NETWORK [NETWORK...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker network rm</code> deletes one or more networks. A network cannot be removed while containers are still connected to it — you must disconnect or stop all containers first. The three built-in networks (<code>bridge</code>, <code>host</code>, <code>none</code>) cannot be deleted.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Removing a network is like unplugging a Wi-Fi router. You can only unplug it if all devices on the network are disconnected first — otherwise you would cut active connections. Docker enforces this rule automatically.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove a network
docker network rm my-app-network

# Remove multiple networks at once
docker network rm network-one network-two

# Remove all unused networks at once
docker network prune -f`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Tear down all custom networks created for a project by filtering on a label that was applied at creation time.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove all networks labeled with project=myproject
docker network prune --filter "label=project=myproject" -f`}</code>
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
            <td>Name or ID of the network to remove. Multiple accepted.</td>
        </tr>
        <tr>
            <td><code>docker network prune</code></td>
            <td><span className="badge bg-secondary">Related cmd</span></td>
            <td>Removes all unused (no active endpoints) networks at once. Supports --filter and -f flags.</td>
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
