import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker save / load - Docker Documentation",
  description: "Export a full image (with all layers) to a tar file, or load it back — no registry required."
};

export default function DockerSaveLoadPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker save / load</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Export a full image (with all layers) to a tar file, or load it back — no registry required.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker save IMAGE > archive.tar</code><br><code>docker load < archive.tar</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker save</code> exports a full image — all layers, tags, and metadata — into a tar file. <code>docker load</code> imports it back, restoring the image exactly as it was. Unlike <code>docker export</code> (which exports a container filesystem), <code>save</code> preserves the complete image layer cache.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-emoji-smell-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Noob-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Save/load is a USB stick for Docker images. You build an image, <code>docker save</code> it to a <code>.tar</code> file, copy the file to another machine (even one with no internet), and <code>docker load</code> it. The image appears exactly as if you had built it or pulled it from a registry.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Save an image to a tar file
docker save my-app:latest > my-app.tar

# Load it on another machine
docker load < my-app.tar`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Save multiple images into one archive and transfer them to an air-gapped server with no internet connection.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Save multiple images into one archive
docker save my-app:v1 nginx:alpine postgres:16 | gzip > stack-images.tar.gz

# Load on the target machine
gunzip -c stack-images.tar.gz | docker load

# Save to a file directly (instead of stdout redirect)
docker save -o my-app.tar my-app:latest`}</code>
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
            <td><code>docker save IMAGE [IMAGE...]</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>One or more image names/tags to include in the archive.</td>
        </tr>
        <tr>
            <td><code>docker save -o FILE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Write to a file directly instead of stdout. Equivalent to > redirect.</td>
        </tr>
        <tr>
            <td><code>docker load -i FILE</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Load from a file instead of stdin. Equivalent to \\u003c redirect.</td>
        </tr>
        <tr>
            <td><code>docker load -q</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Suppress output — only print the loaded image names.</td>
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
