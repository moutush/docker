import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile CMD Command - Docker Documentation",
  description: "Learn how to use the CMD command to set default runtime commands for your containers."
};

export default function DockerfileCmdPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-warning text-dark fs-5 p-2">Runtime</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>CMD Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Defines the default command that runs *automatically* when your container boots up.
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
            <p className="text-secondary">Syntax (Three Forms):</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
{`# 1. Exec Form (Preferred: runs program directly, PID 1)
CMD ["executable", "param1", "param2"]

# 2. Shell Form (runs command in a subshell: /bin/sh -c)
CMD command param1 param2

# 3. Default Parameters Form (used as defaults when ENTRYPOINT is declared)
CMD ["param1", "param2"]`}
            </pre>
            <p className="text-secondary mb-0">
              There can **only be one `CMD` instruction in a Dockerfile**. If you list multiple, only the **last `CMD`** will take effect.
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
              Think of buying a brand new Smart TV:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                When you plug in the TV and turn it on, it is programmed by default to open a specific application, say Netflix (<code>CMD ["netflix"]</code>). 
                <br /><br />
                However, you aren't locked into Netflix. You can take the remote control, override the default, and change the channel to YouTube instead (<code>docker run my-tv youtube</code>).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Overriding */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <h2 className="doc-card-heading">Easily Overridden at Runtime</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              The defining characteristic of <code>CMD</code> is that it is a **default**. If the user specifies any arguments at the end of the <code>docker run</code> command, the entire <code>CMD</code> instruction is ignored.
            </p>
            <div className="p-3 bg-dark rounded border border-primary border-opacity-25 mt-3">
              <span className="badge bg-secondary mb-2">Example: Nginx Default vs. Custom Override</span>
              <p className="text-secondary small mb-1">
                <strong>Standard Run:</strong> <code>docker run nginx</code>
                <br />
                • Runs Nginx web server default config.
              </p>
              <p className="text-secondary small mb-0">
                <strong>Override Command:</strong> <code>docker run nginx bash</code>
                <br />
                • The container skips starting Nginx and opens a bash shell inside the container instead.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Exec vs Shell Form */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-question-diamond-fill"></i>
            </div>
            <h2 className="doc-card-heading">Exec Form vs. Shell Form</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Always prefer the **Exec Form** (using JSON brackets) for <code>CMD</code>. 
            </p>
            <p className="text-secondary mb-0">
              When using the Shell Form (<code>CMD node app.js</code>), Docker wraps your command inside <code>/bin/sh -c</code>. This makes the shell shell-process PID 1 instead of your Node app. 
              Because the shell doesn't forward POSIX signals (like <code>SIGTERM</code>), your application won't shut down gracefully when running <code>docker stop</code>, leading to a 10-second timeout followed by a hard kill (<code>SIGKILL</code>).
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
            <h6 className="text-light fw-bold">Beginner Example: Print Hello World</h6>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
{`FROM alpine:3.18
# Default run outputs a simple greeting
CMD ["echo", "Welcome to Docker Swarm Labs!"]`}
            </pre>

            <h6 className="text-light fw-bold mt-4">Production Example: Python Web App</h6>
            <pre className="doc-code-block mb-0 bg-dark text-light border-secondary p-3 x-small">
{`FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000

# Starts gunicorn application server
CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]`}
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
                <h6 className="fw-bold mb-1 text-info">Question: What happens if there are multiple CMD lines?</h6>
                <p className="mb-0 x-small text-secondary">
                  If you define multiple <code>CMD</code> instructions, Docker **will not fail to build**. However, it only registers the **last** one. All previous <code>CMD</code> statements are completely overwritten and ignored.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do CMD and ENTRYPOINT interact?</h6>
                <p className="mb-0 x-small text-secondary">
                  If a Dockerfile defines both <code>ENTRYPOINT</code> and <code>CMD</code> in Exec format, the <code>ENTRYPOINT</code> is the command that runs, and the <code>CMD</code> elements are appended as **default arguments**.
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
                <span className="text-danger fw-bold">Using single quotes in JSON array:</span> Docker JSON arrays must use **double quotes**. Writing <code>CMD ['python', 'app.py']</code> will cause a compilation error. It must be <code>CMD ["python", "app.py"]</code>.
              </li>
              <li className="mb-2">
                <span className="text-danger fw-bold">Running foreground applications:</span> If you run a background daemon using CMD (like <code>service nginx start</code>), the script finishes instantly and the container will exit (die) immediately. Containers need a **long-running foreground process** (PID 1) to stay alive.
              </li>
              <li>
                <span className="text-danger fw-bold">Bundling multiple words/arguments into one string:</span> If your command has 3 or more words, **every single word must be its own independent, quoted string in the JSON array**. For example, writing <code>CMD ["python", "app.py --port 8080"]</code> will crash because Docker will search for a single file literally named `app.py --port 8080` (with spaces inside the file name!). The correct way is to break every word out: <code>CMD ["python", "app.py", "--port", "8080"]</code>.
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
              Write a Dockerfile that prints a custom ASCII art of your name by default using <code>echo</code>.
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Base: <code>FROM alpine</code></li>
              <li className="mb-2">CMD: <code>CMD ["echo", "   [YOUR NAME]   "]</code></li>
              <li>Build and test: Run `docker build -t name-art .` and run it: `docker run name-art`. Check that it prints. Try to override it by running `docker run name-art echo "override"`.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
