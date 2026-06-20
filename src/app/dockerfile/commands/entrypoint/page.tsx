import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile ENTRYPOINT Command - Docker Documentation",
  description: "Learn how to use the ENTRYPOINT command to make your containers behave like executables."
};

export default function DockerfileEntrypointPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-warning text-dark fs-5 p-2">Runtime</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>ENTRYPOINT Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Turns your container into a dedicated executable utility. Defines the core process that cannot be easily skipped.
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
{`# 1. Exec Form (Highly Recommended: makes container act like an executable binary)
ENTRYPOINT ["executable", "param1"]

# 2. Shell Form (runs in /bin/sh -c; ignores CMD parameters and CLI overrides)
ENTRYPOINT command param1`}
            </pre>
            <p className="text-secondary mb-0">
              Unlike <code>CMD</code>, running arguments via the CLI (e.g. <code>docker run image --help</code>) will **not** override an <code>ENTRYPOINT</code>; instead, those arguments are **appended** directly to the entrypoint command.
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
              Think of buying a specialized kitchen tool like a **Juicer**:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You cannot use the remote control to suddenly turn the juicer into a microwave (unlike changing Netflix to YouTube). The juicer's core identity (<code>ENTRYPOINT ["juicer"]</code>) is unchangeable. 
                <br /><br />
                However, you can feed it different inputs (arguments). If you pass it oranges, it juices oranges. If you pass it apples, it juices apples (inputs append to the executable).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Overriding */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-shield-exclamation"></i>
            </div>
            <h2 className="doc-card-heading">Overriding is Difficult</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If you try to run <code>docker run my-juicer-app bash</code>, it will **not** open a bash shell. Instead, it will try to pass the string <code>"bash"</code> into the juicer binary!
            </p>
            <p className="text-secondary mb-0">
              To override an entrypoint, you must explicitly use the <code>--entrypoint</code> CLI flag:
              <br />
              <code className="text-white bg-dark p-1 rounded">docker run --entrypoint bash my-juicer-app</code>
            </p>
          </div>
        </div>

        {/* SECTION: CMD + ENTRYPOINT Interaction */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-arrows-collapse"></i>
            </div>
            <h2 className="doc-card-heading">The Perfect Combo: ENTRYPOINT + CMD</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              In professional Dockerfiles, developers combine <code>ENTRYPOINT</code> (in Exec form) and <code>CMD</code> to define a command and default parameters.
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18
# Core executable
ENTRYPOINT ["ping"]

# Default parameter (can be easily overridden)
CMD ["127.0.0.1"]`}
            </pre>
            <ul className="text-secondary small mt-3 mb-0">
              <li className="mb-2">Running <code>docker run my-ping</code> will execute: <br /><code>ping 127.0.0.1</code></li>
              <li>Running <code>docker run my-ping google.com</code> will override the CMD and execute: <br /><code>ping google.com</code></li>
            </ul>
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
            <h6 className="text-light fw-bold">Production Example: CLI Tool container (aws-cli)</h6>
            <p className="small text-secondary">
              Packaging the AWS CLI tool so developers can run AWS commands without local setup:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18
RUN apk add --no-cache aws-cli
ENTRYPOINT ["aws"]`}
            </pre>
            <p className="small text-secondary">
              How developers use this:
              <br />
              • <code>docker run --rm aws-cli s3 ls</code> (runs: <code>aws s3 ls</code>)
              <br />
              • <code>docker run --rm aws-cli configure</code> (runs: <code>aws configure</code>)
            </p>
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
                <h6 className="fw-bold mb-1 text-info">Question: What happens if ENTRYPOINT is declared in Shell Form?</h6>
                <p className="mb-0 x-small text-secondary">
                  If declared in shell form (e.g. <code>ENTRYPOINT ping 127.0.0.1</code>), Docker completely ignores any <code>CMD</code> or CLI arguments. The shell script runs as a child of `/bin/sh` and does not forward inputs.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do you clear a default ENTRYPOINT?</h6>
                <p className="mb-0 x-small text-secondary">
                  If a base image (like a third-party framework) defines a default ENTRYPOINT that you don't want, you can clear it in your own Dockerfile by writing:
                  <br />
                  <code>ENTRYPOINT []</code>
                  <br />
                  Then you can define a brand new <code>CMD</code>.
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
                <span className="text-danger fw-bold">Confusing CMD and ENTRYPOINT:</span> Using <code>ENTRYPOINT</code> for basic web server launch scripts when you want developers to easily override them with `bash` shell options. Use <code>CMD</code> for overrides, and <code>ENTRYPOINT</code> for immutable run binaries.
              </li>
              <li>
                <span className="text-danger fw-bold">Not using JSON Exec syntax:</span> Using shell syntax for entrypoint, which spawns processes as children of a shell process, blocking system signals (preventing graceful container scaling down).
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
              Create a custom "Developer Swiss-Knife" container:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Base: <code>FROM alpine</code></li>
              <li className="mb-2">Install curl: <code>RUN apk add --no-cache curl</code></li>
              <li className="mb-2">Entrypoint: <code>ENTRYPOINT ["curl"]</code></li>
              <li>Build it: <code>docker build -t curl-runner .</code></li>
              <li>Run it to query a URL: <code>docker run --rm curl-runner https://ifconfig.me</code>. Notice that you only had to pass the URL because `curl` was fixed as the entrypoint!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
