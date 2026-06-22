import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile ADD Command - Docker Documentation",
  description: "Learn how to use the ADD command for advanced file transfers and archive extraction."
};

export default function DockerfileAddPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info fs-5 p-2">Build-Time</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>ADD Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          An advanced cousin of COPY. Not only copies files, but also downloads remote URLs and automatically unpacks archives.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Quick Look */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <h2 className="doc-card-heading">Quick Look</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">Syntax:</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
              {`# 1. Standard copying (same as COPY)
ADD source.txt /app/

# 2. Automatically unpacks local tarball archive
ADD local-archive.tar.gz /app/src/

# 3. Downloads remote file from a URL
ADD https://example.com/data.json /app/data/`}
            </pre>
            <p className="text-secondary mb-0">
              While <code>ADD</code> offers more features, the official Docker Best Practices guide recommends **using COPY instead of ADD** in almost all cases for simplicity and security.
            </p>
          </div>
        </div>

        {/* SECTION: Analogy */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-egg-fried"></i>
            </div>
            <h2 className="doc-card-heading text-success">Real-World Analogy</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Imagine hiring a delivery service for your retail store:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                • <strong>COPY</strong> is a basic courier. They deliver a sealed box to your store. You have to open the box and arrange the items yourself.
                <br /><br />
                • <strong>ADD</strong> is a premium concierge courier. If they deliver a sealed box, they open it and unpack all the individual items onto your shelves automatically (tar extraction). They can also drive to another city to fetch items for you (downloading from URLs).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: The Auto-Extract Feature */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-file-zip-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Archive Auto-Extraction Feature</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If you have a local compressed archive (such as `.tar`, `.tgz`, `.tar.gz`, `.tar.bz2`, or `.tar.xz`), using <code>ADD</code> will automatically extract it into the target directory in your image.
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`# If project-assets.tar.gz is on your laptop
ADD project-assets.tar.gz /usr/share/nginx/html/`}
            </pre>
            <p className="text-secondary mb-0">
              The target container directory will receive the **uncompressed, raw files** directly. This is a very clean way to load huge asset directories without forcing Docker to compile them file-by-file (which bloats build times).
            </p>
          </div>
        </div>

        {/* SECTION: COPY vs ADD Guidelines */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">When to use which?</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Recommended Command</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Copying local code files or configs</td>
                    <td><span className="badge bg-success">COPY</span></td>
                    <td>Safer, simpler, and makes the Dockerfile more predictable.</td>
                  </tr>
                  <tr>
                    <td>Extracting a local tarball into the image</td>
                    <td><span className="badge bg-warning text-dark">ADD</span></td>
                    <td>This is the main valid use case for ADD. Saves you a manual extraction layer.</td>
                  </tr>
                  <tr>
                    <td>Downloading files from remote URLs</td>
                    <td><span className="badge bg-danger">RUN curl / wget</span></td>
                    <td>ADD does **not** delete downloaded temp files, bloating the image. Use RUN to download and delete in one step!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: Examples */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-code-slash"></i>
            </div>
            <h2 className="doc-card-heading">Code Examples</h2>
          </div>
          <div className="doc-card-body">
            <h6 className="text-light fw-bold">Good Use of ADD (Extracting pre-compiled binaries)</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`FROM alpine:3.18
WORKDIR /app
# Unpacks app binaries directly into /app
ADD app-dist.tar.gz .`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Why you should NOT use ADD for URL downloads</h6>
            <p className="small text-secondary mb-2">
              If you use <code>ADD</code> to fetch a zip, it will **not** extract it (auto-extract only works for *local* files). It stays zipped, and you have to run `unzip` anyway. This creates two heavy layers:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
              {`# BAD DESIGN (Bloats image):
ADD https://example.com/packages.zip /tmp/
RUN unzip /tmp/packages.zip -d /app/ && rm /tmp/packages.zip

# GOOD DESIGN (Single Layer, Minimal Size):
RUN apk add --no-cache curl \\
 && curl -L https://example.com/packages.zip -o /tmp/packages.zip \\
 && unzip /tmp/packages.zip -d /app/ \\
 && rm /tmp/packages.zip \\
 && apk del curl`}
            </pre>
          </div>
        </div>

        {/* SECTION: Interview Tips */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Interview Questions (DCA Level)</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Does ADD extract remote .tar.gz archives?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>No!</strong> The auto-extraction feature is strictly limited to **local archives** present on the host filesystem (inside the build context). Remote URL files are simply downloaded raw and unchanged.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Why does COPY promote better security than ADD?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>ADD</code> introduces vulnerability risks. A remote URL could lead to downloading modified/untrusted code during build-time without cryptographic check mechanisms, whereas <code>COPY</code> forces all assets to reside locally inside the verified git workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Common Mistakes */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-bug-fill"></i>
            </div>
            <h2 className="doc-card-heading">Common Mistakes</h2>
          </div>
          <div className="doc-card-body">
            <ul className="text-secondary small mb-0">
              <li className="mb-2">
                <span className="text-danger fw-bold">Trying to auto-extract .zip files:</span> Auto-extraction only supports **tar** formats (gzip, bzip2, etc.). It does **not** auto-extract standard `.zip` files. A local `.zip` file will just be copied as a raw `.zip` file.
              </li>
              <li>
                <span className="text-danger fw-bold">Unnecessary download layers:</span> Using <code>ADD</code> to fetch standard remote packages when you could just use `RUN apk add` or `RUN apt-get install`, which automatically integrates with the system's package registry.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION: Mini Exercise */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h2 className="doc-card-heading text-info">Mini Exercise</h2>
          </div>
          <div className="doc-card-body">
            <p className="small text-secondary">
              Let's create a local mock archive to test extraction:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create some dummy files: <code>mkdir dist && echo "v1" {'>'} dist/app.js</code></li>
              <li className="mb-2">Archive it: <code>tar -czvf dist.tar.gz dist/</code></li>
              <li className="mb-2">Write a Dockerfile line: <code>ADD dist.tar.gz /app/</code></li>
              <li>Verify: Build and check that `/app/dist/app.js` is fully uncompressed inside the container without running any tar commands.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
