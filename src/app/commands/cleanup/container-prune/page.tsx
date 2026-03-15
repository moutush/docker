import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker container prune - Docker Documentation",
  description: "Remove all stopped containers, keeping images and volumes intact."
};

export default function DockerContainerPrunePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker container prune</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove all stopped containers, keeping images and volumes intact.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker container prune [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker container prune</code> deletes all containers that are in a <strong>stopped/exited</strong> state. Running containers are never touched. It is a safer and more targeted alternative to <code>docker system prune</code> when you only want to clean up containers.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Running <code>docker run</code> over and over leaves ghost containers piling up — stopped, doing nothing, but still taking up a small amount of disk space and namespace. <code>docker container prune</code> sweeps them all away in one go.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove all stopped containers (prompts for confirmation)
docker container prune

# Skip confirmation
docker container prune -f`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Remove only containers that exited more than 24 hours ago, leaving recently stopped containers intact for inspection.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Prune only containers older than 24 hours
docker container prune --filter "until=24h" -f`}</code>
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
            <td><code>-f / --force</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Do not prompt for confirmation. Required for scripting.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter which stopped containers to remove. Supports until=DURATION and label=KEY.</td>
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
