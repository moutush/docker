import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile USER Command - Docker Documentation",
  description: "Learn how to use the USER command to run containers as unprivileged users for security."
};

export default function DockerfileUserPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-danger fs-5 p-2">Security / Runtime</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>USER Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Enforces the Principle of Least Privilege. Restricts execution privileges by switching from root to a non-privileged user.
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
{`# 1. Switch to user by name
USER node

# 2. Switch to user and group by name
USER node:node

# 3. Switch to user by UID:GID (Best Practice for Kubernetes/Security)
USER 10001:10001`}
            </pre>
            <p className="text-secondary mb-0">
              By default, Docker containers run instructions and start applications as the <strong>root</strong> user (UID 0). 
              The <code>USER</code> instruction changes the active user context for any subsequent `RUN`, `CMD`, or `ENTRYPOINT` statements, as well as at container runtime.
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
              Imagine running a premium banking institution:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You hire a new janitor to sweep the lobby floor. 
                Instead of giving them the master keys to the bank vault and superuser combinations (<code>root</code> ownership), you give them a restricted staff key card (<code>USER janitor</code>) that only unlocks the broom closet. 
                <br /><br />
                If the janitor turns out to be an imposter, their access is sandboxed and they cannot rob the vault or lock out the bank managers.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Why Non-Root Matters */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Why running as non-root is CRITICAL</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If your container runs as `root` (default), and your web application has a vulnerability (e.g. Remote Code Execution), an attacker can take control of the container.
            </p>
            <ul className="text-secondary small">
              <li className="mb-2">They gain absolute control to install malware or read database configurations inside the container.</li>
              <li className="mb-2">If there is any container-escape bug in the host Linux kernel (like *Dirty COW* or *runC escapes*), having root in the container makes escaping to control the host server trivially easy.</li>
              <li>Running as unprivileged UID (e.g. `10001`) prevents escapes and keeps host kernels perfectly secure.</li>
            </ul>
          </div>
        </div>

        {/* SECTION: Creating a Non-Root User */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h2 className="doc-card-heading">How to Create and Switch Users</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-2">
              Before you can use a user name in `USER`, you must first create it inside the operating system. 
              The commands to create a user differ between base OS distributions:
            </p>
            <h6 className="text-light fw-bold x-small uppercase">Debian / Ubuntu base:</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
{`RUN groupadd -r appgroup && useradd -r -g appgroup -u 1001 appuser
USER appuser`}
            </pre>
            <h6 className="text-light fw-bold x-small uppercase">Alpine Linux base:</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-2 x-small">
{`RUN addgroup -S appgroup && adduser -S appuser -G appgroup -u 1001
USER appuser`}
            </pre>
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
            <h6 className="text-light fw-bold">Production Example: Python API</h6>
            <p className="small text-secondary">
              Create a dedicated system user, copy files, assign permissions, and then switch contexts:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM python:3.10-slim
WORKDIR /app

# 1. Create a non-root system user
RUN groupadd -g 999 appuser && \\
    useradd -r -u 999 -g appuser appuser

# 2. Copy code and assign ownership to appuser
COPY --chown=appuser:appuser . .

RUN pip install --no-cache-dir -r requirements.txt

# 3. Switch to non-root user
USER appuser

EXPOSE 8080
CMD ["python", "app.py"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: Can you switch back to root later in the Dockerfile?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> You can change the user context as many times as you like. If you need to perform root actions (like installing system packages) after switching users, you can write:
                  <br />
                  <code>USER root</code>
                  <br />
                  <code>RUN apt-get install -y something</code>
                  <br />
                  <code>USER appuser</code> (switch back for safety)
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Can you override the user at runtime?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> Even if a Dockerfile declares a specific user, operations teams can override it using the `--user` flag:
                  <br />
                  <code>docker run --user 10002 my-secure-image</code>
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
                <span className="text-danger fw-bold">Declaring USER before installing packages:</span> Switching to `USER appuser` and then running <code>RUN apt-get install</code>. This will fail with a "Permission denied" error because `appuser` cannot install packages. Always install OS dependencies as root first!
              </li>
              <li>
                <span className="text-danger fw-bold">Forgetting --chown on COPY:</span> If you run <code>USER appuser</code> but copied files using standard `COPY . .`, those files are owned by `root`. If your app tries to write a log file, it will crash with "Write permission denied".
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
              Verify your container's current user context:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create a simple Dockerfile:
                <pre className="x-small text-secondary mt-1 mb-1">
{`FROM alpine
RUN adduser -D testuser
USER testuser
CMD ["whoami"]`}
                </pre>
              </li>
              <li className="mb-2">Build it: <code>docker build -t usercheck .</code></li>
              <li>Run it: <code>docker run usercheck</code>. Check if it outputs `testuser` instead of `root`!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
