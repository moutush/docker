import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker image prune - Docker Documentation",
  description: "Remove dangling or unused images to free up disk space."
};

export default function DockerImagePrunePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker image prune</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove dangling or unused images to free up disk space.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker image prune [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker image prune</code> removes <strong>dangling images</strong> by default — these are untagged image layers left behind when you rebuild an image with the same tag. They have no name, no tag, and nothing references them. They are pure wasted disk space.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Every time you rebuild an image using the same tag, the old version loses its label and becomes a "ghost" image. Over time these ghosts pile up and eat gigabytes. <code>docker image prune</code> exorcises all the ghosts.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove only dangling (untagged) images
docker image prune

# Remove ALL unused images (not just dangling)
docker image prune -a`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>On a build server, remove all images older than 48 hours that are no longer referenced by a running or stopped container.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove all unused images older than 48 hours without prompting
docker image prune -a --filter "until=48h" -f`}</code>
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
            <td><code>-a / --all</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Remove all images not referenced by any container (running or stopped), not just dangling ones.</td>
        </tr>
        <tr>
            <td><code>-f / --force</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Skip the confirmation prompt.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Only prune images matching a condition, e.g. until=48h removes images older than 48 hours.</td>
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
