import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker info / version / system df - Docker Documentation",
  description: "Inspect the Docker daemon configuration, version details, and disk usage."
};

export default function DockerInfoVersionSystemDfPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker info / version / system df</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Inspect the Docker daemon configuration, version details, and disk usage.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker info</code> — daemon config &amp; resource summary<br><code>docker version</code> — client and server version detail<br><code>docker system df</code> — disk usage breakdown</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>These three read-only commands help you understand the current state of your Docker installation without changing anything.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker version</code> is like checking what version of an app you installed. <code>docker info</code> opens the full settings panel — how many containers are running, how much memory Docker can use, what OS it is running on. <code>docker system df</code> is checking how much disk space Docker is consuming overall.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show Docker client and server versions
docker version

# Show system-wide Docker information
docker info

# Show disk usage by images, containers, and volumes
docker system df`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Use these commands at the start of a CI job to log the Docker environment, or to audit how much reclaimable space exists on a build server.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Verbose disk usage (shows each image/container/volume individually)
docker system df -v

# Get just the Docker server version as a plain string
docker version --format '{{.Server.Version}}'

# Check number of running containers and total memory
docker info --format '{{.ContainersRunning}} containers, {{.MemTotal}} bytes RAM'`}</code>
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
            <td><code>docker info --format</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Extract specific fields using a Go template.</td>
        </tr>
        <tr>
            <td><code>docker version --format</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format version output. Use json for structured output.</td>
        </tr>
        <tr>
            <td><code>docker system df -v</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Show verbose output: breaks down disk usage per individual image, container, and volume.</td>
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
