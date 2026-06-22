import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Starting Automatically - Docker Containers",
    description: "Learn how to use Docker restart policies to ensure your Python applications (FastAPI/Django) stay running after crashes or reboots."
};

export default function StartingAutomaticallyPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Starting Automatically
                    </h1>

                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Ensuring your containers survive crashes, reboots, and accidents.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* NOOB CORNER: TERMINAL TALK */}
                    <div className="doc-section-card shadow-lg border-info border-opacity-25">
                        <div className="doc-card-header-wrapper text-info">
                            <div className="heading-icon">
                                <i className="bi bi-info-square-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="noob-corner">
                                Noob Corner: Terminal Talk
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="mb-4">
                                <h5 className="fs-6 fw-bold">1. What is a "Daemon"?</h5>
                                <p className="small text-secondary">
                                    Think of the <strong>Docker Daemon</strong> as the "Backend Engine" of Docker. 
                                    It's a background process that stays running on your computer even if you close the terminal. 
                                    It's the "boss" that manages your containers.
                                </p>
                            </div>
                            <div>
                                <h5 className="fs-6 fw-bold">2. Exit Codes: Zero vs. Non-Zero</h5>
                                <p className="small text-secondary mb-2">
                                    In the terminal world, every program sends a signal when it finishes:
                                </p>
                                <ul className="small text-secondary">
                                    <li><strong>Code 0:</strong> "Success! I finished my job perfectly." (e.g., your script finished its loop).</li>
                                    <li><strong>Anything else (1, 2, 137, etc.):</strong> "Help! I crashed or was killed." (e.g., Python threw an <code>IndexError</code>).</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RESTART POLICIES TABLE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-list-task"></i>
                            </div>
                            <h2 className="doc-card-heading" id="policies-overview">
                                The Four Restart Policies
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <div className="table-responsive">
                                <table className="table table-dark table-hover align-middle">
                                    <thead className="text-primary opacity-75 small text-uppercase">
                                        <tr>
                                            <th style={{ width: '25%' }}>Flag</th>
                                            <th>Behavior</th>
                                        </tr>
                                    </thead>
                                    <tbody className="small">
                                        <tr>
                                            <td><code>no</code></td>
                                            <td><strong>Default.</strong> Does not restart the container under any circumstance.</td>
                                        </tr>
                                        <tr>
                                            <td><code>on-failure[:max]</code></td>
                                            <td>
                                                Restarts <strong>only</strong> if the container exits with an error (non-zero code). 
                                                <br/>
                                                <span className="text-warning small italic">Note: If it finishes successfully (Code 0), it stays stopped.</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><code>always</code></td>
                                            <td>
                                                Restarts if the container stops. If manually stopped, it restarts 
                                                <strong>only</strong> when the Docker daemon restarts or you manually restart it.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><code>unless-stopped</code></td>
                                            <td>
                                                Similar to <code>always</code>, but Docker <strong>won't</strong> restart it if it was 
                                                manually stopped (even after a daemon reboot). 
                                                <br/><span className="text-success fw-bold">RECOMMENDED for web servers!</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* PRACTICAL EXAMPLES */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper text-success">
                            <div className="heading-icon">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="practical-examples">
                                Command Breakdown (FastAPI)
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="small text-secondary mb-3 text-center">
                                Here is how you apply each of the 4 policies to a FastAPI container:
                            </p>

                            <p className="mb-1 small text-secondary fw-bold">1. Default (no):</p>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code>docker run -d --name recipe-api --restart no fastapi-app</code>
                            </pre>

                            <p className="mb-1 small text-secondary fw-bold">2. On-Failure (retries up to 3 times):</p>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code>docker run -d --name recipe-api --restart on-failure:3 fastapi-app</code>
                            </pre>

                            <p className="mb-1 small text-secondary fw-bold">3. Always (always restarts):</p>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-4">
                                <code>docker run -d --name recipe-api --restart always fastapi-app</code>
                            </pre>

                            <p className="mb-1 small text-secondary fw-bold text-success">4. Unless-Stopped (Standard Production Setup):</p>
                            <pre className="bg-dark p-3 rounded border border-success border-opacity-50 mb-4">
                                <code>docker run -d --name recipe-api --restart unless-stopped fastapi-app</code>
                            </pre>

                            <h5 className="fs-6 fw-bold mt-5 mb-3 border-bottom border-secondary border-opacity-25 pb-2">Command Parameters</h5>

                            <div className="row g-3 small">
                                <div className="col-md-6">
                                    <div className="p-2 border border-secondary border-opacity-10 rounded">
                                        <code className="text-info">docker run</code>: Create and start a container.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="p-2 border border-secondary border-opacity-10 rounded">
                                        <code className="text-info">-d</code>: "Detached" - run in background (don't lock terminal).
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-2 border border-secondary border-opacity-10 rounded">
                                        <code className="text-info">--name</code>: Give it a human-friendly name.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-2 border border-secondary border-opacity-10 rounded">
                                        <code className="text-info">--restart</code>: Set the automatic start policy.
                                    </div>
                                </div>
                                <div className="col-md-12 text-center mt-3">
                                    <div className="p-2 border border-info border-opacity-25 rounded bg-info bg-opacity-10 display-inline-block px-4">
                                        <code className="text-info text-white">fastapi-app</code>: The name of the Docker Image you want to run.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPERT Q&A */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-lightning-charge-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="expert-qa">
                                Expert Q&A: The Nuances
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <div className="doc-alert doc-alert-warning mb-4">
                                <h5 className="fs-6 fw-bold"><i className="bi bi-hourglass-split me-2"></i>The 10-Second Rule</h5>
                                <p className="mb-0 small">
                                    A restart policy only kicks in after the container has been up for at least <strong>10 seconds</strong>. 
                                    This prevents a "Restart Loop" where a crashing container eats up all your CPU cycles.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5 className="fs-6 fw-bold">Q: What are "Host-Level Managers" (systemd)?</h5>
                                <p className="small text-secondary">
                                    On a Linux server, <strong>systemd</strong> is the tool that starts your computer and manages services 
                                    (like your database or web server) directly on the OS. 
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PROCESS MANAGERS */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="process-managers">
                                Using Process Managers
                            </h2>
                        </div>

                        <div className="doc-card-body">

                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <strong>Noob Definition: What is a Process Manager?</strong><br/>
                                    Think of a Process Manager as a "Babysitter" for your programs. 
                                    <ul className="mt-2 mb-0 small">
                                        <li><strong>Where does it live?</strong> It runs directly on your server's Operating System. In fact, managers like <code>systemd</code> are usually the <em>very first</em> program that boots up. When a server crashes and reboots, the OS starts <code>systemd</code>, and <code>systemd</code> reads a checklist to start all your other apps.</li>
                                        <li className="mt-1"><strong>How does it know an app crashed?</strong> It constantly watches the Process IDs (PIDs) in the operating system's memory. If your app's PID suddenly disappears without a clean exit, the manager immediately fires up a new one.</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <h5 className="fs-5 fw-bold mb-3">1. Host-Level Process Managers (The Outside Watcher)</h5>
                            <p className="text-secondary small mb-2">
                                In this setup, the manager (like <code>systemd</code>) lives on the actual physical server or VM (the <strong>Host OS</strong>). 
                            </p>
                            <p className="text-secondary small">
                                To <code>systemd</code>, your <em>entire</em> Docker container is just one giant process. If your Python code inside fails, the whole container crashes. <code>systemd</code> notices the container died, and runs <code>docker start</code> to fire the whole container back up again.
                            </p>

                            <div className="doc-alert doc-alert-danger mb-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <strong>Warning: Dual Managers Conflict</strong><br/>
                                    Don't combine Docker's built-in restart policies with host-level managers. They will fight over the container state and cause <strong>"flapping"</strong> (constant start/stop). Pick one or the other!
                                </div>
                            </div>

                            <h5 className="fs-5 fw-bold mb-3 border-top border-secondary border-opacity-25 pt-4">2. Process Managers INSIDE Containers (The Inside Watcher)</h5>
                            <p className="text-secondary small mb-2">
                                You <em>can</em> install a manager (like <code>supervisor</code>) directly into your container's isolated OS. In this scenario, the manager runs <em>inside</em> the container and starts your Python script.
                            </p>
                            <p className="text-secondary small">
                                If the script crashes, the manager restarts it <strong>without</strong> restarting the container.
                            </p>
                            
                            <div className="doc-alert doc-alert-warning mb-0">
                                <i className="bi bi-cone-striped"></i>
                                <div>
                                    <strong>Docker's Warning: Loss of Visibility</strong><br/>
                                    <strong>Docker hates this approach!</strong> The "Docker Way" is: <em>One Container = One Process</em>. If you put a manager inside a container, Docker loses visibility. Docker will think the container is perfectly healthy (because <code>supervisor</code> is still running), even if your Python script is trapped in an infinite crash-loop inside. Therefore, Docker <strong>does not recommend</strong> this approach.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* PRO TIP CORNER */}
                    <div className="doc-section-card shadow-lg bg-primary bg-opacity-10 border-primary border-opacity-25">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-stars"></i>
                            </div>
                            <h2 className="doc-card-heading" id="pro-tip">
                                Senior Architect's Pro Tip
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="small">
                                While <code>--restart always</code> is tempting, for production Python apps, 
                                <code>--restart unless-stopped</code> is almost always better. 
                            </p>
                            <p className="small mb-0">
                                <strong>Why?</strong> Because it allows you to debug. If you need to keep a container 
                                <strong>offline</strong> for a migration or a manual fix, <code>unless-stopped</code> won't 
                                try to bring it back to life behind your back until the host machine itself reboots.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
