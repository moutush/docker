import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker ps - Docker Documentation",
  description: "List containers — running by default, all with the -a flag."
};

export default function DockerPsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker ps</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            List containers — running by default, all with the -a flag.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker ps [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker ps</code> shows a table of your containers. By default it only shows <strong>running</strong> containers. The output includes Container ID, the image it came from, the command it is running, when it was created, its status, ports, and names.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of <code>docker ps</code> as the Task Manager (Windows) or Activity Monitor (Mac) for your containers. It shows you which ones are alive and running right now.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show only running containers
docker ps

# Show ALL containers, including stopped ones
docker ps -a`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Extract just the container IDs of all stopped containers and pipe them to <code>docker rm</code> for bulk cleanup.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Filter to show only exited containers
docker ps -a --filter "status=exited"

# Get just the IDs (quiet mode) and remove all stopped containers
docker rm $(docker ps -aq --filter "status=exited")`}</code>
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
            <td><code>-a / --all</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Show all containers, not just running ones. Includes stopped, exited, and created containers.</td>
        </tr>
        <tr>
            <td><code>-q / --quiet</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print only container IDs. Useful for scripting and piping into other commands.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter output by a condition. Common keys: status (running, exited), name, label, ancestor.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Pretty-print containers using a Go template, e.g. --format '{{.Names}}\\t{{.Status}}'.</td>
        </tr>
        <tr>
            <td><code>-n N / --last N</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Show only the last N created containers (regardless of status).</td>
        </tr>
        <tr>
            <td><code>-s / --size</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Display the total file sizes used by each container.</td>
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
