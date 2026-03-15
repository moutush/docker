import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker cp - Docker Documentation",
  description: "Copy files and directories between a container and the local filesystem in either direction."
};

export default function DockerCpPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker cp</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Copy files and directories between a container and the local filesystem in either direction.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH</code><br>Syntax: <code>docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker cp</code> copies files or directories between a container's filesystem and your local machine in either direction. The container does not need to be running — it works on stopped containers too. Think of it as <code>scp</code> but for container filesystems.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine the container is a sealed box. <code>docker cp</code> is a hatch in the box that lets you drop files in or pull files out — no need to open the box (enter the container). Great for copying log files out, or dropping a config file in.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Copy a log file OUT of the container to your current directory
docker cp my-app:/var/log/app.log ./app.log

# Copy a config file INTO the container
docker cp ./nginx.conf my-nginx:/etc/nginx/nginx.conf`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Extract an entire directory from a stopped container — useful for recovering build artifacts or database dumps after a container has exited.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Copy an entire /app/dist directory OUT of a stopped build container
docker cp my-build-container:/app/dist ./local-dist/

# Copy a directory INTO a running container
docker cp ./migrations/ my-postgres:/docker-entrypoint-initdb.d/

# Use - to pipe a tar archive (stream mode)
docker cp my-app:/etc/nginx/. - | tar x -C ./nginx-backup/`}</code>
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
            <td><code>CONTAINER:SRC_PATH</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Source inside the container. Use container-name:/path/to/file. Container name and path are separated by a colon.</td>
        </tr>
        <tr>
            <td><code>DEST_PATH</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Destination on your local machine where the file/directory will be copied to.</td>
        </tr>
        <tr>
            <td><code>SRC_PATH</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Source on your local machine when copying INTO the container.</td>
        </tr>
        <tr>
            <td><code>CONTAINER:DEST_PATH</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Destination inside the container when copying in.</td>
        </tr>
        <tr>
            <td><code>-a / --archive</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Archive mode: preserves the original file UIDs, GIDs, and timestamps.</td>
        </tr>
        <tr>
            <td><code>-L / --follow-link</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Follow symbolic links in the source path.</td>
        </tr>
        <tr>
            <td><code>- (dash)</code></td>
            <td><span className="badge bg-secondary">Special</span></td>
            <td>Use - as the destination to stream a tar archive to stdout, or as source to stream from stdin.</td>
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
