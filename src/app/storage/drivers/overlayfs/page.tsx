import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "OverlayFS Storage Driver - Docker Storage",
    description: "Learn how the OverlayFS (overlay2) storage driver works, its union mount concept, and performance considerations."
};

export default function OverlayFSPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        OverlayFS Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The modern standard for union filesystems in Docker.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* STATUS NOTE */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-info-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Driver Status
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                While <code>overlay2</code> is currently the most used driver, 
                                Docker is transitioning toward the <strong>containerd image store</strong>. 
                                Modern systems use the <code>overlayfs</code> containerd snapshotter by default.
                            </p>
                        </div>
                    </div>

                    {/* THE CORE CONCEPT */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-layers-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Union Mount Concept
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                OverlayFS works by "stacking" directories on top of each other and 
                                presenting them as one single directory.
                            </p>
                            
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Lower Directory (lowerdir)</h3>
                                    <p className="doc-sub-card-text">
                                        These are your <strong>read-only</strong> image layers. 
                                        Docker can stack up to 128 of these.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Upper Directory (upperdir)</h3>
                                    <p className="doc-sub-card-text">
                                        This is the <strong>writable</strong> layer of your running container. 
                                        Any changes you make go here.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Merged View (merged)</h3>
                                    <p className="doc-sub-card-text">
                                        The final view where you see files from both layers combined 
                                        as if they were in one folder.
                                    </p>
                                </div>
                            </div>
                        </div>

                    {/* NOOB ANALOGY */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-lightbulb"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Noob Analogy: The Tracing Paper
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Think of OverlayFS like <strong>staring through layers of tracing paper</strong>:
                            </p>
                            <ul className="list-unstyled" style={{ lineHeight: '1.8' }}>
                                <li>
                                    <i className="bi bi-check2 text-info me-2"></i>
                                    <strong>The Bottom Sheets (Images):</strong> Are permanent drawings.
                                </li>
                                <li>
                                    <i className="bi bi-check2 text-info me-2"></i>
                                    <strong>The Top Sheet (Container):</strong> Is where you draw new things.
                                </li>
                                <li>
                                    <i className="bi bi-check2 text-info me-2"></i>
                                    <strong>Merged View:</strong> Is what you see when you look down at the 
                                    entire stack.
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>

                    {/* PREREQUISITES */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-warning text-dark">
                                <i className="bi bi-check-all"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Prerequisites
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                                <li>
                                    <i className="bi bi-arrow-right-short text-warning me-2"></i>
                                    <strong>Kernel:</strong> Linux 4.0 or higher.
                                </li>
                                <li>
                                    <i className="bi bi-arrow-right-short text-warning me-2"></i>
                                    <strong>Filesystem:</strong> If using XFS as a backing store, <code>d_type=true</code> must be enabled.
                                </li>
                                <li>
                                    <i className="bi bi-arrow-right-short text-warning me-2"></i>
                                    <strong>Note:</strong> Changing drivers will make existing images inaccessible.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* HOW WRITES WORK */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-pencil-square"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How Writes Work (Copy-Up)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                When you modify a file that exists in the image (lowerdir), 
                                OverlayFS performs a <strong>Copy-Up</strong> operation.
                            </p>
                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightning-fill text-info me-2"></i>
                                <div>
                                    <strong>The Performance Drawback:</strong> OverlayFS copies the <strong>entire file</strong> 
                                    to the writable layer, even if you only change one character. Large files can cause 
                                    a momentary lag during the first write.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERFORMANCE TIPS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-speedometer"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Performance Tips
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Page Cache Sharing:</strong> <br />
                                        OverlayFS is great for high-density servers because multiple containers 
                                        share the same memory cache for image files.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Use Volumes:</strong> <br />
                                        For apps that write constantly (Databases), always use Volumes to 
                                        bypass the copy-up overhead.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONFIGURATION */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-terminal"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Quick Configuration
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>To explicitly use <code>overlay2</code>, update your <code>daemon.json</code>:</p>
                            <pre className="doc-code-block">
                                {`{
  "storage-driver": "overlay2"
}`}
                            </pre>
                            <p className="mt-3 fs-7 opacity-75">
                                <i className="bi bi-search me-2"></i>
                                Run <code>docker info</code> to verify: "Storage Driver: overlay2"
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
