import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Types of Networks - Docker Documentation",
    description: "A comprehensive guide on Docker network drivers (bridge, host, none, macvlan, etc.), when to use them, and how to connect containers."
};

export default function NetworkingTypesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Types of Docker Networks
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Bridge, Host, None, and beyond. Understanding drivers, use-cases, and multi-network connectivity.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE BRIDGE NETWORK */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Bridge Network (The Default)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <p>
                                        <strong>The Tech Definition:</strong> A software bridge that allows containers connected to the same bridge network to communicate, while providing isolation from containers not connected to it. It uses NAT (Network Address Translation) to allow outbound internet access.
                                    </p>
                                    <div className="p-3 rounded mb-3" style={{ background: '#1c2128', borderLeft: '4px solid #0d6efd' }}>
                                        <strong>Noob Metaphor:</strong> An apartment building with an internal intercom system. You can easily call your neighbors, but to talk to the outside world, the building management has to route the call through the main switchboard.
                                    </div>
                                    
                                    <h5 className="fw-bold mt-4 text-success"><i className="bi bi-check-circle-fill me-2"></i>When to use:</h5>
                                    <ul className="small text-secondary">
                                        <li>Standard development and testing.</li>
                                        <li>When you need multiple containers (e.g., frontend + database) to communicate securely on the same host.</li>
                                    </ul>

                                    <h5 className="fw-bold mt-3 text-danger"><i className="bi bi-x-circle-fill me-2"></i>When NOT to use:</h5>
                                    <ul className="small text-secondary">
                                        <li>When you need maximum network performance (NAT overhead).</li>
                                        <li>When you are running a swarm cluster across multiple physically separate servers (use <code>overlay</code> instead).</li>
                                    </ul>
                                </div>
                                <div className="col-md-5">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6">Commands</h5>
                                        <p className="x-small mb-1 text-secondary">Create a user-defined bridge:</p>
                                        <pre className="doc-code-block x-small mb-2">{`# -d bridge is the implicit default!
docker network create my-net`}</pre>
                                        
                                        <p className="x-small mb-1 text-secondary">Run a container on it:</p>
                                        <pre className="doc-code-block x-small mb-0">{`docker run -d \\
  --name webapp \\
  --network my-net \\
  nginx`}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE HOST NETWORK */}
                    <div className="doc-section-card shadow-lg border-warning mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-hdd-network-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                2. Host Network
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <p>
                                        <strong>The Tech Definition:</strong> The container shares the host's networking namespace. It does <strong>not</strong> get its own IP address. If a container runs on port 80, it's instantly available on the host machine's port 80.
                                    </p>
                                    <div className="p-3 rounded mb-3" style={{ background: '#1c2128', borderLeft: '4px solid #ffc107' }}>
                                        <strong>Noob Metaphor:</strong> The container moves out of the apartment building and pitches a tent right in the middle of the host's living room. It uses the host's TV, the host's fridge, and the host's front door directly.
                                    </div>
                                    
                                    <h5 className="fw-bold mt-4 text-success"><i className="bi bi-check-circle-fill me-2"></i>When to use:</h5>
                                    <ul className="small text-secondary">
                                        <li>When you need <strong>absolute maximum performance</strong> without NAT overhead.</li>
                                        <li>High-traffic databases or networking tools (e.g., load balancers).</li>
                                    </ul>

                                    <h5 className="fw-bold mt-3 text-danger"><i className="bi bi-x-circle-fill me-2"></i>When NOT to use:</h5>
                                    <ul className="small text-secondary">
                                        <li>When you need to run two containers using the same port (Port clash! They both try to grab the host's port 80).</li>
                                        <li>If you care about security/isolation from the underlying server.</li>
                                    </ul>
                                </div>
                                <div className="col-md-5">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6">Commands</h5>
                                        <p className="x-small mb-1 text-secondary">No need to create a network, just assign it directly at launch time:</p>
                                        <pre className="doc-code-block x-small mb-2">{`docker run -d \\
  --name webapp \\
  --network host \\
  nginx`}</pre>
                                        <div className="doc-alert doc-alert-warning mt-2 mb-0 p-3">
                                            <i className="bi bi-exclamation-triangle-fill"></i>
                                            <div>
                                                Notice you don't map ports (<code>-p 8080:80</code> is ignored because it claims port 80 natively).
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE NONE NETWORK */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-slash-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                3. None Network
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <p>
                                        <strong>The Tech Definition:</strong> Complete isolation. The container gets its own network namespace but has no network interfaces attached to it except a loopback interface (`localhost`). It cannot reach the internet or other containers.
                                    </p>
                                    <div className="p-3 rounded mb-3" style={{ background: '#1c2128', borderLeft: '4px solid #dc3545' }}>
                                        <strong>Noob Metaphor:</strong> An underground, bomb-proof bunker with no phone lines, no internet, and no doors. 
                                    </div>
                                    
                                    <h5 className="fw-bold mt-4 text-success"><i className="bi bi-check-circle-fill me-2"></i>When to use:</h5>
                                    <ul className="small text-secondary">
                                        <li>Highly secure offline jobs (e.g., generating encryption keys or hashing passwords).</li>
                                        <li>Processing sensitive local files via bind mounts without any fear of data leaking to the internet.</li>
                                    </ul>
                                </div>
                                <div className="col-md-5">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6">Commands</h5>
                                        <p className="x-small mb-1 text-secondary">Run it offline:</p>
                                        <pre className="doc-code-block x-small mb-0">{`docker run -it \\
  --name offline-worker \\
  --network none \\
  python:alpine sh`}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ADVANCED DRIVERS: OVERLAY & MACVLAN */}
                    <div className="doc-section-card shadow-lg border-secondary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-clouds-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Advanced Drivers: Overlay & Macvlan
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="mb-4">
                                While Bridge, Host, and None cover 95% of standard Docker workflows, enterprise environments often require these advanced drivers:
                            </p>
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h4 className="fw-bold text-secondary"><i className="bi bi-hdd-network me-2"></i>Overlay Network</h4>
                                        <p className="small text-secondary mt-2">
                                            <strong>Tech Definition:</strong> Connects multiple physical Docker daemons together and enables swarm services to communicate with each other seamlessly across different servers.
                                        </p>
                                        <p className="small text-secondary mt-2">
                                            <strong>Noob Metaphor:</strong> An underground tunnel system that connects several different apartment buildings together. Even if two people live in entirely different buildings (different servers), they can walk through the tunnel and talk as if they were in the same building.
                                        </p>
                                        <h6 className="fw-bold fs-6 mt-3 text-success">When to use:</h6>
                                        <p className="small text-secondary m-0">When running Docker Swarm across multiple physical machines.</p>
                                        <div className="mt-3">
                                            <p className="x-small mb-1 text-secondary fw-bold">Command:</p>
                                            <pre className="doc-code-block x-small mb-0">{`docker network create -d overlay my-swarm-net`}</pre>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h4 className="fw-bold text-secondary"><i className="bi bi-router me-2"></i>Macvlan Network</h4>
                                        <p className="small text-secondary mt-2">
                                            <strong>Tech Definition:</strong> Assigns a MAC address to a container, making it appear as a physical device on your actual physical network. Allows the container to bypass the Docker host's network stack completely.
                                        </p>
                                        <p className="small text-secondary mt-2">
                                            <strong>Noob Metaphor:</strong> The container goes straight to the city council, bypasses the apartment building management entirely, and gets its own entirely independent street address as if it were a newly built house.
                                        </p>
                                        <h6 className="fw-bold fs-6 mt-3 text-success">When to use:</h6>
                                        <p className="small text-secondary m-0">When migrating legacy apps that expect to be directly connected to the physical network, rather than routed through a host.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CROSS NETWORKING / MULTI NETWORKS */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-bezier2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Connecting the Dots: Cross-Networking
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>Can a container belong to more than one network?</strong><br/>
                                Yes! In fact, this is the standard way to build secure, multi-tier architectures.
                            </p>
                            
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-info h-100">
                                        <h5 className="fw-bold text-info"><i className="bi bi-shield-lock-fill me-2"></i>The Multi-Tier Security Pattern</h5>
                                        <p className="small text-secondary mt-2">
                                            Imagine a web app and a database. You don't want the database exposed to the public internet network. 
                                        </p>
                                        <p className="small text-secondary">
                                            You create two networks: <code>frontend-net</code> and <code>backend-net</code>.
                                        </p>
                                        <ul className="small text-secondary mb-0">
                                            <li><strong>Nginx (Load Balancer):</strong> Attached to <code>frontend-net</code> only.</li>
                                            <li><strong>Web App (Node.js):</strong> Attached to <strong>BOTH</strong> <code>frontend-net</code> AND <code>backend-net</code>.</li>
                                            <li><strong>Database (Mongo):</strong> Attached to <code>backend-net</code> only.</li>
                                        </ul>
                                        <p className="small text-secondary mt-2 fw-bold text-light">
                                            Result: The Nginx server cannot talk to the Mongo database! Only the Node app bridging both networks can talk to both.
                                        </p>

                                        <div className="mt-4">
                                            <p className="x-small mb-1 text-info fw-bold">How to build this:</p>
                                            <pre className="doc-code-block x-small mb-0">
{`# 1. Create the networks
docker network create frontend-net
docker network create backend-net

# 2. Launch Node app on frontend
docker run -d --name node-app --network frontend-net node-img

# 3. Connect Node app to backend (The Bridge!)
docker network connect backend-net node-app

# 4. Launch Mongo on backend only
docker run -d --name mongo --network backend-net mongo`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6">How to attach a running container:</h5>
                                        <p className="x-small text-secondary mb-3">
                                            You can dynamically attach or detach running containers to networks without restarting them!
                                        </p>
                                        
                                        <p className="x-small mb-1 text-secondary">Connect Node app to backend:</p>
                                        <pre className="doc-code-block x-small mb-3">{`docker network connect backend-net node-app`}</pre>
                                        
                                        <p className="x-small mb-1 text-secondary">Disconnect Node app from frontend:</p>
                                        <pre className="doc-code-block x-small mb-0">{`docker network disconnect frontend-net node-app`}</pre>
                                        
                                        <div className="doc-alert doc-alert-info mt-3 p-3">
                                            <i className="bi bi-info-circle-fill"></i>
                                            <div>
                                                When a container connects to multiple networks, it simply gets multiple virtual network interfaces (like plugging multiple ethernet cables into one computer).
                                            </div>
                                        </div>
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
