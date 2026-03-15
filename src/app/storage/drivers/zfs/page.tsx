import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ZFS Storage Driver - Docker Storage",
    description: "Learn how the ZFS storage driver works in Docker, its prerequisites, and implementation details."
};

export default function ZFSStorageDriverPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        ZFS Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Next-generation filesystem with advanced volume management and snapshots.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* READINESS WARNING */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-warning text-dark">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Maturity Note
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The ZFS on Linux (ZoL) port is healthy but not recommended for production 
                                <strong> unless you have substantial experience</strong> with ZFS. 
                                Licensing issues prevent it from being in the mainline Linux kernel.
                            </p>
                        </div>
                    </div>

                    {/* PREREQUISITES */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-card-checklist"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Prerequisites
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                                <li>
                                    <i className="bi bi-arrow-right-short text-primary me-2"></i>
                                    <strong>Device:</strong> Requires one or more dedicated block devices (SSDs preferred).
                                </li>
                                <li>
                                    <i className="bi bi-arrow-right-short text-primary me-2"></i>
                                    <strong>Mount:</strong> <code>/var/lib/docker/</code> must be mounted on a ZFS-formatted filesystem.
                                </li>
                                <li>
                                    <i className="bi bi-arrow-right-short text-primary me-2"></i>
                                    <strong>Tools:</strong> Native ZFS driver (ZoL) is recommended over the FUSE implementation.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CORE OBJECTS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-box-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                ZFS Core Objects
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-cards-grid">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Filesystems</h3>
                                    <p className="doc-sub-card-text small">
                                        Thinly provisioned space allocated from the <code>zpool</code> on demand.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Snapshots</h3>
                                    <p className="doc-sub-card-text small">
                                        Read-only, space-efficient point-in-time copies of filesystems.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Clones</h3>
                                    <p className="doc-sub-card-text small">
                                        Read-write copies of snapshots used for storing layer differences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-gear-wide-connected"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How it Works
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                ZFS layers image data using a series of snapshots and clones.
                            </p>

                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-clock-fill me-2"></i>
                                <strong>Noob Analogy:</strong> Think of ZFS like a <strong>Time Machine</strong>. 
                                It can "freeze" the state of your container at any moment (Snapshot), and you 
                                can create an identical twin (Clone) of that moment in an instant.
                            </div>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>1. Base Image:</strong> Stored as a native ZFS filesystem.
                                    </div>
                                </div>
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>2. Child Layers:</strong> Created by taking a snapshot of the parent and making a writable clone.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>3. Container Instance:</strong> A final clone based on the top image layer's snapshot.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERFORMANCE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Performance Factors
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="table-responsive">
                                <table className="table table-dark table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Factor</th>
                                            <th>Insight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Memory</strong></td>
                                            <td>ZFS loves RAM. It uses an ARC (Adaptive Replacement Cache) to speed up reads.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Deduplication</strong></td>
                                            <td>Saves space but is extremely RAM-intensive. Usually better to keep it off.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Fragmentation</strong></td>
                                            <td>A natural side effect of CoW. ZFS uses 128k block sizes to help mitigate this.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* BEST PRACTICES */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-hammer"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Best Practices
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="list-unstyled mb-0" style={{ lineHeight: '1.8' }}>
                                <li>
                                    <i className="bi bi-lightning-charge-fill text-info me-2"></i>
                                    <strong>Use SSDs:</strong> ZFS is block-intensive and performs much better on solid-state media.
                                </li>
                                <li>
                                    <i className="bi bi-safe2-fill text-info me-2"></i>
                                    <strong>Use Volumes:</strong> For production databases, always use Docker volumes to bypass CoW overhead.
                                </li>
                                <li>
                                    <i className="bi bi-memory text-info me-2"></i>
                                    <strong>ARC Sharing:</strong> ZFS allows multiple containers to share the same cached memory blocks.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
