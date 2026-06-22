import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lab: Rolling Updates & Rollback - Docker Documentation",
    description: "Master zero-downtime deployments and instant rollbacks with Docker Swarm services.",
};

export default function SwarmUpdatesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab 3: Rolling Updates &amp; Rollback
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Deploy new versions with zero downtime. Undo mistakes in seconds.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. WHY ROLLING UPDATES */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary"><i className="bi bi-arrow-repeat"></i></div>
                            <h2 className="doc-card-heading text-primary">1. Why Rolling Updates?</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Without rolling updates, you have to stop the old version and start the new one — causing <strong>downtime</strong>. With a rolling update, Swarm replaces containers <strong>one batch at a time</strong>, so the service stays available throughout.
                            </p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-danger"><i className="bi bi-x-circle-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Stop-the-World Update</h5>
                                        </div>
                                        <p className="small text-danger fw-bold mb-1">Service is OFFLINE during the update.</p>
                                        <p className="small text-secondary mb-0">All containers stopped → new ones started → users get errors in between.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-success"><i className="bi bi-check-circle-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Rolling Update (Swarm)</h5>
                                        </div>
                                        <p className="small text-success fw-bold mb-1">Service stays ONLINE throughout.</p>
                                        <p className="small text-secondary mb-0">Containers replaced in small batches. Old version serves traffic while new version is being prepared.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. PERFORMING AN UPDATE */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success"><i className="bi bi-terminal-fill"></i></div>
                            <h2 className="doc-card-heading text-success">2. Performing a Rolling Update</h2>
                        </div>
                        <div className="doc-card-body">
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker service update \\
  --image nginx:1.25 \\
  --update-parallelism 2 \\
  --update-delay 10s \\
  --update-failure-action rollback \\
  web`}
                            </pre>
                            <div className="p-3 rounded border border-secondary" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <ul className="small text-secondary mb-0">
                                    <li className="mb-2"><strong className="text-success">--image nginx:1.25</strong>: The new image to deploy.</li>
                                    <li className="mb-2"><strong className="text-primary">--update-parallelism 2</strong>: Replace <strong>2 containers at a time</strong>. (Default: 1)</li>
                                    <li className="mb-2"><strong className="text-warning">--update-delay 10s</strong>: Wait 10 seconds between each batch before updating the next.</li>
                                    <li><strong className="text-danger">--update-failure-action rollback</strong>: If any update fails, <strong>automatically roll back</strong> to the previous version.</li>
                                </ul>
                            </div>
                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Set defaults at creation time</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        You can bake these flags into <code>docker service create</code> so every future update uses them automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. MONITORING AN UPDATE */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-activity"></i></div>
                            <h2 className="doc-card-heading text-info">3. Monitoring an Update in Progress</h2>
                        </div>
                        <div className="doc-card-body">
                            <pre className="doc-code-block mb-3 border-info text-info bg-dark x-small">
{`$ docker service ps web

NAME      IMAGE         CURRENT STATE
web.1     nginx:1.25    Running 30s ago     <- Updated!
web.2     nginx:1.25    Running 20s ago     <- Updated!
web.3     nginx:latest  Running 5 mins ago  <- Not yet

# Check the UpdateStatus:
$ docker service inspect web --format '{{ .UpdateStatus.State }}'
updating`}
                            </pre>
                            <h5 className="fw-bold text-light mt-4 mb-3">Update States</h5>
                            <table className="table table-dark table-bordered small">
                                <thead><tr><th>State</th><th>Meaning</th></tr></thead>
                                <tbody>
                                    <tr><td className="text-info"><code>updating</code></td><td>Update is in progress.</td></tr>
                                    <tr><td className="text-success"><code>completed</code></td><td>All tasks updated successfully.</td></tr>
                                    <tr><td className="text-warning"><code>paused</code></td><td>A failure occurred and <code>--update-failure-action pause</code> was set.</td></tr>
                                    <tr><td className="text-danger"><code>rollback_completed</code></td><td>A failure triggered an automatic rollback.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 4. ROLLBACK */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-arrow-counterclockwise"></i></div>
                            <h2 className="doc-card-heading text-danger">4. Instant Rollback</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Something went wrong? Swarm remembers the <strong>previous configuration</strong> and can revert instantly.</p>
                            <pre className="doc-code-block mb-4 border-danger text-danger bg-dark x-small">
{`# Roll back to the previous version immediately:
$ docker service rollback web`}
                            </pre>
                            <div className="doc-alert doc-alert-warning">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Gotcha: <code>rollback</code> vs <code>update --rollback</code></h6>
                                    <p className="mb-0 x-small text-secondary">
                                        <code>docker service rollback web</code> → instantly reverts to the <strong>previous configuration</strong>.<br/>
                                        <code>docker service update --rollback web</code> → same thing, older syntax.<br/>
                                        <strong>Both do the same thing.</strong> The exam may test whether you know both forms.
                                    </p>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Rollback only goes ONE step back</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Swarm only keeps the <strong>immediately previous</strong> configuration. If you roll back and then roll back again, you end up on the new (bad) version. There is no multi-level history.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. UPDATE FAILURE ACTIONS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning"><i className="bi bi-shield-exclamation"></i></div>
                            <h2 className="doc-card-heading text-warning">5. DCA Boss Level: Failure Actions</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>The <code>--update-failure-action</code> flag controls what happens when a task fails to start during an update:</p>
                            <table className="table table-dark table-bordered small mt-3">
                                <thead><tr><th>Action</th><th>What Happens</th><th>When to Use</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td><code className="text-warning">pause</code></td>
                                        <td>Update stops. You must investigate and manually resume or rollback.</td>
                                        <td>Production — gives you time to diagnose.</td>
                                    </tr>
                                    <tr>
                                        <td><code className="text-danger">rollback</code></td>
                                        <td>Swarm automatically rolls back to the previous image.</td>
                                        <td>CI/CD pipelines where you want instant self-healing.</td>
                                    </tr>
                                    <tr>
                                        <td><code className="text-secondary">continue</code></td>
                                        <td>Ignore the failure and keep updating.</td>
                                        <td>Almost never — dangerous, leaves some tasks broken.</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Resume a paused update</h6>
                                    <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">{`$ docker service update --force web`}</pre>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
