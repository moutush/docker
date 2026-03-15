import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker top - Docker Documentation",
  description: "Display the running processes inside a container, like the unix 'ps' command."
};

export default function DockerTopPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker top</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Display the running processes inside a container, like the unix 'ps' command.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker top CONTAINER [ps OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker top</code> shows the processes currently running inside a container, using the host's <code>ps</code> command under the hood. It answers the question: "what is actually running inside this container right now?"</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine you hired a worker (container) and locked them in a room. <code>docker top</code> lets you look through a window and see exactly what they are doing at this moment — are they working, sleeping, or running something suspicious?</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# List processes inside a running container
docker top my-nginx`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Pass custom <code>ps</code> options to get a more detailed process view including threads and full command paths.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show all processes with full command and user info
docker top my-app aux

# Show processes with threads
docker top my-app -eLf`}</code>
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
            <td><code>CONTAINER</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Name or ID of the running container to inspect.</td>
        </tr>
        <tr>
            <td><code>[ps OPTIONS]</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Optional arguments passed directly to the unix ps command, e.g. aux, -eLf, -o pid,cmd.</td>
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
