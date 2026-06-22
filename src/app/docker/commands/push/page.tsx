import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker push - Docker Documentation",
  description: "Upload a local image to a container registry to share it with others."
};

export default function DockerPushPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker push</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Upload a local image to a container registry to share it with others.
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
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker push [OPTIONS] NAME[:TAG]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker push</code> is the opposite of <code>docker pull</code>. It uploads a locally built image to a registry so others (or your CI/CD pipeline) can pull and run it.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>You baked a cake (built an image). <code>docker push</code> is mailing that cake to a shared pantry (the registry). Anyone who has the address of that pantry can later grab a copy of your cake using <code>docker pull</code>.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# First, log in to Docker Hub (one-time setup)
docker login

# Tag your image with your Docker Hub username
docker tag my-app:latest yourusername/my-app:latest

# Push it
docker push yourusername/my-app:latest`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>In a CI/CD pipeline, after building and testing, push the image with both a version tag and <code>latest</code> so downstream services always pull the most recent stable build.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Authenticate with a private registry using environment variables
echo "$REGISTRY_PASSWORD" | docker login registry.mycompany.com -u "$REGISTRY_USER" --password-stdin

# Push with two tags simultaneously
docker push registry.mycompany.com/backend-api:v3.4.1
docker push registry.mycompany.com/backend-api:latest`}</code>
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
            <td><code>NAME[:TAG]</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The full image name including registry, repository, and tag, e.g. registry.io/org/app:1.0.</td>
        </tr>
        <tr>
            <td><code>--all-tags / -a</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Push all locally tagged versions of this image to the registry at once.</td>
        </tr>
        <tr>
            <td><code>--quiet / -q</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Suppress verbose push progress output.</td>
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
