import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker exec - Docker Documentation",
  description: "Run a command inside an already-running container."
};

export default function DockerExecPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker exec</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Run a command inside an already-running container.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker exec</code> lets you run an additional command inside a container that is already running. The most common use is to open an interactive shell so you can inspect or debug the container from the inside.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine the container is a locked room with a person (process) inside. <code>docker exec</code> is you knocking on the door and handing a note through a slot — you can ask the person to do something without disturbing their main task. Opening a shell is like being teleported inside the room.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Open an interactive bash shell inside a running container
docker exec -it my-nginx bash`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Run a one-off database command inside a running Postgres container without opening a full shell session.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Run psql inside a running Postgres container as the postgres user
docker exec -it my-postgres psql -U postgres -c "SELECT version();"

# Run a command as a specific user inside the container
docker exec -u www-data my-nginx nginx -t`}</code>
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
            <td>Name or ID of the already-running container to target.</td>
        </tr>
        <tr>
            <td><code>COMMAND</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The command to run inside the container, e.g. bash, sh, ls, psql.</td>
        </tr>
        <tr>
            <td><code>-i / --interactive</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Keep stdin open so you can type input to the command.</td>
        </tr>
        <tr>
            <td><code>-t / --tty</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Allocate a pseudo-terminal. Use with -i (-it) for an interactive shell.</td>
        </tr>
        <tr>
            <td><code>-d / --detach</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Run the command in the background and return immediately.</td>
        </tr>
        <tr>
            <td><code>-e KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Set an environment variable for this exec session only.</td>
        </tr>
        <tr>
            <td><code>-u USER</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Run the command as a specific user or UID inside the container.</td>
        </tr>
        <tr>
            <td><code>-w DIR</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Set the working directory inside the container for this command.</td>
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
