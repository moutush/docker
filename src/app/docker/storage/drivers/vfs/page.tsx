import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "VFS Storage Driver - Docker Storage",
    description: "Learn about the VFS storage driver in Docker, its robust design, and its performance trade-offs."
};

export default function VFSStorageDriverPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        VFS Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The ultimate fallback: robust, stable, and universal.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* OVERVIEW */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Driver Overview
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Unlike other drivers, <strong>VFS</strong> (Virtual File System) is 
                                <strong> not</strong> a union filesystem. Each image and container layer 
                                is simply a separate directory on your disk.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                <strong>Why use it?</strong> It is incredibly robust and works in 
                                every environment. It's often used for testing to verify other 
                                storage backends against a "pure" baseline.
                            </div>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-danger text-white">
                                <i className="bi bi-copy"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How it Works (Deep Copy)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                VFS does not support <strong>Copy-on-Write (CoW)</strong>.
                            </p>

                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-printer-fill me-2"></i>
                                <strong>Noob Analogy:</strong> Think of VFS like a <strong>Physical Photocopying Machine</strong>. 
                                To make a change on page 5, you have to photocopy the entire book from page 1 to 5 
                                first. It's safe, but you'll run out of paper (disk space) very fast!
                            </div>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #da3633' }}>
                                    <div>
                                        <i className="bi bi-files text-danger me-2"></i>
                                        <strong>The "Deep Copy":</strong> To create a new layer, VFS makes a full, 
                                        standard copy of the previous layer.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #da3633' }}>
                                    <div>
                                        <i className="bi bi-exclamation-octagon-fill text-danger me-2"></i>
                                        <strong>Disk Bloat:</strong> If you have 5 layers, each layer takes up 
                                        the full space of the previous layers plus its own changes.
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
                                Configuration
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>To explicitly use <code>vfs</code>, update your <code>daemon.json</code>:</p>
                            <pre className="doc-code-block">
                                {`{
  "storage-driver": "vfs"
}`}
                            </pre>
                            <div className="doc-sub-card mt-3">
                                <h3 className="doc-sub-card-title">Setting Limits</h3>
                                <p className="mb-0">
                                    You can control disk usage using the <code>size</code> option:
                                    <code className="d-block mt-2 p-2 bg-dark rounded">"storage-opts": ["size=256M"]</code>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PERFORMANCE TABLE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-speedometer2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Trade-offs
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="table-responsive">
                                <table className="table table-dark table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Factor</th>
                                            <th>Impact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Write Speed</strong></td>
                                            <td>Slow (Full copy required for new layers).</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Disk Space</strong></td>
                                            <td>Very High (Huge duplication between layers).</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Reliability</strong></td>
                                            <td>Highest (Simple directories, no complex kernel logic).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* ON DISK */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-folder2-open"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Where is it on disk?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker creates the <code>/var/lib/docker/vfs/</code> directory. 
                                Inside <code>dir/</code>, you will see a folder for every single layer.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-lightbulb"></i>
                                <div className="ms-2">
                                    <strong>Noob Tip:</strong> If you pull a 100MB image with 5 layers, 
                                    VFS might end up using 500MB of disk space!
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
