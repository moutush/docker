import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker stop - Docker Documentation",
  description: "Gracefully stop one or more running containers."
};

export default function DockerStopPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker stop</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Gracefully stop one or more running containers.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker stop [OPTIONS] CONTAINER [CONTAINER...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker stop</code> sends a <strong>SIGTERM</strong> signal to the main process inside the container, giving it time to shut down cleanly. If the container does not stop within the timeout window, Docker sends a <strong>SIGKILL</strong> to force-quit it.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine a container is a running application on your phone. <code>docker stop</code> is pressing the home button — the app gets a polite nudge to save its work and close. It is not forced-quit; it gets a few seconds to clean up first.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Stop a container by name
docker stop my-nginx

# Stop a container by ID
docker stop a3f5c821b90d`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Stop all currently running containers in a single command for a quick teardown of your local development environment.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Stop all running containers
docker stop $(docker ps -q)

# Stop with a shorter timeout (2 seconds instead of default 10)
docker stop --time 2 my-nginx`}</code>
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
            <td>Container name or ID to stop. You can pass multiple IDs/names separated by spaces.</td>
        </tr>
        <tr>
            <td><code>-t N / --time N</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Number of seconds to wait for the container to stop before sending SIGKILL. Default is 10.</td>
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
