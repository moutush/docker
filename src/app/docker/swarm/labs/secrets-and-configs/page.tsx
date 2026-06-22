import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lab: Swarm Secrets & Configs - Docker Documentation",
    description: "Securely manage passwords, certificates, and configuration files in Docker Swarm.",
};

export default function SwarmSecretsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab 5: Secrets &amp; Configs
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The right way to handle passwords, API keys, and config files in production.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE PROBLEM: ENV VARS ARE INSECURE */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-exclamation-triangle-fill"></i></div>
                            <h2 className="doc-card-heading text-danger">1. The Problem: Why Not Environment Variables?</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Passing secrets via <code>-e DB_PASSWORD=mysecret</code> is the most common mistake in Docker deployments.</p>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h6 className="fw-bold text-danger mb-2"><i className="bi bi-eye me-2"></i>Visible in Inspect</h6>
                                        <p className="small text-secondary mb-0">Anyone with Docker access can run <code>docker inspect</code> and see your password in plain text.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h6 className="fw-bold text-danger mb-2"><i className="bi bi-journal me-2"></i>In Log Files</h6>
                                        <p className="small text-secondary mb-0">Many orchestration platforms log all environment variables, making secrets leak into log systems.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h6 className="fw-bold text-danger mb-2"><i className="bi bi-git me-2"></i>Committed to Git</h6>
                                        <p className="small text-secondary mb-0">Env vars are often in Compose files that accidentally get committed to source control.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-success mt-4">
                                <i className="bi bi-shield-lock-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-success">The Solution: Docker Secrets</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Secrets are encrypted at rest in the Raft log and only decrypted in memory (as a <code>tmpfs</code> mount) on the specific node running the task that needs it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. CREATING SECRETS */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success"><i className="bi bi-terminal-fill"></i></div>
                            <h2 className="doc-card-heading text-success">2. Creating Secrets</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4">
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">Method 1: From a file (most common)</h6>
                                    <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
{`# Create a file with your secret
$ echo "mysupersecretpassword" > db_password.txt

# Create the secret from that file
$ docker secret create db_password db_password.txt

# IMPORTANT: Delete the local file now!
$ rm db_password.txt`}
                                    </pre>
                                </div>
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">Method 2: From stdin (nothing touches disk)</h6>
                                    <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">
{`$ echo "mysupersecretpassword" | docker secret create db_password -
# The '-' at the end means "read from stdin"`}
                                    </pre>
                                </div>
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">Inspect secrets (value is NEVER shown)</h6>
                                    <pre className="doc-code-block mb-0 border-secondary text-light bg-dark x-small">
{`$ docker secret ls
$ docker secret inspect db_password
# Output shows metadata only — the value is always hidden`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. USING SECRETS IN SERVICES */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-plug-fill"></i></div>
                            <h2 className="doc-card-heading text-info">3. Using Secrets in a Service</h2>
                        </div>
                        <div className="doc-card-body">
                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
{`$ docker service create \\
  --name my-db \\
  --secret db_password \\
  -e POSTGRES_PASSWORD_FILE=/run/secrets/db_password \\
  postgres:latest`}
                            </pre>
                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Where is the secret?</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Secrets are mounted as <strong>files</strong> inside the container at <code>/run/secrets/&lt;secret-name&gt;</code>. They are stored in an in-memory <code>tmpfs</code> filesystem — they never touch the disk.
                                    </p>
                                </div>
                            </div>
                            <h5 className="fw-bold text-light mb-3">Using secrets in a Compose file</h5>
                            <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
{`version: "3.8"

services:
  db:
    image: postgres:latest
    secrets:
      - db_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    external: true   # <- Secret already exists in Swarm`}
                            </pre>
                        </div>
                    </div>

                    {/* 4. DCA GOTCHA: CANNOT UPDATE A SECRET */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-lock-fill"></i></div>
                            <h2 className="doc-card-heading text-danger">4. DCA Gotcha: Secrets are Immutable!</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Once a secret is created, its <strong>value cannot be changed</strong>. There is no <code>docker secret update</code> command.
                            </p>
                            <div className="p-3 rounded border border-danger" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h6 className="fw-bold text-danger mb-3"><i className="bi bi-arrow-repeat me-2"></i>The correct rotation process:</h6>
                                <ol className="small text-secondary mb-0">
                                    <li className="mb-2">Create a new secret with a version suffix: <code>docker secret create db_password_v2 new_file.txt</code></li>
                                    <li className="mb-2">Update the service to use the new secret: <code>docker service update --secret-add db_password_v2 --secret-rm db_password my-db</code></li>
                                    <li className="mb-2">Verify the service is healthy.</li>
                                    <li>Remove the old secret: <code>docker secret rm db_password</code></li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* 5. CONFIGS vs SECRETS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning"><i className="bi bi-file-earmark-diff-fill"></i></div>
                            <h2 className="doc-card-heading text-warning">5. DCA Gotcha: Secrets vs Configs</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Docker has both <code>secret</code> and <code>config</code> objects. They look similar but serve different purposes:</p>
                            <table className="table table-dark table-bordered small mt-3">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th><code>docker secret</code></th>
                                        <th><code>docker config</code></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Purpose</strong></td>
                                        <td>Sensitive data (passwords, certs)</td>
                                        <td>Non-sensitive config (nginx.conf, app.yaml)</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Storage</strong></td>
                                        <td>Encrypted in Raft log</td>
                                        <td>Stored in plain text in Raft log</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Container Mount</strong></td>
                                        <td>In-memory <code>tmpfs</code> at <code>/run/secrets/</code></td>
                                        <td>Regular file at any path you specify</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Visible via inspect?</strong></td>
                                        <td className="text-success">No — value always hidden</td>
                                        <td className="text-danger">Yes — plain text visible</td>
                                    </tr>
                                </tbody>
                            </table>
                            <pre className="doc-code-block mb-0 border-warning text-warning bg-dark x-small mt-3">
{`# Create a config (e.g., for nginx.conf)
$ docker config create nginx_config ./nginx.conf

# Use it in a service (can specify custom mount path)
$ docker service create \\
  --config source=nginx_config,target=/etc/nginx/nginx.conf \\
  nginx`}
                            </pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
