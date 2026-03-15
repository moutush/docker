import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker Bind Mounts - Docker Storage",
    description: "Learn what Docker Bind Mounts are, when to use them, and real-world development examples."
};

export default function DockerBindMountsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker Bind Mounts
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Share files directly between your host machine and Docker containers.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS BIND MOUNT */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className={"bi " + "bi-folder2-open"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                What is a Bind Mount?
                            </h2>
                        </div>

                        <div className="doc-card-body">

                            <p>
                                A <strong>Bind Mount</strong> directly connects a folder from your
                                <strong> host machine</strong> to a folder inside a
                                <strong> container</strong>.
                            </p>

                            <p>
                                This means both the container and your computer are looking at
                                the <strong>same physical files</strong>.
                            </p>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightbulb-fill"></i>
                                <div>
                                    <strong>Simple Idea:</strong><br />
                                    If you edit a file on your laptop, the container immediately sees the change.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BIND VS VOLUME */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className={"bi " + "bi-hdd"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Bind Mount vs Docker Volume
                            </h2>
                        </div>

                        <div className="doc-card-body">

                            <div className="doc-sub-cards-grid">

                                <div className="doc-sub-card">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon">
                                            <i className="bi bi-laptop"></i>
                                        </div>

                                        <h3 className="doc-sub-card-title">
                                            Bind Mount
                                        </h3>
                                    </div>

                                    <div className="doc-sub-card-body">
                                        <ul>
                                            <li>Uses a real folder from your computer</li>
                                            <li>Common for development</li>
                                            <li>Container and host share the same files</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="doc-sub-card">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon">
                                            <i className="bi bi-database"></i>
                                        </div>

                                        <h3 className="doc-sub-card-title">
                                            Docker Volume
                                        </h3>
                                    </div>

                                    <div className="doc-sub-card-body">
                                        <ul>
                                            <li>Managed completely by Docker</li>
                                            <li>Stored in Docker's internal directory</li>
                                            <li>Used mostly for production data</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* WHEN TO USE */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-tools"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                When Bind Mounts Are Used
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <ul style={{ lineHeight: 2 }}>
                                <li>Live code editing during development</li>
                                <li>Sharing configuration files</li>
                                <li>Saving files generated by containers</li>
                                <li>Testing builds without rebuilding images</li>
                            </ul>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-code-slash"></i>
                                <div>
                                    <strong>Example:</strong><br />
                                    React developer edits code locally and the container immediately reflects the change.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BASIC COMMAND */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-terminal"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Basic Bind Mount Command
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Docker supports two ways to create bind mounts.
                            </p>

                            <div className="doc-sub-card">

                                <div className="doc-sub-card-body">

                                    <p><strong>Preferred Method</strong></p>

                                    <pre>
                                        {`docker run --mount type=bind,src=/host-folder,dst=/container-folder`}
                                    </pre>

                                    <p><strong>Shorter Version</strong></p>

                                    <pre>
                                        {`docker run -v /host-folder:/container-folder`}
                                    </pre>

                                </div>

                            </div>

                        </div>
                    </div>

                    {/* REAL WORLD EXAMPLE 1 */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-globe"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Real World Example (Development Workflow)
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Imagine you are developing a Node.js website.
                            </p>

                            <ul style={{ lineHeight: 2 }}>
                                <li>Your code lives on your laptop.</li>
                                <li>You run Node inside a container.</li>
                                <li>You want code changes to update instantly.</li>
                            </ul>

                            <pre>
                                {`docker run -it -v $(pwd):/app node:18`}
                            </pre>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightning-fill"></i>
                                <div>
                                    Edit code locally → container instantly sees changes → no rebuild needed.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* REAL WORLD EXAMPLE 2 */}
                    <div className="doc-section-card shadow-lg border-success">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-box-arrow-down"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Real World Example (Artifact Extraction)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>Scenario:</strong> You build a Linux library (like Tesseract) inside
                                a container and want to "export" the resulting <code>.zip</code> file to a
                                specific folder on your Windows machine (<code>C:/linux-libs/</code>).
                            </p>

                            <div className="doc-sub-card">
                                <h3 className="doc-sub-card-title">Solution: Docker Compose</h3>
                                <pre className="doc-code-block">
                                    {`services:
  builder:
    build: .
    volumes:
      - C:/linux-libs:/output # Bind host folder to /output
    command: sh -c "zip -r /output/tesseract.zip /build/tesseract"`}
                                </pre>
                            </div>

                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-octagon"></i>
                                <div>
                                    <strong>Important:</strong> You <strong>cannot</strong> do this in a
                                    <code> Dockerfile</code>. Dockerfiles are strictly for building the image;
                                    they don't have access to your host's C: drive. You must use a bind mount
                                    at <strong>runtime</strong>.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* READ ONLY */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-shield-lock"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Read-Only Bind Mount
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Sometimes you want the container to <strong>read files but not modify them</strong>.
                            </p>

                            <pre>
                                {`docker run -v $(pwd):/app:ro`}
                            </pre>

                            <p>
                                Here <code>:ro</code> means <strong>Read Only</strong>.
                            </p>

                        </div>
                    </div>

                    {/* BIND MOUNTS IN DOCKER COMPOSE */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-file-earmark-code"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Bind Mounts with Docker Compose
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker Compose makes bind mounts much easier to manage. You define them
                                under the <code>volumes</code> key in your service.
                            </p>

                            <pre className="doc-code-block">
                                {`services:
  web:
    image: nginx:latest
    volumes:
      - ./html:/usr/share/nginx/html # Bind current folder/html to container
      - ./config/nginx.conf:/etc/nginx/nginx.conf:ro # Read-only config file`}
                            </pre>

                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <strong>Confusing Terminology:</strong> Even though it says
                                    <code> volumes:</code>, if you provide a <strong>path</strong> (like
                                    <code> ./html</code>), Docker knows it is a <strong>Bind Mount</strong>.
                                    Docker Compose uses the word "volumes" as a general term for any external storage.
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightbulb-fill"></i>
                                <div>
                                    <strong>Noob Tip:</strong> In Docker Compose, you can use <strong>relative paths</strong>
                                    (like <code>./</code>). Docker will automatically resolve these relative to where
                                    your <code>docker-compose.yml</code> file is located.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}