import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile COPY Command - Docker Documentation",
  description: "Learn how to use the COPY command to transfer files from your host machine into your images."
};

export default function DockerfileCopyPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info fs-5 p-2">Build-Time</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>COPY Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Moves source code, configurations, and application assets from your local host machine into the Docker Image.
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
              {`# 1. Standard copying
COPY <src>... <dest>

# 2. JSON/Exec style (useful if paths contain spaces)
COPY ["<src>",... "<dest>"]

# 3. Copying with ownership setting (crucial for security)
COPY --chown=node:node package.json /app/`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>COPY</code> instruction copies new files or directories from the local build context (usually your project directory) and adds them to the filesystem of the image at the specified destination path.
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
              Imagine setting up a display kiosk at an airport:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You print banners, posters, and product brochures on your local computer at home.
                <br /><br />
                Before the kiosk opens, you pack those printed papers into a shipping crate and move them inside the kiosk's display cabinets (<code>COPY</code>).
                Once inside, the posters stay locked in the display, ready to be read by visitors when the kiosk goes live (runtime).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Caching Behavior */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-lightning-fill"></i>
            </div>
            <h2 className="doc-card-heading">How COPY Interacts with Cache</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              During a rebuild, Docker checks if the **contents** of the files being copied are identical to the previous build.
            </p>
            <ul className="text-secondary small">
              <li className="mb-2">It calculates a cryptographic hash of each file's content.</li>
              <li className="mb-2">If even a single byte has changed (like a typo fix in a source file), the cache for this <code>COPY</code> instruction is **invalidated**.</li>
              <li>This also invalidates the cache for all subsequent lines in the Dockerfile!</li>
            </ul>
          </div>
        </div>

        {/* SECTION: File Permissions */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">The Permission Pitfall</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              By default, Docker copies files into the image under the **`root` user ownership**, regardless of who owns them on your host laptop.
            </p>
            <p className="text-secondary mb-0">
              If your application runs as a non-root user (e.g. `node` or `nginx`), it will throw "Permission Denied" errors when trying to write to folders.
              Always use the <strong>`--chown` flag</strong> to set user ownership during the copy:
              <br />
              <code className="text-white bg-dark p-1 rounded">COPY --chown=node:node . /app</code>
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
            <h6 className="text-light fw-bold">Beginner Example: Copying a config file</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`FROM nginx:alpine
# Copy our custom configuration file into Nginx directory
COPY nginx.conf /etc/nginx/nginx.conf`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Production Example: Splitting files for Cache Optimization</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
              {`FROM node:20-alpine
WORKDIR /usr/src/app

# Copy ONLY package info first
COPY package*.json ./
RUN npm ci

# Copy the rest of the code later (keeps 'npm ci' cached!)
COPY --chown=node:node . .

USER node
CMD ["npm", "start"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: What is the difference between COPY and ADD?</h6>
                <p className="mb-0 x-small text-secondary">
                  • <strong>COPY:</strong> Only supports copying local files/directories from the build context into the image. It is simple, explicit, and preferred.
                  <br />
                  • <strong>ADD:</strong> Has two extra advanced features: It can fetch files from remote URLs, and it automatically extracts compressed archives (tar, zip) into the destination directory.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Can COPY access files outside the build context?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>No!</strong> For security, the build client cannot copy files from arbitrary host paths like <code>COPY /home/user/secrets.txt /app</code>. The source file *must* be inside the directory where the build command is executed (the "Build Context").
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
                <span className="text-danger fw-bold">Forgetting a trailing slash:</span> If you copy a directory into a file path without a trailing slash (e.g. <code>COPY configs /app</code>), and `/app` does not exist, Docker will rename the directory contents or write them as a single file, leading to confusion. Always use a trailing slash for directories: <code>COPY configs /app/configs/</code>.
              </li>
              <li>
                <span className="text-danger fw-bold">Not ignoring large directories:</span> If you don't add <code>node_modules/</code> or <code>.git/</code> to your <code>.dockerignore</code> file, they will be copied during <code>COPY . .</code>, massively slowing down builds and bloating the image.
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
              Experiment with path structures:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Create a sub-folder: <code>mkdir static</code> and create a file inside: <code>echo "Hello" {'>'} static/app.js</code>.</li>
              <li className="mb-2">Write a Dockerfile line copying the directory: <code>COPY static/ /usr/share/nginx/html/</code></li>
              <li>Build and inspect the container directory structure using <code>docker run -it --entrypoint sh my-image</code> to verify exactly where the file landed.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
