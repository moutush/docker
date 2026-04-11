import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker run - Docker Documentation",
  description: "Create and start a container from an image in a single step."
};

export default function DockerRunPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker run</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Create and start a container from an image in a single step.
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
              <p className="text-secondary mb-3">Syntax: <code className="text-white">docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></p>
              <p className="text-secondary">
                <code className="text-white">docker run</code> is the most common Docker command. It does two things at once: it <strong>creates</strong> a brand new container from an image, then immediately <strong>starts</strong> it.
              </p>
            </div>
          </div>

          {/* SECTION: Pro Tip - Order Matters */}
          <div className="doc-section-card shadow-lg border-primary">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-primary">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <h2 className="doc-card-heading">Critical: Order Matters!</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                One of the most common mistakes is putting Docker flags <em>after</em> the image name. 
                All Docker options (<code className="text-white">--name</code>, <code className="text-white">-d</code>, <code className="text-white">-p</code>, etc.) <strong>must come before the image name</strong>.
              </p>
              <div className="mt-3">
                <div className="p-3 rounded bg-dark border border-success mb-2">
                  <code className="text-success">docker run --name my-web nginx</code>
                  <small className="d-block text-secondary mt-1">Correct: Docker knows the name is for the container.</small>
                </div>
                <div className="p-3 rounded bg-dark border border-danger">
                  <code className="text-danger">docker run nginx --name my-web</code>
                  <small className="d-block text-secondary mt-1">Wrong: Docker thinks "--name" is a command to run inside nginx.</small>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: Simple Example */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-info-circle-fill"></i>
              </div>
              <h2 className="doc-card-heading">Analogy</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                Think of a Docker image like a video game disc. <code className="text-white">docker run</code> is you putting that disc into your console and pressing Play — the game (container) starts running instantly. Each session is its own isolated world.
              </p>

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Run the official "hello-world" image
docker run hello-world`}</code>
              </pre>
            </div>
          </div>

          {/* SECTION: Tech-Friendly Example */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-code-slash"></i>
              </div>
              <h2 className="doc-card-heading">Real-World Command</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                Run an Nginx web server in the background, map port 8080 on your machine to port 80 inside the container, and give it a name.
              </p>

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`docker run -d -p 8080:80 --name my-nginx nginx:alpine`}</code>
              </pre>

              <p className="text-secondary mt-3">
                After running this, opening <code className="text-white">http://localhost:8080</code> in your browser will show the Nginx welcome page.
              </p>
            </div>
          </div>

          {/* SECTION: Flag Reference */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-table"></i>
              </div>
              <h2 className="doc-card-heading">Flag / Parameter Reference</h2>
            </div>
            <div className="doc-card-body">
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
                      <td><code className="text-white">-d / --detach</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Run in the background (detached mode). You get your terminal back immediately.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-p HOST:CONTAINER</code></td>
                      <td><span className="badge bg-secondary">Option</span></td>
                      <td>Publish a port. Maps a port on your machine to a port inside the container.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">--name NAME</code></td>
                      <td><span className="badge bg-secondary">Option</span></td>
                      <td>Assign a human-readable name to the container instead of a random one.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-e KEY=VALUE</code></td>
                      <td><span className="badge bg-secondary">Option</span></td>
                      <td>Set an environment variable inside the container.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-v HOST:CONT</code></td>
                      <td><span className="badge bg-secondary">Option</span></td>
                      <td>Mount a volume. Binds a machine folder into the container filesystem.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">--rm</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Automatically remove the container when it exits. Keeps things clean.</td>
                    </tr>
                    <tr>
                      <td><code className="text-white">-it</code></td>
                      <td><span className="badge bg-secondary">Flag</span></td>
                      <td>Interactive terminal. Used when you want a shell <em>inside</em> the container.</td>
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
