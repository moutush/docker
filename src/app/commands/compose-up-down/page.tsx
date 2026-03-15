import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker compose up / down - Docker Documentation",
  description: "Start your entire multi-container application from a compose file, or tear it all down."
};

export default function DockerComposeUpDownPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker compose up / down</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Start your entire multi-container application from a compose file, or tear it all down.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker compose up [OPTIONS]</code><br><code>docker compose down [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Docker Compose orchestrates multi-container applications defined in a <code>compose.yaml</code> file. <code>compose up</code> creates and starts all defined services, networks, and volumes. <code>compose down</code> stops and removes them — optionally also removing volumes and images.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Running a modern app usually needs multiple containers: a web server, a database, a cache. Without Compose, you would start each one manually. <code>docker compose up</code> reads a recipe file (<code>compose.yaml</code>) and starts everything at once. <code>compose down</code> shuts everything down cleanly.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Start all services defined in compose.yaml
docker compose up

# Start in background (detached)
docker compose up -d

# Stop and remove all containers + networks
docker compose down`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Start only a subset of services, force a rebuild of images, and on teardown also remove volumes to get a fully clean state.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Rebuild images then start (ignores cache)
docker compose up -d --build

# Start only the backend service (not frontend or db)
docker compose up -d backend

# Tear down: remove containers, networks, AND volumes
docker compose down -v

# Tear down and also remove the built images
docker compose down --rmi all -v`}</code>
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
            <td><code>-d / --detach</code></td>
            <td><span className="badge bg-secondary">Flag (up)</span></td>
            <td>Run all services in the background and return the prompt.</td>
        </tr>
        <tr>
            <td><code>--build</code></td>
            <td><span className="badge bg-secondary">Flag (up)</span></td>
            <td>Force rebuild of service images before starting containers.</td>
        </tr>
        <tr>
            <td><code>--no-deps</code></td>
            <td><span className="badge bg-secondary">Flag (up)</span></td>
            <td>Start only the specified service, without starting its dependencies.</td>
        </tr>
        <tr>
            <td><code>--scale SERVICE=N</code></td>
            <td><span className="badge bg-secondary">Option (up)</span></td>
            <td>Override the number of replicas for a service.</td>
        </tr>
        <tr>
            <td><code>-v / --volumes</code></td>
            <td><span className="badge bg-secondary">Flag (down)</span></td>
            <td>Remove named and anonymous volumes declared in compose.yaml.</td>
        </tr>
        <tr>
            <td><code>--rmi STRING</code></td>
            <td><span className="badge bg-secondary">Option (down)</span></td>
            <td>Remove images. Values: all (all images used), local (only locally built ones).</td>
        </tr>
        <tr>
            <td><code>-f / --file FILE</code></td>
            <td><span className="badge bg-secondary">Option (both)</span></td>
            <td>Specify a non-default compose file, e.g. -f docker-compose.prod.yaml.</td>
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
