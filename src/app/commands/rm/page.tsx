import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker rm - Docker Documentation",
  description: "Remove one or more stopped containers from your system."
};

export default function DockerRmPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker rm</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove one or more stopped containers from your system.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker rm [OPTIONS] CONTAINER [CONTAINER...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker rm</code> deletes a container. The container must be stopped first (unless you use <code>-f</code>). Removing a container does <strong>not</strong> delete the image it was created from — only the running instance.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>A container is like a tent you pitched in your garden. <code>docker stop</code> packs your stuff inside the tent. <code>docker rm</code> takes the tent down entirely and puts the poles and canvas back in storage. The blueprint for the tent (the image) still exists — you can pitch a new one anytime.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove a single stopped container
docker rm my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Force-remove a running container (skips stop), and also remove its anonymous volumes at the same time.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Force remove a running container along with its anonymous volumes
docker rm -f -v my-nginx

# Remove all stopped containers at once
docker container prune`}</code>
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
            <td>Container name or ID to remove. Multiple values are accepted.</td>
        </tr>
        <tr>
            <td><code>-f / --force</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Force-remove a running container by sending SIGKILL before deleting it.</td>
        </tr>
        <tr>
            <td><code>-v / --volumes</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Remove anonymous volumes attached to the container along with the container itself.</td>
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
