import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker diff - Docker Documentation",
  description: "Show all filesystem changes made inside a container since it was started."
};

export default function DockerDiffPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker diff</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Show all filesystem changes made inside a container since it was started.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker diff CONTAINER</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker diff</code> lists all files and directories that have been <strong>Added (A)</strong>, <strong>Changed (C)</strong>, or <strong>Deleted (D)</strong> inside a container's writable layer since the container was created. It compares the current state against the original image.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine Docker gave you a pristine hotel room (the image). <code>docker diff</code> is housekeeping's checklist of everything you moved, added, or broke since you checked in. It only tracks what changed — the original furniture (base image) is not listed.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# See what files changed inside my-nginx since it started
docker diff my-nginx

# Example output:
# C /etc/nginx/nginx.conf     (C = changed)
# A /var/log/nginx/access.log  (A = added)
# D /tmp/cache                 (D = deleted)`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Use <code>docker diff</code> during a debugging session to confirm that a config file was correctly written into a running container before committing it into a new image layer.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# 1. Start a container and make a change
docker exec my-app sh -c "echo 'debug=true' >> /app/config.ini"

# 2. Verify the change was recorded
docker diff my-app
# A /app/config.ini

# 3. If happy, commit the container state as a new image
docker commit my-app my-app:with-debug-config`}</code>
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
            <td>Name or ID of the container to inspect.</td>
        </tr>
        <tr>
            <td><code>A</code></td>
            <td><span className="badge bg-secondary">Output prefix</span></td>
            <td>File or directory was Added (did not exist in the original image).</td>
        </tr>
        <tr>
            <td><code>C</code></td>
            <td><span className="badge bg-secondary">Output prefix</span></td>
            <td>File or directory was Changed (exists in the original image but was modified).</td>
        </tr>
        <tr>
            <td><code>D</code></td>
            <td><span className="badge bg-secondary">Output prefix</span></td>
            <td>File or directory was Deleted (existed in the original image but was removed inside the container).</td>
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
