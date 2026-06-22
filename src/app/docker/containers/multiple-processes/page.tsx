import React from 'react';

export default function MultipleProcessesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-4 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Running Multiple Processes
                    </h1>

                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Discover strategies for handling multi-service environments within a single container.
                    </p>
                </div>

                <div className="doc-alert doc-alert-warning mb-5 shadow-sm">
                    <i className="bi bi-lightbulb-fill fs-4"></i>
                    <div>
                        <strong>It's mostly hacky alien tech!</strong><br />
                        If reading the methods on this page makes you feel like you're looking at weird "alien tech hacks"... <strong>you are 100% right</strong>. In modern development, you should almost always just use <code>Docker Compose</code> to run your web server and background workers in <em>separate</em> containers. Only use the "Wrapper Script" or "Process Manager" hacks below if you are forced to cram a legacy app into a single container!
                    </div>
                </div>

                <div className="doc-content-grid">

                    {/* SECTION 1: THE GOLDEN RULE & RESOURCES */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-star-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="golden-rule">
                                The Golden Rule: 1 Process = 1 Container
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                A container's main running process is the <code>ENTRYPOINT</code> and/or <code>CMD</code> at the end of the <code>Dockerfile</code>.
                                It's a fundamental best practice to <strong>separate areas of concern</strong> by using one service per container.
                            </p>

                            <p className="text-secondary small">
                                For example, rather than putting a FastAPI app and a Postgres database in one container, run them in separate containers and connect them using Docker networks.
                            </p>

                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong>Is it "ok" to have multiple processes?</strong><br />
                                    Yes! Sometimes a service naturally forks into child processes (e.g., an Apache server spawning workers, or Celery firing up sub-workers). However, try to avoid making one container responsible for completely different aspects of your application.
                                </div>
                            </div>

                            <h5 className="fs-5 fw-bold mb-3 border-top border-secondary border-opacity-25 pt-4">Zombie Reaping: The <code>--init</code> Flag</h5>

                            <p className="text-secondary small mb-2">
                                When a container runs, the main process is given Process ID 1 (PID 1). It becomes responsible for managing—and cleaning up—any child processes it starts. If it fails to do this nicely, you end up with "zombie" processes taking up system resources.
                            </p>

                            <p className="text-secondary small">
                                If your app crashes and doesn't handle "reaping" gracefully, you can use the <code>--init</code> option.
                            </p>

                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code>docker run -d --init --name fastapi-app my-fastapi-image</code>
                            </pre>

                            <p className="text-secondary small mb-3">
                                This inserts a tiny init-process as PID 1 that correctly handles reaping child processes when the container exits, which is <strong>far superior</strong> to shoving heavy system tools like <code>systemd</code> inside your container.
                            </p>

                            <div className="doc-alert doc-alert-secondary mb-0">
                                <i className="bi bi-question-circle-fill"></i>
                                <div>
                                    <strong>Q: Do I always need to use <code>--init</code> for every container?</strong><br/>
                                    <strong>No!</strong> If you only have one main process (like a standard Node.js or Python API) that doesn't spawn child workers, you rarely need it. You only need <code>--init</code> if your app explicitly spawns sub-processes (like Celery workers) or if you are using a wrapper script and notice "zombie" processes hanging around in your container over time.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: WRAPPER SCRIPTS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-primary">
                            <div className="heading-icon">
                                <i className="bi bi-file-earmark-code-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="wrapper-scripts">
                                Method 1: The Wrapper Script
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                If you absolutely must start a web server and a background worker (like FastAPI and Celery) inside the same container, you can write a simple Bash script. All commands are run in the background (<code>&</code>), and the script waits for one of them to exit.
                            </p>

                            <h5 className="fs-6 fw-bold mb-2">1. The <code>entrypoint.sh</code> Script</h5>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code className="text-info">{`#!/bin/bash

# Start FastAPI Web Server in the background
uvicorn main:app --host 0.0.0.0 --port 80 &

# Start Celery Worker in the background
celery -A core worker --loglevel=info &

# Wait for ANY process to exit
wait -n

# Exit with status of process that exited first
exit $?`}</code>
                            </pre>

                            <h5 className="fs-6 fw-bold mb-2">2. The <code>Dockerfile</code></h5>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0">
                                <code className="text-warning">{`# syntax=docker/dockerfile:1
FROM python:3.9-slim

# ... install dependencies ...
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the wrapper as the main startup command
CMD ["/entrypoint.sh"]`}</code>
                            </pre>
                        </div>
                    </div>

                    {/* SECTION 3: BASH JOB CONTROLS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-info">
                            <div className="heading-icon">
                                <i className="bi bi-terminal-split"></i>
                            </div>
                            <h2 className="doc-card-heading" id="bash-jobs">
                                Method 2: Bash Job Controls
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                Sometimes you have a main process, but you need to run a temporary "helper" script right before or during startup (e.g., waiting for the database to be ready, or running database migrations). You can leverage Bash's built-in job controls (<code>set -m</code>).
                            </p>

                            <h5 className="fs-6 fw-bold mb-2">The <code>run.sh</code> Script</h5>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0">
                                <code className="text-success">{`#!/bin/bash

# Turn on bash's job control
set -m

# Start the primary process and put it in the background
gunicorn core.wsgi:application --bind 0.0.0.0:8000 &

# Run your helper process (e.g. running django migrations)
python manage.py migrate

# Once the helper finishes, bring the primary process (gunicorn) 
# back into the foreground and leave it there
fg %1`}</code>
                            </pre>
                        </div>
                    </div>

                    {/* SECTION 4: PROCESS MANAGERS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="supervisord">
                                Method 3: Process Managers (supervisord)
                            </h2>
                        </div>

                        <div className="doc-card-body">

                            <div className="doc-alert doc-alert-danger mb-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <strong>Before you do this!</strong><br />
                                    As discussed in the <a href="/containers/starting-automatically" className="text-danger text-decoration-underline fw-bold">Starting Automatically</a> guide, using an internal process manager hides container crashes from Docker itself. Only use this if absolutely necessary for complex legacy applications.
                                </div>
                            </div>

                            <p className="text-secondary small">
                                This approach is more involved. It requires you to install <code>supervisord</code> directly into your image, configure it, and tell Docker to execute <code>supervisord</code> as PID 1.
                            </p>

                            <h5 className="fs-6 fw-bold mb-2">1. <code>supervisord.conf</code></h5>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code className="text-secondary opacity-75">{`[supervisord]
nodaemon=true
logfile=/dev/null
logfile_maxbytes=0

[program:fastapi]
command=uvicorn main:app --host 0.0.0.0 --port 80
stdout_logfile=/dev/fd/1
stdout_logfile_maxbytes=0
redirect_stderr=true

[program:celery]
command=celery -A core worker --loglevel=info
stdout_logfile=/dev/fd/1
stdout_logfile_maxbytes=0
redirect_stderr=true`}</code>
                            </pre>

                            <h5 className="fs-6 fw-bold mb-2">2. The <code>Dockerfile</code></h5>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0">
                                <code className="text-warning">{`# syntax=docker/dockerfile:1
FROM python:3.9-slim

# Install supervisor alongside your app dependencies
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor

# Copy config and code
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY . /app
WORKDIR /app

# Run supervisor as the main process
CMD ["/usr/bin/supervisord"]`}</code>
                            </pre>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
