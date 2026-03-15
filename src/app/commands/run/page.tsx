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

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker run</code> is the most common Docker command. It does two things at once: it <strong>creates</strong> a brand new container from an image, then immediately <strong>starts</strong> it.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of a Docker image like a video game disc. <code>docker run</code> is you putting that disc into your console and pressing Play — the game (container) starts running instantly. If you press Play again, a second, completely separate game session starts. Each session is its own world.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Run the official "hello-world" image — the simplest possible test
docker run hello-world`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>A real-world scenario: run an Nginx web server in the background, map port 8080 on your machine to port 80 inside the container, and give it a name so you can reference it later.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`docker run -d -p 8080:80 --name my-nginx nginx:alpine`}</code>
              </pre>

              <div dangerouslySetInnerHTML={{ __html: `<p>After running this, opening <code>http://localhost:8080</code> in your browser will show the Nginx welcome page.</p>` }} />

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
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Run the container in the background (detached mode). You get your terminal prompt back immediately.</td>
        </tr>
        <tr>
            <td><code>-p HOST:CONTAINER</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Publish a port. Maps a port on your machine (HOST) to a port inside the container (CONTAINER).</td>
        </tr>
        <tr>
            <td><code>--name NAME</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Assign a human-readable name to the container instead of a random one.</td>
        </tr>
        <tr>
            <td><code>-e KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Set an environment variable inside the container.</td>
        </tr>
        <tr>
            <td><code>-v HOST_PATH:CONTAINER_PATH</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Mount a volume. Binds a folder on your machine into the container's filesystem.</td>
        </tr>
        <tr>
            <td><code>--rm</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Automatically remove the container when it exits. Keeps things clean.</td>
        </tr>
        <tr>
            <td><code>-it</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Attach an interactive terminal (-i keeps stdin open, -t allocates a pseudo-TTY). Used when you want a shell inside the container.</td>
        </tr>
        <tr>
            <td><code>--network NETWORK</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Connect the container to a specific Docker network.</td>
        </tr>
        <tr>
            <td><code>IMAGE</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The name (and optional tag) of the image to run, e.g. nginx:alpine or ubuntu:22.04.</td>
        </tr>
        <tr>
            <td><code>COMMAND</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Override the default command the container runs on startup.</td>
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
