import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Networking Debugging - Docker Documentation",
    description: "Learn the essential commands to troubleshoot Docker networking, inspect networks, and the DCA 'Blind Box' trap."
};

export default function NetworkingDebuggingPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Debugging & Troubleshooting
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        How to prove your containers are actually talking to each other.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE GOD'S EYE VIEW */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-eye-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. The God's Eye View (Inspect)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Before you try to ping anything, you need to verify that your containers are actually attached to the same network. To get a top-down view of everything happening on a specific network, use the <code>inspect</code> command.
                            </p>
                            
                            <pre className="doc-code-block mb-3 border-primary text-light">
                                <code className="language-bash">{`docker network inspect my-custom-net`}</code>
                            </pre>
                            
                            <p>
                                This command dumps a large JSON object. For debugging, the only part you care about is the <strong>"Containers"</strong> object at the bottom.
                            </p>
                            
                            <div className="doc-alert px-3 py-2 mt-3 mb-3 x-small" style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #0d6efd' }}>
                                <div>
                                    <strong className="text-light d-block mb-1">What to look for:</strong> 
                                    Does the container you are trying to reach appear in this list? If it does, note its exact <code>IPv4Address</code>. If it does not appear in this list, your containers cannot communicate.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. ENTERING THE MATRIX */}
                    <div className="doc-section-card shadow-lg border-secondary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                2. Entering the Matrix (Exec)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The most reliable way to test if Container A can reach Container B is to jump <em>inside</em> Container A and try to ping it.
                            </p>
                            
                            <p>You do this using the <code>docker exec</code> command, which runs a command inside a live, running container.</p>

                            <pre className="doc-code-block mb-2 border-secondary text-light">
                                <code className="language-bash">{`# Execute an interactive ping command inside web-app
docker exec -it web-app ping database`}</code>
                            </pre>

                            <div className="doc-alert px-3 py-2 mt-2 mb-3 x-small" style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #6c757d' }}>
                                <div>
                                    <strong className="text-light d-block mb-1">Wait, what does <code>-it</code> mean?</strong> 
                                    <ul className="mb-0 ps-3">
                                        <li><strong><code>-i</code> (Interactive):</strong> Keeps the STDIN stream open so your keyboard is connected to the container.</li>
                                        <li><strong><code>-t</code> (TTY):</strong> Creates a fake terminal to display the output nicely (with colors/formatting).</li>
                                    </ul>
                                    <p className="mt-2 mb-0 text-secondary"><em>Combined, they let you interact with the running command and use <code>CTRL+C</code> to gracefully stop the ping!</em></p>
                                </div>
                            </div>
                            
                            <ul className="small text-light mt-3 mb-4">
                                <li className="mb-2">If ping returns rapidly with byte data and times, the network is perfect!</li>
                                <li className="mb-2">If you get <code>ping: bad address</code>, Docker DNS failed to resolve the name. They might be on different custom networks.</li>
                                <li className="mb-2">If the command hangs doing nothing, a firewall or security group is likely blocking traffic.</li>
                            </ul>

                            <div className="doc-section-card shadow-sm border-info bg-dark bg-opacity-25 p-3 rounded">
                                <h5 className="text-info mb-2 fs-6 fw-bold"><i className="bi bi-question-circle-fill me-2"></i>Why didn't we specify the port?</h5>
                                <p className="mb-2 x-small text-light">Because <code>ping</code> uses the <strong>ICMP</strong> protocol, which has absolutely no concept of ports! Ping only asks: <em>"Is the server physically turned on and reachable?"</em></p>
                                <p className="mb-0 x-small text-light">If you need to test if a specific port (like TCP 5432) is actively listening inside that reachable server, you have to use a tool that speaks TCP/UDP, like <code>curl database:5432</code> or <code>nc -vz database 5432</code> (Netcat).</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE BLIND BOX TRAP */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper bg-danger bg-opacity-10 border-bottom border-danger border-opacity-25">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-exclamation-octagon-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                3. DCA Exam Gotcha: The Blind Box
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                This is one of the most common pitfalls for beginners and a highly tested scenario on the DCA!
                            </p>
                            <p>
                                You deploy two containers (e.g., using the <code>alpine</code> or <code>nginx</code> image). You run <code>docker exec -it web-app ping database</code>.
                            </p>
                            
                            <pre className="doc-code-block mb-3 border-danger text-danger bg-dark">
                                <code>{`bash: ping: command not found`}</code>
                            </pre>
                            
                            <p className="fw-bold mb-3">
                                Did the network fail? No! The image failed.
                            </p>
                            
                            <div className="doc-section-card shadow-sm border-warning bg-dark bg-opacity-25 p-3 rounded mt-3">
                                <h5 className="text-warning fw-bold fs-6 mb-2"><i className="bi bi-exclamation-triangle-fill me-2"></i>The Alpine/Nginx Reality</h5>
                                <p className="mb-2 x-small text-light">
                                    Modern Docker images are stripped to the absolute bare minimum to save space and reduce security vulnerabilities. The official Nginx image literally does not have the <code>ping</code>, <code>curl</code>, or <code>ip</code> commands installed!
                                </p>
                                <strong className="text-warning d-block mt-3 mb-2 x-small">How to fix it:</strong>
                                <ul className="mb-0 text-light x-small">
                                    <li className="mb-1">You must first execute into the container as root and use a package manager: <code>apt-get update && apt-get install iputils-ping</code></li>
                                    <li><strong>Or better yet:</strong> Use a dedicated debugging container built for this exact purpose (like the popular <code>nicolaka/netshoot</code> image) and attach it to your custom network.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
