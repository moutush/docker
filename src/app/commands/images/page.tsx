import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker images - Docker Documentation",
  description: "List all Docker images stored on your local machine."
};

export default function DockerImagesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker images</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            List all Docker images stored on your local machine.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker images [OPTIONS] [REPOSITORY[:TAG]]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker images</code> shows the images you have downloaded or built locally. The output shows the repository name, tag, image ID, when it was created, and its compressed disk size.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Your local hard drive is like a freezer. Every image you have pulled or built is a frozen meal stored in that freezer. <code>docker images</code> opens the freezer door and reads out the label on every box — what it is, what version, and how big it is.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# List all local images
docker images

# List only Ubuntu images
docker images ubuntu`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Find all dangling images (untagged layers left over from old builds) and delete them to reclaim disk space.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Show only dangling (untagged) images
docker images --filter "dangling=true"

# Remove all dangling images
docker image prune`}</code>
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
            <td><code>REPOSITORY[:TAG]</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Filter output to only show images matching this name/tag.</td>
        </tr>
        <tr>
            <td><code>-a / --all</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Show all images including intermediate layers (hidden by default).</td>
        </tr>
        <tr>
            <td><code>-q / --quiet</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Print only image IDs. Useful for scripting.</td>
        </tr>
        <tr>
            <td><code>--filter KEY=VALUE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter images. E.g. dangling=true shows untagged images; before=IMAGE shows older images.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format the output using a Go template.</td>
        </tr>
        <tr>
            <td><code>--no-trunc</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Do not truncate output — show full image IDs.</td>
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
