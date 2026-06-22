import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile FROM Command - Docker Documentation",
  description: "Learn how to use the FROM command to declare the base image for your containers."
};

export default function DockerfileFromPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info fs-5 p-2">Build-Time</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>FROM Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The starting block of every Dockerfile. Defines the foundation image your environment will be built on.
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
              {`FROM <image>
FROM <image>:<tag>
FROM <image>@<digest>`}
            </pre>
            <p className="text-secondary">
              The <code>FROM</code> instruction initializes a new build stage and sets the **Base Image** for subsequent instructions. A valid Dockerfile **must start with a `FROM` instruction** (with a minor exception for `ARG` declarations at the very beginning).
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
              Imagine you are building a custom sports car:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                Instead of smelting steel, pouring rubber, and making the chassis from scratch, you buy a pre-built base car chassis from a factory (e.g., a standard sedan chassis) and then build your custom additions (spoiler, turbocharger, custom paint) on top of it.
                <br /><br />
                The <code>FROM</code> statement is you telling Docker: *"Go to the Docker Hub factory and get me a standard Ubuntu or Node.js chassis."*
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Choosing the Right Tag */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-tag-fill"></i>
            </div>
            <h2 className="doc-card-heading">Choosing the Right Base Image Tag</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              When specifying images (e.g., <code>FROM python</code>), you should always specify a tag to control the size and stability of your build:
            </p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Tag Flavor</th>
                    <th>Image Size</th>
                    <th>When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>latest</code> / Default</td>
                    <td>Large (~900MB)</td>
                    <td>Testing, quick scripting. Prone to breaking when new updates release.</td>
                  </tr>
                  <tr>
                    <td><code>alpine</code></td>
                    <td>Tiny (~5MB)</td>
                    <td>Highly optimized production environments. Based on Alpine Linux.</td>
                  </tr>
                  <tr>
                    <td><code>slim</code></td>
                    <td>Medium (~150MB)</td>
                    <td>Standard Linux (Debian) but stripped of unnecessary developer tooling. Good balance.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: The scratch Image */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-slash-circle-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Special "scratch" Image</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If you write <code>FROM scratch</code>, you are telling Docker: *"Start from an absolute zero-byte, empty file system."*
            </p>
            <p className="text-secondary mb-0">
              This is used for high-performance, ultra-secure production containers running pre-compiled binary applications (like **Go** or **Rust**). The binary contains all its dependencies, so it doesn't need an operating system (no bash, no package manager, no utilities) to execute.
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
            <h6 className="text-light fw-bold">Beginner Example: Standard Web Server</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`# Starts with Nginx alpine image
FROM nginx:1.25-alpine

# (Subsequent commands go here...)`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Production Example: Pinning by Digest (Security)</h6>
            <p className="small text-secondary">
              To guarantee that nobody changes your base image underneath you, you can pin the image to its unique cryptographic sha256 hash (digest):
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
              {`# Pin to Ubuntu 22.04 LTS via digest
FROM ubuntu@sha256:2b7405111922a1c31328c7b8076f1b1c67d4e5f76e738ff5d475956784d169a4`}
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
            {/* Q1: Multiple FROM */}
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Can a Dockerfile have multiple FROM statements?</h6>
                <p className="mb-2 x-small text-secondary">
                  <strong>Yes!</strong> This is called a <strong>Multi-stage Build</strong>. Each <code>FROM</code> creates a completely independent build stage with its own filesystem. You use a large image to <em>build</em> your app, then copy only the compiled output into a tiny final image — discarding all build-time tools, compilers, and source code.
                </p>
                <p className="mb-2 x-small text-secondary">
                  <strong>Why is this needed?</strong> A Go app compiler (<code>golang:1.21</code>) is ~800MB. Your actual compiled binary might only be 10MB. Without multi-stage builds, that entire 800MB compiler would ship to production!
                </p>
                <pre className="x-small bg-black text-success p-2 rounded mb-0">
                  {`# ── Stage 1: Builder (heavy, has compilers) ──────────────────
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN go build -o myapp .       # compiles binary

# ── Stage 2: Runner (tiny, production-ready) ─────────────────
FROM alpine:3.18               # fresh, minimal base
WORKDIR /app
# Copy ONLY the compiled binary from stage 1:
COPY --from=builder /src/myapp .
CMD ["./myapp"]

# Final image size: ~12MB instead of ~800MB!`}
                </pre>
              </div>
            </div>

            {/* Q2: ARG before FROM */}
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do you declare variables BEFORE the FROM command?</h6>
                <p className="mb-2 x-small text-secondary">
                  Only the <code>ARG</code> instruction can precede <code>FROM</code>. This lets you make the base image tag dynamic — swappable at build time without editing the Dockerfile.
                </p>
                <p className="mb-2 x-small text-secondary">
                  <strong>What if there are multiple ARGs?</strong> You can stack as many <code>ARG</code> lines as you need before <code>FROM</code>. Each one becomes a build-time variable you can pass via <code>--build-arg</code>:
                </p>
                <pre className="x-small bg-black text-warning p-2 rounded mb-2">
                  {`# Multiple ARGs declared before any FROM:
ARG UBUNTU_VER=22.04
ARG NODE_VER=20
ARG BUILD_ENV=production

# Use them in FROM tags:
FROM ubuntu:${'$'}{UBUNTU_VER}       # resolves to ubuntu:22.04

# You can also use them in later FROMs:
FROM node:${'$'}{NODE_VER}-alpine    # resolves to node:20-alpine`}
                </pre>
                <p className="mb-1 x-small text-secondary">
                  To override defaults at build time, pass each one with a separate <code>--build-arg</code> flag:
                </p>
                <pre className="x-small bg-black text-success p-2 rounded mb-1">
                  {`docker build \
  --build-arg UBUNTU_VER=24.04 \
  --build-arg NODE_VER=22 \
  --build-arg BUILD_ENV=staging \
  -t my-app .`}
                </pre>
                <p className="mb-0 x-small text-secondary">
                  <strong> Scope warning:</strong> An <code>ARG</code> declared before <code>FROM</code> is <em>only</em> visible inside <code>FROM</code> itself. To reuse it after <code>FROM</code>, you must re-declare it (without a default value) inside the build stage:
                </p>
                <pre className="x-small bg-black text-secondary p-2 rounded mb-0 mt-1">
                  {`ARG NODE_VER=20
FROM node:${"$"}{NODE_VER}-alpine

ARG NODE_VER          # re-declare to make it visible again below
RUN echo "Building for Node $NODE_VER"`}
                </pre>
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
                <span className="text-danger fw-bold">Not specifying a tag:</span> Writing <code>FROM python</code> defaults to <code>FROM python:latest</code>. This makes your build slow and unstable, as new Python versions will automatically break your app in the future.
              </li>
              <li>
                <span className="text-danger fw-bold">Using untrusted base images:</span> Always use "Official Image" tags (like `node`, `nginx`, `postgres`, `ubuntu`) from verified publishers. Custom unofficial images may contain security vulnerabilities or malicious packages.
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
              Go to Docker Hub, search for "Node", and check the tag list.
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create a Dockerfile that starts with the lightweight LTS version of Node.js.</li>
              <li>Your command should be: <code>FROM node:20-alpine</code></li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
