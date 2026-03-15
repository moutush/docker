import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker kill - Docker Documentation",
  description: "Send a signal to a running container — by default SIGKILL, which force-terminates it instantly."
};

export default function DockerKillPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker kill</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Send a signal to a running container — by default SIGKILL, which force-terminates it instantly.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker kill [OPTIONS] CONTAINER [CONTAINER...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker kill</code> sends a UNIX signal to a container's main process. The default signal is <code>SIGKILL</code>, which terminates the process immediately with no cleanup. You can send any signal — <code>SIGHUP</code> to reload config, <code>SIGUSR1</code> for custom handlers, etc.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker stop</code> is politely asking a process to quit. <code>docker kill</code> is pulling the power plug — instant termination, no questions asked. Use it when a container is frozen and not responding to stop.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Force-kill a container immediately
docker kill my-nginx

# Send SIGHUP instead (e.g. to reload nginx config without restarting)
docker kill --signal SIGHUP my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>In CI teardown scripts, kill all running containers instantly to ensure a clean state before the next run.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Kill all running containers at once
docker kill $(docker ps -q)`}</code>
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
            <td>Name or ID of the container. Multiple accepted.</td>
        </tr>
        <tr>
            <td><code>-s / --signal SIGNAL</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>UNIX signal to send. Default is SIGKILL. Examples: SIGHUP, SIGTERM, SIGUSR1, SIGINT.</td>
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
