import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "overlay2 Storage Driver - Docker Storage",
    description: "Learn how the overlay2 (OverlayFS) storage driver works, its union mount concept, and why it is the modern standard for Docker."
};


export default function OverlayFSPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        overlay2 Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The modern standard for union filesystems in Docker, powered by OverlayFS.
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
                                <code>overlay2</code> is the preferred storage driver for all currently 
                                supported Linux distributions and requires no extra configuration. 
                                It is the improved version of the original <code>overlay</code> driver.
                            </p>
                            <div className="alert alert-dark bg-opacity-25 border-info mt-3">
                                <i className="bi bi-gear-fill me-2 text-info"></i>
                                <strong>Technical Note:</strong> <code>overlay2</code> is the name of the 
                                Docker storage driver, while <strong>OverlayFS</strong> is the underlying 
                                Linux kernel technology it uses.
                            </div>
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
                                <code>overlay2</code> (via OverlayFS) works by "stacking" directories on top of each other and 
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
                                <code>overlay2</code> performs a <strong>Copy-Up</strong> operation.
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

                    {/* SPACE EFFICIENCY & OPTIMIZATION */}
                    <div className="doc-section-card shadow-lg border-success col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-intersect"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Space Efficiency & Layer Optimization
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                A common question is: <strong>Does <code>overlay2</code> actually save space?</strong> 
                                The answer depends on how you write your Dockerfile. 
                                Each <code>RUN</code> instruction creates a new layer on disk.
                            </p>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h3 className="doc-sub-card-title text-danger">Option 1: Separate Layers</h3>
                                        <pre className="doc-code-block mb-2">
{`RUN pip install -r req_light.txt
RUN pip install -r req_llm.txt`}
                                        </pre>
                                        <p className="small text-secondary mb-0">
                                            <strong>Result:</strong> Larger Image. <br />
                                            If the second install upgrades a package from the first, the old files 
                                            remain hidden in the lower layer, still consuming space. 
                                            The <code>pip</code> cache also grows across both layers.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h3 className="doc-sub-card-title text-success">Option 2: Chained (One Layer)</h3>
                                        <pre className="doc-code-block mb-2">
{`RUN pip install -r req_light.txt && \\
    pip install -r req_llm.txt && \\
    rm -rf /root/.cache/pip`}
                                        </pre>
                                        <p className="small text-secondary mb-0">
                                            <strong>Result:</strong> Smallest Image. <br />
                                            All changes happen in a single transaction. Deleting the cache 
                                            within the same <code>RUN</code> command ensures it never gets 
                                            saved to a permanent layer.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-lightbulb-fill me-2"></i>
                                <strong>The Catch:</strong> While Option 2 saves space, Option 1 is better for 
                                <strong> Build Speed</strong>. If only <code>req_llm.txt</code> changes, Docker 
                                can reuse the cached layer for <code>req_light.txt</code>.
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
                            <p>To explicitly use <code>overlay2</code>, update your <code>daemon.json</code> configuration file:</p>
                            <div className="doc-sub-card mb-3">
                                <h3 className="doc-sub-card-title">File Location</h3>
                                <ul className="list-unstyled mb-0 opacity-75 small">
                                    <li><i className="bi bi-ubuntu me-2"></i> <strong>Linux:</strong> <code>/etc/docker/daemon.json</code></li>
                                    <li><i className="bi bi-windows me-2"></i> <strong>Windows:</strong> <code>C:\ProgramData\docker\config\daemon.json</code></li>
                                </ul>
                            </div>
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
