import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DevOps Interview Prep: Docker Compose - Docker Documentation",
  description: "Common Docker Compose interview questions and answers for DevOps and SRE roles, spanning beginner to advanced levels."
};

export default function ComposeInterviewPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-chat-quote-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Interview Preparation</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 9 — Real-world Docker Compose questions you will face in DevOps, SRE, and Backend Engineering interviews.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* BEGINNER */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-star-fill"></i></div>
            <h2 className="doc-card-heading">Beginner Level</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="mb-4">
              <h6 className="text-light fw-bold small">1. What is the main difference between a Dockerfile and docker-compose.yml?</h6>
              <p className="x-small text-secondary mb-0">
                A <code>Dockerfile</code> is a recipe used to build a <strong>single</strong> Docker image. <code>docker-compose.yml</code> is a configuration file used to run and orchestrate <strong>multiple</strong> containers simultaneously, often using images built by Dockerfiles.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold small">2. What happens if you run docker compose up, but the images aren't built yet?</h6>
              <p className="x-small text-secondary mb-0">
                Compose will automatically attempt to pull the images from the registry (if using <code>image:</code>) or build them (if using <code>build:</code>) before starting the containers.
              </p>
            </div>

            <div className="mb-0">
              <h6 className="text-light fw-bold small">3. How do you pass environment variables into a container using Compose?</h6>
              <p className="x-small text-secondary mb-0">
                By using the <code>environment:</code> key in the service definition to declare variables explicitly, or by using the <code>env_file:</code> key to load them from an external file.
              </p>
            </div>

          </div>
        </div>

        {/* INTERMEDIATE */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-star-half"></i></div>
            <h2 className="doc-card-heading">Intermediate Level</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="mb-4">
              <h6 className="text-light fw-bold small">4. If Service A depends on Service B, will Compose wait for Service B to be fully ready to accept connections before starting Service A?</h6>
              <p className="x-small text-secondary mb-0">
                No. By default, <code>depends_on</code> only waits for the container to <em>start</em>. To wait for readiness (e.g., waiting for a database to boot), you must define a <code>healthcheck</code> on Service B, and then use the long syntax in Service A: <code>depends_on: ServiceB: condition: service_healthy</code>.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold small">5. Explain the difference between `ports` and `expose` in docker-compose.yml.</h6>
              <p className="x-small text-secondary mb-0">
                <code>ports</code> maps a container port to the host machine, making it accessible from outside Docker (e.g., <code>"80:80"</code>). <code>expose</code> documents that a port is used, but only makes it accessible to other containers on the same Docker network — it is completely hidden from the host machine and the outside world.
              </p>
            </div>

            <div className="mb-0">
              <h6 className="text-light fw-bold small">6. I changed a Dockerfile for one of my services. I run `docker compose up -d`, but my changes aren't there. Why?</h6>
              <p className="x-small text-secondary mb-0">
                Because Compose caches the built image. If an image already exists locally, Compose will use it. You must explicitly force a rebuild by running <code>docker compose up -d --build</code> or <code>docker compose build</code>.
              </p>
            </div>

          </div>
        </div>

        {/* ADVANCED */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger"><i className="bi bi-fire"></i></div>
            <h2 className="doc-card-heading">Advanced / Architecture Level</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="mb-4">
              <h6 className="text-light fw-bold small">7. How would you handle different environments (dev vs prod) in Docker Compose?</h6>
              <p className="x-small text-secondary mb-0">
                I would use <strong>Compose Overrides</strong>. I'd create a base <code>compose.yaml</code> with the core architecture. Then, I'd rely on the default <code>compose.override.yaml</code> for local development (adding bind mounts and exposing ports). For production, I'd create a <code>compose.prod.yaml</code> (with restart policies and secrets) and deploy using: <code>docker compose -f compose.yaml -f compose.prod.yaml up -d</code>.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold small">8. Is Docker Compose suitable for a highly available production environment? Why or why not?</h6>
              <p className="x-small text-secondary mb-0">
                Generally, no. Compose runs on a <strong>single host machine</strong>. If that machine fails, the entire application goes down. While suitable for staging or small internal tools, high-availability production requires orchestration across multiple nodes (a cluster), which is what Kubernetes or Docker Swarm are designed for.
              </p>
            </div>

            <div className="mb-0">
              <h6 className="text-light fw-bold small">9. A container in your Compose stack keeps getting OOMKilled by Linux. How do you prevent it from taking down the whole host machine?</h6>
              <p className="x-small text-secondary mb-0">
                I would set hard memory limits on the service using the <code>deploy.resources</code> block in the compose file. By setting <code>limits: memory: 512M</code>, Docker will enforce that the container cannot exceed 512MB of RAM, protecting the host system from resource starvation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
