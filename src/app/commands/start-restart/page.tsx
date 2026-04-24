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

        {/* SECTION */}
          <div className="doc-section-card shadow-lg border-danger">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-danger">
                <i className={"bi " + "bi-shield-fill-x"}></i>
              </div>
              <h2 className="doc-card-heading text-danger">DCA Exam Fact: The Immutability Rule</h2>
            </div>
            <div className="doc-card-body">
              <p className="fw-bold text-light">Can I add a <code>-p</code> or <code>-v</code> flag when starting a container?</p>
              <p className="text-danger fw-bold">NO. Absolutely not.</p>
              
              <p>This is a major part of Docker's "Immutable Infrastructure" philosophy. Once a container is created, its configuration is <strong>frozen</strong>.</p>
              
              <div className="doc-alert px-3 py-2 mt-3 mb-3 x-small" style={{ background: 'rgba(220, 53, 69, 0.1)', borderLeft: '4px solid #dc3545' }}>
                <div>
                    <strong className="text-danger d-block mb-2">The Light Switch Metaphor:</strong> 
                    <p className="mb-0 text-light">Think of <code>docker run</code> as building a house (deciding where the wires go). Think of <code>docker start</code> as flipping the light switch. You cannot change the electrical wiring of a house just by flipping the switch!</p>
                </div>
              </div>

              <p className="small text-secondary mb-0">
                To "change" a container's ports, you must stop it, remove it (<code>docker rm</code>), and run it again (<code>docker run</code>) with the new configuration.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
