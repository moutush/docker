import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker rmi - Docker Documentation",
  description: "Remove one or more images from your local machine."
};

export default function DockerRmiPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker rmi</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Remove one or more images from your local machine.
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
              <p className="text-secondary mb-3">Syntax: <code className="text-white">docker rmi [OPTIONS] IMAGE [IMAGE...]</code></p>
              <p className="text-secondary">
                This command deletes local images. Note that removing an image does NOT stop running containers that were built on it—in fact, Docker will prevent you from deleting the image if a container is still using it.
              </p>
            </div>
          </div>

          {/* SECTION: Troubleshooting Card */}
          <div className="doc-section-card shadow-lg border-danger col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-danger">
                <i className="bi bi-exclamation-octagon-fill"></i>
              </div>
              <h2 className="doc-card-heading">Troubleshooting: "Image is being used"</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-4">
                If you try to delete an image and get an error like <code className="text-danger">conflict: unable to delete...</code>, it means a container (running or stopped) is built on that image.
              </p>
              
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm">
                    <h4 className="text-white fs-6 mb-3">Reason 1: Stopped Containers</h4>
                    <p className="text-secondary text-sm">
                      Even if a container is <strong>stopped</strong>, it still has a legal link to its parent image. Docker won&apos;t let you delete the image because that container might be started again.
                    </p>
                    <div className="mt-3 p-2 rounded bg-opacity-10 bg-primary border border-primary text-xs">
                      <strong>Fix:</strong> Delete the containers first with <code>docker rm [ID]</code>.
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm">
                    <h4 className="text-white fs-6 mb-3">Reason 2: Running Containers</h4>
                    <p className="text-secondary text-sm">
                      Docker will <strong>never</strong> let you delete an image that is currently running as a live process.
                    </p>
                    <div className="mt-3 p-2 rounded bg-opacity-10 bg-danger border border-danger text-xs text-danger">
                      <strong>Fix:</strong> You must <code>docker stop</code> and <code>docker rm</code> the container first.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded border border-warning bg-warning bg-opacity-10">
                <p className="text-secondary text-sm mb-0">
                  <strong className="text-warning text-uppercase">The Force Flag:</strong> You can use <code className="text-white">docker rmi -f</code> to override warnings for stopped containers and force the image out. Use this with caution!
                </p>
              </div>

              <div className="mt-3 p-3 rounded border border-info bg-info bg-opacity-10">
                <p className="text-secondary text-sm mb-0">
                  <strong className="text-info text-uppercase">Pro Tip (The Nuke):</strong> To delete all images, use: <br/>
                  <code className="text-white">docker rmi -f $(docker images -q)</code><br/>
                  The <strong>-q</strong> is mandatory! Without it, Docker tries to delete the header text (IMAGE, ID, etc.) and crashes with errors.
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
                      <td>Force removal of the image. Even if it has multiple tags or stopped containers depend on it.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">--no-prune</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Do not delete untagged parent layers.</td>
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
