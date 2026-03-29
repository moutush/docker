"use client";

import React from 'react';
import Link from 'next/link';


export default function StorageRevisionNotesPage() {
    const revisionItems = [
        {
            title: "The Big Three",
            subtitle: "Volumes vs Bind vs tmpfs",
            icon: "bi-hdd-stack",
            color: "primary",
            points: [
                "Volumes: Docker-managed, /var/lib/docker/volumes, production data.",
                "Bind Mounts: Host-path, development, config sharing.",
                "tmpfs: RAM only, Linux only, sensitive/temp data."
            ],
            link: "/storage/when-to-use"
        },
        {
            title: "CLI Precision",
            subtitle: "DCA Exam Traps",
            icon: "bi-terminal",
            color: "warning",
            points: [
                "-v creates host folder if missing (owned by root).",
                "--mount errors if host source path is missing.",
                "Short syntax vs Verbose syntax (use --mount for clarity)."
            ],
            link: "/storage/drivers/overview#dca-exam-practice"
        },
        {
            title: "Storage Drivers",
            subtitle: "Decision Matrix",
            icon: "bi-layers",
            color: "success",
            points: [
                "overlay2: Default, best RAM/speed balance.",
                "zfs: High integrity, RAM hungry (ARC cache).",
                "btrfs: Block-level CoW, native snapshots.",
                "vfs: Fallback, slow, no CoW."
            ],
            link: "/storage/drivers/select"
        },
        {
            title: "Internal Mechanics",
            subtitle: "CoW & Copy-Up",
            icon: "bi-cpu",
            color: "info",
            points: [
                "Copy-on-Write: Space efficiency for shared layers.",
                "Copy-Up: Full file copy to writable layer on first edit.",
                "Impact: Large files cause lag on initial write."
            ],
            link: "/storage/drivers/overview"
        },
        {
            title: "Senior Patterns",
            subtitle: "Orchestration & Safety",
            icon: "bi-shield-check",
            color: "danger",
            points: [
                "Mount Propagation: shared, slave, private (default).",
                "Backup: Use a temp container with --volumes-from.",
                "Pruning: docker volume prune (removes unused only)."
            ],
            link: "/storage/volumes-deep-dive#senior-topic-mount-propagation"
        },
        {
            title: "The Future",
            subtitle: "containerd Store",
            icon: "bi-box-seam",
            color: "secondary",
            points: [
                "Uses containerd Snapshotters (not Graph Drivers).",
                "Enables Multi-platform builds + Wasm support.",
                "Dual Storage: Extracted + Compressed layers."
            ],
            link: "/storage/containerd-store"
        }
    ];

    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">
                
                {/* HEADER */}
                <div className="text-center mb-5 pb-4 border-bottom border-secondary border-opacity-25">
                    <h1 className="display-4 fw-bold mb-3">Storage Revision Notes</h1>
                    <p className="lead text-secondary opacity-75">
                        <i className="bi bi-calendar-check me-2 text-primary"></i>
                        Critical concepts to review daily for DCA and Interviews.
                    </p>
                </div>

                <div className="row g-4">
                    {revisionItems.map((item, idx) => (
                        <div key={idx} className="col-md-6 col-xl-4">
                            <div className={`card h-100 shadow-sm border-0 bg-dark bg-opacity-50`} style={{ borderTop: `4px solid var(--bs-${item.color})` }}>
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`p-2 rounded bg-${item.color} bg-opacity-10 text-${item.color} me-3`}>
                                            <i className={`bi ${item.icon} fs-4`}></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 mb-0 fw-bold">{item.title}</h3>
                                            <small className="text-secondary">{item.subtitle}</small>
                                        </div>
                                    </div>
                                    
                                    <ul className="list-unstyled flex-grow-1 border-start border-secondary border-opacity-25 ps-4 py-2 mt-2">
                                        {item.points.map((pt, pIdx) => (
                                            <li key={pIdx} className="mb-3 position-relative">
                                                <i className={`bi bi-check2-circle position-absolute text-${item.color}`} style={{ left: '-1.8rem', top: '0.2rem' }}></i>
                                                <span className="small opacity-90" style={{ lineHeight: '1.4' }}>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
                                        <Link href={item.link} className={`btn btn-sm btn-outline-${item.color} w-100 d-flex align-items-center justify-content-center gap-2`}>
                                            Deep Dive <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FINAL TIPS */}
                <div className="mt-5 p-4 rounded bg-primary bg-opacity-10 border border-primary border-opacity-25 shadow-lg">
                    <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-stars fs-3 text-warning me-3"></i>
                        <h2 className="h4 mb-0 fw-bold">The "Diamond" Interview Closer</h2>
                    </div>
                    <p className="mb-0 opacity-90 ps-md-5 fs-6" style={{ fontStyle: 'italic' }}>
                        "When choosing storage, I default to <strong>Volumes</strong> for persistence and <strong>Overlay2</strong> for image management. 
                        I only deviate toward <strong>ZFS/Btrfs</strong> for enterprise-grade snapshotting or <strong>tmpfs</strong> for ephemeral 
                        security-first workloads, always balancing kernel stability with performance overhead."
                    </p>
                </div>
            </div>

            <style jsx>{`
                .card {
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                    background: rgba(21, 25, 30, 0.8) !important;
                    backdrop-filter: blur(10px);
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
                }
                .animate-pulse {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.6; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
