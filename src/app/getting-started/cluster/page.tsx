import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Understanding Clusters - Docker Documentation",
    description: "A noob-friendly introduction to Docker clusters, orchestration, and scaling beyond a single machine."
};

export default function ClusterPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        What is a Cluster?
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Moving from one machine to a "Team of Robots" working together.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* THE CORE CONCEPT - VISUALIZATION */}
                    <div className="doc-section-card shadow-lg border-primary overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Visualization: From One to Many
                            </h2>
                        </div>
                        <div className="doc-card-body p-0">
                            {/* VISUAL CHART AREA */}
                            <div className="p-5 bg-dark bg-opacity-25 border-bottom border-primary border-opacity-10">
                                <div className="row align-items-center justify-content-center text-center">
                                    {/* USERS */}
                                    <div className="col-lg-2 mb-4 mb-lg-0">
                                        <div className="fs-1 text-primary mb-2">
                                            <i className="bi bi-people-fill"></i>
                                        </div>
                                        <div className="fw-bold small opacity-75">Users</div>
                                        <div className="text-secondary x-small">Parallel Traffic</div>
                                    </div>

                                    {/* ARROW */}
                                    <div className="col-lg-1 d-none d-lg-block">
                                        <i className="bi bi-arrow-right fs-4 opacity-25"></i>
                                    </div>

                                    {/* LOAD BALANCER */}
                                    <div className="col-lg-2 mb-4 mb-lg-0">
                                        <div className="p-3 rounded-circle bg-primary bg-opacity-10 border border-primary border-opacity-25 mx-auto" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="bi bi-shield-shaded fs-3 text-primary"></i>
                                        </div>
                                        <div className="fw-bold small mt-3">Load Balancer</div>
                                        <div className="text-secondary x-small">Traffic Control</div>
                                    </div>

                                    {/* ARROW */}
                                    <div className="col-lg-1 d-none d-lg-block">
                                        <i className="bi bi-arrow-right fs-4 opacity-25"></i>
                                    </div>

                                    {/* MACHINES GRID */}
                                    <div className="col-lg-6">
                                        <div className="row g-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="col-4">
                                                    <div className="p-3 border rounded border-primary border-opacity-25 bg-dark bg-opacity-50 h-100 position-relative">
                                                        <div className="text-secondary x-small mb-2">Machine {i}</div>
                                                        <div className="p-2 border border-primary rounded bg-primary bg-opacity-25 shadow-sm">
                                                            <i className="bi bi-box-seam-fill text-primary"></i>
                                                            <div className="x-small fw-bold mt-1 text-primary">App {i}</div>
                                                        </div>
                                                        {/* PARALLEL LINE INDICATOR */}
                                                        <div className="position-absolute top-50 start-0 translate-middle h-50 border-start border-primary opacity-25 d-none d-lg-block" style={{ marginLeft: '-15px' }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPLANATORY TEXT */}
                            <div className="p-4 bg-dark bg-opacity-10">
                                <p className="mb-0">
                                    A <strong>Cluster</strong> allows you to clone your container across multiple machines. 
                                    Instead of one chef working alone, the cluster manages a team that handles 
                                    requests in <strong>parallel</strong>. If one machine fails, the traffic 
                                    is simply moved to the others.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* DOCKER CLUSTER VS AWS LOAD BALANCER */}
                    <div className="doc-section-card shadow-lg border-warning mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-cloud-check-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Mental Model: Docker Cluster vs. AWS Load Balancer
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>If you're familiar with AWS, you might be wondering: "Is a cluster just a Load Balancer (ALB) for Docker?"</p>
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="p-3 border rounded h-100">
                                        <h4 className="fw-bold fs-6">AWS Load Balancer (ALB)</h4>
                                        <p className="small text-secondary mb-0">
                                            A **Traffic Cop** that stands in front of your servers and directs 
                                            incoming requests. It doesn't manage the servers; it just sends the traffic.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 border border-warning rounded h-100 bg-dark bg-opacity-10">
                                        <h4 className="fw-bold fs-6 text-warning">Docker Cluster (Swarm/K8s)</h4>
                                        <p className="small text-secondary mb-0">
                                            The **Entire Restaurant Manager**. It includes its own internal load balancer, 
                                            but it also manages who is working (Nodes), where they sit (Containers), 
                                            and what happens if someone leaves (Self-healing).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="doc-alert mt-4">
                                <p className="mb-0 x-small text-secondary">
                                    <strong>The Key Difference:</strong> An AWS Load Balancer is a <strong>Service</strong> you buy. 
                                    A Docker Cluster is a <strong>System</strong> you build (or use) that <em>contains</em> its own automated load balancer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ORCHESTRATION */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Meet the "Orchestrator" (The Boss)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you have 50 servers, you don't want to log into each one manually to start containers. 
                                You need an <strong>Orchestrator</strong> — a software "Boss" that manages the cluster.
                            </p>
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">Docker Swarm</h3>
                                    <p className="doc-sub-card-text small">
                                        The "Easy Mode." It's built into Docker. Great for small teams who want simple clustering without learning a new language.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title text-info">Kubernetes (K8s)</h3>
                                    <p className="doc-sub-card-text small">
                                        The "Industy Standard." It's incredibly powerful but very complex. Most big companies use this to manage thousands of containers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NODE TYPES */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Node Types: Brains vs. Muscle
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>In a cluster, every computer is called a <strong>Node</strong>. They usually have two jobs:</p>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#1c2128', borderLeft: '4px solid #e3b341' }}>
                                    <div>
                                        <strong>The Manager Node (The Brain):</strong> <br />
                                        Decides which container goes where. If you say "Run 3 Nginx containers," the Manager picks the nodes with the most free RAM.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#1c2128', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <strong>The Worker Node (The Muscle):</strong> <br />
                                        Does the heavy lifting. It actually runs the containers and reports back to the Manager.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REAL EXAMPLE: THE LIFE OF A REQUEST */}
                    <div className="doc-section-card shadow-lg border-info col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-activity"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Real Example: The Life of a Request
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Let's look at how a cluster actually handles your website traffic.</p>
                            
                            <div className="doc-sub-card mb-4">
                                <h3 className="doc-sub-card-title">1. The Setup (Replication)</h3>
                                <p className="small mb-2">You tell the cluster to run 3 copies of your app:</p>
                                <pre className="doc-code-block mb-3">
                                    {`docker service create --replicas 3 my-app`}
                                </pre>
                                <p className="small text-secondary">Now Docker automatically distributes them:</p>
                                <ul className="list-unstyled small ps-3 border-start border-info">
                                    <li>Machine 1 - my-app (copy 1)</li>
                                    <li>Machine 2 - my-app (copy 2)</li>
                                    <li>Machine 3 - my-app (copy 3)</li>
                                </ul>
                            </div>

                            <div className="doc-sub-card mb-4">
                                <h3 className="doc-sub-card-title">2. Load Balancing (Working Together)</h3>
                                <p>Users connect to the cluster, and a **Load Balancer** decides which machine handles the request:</p>
                                <div className="p-3 bg-dark rounded small opacity-75">
                                    User 1 - Machine 1 - Container<br />
                                    User 2 - Machine 2 - Container<br />
                                    User 3 - Machine 3 - Container
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-warning mt-4">
                                <h4 className="fs-6 fw-bold">Important Question: What if a container crashes mid-request?</h4>
                                <p className="mb-0">
                                    Imagine User 2 is halfway through a process on Machine 2, and the container crashes. 
                                    This is where theory meets reality.
                                </p>
                            </div>

                            <div className="mt-4">
                                <h4 className="fs-5 fw-bold mb-3">The Reality of Failure</h4>
                                <p>
                                    When a container dies, everything in its memory (RAM) is gone. 
                                    Because other containers don't share that memory, the half-processed request is **lost**. 
                                    The user will likely see a timeout or an error.
                                </p>
                                
                                <h4 className="fs-6 fw-bold mt-4 mb-2">How the Cluster Recovers (Self-Healing)</h4>
                                <p className="small text-secondary">
                                    The cluster immediately notices only 2 containers are alive. It starts a new one 
                                    on a healthy machine to bring the count back to 3. The system survives, 
                                    even if one specific request failed.
                                </p>
                            </div>

                            <div className="doc-section-card mt-5 border-success shadow-none bg-transparent">
                                <h4 className="doc-card-heading fs-5 mb-4">How Real Systems Handle This (Interview Tips)</h4>
                                <div className="doc-sub-cards-grid">
                                    <div className="doc-sub-card border-success">
                                        <h5 className="fw-bold text-success small">1. Retry Mechanism</h5>
                                        <p className="x-small text-secondary">If a request fails, the browser or API gateway automatically tries again, hitting a different healthy container.</p>
                                    </div>
                                    <div className="doc-sub-card border-success">
                                        <h5 className="fw-bold text-success small">2. Stateless Design</h5>
                                        <p className="x-small text-secondary">Never store important data in container memory. Use a separate Database so even if the container dies, the data is safe.</p>
                                    </div>
                                    <div className="doc-sub-card border-success">
                                        <h5 className="fw-bold text-success small">3. Idempotent APIs</h5>
                                        <p className="x-small text-secondary">Ensure the same request can be repeated safely (like a payment with a unique ID) without causing duplicates.</p>
                                    </div>
                                    <div className="doc-sub-card border-success">
                                        <h5 className="fw-bold text-success small">4. Queue Systems</h5>
                                        <p className="x-small text-secondary">Instead of direct processing, users put jobs in a Queue. If a worker dies, another one simply picks up the job.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="alert alert-info bg-dark mt-4 border-info">
                                <h5 className="fs-6 fw-bold">Final Mental Model</h5>
                                <ul className="list-unstyled mb-0 small">
                                    <li>Container dies - request dies</li>
                                    <li>Cluster heals - system survives</li>
                                    <li>Retry - user succeeds</li>
                                </ul>
                                <hr className="opacity-10" />
                                <p className="mb-0 fw-bold">One-line Answer: A cluster guarantees System Availability, but your Application Design handles individual Request Failures.</p>
                            </div>
                        </div>
                    </div>


                    {/* INTERVIEW READY TOPICS */}
                    <div className="doc-section-card shadow-lg border-success col-md-12 mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-mortarboard-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Interview Corner: Why use a Cluster?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Use these "Power Words" in your next interview to sound like a Senior Architect:</p>
                            
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h3 className="doc-sub-card-title text-success">1. High Availability (HA)</h3>
                                        <p className="doc-sub-card-text">
                                            The system is "always on." If a whole Data Center goes offline, 
                                            the cluster automatically moves your app to another region. 
                                            No downtime.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h3 className="doc-sub-card-title text-success">2. Self-Healing</h3>
                                        <p className="doc-sub-card-text">
                                            If a container crashes, the Orchestrator notices immediately 
                                            and starts a new one. It's like a lizard regrowing its tail.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h3 className="doc-sub-card-title text-success">3. Scaling</h3>
                                        <p className="doc-sub-card-text">
                                            Need to handle 1 million users for Black Friday? 
                                            Just add more <strong>Worker Nodes</strong> to the cluster and 
                                            the workload spreads out thin across all of them.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h3 className="doc-sub-card-title text-success">4. Rolling Updates</h3>
                                        <p className="doc-sub-card-text">
                                            Update your app one container at a time. The users stay connected 
                                            to the old version while the new version slowly takes over.
                                        </p>
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
