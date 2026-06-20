import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile WORKDIR Command - Docker Documentation",
  description: "Learn how to use the WORKDIR command to set the working directory for your instructions."
};

export default function DockerfileWorkdirPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-secondary fs-5 p-2">Metadata</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>WORKDIR Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Sets the context. Establishes the working directory for any subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD commands.
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
{`# Sets working directory to /usr/src/app
WORKDIR /usr/src/app`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>WORKDIR</code> instruction acts like a persistent <code>cd</code> command inside the Dockerfile. 
              If the directory specified does not exist, **Docker will automatically create it** for you (even nested directories like `/a/b/c`).
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
              Imagine moving boxes into a new multi-room house:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                Instead of carrying books from the driveway and writing on each box: *"Place this book in bedroom 2 shelf A"*, *"Place this other book in bedroom 2 shelf B"* (absolute paths).
                <br /><br />
                You first physically walk into **Bedroom 2** (<code>WORKDIR /bedroom2</code>). 
                Once inside the room, all your instructions are simple and relative: *"Put this book on shelf A"*, *"Put this book on shelf B"* (relative files).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Relative Path Resolution */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-diagram-2-fill"></i>
            </div>
            <h2 className="doc-card-heading">Relative Path Resolution (Chaining)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If you supply a relative path, it will be resolved relative to the path of the previous <code>WORKDIR</code> instruction.
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd`}
            </pre>
            <p className="text-secondary mb-0">
              What is the output of the `pwd` command? 
              <br />
              It will output **`/a/b/c`**. This nesting can become confusing, so using absolute paths (starting with `/`) is highly recommended to maintain clarity.
            </p>
          </div>
        </div>

        {/* SECTION: Why cd Doesn't Work */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-x-octagon-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Why "RUN cd" Does NOT Work</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              One of the most common beginner mistakes is trying to use <code>RUN cd /app</code> to change directories.
            </p>
            <p className="text-secondary mb-0">
              Recall that **each RUN statement executes in a completely separate shell process and a new filesystem layer**. 
              When <code>RUN cd /app</code> finishes, its shell process terminates immediately, and the directory change is forgotten. 
              The next instruction reverts right back to the root directory. To change directories persistently, you **must** use <code>WORKDIR</code>.
            </p>
          </div>
        </div>

        {/* SECTION: What happens without WORKDIR */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-exclamation-octagon-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">What Happens If You Skip WORKDIR?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-3">
              If you never declare a <code>WORKDIR</code>, Docker starts all commands from <code>/</code> — the root of the container filesystem. This causes three real problems:
            </p>
            <div className="p-3 bg-dark rounded border border-danger border-opacity-25 mb-3">
              <h6 className="text-danger x-small mb-2">❶ Your Files Land in <code>/</code> (The OS Root)</h6>
              <p className="x-small text-secondary mb-2">Every <code>COPY . .</code> dumps your files directly alongside critical OS folders:</p>
              <pre className="x-small text-warning mb-0">{`/app.py   ← your code, mixed in with OS files
/bin      ← OS binaries
/etc      ← OS configs
/usr      ← OS programs`}</pre>
            </div>
            <div className="p-3 bg-dark rounded border border-danger border-opacity-25 mb-3">
              <h6 className="text-danger x-small mb-2">❷ Name Collisions Can Silently Corrupt the Container</h6>
              <p className="x-small text-secondary mb-0">
                If your project has a folder named <code>lib</code>, <code>bin</code>, or <code>var</code> (extremely common in Python/Node projects), it will <strong>merge with or overwrite</strong> the OS&apos;s <code>/lib</code>, <code>/bin</code>, or <code>/var</code>. The container may start successfully but crash at runtime in ways that are nearly impossible to debug.
              </p>
            </div>
            <div className="p-3 bg-dark rounded border border-danger border-opacity-25 mb-3">
              <h6 className="text-danger x-small mb-2">❸ CMD Requires Ugly Hardcoded Paths</h6>
              <pre className="x-small text-secondary mb-0">{`# ✗ Without WORKDIR — full absolute path required every time
CMD ["python", "/var/www/app/src/main.py"]

# ✓ With WORKDIR /app — clean, readable, portable
WORKDIR /app
CMD ["python", "src/main.py"]`}</pre>
            </div>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">The Mental Model:</strong> <code>WORKDIR /app</code> is the Dockerfile equivalent of <code>mkdir /app &amp;&amp; cd /app</code>. It creates the folder if it doesn&apos;t exist, and all subsequent commands run from inside that clean, isolated folder — completely separate from the OS.
              </div>
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
            <h6 className="text-light fw-bold">Bad Example (Repetitive Absolute Paths)</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18
RUN mkdir /my-app
COPY script.sh /my-app/script.sh
RUN chmod +x /my-app/script.sh
CMD ["/my-app/script.sh"]`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Good Example (Clean, Relative Paths)</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18
# Setup and switch context
WORKDIR /my-app

# Relative files automatically go into /my-app/
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: Does WORKDIR accept environment variables?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> <code>WORKDIR</code> can resolve environment variables declared using the <code>ENV</code> instruction:
                  <br />
                  <code>ENV APP_DIR=/var/node/app</code>
                  <br />
                  <code>WORKDIR $APP_DIR</code> (resolves to `/var/node/app`)
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: What is the default directory if WORKDIR is not set?</h6>
                <p className="mb-0 x-small text-secondary">
                  If you don't specify a <code>WORKDIR</code>, it defaults to the root directory (<code>/</code>). However, some third-party base images (like Node, Nginx) might pre-configure their own default directories, so it's always best practice to declare your own explicitly.
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
                <span className="text-danger fw-bold">Using relative WORKDIR statements blindly:</span> e.g. <code>WORKDIR src</code>, followed by other files. If a base image had a default folder of `/home`, your files land in `/home/src`. Always start your first WORKDIR with a leading slash to anchor it (e.g. `/app`).
              </li>
              <li>
                <span className="text-danger fw-bold">Creating permissions blockages:</span> If you run <code>WORKDIR /app</code>, Docker creates the directory under root ownership. If you switch to a non-root user (e.g. <code>USER node</code>) later, that user won't have write access to `/app`.
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
              Predict the final directory path from this chain:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`WORKDIR /var/log
WORKDIR nginx
WORKDIR /etc
WORKDIR cron`}
            </pre>
            <p className="small text-secondary mb-0">
              <strong>Answer:</strong>
              <br />
              It will be **`/etc/cron`**. 
              Why? Because `/etc` starts with a leading slash, which overrides the previous `/var/log/nginx` path and resets the base. Then `cron` is appended relatively to `/etc`.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
