import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compose .env Files - Docker Documentation",
  description: "Learn how to use .env files with Docker Compose to manage environment variables securely across different environments."
};

export default function ComposeEnvFilesPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-file-earmark-lock2-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}><code>.env</code> Files</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 4.4 — How Docker Compose automatically loads configuration from your local environment file.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* THE CONCEPT */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">The Top-Level <code>.env</code> File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              If you create a file named <code>.env</code> in the same directory as your <code>compose.yaml</code>, Docker Compose automatically reads it when you run <code>docker compose up</code>.
              These variables are used to <strong>substitute values inside the compose.yaml file itself</strong>.
            </p>
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-shield-lock-fill"></i>
              <div>
                <strong className="text-danger">Security Rule #1:</strong>
                <span className="x-small text-secondary"> Never commit <code>.env</code> to Git if it contains passwords or secrets! Always add <code>.env</code> to your <code>.gitignore</code> file.</span>
              </div>
            </div>
          </div>
        </div>

        {/* VARIABLE SUBSTITUTION */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-arrow-left-right"></i></div>
            <h2 className="doc-card-heading">Variable Substitution in YAML</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              You reference variables from the <code>.env</code> file using <code>${'$'}{'{VAR_NAME}'}</code> inside your Compose file:
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <span className="badge bg-secondary mb-2">1. The .env file</span>
                  <pre className="x-small text-info mb-0">
{`# .env
DB_PASS=supersecret123
WEB_PORT=8080
IMAGE_TAG=v1.2.0`}
                  </pre>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-primary h-100">
                  <span className="badge bg-primary mb-2">2. The compose.yaml</span>
                  <pre className="x-small text-light mb-0">
{`services:
  web:
    image: myapp:${'$'}{IMAGE_TAG}
    ports:
      - "${'$'}{WEB_PORT}:80"

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: ${'$'}{DB_PASS}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEFAULT VALUES */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-patch-check-fill"></i></div>
            <h2 className="doc-card-heading">Fallback &amp; Default Values</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              You can define what happens if a variable is missing from the <code>.env</code> file. This prevents Compose from failing or starting incorrectly.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  web:
    # 1. Fallback: Use 'latest' if IMAGE_TAG is missing or empty
    image: myapp:${'$'}{IMAGE_TAG:-latest}
    
    # 2. Required: Fail with an error message if DB_PASS is missing
    environment:
      DB_PASSWORD: ${'$'}{DB_PASS:?Database password must be set!}
      
    ports:
      # 3. Default only if unset (but allow empty string)
      - "${'$'}{WEB_PORT-80}:80"`}
            </pre>
          </div>
        </div>

        {/* ENV_FILE VS .ENV */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-files"></i></div>
            <h2 className="doc-card-heading">Top-level <code>.env</code> vs Service <code>env_file</code></h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">These sound similar but do completely different things. You must know the difference.</p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table small mb-0">
                <thead><tr><th>Feature</th><th>Top-level <code>.env</code></th><th>Service-level <code>env_file:</code></th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Purpose</strong></td>
                    <td>Replaces <code>${'$'}{'{VAR}'}</code> strings inside the <code>compose.yaml</code> text</td>
                    <td>Injects variables directly into the running container</td>
                  </tr>
                  <tr>
                    <td><strong>How to load</strong></td>
                    <td>Automatic (just name it <code>.env</code>)</td>
                    <td>Manual (must declare <code>env_file: [filename]</code> in a service)</td>
                  </tr>
                  <tr>
                    <td><strong>Can use it for:</strong></td>
                    <td>Image tags, port numbers, volume paths</td>
                    <td>Only for container environment variables</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mt-3 mb-0">
{`services:
  api:
    image: myapp:${'$'}{VERSION}   # ← Needs top-level .env (for YAML substitution)
    env_file:
      - .env.production      # ← Injects contents into the container`}
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
                <h6 className="fw-bold mb-1 text-info">Q: How do you verify what variables Compose is actually reading from .env?</h6>
                <p className="mb-0 x-small text-secondary">Run <code>docker compose config</code>. This command parses the YAML, substitutes all the variables from the <code>.env</code> file, and prints the final, merged file to the screen. It is the best way to debug missing variables.</p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What is the syntax to require a variable in Compose and fail if it's missing?</h6>
                <p className="mb-0 x-small text-secondary">Use the <code>?</code> modifier: <code>${'$'}{'{VAR_NAME:?Error message here}'}</code>. If the variable is not defined, <code>docker compose up</code> will halt and display your error message.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
