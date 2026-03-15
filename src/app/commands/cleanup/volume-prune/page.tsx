import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker volume prune - Docker Documentation",
  description: "Remove all unused volumes — volumes not mounted by any container."
};

export default function DockerVolumePrunePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker volume prune</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove all unused volumes — volumes not mounted by any container.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker volume prune [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker volume prune</code> deletes all volumes that are not currently mounted by any container (running or stopped). Volumes can hold databases and important data — use this command with care.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Volumes are like USB drives plugged into your containers. When you delete a container without its volume, the "USB drive" stays behind, floating and unconnected. <code>docker volume prune</code> throws away all the disconnected drives. Be careful — if the drive had important data (like a database), it is gone permanently.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# See which volumes exist and their sizes
docker volume ls

# Remove all unused volumes (CAUTION: data is permanently deleted)
docker volume prune -f`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>After a full environment teardown in a staging environment, prune volumes that are no longer needed — but only those not labeled as persistent.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Only prune volumes that do NOT have the label 'keep=true'
docker volume prune --filter "label!=keep=true" -f`}</code>
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
            <td>Skip the confirmation prompt. Essential for automation.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Only prune volumes matching a filter. Supports label and until conditions.</td>
        </tr>
        <tr>
            <td><code>-a / --all</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Remove all unused volumes, including those with names (default only removes anonymous volumes in newer Docker versions).</td>
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
