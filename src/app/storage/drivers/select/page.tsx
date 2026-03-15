import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Select a Storage Driver - Docker Storage",
    description: "Decision matrix and recommendations for choosing the right Docker storage driver based on your OS and use case."
};

export default function SelectStorageDriverPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Select a Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The ultimate decision matrix for Docker performance and reliability.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* THE QUICK VERDICT */}
                    <div className="doc-section-card shadow-lg border-success">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-success text-white">
                                <i className="bi bi-trophy-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Quick Verdict (DCA Standard)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-star-fill text-warning me-2"></i>
                                <div>
                                    <strong>Overlay2</strong> is the gold standard for all modern Linux systems. 
                                    Unless you have a very specific technical reason, this is what you should use.
                                </div>
                            </div>
                            
                            <div className="table-responsive mt-4">
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th>Storage Driver</th>
                                            <th>Best Used For...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>overlay2</strong></td>
                                            <td>Modern Linux (Ubuntu, CentOS, RHEL). Best performance and memory efficiency.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>btrfs</strong></td>
                                            <td>Linux-native CoW filesystem. Great for high-density containers with low RAM overhead.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>zfs</strong></td>
                                            <td>High-end CoW with extreme data integrity. Requires **high RAM** (for ARC cache).</td>
                                        </tr>
                                        <tr>
                                            <td><strong>windowsfilter</strong></td>
                                            <td>Default and only recommended driver for Docker on Windows.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>vfs</strong></td>
                                            <td>Testing and environments where no union filesystem is supported. Highest reliability, worst performance.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* REAL WORLD SCENARIOS */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-geo-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Real World Scenarios
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="list-unstyled" style={{ lineHeight: '1.8' }}>
                                <li className="mb-3 p-3 bg-dark rounded border-start border-info border-4">
                                    <strong><i className="bi bi-laptop me-2"></i> The Active Developer:</strong><br />
                                    "I just want to run my dev environment fast."<br />
                                    <span className="text-secondary small">→ Use <strong>overlay2</strong> (it's the default inside your Docker Desktop VM).</span>
                                </li>
                                <li className="mb-3 p-3 bg-dark rounded border-start border-warning border-4">
                                    <strong><i className="bi bi-database me-2"></i> The Data Scientist:</strong><br />
                                    "I need to take instant backups of 500GB training data and have a 64GB RAM server."<br />
                                    <span className="text-secondary small">→ Use <strong>ZFS</strong>. Its snapshots are enterprise-grade and its memory usage is worth the integrity.</span>
                                </li>
                                <li className="mb-3 p-3 bg-dark rounded border-start border-primary border-4">
                                    <strong><i className="bi bi-cpu me-2"></i> The Systems Engineer:</strong><br />
                                    "I want advanced snapshots but my server has limited RAM."<br />
                                    <span className="text-secondary small">→ Use <strong>Btrfs</strong>. It gives you CoW benefits without the heavy RAM requirements of ZFS.</span>
                                </li>
                                <li className="mb-3 p-3 bg-dark rounded border-start border-success border-4">
                                    <strong><i className="bi bi-cloud-upload me-2"></i> The DevOps Architect:</strong><br />
                                    "I need a modern, future-proof CI/CD pipeline."<br />
                                    <span className="text-secondary small">→ Use the <strong>containerd image store</strong> for multi-platform build support.</span>
                                </li>
                                <li className="p-3 bg-dark rounded border-start border-danger border-4">
                                    <strong><i className="bi bi-bug me-2"></i> The Kernel Debugger:</strong><br />
                                    "Nothing is working on this custom Linux distro."<br />
                                    <span className="text-secondary small">→ Use <strong>VFS</strong>. It's slow, but it's the 'Swiss Army Knife' that always works.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* DECISION TREE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Decision Tree
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <i className="bi bi-ubuntu me-2"></i>
                                        <strong>Ubuntu / Debian / CentOS / RHEL:</strong> <br />
                                        Use <code>overlay2</code>. It's the most stable and performant.
                                    </div>
                                </div>
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <i className="bi bi-hdd-fill me-2"></i>
                                        <strong>Running on Btrfs/ZFS Root:</strong> <br />
                                        You <strong>don't</strong> have to use the matching driver. <code>overlay2</code> works 
                                        perfectly fine on these filesystems.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <i className="bi bi-windows me-2"></i>
                                        <strong>Windows:</strong> <br />
                                        You must use <code>windowsfilter</code>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERFORMANCE FACTORS */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-primary text-white">
                                <i className="bi bi-speedometer2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Performance Factors
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-cards-grid">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Memory Efficiency</h3>
                                    <p className="doc-sub-card-text small">
                                        <code>overlay2</code> shares the page cache between containers, meaning 1,000 containers 
                                        don't use 1,000x the memory for image files.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Copy-on-Write (CoW)</h3>
                                    <p className="doc-sub-card-text small">
                                        Most drivers use CoW to save space. <code>vfs</code> does not (it uses deep copies) 
                                        which makes it extremely slow for larger images.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INTERVIEW TIP */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-chat-left-dots-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Senior Interview Secret
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If an interviewer asks: <strong>"How do you choose between storage drivers?"</strong>
                            </p>
                            <div className="notes-container">
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        "I prioritize stability and standard kernel features. For 99% of use cases, 
                                        <code>overlay2</code> is the optimal choice because it balances performance with 
                                        low memory overhead. I only switch to alternatives like <code>ZFS</code> if 
                                        we specifically need advanced volume management features that outweigh the 
                                        benefits of the standard union mount."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
