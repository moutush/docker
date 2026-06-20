import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Intermediate Dockerfile Optimization - Docker Documentation",
  description: "Master multi-stage builds, cache optimizations, Alpine/Distroless bases, and security best practices."
};

export default function DockerfileIntermediatePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-gem text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Intermediate &amp; Optimization</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Learn the trade secrets of senior DevOps engineers: multi-stage builds, minimal images, security locking, and micro-optimization.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Multi-Stage Builds */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-layers-half"></i>
            </div>
            <h2 className="doc-card-heading">Multi-Stage Builds</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              In compiled languages (like **Go, Java, C++**) or React frontend compilation, your build needs a massive suite of compilers, JDKs, and dev dependencies. However, at runtime, you only need the compiled binary or build assets!
            </p>
            <p className="text-secondary">
              <strong>Multi-Stage Builds</strong> solve this by allowing multiple <code>FROM</code> lines in a single Dockerfile. You compile code in stage 1, and then copy *only* the compiled output into a tiny stage 2 image, throwing away the heavy compilers.
            </p>

            <div className="p-3 bg-dark rounded border border-primary border-opacity-25 mt-3">
              <h6 className="text-primary fw-bold mb-2">Go Multi-stage Example: 800MB down to 10MB!</h6>
              <pre className="x-small text-secondary mb-0">
{`# STAGE 1: Build & Compile (Heavy environment)
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o my-app main.go

# STAGE 2: Production execution (Ultra-lightweight)
FROM alpine:3.18
WORKDIR /app
# COPY only the binary from stage 1
COPY --from=builder /app/my-app .

CMD ["./my-app"]`}
              </pre>
            </div>
          </div>
        </div>

        {/* SECTION: Caching Optimizations */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-lightning-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">Build Caching Deep-Dive</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Let's look at the correct caching sequence for node/python dependencies. 
              Always isolate library files and install them **before** copying application code!
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-2">
              <span className="badge bg-success mb-2">Optimal Python Caching Sequence</span>
              <pre className="x-small text-secondary mb-0">
{`FROM python:3.10-slim
WORKDIR /app

# 1. Copy library definition files ONLY
COPY requirements.txt .

# 2. Install dependencies (remains perfectly cached!)
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy source files later (invalidates cache only at this line)
COPY . .

CMD ["python", "app.py"]`}
              </pre>
            </div>
          </div>
        </div>

        {/* SECTION: .dockerignore */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-slash-square-fill"></i>
            </div>
            <h2 className="doc-card-heading">The .dockerignore File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Before Docker compiles your image, the local Docker client packs your directory and sends it to the Docker daemon (the "Build Context"). If you have a 2GB `node_modules` or `.git` directory, it takes forever!
            </p>
            <p className="text-secondary">
              Create a <strong>`.dockerignore`</strong> file (capital D, starting with dot) in your project root to exclude directories from being copied:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`# .dockerignore
node_modules
.git
.gitignore
*.md
docker-compose.yml`}
            </pre>
          </div>
        </div>

        {/* SECTION: Alpine vs Ubuntu vs Distroless */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-box-seam-fill"></i>
            </div>
            <h2 className="doc-card-heading">Alpine vs. Ubuntu vs. Distroless</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Base images differ significantly. Let's compare their characteristics:
            </p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Base Type</th>
                    <th>Size</th>
                    <th>Security Context</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Ubuntu / Debian</strong></td>
                    <td>~100MB+</td>
                    <td>Contains full OS utilities (curl, apt, bash). High attack surface.</td>
                    <td>Complex applications needing active troubleshooting tools.</td>
                  </tr>
                  <tr>
                    <td><strong>Alpine Linux</strong></td>
                    <td>~5MB</td>
                    <td>Minimal size. Uses custom Musl libc instead of Glibc. Minor package incompatibility risks.</td>
                    <td>Microservices, APIs, Node/Python applications.</td>
                  </tr>
                  <tr>
                    <td><strong>Distroless</strong></td>
                    <td>~10-20MB</td>
                    <td>**Zero shell utilities.** Contains ONLY your application and its dependencies. Absolute security.</td>
                    <td>High-security production systems running compiled Go or Java jars.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: Security Best Practices */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">DevSecOps Security Checklist</h2>
          </div>
          <div className="doc-card-body">
            <ol className="text-secondary small mb-0">
              <li className="mb-2"><strong>Never run as root:</strong> Always switch using `USER appuser`.</li>
              <li className="mb-2"><strong>Keep base images updated:</strong> Build regularly using pinned LTS versions (e.g. `node:20-alpine`) to prevent pulling old security vulnerabilities.</li>
              <li className="mb-2"><strong>Never build secrets into the image:</strong> Do not use `ENV API_KEY=secret` in your Dockerfile. Feed them at runtime via Swarm Secrets or environment variables.</li>
              <li><strong>Minify layer counts:</strong> Group multiple `RUN` packages with `&&` to keep layers down, keeping storage performance smooth.</li>
            </ol>
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
                <h6 className="fw-bold mb-1 text-info">Question: Why does Go/C++ compile better on Distroless than Alpine?</h6>
                <p className="mb-0 x-small text-secondary">
                  Alpine Linux uses <code>musl libc</code>, whereas most Linux OS distributions (like Ubuntu/RedHat) use <code>glibc</code>. Compiled languages like Go that depend on standard C headers can crash on Alpine due to library differences. Distroless uses Glibc, combining small size and absolute compatibility!
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do you label multi-stage builds?</h6>
                <p className="mb-0 x-small text-secondary">
                  You label stages using the <code>AS</code> keyword: <code>FROM golang:alpine AS builder</code>. If you don't name a stage, you can still copy from it in later stages using its 0-indexed number: <code>COPY --from=0 /app/binary .</code>.
                </p>
              </div>
            </div>
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
              Write a simple multi-stage Dockerfile that builds a dummy binary or file structure:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Stage 1:
                <pre className="x-small text-secondary mt-1 mb-1">
{`FROM alpine AS stage1
RUN echo "Compiled product asset!" > /compiled.txt`}
                </pre>
              </li>
              <li className="mb-2">Stage 2:
                <pre className="x-small text-secondary mt-1 mb-1">
{`FROM alpine
COPY --from=stage1 /compiled.txt /app/compiled.txt
CMD ["cat", "/app/compiled.txt"]`}
                </pre>
              </li>
              <li>Build and run it. Notice how Stage 2 successfully extracts the artifact built in Stage 1!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
