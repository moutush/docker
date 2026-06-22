import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project: Nginx Website - Docker Compose",
  description: "A beginner-friendly Docker Compose project: Hosting a static HTML website using Nginx with bind mounts."
};

export default function ComposeProjectNginxPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-globe text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Project: Static Website (Nginx)</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 6.1 — Host a simple static HTML site using an Nginx web server and a bind mount.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* PROJECT OVERVIEW */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Project Overview</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This is the "Hello World" of Docker Compose projects. We will use the official Nginx image to serve a static HTML file. By using a <strong>bind mount</strong>, any changes we make to the HTML file on our laptop will instantly update in the browser without restarting the container.
            </p>
            <div className="p-3 bg-dark rounded border border-secondary">
              <h6 className="text-light small mb-2">Folder Structure:</h6>
              <pre className="x-small text-info mb-0">
                {`my-website/
├── compose.yaml
└── html/
    └── index.html`}
              </pre>
            </div>
          </div>
        </div>

        {/* STEP 1 */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-1-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 1: Create the HTML File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create a folder called <code>html</code>, and inside it, create an <code>index.html</code> file:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
              {`<!DOCTYPE html>
<html>
<head>
  <title>Docker Compose Nginx</title>
  <style>
    body { font-family: sans-serif; text-align: center; margin-top: 50px; background: #222; color: white; }
  </style>
</head>
<body>
  <h1>Hello from Nginx in Docker Compose!</h1>
  <p>Try editing this file — the changes will show up instantly.</p>
</body>
</html>`}
            </pre>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-2-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 2: Create the Compose File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">In the root folder (next to the <code>html</code> folder), create <code>compose.yaml</code>:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
              {`services:
  web:
    image: nginx:alpine
    container_name: nginx-web-server
    ports:
      - "8080:80"                  # Map port 8080 on laptop to 80 in container
    volumes:
      - ./html:/usr/share/nginx/html # Bind mount local html folder to Nginx root
    restart: unless-stopped`}
            </pre>
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <strong className="text-info">Two Compose "Gotchas" to remember:</strong>
                <ul className="x-small text-secondary mb-0 ps-3 mt-1">
                  <li className="mb-2">
                    <strong>The Dash (-):</strong> Why write <code>- "8080:80"</code> instead of just <code>ports: "8080:80"</code>? Compose strictly requires a YAML <strong>List</strong> for <code>ports</code>, <code>volumes</code>, and <code>environment</code>. A dash indicates a list item. Without it, the YAML parser reads it as a single string and crashes.
                  </li>
                  <li>
                    <strong>Which port is which?:</strong> It is always <strong>HOST : CONTAINER</strong>. 
                    <br/><strong className="text-info">Memory Hacks:</strong> 
                    <br/>1. <strong>"Left is Local"</strong> (The left side is your local laptop). 
                    <br/>2. Alphabetical: <strong>H</strong>ost comes before <strong>C</strong>ontainer.
                    <br/>3. <strong>The Postal Address Trick:</strong> Imagine writing on a parcel. <em>"To: 8080. Forward to room: 80"</em>. The outside address always comes first!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-3-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success">Step 3: Run and Test</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-success border-success p-3 x-small mb-3">
              {`# 1. Start the container in detached mode:
docker compose up -d

# 2. Check the status:
docker compose ps`}
            </pre>
            <p className="text-secondary small mb-3">
              Now open your browser and go to <code className="text-info">http://localhost:8080</code>.
            </p>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-magic"></i>
              <div>
                <strong className="text-info">Test the Hot Reload:</strong>
                <span className="x-small text-secondary"> Keep the browser open. Change the text in your <code>html/index.html</code> file on your laptop and save it. Refresh the browser — the update is instant! This is the power of a bind mount.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CLEANUP */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning"><i className="bi bi-trash-fill"></i></div>
            <h2 className="doc-card-heading">Cleanup</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">When you're done, stop and remove the container:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
              {`docker compose down`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
