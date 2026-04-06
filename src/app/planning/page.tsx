import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "DCA Study Plan - Docker Documentation",
    description: "An optimized 21-day study plan to master Docker and pass the Docker Certified Associate (DCA) exam."
};

export default function PlanningPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        DCA Study Plan
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        An optimized 21-day "1 Hour/Day" roadmap to master Docker.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* PHASE 1: FOUNDATION */}
                    <div className="doc-section-card shadow-lg mb-4 border-info border-opacity-10">
                        <div className="doc-card-header-wrapper text-info">
                            <div className="heading-icon">
                                <i className="bi bi-rocket-takeoff-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 1: Docker Foundation (Days 1–3)
                            </h2>
                            <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-play-btn-fill me-2 text-info"></i> <strong>35 min:</strong> Nana video + notes</li>
                                        <li><i className="bi bi-terminal-fill me-2 text-info"></i> <strong>25 min:</strong> Hands-on CLI practice</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Top Focus</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-check2-circle me-2 text-info"></i> Images vs Containers</li>
                                        <li className="mb-2"><i className="bi bi-check2-circle me-2 text-info"></i> run / ps / stop / exec / logs</li>
                                        <li><i className="bi bi-check2-circle me-2 text-info"></i> Create 1 basic Dockerfile</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mb-0">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong>Goal:</strong> "I understand what is happening." <br/>
                                    <strong>Rule:</strong> NO MCQs during this phase. Focus on concepts.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 2: MUSCLE MEMORY */}
                    <div className="doc-section-card shadow-lg mb-4 border-primary border-opacity-10">
                        <div className="doc-card-header-wrapper text-primary">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 2: Muscle Memory + First MCQs (Days 4–5)
                            </h2>
                            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-keyboard-fill me-2 text-primary"></i> <strong>30 min:</strong> Practice Commands</li>
                                        <li className="mb-2"><i className="bi bi-laptop-fill me-2 text-primary"></i> <strong>15 min:</strong> Mini Labs</li>
                                        <li><i className="bi bi-clipboard-check-fill me-2 text-primary"></i> <strong>15 min:</strong> MCQs (Basics only)</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Quiz Topics</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-check2-square me-2 text-primary"></i> Container Lifecycle</li>
                                        <li className="mb-2"><i className="bi bi-check2-square me-2 text-primary"></i> run vs exec</li>
                                        <li><i className="bi bi-check2-square me-2 text-primary"></i> Basic Ports</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-warning mb-0">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <strong>Rule:</strong> If an MCQ confuses you, mark the topic but don't deep dive. Keep moving!
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 3: SWARM & NETWORKING */}
                    <div className="doc-section-card shadow-lg mb-4 border-warning border-opacity-10">
                        <div className="doc-card-header-wrapper text-warning">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 3: Swarm + Networking (CORE) (Days 6–8)
                            </h2>
                            <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <p className="small text-secondary mb-4 p-2 bg-warning bg-opacity-10 rounded border border-warning border-opacity-10">
                                <i className="bi bi-exclamation-octagon-fill me-2"></i> This is the highest-priority phase. Master these concepts for the exam.
                            </p>

                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-book-half me-2 text-warning"></i> <strong>25 min:</strong> Swarm learning</li>
                                        <li className="mb-2"><i className="bi bi-gear-fill me-2 text-warning"></i> <strong>25 min:</strong> Lab (Tiny but focused)</li>
                                        <li><i className="bi bi-clipboard2-check-fill me-2 text-warning"></i> <strong>10 min:</strong> Swarm-only MCQs</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Key Targets</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-hdd-network-fill me-2 text-warning"></i> init swarm / service create</li>
                                        <li className="mb-2"><i className="bi bi-arrow-down-up me-2 text-warning"></i> Service Scaling</li>
                                        <li><i className="bi bi-globe me-2 text-warning"></i> Overlay vs Bridge networks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 4: SECURITY & STORAGE */}
                    <div className="doc-section-card shadow-lg mb-4 border-success border-opacity-10">
                        <div className="doc-card-header-wrapper text-success">
                            <div className="heading-icon">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 4: Security + Storage (Days 9–10)
                            </h2>
                            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-grid-2 g-4 h-100">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-play-circle-fill me-2 text-success"></i> 25 min Learning</li>
                                        <li className="mb-2"><i className="bi bi-tools me-2 text-success"></i> 25 min Lab</li>
                                        <li><i className="bi bi-list-task me-2 text-success"></i> 10 min MCQs</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Core Topics</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-hdd-fill me-2 text-success"></i> Volumes vs Bind Mounts</li>
                                        <li className="bi bi-key-fill me-2 text-success"> Secrets & Config basics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 5: INTEGRATION */}
                    <div className="doc-section-card shadow-lg mb-4 border-purple border-opacity-10" style={{ borderColor: '#a855f726' }}>
                        <div className="doc-card-header-wrapper" style={{ color: '#a855f7' }}>
                            <div className="heading-icon text-white" style={{ backgroundColor: '#a855f7' }}>
                                <i className="bi bi-layers-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 5: Integration Practice (Days 11–12)
                            </h2>
                            <span className="badge bg-purple bg-opacity-10 ms-auto" style={{ color: '#a855f7', border: '1px solid #a855f740' }}>
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-hammer me-2"></i> <strong>50 min:</strong> Lab practice</li>
                                        <li><i className="bi bi-lightbulb-fill me-2"></i> <strong>10 min:</strong> Thinking review</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Tasks</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-database-fill me-2"></i> App + DB container</li>
                                        <li className="mb-2"><i className="bi bi-hdd-network-fill me-2"></i> Volume persistence test</li>
                                        <li><i className="bi bi-wifi me-2"></i> Network connection test</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 6: MCQ DRIVEN */}
                    <div className="doc-section-card shadow-lg mb-4 border-warning border-opacity-10">
                        <div className="doc-card-header-wrapper text-warning">
                            <div className="heading-icon">
                                <i className="bi bi-patch-check-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 6: Fix Weak Areas (Days 13–14)
                            </h2>
                            <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Study Split</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-clipboard-data-fill me-2 text-warning"></i> <strong>30 min:</strong> Hard MCQs</li>
                                        <li><i className="bi bi-wrench-adjustable me-2 text-warning"></i> <strong>30 min:</strong> Fix + Redo Lab</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-secondary mb-0">
                                <i className="bi bi-award-fill"></i>
                                <div>
                                    This is where learning actually "locks in." Don't skip the redo!
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 7: MIXED PRACTICE */}
                    <div className="doc-section-card shadow-lg mb-4 border-secondary border-opacity-10">
                        <div className="doc-card-header-wrapper text-secondary">
                            <div className="heading-icon">
                                <i className="bi bi-shuffle"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 7: Mixed Practice (Days 15–17)
                            </h2>
                            <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <ul className="list-unstyled text-secondary small mb-0">
                                <li className="mb-2"><i className="bi bi-layers-half me-2 text-secondary"></i> <strong>45 min:</strong> Mixed Lab (no topics, everything at once)</li>
                                <li className="mb-2"><i className="bi bi-list-check me-2 text-secondary"></i> <strong>15 min:</strong> Random MCQs</li>
                                <li className="mb-1 fw-bold text-light mt-3">Target Focus:</li>
                                <li><i className="bi bi-exclamation-triangle-fill me-2 text-secondary"></i> Real exam-style confusion scenarios. Topic separation is removed.</li>
                            </ul>
                        </div>
                    </div>

                    {/* PHASE 8: MEMORY MODE */}
                    <div className="doc-section-card shadow-lg mb-4 border-danger border-opacity-25">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-brain-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 8: Memory Mode (Recall Only) (Days 18–19)
                            </h2>
                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                             <div className="p-3 bg-danger bg-opacity-10 rounded border border-danger border-opacity-10 mb-4 text-center">
                                <strong className="text-danger small">STRICT RULES:</strong><br/>
                                <span className="small text-secondary">NO VIDEOS • NO NOTES</span>
                            </div>

                            <div className="doc-grid-2 g-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">Recall Tasks</h5>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-2"><i className="bi bi-node-plus-fill me-2 text-danger"></i> Recreate Swarm from scratch</li>
                                        <li className="mb-2"><i className="bi bi-file-earmark-code-fill me-2 text-danger"></i> Rebuild Dockerfile</li>
                                        <li><i className="bi bi-bug-fill me-2 text-danger"></i> Fix broken containers</li>
                                    </ul>
                                </div>
                                <div className="doc-sub-card d-flex align-items-center justify-content-center">
                                    <div className="text-center">
                                        <h5 className="doc-sub-card-title small text-uppercase mb-2">Final Goal</h5>
                                        <p className="h4 text-light mb-0">SPEED + RECALL</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 9: EXAM SIM */}
                    <div className="doc-section-card shadow-lg mb-5 border-light border-opacity-10">
                        <div className="doc-card-header-wrapper text-light">
                            <div className="heading-icon">
                                <i className="bi bi-check-all"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Phase 9: Exam Simulation (Days 20–21)
                            </h2>
                            <span className="badge bg-light bg-opacity-10 text-light border border-light border-opacity-25 ms-auto">
                                <i className="bi bi-clock-fill me-1"></i> 1h / Day
                            </span>
                        </div>

                        <div className="doc-card-body">
                            <ul className="list-unstyled text-secondary small mb-0">
                                <li className="mb-3"><i className="bi bi-alarm-fill me-2 text-light"></i> <strong>Run full timed MCQs</strong></li>
                                <li className="mb-3"><i className="bi bi-bar-chart-fill me-2 text-light"></i> Mixed difficulty levels</li>
                                <li className="mb-0"><i className="bi bi-search me-2 text-light"></i> Review <strong>only</strong> the wrong answers</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
