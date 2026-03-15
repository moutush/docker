import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "When to Use Which? - Docker Storage",
    description: "A comprehensive guide on choosing between Volumes, Bind Mounts, and tmpfs with real-world examples."
};

export default function StorageDecisionGuidePage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        When to Use Which?
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Choosing the right storage strategy for your Docker containers.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* QUICK COMPARISON */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-list-check"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Quick Verdict
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>If you're in a hurry, use this rule of thumb:</p>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover mb-0 shadow-sm" style={{ border: '1px solid #30363d' }}>
                                    <thead>
                                        <tr>
                                            <th>Storage Type</th>
                                            <th>Best For...</th>
                                            <th>Safe for Prod?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong className="text-primary">Volumes</strong></td>
                                            <td>Databases and App Data</td>
                                            <td><i className="bi bi-check-circle-fill text-success me-2"></i> YES (Recommended)</td>
                                        </tr>
                                        <tr>
                                            <td><strong className="text-warning">Bind Mounts</strong></td>
                                            <td>Live Code Development</td>
                                            <td><i className="bi bi-exclamation-triangle-fill text-warning me-2"></i> USE WITH CARE</td>
                                        </tr>
                                        <tr>
                                            <td><strong className="text-info">tmpfs</strong></td>
                                            <td>Security and Speed</td>
                                            <td><i className="bi bi-check-circle-fill text-success me-2"></i> YES (For temp data)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* SCENARIO 1: THE DEVELOPER */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-warning text-dark">
                                <i className="bi bi-link-45deg"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Scenario 1: The Active Developer
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>The Goal:</strong> You are writing code on your laptop and you want your 
                                Docker container to update instantly when you hit "Save".
                            </p>
                            <div className="doc-sub-card border-warning-subtle">
                                <h3 className="doc-sub-card-title text-warning">Winner: Bind Mounts</h3>
                                <p className="mb-0">
                                    Because Bind Mounts link a real folder on your computer to the container, 
                                    any code change you make in VS Code is immediately visible to the container.
                                </p>
                            </div>
                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightbulb"></i>
                                <div className="ms-2">
                                    <strong>Noob Tip:</strong> Think of a Bind Mount as a "Window" into your laptop's folder.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SCENARIO 2: THE DATABASE */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-primary text-white">
                                <i className="bi bi-hdd-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Scenario 2: The Production Database
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>The Goal:</strong> You are running Postgres or MySQL. If the container 
                                crashes or you upgrade the Docker image, you MUST NOT lose your users' data.
                            </p>
                            <div className="doc-sub-card border-primary-subtle">
                                <h3 className="doc-sub-card-title text-primary">Winner: Volumes</h3>
                                <p className="mb-0">
                                    Docker Volumes are managed entirely by Docker. They are isolated from the 
                                    rest of your host machine's files, making them safer, easier to backup, 
                                    and much faster for database operations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SCENARIO 3: SENSITIVE DATA */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-info text-dark">
                                <i className="bi bi-lightning-charge-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Scenario 3: Secure API Keys
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>The Goal:</strong> You have a secret API key. You don't want it saved 
                                on the hard drive where someone might find it later.
                            </p>
                            <div className="doc-sub-card border-info-subtle">
                                <h3 className="doc-sub-card-title text-info">Winner: tmpfs Mounts</h3>
                                <p className="mb-0">
                                    Since <code>tmpfs</code> lives only in RAM (memory), the key is wiped 
                                    the second the container stops. It never leaves a "fingerprint" on your disk.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SUMMARY DECISION FLOW */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Decision Cheat Sheet
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Is it your source code?</strong><br />
                                        <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Use <strong>Bind Mounts</strong>.
                                    </div>
                                </div>
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Is it a DB, Log, or App Upload?</strong><br />
                                        <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Use <strong>Volumes</strong>.
                                    </div>
                                </div>
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Is it a secret or a tiny cache?</strong><br />
                                        <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Use <strong>tmpfs</strong>.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>Are you on Windows or Mac?</strong><br />
                                        <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Use <strong>Volumes</strong> (as tmpfs is Linux only).
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
