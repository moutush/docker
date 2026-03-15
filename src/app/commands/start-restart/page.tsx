import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker start / restart - Docker Documentation",
  description: "Start a stopped container, or restart a running one."
};

export default function DockerStartRestartPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker start / restart</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Start a stopped container, or restart a running one.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker start CONTAINER</code><br><code>docker restart [OPTIONS] CONTAINER</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker start</code> starts a container that was previously stopped — its filesystem and settings are preserved from when it stopped. <code>docker restart</code> stops then immediately starts a container, useful for applying config changes without recreating it.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker start</code> is like waking up a sleeping computer — all your files and programs are still there. <code>docker restart</code> is like rebooting it. Use restart when a service inside the container is misbehaving and a fresh start might fix it.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Start a stopped container
docker start my-nginx

# Restart a running container
docker restart my-nginx

# Restart with a 5 second delay before stopping
docker restart --time 5 my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Start multiple stopped containers in one command, or restart all containers in a compose stack after a config change.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Start multiple containers at once
docker start container-a container-b container-c

# Attach to the container's output after starting
docker start -a my-app`}</code>
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
            <td>Name or ID of the container. Multiple accepted by docker start.</td>
        </tr>
        <tr>
            <td><code>-a / --attach</code></td>
            <td><span className="badge bg-secondary">Flag (start)</span></td>
            <td>Attach stdout/stderr and forward signals after starting.</td>
        </tr>
        <tr>
            <td><code>-i / --interactive</code></td>
            <td><span className="badge bg-secondary">Flag (start)</span></td>
            <td>Attach the container's stdin.</td>
        </tr>
        <tr>
            <td><code>--time / -t N</code></td>
            <td><span className="badge bg-secondary">Option (restart)</span></td>
            <td>Seconds to wait before killing the container on restart. Default 10.</td>
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
