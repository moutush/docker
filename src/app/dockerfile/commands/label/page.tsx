import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile LABEL Command - Docker Documentation",
  description: "Learn how to use the LABEL command to add metadata to your Docker images."
};

export default function DockerfileLabelPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-secondary fs-5 p-2">Metadata</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>LABEL Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Adds crucial descriptive metadata (version, author, licensing, description) to the image configuration records.
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
{`# Declaring key-value metadata pairs
LABEL maintainer="rajat@learning.com"
LABEL version="1.4.2"
LABEL description="Highly optimized Flask base api service."`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>LABEL</code> instruction adds key-value metadata pairs to an image. 
              It is extremely useful for licensing tracking, automation scripting, vulnerability scanning, and internal inventory management.
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
              Imagine shipping a heavy wooden storage crate overseas:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You pack clothes, electronics, and kitchen items inside the crate. 
                Before the cargo ship loads it, you slap adhesive barcode stickers and laminated shipping tags on the outside of the wood (<code>LABEL</code>).
                <br /><br />
                The barcode stickers don't change how the crate physically holds your clothes. They don't make the crate lighter or waterproof. They merely tell port authorities and logistics tracking software who owns it, what's inside, and where it's going.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Deprecation of MAINTAINER */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">DCA ALERT: MAINTAINER IS DEPRECATED!</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              In older Dockerfiles, you might see the <code>MAINTAINER</code> instruction:
              <br />
              <code className="text-danger bg-dark p-1 rounded">MAINTAINER rajat@domain.com</code>
            </p>
            <p className="text-secondary mt-3 mb-0">
              This instruction is **officially deprecated** and is no longer recommended. 
              Instead, you should always declare the author/maintainer metadata using the standard key value <code>LABEL</code> instruction:
              <br />
              <code className="text-success bg-dark p-1 rounded">LABEL maintainer="rajat@domain.com"</code>
            </p>
          </div>
        </div>

        {/* SECTION: Inspecting Labels */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-search"></i>
            </div>
            <h2 className="doc-card-heading">Inspecting Label Metadata</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Because labels are baked into the image metadata, you can easily query them using the standard <code>docker inspect</code> engine tool.
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`# Inspect and output all labels inside a JSON record
docker inspect --format='{"{{json .Config.Labels}}"}' my-nginx-image`}
            </pre>
            <p className="text-secondary mb-0">
              CI/CD scanners and compliance checking tools use this JSON data to automatically check if images have appropriate owner contacts and security expiration stamps before deploying them to Swarm or Kubernetes.
            </p>
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
            <h6 className="text-light fw-bold">Production Example: Grouping Labels</h6>
            <p className="small text-secondary">
              Prior to Docker 1.10, declaring multiple LABEL lines created extra metadata layers. Today they are optimized, but it's still best practice to group them neatly:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18

# Single grouped LABEL instruction
LABEL org.opencontainers.image.authors="Rajat Subhra" \\
      org.opencontainers.image.version="1.2.0" \\
      org.opencontainers.image.description="Secure gateway proxy server" \\
      org.opencontainers.image.licenses="MIT"

CMD ["echo", "Server running"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: Do base image labels carry over to my child image?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> If your base image (e.g. Nginx) has labels, your built child image **inherits** all of those labels. If you declare a label with the same key, your new label value will overwrite the inherited base value.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Do labels increase container disk filesystem size?</h6>
                <p className="mb-0 x-small text-secondary">
                  **No.** Labels only represent static text metadata added to the JSON config profile of the image. They do not allocate space on the virtual filesystem and add zero overhead to container execution.
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
                <span className="text-danger fw-bold">Using deprecated MAINTAINER tags:</span> Still using the deprecated <code>MAINTAINER</code> tag, which will trigger warnings in modern Docker engines during build-time.
              </li>
              <li>
                <span className="text-danger fw-bold">Forgetting quotes around string spaces:</span> Declaring <code>LABEL description=My custom web server</code>. This will break compilation because spaces must be wrapped in quotes: <code>LABEL description="My custom web server"</code>.
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
              Build an image and read its metadata:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create a Dockerfile:
                <pre className="x-small text-secondary mt-1 mb-1">
{`FROM alpine
LABEL academy.owner="rajat"
CMD ["echo", "Hello"]`}
                </pre>
              </li>
              <li className="mb-2">Build: <code>docker build -t labelapp .</code></li>
              <li>Inspect and filter: <code>docker inspect --format='{"{{.Config.Labels}}"}' labelapp</code>. Check if you can find your custom label inside the output!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
