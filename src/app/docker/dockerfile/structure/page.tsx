import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile Structure & Caching - Docker Documentation",
  description: "Learn how Docker reads a Dockerfile, creates image layers, and optimizes with the build cache."
};

export default function DockerfileStructurePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-layers-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Structure &amp; Layer Caching</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Understanding the build engine, layer composition, and how to write lightning-fast builds using the cache.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: How Docker reads Dockerfile */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-book-half"></i>
            </div>
            <h2 className="doc-card-heading">How Docker reads a Dockerfile</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Docker parses a Dockerfile **from top to bottom, one line at a time**.
            </p>
            <p className="text-secondary">
              Each instruction in a Dockerfile represents a step in configuring the environment.
              The format is always:
              <br />
              <code className="text-white bg-dark p-1 rounded">INSTRUCTION arguments</code> (e.g., <code>FROM ubuntu</code>). By convention, instructions are capitalized to distinguish them from arguments.
            </p>
          </div>
        </div>

        {/* SECTION: The Layer Concept */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-stack"></i>
            </div>
            <h2 className="doc-card-heading">The Layer Concept</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              This is the single most important technical detail of Docker: **Images are built in layers.**
            </p>
            <p className="text-secondary">
              Every instruction that changes the filesystem (like `RUN`, `COPY`, or `ADD`) creates a **new read-only layer** on top of the previous one.
            </p>
            <div className="p-3 bg-dark rounded border border-primary border-opacity-25 mt-3">
              <h6 className="text-primary fw-bold mb-2">Real-World Analogy: Clear Acetate Sheets</h6>
              <p className="text-secondary small mb-0">
                Think of an image like a stack of clear overhead projector slides:
                <br />
                • Slide 1 (Bottom): The base OS (e.g., Ubuntu).
                <br />
                • Slide 2: Added Node.js.
                <br />
                • Slide 3: Copied your application code.
                <br />
                Looking from the top down, you see a single unified filesystem. If you make a mistake, you don't throw away the stack — you just replace or change the slide!
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Small Walkthrough */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon">
              <i className="bi bi-file-earmark-text-fill"></i>
            </div>
            <h2 className="doc-card-heading">A Simple Dockerfile Walkthrough</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Let's dissect a basic Dockerfile:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 small">
              {`# Step 1: Define base operating system image
FROM ubuntu:22.04

# Step 2: Run clean package installs (creates layer 2)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Step 3: Set working directory context
WORKDIR /app

# Step 4: Copy local index.html into image (creates layer 3)
COPY index.html .

# Step 5: Command to run when starting container
CMD ["curl", "https://google.com"]`}
            </pre>
            <div className="text-secondary small mt-3">
              <h6 className="text-light fw-bold mb-2">Step-by-Step Breakdown:</h6>
              <ul className="pl-3 mb-0">
                <li className="mb-2">
                  <strong>Step 1 (FROM):</strong> Sets Ubuntu 22.04 as our foundation base OS.
                </li>
                <li className="mb-2">
                  <strong>Step 2 (RUN):</strong> Downloads package registries, installs <code>curl</code>, and immediately sweeps up downloaded cache to keep our image lightweight.
                </li>
                <li className="mb-2">
                  <strong>Step 3 (WORKDIR):</strong> Changes our active room/directory context to <code>/app</code>. If `/app` doesn't exist, Docker creates it automatically.
                </li>
                <li className="mb-2">
                  <strong>Step 4 (COPY):</strong> Copies <code>index.html</code> from your laptop into the image.
                  <br />
                  <span className="text-info fw-bold">What does the dot (<code>.</code>) mean here?</span> Because of the preceding <code>WORKDIR /app</code>, the active directory is now `/app`. The dot (<code>.</code>) represents this **active working directory**. So <code>COPY index.html .</code> copies the file directly to <code>/app/index.html</code>. Using the dot is best practice because if you change your `WORKDIR` path to `/var/www` later, you don't need to rewrite all your COPY destinations!
                </li>
                <li>
                  <strong>Step 5 (CMD):</strong> Tells the container what command to run when it boots.
                  <div className="p-3 bg-dark rounded border border-info border-opacity-25 mt-2 mb-2">
                    <p className="text-secondary small mb-2">
                      The square bracket form is called the **exec form** of CMD.
                      Docker runs it directly without going through a command shell (like bash or zsh):
                      <strong> curl https://google.com</strong>
                    </p>
                    <pre className="x-small text-info bg-black p-2 rounded mb-2">
                      {`CMD ["curl", "https://google.com"]
 ├─ "curl"                → executable program
 └─ "https://google.com"   → argument passed to curl`}
                    </pre>
                    <p className="text-secondary small mb-0">
                      So, the container: <strong>Starts</strong> → <strong>Executes curl</strong> → <strong>Fetches Google's homepage</strong> → <strong>Exits automatically</strong>.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="p-3 bg-black rounded border border-warning border-opacity-25 mt-3 mb-1">
                <span className="badge bg-warning text-dark mb-2">Build &amp; Run Sequence:</span>
                <p className="text-secondary small mb-2">
                  You <strong>cannot</strong> run a Dockerfile directly. You must first compile (bake) the recipe into a local image using <code>docker build</code>:
                </p>
                <pre className="x-small text-success bg-dark p-2 rounded mb-2">
                  {`# 1. Build (compile the image)
docker build -t my-curl-app .
# Note: docker build -t my-curl-app:1.0.0 . ➔ Tagged as version 1.0.0
# docker build -t my-curl-app:latest . ➔ Tagged as the default floating tag latest
# 2. Run (start the container)
docker run --rm my-curl-app`}
                </pre>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION: Build Cache Theory */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-lightning-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">Build Cache Theory</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Building images can take a long time if you are installing large dependencies. To speed this up, Docker utilizes **Build Caching**.
            </p>
            <p className="text-secondary">
              When rebuilding an image, Docker checks if the instruction and the files it references are exactly the same as the previous build. If they are, Docker skips compiling that step and reuses the cached layer instantly (indicated by <code>CACHED</code> in build logs).
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <h6 className="text-success fw-bold mb-2">The Chain-Reaction Invalidation Rule</h6>
              <p className="text-secondary small mb-0">
                <strong>CRITICAL:</strong> Once a single layer cache is invalidated (for example, you modified a file copied by a `COPY` instruction), **all subsequent layers below it are also invalidated** and must be re-run from scratch.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Caching Best Practice */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-lightbulb-fill"></i>
            </div>
            <h2 className="doc-card-heading">Ordering Your Dockerfile for Cache Efficiency</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Always place instructions that change **least frequently** at the top, and things that change **most frequently** (like your source code) at the bottom.
            </p>
            <div className="row g-2 mt-2">
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-danger h-100">
                  <span className="badge bg-danger mb-2">Bad (Slow Rebuilds)</span>
                  <pre className="x-small text-secondary mb-0">
                    {`FROM node:18
COPY . .
RUN npm install
CMD ["node", "app.js"]`}
                  </pre>
                  <small className="text-secondary d-block mt-2">
                    *Any* file change invalidates cache at line 2. <code>npm install</code> runs on every single code change!
                  </small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-success h-100">
                  <span className="badge bg-success mb-2">Good (Cached &amp; Fast)</span>
                  <pre className="x-small text-secondary mb-0">
                    {`FROM node:18
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]`}
                  </pre>
                  <small className="text-secondary d-block mt-2">
                    <code>npm install</code> is only re-run if <code>package.json</code> changes. Modifying source code skips install entirely!
                  </small>
                </div>
              </div>
            </div>
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
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Which instructions create layers?</h6>
                <p className="mb-0 x-small text-secondary">
                  Historically, every instruction created a layer. In modern Docker, only **instructions that modify the filesystem** create layers: <code>RUN</code>, <code>COPY</code>, and <code>ADD</code>. Others (like <code>ENV</code>, <code>EXPOSE</code>, <code>WORKDIR</code>) modify metadata but don't add filesystem size.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do you bypass the cache?</h6>
                <p className="mb-0 x-small text-secondary">
                  If you want to force Docker to download fresh packages instead of using cached layers, you pass the flag <code>--no-cache</code> during compilation: <code>docker build --no-cache -t app .</code>.
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
            <h2 className="doc-card-heading">Common Mistakes to Avoid</h2>
          </div>
          <div className="doc-card-body">
            <ul className="text-secondary small">
              <li className="mb-2">
                <span className="text-danger fw-bold">Combining unrelated RUN lines unnecessarily:</span> Putting everything in a single RUN statement makes debugging failures extremely difficult.
              </li>
              <li className="mb-2">
                <span className="text-danger fw-bold">Not clean-up in the same RUN layer:</span> If you download a 100MB temp file in one <code>RUN</code> instruction, and delete it in a second <code>RUN</code> instruction, that 100MB is still permanently stored in the read-only layer of step 1. You must delete temp files in the **same command** they are created!
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
              Look at this Dockerfile snippet and identify why it might be slow during re-development builds:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`FROM python:3.9
COPY src/ /app/src/
RUN pip install -r requirements.txt`}
            </pre>
            <p className="small text-secondary mb-0">
              <strong>Answer/Thought Exercise:</strong> Every time a file in <code>src/</code> changes, the cache invalidates at step 2, forcing step 3 (pip install) to re-run and re-download all Python packages. Fix it by copying <code>requirements.txt</code> and running `pip install` before copying the `src/` directory!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
