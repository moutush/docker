import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker volume create - Docker Documentation",
  description: "Create a named volume for persisting data across container lifecycles."
};

export default function DockerVolumeCreatePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker volume create</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Create a named volume for persisting data across container lifecycles.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker volume create [OPTIONS] [VOLUME]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Volumes are the recommended way to persist data in Docker. Unlike bind mounts, volumes are fully managed by Docker, stored in a Docker-controlled directory on the host, and work the same on Windows, Mac, and Linux.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>A container's internal filesystem is temporary — when you delete the container, all data inside it is gone. A volume is an external hard drive you plug into the container. Delete the container, and the hard drive (volume) still exists with all its data intact.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Create a named volume
docker volume create my-db-data

# Use it when running a container
docker run -d -v my-db-data:/var/lib/postgresql/data postgres:16`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Create a volume with a specific driver for network-attached storage in a production environment.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Create a volume and inspect it
docker volume create my-db-data
docker volume inspect my-db-data`}</code>
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
            <td><code>VOLUME</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Name for the volume. Omit for an auto-generated name.</td>
        </tr>
        <tr>
            <td><code>--driver / -d STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Volume driver. Default is local. Others: nfs, aws-efs, etc.</td>
        </tr>
        <tr>
            <td><code>--opt / -o KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Driver-specific options (e.g. size, type for cloud volumes).</td>
        </tr>
        <tr>
            <td><code>--label KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Attach metadata labels to the volume for filtering later.</td>
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
