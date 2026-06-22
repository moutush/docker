import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker export / import - Docker Documentation",
  description: "Export a container's entire filesystem as a tar archive, or import a tar archive as a new image."
};

export default function DockerExportImportPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker export / import</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Export a container's entire filesystem as a tar archive, or import a tar archive as a new image.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker export CONTAINER > archive.tar</code><br><code>docker import archive.tar [IMAGE[:TAG]]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker export</code> snapshots a container's entire filesystem into a <code>.tar</code> file. <code>docker import</code> does the reverse — it creates a new Docker image from a tar archive. Together they let you transfer or back up container filesystems without using a registry.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Export is like making a zip file of everything inside a container. Import is like unzipping that file and turning it into a fresh image you can run again. Useful for moving containers between machines without internet access to Docker Hub.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Export a container's filesystem to a tar file
docker export my-container > my-container-backup.tar

# Import the tar file as a new image
docker import my-container-backup.tar my-restored-image:latest

# Run the restored image
docker run -it my-restored-image:latest bash`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p><strong>export vs save</strong> — an important distinction:
<ul>
  <li><code>docker export</code> exports a <strong>container</strong> filesystem (flattened, no layer history, no metadata).</li>
  <li><code>docker save</code> exports an <strong>image</strong> with all its layers and history intact.</li>
</ul>
Use export/import for lightweight filesystem transfer. Use save/load when you need to preserve the full image layer cache.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Export with compression piped through gzip
docker export my-container | gzip > my-container.tar.gz

# Import from a compressed archive
gunzip -c my-container.tar.gz | docker import - my-image:restored

# Import with a custom CMD instruction
docker import --change "CMD [\\"node\\", \\"server.js\\"]" backup.tar my-node-app:latest`}</code>
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
            <td><code>docker export CONTAINER</code></td>
            <td><span className="badge bg-secondary">Command</span></td>
            <td>Streams the container's filesystem as a tar to stdout. Redirect with > to save to a file.</td>
        </tr>
        <tr>
            <td><code>-o / --output FILE</code></td>
            <td><span className="badge bg-secondary">Option (export)</span></td>
            <td>Write the tar directly to a file instead of stdout.</td>
        </tr>
        <tr>
            <td><code>docker import SOURCE</code></td>
            <td><span className="badge bg-secondary">Command</span></td>
            <td>Source can be a tar file path, a URL, or - to read from stdin.</td>
        </tr>
        <tr>
            <td><code>--change / -c</code></td>
            <td><span className="badge bg-secondary">Option (import)</span></td>
            <td>Apply Dockerfile instructions (CMD, ENV, EXPOSE, etc.) to the imported image.</td>
        </tr>
        <tr>
            <td><code>--message / -m</code></td>
            <td><span className="badge bg-secondary">Option (import)</span></td>
            <td>Set a commit message for the imported image.</td>
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
