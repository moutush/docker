import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile ARG Command - Docker Documentation",
  description: "Learn how to use the ARG command to pass build-time variables into your Dockerfile. When to use ARG vs ENV, scoping rules, and global ARGs explained."
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
          Defines a variable that exists <strong>only during image build</strong>. Pass dynamic values at build-time without hardcoding them into the Dockerfile.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* SECTION: Quick Look */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-lightning-charge-fill"></i></div>
            <h2 className="doc-card-heading">Quick Look</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-2">Syntax:</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
{`# 1. Declare with no default — MUST be passed via CLI or build will use empty string
ARG VERSION

# 2. Declare with a default fallback value
ARG APP_PORT=8080

# 3. Pass a value at build time using the CLI flag:
docker build --build-arg APP_PORT=9090 -t my-image .`}
            </pre>
          </div>
        </div>

        {/* SECTION: Analogy */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-egg-fried"></i></div>
            <h2 className="doc-card-heading text-success">Real-World Analogy</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">Imagine hiring a carpenter to build you a dining table:</p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                The blueprint has a variable parameter: wood type (<code>ARG WOOD_TYPE=oak</code>).
                Before they start sawing, you tell them: <em>"Make it cherry wood instead"</em> (<code>--build-arg WOOD_TYPE=cherry</code>).
                The carpenter builds the table from cherry wood (build-time).
                <br /><br />
                Once the table is <strong>finished and delivered</strong>, the wood type is permanently locked. The family eating dinner at the table cannot dynamically change the wood to pine at runtime — because the table is already built! That is exactly how <code>ARG</code> works — once the image is built, the variable is gone.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: WHEN TO USE ARG */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-question-circle-fill"></i></div>
            <h2 className="doc-card-heading">When Should You Use ARG?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-3">
              Use <code>ARG</code> when you need to pass a value into the Dockerfile <strong>that only matters while the image is being built</strong>, not when the container is actually running.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-primary border-opacity-25 h-100">
                  <h6 className="text-primary x-small mb-2">✅ GOOD use cases for ARG:</h6>
                  <ul className="x-small text-secondary mb-0 ps-3">
                    <li className="mb-1">Pinning a base image version (<code>ARG ALPINE_VER=3.19</code>)</li>
                    <li className="mb-1">Selecting a target architecture (<code>ARG TARGETARCH</code>)</li>
                    <li className="mb-1">Passing CI/CD build numbers</li>
                    <li className="mb-1">Toggling compile-time feature flags</li>
                    <li>Installing different package sets for dev vs. prod</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-danger border-opacity-25 h-100">
                  <h6 className="text-danger x-small mb-2">❌ WRONG use cases for ARG:</h6>
                  <ul className="x-small text-secondary mb-0 ps-3">
                    <li className="mb-1">Database connection URLs (not accessible at runtime)</li>
                    <li className="mb-1">API keys your app code reads at startup</li>
                    <li className="mb-1">Passwords (also visible in build history!)</li>
                    <li>Anything your app needs via <code>os.getenv()</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: ARG vs ENV */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-shuffle"></i></div>
            <h2 className="doc-card-heading text-warning">ARG vs. ENV — The Core Difference</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive mb-3">
              <table className="table table-dark table-bordered table-hover x-small mb-0">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="text-info">ARG</th>
                    <th className="text-success">ENV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Available <strong>during build</strong></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Available <strong>at runtime</strong> (in container)</td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Visible in <code>docker inspect</code></td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-warning text-dark">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Stored in image history</td>
                    <td><span className="badge bg-warning text-dark">Yes (security risk!)</span></td>
                    <td><span className="badge bg-warning text-dark">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Can be overridden at runtime</td>
                    <td><span className="badge bg-danger">No</span></td>
                    <td><span className="badge bg-success">Yes (via -e flag)</span></td>
                  </tr>
                  <tr>
                    <td>Passed via</td>
                    <td><code>--build-arg KEY=val</code></td>
                    <td>Baked into the image</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">The Simple Rule:</strong> If your <em>running application code</em> needs to read it via <code>os.environ</code>, <code>process.env</code>, or <code>getenv()</code>, use <code>ENV</code>. If it only affects how Docker <em>assembles</em> the image, use <code>ARG</code>.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Global ARG (before FROM) */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-globe"></i></div>
            <h2 className="doc-card-heading">Can ARG Be Global? (The Before-FROM Trick)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-3">
              Yes — but with a critical catch. An <code>ARG</code> declared <strong>before</strong> the first <code>FROM</code> is called a <strong>global ARG</strong>. It is the only variable that can control the <code>FROM</code> line itself (e.g., to select which base image to use).
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`# ✅ GLOBAL ARG: declared BEFORE FROM, controls the base image
ARG PYTHON_VER=3.11-slim

FROM python:$PYTHON_VER   # This works!

# ⚠️ SCOPING TRAP: $PYTHON_VER is now OUT of scope!
RUN echo "Version is: $PYTHON_VER"   # This prints nothing!

# ✅ FIX: Re-declare the ARG inside the stage (it inherits the value passed via CLI)
ARG PYTHON_VER
RUN echo "Version is: $PYTHON_VER"   # Now it works!`}
            </pre>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-warning">DCA Exam Trap:</strong> A global <code>ARG</code> (before <code>FROM</code>) goes <strong>out of scope</strong> the moment the first <code>FROM</code> line is processed. To reuse the value inside the build stage, you must re-declare it with a bare <code>ARG VARIABLE_NAME</code> (no value needed — it inherits whatever was passed via <code>--build-arg</code>).
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Scoping in Multi-Stage Builds */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-diagram-2-fill"></i></div>
            <h2 className="doc-card-heading">ARG Scoping in Multi-Stage Builds</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-3">
              Each <code>FROM</code> starts a new build stage, and <code>ARG</code>s do <strong>not</strong> automatically carry over between stages. You must re-declare them in each stage that needs them.
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`ARG APP_VERSION=2.0   # Global — only usable in FROM lines

# --- Stage 1: Build ---
FROM node:20-alpine AS builder
ARG APP_VERSION          # Re-declare to use it in this stage
RUN echo "Building v$APP_VERSION"

# --- Stage 2: Production ---
FROM nginx:alpine
ARG APP_VERSION          # Must re-declare AGAIN in every new stage
RUN echo "Serving v$APP_VERSION"`}
            </pre>
          </div>
        </div>

        {/* SECTION: ARG + ENV Pattern */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-code-slash"></i></div>
            <h2 className="doc-card-heading">The ARG + ENV Combination Pattern</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">
              The most powerful and common real-world pattern is passing a build-time <code>ARG</code> into a persistent runtime <code>ENV</code>. This lets you inject a value at build time that your application code can also read at runtime:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM python:3.11-slim
WORKDIR /app

# Declare a build-time argument
ARG APP_VERSION=1.0.0

# Bake the build argument into a persistent runtime environment variable
ENV APP_VERSION=$APP_VERSION

COPY . .
CMD ["python", "app.py"]`}
            </pre>
            <pre className="doc-code-block mb-0 bg-dark text-success border-success p-3 x-small">
{`# Build with a custom version:
docker build --build-arg APP_VERSION=2.5.0 -t my-app .

# At runtime, the container can read it:
docker run my-app   # app.py can read os.environ["APP_VERSION"] → "2.5.0"`}
            </pre>
          </div>
        </div>

        {/* SECTION: Interview Tips */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-journal-bookmark-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Interview & DCA Questions</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-danger mb-3">
              <i className="bi bi-shield-exclamation"></i>
              <div>
                <h6 className="fw-bold mb-1 text-danger">Q: Can you safely pass passwords using ARG?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>No, absolutely never!</strong> Even though <code>ARG</code> values do not exist in the running container, they are permanently recorded in the image&apos;s build history. Anyone can run <code>docker history &lt;image-name&gt;</code> and see the plain text password. Use Docker Secrets or external secret managers instead.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Q: What is the difference between ARG and ENV?</h6>
                <p className="mb-0 x-small text-secondary">
                  <code>ARG</code> exists only during the build phase and is gone after the image is built. <code>ENV</code> is baked permanently into the image and is available both during build and at runtime inside the container.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Q: What are Docker&apos;s pre-defined build ARGs?</h6>
                <p className="mb-0 x-small text-secondary">
                  Docker ships with several pre-defined build args you can use without declaring them: <code>HTTP_PROXY</code>, <code>HTTPS_PROXY</code>, <code>FTP_PROXY</code>, <code>NO_PROXY</code>, <code>TARGETARCH</code>, <code>TARGETOS</code>. These are automatically excluded from image history logs for security.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Mini Exercise */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-pencil-square"></i></div>
            <h2 className="doc-card-heading text-info">Hands-On Lab</h2>
          </div>
          <div className="doc-card-body">
            <p className="small text-secondary mb-3">Build the same image for different environments using a single Dockerfile:</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine
ARG BUILD_ENV=development
ENV APP_ENV=$BUILD_ENV
RUN echo "Baking image for: $BUILD_ENV"`}
            </pre>
            <pre className="doc-code-block mb-0 bg-dark text-success border-success p-3 x-small">
{`# Build for development (uses the default value)
docker build -t my-app:dev .

# Build for production (overrides the default)
docker build --build-arg BUILD_ENV=production -t my-app:prod .

# Prove ENV persisted into the container at runtime:
docker run --rm my-app:prod sh -c 'echo $APP_ENV'
# Output: production`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
