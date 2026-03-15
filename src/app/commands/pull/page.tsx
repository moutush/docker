import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker pull - Docker Documentation",
  description: "Download an image from a container registry to your local machine."
};

export default function DockerPullPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker pull</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Download an image from a container registry to your local machine.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker pull [OPTIONS] NAME[:TAG|@DIGEST]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker pull</code> downloads an image from a registry (Docker Hub by default) to your local machine. If you do not specify a tag, Docker pulls the <code>latest</code> tag.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of Docker Hub like an App Store for server software. <code>docker pull</code> is you tapping the Download button. Once downloaded, the app (image) lives on your phone (machine) and you can launch it anytime without re-downloading it.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Download the official Ubuntu 22.04 image
docker pull ubuntu:22.04`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Pull a specific image by digest (a cryptographic hash) to guarantee you get an exact, immutable version — no surprises from a floating <code>latest</code> tag.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Pull a private image from a custom registry
docker pull registry.mycompany.com/backend-api:v3.4.1

# Pull by digest for total reproducibility
docker pull nginx@sha256:a5e4a503d9f93bce98e5f316eca7c84a89e01e0d75e5b5d1c9e2de1b63cdb1f4`}</code>
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
            <td><code>NAME</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The image name, e.g. nginx or ubuntu. Defaults to Docker Hub if no registry is specified.</td>
        </tr>
        <tr>
            <td><code>:TAG</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Optional version tag, e.g. :22.04 or :alpine. Defaults to :latest if omitted.</td>
        </tr>
        <tr>
            <td><code>@DIGEST</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Pull by exact SHA-256 digest instead of a tag, guaranteeing reproducibility.</td>
        </tr>
        <tr>
            <td><code>--all-tags / -a</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Download all tagged versions of the image from the registry.</td>
        </tr>
        <tr>
            <td><code>--platform</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Pull an image for a specific OS/architecture, e.g. linux/arm64.</td>
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
