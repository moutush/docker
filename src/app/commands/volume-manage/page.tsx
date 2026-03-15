import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker volume ls / inspect / rm - Docker Documentation",
  description: "List, inspect, and remove Docker volumes."
};

export default function DockerVolumeLsInspectRmPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker volume ls / inspect / rm</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            List, inspect, and remove Docker volumes.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker volume ls</code> — list all volumes<br><code>docker volume inspect VOLUME</code> — detailed JSON info<br><code>docker volume rm VOLUME</code> — delete a volume</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>These three commands let you manage the full lifecycle of volumes. <code>ls</code> shows what exists, <code>inspect</code> shows where data lives on the host and which containers are using it, and <code>rm</code> permanently deletes a volume and all its data.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker volume ls</code> is like checking what hard drives are connected. <code>docker volume inspect</code> opens Device Manager and shows full specs. <code>docker volume rm</code> formats and removes the drive permanently — all data is gone.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# List all volumes
docker volume ls

# Inspect a volume (shows mountpoint on host)
docker volume inspect my-db-data

# Remove a volume (container must be stopped/removed first)
docker volume rm my-db-data`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Find the exact host path of a volume's data to back it up directly from the filesystem.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Get the mountpoint path of a volume
docker volume inspect my-db-data --format '{{.Mountpoint}}'
# /var/lib/docker/volumes/my-db-data/_data

# Remove all unused volumes
docker volume prune -f`}</code>
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
            <td><code>docker volume ls --filter</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter volumes: dangling=true (unused), name=\\u003cpattern>, label=\\u003ckey>.</td>
        </tr>
        <tr>
            <td><code>docker volume ls -q</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print only volume names. Useful for piping to docker volume rm.</td>
        </tr>
        <tr>
            <td><code>docker volume inspect --format</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Extract a specific field using a Go template, e.g. {{.Mountpoint}}.</td>
        </tr>
        <tr>
            <td><code>docker volume rm -f</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Force remove (some drivers support this even if a stopped container references the volume).</td>
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
