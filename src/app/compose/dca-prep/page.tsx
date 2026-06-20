import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DCA Preparation: Docker Compose - Docker Documentation",
  description: "Focused study guide and exam tips for the Docker Certified Associate (DCA) exam regarding Docker Compose."
};

export default function ComposeDCAPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-award-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>DCA Preparation</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 8 — Essential notes and high-frequency topics for the Docker Certified Associate exam.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* DCA EXAM FOCUS */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-crosshair"></i></div>
            <h2 className="doc-card-heading">DCA Exam Focus Areas</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Docker Compose represents a significant portion of the DCA exam (usually tested alongside Docker Swarm). You must be able to read YAML fluently and predict what Compose commands will do.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <ul className="text-secondary small mb-0 ps-3">
                  <li className="mb-2"><strong>Command Outputs:</strong> Know the exact difference between <code>down</code> vs <code>stop</code>, and what the <code>-v</code> flag does.</li>
                  <li className="mb-2"><strong>Build vs Image:</strong> Know when Compose builds a local Dockerfile vs pulling from a registry.</li>
                  <li className="mb-2"><strong>Networking:</strong> Understand that Compose creates a default bridge network automatically.</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="text-secondary small mb-0 ps-3">
                  <li className="mb-2"><strong>Ports vs Expose:</strong> This is almost always tested. Know which one publishes to the host.</li>
                  <li className="mb-2"><strong>Restart Policies:</strong> Memorize the behavior of <code>always</code> vs <code>unless-stopped</code> on server reboot.</li>
                  <li className="mb-2"><strong>Depends On:</strong> Know that it only waits for start, not readiness (unless healthchecks are used).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RAPID FIRE SCENARIOS */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-lightning-charge-fill"></i></div>
            <h2 className="doc-card-heading text-warning">Rapid-Fire Exam Scenarios</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="p-3 bg-dark rounded border border-warning border-opacity-25 mb-3">
              <h6 className="text-light fw-bold small mb-2">Scenario 1: Data Loss</h6>
              <p className="x-small text-secondary mb-2"><strong>Question:</strong> You run <code>docker compose down</code> on a stack with a Postgres database using a named volume. What happens to the data?</p>
              <p className="x-small text-success mb-0"><strong>Answer:</strong> The data is safe. The containers and networks are removed, but named volumes persist. Data is only lost if you run <code>docker compose down -v</code>.</p>
            </div>

            <div className="p-3 bg-dark rounded border border-warning border-opacity-25 mb-3">
              <h6 className="text-light fw-bold small mb-2">Scenario 2: Port Conflicts</h6>
              <p className="x-small text-secondary mb-2"><strong>Question:</strong> A service has <code>ports: ["80:80"]</code>. You run <code>docker compose up --scale web=3</code>. What happens?</p>
              <p className="x-small text-success mb-0"><strong>Answer:</strong> It fails with a "port already allocated" error. You cannot bind multiple containers to the same static host port. Change it to <code>ports: ["80"]</code> to let Docker assign random host ports.</p>
            </div>

            <div className="p-3 bg-dark rounded border border-warning border-opacity-25 mb-3">
              <h6 className="text-light fw-bold small mb-2">Scenario 3: Connectivity</h6>
              <p className="x-small text-secondary mb-2"><strong>Question:</strong> Service A needs to connect to Service B. You did not define any networks in your compose file. How should Service A reference Service B?</p>
              <p className="x-small text-success mb-0"><strong>Answer:</strong> By the service name. Compose creates a default network, and Service B's name is automatically added to the internal DNS.</p>
            </div>

            <div className="p-3 bg-dark rounded border border-warning border-opacity-25">
              <h6 className="text-light fw-bold small mb-2">Scenario 4: Rebuilding</h6>
              <p className="x-small text-secondary mb-2"><strong>Question:</strong> You change a line of code in your Node.js app's source code, which is copied into the image via a Dockerfile. You run <code>docker compose up</code> again, but the changes aren't there. Why?</p>
              <p className="x-small text-success mb-0"><strong>Answer:</strong> Compose does not automatically rebuild an image if it already exists locally. You must run <code>docker compose up --build</code> to force a rebuild of the Dockerfile.</p>
            </div>

          </div>
        </div>

        {/* YAML SPOT THE ERROR */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger"><i className="bi bi-bug-fill"></i></div>
            <h2 className="doc-card-heading text-danger">Exam Skill: Spot the YAML Error</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              DCA exams often show you a compose file and ask "Why will this fail?" Identify the error in the snippet below:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`services:
  web:
    image: nginx
    ports:
      - 80:80
  db:
    image: postgres
    volumes:
      - db-data:/var/lib/postgresql/data`}
            </pre>
            <div className="p-3 bg-dark rounded border border-danger">
              <h6 className="text-danger fw-bold small mb-1">The Errors:</h6>
              <ol className="text-secondary x-small mb-0 ps-3">
                <li className="mb-1"><strong>Unquoted Ports:</strong> <code>- 80:80</code> must be quoted as <code>- "80:80"</code> to prevent YAML from parsing it as a base-60 float (less of an issue in very modern parsers, but classically tested).</li>
                <li><strong>Missing Top-Level Volumes:</strong> The named volume <code>db-data</code> is used in the <code>db</code> service, but it is not declared at the bottom of the file with a top-level <code>volumes:</code> key. Compose will throw an error.</li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
