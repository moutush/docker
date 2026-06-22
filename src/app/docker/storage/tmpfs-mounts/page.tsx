import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker tmpfs Mounts - Docker Storage",
    description: "Learn how to use tmpfs mounts to store temporary, sensitive data in host memory for performance and security."
};

export default function DockerTmpfsMountsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker tmpfs Mounts
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Ultra-fast, temporary storage stored directly in the host's memory.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS TMPFS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-memory"></i>
                            </div>
                            <h2 className="doc-card-heading" id="what-is-tmpfs">
                                What is a tmpfs Mount?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                A <strong>tmpfs mount</strong> is a special type of storage that lives entirely
                                in the <strong>host machine's RAM (Memory)</strong>.
                            </p>
                            <p>
                                Unlike Volumes and Bind Mounts which write to the hard drive,
                                <code>tmpfs</code> is never written to disk.
                            </p>
                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-shield-lock-fill"></i>
                                <div>
                                    <strong>Key Characteristic:</strong><br />
                                    When the container stops, the data is <strong>permanently deleted</strong>.
                                    Nothing is persisted.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WHY USE IT */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-lightning-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="why-tmpfs">
                                Why Use tmpfs?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>There are two main reasons to use memory-based storage:</p>
                            <div className="doc-sub-cards-grid">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">1. Security</h3>
                                    <p className="doc-sub-card-text">
                                        Perfect for sensitive data like passwords, keys, or certificates
                                        that should never be saved to a physical disk.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">2. Speed</h3>
                                    <p className="doc-sub-card-text">
                                        Memory is vastly faster than SSDs. High-frequency logs or caches
                                        can run here to boost container performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LIMITATIONS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="limitations">
                                Critical Limitations
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="mb-3" style={{ lineHeight: 2 }}>
                                <li><strong>Linux Only:</strong> This feature is not available on Windows or Mac hosts.</li>
                                <li><strong>No Sharing:</strong> Unlike volumes, you cannot share a tmpfs mount between containers.</li>
                                <li><strong>Size Limit:</strong> By default, it can take up to 50% of your host's RAM if not limited.</li>
                            </ul>

                            <div className="alert alert-info">
                                <i className="bi bi-question-circle-fill me-2"></i>
                                <strong>Why can't I share it?</strong><br />
                                Since <code>tmpfs</code> lives in <strong>RAM</strong>, it is tied directly to the
                                container's own temporary memory space. It doesn't have a "name" or a "home" on
                                the disk that another container can point to.
                            </div>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-gift-fill me-2"></i>
                                <strong>Noob Analogy:</strong> Think of it like <strong>"Short-Term Memory"</strong>.
                                A volume is like a <strong>Notebook</strong> (you can pass it to a friend), but
                                a <code>tmpfs</code> mount is like a <strong>Thought</strong> inside your head. You
                                can't "share" a thought with someone else's brain without writing it down
                                (disk) first!
                            </div>
                        </div>
                    </div>

                    {/* SYNTAX */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-terminal"></i>
                            </div>
                            <h2 className="doc-card-heading" id="syntax">
                                CLI Mounting Syntax
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>You can use two flags, but <code>--mount</code> is the modern, recommended standard.</p>

                            <h4 className="mt-4 fs-6 text-uppercase opacity-75">Option 1: The Modern Way (Recommended)</h4>
                            <pre className="doc-code-block">
                                {`docker run -d \\
  --name web-app \\
  --mount type=tmpfs,destination=/app/cache \\
  nginx`}
                            </pre>
                            <div className="ps-3 border-start border-primary mt-2 small opacity-75">
                                <strong>--mount:</strong> The explicit way to define storage.<br />
                                <strong>type=tmpfs:</strong> Tells Docker to use RAM, not disk.<br />
                                <strong>destination=/app/cache:</strong> The folder inside the container that will be ultra-fast.
                            </div>

                            <h4 className="mt-4 fs-6 text-uppercase opacity-75">Option 2: The Short Way</h4>
                            <pre className="doc-code-block">
                                {`docker run -d --tmpfs /app/cache nginx`}
                            </pre>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-info-circle"></i>
                                <div>
                                    <strong>Note:</strong> <code>tmpfs</code> mounts do not have a "source" name or path
                                    on the host, only a destination inside the container.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COMPOSE SECTION */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-file-earmark-code-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="compose-tmpfs">
                                tmpfs with Docker Compose
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>For complex setups, Docker Compose uses the <code>tmpfs</code> key:</p>
                            <pre className="doc-code-block">
{`services:
  fast-api:
    image: my-app:latest
    tmpfs:
      - /app/cache
      - /tmp/sessions`}
                            </pre>

                            <h4 className="mt-4 fs-6 text-uppercase opacity-75">What means what?</h4>
                            <ul className="list-group list-group-flush bg-transparent mt-2">
                                <li className="list-group-item bg-transparent text-white border-secondary small">
                                    <strong className="text-info">services:</strong> Defines the heart of your project. Each "service" is a container.
                                </li>
                                <li className="list-group-item bg-transparent text-white border-secondary small">
                                    <strong className="text-info">fast-api:</strong> This is a <strong>Custom Name</strong> you give to your container. You can call it anything (e.g., <code>web</code>, <code>backend</code>).
                                </li>
                                <li className="list-group-item bg-transparent text-white border-secondary small">
                                    <strong className="text-info">tmpfs:</strong> A list of paths inside the container that should live in RAM.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* ADVANCED OPTIONS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-sliders"></i>
                            </div>
                            <h2 className="doc-card-heading" id="advanced-options">
                                Advanced Options
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Control the size and permissions of your memory mount:</p>
                            <pre className="doc-code-block">
                                {`docker run --mount type=tmpfs,dst=/app,tmpfs-size=64m,tmpfs-mode=770 nginx`}
                            </pre>
                            <div className="table-responsive mt-3">
                                <table className="table table-dark table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>tmpfs-size</code></td>
                                            <td>Size in bytes (e.g., <code>64m</code> for 64 Megabytes).</td>
                                        </tr>
                                        <tr>
                                            <td><code>tmpfs-mode</code></td>
                                            <td>File permissions in octal (e.g., <code>700</code>).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-search"></i>
                            </div>
                            <h2 className="doc-card-heading" id="verify">
                                How to Verify
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Run <code>docker inspect</code> and look for the <strong>Mounts</strong> section:</p>
                            <pre className="doc-code-block">
                                {`docker inspect container_name --format '{{ json .Mounts }}'`}
                            </pre>
                            <p className="mt-2 mb-0 opacity-75">
                                You should see <code>"Type": "tmpfs"</code> in the output.
                            </p>
                        </div>
                    </div>

                    {/* EXPERT Q&A */}
                    <div className="doc-section-card shadow-lg border-warning" style={{ gridColumn: '1 / -1' }}>
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-patch-question-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="expert-qa-concurrency">
                                Expert Q&A: tmpfs Concurrency
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="vstack gap-5">
                                {/* QUESTION 1 */}
                                <div>
                                    <h4 className="fs-5 text-warning mb-3">
                                        <i className="bi bi-question-circle me-2"></i>
                                        "What happens if many containers use tmpfs at the same time?"
                                    </h4>
                                    <p>
                                        <strong>Total Isolation.</strong> Unlike Volumes or Bind Mounts, <code>tmpfs</code> is 
                                        strictly private. If 10 containers all mount <code>/app/cache</code> as <code>tmpfs</code>:
                                    </p>
                                    <ul className="small opacity-75">
                                        <li>They each get their own private slice of RAM.</li>
                                        <li>They <strong>cannot</strong> see each other's data.</li>
                                        <li>They will <strong>never</strong> clash or have data conflicts.</li>
                                    </ul>
                                    <div className="doc-alert doc-alert-info mt-3">
                                        <i className="bi bi-cpu-fill"></i>
                                        <div>
                                            <strong>Why?</strong><br />
                                            Each <code>tmpfs</code> mount is a unique instance in the host's memory 
                                            namespace. Container A's RAM "disk" is physically different from Container B's RAM "disk".
                                        </div>
                                    </div>
                                </div>

                                {/* QUESTION 2 */}
                                <div className="border-top pt-5" style={{ borderTopColor: '#30363d !important' }}>
                                    <h4 className="fs-5 text-warning mb-3">
                                        <i className="bi bi-question-circle me-2"></i>
                                        "Can I share a tmpfs mount like a Volume?"
                                    </h4>
                                    <p>
                                        <span className="text-danger fw-bold">Short Answer: No.</span>
                                    </p>
                                    <p>
                                        Docker does not support "Named tmpfs Volumes". If you need to share extremely fast 
                                        data between containers, you have two expert options:
                                    </p>
                                    <ul className="small opacity-75">
                                        <li className="mb-2"><strong>Option A:</strong> Use a standard <strong>Volume</strong> (Docker handles the caching well, and modern SSDs are fast).</li>
                                        <li><strong>Option B:</strong> If you are on a high-performance Linux server, 
                                            mount a <strong>host-level tmpfs folder</strong> (like <code>/dev/shm</code>) 
                                            as a <strong>Bind Mount</strong> to multiple containers.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
