"use client";

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function StorageRevisionNotesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Storage: Revision Notes</h1>
                    <p className="lead text-secondary opacity-75 fs-5 mb-0">
                        Critical concepts, mental models, and expert-level technical details for daily review.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE BIG THREE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-hdd-stack-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">1. The Big Three (Mount Types)</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
                                <div className="doc-sub-card border-primary">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon text-primary"><i className="bi bi-safe-fill"></i></div>
                                        <h3 className="doc-sub-card-title text-primary">Volumes (The Vault)</h3>
                                    </div>
                                    <div className="doc-sub-card-body">
                                        <p><strong>The Reality:</strong> Managed by Docker, stored in <code>/var/lib/docker/volumes</code>. The ONLY way to store database data in production.</p>
                                        <ul className="small opacity-75 ps-3">
                                            <li>Lifecycle independent of containers (Survives <code>docker rm</code>).</li>
                                            <li>Supports <strong>Volume Drivers</strong> (NFS, S3, Azure).</li>
                                            <li>Shared between multiple containers simultaneously.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="doc-sub-card border-info">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon text-info"><i className="bi bi-window-sidebar"></i></div>
                                        <h3 className="doc-sub-card-title text-info">Bind Mounts (The Open Window)</h3>
                                    </div>
                                    <div className="doc-sub-card-body">
                                        <p><strong>The Reality:</strong> Direct link to a host path (e.g., your Desktop). Best for live-reloading code or injecting host configs.</p>
                                        <ul className="small opacity-75 ps-3">
                                            <li><strong>DCA Warning:</strong> Highly dependent on the host file structure.</li>
                                            <li>Cannot use volume drivers.</li>
                                            <li>Can mount individual files (e.g., <code>/etc/resolv.conf</code>).</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="doc-sub-card border-danger">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon text-danger"><i className="bi bi-memory"></i></div>
                                        <h3 className="doc-sub-card-title text-danger">tmpfs (The Short-Term Thought)</h3>
                                    </div>
                                    <div className="doc-sub-card-body">
                                        <p><strong>The Reality:</strong> Stored in host RAM. Never touches the disk. Wiped instantly on container stop.</p>
                                        <ul className="small opacity-75 ps-3">
                                            <li><strong>Expert Note:</strong> Linux-only (Not for Mac/Windows).</li>
                                            <li><strong>Total Isolation:</strong> If 10 containers use tmpfs, they each get private, unreachable RAM slices.</li>
                                            <li>Perfect for secrets, session keys, or high-speed temp buffers.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE EXPERT MECHANICS */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-eye-slash-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">2. Expert Mechanics: Shadowing</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-card bg-dark bg-opacity-25 border-warning border-opacity-25 mb-3">
                                <div className="doc-sub-card-body">
                                    <h4 className="h6 fw-bold text-warning mb-2">The "Sticker Analogy" (DCA Gold)</h4>
                                    <p className="small mb-2">
                                        When you mount a volume/bind over a container folder, it <strong>shadows</strong> (hides) the image's original files. 
                                        It does NOT merge them.
                                    </p>
                                    <div className="doc-alert doc-alert-info py-2 small">
                                        <i className="bi bi-lightbulb"></i>
                                        <span>If you put a sticker (Mount) on a window (Image), you see the sticker, not the glass behind it. Remove the sticker, and the original glass is still there!</span>
                                    </div>
                                </div>
                            </div>
                            <ul className="small opacity-75 ps-3">
                                <li><strong>Partial Shadowing:</strong> If you mount <code>/app/config</code>, you can still see files in <code>/app/bin</code>. Shadowing is per-directory.</li>
                                <li><strong>Write Precedence:</strong> Any writes to the shadowed folder go directly to the Volume—the Image layer is never touched.</li>
                                <li><strong>Shared Reality:</strong> Two containers sharing a volume see the same "Sticker". One edit is visible to both.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. STORAGE DRIVERS & EXAM TACTICS */}
                    <div className="doc-section-card shadow-lg border-success">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-layers-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">3. Drivers & Exam Tactics</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
                                <div className="doc-sub-card">
                                    <div className="doc-sub-card-header">
                                        <div className="doc-sub-card-icon text-success"><i className="bi bi-mortarboard-fill"></i></div>
                                        <h3 className="doc-sub-card-title text-success">DCA Strategy: overlay2 vs. containerd</h3>
                                    </div>
                                    <div className="doc-sub-card-body">
                                        <p className="small mb-3"><strong>The Rule:</strong> overlay2 is for the <u>Exam</u>; containerd-store is for the <u>Future</u>.</p>
                                        <div className="table-responsive">
                                            <table className="table table-dark table-sm small mb-0 opacity-75">
                                                <tbody>
                                                    <tr><td><strong>overlay2</strong></td><td>DCA Standard. Uses Page Cache sharing.</td></tr>
                                                    <tr><td><strong>containerd</strong></td><td>Modern Snapshotters. Enables Wasm & SBOMs.</td></tr>
                                                    <tr><td><strong>ZFS</strong></td><td>High integrity, requires heavy RAM (ARC).</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="doc-sub-card border-info border-opacity-25">
                                    <div className="doc-sub-card-body">
                                        <h4 className="h6 fw-bold text-info mb-2">CLI Precision: --mount vs -v</h4>
                                        <ul className="small opacity-75 ps-3 mb-0">
                                            <li><strong>-v (The Legacy):</strong> Automatically creates missing host folders (root-owned!). Confusing for beginners.</li>
                                            <li><strong>--mount (The Pro):</strong> Explicitly errors if the path is missing. Required for Swarm Services.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE 10 STORAGE COMMANDMENTS */}
                    <div className="doc-section-card shadow-lg border-info" style={{ gridColumn: '1 / -1' }}>
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-list-check"></i>
                            </div>
                            <h2 className="doc-card-heading">4. The 10 Storage Commandments (Daily Review)</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <ul className="list-unstyled mb-0" style={{ lineHeight: '2' }}>
                                        <li><strong>1. No Amnesia:</strong> Never write permanent DB data into the writable layer (Goldfish effect).</li>
                                        <li><strong>2. Volumes &gt; Binds:</strong> Default to Volumes unless you specifically need host-folder access for development.</li>
                                        <li><strong>3. The missing Path:</strong> <code>--mount</code> fails on missing paths; <code>-v</code> makes them (and often breaks permissions).</li>
                                        <li><strong>4. Lifecycle:</strong> Deleting a container DOES NOT delete its named volume. Use <code>docker volume prune</code>.</li>
                                        <li><strong>5. Inspect Before You Regret:</strong> Use <code>docker inspect --format</code> to verify your mount types.</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-unstyled mb-0" style={{ lineHeight: '2' }}>
                                        <li><strong>6. Copy-Up Overhead:</strong> First write to a large image file = full copy to writable layer. High latency!</li>
                                        <li><strong>7. Read-Only Safety:</strong> Append <code>:ro</code> to mounts to prevent containers from corrupting host data.</li>
                                        <li><strong>8. Anonymous clutter:</strong> <code>docker run -v /app/data</code> creates a nameless volume that clutters your disk. Name them!</li>
                                        <li><strong>9. Concurrency Risk:</strong> Docker provides storage but NO locking. Your app must handle file locks.</li>
                                        <li><strong>10. Swarm Rule:</strong> Swarm services ONLY support the <code>--mount</code> syntax. No shortcuts allowed.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* THE DIAMOND INTERVIEW CLOSER */}
                <div className="mt-5 p-5 rounded bg-primary bg-opacity-10 border border-primary border-opacity-25 shadow-lg position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-3 opacity-10">
                        <i className="bi bi-gem display-1 text-primary"></i>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                        <div className="p-3 rounded bg-primary text-white me-3">
                            <i className="bi bi-stars fs-3"></i>
                        </div>
                        <h2 className="h3 mb-0 fw-bold text-primary">The "Gold Standard" Interview Closer</h2>
                    </div>
                    <p className="lead fw-bold text-white opacity-90 ps-md-5 mb-0" style={{ fontStyle: 'italic', borderLeft: '4px solid var(--bs-primary)' }}>
                        "In architectural design, I default to **Managed Volumes** to bypass CoW overhead and ensure data survival. 
                        I strictly use **Bind Mounts** for host injection, and **tmpfs** for memory-speed, zero-leak security. 
                        Finally, I stay current with **containerd snapshotters** for Wasm support, while ensuring **overlay2** 
                        remains production-stable for my core kernel fleet."
                    </p>
                </div>

            </div>
        </div>
    );
}
