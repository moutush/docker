import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile ARG Command - Docker Documentation",
  description: "Learn how to use the ARG command to pass build-time variables into your Dockerfile."
};

export default function DockerfileArgPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info fs-5 p-2">Build-Time Only</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>ARG Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Enables developers to pass dynamic compilation arguments during the image building process.
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
{`# 1. Declaring an argument with no default (must be passed via CLI)
ARG VERSION

# 2. Declaring an argument with a default fallback
ARG APP_PORT=8080`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>ARG</code> instruction defines a variable that users can pass at build-time to the builder using the <code>docker build</code> command with the <code>--build-arg &lt;varname&gt;=&lt;value&gt;</code> flag.
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
              Imagine hiring a contractor to build a dining room table:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You hand them the blueprint. The blueprint has a variable parameter: wood type (<code>ARG WOOD_TYPE=oak</code>). 
                <br /><br />
                Before they start sawing, you tell them: *"I want cherry wood instead"* (<code>--build-arg WOOD_TYPE=cherry</code>). 
                The carpenter builds the table out of cherry wood (build-time). Once the table is finished and delivered to your house, the wood type is locked. The family sitting at the table cannot dynamically change the wood to pine while eating dinner (no runtime presence).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Scoping Rules */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-shield-exclamation"></i>
            </div>
            <h2 className="doc-card-heading">The Scoping Rules (DCA Trap!)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              An <code>ARG</code> instruction goes out of scope at the end of the build stage in which it is defined. 
              Crucially, an <code>ARG</code> declared **before the `FROM` instruction** is outside of the main build stage!
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`# Declared before FROM:
ARG VERSION=3.18
FROM alpine:$VERSION

# This will fail! $VERSION is not accessible here:
RUN echo "Building version $VERSION"

# Solution: Re-declare it inside the build stage:
ARG VERSION
RUN echo "Building version $VERSION" (Works!)`}
            </pre>
          </div>
        </div>

        {/* SECTION: ARG vs ENV */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-shuffle"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Key Difference: ARG vs. ENV</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Unlike <code>ENV</code>, variables created with <code>ARG</code> **do not persist inside the final built image**. 
            </p>
            <p className="text-secondary mb-0">
              This means you cannot check them using <code>docker inspect</code>, and they are completely unavailable inside the container shell during runtime. 
              They are purely variables for the builder engine during compilation.
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
            <h6 className="text-light fw-bold">Beginner Example: Dynamic OS Versioning</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`ARG DEBIAN_VER=bullseye-slim
FROM debian:$DEBIAN_VER`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Production Example: Combining ARG and ENV</h6>
            <p className="small text-secondary">
              Sometimes you want a build-time argument to become a persistent environment setting. You do this by passing the ARG into an ENV:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM python:3.9-slim
WORKDIR /app

# Declare build argument
ARG APP_VERSION=1.0.0

# Pass build arg value to persistent env
ENV PERSISTENT_VERSION=$APP_VERSION

# We can query this version at runtime!
CMD ["python", "-c", "import os; print(os.environ['PERSISTENT_VERSION'])"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: Can you pass secret passwords using ARG?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>No, never!</strong> While it's true that <code>ARG</code> variables are not present in the active container, they **are recorded inside the image build history**. Anyone running <code>docker history &lt;image-name&gt;</code> will be able to see the plain text password arguments passed.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do built-in ARGs work?</h6>
                <p className="mb-0 x-small text-secondary">
                  Docker has pre-defined default build arguments that you can use without declaring them, such as: <code>HTTP_PROXY</code>, <code>HTTPS_PROXY</code>, <code>FTP_PROXY</code>, <code>NO_PROXY</code>. These are automatically excluded from the image history logs for security.
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
                <span className="text-danger fw-bold">Relying on ARG in RUN scripts at runtime:</span> Writing a python script that expects `os.environ['ARG_VAR']` to exist at runtime. If you need it at runtime, you must write `ENV VAR_NAME=$ARG_VAR_NAME`.
              </li>
              <li>
                <span className="text-danger fw-bold">Incorrect syntax matching:</span> Forgetting that <code>ARG</code> names must match exactly case-sensitively when executing the build CLI command.
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
              Build an image that compiles code for different environments (dev/prod):
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create a Dockerfile:
                <pre className="x-small text-secondary mt-1 mb-1">
{`FROM alpine
ARG BUILD_TYPE=development
RUN echo "Building app in $BUILD_TYPE mode!"`}
                </pre>
              </li>
              <li className="mb-2">Build Dev: <code>docker build -t app-dev .</code> (Notice the log output)</li>
              <li>Build Prod: <code>docker build --build-arg BUILD_TYPE=production -t app-prod .</code> (Check that the build output changed to production mode!)</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
