import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Port Publishing - Docker Documentation",
    description: "Learn how Docker port publishing works, the security traps to avoid, and the exact commands explicitly tested on the DCA."
};

export default function PortPublishingPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Port Publishing & Mapping
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Bridging the gap between the host's physical network and your isolated containers.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE CONCEPT OF PUBLISHING */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-box-arrow-right"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. What is Port Publishing? (NAT/PAT)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                By default, the Docker daemon aggressively blocks access to ports inside containers. A container is born in total isolation. 
                                To make a web server inside a container reachable by the outside world, you must "publish" its port, which maps it to an IP address on your host machine.
                            </p>
                            
                            <div className="p-3 rounded mb-4" style={{ background: '#1c2128', borderLeft: '4px solid #0d6efd' }}>
                                <p className="mb-2"><strong>The Hotel Metaphor:</strong></p>
                                <p className="mb-0 x-small text-light">
                                    Think of your Host Machine as a giant hotel with a single public phone number (its IP address). Each Container is a private hotel room.
                                    Someone calling from outside cannot dial a room directly. Instead, they call the hotel's front desk on extension <strong>8080</strong>, and the receptionist (Docker NAT) instantly forwards that call to Room 21's internal phone on extension <strong>80</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE SYNTAX TABLE */}
                    <div className="doc-section-card shadow-lg border-secondary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                2. Command Syntax (-p)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Use the <code>--publish</code> or <code>-p</code> flag to make a port available outside the host. The syntax is always <strong><code>HOST_PORT : CONTAINER_PORT</code></strong>.
                            </p>
                            
                            <div className="doc-alert px-3 py-2 mt-3 mb-3 x-small" style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #6c757d' }}>
                                <div>
                                    <strong className="text-light d-block mb-2">Wait, what are TCP and UDP?</strong> 
                                    <p className="mb-2">They are simply the rules for how data moves across the internet.</p>
                                    <ul className="mb-0 list-unstyled ps-2 border-start border-secondary" style={{ marginLeft: '4px' }}>
                                        <li className="mb-2">
                                            <strong className="text-info">TCP (The Default):</strong> Like sending Certified Mail. If a packet of data is dropped, the system pauses and demands a resend to guarantee 100% perfect delivery. Essential for databases, downloading files, or loading websites.
                                        </li>
                                        <li>
                                            <strong className="text-warning">UDP (Speed over Perfection):</strong> Like throwing postcards out of a moving car. It blasts data as fast as possible and never checks if it arrived. If a packet gets lost, it just skips it. Perfect for live video or multiplayer games where you'd rather drop a single frame than lag the whole stream. <em>(Docker use-cases: Running a custom DNS server, a VPN like Wireguard, or hosting a multiplayer game server).</em>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="table-responsive mt-3">
                                <table className="table table-dark table-hover table-bordered border-secondary doc-code-table x-small">
                                    <thead>
                                        <tr className="table-active text-secondary">
                                            <th style={{ width: '30%' }}>Flag Value</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-light">
                                        <tr>
                                            <td><code>-p 8080:80</code></td>
                                            <td>Map port <code>8080</code> on the Docker host to TCP port <code>80</code> in the container.</td>
                                        </tr>
                                        <tr>
                                            <td><code>-p 192.168.1.100:8080:80</code></td>
                                            <td>Map port <code>8080</code> on a <strong>specific</strong> Host IP (192.168.1.100) to TCP port <code>80</code> in the container.</td>
                                        </tr>
                                        <tr>
                                            <td><code>-p 8080:80/udp</code></td>
                                            <td>Explicitly map the <strong>UDP</strong> protocol (instead of the default TCP).</td>
                                        </tr>
                                        <tr>
                                            <td><code>-p 8080:80/tcp -p 8080:80/udp</code></td>
                                            <td>You can chain multiple <code>-p</code> flags to expose both TCP and UDP simultaneously.</td>
                                        </tr>
                                        <tr>
                                            <td><code className="text-warning">-P</code> <em>(capital P)</em></td>
                                            <td>Publish <strong>all</strong> exposed ports to randomly assigned high-order ports on the host.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE 80 VS 8080 DEBATE */}
                    <div className="doc-alert doc-alert-info mt-4 p-3">
                        <i className="bi bi-question-circle-fill"></i>
                        <div>
                            <strong className="d-block mb-1">Why use 8080 on the host instead of 80?</strong>
                            <p className="mb-2 x-small text-secondary">
                                You might wonder why every tutorial uses <code>-p 8080:80</code> instead of just <code>-p 80:80</code>. There are two main reasons:
                            </p>
                            <ul className="x-small text-secondary mb-0">
                                <li className="mb-1"><strong>Privileged Ports:</strong> On Linux and macOS, ports below 1024 (like 80) are "privileged." You usually need <code>sudo</code> or root permissions to bind to them.</li>
                                <li><strong>Conflicts:</strong> Port 80 is the default for almost everything. If you have a local web server (Apache, Nginx) or even some development tools running, port 80 is likely already "taken."</li>
                            </ul>
                            <p className="mt-2 mb-0 x-small fw-bold">
                                Using 8080 (or any port &gt; 1024) is the "Safe Bet" for local development.
                            </p>
                        </div>
                    </div>

                    {/* 3. THE SECURITY TRAP (DCA ESSENTIAL) */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                3. DCA Exam Gotcha: The Security Trap
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="fw-bold">
                                Publishing container ports is insecure by default!
                            </p>
                            <p>
                                When you run a standard command like <code>docker run -p 8080:80 nginx</code>, Docker does NOT just expose it to your local computer. It implicitly binds to <code>0.0.0.0</code> (every network interface). This means <strong>any device on the outside internet</strong> can hit your container.
                            </p>
                            
                            <div className="doc-alert doc-alert-warning mt-4 py-3">
                                <div>
                                    <strong className="d-block mb-1">How to secure it: The Localhost Bind</strong>
                                    <p className="mb-2 mt-2 x-small text-dark">
                                        If you only want your own host machine to be able to talk to the container (e.g., a local development database), you MUST explicitly include the localhost loopback IP address (<code>127.0.0.1</code>) in the publish flag.
                                    </p>
                                    <pre className="doc-code-block x-small mb-0 border-dark text-dark" style={{ background: 'rgba(0,0,0,0.1)' }}>{`docker run -p 127.0.0.1:8080:80 nginx`}</pre>
                                </div>
                            </div>
                            
                            <div className="doc-alert doc-alert-info mt-3 py-2 x-small">
                                <div>
                                    <i className="bi bi-info-circle-fill me-2"></i>
                                    <strong>Exam Tip:</strong> If the exam asks how to prevent external network nodes from accessing a published port, the answer is to bind the host port specifically to <code>127.0.0.1</code>!
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
