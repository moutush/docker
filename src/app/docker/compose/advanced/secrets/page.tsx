import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose Secrets & Configs - Docker Documentation",
  description: "Learn how to securely manage passwords, API keys, and configuration files in Docker Compose using Secrets and Configs."
};

export default function ComposeSecretsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-shield-lock-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Secrets &amp; Configs</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 5.2 — Stop passing passwords as environment variables. Do it the secure way.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE PROBLEM */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger"><i className="bi bi-exclamation-octagon-fill"></i></div>
            <h2 className="doc-card-heading">The Problem with Environment Variables</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              We've been using <code>environment:</code> to pass passwords to containers. This is standard for local development, but in production, it's a security risk:
            </p>
            <ul className="text-secondary small mb-3">
              <li>Anyone who can run <code>docker inspect &lt;container&gt;</code> can see the plain-text password.</li>
              <li>If the application crashes, environment variables are often dumped to logs.</li>
              <li>Child processes inherit all environment variables by default.</li>
            </ul>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25">
              <p className="text-secondary small mb-0">
                🔐 <strong>The Solution: Docker Secrets.</strong> Secrets mount sensitive data as an <strong>in-memory file</strong> (in a temporary filesystem). They never touch the disk, and they don't show up in <code>docker inspect</code>.
              </p>
            </div>
          </div>
        </div>

        {/* SECRETS SYNTAX */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-key-fill"></i></div>
            <h2 className="doc-card-heading">How to Use Secrets</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Most official images (like Postgres, MySQL, WordPress) support secrets automatically if you append <code>_FILE</code> to the variable name.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`# compose.yaml
services:
  db:
    image: postgres:16
    # Note the _FILE suffix! Tells postgres to read from the secret file path
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password

# Top-level secrets declaration
secrets:
  db_password:
    file: ./secrets/db_password.txt   # The actual text file on your host`}
            </pre>
            <pre className="doc-code-block bg-dark text-success border-success p-2 x-small mb-0">
{`# To test this, you must create the secret file first:
mkdir secrets
echo "super_secret_production_password" > secrets/db_password.txt
docker compose up -d`}
            </pre>
          </div>
        </div>

        {/* WHERE SECRETS LIVE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-folder2-open"></i></div>
            <h2 className="doc-card-heading">Where Do Secrets Go?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              When you pass a secret to a container, Docker automatically mounts it as a file at:
              <br /><code className="text-success fs-6">/run/secrets/&lt;secret_name&gt;</code>
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# Let's look inside the running database container:
docker compose exec db sh

# Read the secret file:
cat /run/secrets/db_password
# Output: super_secret_production_password

# Check the environment variables (no passwords here!):
env | grep POSTGRES
# Output: POSTGRES_PASSWORD_FILE=/run/secrets/db_password`}
            </pre>
          </div>
        </div>

        {/* CONFIGS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-file-earmark-text-fill"></i></div>
            <h2 className="doc-card-heading">Docker Configs (Non-Sensitive Data)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              <code>configs</code> work exactly the same way as secrets, but they are used for non-sensitive configuration files (like an <code>nginx.conf</code> or a Prometheus YAML file).
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  web:
    image: nginx:alpine
    configs:
      - source: my_nginx_config
        target: /etc/nginx/nginx.conf   # Mounts the file directly here!

configs:
  my_nginx_config:
    file: ./config/nginx.conf`}
            </pre>
          </div>
        </div>

        {/* DCA INTERVIEW */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview &amp; DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: Why are Docker Secrets more secure than Environment Variables?</h6>
                <p className="mb-0 x-small text-secondary">Secrets are mounted into the container as an in-memory tmpfs filesystem at <code>/run/secrets/</code>. They are never written to the container's disk, and they do not appear when running <code>docker inspect</code> on the container, preventing accidental exposure.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: How do you configure a Postgres container to use a secret for its password?</h6>
                <p className="mb-0 x-small text-secondary">You must define the secret at the top level and in the service level, then use the special <code>POSTGRES_PASSWORD_FILE</code> environment variable (with the <code>_FILE</code> suffix), pointing it to <code>/run/secrets/your_secret_name</code>.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
