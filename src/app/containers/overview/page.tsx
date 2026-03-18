import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Container Overview - Docker Documentation",
    description: "A deep dive into what Docker containers actually are, how isolation works, and their lifecycle."
};

export default function ContainerOverviewPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        What is a Container? (Deep Dive)
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Moving past the "it's like a VM" myth to understand the reality of isolated processes.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* THE CORE TRUTH */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-box-seam-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Core Truth: It's Just a Process
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you open your Task Manager (or run <code>top</code>/<code>htop</code>),
                                a Docker container looks like any other program running on your computer.
                                It's not a "mini-OS" and it doesn't have a "kernel" of its own.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-lightbulb-fill"></i>
                                <div className="ms-2">
                                    <strong>Noob Metaphor:</strong> Think of a normal process like a person
                                    sitting in a crowded cafe. They can see everyone and hear every conversation.
                                    A <strong>Container</strong> is that same person, but sitting in a
                                    <strong> Soundproof Glass Booth</strong> inside the cafe. They are in
                                    the same room, but they have their own air, their own desk, and can't
                                    be bothered by the noise outside.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE INVISIBLE WALLS (NAMESPACES) */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Namespaces: The "Invisible Walls"
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Namespaces are a Linux Kernel feature that limits what a process can <strong>see</strong>.
                                Docker uses several types to create the illusion of a private computer:
                            </p>
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">PID Namespace</h3>
                                    <p className="doc-sub-card-text small">
                                        Inside the container, your app thinks its Process ID is 1 (the King).
                                        It has no idea there are 300 other processes running on the host.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">NET Namespace</h3>
                                    <p className="doc-sub-card-text small">
                                        The container gets its own IP address and routing table,
                                        separate from your physical WiFi or Ethernet.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">MNT Namespace</h3>
                                    <p className="doc-sub-card-text small">
                                        The container sees its own folder structure (e.g., <code>/bin</code>, <code>/etc</code>)
                                        and cannot see the host's files unless you explicitly let it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE BUDGET (CGROUPS) */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                2. Cgroups: The "Resource Budget"
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                While Namespaces limit what you can <strong>see</strong>,
                                <strong> Control Groups (cgroups)</strong> limit what you can
                                <strong> use</strong>.
                            </p>
                            <ul className="list-unstyled mb-0" style={{ lineHeight: '2' }}>
                                <li><i className="bi bi-check2-circle text-warning me-2"></i> <strong>CPU:</strong> "You can only use 10% of my power."</li>
                                <li><i className="bi bi-check2-circle text-warning me-2"></i> <strong>RAM:</strong> "If you use more than 512MB, you will be terminated."</li>
                                <li><i className="bi bi-check2-circle text-warning me-2"></i> <strong>Bandwidth:</strong> "You can't hog all the internet speed."</li>
                            </ul>
                            <div className="alert alert-dark mt-3 py-2 border-warning opacity-75">
                                <small>Without cgroups, one "noisy neighbor" container could crash your entire server by eating all the RAM.</small>
                            </div>

                            <div className="doc-sub-card border-warning mt-4">
                                <h3 className="doc-sub-card-title text-warning">Practical: How to Set the Budget?</h3>
                                <p className="small text-secondary mb-3">
                                    You can change these values using flags during <code>docker run</code>:
                                </p>
                                <pre className="doc-code-block mb-3">
                                    {`# Limit to 512MB RAM and 1.5 CPUs
docker run -d --name my-app \\
  --memory="512m" \\
  --cpus="1.5" \\
  nginx`}
                                </pre>

                                <p className="small text-secondary mb-3 pt-2 border-top">
                                    In <strong>Docker Compose</strong>, you define it under <code>deploy.resources</code>:
                                </p>
                                <pre className="doc-code-block mb-0">
                                    {`services:
  app:
    image: nginx
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M`}
                                </pre>
                                <div className="doc-sub-cards-grid mt-4">
                                    <div className="doc-sub-card border-info">
                                        <h4 className="doc-sub-card-title text-info small fw-bold">1. image: nginx</h4>
                                        <p className="doc-sub-card-text x-small">
                                            This is the <strong>Official Image</strong> from Docker Hub. 
                                            Docker will search your computer first; if it's not there, it will 
                                            <strong> automatically download (pull)</strong> it for you.
                                        </p>
                                    </div>
                                    <div className="doc-sub-card border-info">
                                        <h4 className="doc-sub-card-title text-info small fw-bold">2. deploy</h4>
                                        <p className="doc-sub-card-text x-small">
                                            This section contains configuration related to how the container is 
                                            <strong> scheduled and managed</strong> on the host (or a cluster).
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    <h4 className="fs-6 fw-bold mb-3"><i className="bi bi-arrow-left-right me-2 text-warning"></i> Limits vs. Reservations</h4>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="p-2 border-start border-danger border-3">
                                                <strong>Limits (The Ceiling):</strong>
                                                <p className="small text-secondary mb-0">The <strong>absolute maximum</strong>. If a container tries to use 513MB when the limit is 512MB, Docker will kill it (OOM Error).</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-2 border-start border-success border-3">
                                                <strong>Reservations (The Floor):</strong>
                                                <p className="small text-secondary mb-0">The <strong>guaranteed minimum</strong>. Docker won't even start the container unless the host has at least this much "free space" available.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* THE WRITABLE LAYER */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-pencil-square"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                3. The Writable Layer
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Remember: Docker Images are <strong>read-only</strong>.
                                When you start a container, Docker simply drops a thin,
                                <strong> Writable Layer</strong> on top of that image.
                            </p>
                            <div className="notes-container">
                                <div className="component-note p-3" style={{ background: '#1c2128', borderLeft: '4px solid #3fb950' }}>
                                    <p className="mb-0">
                                        Any file you create, edit, or delete happens <strong>only</strong> in this
                                        top layer. If you delete the container, this layer vanishes forever.
                                        This is why we say containers are <strong>ephemeral</strong> (temporary).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE LIFECYCLE */}
                    <div className="doc-section-card shadow-lg col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-arrow-repeat"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Container Lifecycle
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Understanding the "Health States" of a container:</p>
                            <div className="row g-4 mt-2">
                                <div className="col-md-4">
                                    <div className="doc-sub-card text-center py-4 border-info h-100">
                                        <div className="fs-1 text-info mb-2"><i className="bi bi-plus-circle"></i></div>
                                        <h4 className="fw-bold">Created</h4>
                                        <p className="small text-secondary px-2">The "Sandwich" is prepared but still in the fridge. Not running yet.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card text-center py-4 border-success h-100">
                                        <div className="fs-1 text-success mb-2"><i className="bi bi-play-circle-fill"></i></div>
                                        <h4 className="fw-bold">Running</h4>
                                        <p className="small text-secondary px-2">The process is alive! It has an IP and is doing work.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card text-center py-4 border-danger h-100">
                                        <div className="fs-1 text-danger mb-2"><i className="bi bi-stop-circle"></i></div>
                                        <h4 className="fw-bold">Stopped (Exited)</h4>
                                        <p className="small text-secondary px-2">The process finished or crashed. The data is still there, but it's "sleeping".</p>
                                    </div>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-info-circle-fill text-info me-2"></i>
                                <div>
                                    <strong>The "Paused" State:</strong> Unlike <em>stopped</em> containers,
                                    <em> paused</em> containers keep their RAM exactly as it was.
                                    The CPU just stops giving them any attention until you <code>unpause</code>.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
