import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Other Container Concepts: The Senior Toolkit - Docker Documentation",
    description: "Master ENTRYPOINT vs CMD, Networking modes, Healthchecks, and Container Security with simple analogies."
};

export default function OtherConceptsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-4 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Other Container Concepts
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Bridging the gap between a Junior and a Senior Docker expert.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* SECTION 1: ENTRYPOINT VS CMD */}
                    <div className="doc-section-card shadow-lg mb-4 border-primary border-opacity-25">
                        <div className="doc-card-header-wrapper text-primary">
                            <div className="heading-icon">
                                <i className="bi bi-play-slice"></i>
                            </div>
                            <h2 className="doc-card-heading" id="entrypoint-cmd">
                                The "Smart Oven" Analogy: ENTRYPOINT vs CMD
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-3">
                                Beginners often get these mixed up, but think of it like building a **Smart Oven** appliance:
                            </p>

                            <div className="doc-grid-2 g-4 mb-4">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase text-primary">ENTRYPOINT: The Hardware</h5>
                                    <p className="text-secondary small mb-0">This is the **Machine** itself. No matter what, it's an Oven. It’s sole purpose is to "Bake." You can't suddenly tell it to be a Fridge! <br/> <code>ENTRYPOINT ["bake"]</code></p>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase text-info">CMD: The Default Setting</h5>
                                    <p className="text-secondary small mb-0">This is the **Default Temperature**. It's set to <code>350F</code>, but at the last second, you can say: *"Actually, bake at 450F today!"* <br/> <code>CMD ["350F"]</code></p>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mb-0">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong>The "Aha!" Moment:</strong><br/>
                                    If you run <code>docker run my-oven 450F</code>, the <code>450F</code> <strong>overwrites</strong> the CMD entirely, but the container still uses the <strong>ENTRYPOINT</strong> (the oven) to do the work.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: NETWORKING MODES */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-success">
                            <div className="heading-icon">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="networking">
                                Networking: How Containers Talk
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-4">
                                Think of your server like a giant apartment building. You choose how your container "lives" inside it:
                            </p>

                            <div className="table-responsive">
                                <table className="doc-table">
                                    <thead>
                                        <tr>
                                            <th>Mode</th>
                                            <th>The Analogy</th>
                                            <th>Best Use Case</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold text-primary">Bridge (Default)</td>
                                            <td><strong>The Private Apartment.</strong> Your container gets its own private space and its own "doorbell" (an IP address).</td>
                                            <td>95% of all apps. Best for security.</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-warning">Host</td>
                                            <td><strong>The Main Lobby.</strong> Your container just lives in the main lobby. It uses the building's front door directly.</td>
                                            <td>High-speed apps where every split-second counts.</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-danger">None</td>
                                            <td><strong>The Panic Room.</strong> No doors, no windows, completely cut off from the building and the street.</td>
                                            <td>Super-secret data processing that must <em>never</em> touch the web.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: ENVIRONMENT VARIABLES */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-warning">
                            <div className="heading-icon">
                                <i className="bi bi-gear-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="env-vars">
                                Env Variables: The "Settings" Page
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-3">
                                Senior developers **never** hardcode passwords into their code. Instead, they use a "Settings Page" (Environment Variables) to change how the app works without changing the code.
                            </p>

                            <div className="doc-code-block mb-3">
                                <div className="doc-code-header">
                                    <span className="small text-secondary fw-bold"> terminal</span>
                                </div>
                                <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0 overflow-auto">
                                    <code className="text-info">
{`# Passing settings at runtime
docker run -e THEME=dark -e DB_URL=prod.db.com my-app`}
                                    </code>
                                </pre>
                            </div>
                            
                            <p className="text-secondary small mb-0">
                                This lets you use the **exact same container** for testing and production. You just click different "Settings" when you turn it on!
                            </p>
                        </div>
                    </div>

                    {/* SECTION 4: HEALTHCHECKS */}
                    <div className="doc-section-card shadow-lg mb-4 border-danger border-opacity-25">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-heart-pulse-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="healthchecks">
                                Healthchecks: The "Doctor's Note"
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-3">
                                Sometimes an app "looks" fine but is actually broken inside (like if its database crashed). Docker's **Healthcheck** is like a doctor's checkup every 30 seconds.
                            </p>

                            <ul className="text-secondary small mb-0">
                                <li className="mb-2"><strong>Running:</strong> The machine is turned on. (But it might be smoking!)</li>
                                <li><strong className="text-success">Healthy:</strong> Docker actually "pinged" the machine, and it answered back: *"I'm okay!"*</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
