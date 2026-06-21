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

        {/* SECTION: Volumes vs Bind Mounts */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-hdd-stack-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">Volumes vs. Bind Mounts (The Portability Rule)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-3">
              A common point of confusion is how to define a <strong>Bind Mount</strong> in a Dockerfile. The answer is: <strong>You can't.</strong>
            </p>
            
            <p className="text-secondary small mb-3">
              A Dockerfile is an image blueprint that must be perfectly portable across any machine (Windows, Mac, Linux). Because host paths (like <code>/home/raj/data</code> or <code>C:\\data</code>) vary wildly between machines, Docker strictly forbids hardcoding host paths inside a <code>VOLUME</code> instruction.
            </p>

            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered table-hover x-small mb-0">
                <thead>
                  <tr>
                    <th>Where Defined</th>
                    <th>Purpose</th>
                    <th>Can be Anonymous/Named Volume?</th>
                    <th>Can be Bind Mount?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dockerfile</strong> <code>VOLUME</code></td>
                    <td>Build a universally portable image</td>
                    <td><span className="badge bg-success">Yes (Anonymous only)</span></td>
                    <td><span className="badge bg-danger">Never</span></td>
                  </tr>
                  <tr>
                    <td><strong><code>docker run -v</code></strong></td>
                    <td>Run a container on a specific machine</td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                  </tr>
                  <tr>
                    <td><strong><code>compose.yaml</code></strong></td>
                    <td>Deploy an environment-specific stack</td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Wait, why does Compose allow Bind Mounts?</h6>
                <p className="mb-0 x-small text-secondary">
                  Because a <code>compose.yaml</code> file is an <strong>operational deployment config</strong>, not an image blueprint. It is never baked into the image. You might have a <code>compose.dev.yaml</code> that uses bind mounts for live-reloading code on your laptop, and a separate <code>compose.prod.yaml</code> that uses named volumes for production storage. Bind mounts are always a <strong>runtime deployment decision</strong>, never a build-time image definition.
                </p>
              </div>
            </div>
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
            <p className="text-secondary small mb-3">
              This is the most common mistake with the <code>VOLUME</code> command. Any files you try to write <strong>after</strong> the <code>VOLUME</code> instruction will silently disappear. Here is exactly why:
            </p>

            <div className="p-3 bg-dark rounded border border-secondary mb-3">
              <h6 className="text-warning x-small mb-3">Step-by-step: What Docker actually does during <code>docker build</code></h6>
              <div className="d-flex flex-column gap-2">
                <div className="p-2 rounded border border-secondary">
                  <span className="badge bg-info me-2">Step 1</span>
                  <span className="x-small text-secondary">Docker reads <code>VOLUME ["/app/data"]</code> in the Dockerfile.</span>
                </div>
                <div className="p-2 rounded border border-secondary">
                  <span className="badge bg-info me-2">Step 2</span>
                  <span className="x-small text-secondary">Docker immediately mounts a <strong>brand new, empty, temporary volume</strong> at <code>/app/data</code> for this build layer. The folder is now "owned" by the volume, not the image.</span>
                </div>
                <div className="p-2 rounded border border-secondary">
                  <span className="badge bg-warning text-dark me-2">Step 3</span>
                  <span className="x-small text-secondary">You run: <code>RUN touch /app/data/log.txt</code>. The file is written into the <strong>temporary volume</strong>, not into the image filesystem.</span>
                </div>
                <div className="p-2 rounded border border-danger border-opacity-50">
                  <span className="badge bg-danger me-2">Step 4</span>
                  <span className="x-small text-secondary">The build layer finishes. Docker <strong>unmounts and destroys</strong> that temporary volume. The <code>log.txt</code> file was living on the volume, so it is gone forever. The final image has an empty <code>/app/data</code> directory.</span>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-danger border-opacity-50 h-100">
                  <h6 className="text-danger x-small mb-2">❌ WRONG — File disappears silently</h6>
                  <pre className="x-small text-secondary mb-0">{`FROM alpine
WORKDIR /app

# VOLUME declared first ← TRAP!
VOLUME ["/app/data"]

# This file is written to the temp volume
# and is LOST when the build layer ends
RUN touch /app/data/log.txt`}</pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success border-opacity-50 h-100">
                  <h6 className="text-success x-small mb-2">✅ CORRECT — File is baked into the image first</h6>
                  <pre className="x-small text-secondary mb-0">{`FROM alpine
WORKDIR /app

# Create the file BEFORE declaring as VOLUME
RUN mkdir -p /app/data && \
    touch /app/data/log.txt

# NOW declare VOLUME — the file already exists
# in the image and will be copied into any
# volume that mounts here at runtime
VOLUME ["/app/data"]`}</pre>
                </div>
              </div>
            </div>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">The simple rule:</strong> Think of <code>VOLUME</code> as a "hand-off" point. Everything you want pre-seeded in that directory must be written <strong>before</strong> the hand-off. Once you declare <code>VOLUME</code>, that directory is no longer part of the image — it belongs to the external storage system.
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
