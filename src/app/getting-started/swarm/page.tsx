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
                    {/* CONCEPT BRIDGE: CLUSTERING VS SWARM */}
                    <div className="doc-section-card border-secondary border-opacity-25 bg-dark bg-opacity-25 mb-4">
                        <div className="p-4">
                            <div className="row align-items-center">
                                <div className="col-md-2 text-center border-end border-white border-opacity-10">
                                    <i className="bi bi-lightbulb-fill text-info fs-3"></i>
                                    <div className="fw-bold x-small text-info mt-1">Mental Model</div>
                                </div>
                                <div className="col-md-10 ps-md-4">
                                    <h3 className="fs-6 fw-bold mb-1">Clustering vs. Swarm</h3>
                                    <p className="small text-secondary mb-0">
                                        <strong>Clustering</strong> is a high-level computer science <strong>concept</strong>:
                                        grouping multiple computers together so they behave as one single powerful machine.
                                        <strong>Docker Swarm</strong> is how Docker <strong>implements</strong> that concept.
                                        One is the "Idea," the other is the "Tool."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 1. ARCHITECTURE: ROLES WITHIN THE TEAM */}
                    <div className="doc-section-card shadow-lg border-primary overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Team Roles: Manager vs Worker
                            </h2>
                        </div>
                        <div className="doc-card-body p-0">
                            <div className="p-4 bg-dark bg-opacity-10">
                                <p className="mb-0 text-secondary small">
                                    Swarm is just a <strong>"Mode"</strong> you turn on in your Docker Engine.
                                    Once turned on, each machine (Node) picks a <strong>Role</strong>.
                                    Think of it as identical robots choosing different hats:
                                </p>
                            </div>

                            {/* VISUAL CHART: NODES WITH HATS */}
                            <div className="p-5 bg-dark bg-opacity-25 border-bottom border-top border-primary border-opacity-10">
                                <div className="row justify-content-center text-center">
                                    <div className="col-12 mb-4">
                                        <div className="x-small text-secondary fw-bold text-uppercase border-bottom border-secondary border-opacity-10 d-inline-block pb-1 px-3">
                                            The Swarm Cluster (Identical Machines)
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border border-primary rounded bg-primary bg-opacity-10 position-relative">
                                            <div className="position-absolute top-0 start-50 translate-middle-y bg-primary text-white x-small px-2 rounded-pill" style={{ marginTop: '-12px' }}>
                                                Boss Hat
                                            </div>
                                            <i className="bi bi-cpu-fill fs-2 text-primary opacity-75"></i>
                                            <div className="mt-2 fw-bold text-primary">Manager Node</div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                                        <i className="bi bi-plus fs-3 opacity-25"></i>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border border-secondary rounded bg-dark bg-opacity-50">
                                            <i className="bi bi-gear-fill fs-2 opacity-25"></i>
                                            <div className="mt-2 fw-bold text-secondary opacity-75">Worker Node</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border border-secondary rounded bg-dark bg-opacity-50">
                                            <i className="bi bi-gear-fill fs-2 opacity-25"></i>
                                            <div className="mt-2 fw-bold text-secondary opacity-75">Worker Node</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-dark bg-opacity-10">
                                <div className="row g-4 align-items-stretch">
                                    <div className="col-lg-6">
                                        <div className="p-4 h-100 rounded border border-primary bg-opacity-5 shadow-sm border-opacity-25">
                                            <h3 className="fw-bold fs-6 mb-2">The Manager (Brain)</h3>
                                            <p className="small text-secondary mb-0">
                                                Coordinates the group, keeps the "Desired State," and signs certificates.
                                                <strong>It is just a machine</strong>, but it is in charge.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-4 h-100 rounded border border-secondary bg-dark bg-opacity-50 border-opacity-25">
                                            <h3 className="fw-bold fs-6 mb-2">The Worker (Muscle)</h3>
                                            <p className="small text-secondary mb-0">
                                                Executes orders. It doesn't know the big picture;
                                                it just runs the containers the Manager assigns to it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-alert bg-info bg-opacity-10 border-info border-opacity-25 p-3 rounded mt-4">
                                    <p className="mb-0 x-small text-info text-center">
                                        <strong>Pro Tip:</strong> By default, a Manager is also a Worker.
                                        It handles the "Brain" work and runs containers at the same time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. FAILURE ANALYSIS: THE MANAGER CRISIS */}
                    <div className="doc-section-card shadow-lg border-danger mt-4 overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Crisis: What if the Manager Crashes?
                            </h2>
                        </div>
                        <div className="doc-card-body p-0">
                            <div className="p-5 border-bottom border-danger border-opacity-10">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="h-100 border border-secondary border-opacity-25 p-4 rounded bg-dark bg-opacity-25">
                                            <h3 className="fs-6 fw-bold text-secondary mb-3">Scenario A: Single Manager Cluster</h3>
                                            <div className="doc-alert border-danger bg-danger bg-opacity-10 mb-3 p-2 rounded text-center">
                                                <div className="fw-bold text-danger x-small text-uppercase">Status: FROZEN</div>
                                            </div>
                                            <p className="small text-secondary mb-0">
                                                Existing containers keep running, but <strong>Self-healing stops.</strong>
                                                If an app crashes, it stays dead because the Brain isn't there to restart it.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="h-100 border border-success border-opacity-25 p-4 rounded bg-dark bg-opacity-25">
                                            <h3 className="fs-6 fw-bold text-success mb-3">Scenario B: Multi-Manager (HA)</h3>
                                            <div className="doc-alert border-success bg-success bg-opacity-10 mb-3 p-2 rounded text-center">
                                                <div className="fw-bold text-success x-small text-uppercase">Status: SELF-RECOVERY</div>
                                            </div>
                                            <p className="small text-secondary mb-0">
                                                Other Managers hold an <strong>Election</strong>. A new Leader is picked in milliseconds.
                                                The cluster keeps running perfectly.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CRASH DETECTION LOGIC */}
                            <div className="p-4 bg-dark bg-opacity-10">
                                <h3 className="fs-6 fw-bold mb-4 text-center">
                                    <i className="bi bi-search me-2 text-primary"></i>
                                    The Detection: How do they know the Manager is gone?
                                </h3>
                                <div className="row g-4">
                                    <div className="col-lg-7">
                                        <div className="p-4 rounded border border-white border-opacity-10 bg-dark bg-opacity-25 shadow-sm h-100">
                                            <h4 className="fs-6 fw-bold mb-3 text-primary">Silence is the Signal</h4>
                                            <p className="small text-secondary mb-3">
                                                The Leader sends a <strong> Heartbeat</strong> every few hundred milliseconds.
                                                If other Managers stop hearing it, they assume the Leader is dead.
                                                Quietness is the strongest alarm in a Swarm.
                                            </p>
                                            <div className="d-flex align-items-center p-2 rounded bg-primary bg-opacity-10 border border-primary border-opacity-25">
                                                <i className="bi bi-heart-pulse-fill text-primary me-2"></i>
                                                <div className="x-small text-primary fw-bold">Heartbeat = "I am alive"</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="p-4 rounded border border-danger border-opacity-20 bg-opacity-5 shadow-sm h-100">
                                            <h4 className="fs-6 fw-bold mb-3 text-danger">What if ONLY 1 Manager?</h4>
                                            <p className="small text-secondary mb-0">
                                                The Workers still hear the silence, but <strong>they are just robots.</strong>
                                                They keep doing their last assigned job, but they don't have the
                                                "Authority" to pick a new boss. They effectively <strong>go blind</strong>—running
                                                but with nobody to report to.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NETWORK PLANE PERSISTENCE */}
                            <div className="p-4 rounded border border-success">
                                <div className="row align-items-center">
                                    <div className="col-md-2 text-center">
                                        <div className="display-6 text-success mb-2">
                                            <i className="bi bi-diagram-3-fill"></i>
                                        </div>
                                        <div className="fw-bold x-small text-success">Network Plane</div>
                                    </div>
                                    <div className="col-md-10 ps-md-4">
                                        <h4 className="fs-6 fw-bold mb-2 text-success">The Routing Ghost: Why Load Balancing still works!</h4>
                                        <p className="small text-secondary mb-2">
                                            You might wonder: <strong>"If the Manager is dead, how do new requests find my containers?"</strong>
                                        </p>
                                        <p className="small text-secondary">
                                            The answer is <strong>Decentralization</strong>. The Manager is the <strong>GPS (Management Plane)</strong>,
                                            but every Worker node has a <strong>Downloaded Map</strong> of the cluster inside its kernel (using IPVS).
                                            Even if the GPS crashes, the trucks (Workers) still have their maps! They can still route
                                            incoming traffic to the containers that are already running.
                                        </p>
                                        <div className="doc-alert bg-success bg-opacity-10 border-success border-opacity-25 p-2 rounded">
                                            <p className="mb-0 x-small text-success">
                                                <strong>Result:</strong> Traffic still flows. Users don't notice the crash.
                                                You just can't <em>change</em> anything until the manager is back.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE FUNDAMENTALS: KEY TERMS BREAKDOWN */}
                    <div className="doc-section-card shadow-lg mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-list-nested"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Three Pillars: Service, Task, Replica
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary opacity-75">To understand Swarm, you must understand these three levels of organization:</p>
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card border-info border-opacity-25">
                                    <h3 className="doc-sub-card-title text-info">1. Service (The Job)</h3>
                                    <p className="doc-sub-card-text small text-secondary">
                                        The definition of what you want to run. Instead of saying "Run this container,"
                                        you say "I want a Service that runs Nginx on Port 80."
                                    </p>
                                </div>
                                <div className="doc-sub-card border-warning border-opacity-25">
                                    <h3 className="doc-sub-card-title text-warning">2. Replica (The Copies)</h3>
                                    <p className="doc-sub-card-text small text-secondary">
                                        How many "copies" of the container you want. Swarm ensures that even if a machine dies,
                                        the number of replicas stays exactly what you asked for.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-info border-opacity-25">
                                    <h3 className="doc-sub-card-title text-info">3. Task (The Container)</h3>
                                    <p className="doc-sub-card-text small text-secondary">
                                        The actual running instance. A Service is the "plan," and a Task is the "work."
                                        If you have 3 Replicas, Swarm will create 3 Tasks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. VISUALIZATION: THE SELF-HEALING LOOP */}
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
                            <div className="p-5 bg-dark bg-opacity-25 border-bottom border-success border-opacity-10 text-center">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <div className="p-3 border border-primary rounded bg-primary bg-opacity-10 shadow-sm">
                                            <div className="text-primary small fw-bold">Desired State</div>
                                            <div className="fs-4 fw-bold">3 Replicas</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 py-3 py-md-0">
                                        <div className="position-relative">
                                            <div className="small opacity-50 mb-2">Manager checks...</div>
                                            <i className="bi bi-arrow-repeat fs-1 text-success animate-swarm-rotate"></i>
                                            <div className="small opacity-50 mt-2">...and fixes discrepancy</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 border border-warning rounded bg-warning bg-opacity-10 shadow-sm">
                                            <div className="text-warning small fw-bold">Actual State</div>
                                            <div className="fs-4 fw-bold text-nowrap">2 Alive (1 Crashed)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-dark bg-opacity-10 text-secondary">
                                <h4 className="fs-6 fw-bold mb-2 text-light">How it works (Step-by-Step):</h4>
                                <ol className="list-unstyled mb-0 small opacity-75">
                                    <li className="mb-2"><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> You tell Swarm: "I want 3 copies of my app" (Desired State).</li>
                                    <li className="mb-2"><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> A server explodes. Now only 2 copies are running (Actual State).</li>
                                    <li><i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '8px' }}></i> Swarm notices the mismatch and <strong>immediately</strong> starts a 3rd copy on a healthy server.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE PULSE: COMMUNICATION FLOW */}
                    <div className="doc-section-card shadow-lg border-info mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-activity"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Pulse: How it hears the Workers
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-md-6 border-end border-white border-opacity-10 pe-md-4">
                                    <h5 className="fw-bold mb-3 text-light">1. Control (Manager → Worker)</h5>
                                    <p className="small text-secondary">
                                        The Manager sends a <strong>Job Assignment</strong> (known as a Task).
                                        It says: "Hey Worker 1, you are now responsible for running this Nginx container."
                                    </p>
                                </div>
                                <div className="col-md-6 ps-md-4">
                                    <h5 className="fw-bold mb-3 text-light">2. Feedback Loop (Worker → Manager)</h5>
                                    <p className="small text-secondary">
                                        Every few seconds, the Worker sends a <strong>Heartbeat</strong> (a Pulse).
                                        It tells the Manager: <em>"I am still alive, and my Nginx container is running fine."</em>
                                    </p>
                                </div>
                            </div>
                            <div className="doc-alert mt-4 bg-info bg-opacity-10 border-info border-opacity-25 p-3 rounded">
                                <p className="mb-0 x-small text-info fw-bold">
                                    Wait... What if a Worker stops talking? If the heartbeat stops, the Manager
                                    doesn't wait—it instantly assumes that server is dead and moves all its "Jobs"
                                    to other healthy Workers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. NODE LIFECYCLE: THE FLAPPING NODE */}
                    <div className="doc-section-card shadow-lg border-info mt-4 overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-lifecycle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Node Lifecycle: The Flapping Node
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="doc-sub-card bg-dark bg-opacity-25 border-info border-opacity-25">
                                <h4 className="fw-bold fs-6 text-info">Q: What if a node "flaps" (goes down then comes back)?</h4>
                                <p className="small mb-3 text-secondary">
                                    If a node stops heartbeating, Swarm waits for a 5-second <strong>grace period</strong>.
                                    If it stays silent, the Manager "Evicts" it and moves jobs elsewhere.
                                </p>
                                <p className="small mb-0 text-secondary opacity-75">
                                    If the node suddenly wakes up, it re-connects, but its old jobs are already gone.
                                    It stays as <strong>Ready</strong> until the Manager gives it new work.
                                </p>
                            </div>
                            <div className="doc-alert mt-4 p-3 border border-secondary border-opacity-25 rounded bg-dark bg-opacity-25">
                                <p className="mb-0 x-small text-secondary">
                                    <strong>Removed Nodes:</strong> Dead machines stay in the "Down" list.
                                    You must manually run <code>docker node rm [ID]</code> to forget them forever.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. DEEP DIVE: WHERE DO THE "COPIES" COME FROM? */}
                    <div className="doc-section-card shadow-lg border-warning mt-4 overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-journal-text"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Deep Dive: Where do the "Copies" come from?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="mb-4 text-secondary">
                                When a new machine starts a container, it <strong>DOES NOT</strong> copy the
                                memory or data from the crashed node. It's a fresh start.
                            </p>
                            <div className="doc-sub-cards-grid gap-3">
                                <div className="doc-sub-card border-primary p-3">
                                    <h5 className="fw-bold fs-6 text-primary mb-2">1. The Custom Image (Recipe)</h5>
                                    <p className="small text-secondary mb-0">
                                        Your <strong>Dockerfile</strong> adds layers (Python, Apps) to a base.
                                        This is your master recipe.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-primary p-3">
                                    <h5 className="fw-bold fs-6 text-primary mb-2">2. The Registry (Warehouse)</h5>
                                    <p className="small text-secondary mb-0">
                                        You <strong>Push</strong> your image to a central Registry.
                                        All nodes pull from this one master copy.
                                    </p>
                                </div>
                            </div>
                            <div className="doc-sub-card border-warning bg-dark bg-opacity-25 py-3 mt-4 text-center">
                                <h4 className="fw-bold fs-6 text-warning mb-0">
                                    The Rule: "Build Once, Run Everywhere"
                                </h4>
                                <p className="small opacity-75 mt-2 mb-0">
                                    Manager: <em>"Worker 5, pull v1.2 of the Custom Image from Registry and start it."</em>
                                </p>
                            </div>
                            <div className="doc-sub-card border-info bg-info bg-opacity-10 mt-3 border-opacity-25">
                                <h4 className="fw-bold fs-6 text-info">Q: Can I run Swarm without a Registry?</h4>
                                <p className="small mb-2 text-secondary">
                                    <strong>Theoretically, Yes.</strong> But you'd have to manually copy the image file
                                    to every node. If Machine 5 doesn't have it locally, the Swarm will fail there.
                                </p>
                            </div>
                            <div className="doc-sub-card border-danger mt-4 bg-danger bg-opacity-10 border-opacity-25">
                                <p className="mb-0 x-small text-danger fw-bold text-center">
                                    Important: This is why a Registry is the "Source of Truth" for any serious cluster!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 7. TECHNICAL DEEP DIVE: SECURITY & GRPC */}
                    <div className="doc-section-card shadow-lg border-secondary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Technical Deep Dive: Security & gRPC
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <h5 className="fw-bold text-info mb-3">Questions & Answers (Senior Level)</h5>
                            <div className="doc-sub-cards-grid">
                                <div className="doc-sub-card">
                                    <h6 className="fw-bold text-primary mb-2">Q: What is mTLS and who assigns it?</h6>
                                    <p className="small text-secondary mb-0">
                                        <strong>mTLS (Mutual TLS)</strong> means both the Manager and the Worker show their certificates to each other.
                                        The <strong>Swarm Manager</strong> is the Root CA (Certificate Authority).
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h6 className="fw-bold text-primary mb-2">Q: What algo is used for the Crypto ID?</h6>
                                    <p className="small text-secondary mb-0">
                                        Docker uses <strong>SHA256</strong> to hash the cluster's certificates and join tokens.
                                        The Node ID itself is a random 25-character string that identifies that specific machine.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-danger border-opacity-25">
                                    <h6 className="fw-bold text-danger mb-2">Q: What if someone steals a certificate?</h6>
                                    <p className="small text-secondary mb-0">
                                        Certificates are node-specific. If compromised, the Manager can <strong>revoke</strong> it.
                                        Also, certs <strong>rotate automatically</strong> (every 90 days), so they expire quickly.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h6 className="fw-bold text-primary mb-2">Q: Where is mTLS stored?</h6>
                                    <p className="small text-secondary mb-0">
                                        It is stored on the <strong>Host machine's filesystem</strong> (<code>/var/lib/docker/swarm/certificates/</code>).
                                        Containers never see these; they are machine-level only.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-info border-opacity-25">
                                    <h6 className="fw-bold text-info mb-2">Q: What is gRPC?</h6>
                                    <p className="small text-secondary mb-0">
                                        A binary language using <strong>HTTP/2</strong>. It's faster than REST APIs and requires mTLS by design in Swarm.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 8. PRACTICAL COMMANDS */}
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
                            <p className="text-secondary opacity-75">Here are the two commands that make Swarm happen:</p>
                            <div className="row g-4 mt-2 mb-2">
                                <div className="col-md-6 border-end border-white border-opacity-10">
                                    <h4 className="fs-6 fw-bold text-light">1. Initialize the Cluster</h4>
                                    <pre className="doc-code-block mb-3">
                                        {`docker swarm init`}
                                    </pre>
                                    <p className="x-small text-secondary">This turns your computer into a <strong>Manager Node</strong> and starts the engine.</p>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="fs-6 fw-bold text-light">2. Create a Global Service</h4>
                                    <pre className="doc-code-block mb-3">
                                        {`docker service create --replicas 3 --name web -p 80:80 nginx`}
                                    </pre>
                                    <p className="x-small text-secondary">This creates 3 replicas running Nginx, opened on port 80 across the whole cluster.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 9. INTERVIEW READY: RAFT CONSENSUS */}
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
                            <h3 className="fs-5 fw-bold mb-3 text-warning opacity-75">The "Voting System"</h3>
                            <p className="text-secondary opacity-75">
                                In a cluster with 3 or 5 Managers, how do they decide who is in charge?
                                They use an algorithm called **Raft Consensus**.
                            </p>
                            <div className="row g-4 mt-3">
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning border-opacity-25 rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Voting</h4>
                                        <p className="x-small text-secondary mb-0">Managers vote for a leader. If the leader dies, they hold a new election immediately.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning border-opacity-25 rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Quorum</h4>
                                        <p className="x-small text-secondary mb-0">The cluster only works if more than 50% of Managers are alive (avoids "split-brain").</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 border border-warning border-opacity-25 rounded bg-dark bg-opacity-50 h-100">
                                        <h4 className="small fw-bold text-warning">Odd Numbers</h4>
                                        <p className="x-small text-secondary mb-0">Always have 3, 5, or 7. You never have 2, because you can't have a tie-breaker vote!</p>
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
