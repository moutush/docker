import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Overlay Network Lab - Docker Documentation",
    description: "Learn how to connect containers across multiple physical host machines using Docker Swarm overlay networks."
};

export default function OverlayNetworkLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: The Overlay Network
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Shattering the single-host barrier to build distributed clusters.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE MULTI-SERVER DIVIDE */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-diagram-2-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The Multi-Server Divide
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Everything we have learned so far (Bridge, Host, Macvlan) applies to a <strong>single physical server</strong>. But what happens when your application scales and you need multiple servers?
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-server text-info me-2"></i>Server A (Frontend)</h5>
                                        <p className="small text-secondary mb-2">
                                            You buy a server on AWS. You create a bridge network called <code>app-net</code>. You start your React Frontend container here.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-warning"><i className="bi bi-server text-warning me-2"></i>Server B (Backend)</h5>
                                        <p className="small text-secondary mb-2">
                                            You buy a second server on AWS. You create a bridge network <em>also</em> called <code>app-net</code>. You start your Node/Mongo Backend container here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <h5 className="fw-bold fs-6 text-danger mt-4">The Ping Test</h5>
                            <p className="small text-secondary mb-2">
                                You jump into the Frontend container on Server A and try to ping the Backend container on Server B.
                            </p>

                            <pre className="doc-code-block mb-4 border-danger text-danger bg-dark x-small">
{`root@Server-A:/# docker exec -it frontend-app sh
/ # ping backend-api

ping: bad address 'backend-api'`}
                            </pre>

                            <div className="doc-alert doc-alert-danger mt-4 p-3">
                                <div>
                                    <strong className="d-block mb-1">The Harsh Reality</strong>
                                    <p className="mb-0 x-small text-dark">
                                        A bridge network ends at the physical network card of the host machine. Even if the bridge networks have the same name, they are completely isolated universes. The containers cannot talk to each other securely without publishing ports to the public internet (which is a massive security risk for a database).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE SOLUTION: DOCKER SWARM & OVERLAY */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-bezier2"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                2. The Solution: Docker Swarm Overlay
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The <code>overlay</code> network driver creates a distributed network across multiple Docker daemon hosts. It encrypts and tunnels the traffic between the servers, allowing containers on Server A to talk to containers on Server B as if they were sitting on the exact same local switch.
                            </p>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Step 1: Initialize the Swarm</h5>
                            <p className="small text-secondary mb-2">
                                Overlay networks require a cluster manager. We must convert Server A into a Docker Swarm Manager.
                            </p>
                            <pre className="doc-code-block mb-4 border-primary text-primary bg-dark x-small">
{`Server-A$ docker swarm init --advertise-addr <SERVER_A_PUBLIC_IP>

Swarm initialized: current node is now a manager.
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-... <SERVER_A_PUBLIC_IP>:2377`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Step 2: Join the Cluster</h5>
                            <p className="small text-secondary mb-2">
                                We copy the join command provided by Server A and run it on Server B to connect the two machines.
                            </p>
                            <pre className="doc-code-block mb-4 border-warning text-warning bg-dark x-small">
{`Server-B$ docker swarm join --token SWMTKN-1-... <SERVER_A_PUBLIC_IP>:2377

This node joined a swarm as a worker.`}
                            </pre>
                        </div>
                    </div>

                    {/* 3. CREATING AND TESTING THE OVERLAY */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-link-45deg"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                3. Building the Tunnel
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <h5 className="fw-bold fs-6 mt-2 text-light">Step 3: Create the Overlay Network</h5>
                            <p className="small text-secondary mb-2">
                                On Server A (the Manager), we create the network. The <code>--attachable</code> flag is crucial if you want to run standalone containers on it (not just Swarm Services).
                            </p>

                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`Server-A$ docker network create -d overlay --attachable my-multi-net`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Step 4: Deploy the Containers</h5>
                            <p className="small text-secondary mb-2">
                                Now we deploy the backend on Server B, and the frontend on Server A, both attached to our new overlay tunnel.
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`# On Server B (Worker)
Server-B$ docker run -d --name backend-api --network my-multi-net alpine sleep 3600

# On Server A (Manager)
Server-A$ docker run -it --name frontend-app --network my-multi-net alpine sh`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4 text-success">The Final Ping Test</h5>
                            <p className="small text-secondary mb-2">
                                Inside the frontend container on Server A, we ping the backend container on Server B.
                            </p>
                            
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`/ # ping backend-api

PING backend-api (10.0.1.3): 56 data bytes
64 bytes from 10.0.1.3: seq=0 ttl=64 time=1.452 ms
64 bytes from 10.0.1.3: seq=1 ttl=64 time=1.310 ms`}
                            </pre>

                            <div className="doc-alert doc-alert-success mt-4 p-3">
                                <div>
                                    <strong className="d-block mb-1">Success!</strong>
                                    <p className="mb-0 x-small text-dark">
                                        The ping works across the public internet! Docker intercepted the internal traffic, encrypted it via IPSec, tunneled it to Server B over port 4789 (VXLAN), and delivered it to the backend container. You have successfully conquered the multi-server wall.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE GOTCHA: FIREWALL PORTS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-shield-shaded"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                4. The DCA Gotcha: Firewall Ports
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker Swarm and Overlay networks cannot function if the underlying network drops their traffic. The DCA exam heavily tests your knowledge of the exact ports required for Swarm to operate.
                            </p>
                            <div className="p-3 rounded border border-warning mb-0" style={{ background: 'rgba(255, 193, 7, 0.05)' }}>
                                <h5 className="fw-bold text-warning"><i className="bi bi-fire me-2"></i>Required Open Ports</h5>
                                <ul className="small text-light mb-0">
                                    <li className="mb-2"><strong>TCP port 2377</strong>: For cluster management communications (Manager nodes only).</li>
                                    <li className="mb-2"><strong>TCP and UDP port 7946</strong>: For communication among nodes (container network discovery).</li>
                                    <li className="mb-0"><strong>UDP port 4789</strong>: For overlay network traffic (the actual data tunnel).</li>
                                </ul>
                                <p className="small text-secondary mt-3 mb-0">
                                    <strong>Exam Tip:</strong> Memorize these ports. If a question states nodes are joined but containers can't ping each other, port <code>4789 (UDP)</code> is likely blocked.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. THE GOTCHA: ATTACHABLE FLAG */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-pin-angle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                5. The DCA Gotcha: The Attachable Flag
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                By default, Overlay networks are designed exclusively for <strong>Swarm Services</strong> (created via <code>docker service create</code>). 
                            </p>
                            <div className="p-3 rounded border border-info mb-0" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <p className="small text-light mb-0">
                                    If you try to run a standalone container (<code>docker run ...</code>) and attach it to an overlay network, Docker will throw an error <strong>unless</strong> the network was created with the <code>--attachable</code> flag.
                                </p>
                                <p className="small text-secondary mt-2 mb-0">
                                    <strong>Exam Tip:</strong> A classic question involves a developer failing to connect a standalone debugging container to an overlay network. The answer is always that the network was not created as attachable.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
