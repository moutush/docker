import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile ENV Command - Docker Documentation",
  description: "Learn how to use the ENV command to set environment variables inside your images and containers."
};

export default function DockerfileEnvPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-success text-dark fs-5 p-2">Build &amp; Run</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>ENV Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Declares key-value environment variables that persist through the build process and inside the running container.
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
            <p className="text-secondary">Syntax (Two Forms):</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
              {`# 1. Preferred Form: Key-Value pairs with equals sign (allows declaring multiple vars)
ENV DB_HOST=localhost DB_PORT=3306

# 2. Legacy Form: Single variable space-separated
ENV DB_HOST localhost`}
            </pre>
            <p className="text-secondary mb-0">
              Environment variables defined using <code>ENV</code> are stored inside the image metadata.
              They are available to all subsequent instructions during the build (like `RUN` and `WORKDIR`), and they **remain active when the container is running**.
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
              Imagine building a hotel resort:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                You write into the resort rules that the default thermostat temperature is 72°F (<code>ENV DEFAULT_TEMP=72</code>).
                <br /><br />
                The construction workers use this default setting to test the air vents (build-time). Once the resort is open, the hotel guests check in and see the thermostats set to 72°F by default (runtime).
                However, if a guest prefers it colder, they can manually dial the thermostat down to 68°F (runtime override).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Runtime Overriding */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <h2 className="doc-card-heading">Overriding at Runtime</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              You should avoid baking hardcoded secrets or environment-specific values (like production API domains) permanently inside the image.
            </p>
            <p className="text-secondary mb-0">
              Instead, set a sensible default using <code>ENV</code>, and override it during startup using the <strong>`-e` flag</strong>:
              <br />
              <code className="text-white bg-dark p-1 rounded">docker run -e DB_HOST=prod-db-server my-app-image</code>
            </p>
          </div>
        </div>

        {/* SECTION: .env files */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-file-earmark-lock2-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">What about <code>.env</code> files?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              A <code>.env</code> file is a plain text file that lives on your <strong>local machine</strong> (outside of Docker). It holds key-value pairs of environment variables — one per line — so you don't have to retype them every time you run a container.
            </p>

            <div className="p-3 bg-dark rounded border border-info border-opacity-25 mt-2 mb-3">
              <h6 className="text-info fw-bold small mb-2">Example <code>.env</code> file:</h6>
              <pre className="x-small text-secondary mb-0">
                {`# .env  (lives on your laptop, never built into the image)
DB_HOST=localhost
DB_PORT=5432
DB_PASSWORD=supersecret
NODE_ENV=development`}
              </pre>
            </div>

            <h6 className="text-light fw-bold mt-3 mb-2">How to use it with Docker:</h6>
            <p className="text-secondary small mb-2">
              Pass the entire file to a container at runtime using the <code>--env-file</code> flag. Docker reads each line and injects it as a live environment variable:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-2 x-small mb-3">
              {`# Inject all variables from .env into the running container:
docker run --env-file .env my-app-image`}
            </pre>

            <h6 className="text-light fw-bold mb-2">How Docker Compose uses it automatically:</h6>
            <p className="text-secondary small mb-2">
              If a <code>.env</code> file exists in the same folder as your <code>docker-compose.yml</code>, Compose reads it <strong>automatically</strong>. You can reference the variables using <code>${'$'}{'VARIABLE'}</code> syntax inside the compose file:
            </p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-2 x-small mb-3">
              {`# docker-compose.yml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: ${'$'}{DB_PASSWORD}   # ← pulled from .env automatically
      POSTGRES_HOST: ${'$'}{DB_HOST}`}
            </pre>

            <div className="row g-2 mt-1">
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-success h-100">
                  <span className="badge bg-success mb-2">.env file ✅</span>
                  <ul className="text-secondary x-small mb-0 ps-3">
                    <li className="mb-1">Lives <strong>outside</strong> the image</li>
                    <li className="mb-1">Injected <strong>only at runtime</strong></li>
                    <li className="mb-1">Never baked into layers</li>
                    <li className="mb-1">Safe for secrets (if kept out of Git)</li>
                    <li>Easily swapped per environment (dev/staging/prod)</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded bg-dark border border-danger h-100">
                  <span className="badge bg-danger mb-2">ENV in Dockerfile ⚠️</span>
                  <ul className="text-secondary x-small mb-0 ps-3">
                    <li className="mb-1">Baked <strong>permanently</strong> into the image</li>
                    <li className="mb-1">Visible via <code>docker inspect</code></li>
                    <li className="mb-1"><strong>Never</strong> put passwords here</li>
                    <li className="mb-1">Good for non-secret config defaults</li>
                    <li>Overridable at runtime with <code>-e</code></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="doc-alert doc-alert-danger mt-3 mb-0">
              <i className="bi bi-shield-exclamation"></i>
              <div>
                <h6 className="fw-bold mb-1 text-danger">Security Rule: Always add <code>.env</code> to <code>.gitignore</code>!</h6>
                <p className="mb-0 x-small text-secondary">
                  A <code>.env</code> file typically contains passwords and API keys. If you accidentally commit it to GitHub, those secrets become permanently public in the repo history — even if you delete the file later. Add <code>.env</code> to your <code>.gitignore</code> the moment you create the project!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: ENV vs ARG */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-question-diamond-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">ENV vs. ARG</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              One of the most popular Docker questions concerns the difference between <code>ENV</code> and <code>ARG</code>:
            </p>
            <div className="table-responsive">
              <table className="table table-dark table-striped doc-table mb-0 small">
                <thead>
                  <tr>
                    <th>Characteristic</th>
                    <th>ENV (Environment Variable)</th>
                    <th>ARG (Build Argument)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Build-Time?</strong></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-success">Yes</span></td>
                  </tr>
                  <tr>
                    <td><strong>Runtime?</strong></td>
                    <td><span className="badge bg-success">Yes</span></td>
                    <td><span className="badge bg-danger">No</span> (Fails / Disappears)</td>
                  </tr>
                  <tr>
                    <td><strong>Metadata?</strong></td>
                    <td><span className="badge bg-success">Yes</span> (Saved inside image)</td>
                    <td><span className="badge bg-danger">No</span> (Not inspected)</td>
                  </tr>
                  <tr>
                    <td><strong>CLI Override Flag</strong></td>
                    <td><code>docker run -e VAR=val</code></td>
                    <td><code>docker build --build-arg VAR=val</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            <h6 className="text-light fw-bold">Beginner Example: Setting timezone</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`FROM ubuntu:22.04
# Sets default timezone variable
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Production Example: Combining multiple variables</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
              {`FROM node:20-alpine
WORKDIR /app

# Combine environment settings to avoid layer bloat
ENV NODE_ENV=production \\
    PORT=3000 \\
    API_URL=https://api.myapp.com

COPY . .
EXPOSE $PORT
CMD ["node", "server.js"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: How do you inspect environment variables in a built image?</h6>
                <p className="mb-0 x-small text-secondary">
                  Because <code>ENV</code> variables are saved in the image configuration metadata, you can read them without running the container by using:
                  <br />
                  <code>docker inspect --format='{"{{.Config.Env}}"}' &lt;image-name&gt;</code>
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: Can ENV values reference other ENV values?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> You can interpolate variables inside other variables:
                  <br />
                  <code>ENV ROOT_DIR=/var/www</code>
                  <br />
                  <code>ENV HTML_DIR=$ROOT_DIR/html</code> (resolves to `/var/www/html`)
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
                <span className="text-danger fw-bold">Putting secrets in ENV:</span> Putting database passwords or encryption keys in <code>ENV PASSWORD=secret</code> is a major security flaw. Since image layers are public and metadata is inspectable, those secrets can be read easily by anyone. Use Docker Secrets or runtime environment variables (via vault injectors) instead.
              </li>
              <li>
                <span className="text-danger fw-bold">Creating single-var lines unnecessarily:</span> Declaring 10 variables on 10 separate lines of <code>ENV NAME=val</code> creates unnecessary metadata noise. Group them using backslashes.
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
              Let's build a container that prints a greeting custom-configured by an environment variable:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Write a Dockerfile:
                <pre className="x-small text-secondary mt-1 mb-1">
                  {`FROM alpine
ENV USER_NAME=Developer
CMD echo "Hello, $USER_NAME!"`}
                </pre>
              </li>
              <li className="mb-2">Build it: <code>docker build -t greet .</code></li>
              <li className="mb-2">Run standard: <code>docker run greet</code> (Outputs "Hello, Developer!")</li>
              <li>Run with override: <code>docker run -e USER_NAME=SwarmBoss greet</code> (Outputs "Hello, SwarmBoss!")</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
