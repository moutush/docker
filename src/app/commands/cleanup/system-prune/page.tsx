import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker system prune - Docker Documentation",
  description: "The nuclear option — remove all stopped containers, dangling images, unused networks, and build cache in one command."
};

export default function DockerSystemPrunePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker system prune</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            The nuclear option — remove all stopped containers, dangling images, unused networks, and build cache in one command.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker system prune [OPTIONS]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker system prune</code> is the all-in-one cleanup command. By default it removes: all <strong>stopped containers</strong>, all <strong>dangling images</strong> (untagged layers), all <strong>unused networks</strong>, and the entire <strong>build cache</strong>. Adding <code>-a</code> also removes any image not referenced by a running container.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>After weeks of experimenting with Docker, your machine accumulates junk — old containers you forgot to delete, half-built images, cached layers. <code>docker system prune</code> is the "clean my room" button. One command and all the mess is gone.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Interactive cleanup (will ask for confirmation)
docker system prune

# Skip confirmation prompt
docker system prune -f`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>On a CI build server, aggressively reclaim disk space after every pipeline run by removing all unused images and volumes.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Remove EVERYTHING unused, including all untagged AND unreferenced images
docker system prune -a -f

# Also remove unused volumes (adds --volumes flag)
docker system prune -a -f --volumes

# See how much space would be freed before committing
docker system df`}</code>
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
            <td>Remove all unused images, not just dangling ones. This is the biggest space saver.</td>
        </tr>
        <tr>
            <td><code>-f / --force</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Skip the confirmation prompt. Use in scripts and CI pipelines.</td>
        </tr>
        <tr>
            <td><code>--volumes</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Also remove unused volumes. Not included by default to prevent accidental data loss.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Only prune objects matching a filter — e.g. until=24h removes objects older than 24 hours.</td>
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
