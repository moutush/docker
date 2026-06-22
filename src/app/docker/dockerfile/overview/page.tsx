import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Introduction to Dockerfile - Docker Documentation",
  description: "Learn what a Dockerfile is, why it exists, and how it automates image creation."
};

export default function DockerfileOverviewPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-file-earmark-code-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>What is a Dockerfile?</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The automated blueprint for building lightweight, repeatable, and isolated application environments.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: The Elevator Pitch */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-patch-question-fill"></i>
            </div>
            <h2 className="doc-card-heading">What is it?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              A <strong>Dockerfile</strong> is a simple text document containing all the commands/instructions a user could call on the command line to assemble a Docker Image.
            </p>
            <p className="text-secondary">
              Think of it as a **scripted recipe**. Instead of manually installing software, setting up environment variables, and copying code files one-by-one, you write a Dockerfile. Docker reads this file and automatically constructs your application environment step-by-step.
            </p>
          </div>
        </div>

        {/* SECTION: Analogy */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-egg-fried"></i>
            </div>
            <h2 className="doc-card-heading text-success">The Baking Analogy</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              To understand the whole Docker ecosystem, think of baking a cake:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <ul className="list-unstyled mb-0 small text-secondary">
                <li className="mb-2">
                  <i className="bi bi-journal-text text-success me-2"></i>
                  <strong>Dockerfile (The Recipe):</strong> The written instructions detailing the ingredients, order, and oven settings. It is just text.
                </li>
                <li className="mb-2">
                  <i className="bi bi-layers-fill text-info me-2"></i>
                  <strong>Docker Image (The Pre-baked Cake Mix):</strong> The frozen cake mix created directly from the recipe. It is static, read-only, and cannot change.
                </li>
                <li>
                  <i className="bi bi-box-seam-fill text-warning me-2"></i>
                  <strong>Docker Container (The Baked Cake):</strong> The actual hot cake out of the oven. You can eat it, cut it, or add frosting (write data). You can bake as many identical cakes as you want from the same mix.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION: Difference between Containers & Images */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-arrow-left-right"></i>
            </div>
            <h2 className="doc-card-heading">Images vs. Containers</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Understanding the difference between these two terms is crucial for the DCA exam:
            </p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Characteristic</th>
                    <th>Docker Image</th>
                    <th>Docker Container</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>State</strong></td>
                    <td>Static (Stopped / Read-only)</td>
                    <td>Dynamic (Running / Writeable layer)</td>
                  </tr>
                  <tr>
                    <td><strong>Purpose</strong></td>
                    <td>A blueprint/template to package applications</td>
                    <td>The active isolated instance running the application</td>
                  </tr>
                  <tr>
                    <td><strong>Source</strong></td>
                    <td>Created by compiling a <code>Dockerfile</code></td>
                    <td>Created by running a <code>Docker Image</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: Manual Setup is Bad */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-x-octagon-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Why manual container setup is BAD</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              You *could* start a blank container, use SSH to log in, run <code>apt-get install nginx</code>, download your code, and save the container. But this manual workflow has severe flaws:
            </p>
            <ul className="text-secondary small mt-3">
              <li className="mb-2"><strong>Not Reproducible:</strong> If you lose the container, you have to remember every single command you typed to rebuild it.</li>
              <li className="mb-2"><strong>No Version Control:</strong> You cannot track changes made to the configuration over time (no <code>git diff</code>).</li>
              <li className="mb-2"><strong>No Transparency:</strong> Nobody else knows how the software was installed or if malware is hidden inside.</li>
              <li><strong>High Human Error:</strong> One mistyped configuration ruins the environment consistency.</li>
            </ul>
          </div>
        </div>

        {/* SECTION: Infrastructure as Code */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-cloud-arrow-up-fill"></i>
            </div>
            <h2 className="doc-card-heading">Infrastructure as Code (IaC)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              A Dockerfile represents the core DevOps principle of <strong>Infrastructure as Code (IaC)</strong>. 
              Instead of provisioning environments by clicking UI buttons or writing documentation guides for developers, we define the infrastructure in code (the Dockerfile).
            </p>
            <p className="text-secondary mb-0">
              The Dockerfile is stored inside your Git repository alongside your source code. If a developer needs a PHP, Node, or Python runtime, they run one command: <code>docker build</code>.
            </p>
          </div>
        </div>

        {/* SECTION: Workflow Diagram */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Docker Workflow</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Here is the pipeline from source code to production deployment:
            </p>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 text-center fs-6">
{`[ Dockerfile ]
      │
      ▼ (docker build)
[ Docker Image ]
      │
      ▼ (docker push)
[ Docker Registry (Hub/ECR) ]
      │
      ▼ (docker pull & run)
[ Live Containers ]`}
            </pre>
          </div>
        </div>

        {/* SECTION: CI/CD & DevOps */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-git"></i>
            </div>
            <h2 className="doc-card-heading">CI/CD &amp; DevOps Integration</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              In a modern software team, the Dockerfile is the bridge between developers and operations:
            </p>
            <ul className="text-secondary small mt-3">
              <li className="mb-2">
                <strong>Continuous Integration (CI):</strong> Every time you push code to GitHub/GitLab, a CI pipeline runner reads the Dockerfile, builds the image, runs automated tests inside it, and tags it.
              </li>
              <li>
                <strong>Continuous Deployment (CD):</strong> If the build is successful, the CD tool tells your server (or Kubernetes/Swarm cluster) to pull the newly built image and restart the containers. No manual installation is ever required on the production servers.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION: Interview Tips */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Interview Tips &amp; DCA Focus</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Exam Question: Image vs Container Read/Write Layer</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Question:</strong> Where do modifications to files during a container's lifecycle go?
                  <br />
                  <strong>Answer:</strong> They go into the container's temporary, writeable <strong>"container layer"</strong>. The underlying image layers are read-only and never change. If the container is deleted, the data written to the container layer is lost forever unless volumes are used.
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
            <h2 className="doc-card-heading">Things to Remember &amp; Common Mistakes</h2>
          </div>
          <div className="doc-card-body">
            <ul className="text-secondary small">
              <li className="mb-2"><span className="text-danger fw-bold">Mistake:</span> Saving secrets (passwords/API keys) inside a Dockerfile. Anyone who downloads the image can extract them.</li>
              <li className="mb-2"><span className="text-success fw-bold">Best Practice:</span> Use a `.dockerignore` file (like `.gitignore`) to prevent giant files or security keys from being sent to the Docker build context.</li>
              <li><span className="text-secondary fw-bold">Naming:</span> By default, Docker looks for a file named exactly <code>Dockerfile</code> (capital D, no extension). If you use a different name, you must specify it manually with the <code>-f</code> flag.</li>
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
              Open a terminal on your computer and verify if you can find the default config file in a repo or look up an image's Dockerfile:
            </p>
            <ol className="small text-secondary pl-3">
              <li className="mb-2">Create an empty directory: <code>mkdir my-first-dockerfile && cd my-first-dockerfile</code></li>
              <li className="mb-2">Create an empty file named <code>Dockerfile</code> using <code>touch Dockerfile</code>.</li>
              <li>Verify it has no extension by running <code>ls -la</code>.</li>
            </ol>
            <div className="p-3 bg-dark rounded border border-info border-opacity-25 mt-3">
              <p className="x-small text-secondary mb-0">
                <strong>Next Step:</strong> In the next section, we will learn how to write instructions into this file and build it!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
