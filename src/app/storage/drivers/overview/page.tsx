import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Storage Overview - Docker Storage",
    description: "Understand the fundamentals of Docker storage drivers, why they are mandatory, and how to configure them."
};

export default function StorageOverviewPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Storage Drivers Overview
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The engine room of Docker's filesystem: understanding storage drivers.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS A STORAGE DRIVER */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-hdd-network-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What is a Storage Driver?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                In simple terms, a <strong>Storage Driver</strong> is the "translator"
                                that tells Docker how to save and manage files on your hard drive.
                                It handles the complex logic of stacking image layers and making
                                them appear as a single filesystem to your container.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-lightbulb"></i>
                                <div className="ms-2">
                                    <strong>Noob Analogy:</strong> Think of it as the "File Manager" for
                                    Docker. Without it, Docker wouldn't know how to "squash" multiple
                                    layers together into a working container.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REAL WORLD ANALOGY */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-stack"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Real World: The Glass Plate Analogy
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Imagine you have a stack of <strong>clear glass plates</strong>:
                            </p>
                            <ul className="list-unstyled" style={{ lineHeight: '1.8' }}>
                                <li className="mb-2">
                                    <i className="bi bi-layers me-2 text-info"></i>
                                    <strong>The Base Plates (Image Layers):</strong> Each plate has some
                                    drawings fixed on it. Once stacked, you can see all the drawings from
                                    the top. You can't change these plates; they are permanent.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-pencil-fill me-2 text-warning"></i>
                                    <strong>The Top Plate (Container Layer):</strong> This is a blank,
                                    writable plate on top. You can use a marker to add new drawings or
                                    "black out" things on the plates below.
                                </li>
                                <li>
                                    <i className="bi bi-eye-fill me-2 text-success"></i>
                                    <strong>The Result:</strong> When you look down from the top, you see one
                                    single, combined picture. That is exactly what a storage driver
                                    (OverlayFS) does for Docker!
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* WHY IS IT MANDATORY */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-exclamation-octagon-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Why is it Mandatory?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker containers are built using <strong>layers</strong>. A storage
                                driver is absolutely required because something needs to manage:
                            </p>
                            <ul className="list-unstyled" style={{ lineHeight: '1.8' }}>
                                <li>
                                    <i className="bi bi-check2 text-primary me-2"></i>
                                    <strong>Read-Only Layers:</strong> Keeping the base image safe.
                                </li>
                                <li>
                                    <i className="bi bi-check2 text-primary me-2"></i>
                                    <strong>The Writable Layer:</strong> Letting the container save temp files.
                                </li>
                                <li>
                                    <i className="bi bi-check2 text-primary me-2"></i>
                                    <strong>Copy-on-Write:</strong> Efficiently copying files only when they change.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* THE DEFAULT BEHAVIOR */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-robot"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What if I don't pick one?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you don't mention a storage driver, <strong>Docker won't crash</strong>.
                                Instead, it will look at your Linux distro and automatically pick the
                                <strong> best available driver</strong> for your kernel.
                            </p>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        On modern Linux, Docker almost always defaults to
                                        <strong> overlay2</strong>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HOW TO SET IT */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How to Specify a Driver
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                To force Docker to use a specific driver (like <code>btrfs</code> or
                                <code>zfs</code>), you need to edit the Docker daemon configuration file:
                            </p>
                            <div className="doc-sub-card">
                                <h3 className="doc-sub-card-title">File Location</h3>
                                <p className="small mb-2 text-secondary">/etc/docker/daemon.json</p>
                                <pre className="doc-code-block mb-0">
                                    {`{
  "storage-driver": "overlay2"
}`}
                                </pre>
                            </div>
                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                <strong>Pro-Tip:</strong> You must restart Docker (<code>sudo systemctl restart docker</code>)
                                for the changes to take effect.
                            </div>
                        </div>
                    </div>

                    {/* COW COMPARISON */}
                    <div className="doc-section-card shadow-lg border-primary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                CoW Comparison: RAM vs. Reliability
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>While all standard drivers use Copy-on-Write, their <strong>architectural impact</strong> is very different:</p>
                            <div className="table-responsive">
                                <table className="table table-dark table-sm mb-0">
                                    <thead>
                                        <tr>
                                            <th>Driver</th>
                                            <th>Memory Profile</th>
                                            <th>Key Strategy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>overlay2</strong> (OverlayFS)</td>

                                            <td className="text-success small">Ultra Efficient</td>
                                            <td className="small">Shares Linux Page Cache across containers.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>btrfs</strong></td>
                                            <td className="text-info small">Standard CoW</td>
                                            <td className="small">Uses native "Subvolumes" to manage layers at the block level.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>zfs</strong></td>
                                            <td className="text-danger small fw-bold">RAM Intensive</td>
                                            <td className="small">Uses **ARC cache**. Can consume gigabytes of RAM to boost speed.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* ADVANCED INTERVIEW Q&A */}
                    <div className="doc-section-card shadow-lg border-warning col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-question-diamond-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Advanced Interview Q&A
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="notes-container">
                                <div className="component-note mb-4 p-4" style={{ background: '#1c2128', borderLeft: '4px solid #e3b341' }}>
                                    <h4 className="text-warning mb-2"><i className="bi bi-chat-right-dots-fill me-2"></i> Q: Can I run 5 different drivers for 5 different projects on one machine?</h4>
                                    <p className="mb-3">
                                        <strong>The Short Answer:</strong> No, not with a single Docker Daemon.
                                    </p>
                                    <p className="mb-0">
                                        <strong>The Expert Answer:</strong> A single Docker Daemon (the <code>dockerd</code> process)
                                        can only load <strong>one</strong> storage driver at any given time. If you change the
                                        driver in <code>daemon.json</code>, you have to restart Docker, and your old
                                        images/containers become invisible (because they were "written" in a different language).
                                    </p>
                                </div>

                                <div className="component-note mb-4 p-4" style={{ background: '#1c2128', borderLeft: '4px solid #3fb950' }}>
                                    <h4 className="text-success mb-2"><i className="bi bi-shield-check-fill me-2"></i> Q: If the driver is different on Dev and Prod, does "Works on my Machine" come back?</h4>
                                    <p className="mb-3">
                                        <strong>The Truth:</strong> Technically no, but practically... maybe.
                                    </p>
                                    <p className="mb-3">
                                        <strong>Why it's portable:</strong> Dockerfiles create images as a series of
                                        <em> compressed tarballs</em>. When you move an image from a <code>VFS</code>
                                        machine to a <code>ZFS</code> machine, Docker unzips those tarballs and
                                        stores them using the local driver's logic. The <strong>content</strong> is
                                        identical.
                                    </p>
                                    <p className="mb-2 text-secondary small">
                                        <strong>The Senior Warning:</strong> While the files are the same, the
                                        <em> performance</em> isn't. An app that works fine on <code>overlay2</code> might
                                        suffer from "Copy-Up" lag on a custom driver, or fail if it relies on
                                        specific filesystem behaviors like hard-link limits.
                                    </p>
                                    <div className="alert alert-info bg-dark mt-2 py-2">
                                        <i className="bi bi-gift-fill me-2"></i>
                                        <strong>Noob Analogy:</strong> Think of a Docker Image as a <strong>Recipe</strong>
                                        and the Storage Driver as your <strong>Kitchen</strong>. The recipe is the same
                                        everywhere, but baking a cake in a professional oven (ZFS) is much faster and
                                        more reliable than using a literal campfire (VFS). The cake looks the same,
                                        but the "baking experience" is totally different!
                                    </div>
                                </div>

                                <h4 className="doc-sub-card-title mb-3">How to bypass the "One Driver" limit:</h4>
                                <div className="doc-sub-cards-grid">
                                    <div className="doc-sub-card">
                                        <h3 className="doc-sub-card-title">Docker-in-Docker (DinD)</h3>
                                        <p className="doc-sub-card-text small">
                                            Run a "Child Docker" inside a container. The child can use <code>vfs</code>
                                            while the host uses <code>overlay2</code>. Great for CI/CD pipelines.
                                        </p>
                                    </div>
                                    <div className="doc-sub-card">
                                        <h3 className="doc-sub-card-title">Virtual Machines</h3>
                                        <p className="doc-sub-card-text small">
                                            Run different projects in different VMs (using Vagrant or Proxmox),
                                            each with its own specialized storage backend.
                                        </p>
                                    </div>
                                    <div className="doc-sub-card">
                                        <h3 className="doc-sub-card-title">Docker Contexts</h3>
                                        <p className="doc-sub-card-text small">
                                            Use <code>docker context</code> to switch between different local/remote
                                            daemons optimized for specific storage needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DCA EXAM PRACTICE */}
                    <div className="doc-section-card shadow-lg col-md-12 mt-4" style={{ border: '2px solid #58a6ff' }}>
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-mortarboard-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                DCA Exam Practice (Common Pitfalls)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="mb-4">
                                The Docker Certified Associate (DCA) exam often tests your knowledge of 
                                subtle storage behaviors. Here are the top 3 "Exam Traps":
                            </p>

                            <div className="doc-sub-cards-grid">
                                 <div className="doc-section-card shadow-lg bg-dark bg-opacity-25 border-info">
                                    <h3 className="doc-sub-card-title text-info fs-5">1. The Missing Path Trap</h3>
                                    <p className="doc-sub-card-text small mb-3">
                                        <strong>Question:</strong> What happens if the source folder doesn't exist?
                                    </p>
                                    
                                    <div className="vstack gap-3 mb-3">
                                        <div className="p-3 rounded bg-dark" style={{ borderLeft: '3px solid #f1e05a' }}>
                                            <div className="fw-bold text-warning small mb-1">-v (The Legacy Way)</div>
                                            <p className="small mb-0 opacity-75">
                                                Docker <strong>automatically creates</strong> the folder for you on the host. 
                                                <br /><span className="text-danger fw-bold">The Danger:</span> It is usually owned by <code>root</code>, 
                                                meaning your non-root container might lose write access!
                                            </p>
                                        </div>

                                        <div className="p-3 rounded bg-dark" style={{ borderLeft: '3px solid #58a6ff' }}>
                                            <div className="fw-bold text-primary small mb-1">--mount (The Recommended Way)</div>
                                            <p className="small mb-0 opacity-75">
                                                Docker <strong>throws an error</strong> and refuses to start. 
                                                <br /><span className="text-success fw-bold">The Benefit:</span> It catches typos instantly. 
                                                You won't accidentally mount a brand-new empty folder because of a misspelled path.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="doc-alert doc-alert-info mt-2 py-2">
                                        <i className="bi bi-shield-exclamation me-2"></i>
                                        <span className="small"><strong>DCA Tip:</strong> Always use <code>--mount</code> in production to ensure explicit failures over implicit (and confusing) folder creation.</span>
                                    </div>
                                </div>

                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">2. Driver vs Driver</h3>
                                    <p className="doc-sub-card-text small">
                                        <strong>Exam Distinction:</strong> 
                                    </p>
                                    <ul className="small opacity-75">
                                        <li><strong>Storage Driver:</strong> Manages internal image layers and the "Writeable Layer" (Overlay2, ZFS).</li>
                                        <li><strong>Volume Driver:</strong> Manages external permanent storage (Local, NFS, Flocker).</li>
                                    </ul>
                                </div>

                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">3. The default Driver</h3>
                                    <p className="doc-sub-card-text small">
                                        Docker Engine 18.09+ defaults to <code>overlay2</code> if the kernel 
                                        supports it. If you see a question about "The legacy union filesystem", 
                                        it is referring to <code>AUFS</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
