import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker Swarm - Docker Documentation",
    description: "Learn how to use Docker's built-in orchestrator to manage clusters, services, and self-healing containers."
};

export default function SwarmPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker Swarm: The Built-in Manager
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Docker's "native" way to turn a group of machines into a single, unified system.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* THE CORE TRUTH */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-gear-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What is Docker Swarm?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker Swarm is a tool that comes built-in with every Docker installation. 
                                It allows you to manage multiple Docker hosts (Nodes) as if they were one single computer. 
                                Think of it as **"Docker for the whole Data Center."**
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill"></i>
                                <div className="ms-3">
                                    <strong>Noob Tip:</strong> You don't need to install any extra software to use Swarm. 
                                    Just run <code>docker swarm init</code> and you've started your first cluster.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KEY TERMS BREAKDOWN */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-list-nested"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Three Pillars: Service, Task, Replica
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>To understand Swarm, you must understand these three levels of organization:</p>
                            
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">1. Service (The Job)</h3>
                                    <p className="doc-sub-card-text small">
                                        The definition of what you want to run. Instead of saying "Run this container," 
                                        you say "I want a Service that runs Nginx on Port 80."
                                    </p>
                                </div>
                                <div className="doc-sub-card border-warning">
                                    <h3 className="doc-sub-card-title text-warning">2. Replica (The Copies)</h3>
                                    <p className="doc-sub-card-text small">
                                        How many "copies" of the container you want. Swarm ensures that even if a machine dies, 
                                        the number of replicas stays exactly what you asked for.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">3. Task (The Container)</h3>
                                    <p className="doc-sub-card-text small">
                                        The actual running instance. A Service is the "plan," and a Task is the "work." 
                                        If you have 3 Replicas, Swarm will create 3 Tasks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VISUALIZATION: DESIRED VS ACTUAL STATE */}
                    <div className="doc-section-card shadow-lg border-success col-md-12 mt-4 overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-heart-pulse-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Self-Healing Loop: Desired vs. Actual State
                            </h2>
                        </div>
                        <div className="doc-card-body p-0">
                            {/* VISUALIZATION BOX */}
                            <div className="p-5 bg-dark bg-opacity-25 border-bottom border-success border-opacity-10">
                                <div className="row align-items-center text-center">
                                    {/* DESIRED STATE */}
                                    <div className="col-md-4">
                                        <div className="p-3 border border-primary rounded bg-primary bg-opacity-10 shadow-sm">
                                            <div className="text-primary small fw-bold">Desired State</div>
                                            <div className="fs-4 fw-bold">3 Replicas</div>
                                        </div>
                                    </div>

                                    {/* THE MANAGER ARROW */}
                                    <div className="col-md-4 py-3 py-md-0">
                                        <div className="position-relative">
                                            <div className="small opacity-50 mb-2">Swarm Manager checks...</div>
                                            <i className="bi bi-arrow-repeat fs-1 text-success animate-swarm-rotate"></i>
                                            <div className="small opacity-50 mt-2">...and fixes discrepancy</div>
                                        </div>
                                    </div>

                                    {/* ACTUAL STATE */}
                                    <div className="col-md-4">
                                        <div className="p-3 border border-warning rounded bg-warning bg-opacity-10 shadow-sm">
                                            <div className="text-warning small fw-bold">Actual State</div>
                                            <div className="fs-4 fw-bold">2 Alive (1 Crashed)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-dark bg-opacity-10">
                                <h4 className="fs-6 fw-bold mb-2">How it works (Step-by-Step):</h4>
                                <ol className="list-unstyled mb-0 small text-secondary">
                                    <li className="mb-2"><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> You tell Swarm: "I want 3 copies of my app" (Desired State).</li>
                                    <li className="mb-2"><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> A server explodes. Now only 2 copies are running (Actual State).</li>
                                    <li><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> Swarm notices the mismatch and **immediately** starts a 3rd copy on a healthy server.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* PRACTICAL COMMANDS */}
                    <div className="doc-section-card shadow-lg border-info col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Practical: Starting your first Swarm
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Here are the two commands that make Swarm happen:</p>
                            
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <h4 className="fs-6 fw-bold">1. Initialize the Cluster</h4>
                                    <pre className="doc-code-block mb-3">
                                        {`docker swarm init`}
                                    </pre>
                                    <p className="x-small text-secondary">This turns your current computer into a <strong>Manager Node</strong> and starts the cluster engine.</p>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="fs-6 fw-bold">2. Create a Global Service</h4>
                                    <pre className="doc-code-block mb-3">
                                        {`docker service create --replicas 3 --name web -p 80:80 nginx`}
                                    </pre>
                                    <p className="x-small text-secondary">This creates a service named "web", ensures 3 copies are always running, and opens it on port 80 across the cluster.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INTERVIEW READY: RAFT CONSENSUS */}
                    <div className="doc-section-card shadow-lg border-warning col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-patch-check-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Interview Corner: Raft Consensus
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <h3 className="fs-5 fw-bold mb-3">The "Voting System"</h3>
                            <p>
                                In a cluster with 3 or 5 Managers, how do they decide who is in charge? 
                                They use an algorithm called **Raft Consensus**.
                            </p>
                            
                            <div className="row g-4 mt-3">
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Voting</h4>
                                        <p className="x-small text-secondary">Managers vote for a leader. If the leader dies, they hold a new election immediately.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Quorum</h4>
                                        <p className="x-small text-secondary">The cluster only works if more than 50% of Managers are alive. This prevents "Manager A" from disagreeing with "Manager B".</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Odd Numbers</h4>
                                        <p className="x-small text-secondary">This is why you always have 3, 5, or 7 Managers. You never have 2, because if they disagree, there's no tie-breaker!</p>
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
