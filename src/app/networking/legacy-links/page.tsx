import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Legacy Linking vs DNS - Docker Documentation",
    description: "Understand the deprecated --link flag, how it modified /etc/hosts, and why modern Docker relies on internal DNS instead for the DCA exam."
};

export default function LegacyLinksPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <div className="d-inline-block px-3 py-1 mb-3 rounded-pill bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 x-small fw-bold">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        DEPRECATED API: EXAM KNOWLEDGE ONLY
                    </div>
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Legacy Links vs. Modern DNS
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Why the <code>--link</code> flag died, and how modern Docker fixes the "Brittle IP" problem.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE DARK AGES */}
                    <div className="doc-section-card shadow-lg border-secondary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-clock-history"></i>
                            </div>
                            <h2 className="doc-card-heading text-secondary">
                                1. The Dark Ages: How <code>--link</code> Worked
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Long before Docker had an internal DNS "phonebook", the only way for Container A to talk to Container B was by using the <code>--link</code> flag.
                            </p>

                            <div className="doc-alert px-3 py-2 mt-3 mb-3 x-small text-secondary" style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #6c757d' }}>
                                <div>
                                    <strong className="text-light d-block mb-2">The Sticky Note Metaphor:</strong>
                                    <p className="mb-0">Imagine you need your coworker's phone number. Using <code>--link</code> was the equivalent of Docker walking up to your desk, writing the IP address in pen on a sticky note, and slapping it onto your monitor.</p>
                                </div>
                            </div>

                            <p className="mt-3">
                                Under the hood, when you ran <code>{`docker run --link database:db web-app`}</code>, Docker would physically mutate the filesystem of your <code>web-app</code> container:
                            </p>
                            <ul className="small text-light">
                                <li className="mb-2">It injected hardcoded IP address mappings directly into the container's <code>/etc/hosts</code> file.</li>
                                <li>It populated the container with environment variables (e.g., <code>DB_PORT_5432_TCP_ADDR=172.17.0.2</code>).</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. WHY IT BROKE */}
                    <div className="doc-section-card shadow-lg border-warning mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-heartbreak-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                2. Why it broke: The Brittle IP Problem
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Writing IPs in pen on a sticky note works... until the coworker changes their phone number.
                            </p>
                            <p>
                                Because Docker dynamically assigns IP addresses, if your database container crashed and restarted, it would likely get a <strong>brand new IP address</strong>. However, the <code>web-app</code> container was still holding the old sticky note! The <code>/etc/hosts</code> file didn't automatically update, causing devastating production outages.
                            </p>

                            <h5 className="fw-bold fs-6 mt-4 text-success"><i className="bi bi-tools me-2"></i>The Solution: Modern DNS</h5>
                            <p className="small text-secondary mb-0">
                                This is why User-Defined Networks (Custom Networks) were invented. Instead of editing files, Docker created an internal DNS server. Now, when a container restarts and gets a new IP, the DNS "phonebook" is instantly updated. The web app queries the DNS, gets the new IP, and everything keeps working seamlessly.
                            </p>
                        </div>
                    </div>

                    {/* 3. EXAM GOTCHAS */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper bg-opacity-10 border-bottom border-danger border-opacity-25">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-fill-exclamation"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                3. DCA Exam Gotchas!
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="fw-bold mb-3">
                                The DCA exam explicitly tests your architectural knowledge of this evolution. Memorize these specific technical differences:
                            </p>

                            <div className="row g-4 mt-1">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold text-secondary mb-3"><i className="bi bi-file-earmark-code me-2"></i>Legacy <code>--link</code></h5>
                                        <ul className="small text-light mb-0">
                                            <li className="mb-2">Modifies the <code>/etc/hosts</code> file.</li>
                                            <li className="mb-2">Creates static Environment Variables.</li>
                                            <li className="mb-2">Only works on the default bridge network.</li>
                                            <li className="text-danger fw-bold">Does NOT dynamically recover if the target container restarts.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h5 className="fw-bold text-success mb-3"><i className="bi bi-server me-2"></i>Modern Custom Networks</h5>
                                        <ul className="small text-light mb-0">
                                            <li className="mb-2">Does <strong>NOT</strong> touch <code>/etc/hosts</code>.</li>
                                            <li className="mb-2">Does <strong>NOT</strong> create environment variables.</li>
                                            <li className="mb-2">Uses Docker's embedded DNS server (127.0.0.11).</li>
                                            <li className="text-success fw-bold">Automatically handles IPs changing on the fly.</li>
                                        </ul>
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
