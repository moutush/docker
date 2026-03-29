import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Containerd Image Store - Docker Storage",
    description: "Learn about the containerd image store in Docker Engine, its benefits, and how to enable it."
};

export default function ContainerdStorePage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        containerd Image Store
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The modern default: faster pulls, smaller pushes, and advanced features.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS IT */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-box-seam-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What is the containerd Store?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Starting with Docker 29.0, fresh installations use <strong>containerd</strong> as
                                the default storage engine. It replaces the classic "graph drivers"
                                (like overlay2) with <strong>snapshotters</strong>.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                <strong>Upgrade Note:</strong> if you upgraded from an older version,
                                you're still on the old system. You need to enable this manually.
                            </div>
                        </div>
                    </div>

                    {/* WHY SWITCH */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-stars"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Why use it?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>It enables cutting-edge features that the old store couldn't handle:</p>
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Multi-Platform</h3>
                                    <p className="doc-sub-card-text small">
                                        Build and store images for different chip architectures (Mac/Linux/Windows) locally.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Wasm Support</h3>
                                    <p className="doc-sub-card-text small">
                                        Perfect for running WebAssembly workloads alongside your containers.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Attestations</h3>
                                    <p className="doc-sub-card-text small">
                                        Supports security metadata (SBOMs) and provenance for trusted images.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DISK SPACE TRADE-OFF */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-warning text-dark">
                                <i className="bi bi-sd-card-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Disk Space Trade-off
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>Fair Warning:</strong> This store uses more disk space than <code>overlay2</code>.
                            </p>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #f1e05a' }}>
                                    <div>
                                        <strong>Dual Storage:</strong> It keeps both the <strong>compressed</strong>
                                        layers (for fast pushes) and the <strong>extracted</strong> layers
                                        (for running containers).
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #f1e05a' }}>
                                    <div>
                                        <i className="bi bi-trash3-fill me-2"></i>
                                        <strong>Maintenance:</strong> Use <code>docker image prune</code> regularly
                                        to keep things lean.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ENABLING IT */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-primary text-white">
                                <i className="bi bi-power"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How to Enable It
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>If you're upgrading, add this to your <code>daemon.json</code>:</p>
                            <pre className="doc-code-block">
                                {`{
"features": {
    "containerd-snapshotter": true
}
}`}
                            </pre>
                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div className="ms-2">
                                    <strong>Important:</strong> Switching stores "hides" your existing containers.
                                    They aren't deleted, but you'll need to switch back to see them again.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VERIFICATION */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Check Your Status
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Run this command to see if you're on the new system:</p>
                            <pre className="doc-code-block mb-0">
                                {`docker info -f '{{ .DriverStatus }}'`}
                            </pre>
                            <p className="mt-2 small opacity-75">
                                If you see <code>io.containerd.snapshotter.v1</code>, you're all set!
                            </p>
                        </div>
                    </div>

                    {/* EXPERT Q&A: EXAM STRATEGY */}
                    <div className="doc-section-card shadow-lg border-primary" style={{ gridColumn: '1 / -1' }}>
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-mortarboard-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Expert Q&A: DCA Exam Strategy
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="vstack gap-4">
                                <div>
                                    <h4 className="fs-5 text-primary mb-3">
                                        <i className="bi bi-question-circle me-2"></i>
                                        "Is this more important than overlay2 for the DCA exam?"
                                    </h4>
                                    <p>
                                        <strong>For the Exam: No.</strong> <code>overlay2</code> is still the primary
                                        focus of the current Docker Certified Associate (DCA) curriculum. You should
                                        prioritize understanding <code>overlay2</code> architecture and <code>Copy-on-Write</code>.
                                    </p>
                                    <div className="doc-alert doc-alert-info">
                                        <i className="bi bi-award-fill"></i>
                                        <div>
                                            <strong>DCA Study Tip:</strong> If an exam question asks "What is the
                                            recommended storage driver for modern Linux?", the answer is almost
                                            always <strong>overlay2</strong>.
                                        </div>
                                    </div>
                                </div>

                                <div className="border-top pt-4" style={{ borderTopColor: '#30363d !important' }}>
                                    <h4 className="fs-5 text-primary mb-3">
                                        <i className="bi bi-question-circle me-2"></i>
                                        "Then why learn containerd-store at all?"
                                    </h4>
                                    <p>
                                        Because it is the <strong>Future of Docker</strong>. In
                                        <strong> Senior/Lead Engineer interviews</strong>, you will be expected
                                        to know why Docker is moving away from graph drivers:
                                    </p>
                                    <ul className="small opacity-75">
                                        <li><strong>Wasm:</strong> You can't run WebAssembly workloads natively without the containerd store.</li>
                                        <li><strong>Security (Attestations):</strong> Modern supply chain security (SBOMs) is built into this store.</li>
                                        <li><strong>Performance:</strong> It unifies Docker with the industry-standard <code>containerd</code>, reducing redundancy.</li>
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
