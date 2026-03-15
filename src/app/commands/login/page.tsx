import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker login / logout - Docker Documentation",
  description: "Authenticate with a container registry (Docker Hub or private) to push and pull private images."
};

export default function DockerLoginLogoutPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker login / logout</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Authenticate with a container registry (Docker Hub or private) to push and pull private images.
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
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker login [SERVER]</code><br><code>docker logout [SERVER]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker login</code> stores your registry credentials so Docker can authenticate when pulling private images or pushing to your repositories. Credentials are stored in <code>~/.docker/config.json</code>. <code>docker logout</code> removes the stored credentials for that registry.</p>` }} />

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
              <div dangerouslySetInnerHTML={{ __html: `<p>Docker Hub is like a private library. Logging in gives you access to your private shelf (private images). Without logging in, you can only access the public section. <code>docker logout</code> is checking out of the library — your credentials are cleared from memory.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Log in to Docker Hub (prompts for username + password)
docker login

# Log in to a private registry
docker login registry.mycompany.com

# Log out from Docker Hub
docker logout`}</code>
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
              <div dangerouslySetInnerHTML={{ __html: `<p>In CI/CD, pass credentials via environment variables without an interactive prompt — the secure way to authenticate in pipelines.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Non-interactive login using piped password (CI-safe)
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Login to AWS ECR (uses helper tool)
aws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com`}</code>
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
            <td><code>SERVER</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Registry URL. Omit for Docker Hub (docker.io).</td>
        </tr>
        <tr>
            <td><code>-u / --username STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Registry username.</td>
        </tr>
        <tr>
            <td><code>-p / --password STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Registry password. Avoid this in scripts — use --password-stdin instead.</td>
        </tr>
        <tr>
            <td><code>--password-stdin</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>Read the password from stdin. Safe for CI/CD pipelines.</td>
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
