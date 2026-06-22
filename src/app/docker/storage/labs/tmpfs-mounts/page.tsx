import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "tmpfs Mounts Lab - Docker Documentation",
    description: "Learn how to use in-memory tmpfs mounts for high security and performance storage that never hits the host disk."
};

export default function TmpfsMountsLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: tmpfs Mounts
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        In-memory only storage for maximum security and blazing fast performance.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE SECURITY LEAK */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-slash-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The Security Leak
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Imagine you are building an application that generates highly sensitive temporary encryption keys while processing payments. 
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-hdd text-warning me-2"></i>The Writable Layer Risk</h5>
                                        <p className="small text-secondary mb-2">
                                            If you don't specify storage, the app writes these keys to the container's writable layer.
                                        </p>
                                        <p className="small text-warning fw-bold mb-0">
                                            This writes the data directly to the host's physical hard drive.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h5 className="fw-bold fs-6 text-danger"><i className="bi bi-exclamation-octagon-fill me-2"></i>The Attack Vector</h5>
                                        <ul className="small text-secondary mb-0">
                                            <li className="mb-2">Even after the container stops, the data might remain on the disk.</li>
                                            <li className="mb-2">If the server is compromised or physically stolen, hackers can recover the keys using disk forensics.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <h5 className="fw-bold fs-6 text-success mt-4">The Solution: tmpfs Mounts</h5>
                            <p className="small text-secondary mb-0">
                                A <code>tmpfs</code> mount is a temporary file storage facility created entirely in the host machine's RAM (system memory). It is never written to the host's non-volatile storage (SSD/HDD).
                            </p>
                        </div>
                    </div>

                    {/* 2. CREATING A TMPFS MOUNT */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-lightning-charge-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                2. Creating a tmpfs Mount
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                We create a <code>tmpfs</code> mount using the modern <code>--mount</code> flag by specifying <code>type=tmpfs</code>.
                            </p>

                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker run -d \\
  --name secure-app \\
  --mount type=tmpfs,destination=/app/secrets \\
  nginx:latest`}
                            </pre>

                            <div className="doc-alert doc-alert-info mt-4 p-3">
                                <div>
                                    <strong className="d-block mb-1">The Result</strong>
                                    <p className="mb-0 x-small text-dark">
                                        Any files the container writes into <code>/app/secrets</code> are stored directly in the host's RAM. It is blazingly fast because it bypasses all disk I/O bottlenecks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE DCA GOTCHA: LIFECYCLE AND DATA LOSS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-eraser-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                3. The DCA Gotcha: Instant Deletion
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The DCA exam frequently tests your understanding of exactly when <code>tmpfs</code> data is destroyed.
                            </p>

                            <div className="p-3 rounded border border-warning mb-3" style={{ background: 'rgba(255, 193, 7, 0.05)' }}>
                                <h5 className="fw-bold text-warning"><i className="bi bi-trash-fill me-2"></i>The Volatility Rule</h5>
                                <p className="small text-light mb-0">
                                    When a container using a <code>tmpfs</code> mount is stopped or removed, the <code>tmpfs</code> mount is immediately unmounted, and <strong>all data is permanently lost.</strong>
                                </p>
                            </div>

                            <p className="small text-secondary mb-0">
                                <strong>Exam Tip:</strong> Never use <code>tmpfs</code> for databases or anything requiring persistent state. It is strictly for security (secrets) or performance (caching, temporary processing).
                            </p>
                        </div>
                    </div>

                    {/* 4. THE DCA GOTCHA: PLATFORM LIMITATIONS */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-pc-display"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                4. The DCA Gotcha: Platform Limitations
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Just like the <code>host</code> networking driver, <code>tmpfs</code> relies heavily on the underlying operating system kernel.
                            </p>

                            <div className="p-3 rounded border border-danger mb-0" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-exclamation-circle-fill me-2"></i>Linux Only</h5>
                                <p className="small text-light mb-0">
                                    <strong>Exam Tip:</strong> <code>tmpfs</code> mounts are only supported if you are running Docker on <strong>Linux</strong>. They are not natively supported on Windows containers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. THE DCA GOTCHA: NO SHARING */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                5. The DCA Gotcha: No Container Sharing
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Unlike Volumes and Bind Mounts, which are designed to allow multiple containers to share the exact same files simultaneously...
                            </p>
                            
                            <div className="p-3 rounded border border-info mb-0" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <p className="small text-light mb-0">
                                    <strong>Exam Tip:</strong> A <code>tmpfs</code> mount cannot be shared among containers. It is entirely isolated to the single container that created it.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
