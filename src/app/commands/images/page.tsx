import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker images - Docker Documentation",
  description: "List all Docker images stored on your local machine."
};

export default function DockerImagesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker images</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            List and manage all Docker images stored on your local machine.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: Quick Look */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-3">Syntax: <code className="text-white">docker images [OPTIONS] [REPOSITORY[:TAG]]</code></p>
              <p className="text-secondary">
                This command shows the images you have downloaded or built locally. It is your "inventory" of all the blueprints ready to be turned into containers.
              </p>
            </div>
          </div>

          {/* SECTION: Analogy */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-info-circle-fill"></i>
              </div>
              <h2 className="doc-card-heading">The Freezer Analogy</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                Your local hard drive is like a <strong>freezer</strong>. Every image you have pulled or built is a frozen meal stored in that freezer. 
                <code className="text-white">docker images</code> opens the freezer door and reads the labels: what it is, its version, and how much space it takes.
              </p>

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# List all local images
docker images

# List only specific images
docker images ubuntu`}</code>
              </pre>
            </div>
          </div>

          {/* SECTION: Bulk Management */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-stack"></i>
              </div>
              <h2 className="doc-card-heading">Bulk Image Management</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                To clean up or manipulate images in bulk, use the <code className="text-white">-q</code> (quiet) flag to extract only the Image IDs.
              </p>
              
              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <div className="h-100 p-3 rounded border border-info border-opacity-25 bg-info bg-opacity-10">
                    <h4 className="text-info fs-6 mb-2 font-monospace">Delete All Images</h4>
                    <p className="text-secondary text-xs mb-3">
                      This will attempt to remove every image on your system.
                    </p>
                    <code className="d-block p-2 bg-dark rounded border border-secondary text-white text-xs">
                      docker rmi $(docker images -aq)
                    </code>
                    <p className="text-secondary text-xs mt-2">
                      <strong>Crucial:</strong> Always use <code>-q</code> here. Without it, Docker will try to &quot;delete&quot; the header text like <em>&quot;IMAGE&quot;</em> and <em>&quot;ID&quot;</em>, leading to errors.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-3 rounded border border-warning border-opacity-25 bg-warning bg-opacity-10">
                    <h4 className="text-warning fs-6 mb-2 font-monospace">Force Nuke Everything</h4>
                    <p className="text-secondary text-xs mb-3">
                      Deletes even tagged images and those used by stopped containers.
                    </p>
                    <code className="d-block p-2 bg-dark rounded border border-secondary text-white text-xs">
                      docker rmi -f $(docker images -aq)
                    </code>
                  </div>
                </div>
              </div>
              <p className="text-secondary text-xs mt-3">
                <em>Note: To learn more about why images might fail to delete, see the <strong>docker rmi</strong> manual.</em>
              </p>
            </div>
          </div>

          {/* SECTION: Flag Reference */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-table"></i>
              </div>
              <h2 className="doc-card-heading">Flag Reference</h2>
            </div>
            <div className="doc-card-body">
              <div className="doc-table-wrapper shadow-sm mt-4">
                <table className="table table-dark table-hover doc-table mb-0">
                  <thead>
                    <tr>
                      <th>Flag</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code className="text-white">-a / --all</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Show all images, including intermediate layers hidden by default.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-q / --quiet</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Only show Image IDs. Essential for piping to <code>rmi</code>.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">--filter</code></td>
                      <td><span className="badge bg-secondary">Option</span></td>
                      <td>Filter images (e.g., <code>dangling=true</code>).</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">--no-trunc</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Display full, non-abbreviated Image IDs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
