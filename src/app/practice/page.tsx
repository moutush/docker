"use client";

import React from 'react';
import Link from 'next/link';

export default function PracticeHubPage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5 text-center">
                <h1 className="doc-section-title" style={{ fontSize: '48px' }}>Daily Practice Drills</h1>
                <p className="text-secondary fs-5">Building muscle memory is the only way to master Docker for the DCA exam.</p>
            </div>

            <div className="row g-4 justify-content-center">
                {/* Containers Card */}
                <div className="col-md-5">
                    <Link href="/practice/containers" className="text-decoration-none">
                        <div className="doc-section-card shadow-lg border-info h-100 hover-lift transition-all">
                            <div className="doc-card-body p-5 text-center">
                                <div className="display-4 text-info mb-4">
                                    <i className="bi bi-box-seam"></i>
                                </div>
                                <h3 className="fw-bold text-light mb-3">1. Containers Drill</h3>
                                <p className="text-secondary small">
                                    Practice pulling images, running containers, managing lifecycles, and basic CLI interactions.
                                </p>
                                <div className="btn btn-info text-dark fw-bold mt-3 px-4">Start Drill</div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Volumes Card */}
                <div className="col-md-4">
                    <Link href="/practice/volumes" className="text-decoration-none">
                        <div className="doc-section-card shadow-lg border-success h-100 hover-lift transition-all">
                            <div className="doc-card-body p-4 text-center">
                                <div className="display-4 text-success mb-4">
                                    <i className="bi bi-hdd-fill"></i>
                                </div>
                                <h3 className="fw-bold text-light mb-3">2. Volumes Drill</h3>
                                <p className="text-secondary small">
                                    Master persistent storage and lifecycle management.
                                </p>
                                <div className="btn btn-success text-dark fw-bold mt-3 px-4">Start Drill</div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Networking Card */}
                <div className="col-md-4">
                    <Link href="/practice/networking" className="text-decoration-none">
                        <div className="doc-section-card shadow-lg border-primary h-100 hover-lift transition-all">
                            <div className="doc-card-body p-4 text-center">
                                <div className="display-4 text-primary mb-4">
                                    <i className="bi bi-diagram-3-fill"></i>
                                </div>
                                <h3 className="fw-bold text-light mb-3">3. Networking Drill</h3>
                                <p className="text-secondary small">
                                    Master user-defined bridges, port mapping, and DNS.
                                </p>
                                <div className="btn btn-primary text-light fw-bold mt-3 px-4">Start Drill</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-5 p-4 rounded bg-dark border border-secondary text-center max-w-lg mx-auto">
                <p className="small text-secondary mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Tip:</strong> Set a timer for 10 minutes every morning. Run these commands on your terminal without looking at the solutions!
                </p>
            </div>

            <style jsx>{`
                .hover-lift:hover {
                    transform: translateY(-10px);
                    border-color: currentColor !important;
                }
                .transition-all {
                    transition: all 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
