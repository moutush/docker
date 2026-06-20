import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile RUN Command - Docker Documentation",
  description: "Learn how to use the RUN command to execute commands during build-time."
};

export default function DockerfileRunPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info fs-5 p-2">Build-Time</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>RUN Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The execution workhorse. Runs shell commands during compilation to install packages, setup folders, and compile binaries.
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
            <p className="text-secondary">Syntax (Two Forms):</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
{`# 1. Shell Form (runs command in a subshell, defaults to /bin/sh -c)
RUN apt-get update && apt-get install -y curl

# 2. Exec Form (runs directly without a shell, does not parse variables like $HOME)
RUN ["apt-get", "install", "-y", "curl"]`}
            </pre>
            <p className="text-secondary">
              The <code>RUN</code> instruction executes commands in a new layer on top of the current image and commits the results. The resulting committed image is used for the next step in the Dockerfile.
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
              Imagine preparing a new office workspace:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You purchase an empty room chassis (<code>FROM</code>). Then you call contractors to install lights (<code>RUN install-lights</code>), build tables (<code>RUN build-tables</code>), and paint walls (<code>RUN paint-walls</code>).
                <br /><br />
                These steps happen **before** employees move in (build-time). Once the office is set up, it's locked down. Employees only run the office when they arrive (runtime).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Build-time vs Runtime */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-clock-history"></i>
            </div>
            <h2 className="doc-card-heading">Build-Time vs. Runtime</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-danger">CRITICAL CONCEPT FOR EXAMS</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>RUN</code> is **strictly a Build-Time command**. 
                  It executes during <code>docker build</code> to cook the image. 
                  It does **NOT** run when you start your container using <code>docker run</code>. 
                  Do not use <code>RUN</code> to start your database server or application web server.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Shell vs Exec Form */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-question-diamond-fill"></i>
            </div>
            <h2 className="doc-card-heading">Shell Form vs. Exec Form</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Shell Form (<code>RUN cmd</code>)</th>
                    <th>Exec Form (<code>RUN ["cmd", "arg"]</code>)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Execution</strong></td>
                    <td>Starts inside a subshell: <code>/bin/sh -c "cmd"</code></td>
                    <td>Starts directly without spawning a shell</td>
                  </tr>
                  <tr>
                    <td><strong>Variable expansion</strong></td>
                    <td>Yes (e.g. <code>$VAR</code> works)</td>
                    <td>No (e.g. <code>$VAR</code> is treated as literal text)</td>
                  </tr>
                  <tr>
                    <td><strong>PID 1 Signals</strong></td>
                    <td>Shell becomes PID 1 (prevents clean shutdown signals)</td>
                    <td>Executable becomes PID 1 (handles signals correctly)</td>
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
            <h6 className="text-light fw-bold">Bad Example (Layer Bloat)</h6>
            <p className="small text-secondary">
              This creates 3 separate filesystem layers, increasing build times and overall image size:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Good Example (Chaining &amp; Cache Cleaning)</h6>
            <p className="small text-secondary">
              Chaining commands with <code>&&</code> and deleting temporary cached setup files in the **same layer**:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \\
    curl \\
    git \\
 && rm -rf /var/lib/apt/lists/*`}
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
                <h6 className="fw-bold mb-1 text-info">Question: What is the difference between RUN, CMD, and ENTRYPOINT?</h6>
                <p className="mb-0 x-small text-secondary">
                  • <strong>RUN:</strong> Executes during the build process to add features to the read-only image layers.
                  <br />
                  • <strong>CMD:</strong> Sets default commands/arguments that execute *when starting* the container, which can be easily overridden on the command line.
                  <br />
                  • <strong>ENTRYPOINT:</strong> Sets the main binary/executable process of the container that should always run. Overriding is more difficult.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Why clean package manager cache?</h6>
                <p className="mb-0 x-small text-secondary">
                  When you run <code>apt-get update</code>, index databases are downloaded. If you don't clean them with <code>rm -rf /var/lib/apt/lists/*</code> inside the same RUN statement, those indices are permanently saved inside the layer history, ballooning image sizes by up to 50MB-100MB for no reason.
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
                <span className="text-danger fw-bold">Separating update and install:</span> Having <code>RUN apt-get update</code> on line 2 and <code>RUN apt-get install</code> on line 3 means if you add a new package on line 3, Docker uses the cached line 2 database, which can lead to "Package not found" build failures. Always chain them: <code>RUN apt-get update && apt-get install -y...</code>
              </li>
              <li className="mb-2">
                <span className="text-danger fw-bold">Missing the -y flag:</span> Package managers wait for a `Y/n` prompt during builds. Because builds are non-interactive, the build will hang indefinitely and fail if you forget <code>-y</code> (or <code>--no-install-recommends</code>).
              </li>
              <li>
                <span className="text-danger fw-bold">Running apt-get upgrade or dist-upgrade:</span> This is a major anti-pattern in Docker! Many system packages cannot be upgraded within an unprivileged container container context (like GRUB or kernel system modules) and will fail the build. Additionally, upgrading everything bloats the image size with packages your app doesn't use, and breaks build reproducibility (rebuilding the same Dockerfile tomorrow might pull different packages and break your code). Instead, if you have security vulnerability warnings, simply update your base image tag (e.g. from <code>ubuntu:22.04</code> to a newer tested parent release).
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
              Optimize this inefficient Dockerfile fragment into a single, clean RUN layer:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`RUN apt-get update
RUN apt-get install -y wget
RUN apt-get install -y unzip`}
            </pre>
            <p className="small text-secondary mb-0">
              <strong>Solution:</strong>
              <br />
              <code>RUN apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*</code>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
