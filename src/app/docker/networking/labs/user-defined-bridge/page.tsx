import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "User-Defined Networks - Docker Documentation",
    description: "Learn why user-defined bridge networks are the professional standard for Docker networking, featuring automatic DNS, isolation, and dynamic connectivity."
};

export default function UserDefinedNetworkingPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        User-Defined Networks: The Pro Standard
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Solve the DNS "Wall" and build secure, multi-tier architectures with custom bridges.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE AUTOMATIC PHONEBOOK (DNS) */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-book-half"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. The Automatic Phonebook (DNS)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                In the Default Bridge lab, we saw how fragile IP addresses are. User-defined networks solve this with <strong>Automatic Service Discovery</strong>. Docker runs a built-in DNS server that maps container names to their internal IPs automatically.
                            </p>
                            
                            <div className="p-3 rounded mb-4" style={{ background: '#1c2128', borderLeft: '4px solid #0d6efd' }}>
                                <strong className="text-primary d-block mb-1">The Metaphor:</strong>
                                <p className="small mb-0">
                                    Instead of forcing you to memorize the IP (phone number) of every neighbor, Docker gives everyone a name tag. You just say "Call Postgres," and Docker's internal switchboard handles the connection.
                                </p>
                            </div>

                            <h5 className="fw-bold fs-6 text-light mt-4">Detective Work: How to see the DNS?</h5>
                            <p className="small text-secondary">
                                Docker manages this "Phonebook" by injecting its own DNS server into the container's configuration. You can see this secret "Switchboard Address" by checking the <code>/etc/resolv.conf</code> file inside a container:
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
{`# 1. Run a container on the default bridge and check DNS
docker run --rm alpine cat /etc/resolv.conf
# Result: Usually matches your host machine's DNS

# 2. Run a container on a CUSTOM network and check DNS
docker network create my-test-net
docker run --rm --network my-test-net alpine cat /etc/resolv.conf
# Result: nameserver 127.0.0.11 <--- THIS IS DOCKER'S DNS SERVER!`}
                            </pre>

                            <div className="doc-sub-card border-secondary mb-3">
                                <h6 className="fw-bold fs-6 text-light mb-2">Command Breakdown:</h6>
                                <div className="row g-2 x-small">
                                    <div className="col-4 text-primary fw-bold">--rm</div>
                                    <div className="col-8 text-secondary">Automatically <strong>removes</strong> the container after it exits. Keeps your system clean.</div>
                                    
                                    <div className="col-4 text-primary fw-bold">alpine</div>
                                    <div className="col-8 text-secondary">A tiny (5MB) image used as a fast, surgical diagnostic tool.</div>
                                    
                                    <div className="col-4 text-primary fw-bold">cat /etc/resolv.conf</div>
                                    <div className="col-8 text-secondary">The command to run inside. <code>cat</code> prints the DNS resolver config file.</div>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong className="d-block mb-1 text-info">The Magic IP: 127.0.0.11</strong>
                                    <p className="mb-0 small text-secondary">
                                        This is the local loopback address where Docker's DNS magic lives for that specific bridge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE LAB: BUILDING YOUR FIRST BRIDGE */}
                    <div className="doc-section-card shadow-lg border-success mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-plus-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                2. The Lab - Building your First Bridge
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Let's build a network that actually works. We'll create a custom bridge and connect two containers that can finally talk by name.
                            </p>

                            <div className="doc-sub-card border-secondary mb-4">
                                <h6 className="fw-bold fs-6">The Success Workflow:</h6>
                                <pre className="doc-code-block x-small mb-0">
{`# 1. Create your custom bridge
docker network create pro-network

# 2. Launch the DB (no ports needed for internal talk!)
docker run -d --name db-server --network pro-network redis

# 3. Launch the Web App and talk to the DB by NAME
docker run -it --network pro-network alpine ping db-server`}
                                </pre>
                            </div>

                            <h5 className="fw-bold fs-6 text-light mt-5 mb-3">DCA Power User: Network Create Parameters</h5>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover border-secondary x-small">
                                    <thead>
                                        <tr className="text-success">
                                            <th>Flag</th>
                                            <th>What it does</th>
                                            <th>When to use it</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-secondary">
                                        <tr>
                                            <td className="text-light fw-bold"><code>--driver</code></td>
                                            <td>Specifies the network type (default is <code>bridge</code>).</td>
                                            <td>When you need <code>overlay</code> for Swarm or <code>macvlan</code>.</td>
                                        </tr>
                                        <tr>
                                            <td className="text-light fw-bold"><code>--subnet</code></td>
                                            <td>Manually defines the IP range (e.g., <code>192.168.1.0/24</code>).</td>
                                            <td>To avoid IP clashes with your office/home network.</td>
                                        </tr>
                                        <tr>
                                            <td className="text-light fw-bold"><code>--gateway</code></td>
                                            <td>Manually defines the "Switch" IP (the .1 address).</td>
                                            <td>When you have specific security hardware routing.</td>
                                        </tr>
                                        <tr>
                                            <td className="text-light fw-bold"><code>--internal</code></td>
                                            <td>Blocks all traffic to/from the outside internet.</td>
                                            <td>For super-secure databases that never need to update.</td>
                                        </tr>
                                        <tr>
                                            <td className="text-light fw-bold"><code>--attachable</code></td>
                                            <td>Allows standalone containers to join an Overlay network.</td>
                                            <td>Used primarily in Swarm to bridge old and new services.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 3. NETWORK ISOLATION (SECURITY) */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                3. Network Isolation (Security)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                One of the biggest reasons to use custom networks is **Isolation**. In a "Diamond Standard" architecture, the Public can talk to the Frontend, and the Frontend can talk to the Backend, but the **Public can NEVER talk to the Backend directly**.
                            </p>

                            <h6 className="fw-bold fs-6 text-danger mt-4">Laboratoy: Proving Isolation</h6>
                            <p className="small text-secondary">
                                Let's create two separate networks from scratch and try to break the wall.
                            </p>

                            <div className="row g-4 mt-1">
                                <div className="col-md-6">
                                    <pre className="doc-code-block x-small mb-0">
{`# 1. Create two separate islands
docker network create net-frontend
docker network create net-backend

# 2. Put a container on each
docker run -d --name web --network net-frontend nginx
docker run -d --name db --network net-backend redis`}</pre>
                                </div>
                                <div className="col-md-6">
                                    <pre className="doc-code-block x-small mb-0 border-danger text-danger bg-dark">
{`# 3. Try to reach the DB from the WEB
docker exec -it web ping db

Result: ping: bad address 'db'`}</pre>
                                </div>
                            </div>
                            <p className="mt-3 small text-secondary">
                                <strong>The Verdict:</strong> Even though both containers are running on the same physical computer, they are completely invisible to each other because they are on different virtual switches.
                            </p>
                        </div>
                    </div>

                    {/* 4. THE DYNAMIC BRIDGE (CONNECT/DISCONNECT) */}
                    <div className="doc-section-card shadow-lg border-info mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-bezier2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                4. The Dynamic Bridge (Connect/Disconnect)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                What if the <code>web</code> container *needs* to talk to the <code>db</code>? In standard networking, you'd have to rewire the physical hardware. In Docker, we use **Dynamic Attachment**.
                            </p>

                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
{`# Attach the 'web' container to the backend network too!
docker network connect net-backend web

# Now it can talk to BOTH worlds!
docker exec -it web ping db
Result: Success!`}
                            </pre>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-light h-100">
                                        <h6 className="fw-bold fs-6"><i className="bi bi-box-arrow-up-right me-2"></i>The Jump Box</h6>
                                        <p className="x-small text-secondary mb-0">
                                            A <strong>Jump Box</strong> is the only container with SSH or external access. You log into it, and from there, you "jump" into more secure internal networks to manage your databases. It's your secure front door.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-light h-100">
                                        <h6 className="fw-bold fs-6"><i className="bi bi-door-open-fill me-2"></i>The Gateway Container</h6>
                                        <p className="x-small text-secondary mb-0">
                                            A <strong>Gateway</strong> container (like an API or Node app) acts as a translator. It sits on <strong>two networks at once</strong>. It takes requests from the public frontend and "proxies" them to the hidden backend.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-warning mt-4 py-3">
                                <div>
                                    <strong className="d-block mb-1">DCA Rule:</strong>
                                    <p className="mb-0 x-small text-dark text-center fw-bold">
                                        "A container can be connected to up to 31 networks simultaneously."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
