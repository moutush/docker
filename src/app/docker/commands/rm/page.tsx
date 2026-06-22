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
            Remove one or more containers from your system.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: Quick Look */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-trash-fill"></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-3">Syntax: <code className="text-white">docker rm [OPTIONS] CONTAINER [CONTAINER...]</code></p>
              <p className="text-secondary">
                This command deletes a container. The container must be stopped first unless you use the <code className="text-white">-f</code> (force) flag. 
                Removing a container does <strong>not</strong> delete the image — it only deletes that specific instance of the app.
              </p>
            </div>
          </div>

          {/* SECTION: The Analogy */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-info-circle-fill"></i>
              </div>
              <h2 className="doc-card-heading">The Tent Analogy</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                A container is like a <strong>tent</strong> you pitched in your garden. 
                <code className="text-white">docker stop</code> is like packing your stuff inside the tent. 
                <code className="text-white">docker rm</code> takes the tent down entirely. The blueprint for the tent (the image) still exists in your garage — you can pitch a new one anytime.
              </p>
            </div>
          </div>

          {/* SECTION: Troubleshooting & Bulk Delete */}
          <div className="doc-section-card shadow-lg col-12 border-primary">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-primary">
                <i className="bi bi-stack"></i>
              </div>
              <h2 className="doc-card-heading">Bulk Deletion & Troubleshooting</h2>
            </div>
            <div className="doc-card-body">
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm">
                    <h4 className="text-white fs-6 mb-3">Why did "docker rm -f" fail?</h4>
                    <p className="text-secondary text-sm">
                      Docker requires at least one argument. <code className="text-white">-f</code> is an option (flag), but you didn&apos;t tell Docker <strong>which</strong> containers to force-remove.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm">
                    <h4 className="text-white fs-6 mb-3">The "Nuke Every Container" Command</h4>
                    <p className="text-secondary text-sm">
                      To delete <strong>all</strong> containers (running or stopped) in one go, use a sub-command to get all IDs:
                    </p>
                    <code className="d-block p-2 bg-dark rounded border border-primary text-primary text-xs mt-2">
                      docker rm -f $(docker ps -aq)
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded border border-info bg-info bg-opacity-10">
                <p className="text-secondary text-sm mb-0">
                  <strong className="text-info text-uppercase">Pro Tip:</strong> If you only want to delete <strong>stopped</strong> containers, use the cleaner command: <code className="text-white">docker container prune</code>.
                </p>
              </div>
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
                      <td><code className="text-white">-f / --force</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Force-remove a running container (sends SIGKILL).</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-v / --volumes</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Remove anonymous volumes associated with the container.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-l / --link</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Remove the specified link between containers.</td>
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
