import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile VOLUME Command - Docker Documentation",
  description: "Learn how to use the VOLUME command to declare data persistence mount points."
};

export default function DockerfileVolumePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-warning text-dark fs-5 p-2">Runtime / Storage</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>VOLUME Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Declares data persistence mount points. Signals Docker that the directory contains critical, long-term files.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Quick Look */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <h2 className="doc-card-heading">Quick Look</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">Syntax:</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
              {`# 1. JSON Array format (Preferred: declares mount directory)
VOLUME ["/var/log", "/var/db"]

# 2. Plain string format (space separated)
VOLUME /var/log /var/db`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>VOLUME</code> instruction creates a mount point directory with the specified name and marks it as holding externally mounted volumes from the native host or other containers.
            </p>
          </div>
        </div>

        {/* SECTION: Analogy */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-egg-fried"></i>
            </div>
            <h2 className="doc-card-heading text-success">Real-World Analogy</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Imagine buying a standard office desk partition:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                The desk is completely temporary. If the company moves offices, they will throw away the partition desk.
                However, the desk comes with a specifically marked drawer with a slot in the back (<code>VOLUME ["/drawer"]</code>).
                The slot connects directly to a heavy-duty external vault in the building floor.
                <br /><br />
                Even if the desk gets demolished or replaced tomorrow, any files you slipped through the drawer slot are safely stored inside the building vault (persistent storage) and remain completely unaffected.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: The Auto-Provisioning Trap */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-hdd-network-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Anonymous Volume Auto-Provisioning Trap</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              When you declare <code>VOLUME ["/data"]</code>, and a user runs the container without specifying a custom mount:
              <br />
              <code className="text-white bg-dark p-1 rounded">docker run -d my-image</code>
            </p>
            <p className="text-secondary mt-3 mb-0">
              Docker will automatically provision an **Anonymous Volume** on the host machine (e.g. `/var/lib/docker/volumes/...`) and mount it to `/data` inside the container.
              This prevents application databases from writing to the temporary container writeable layer, preventing performance bottlenecks and accidental data loss.
            </p>
          </div>
        </div>

        {/* SECTION: The DCA Gotcha */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">CRITICAL DCA GOTCHA: Build-Time Volume Writes</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-danger">THE STAGING DISCONNECT</h6>

                If you declare a volume on line 3, **you cannot write permanent files to that directory in subsequent RUN commands!**
                <pre className="x-small text-secondary mt-2 mb-2">
                  {`# LINE 3: Declare volume
VOLUME ["/app/data"]

# LINE 4: Write file into the volume (TRAP!)
RUN touch /app/data/log.txt`}
                </pre>
                When Docker executes Line 4 during build-time, it mounts a temporary throwaway volume to build the layer. As soon as the step completes, that temporary volume is unmounted, and the file `log.txt` **vanishes completely** from the final image!
                Always write default files to the directory **before** declaring it as a <code>VOLUME</code>.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Examples */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-code-slash"></i>
            </div>
            <h2 className="doc-card-heading">Code Examples</h2>
          </div>
          <div className="doc-card-body">
            <h6 className="text-light fw-bold">Example: Official Postgres Database</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
              {`FROM debian:stable-slim

# Create database folder
RUN mkdir -p /var/lib/postgresql/data && \\
    chown -R postgres:postgres /var/lib/postgresql

# Declare data directory as persistent
VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432
CMD ["postgres"]`}
            </pre>
          </div>
        </div>

        {/* SECTION: Interview Tips */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Interview Questions (DCA Level)</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Can you specify host paths inside a Dockerfile VOLUME statement?</h6>
                <p className="mb-0 x-small text-secondary">
                  **No!** For platform portability, the Dockerfile is designed to run anywhere. Since path structures on Windows, Mac, and Linux are completely different, declaring a host-bind mount like <code>VOLUME ["/home/user/data:/data"]</code> inside a Dockerfile is **not allowed** and will cause syntax errors. Host binding can only be done at runtime (using `-v` or `--mount`).
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: What happens to volume files when a container is deleted?</h6>
                <p className="mb-0 x-small text-secondary">
                  Files stored inside a volume **remain perfectly intact on the host machine** even when the container is stopped, deleted, or upgraded. Volumes exist independently of the container lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Common Mistakes */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-bug-fill"></i>
            </div>
            <h2 className="doc-card-heading">Common Mistakes</h2>
          </div>
          <div className="doc-card-body">
            <ul className="text-secondary small mb-0">
              <li className="mb-2">
                <span className="text-danger fw-bold">Relying on anonymous volumes automatically cleaning up:</span> If you run containers repeatedly with anonymous volumes, the volume data stays on your host disk forever. They become **dangling volumes**. Run <code>docker volume prune</code> periodically to wipe them out.
              </li>
              <li>
                <span className="text-danger fw-bold">Placing the VOLUME instruction before copying configuration files:</span> Declaring <code>VOLUME /app</code> and then running <code>COPY config.json /app/</code>. The config file will not be visible inside the container when mounted at runtime!
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION: Mini Exercise */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h2 className="doc-card-heading text-info">Mini Exercise</h2>
          </div>
          <div className="doc-card-body">
            <p className="small text-secondary">
              Inspect how Docker maps anonymous volumes:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Run a container: <code>docker run -d --name temp-db postgres:alpine</code></li>
              <li className="mb-2">Inspect its mounts: <code>docker inspect temp-db --format='{"{{.Mounts}}"}'</code></li>
              <li>Notice how Docker has automatically created an anonymous volume ID and mounted it to Nginx or Postgres storage folders without any manual volume flags!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
