import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "BTRFS Storage Driver - Docker Storage",
    description: "Learn how the Btrfs storage driver works in Docker, its prerequisites, and performance considerations."
};

export default function BtrfsStorageDriverPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        BTRFS Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        An advanced copy-on-write (CoW) filesystem for Linux Docker environments.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* IMPORTANT WARNING */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-danger text-white">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Critical Note
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-alert doc-alert-danger">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                <div>
                                    In most cases, you should use the <strong>overlay2</strong> storage driver. 
                                    Do not use Btrfs simply because your system uses it as the root filesystem. 
                                    Btrfs has known issues (like Moby #27653) that may impact reliability.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WHAT IS BTRFS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-2-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What is the Btrfs Driver?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>Btrfs</strong> is a modern "copy-on-write" (CoW) filesystem. 
                                Docker's <code>btrfs</code> driver leverages native Btrfs features to manage 
                                image and container layers.
                            </p>

                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-controller me-2"></i>
                                <strong>Noob Analogy:</strong> Think of Btrfs like <strong>Video Game Save Slots</strong>. 
                                You can take an instant "snapshot" of your progress that uses zero extra space until 
                                you start changing things.
                            </div>

                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Block-Level Operations</h3>
                                    <p className="doc-sub-card-text">
                                        Unlike drivers that copy entire files, Btrfs operates on blocks of data, 
                                        making it highly efficient for partial updates.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Snapshots</h3>
                                    <p className="doc-sub-card-text">
                                        Every container layer is essentially a "snapshot" of the image below it, 
                                        using almost zero extra space initially.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PREREQUISITES */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Prerequisites
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                                <li>
                                    <i className="bi bi-dot me-2"></i>
                                    <strong>OS:</strong> Only supported on Ubuntu, Debian, or SLES with Docker Engine CE.
                                </li>
                                <li>
                                    <i className="bi bi-dot me-2"></i>
                                    <strong>Tools:</strong> You need <code>btrfs-progs</code> or <code>btrfs-tools</code> installed.
                                </li>
                                <li>
                                    <i className="bi bi-dot me-2"></i>
                                    <strong>Storage:</strong> Requires a dedicated block device formatted as Btrfs and mounted at <code>/var/lib/docker/</code>.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-gear-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How it Works (Noob Guide)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Btrfs divides your storage into <strong>Subvolumes</strong> and <strong>Snapshots</strong>.
                            </p>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <strong>1. Base Layer:</strong> The bottom of your image is a "Subvolume".
                                </div>
                                <div className="component-note mb-3 p-3" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <strong>2. Middle Layers:</strong> Each layer above it is a "Snapshot" of the one below.
                                </div>
                                <div className="component-note p-3" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <strong>3. Writable Layer:</strong> The container uses a final snapshot to store its own changes.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERFORMANCE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-speedometer2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Performance Gotchas
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>While powerful, Btrfs has specific overheads:</p>
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
                                            <td><strong>Page Caching</strong></td>
                                            <td>Btrfs doesn't share page caches. If two containers use the same file, it's copied twice into RAM.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Small Writes</strong></td>
                                            <td>Starting/stopping many containers quickly can fill up Btrfs "chunks" prematurely.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Fragmentation</strong></td>
                                            <td>Common in CoW filesystems. Random writes can slow down SSDs and thrash mechanical disks.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* VERDICT */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-lightbulb-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Final Verdict
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Always use <strong>Volumes</strong> for write-heavy workloads (like databases). 
                                Volumes bypass the storage driver and are significantly faster.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                If you are on an SSD, mount with <code>-o ssd</code> for better performance.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
