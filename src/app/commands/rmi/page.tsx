import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker rmi - Docker Documentation",
  description: "Remove one or more images from your local storage."
};

export default function DockerRmiPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker rmi</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove one or more images from your local storage.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker rmi [OPTIONS] IMAGE [IMAGE...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker rmi</code> removes an image from your local machine. You cannot remove an image while a container (even a stopped one) is using it — you must remove the container first with <code>docker rm</code>.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Images take up disk space — sometimes several hundred megabytes each. <code>docker rmi</code> is like deleting a game from your hard drive because you no longer play it. The console (Docker) is still there, you just freed up some storage.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove an image by name and tag
docker rmi nginx:alpine

# Remove by image ID
docker rmi a3f5c821b90d`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>After a CI build, clean up old build images to keep the build server lean.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove all dangling (untagged) images
docker image prune

# Remove ALL unused images (not just dangling ones)
docker image prune -a

# Force remove a specific image without confirmation
docker rmi -f my-org/my-app:old-version`}</code>
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
            <td><code>IMAGE</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Image name:tag or image ID to remove. Multiple values accepted.</td>
        </tr>
        <tr>
            <td><code>-f / --force</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Force removal even if a stopped container references the image.</td>
        </tr>
        <tr>
            <td><code>--no-prune</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Do not delete untagged parent layers.</td>
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
