import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Networking Overview - Docker Documentation",
    description: "An essential overview of Docker networking, why it is needed, and the problems it solves for the DCA exam."
};

export default function NetworkingOverviewPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker Networking: The Overview
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Understanding how containers communicate with each other, the host, and the outside world.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHY DO WE NEED NETWORKING? */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-question-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Why Do We Need Docker Networking?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="p-3 mb-4 rounded" style={{ background: '#1c2128', borderLeft: '4px solid #0d6efd' }}>
                                <p className="mb-0">
                                    <strong>The Noob Reality:</strong> Imagine every new Docker container is born on its own deserted island. It has everything it needs to survive (its own files, its own process), but <strong>it has absolutely no way to talk to anyone else</strong>.
                                </p>
                            </div>

                            <p>
                                While total isolation is great for security (no one can sneak onto the island), real apps require teamwork. Docker Networking provides tools to build "bridges" and "ferries" to connect these islands.
                            </p>
                            <p className="mb-4 text-secondary">
                                There are three different types of communication paths we need to establish:
                            </p>

                            <div className="doc-sub-cards-grid">
                                <div className="doc-sub-card border-info">
                                    <h3 className="doc-sub-card-title text-info fs-6 fw-bold"><i className="bi bi-people-fill me-2"></i>1. Island to Island</h3>
                                    <p className="doc-sub-card-text small mt-2">
                                        <strong>(Container-to-Container)</strong><br />
                                        Your backend needs to ask your database for user info. They need a private, secure bridge connecting their islands so they can chat without the public internet seeing anything.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-primary">
                                    <h3 className="doc-sub-card-title text-primary fs-6 fw-bold"><i className="bi bi-cloud-arrow-down-fill me-2"></i>2. Island to Mainland</h3>
                                    <p className="doc-sub-card-text small mt-2">
                                        <strong>(Container-to-Internet)</strong><br />
                                        Sometimes your container needs to download a software update or fetch data from a public API. It needs an outgoing ferry to reach the real world.
                                    </p>
                                </div>
                                <div className="doc-sub-card border-success">
                                    <h3 className="doc-sub-card-title text-success fs-6 fw-bold"><i className="bi bi-person-walking me-2"></i>3. Mainland to Island</h3>
                                    <p className="doc-sub-card-text small mt-2">
                                        <strong>(Internet-to-Container)</strong><br />
                                        If you're hosting a website, you have to allow tourists (real users on the internet) to visit the web server on your island. This is done via <strong>Port Publishing</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* THE PROBLEMS IT SOLVES (DCA FOCUS) */}
                    <div className="doc-section-card shadow-lg border-warning mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-tools"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What Problems Does it Solve? (DCA Focus)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                For the Docker Certified Associate (DCA) exam, you must understand conceptually how Docker solves traditional infrastructure problems:
                            </p>

                            <ul className="list-unstyled mb-0 mt-3" style={{ lineHeight: '2' }}>
                                <li className="mb-3">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <strong>Service Discovery (DNS):</strong>
                                    <div className="ms-4 text-secondary small">
                                        <p className="mb-2">
                                            In the old days, apps connected via hardcoded IP addresses. If a server restarted and the IP changed, the app broke. Docker's built-in DNS allows containers to find each other using their <strong>container names</strong> (e.g., resolving <code>http://db-postgres:5432</code>) instead of brittle IP addresses.
                                        </p>
                                        <div className="doc-alert px-3 py-2 mt-2 mb-0" style={{ background: 'rgba(13, 110, 253, 0.1)', borderLeft: '4px solid #0d6efd' }}>
                                            <div>
                                                <strong className="text-info d-block mb-1">Is there a global conflict?</strong>
                                                No! Docker's DNS acts as a private phonebook for that specific custom network. When your app searches for <code>http://db-postgres</code>, it only looks for a container on your local machine attached to that exact same network. It NEVER broadcasts to the public internet.
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <strong>Port Conflicts:</strong>
                                    <div className="ms-4 text-secondary small">
                                        <p className="mb-2">
                                            Traditionally, you couldn't run two web servers on port 80 on the same machine. Docker isolates network interfaces so they don't fight over the host's ports.
                                        </p>
                                        <div className="doc-alert px-3 py-2 mt-2 mb-0" style={{ background: 'rgba(25, 135, 84, 0.1)', borderLeft: '4px solid #198754' }}>
                                            <div>
                                                <strong className="text-success d-block mb-1">Do internal ports clash?</strong>
                                                Absolutely not! You can have 100 containers all running on internal port 80 inside the exact same custom network. Because every container gets its own unique IP and name, <code>app-1:80</code> never conflicts with <code>app-2:80</code>. A port conflict <strong>ONLY</strong> happens if you try to publish two containers to the exact same Physical Host Port (like trying to map both to the host's `-p 8080:80`).
                                                <hr className="my-2 border-success opacity-25" />
                                                <div className="x-small">
                                                    <p className="mb-2"><strong>The "Two Johns" Context:</strong> From a pure networking perspective, two isolated networks (islands) could easily both have a server known as <code>john:80</code> without noticing each other. </p>
                                                    <p className="mb-0">However, the <strong>Docker Engine</strong> manages everything from above. It enforces that actual <em>Container Names</em> are 100% unique across the entire host so that management commands like <code>docker stop john</code> are never ambiguous. <br /><em>(Pro-Tip: You CAN give containers duplicate DNS names on different networks using the <code>--network-alias</code> flag, but their core Container Name must remain unique!)</em></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <strong>Secure Multi-Tenant Isolation:</strong>
                                    <div className="ms-4 text-secondary small">
                                        You can have multiple "networks" on the same Docker host. App A's web server and database can sit on `network-a`, while App B's sit on `network-b`. Even if App A is compromised, it cannot send packets to App B.
                                    </div>
                                </li>
                            </ul>

                            <div className="doc-alert doc-alert-warning mt-4 border-warning">
                                <h5 className="mb-3 fw-bold"><i className="bi bi-exclamation-triangle-fill me-2"></i>DCA Exam Gotcha: The Default Bridge Trap</h5>
                                <div className="ms-2 text-dark">
                                    <p className="mb-3">
                                        <strong>1. The Default <code>bridge</code> Network (No Names Allowed):</strong><br />
                                        When you run a container without specifying a network, it lands on the default bridge. For historical reasons, Docker <strong>DID NOT</strong> enable the internal DNS server here. Containers on this network can <strong>only communicate via IP address</strong>.
                                    </p>
                                    <p className="mb-0">
                                        <strong>2. User-Defined Networks (Names Allowed!):</strong><br />
                                        If you create a custom network (<code>docker network create my-net</code>), Docker <strong>enables the internal DNS server</strong>. Containers here can finally ping each other using just their container names (e.g., <code>ping database</code>). Always use custom networks!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NOOB FRIENDLY METAPHORS */}
                    <div className="doc-section-card shadow-lg border-info mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-lightbulb-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Real-World Metaphors (Noob Guide)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4 mt-2">
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-info h-100">
                                        <h4 className="fw-bold text-info"><i className="bi bi-building me-2"></i>The IP Address</h4>
                                        <p className="small text-secondary mt-2">
                                            Think of a Docker Network as an apartment building, and the container's IP address as the apartment number (`Apt 4B`). Every time a container dies and is recreated, it might get a new apartment number. This is why connecting apps via IP is risky!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-success h-100">
                                        <h4 className="fw-bold text-success"><i className="bi bi-person-badge me-2"></i>Container DNS</h4>
                                        <p className="small text-secondary mt-2">
                                            Instead of memorizing `Apt 4B`, you just ask the building's receptionist (Docker DNS): "Hey, where does <code>database</code> live?" The receptionist always routes you to the correct apartment, even if the database container was just recreated!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-primary h-100">
                                        <h4 className="fw-bold text-primary"><i className="bi bi-door-open me-2"></i>Port Publishing</h4>
                                        <p className="small text-secondary mt-2">
                                            Your container runs a cafe deep inside the building on port 80. To let people from the street (the Internet) buy coffee, the host building opens its Main Front Door on port 8080 and creates a direct hallway to the cafe. This is <code>-p 8080:80</code>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RECOMMENDED VIDEOS */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-youtube"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Crystal Clear Video Tutorials
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Reading documentation is great, but sometimes you just need to see someone draw it out on a whiteboard. This video by <strong>NetworkChuck</strong> is widely considered the "Gold Standard" for making Docker networking click:</p>

                            <div className="mt-4 shadow-lg rounded overflow-hidden border border-secondary" style={{ background: '#000' }}>
                                <div className="ratio ratio-16x9">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/bKFMS5C4CG0?si=Y15ezm9O-GuQx9a1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className="mt-3 text-center">
                                <a href="https://youtu.be/bKFMS5C4CG0?si=BllEcKXJ_ehVPP1U" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-sm rounded-pill px-4">
                                    <i className="bi bi-youtube me-2"></i>Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
