import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile DevOps & CI/CD Integration - Docker Documentation",
  description: "Learn how to integrate Dockerfiles into CI/CD pipelines, Docker Compose, Kubernetes, and Docker Swarm."
};

export default function DockerfileDevOpsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-cpu-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>DevOps &amp; CI/CD Integration</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Learn how the Dockerfile connects to automated pipelines, compose layouts, and production container orchestrators.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Automated Image Registries Workflow */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-cloud-arrow-up-fill"></i>
            </div>
            <h2 className="doc-card-heading">Registry Workflows: Push &amp; Pull</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Once an image compiles locally, you must ship it to a **Container Registry** (like Docker Hub, AWS ECR, or GitHub Container Registry) so your servers can pull and run it.
            </p>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25 mt-3">
              <h6 className="text-info fw-bold x-small uppercase mb-2">The Standard Deployment Sequence:</h6>
              <ol className="text-secondary small mb-0 pl-3">
                <li className="mb-2">
                  <strong>Login securely:</strong>
                  <br />
                  <code>echo $PASSWORD | docker login -u $USERNAME --password-stdin</code>
                </li>
                <li className="mb-2">
                  <strong>Compile and Tag image:</strong>
                  <br />
                  <code>docker build -t my-app:1.0.0 .</code>
                  <br />
                  <code>docker tag my-app:1.0.0 username/my-app:latest</code>
                </li>
                <li>
                  <strong>Push to repository:</strong>
                  <br />
                  <code>docker push username/my-app:latest</code>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* SECTION: CI/CD Pipeline Integration */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-git"></i>
            </div>
            <h2 className="doc-card-heading">CI/CD Integration (GitHub Actions)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              In modern software development, images are built automatically every time you push code to Git. Here is a production-ready **GitHub Actions pipeline** workflow:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`name: CI/CD Docker Build

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: username/my-web-app:latest`}
            </pre>
          </div>
        </div>

        {/* SECTION: Docker Compose Build Blocks */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-columns-gap"></i>
            </div>
            <h2 className="doc-card-heading text-success">Docker Compose: The Build Parameter</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Instead of running complex `docker run` flags manually, you can orchestrate multi-container layouts using **Docker Compose**.
            </p>
            <p className="text-secondary mb-3">
              You can instruct Compose to automatically compile a custom Dockerfile upon launch by declaring the **`build` context**:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`version: "3.8"
services:
  web-app:
    # 1. Compile custom local Dockerfile
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        BUILD_ENVIRONMENT: production
    ports:
      - "80:80"

  api-service:
    # 2. Or pull pre-built official image directly
    image: postgres:alpine
    environment:
      POSTGRES_DB: main_db`}
            </pre>
          </div>
        </div>

        {/* SECTION: Kubernetes & Swarm Orchestration */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-shield-check"></i>
            </div>
            <h2 className="doc-card-heading">Kubernetes &amp; Swarm Orchestration</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Production clusters (like Kubernetes or Docker Swarm) **do not build images**. They only run pre-compiled images pulled from registries.
            </p>
            <div className="p-3 bg-dark rounded border border-warning border-opacity-25 mt-3">
              <span className="badge bg-warning text-dark mb-2">Important Orchestrator Principles:</span>
              <ul className="text-secondary small mb-0 pl-3">
                <li className="mb-2"><strong>Image Pull Policy:</strong> Ensure your Kubernetes deployments use `imagePullPolicy: Always` (or specify explicit semantic tags) so that clusters download newly pushed versions instead of relying on cached local images.</li>
                <li><strong>Dynamic Registry Credentials:</strong> In Docker Swarm, you must append the `--with-registry-auth` flag when updating stacks, ensuring worker nodes can authenticate and pull secure private registry images: <br /><code>docker stack deploy -c stack.yml my-stack --with-registry-auth</code></li>
              </ul>
            </div>
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
                <h6 className="fw-bold mb-1 text-info">Question: How does --with-registry-auth help Docker Swarm clusters?</h6>
                <p className="mb-0 x-small text-secondary">
                  By default, swarm manager nodes authenticate with the registry when deploying stacks. However, worker nodes don't share this authorization and will fail to pull the image. Adding <code>--with-registry-auth</code> instructs the Swarm Manager to securely pass registry authorization tokens to all worker nodes in the cluster.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Why should you avoid pushing the latest tag exclusively?</h6>
                <p className="mb-0 x-small text-secondary">
                  If your pipeline only builds and pushes the <code>latest</code> tag, you lose rollback traceability. If a bug crashes production, you have no older tag (like `v1.2.3`) to easily deploy to restore service. Always tag with BOTH a unique commit ID/version and floating `latest` tags!
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
              Let's write a mock docker-compose layout:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create an empty folder `web` and put an empty `Dockerfile` inside.</li>
              <li className="mb-2">Create a `docker-compose.yml` file in the parent folder.</li>
              <li className="mb-2">Configure the service:
                <pre className="x-small text-secondary mt-1 mb-1">
{`services:
  my-app:
    build: ./web
    ports:
      - "8080:80"`}
                </pre>
              </li>
              <li>Test the compose pipeline: Run <code>docker compose build</code> to compile the sub-folder automatically!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
