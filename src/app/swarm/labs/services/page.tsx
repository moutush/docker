import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lab: Swarm Services & Scaling - Docker Documentation",
    description: "Learn how to create, inspect, and scale Docker Swarm services.",
};

export default function SwarmServicesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab 2: Services &amp; Scaling
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The Service is the unit of work in Swarm. Master it and you master orchestration.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. SERVICE vs CONTAINER */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary"><i className="bi bi-arrow-left-right"></i></div>
                            <h2 className="doc-card-heading text-primary">1. Service vs Container — What is the difference?</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>In regular Docker, you run a <strong>Container</strong>. In Swarm, you declare a <strong>Service</strong> instead.</p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon"><i className="bi bi-box-seam"></i></div>
                                            <h5 className="doc-sub-card-title">Container (Regular Docker)</h5>
                                        </div>
                                        <ul className="small text-secondary ps-3 mb-0">
                                            <li className="mb-1">You say: <em>"Run this container NOW."</em></li>
                                            <li className="mb-1">If it crashes, it stays dead.</li>
                                            <li>Runs on one specific machine.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-primary h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-primary"><i className="bi bi-layers-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Service (Swarm)</h5>
                                        </div>
                                        <ul className="small text-secondary ps-3 mb-0">
                                            <li className="mb-1">You say: <em>"I want 3 copies of this, always."</em></li>
                                            <li className="mb-1">If one crashes, Swarm auto-heals it.</li>
                                            <li>Spread across any available node.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Service → Replica → Task</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        A <b>Service</b> is the definition. A <b>Replica</b> is how many copies you want. Each running copy is called a <b>Task</b> (essentially a container + its metadata).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. CREATE A SERVICE */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success"><i className="bi bi-terminal-fill"></i></div>
                            <h2 className="doc-card-heading text-success">2. Creating a Service</h2>
                        </div>
                        <div className="doc-card-body">
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker service create \\
  --name web \\
  --replicas 3 \\
  -p 80:80 \\
  nginx:latest`}
                            </pre>
                            <div className="p-3 rounded border border-secondary" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <ul className="small text-secondary mb-0">
                                    <li className="mb-2"><strong className="text-success">--name web</strong>: A human-readable name for the service.</li>
                                    <li className="mb-2"><strong className="text-primary">--replicas 3</strong>: Run exactly 3 copies of this container across the cluster.</li>
                                    <li><strong className="text-warning">-p 80:80</strong>: Publish port 80 on <em>every node</em> in the cluster (Routing Mesh).</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 3. INSPECT & MONITOR */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-search"></i></div>
                            <h2 className="doc-card-heading text-info">3. Inspecting Services</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4">
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">List all services</h6>
                                    <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">
{`$ docker service ls

ID           NAME   MODE        REPLICAS   IMAGE         PORTS
x8r3k4abc    web    replicated  3/3        nginx:latest  *:80->80/tcp`}
                                    </pre>
                                    <p className="x-small text-secondary mt-2">The <code>3/3</code> means 3 desired / 3 running. If you see <code>2/3</code>, one task is failing!</p>
                                </div>
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">List tasks (per-container status)</h6>
                                    <pre className="doc-code-block mb-0 border-secondary text-light bg-dark x-small">
{`$ docker service ps web

NAME      NODE      DESIRED STATE  CURRENT STATE
web.1     worker1   Running        Running 2 mins ago
web.2     manager1  Running        Running 2 mins ago
web.3     worker2   Running        Running 2 mins ago`}
                                    </pre>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-warning mt-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Gotcha: <code>service ps</code> vs <code>docker ps</code></h6>
                                    <p className="mb-0 x-small text-secondary">
                                        <code>docker ps</code> only shows containers on the <em>current machine</em>. <code>docker service ps</code> shows tasks across <em>the entire cluster</em>. Always use <code>service ps</code> when troubleshooting Swarm.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. SCALING */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning"><i className="bi bi-arrows-expand"></i></div>
                            <h2 className="doc-card-heading text-warning">4. Scaling Services</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Scale up instantly — Swarm will schedule new tasks onto available nodes:</p>
                            <pre className="doc-code-block mb-4 border-warning text-warning bg-dark x-small">
{`# Scale up to 6 replicas
$ docker service scale web=6

# Scale multiple services at once
$ docker service scale web=6 api=3

# Also works with update:
$ docker service update --replicas 6 web`}
                            </pre>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Swarm Scheduling</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Swarm uses a <strong>"spread" strategy</strong> by default — it tries to distribute tasks evenly across all available nodes to maximize fault tolerance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. GLOBAL vs REPLICATED */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-globe"></i></div>
                            <h2 className="doc-card-heading text-danger">5. DCA Gotcha: Global vs Replicated Mode</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Services have two modes that are frequently tested on the DCA exam:</p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-primary h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-primary"><i className="bi bi-layers-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Replicated (Default)</h5>
                                        </div>
                                        <p className="small text-secondary mb-2">You specify an exact number of replicas. Swarm places them wherever there is capacity.</p>
                                        <pre className="doc-code-block mb-0 border-primary text-primary bg-dark x-small">{`docker service create \\
  --replicas 3 nginx`}</pre>
                                        <p className="x-small text-secondary mt-2 mb-0"><strong>Use for:</strong> Web servers, APIs — anything where you want a fixed count.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-danger"><i className="bi bi-globe2"></i></div>
                                            <h5 className="doc-sub-card-title">Global</h5>
                                        </div>
                                        <p className="small text-secondary mb-2">Exactly <strong>ONE task per node</strong>. No replica count needed — it auto-scales when nodes join.</p>
                                        <pre className="doc-code-block mb-0 border-danger text-danger bg-dark x-small">{`docker service create \\
  --mode global nginx`}</pre>
                                        <p className="x-small text-secondary mt-2 mb-0"><strong>Use for:</strong> Log collectors (Fluentd), monitoring agents (Prometheus Node Exporter).</p>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-warning mt-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">Cannot change mode after creation!</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Once a service is created as <code>global</code> or <code>replicated</code>, you <strong>cannot switch</strong> it. You must delete and recreate the service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. ROUTING MESH */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-diagram-3-fill"></i></div>
                            <h2 className="doc-card-heading text-info">6. The Routing Mesh</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                When you publish a port with <code>-p 80:80</code>, Swarm sets up a <strong>Routing Mesh</strong>. This means a request to port 80 on <em>any node</em> (even one not running the service) will be automatically routed to a healthy container.
                            </p>
                            <div className="p-3 rounded border border-info" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <h6 className="fw-bold text-info mb-3"><i className="bi bi-diagram-2 me-2"></i>How it works:</h6>
                                <ol className="small text-secondary mb-0">
                                    <li className="mb-2">User hits <code>http://worker2:80</code></li>
                                    <li className="mb-2"><code>worker2</code> is not running the container, but the Routing Mesh (IPVS) intercepts the request.</li>
                                    <li>The request is transparently forwarded to a node that <em>is</em> running the container.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
