import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lab: Swarm Init & Nodes - Docker Documentation",
    description: "Learn how to initialize a Docker Swarm, join nodes, and manage the cluster topology.",
};

export default function SwarmInitNodesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab 1: Init &amp; Nodes
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Turn a single machine into a cluster. Learn the lifecycle of every node.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. WHAT IS DOCKER SWARM MODE */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-tornado"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                1. What is Swarm Mode?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker Swarm Mode is Docker's <strong>built-in orchestrator</strong>. It turns a group of individual Docker hosts into a single, unified <strong>cluster</strong> that you manage as one system.
                            </p>
                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-lightbulb-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">The Key Insight</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Swarm mode is just a <strong>"mode"</strong> you switch ON inside the Docker Engine. The same Docker you use every day — it gets a superpower when you run <code>docker swarm init</code>.
                                    </p>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-primary"><i className="bi bi-cpu-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Manager Node</h5>
                                        </div>
                                        <p className="small text-secondary mb-0">The <strong>brain</strong> of the cluster. It maintains the desired state, schedules tasks, and issues commands to workers. Runs the <strong>Raft consensus</strong> algorithm.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon"><i className="bi bi-gear-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Worker Node</h5>
                                        </div>
                                        <p className="small text-secondary mb-0">The <strong>muscle</strong>. It receives task assignments from the manager and runs the containers. It does not participate in Raft decisions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-warning mt-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Exam Tip</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        By default, a Manager is also a Worker — it runs containers too. You can change this with <code>docker node update --availability drain [manager-node]</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. INITIALIZE THE SWARM */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success"><i className="bi bi-terminal-fill"></i></div>
                            <h2 className="doc-card-heading text-success">2. Initialize the Swarm</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>One command is all it takes to create a Swarm cluster from scratch:</p>
                            <pre className="doc-code-block mb-3 border-success text-success bg-dark x-small">
{`$ docker swarm init --advertise-addr <MANAGER-IP>

# Example output:
Swarm initialized: current node (abc123) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-abc...xyz 192.168.1.10:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.`}
                            </pre>
                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-info">
                                        <h6 className="fw-bold text-info mb-2"><i className="bi bi-info-circle me-2"></i>What <code>--advertise-addr</code> does</h6>
                                        <p className="small text-secondary mb-0">Tells other nodes which IP address to reach <em>this</em> manager on. Required when the machine has multiple network interfaces.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-warning">
                                        <h6 className="fw-bold text-warning mb-2"><i className="bi bi-shield-lock me-2"></i>Port 2377</h6>
                                        <p className="small text-secondary mb-0">This is the cluster management port. <strong>Only open this to Manager nodes</strong>, never to the public internet.</p>
                                    </div>
                                </div>
                            </div>
                            <h5 className="fw-bold text-light mt-4 mb-3">Get the join tokens</h5>
                            <pre className="doc-code-block mb-0 border-secondary text-light bg-dark x-small">
{`# Get token to add a WORKER
$ docker swarm join-token worker

# Get token to add a MANAGER
$ docker swarm join-token manager`}
                            </pre>
                        </div>
                    </div>

                    {/* 3. JOINING THE SWARM */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-plus-circle-fill"></i></div>
                            <h2 className="doc-card-heading text-info">3. Joining Nodes</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Run this on each machine you want to add to the cluster:</p>
                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
{`# On the WORKER machine:
$ docker swarm join \\
  --token SWMTKN-1-abc...xyz \\
  192.168.1.10:2377

# Output: This node joined a swarm as a worker.`}
                            </pre>
                            <h5 className="fw-bold text-light mb-3">Verify with <code>node ls</code></h5>
                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`$ docker node ls

ID          HOSTNAME   STATUS  AVAILABILITY  MANAGER STATUS
abc123 *    manager1   Ready   Active        Leader
def456      worker1    Ready   Active
ghi789      worker2    Ready   Active`}
                            </pre>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Reading the output</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        The <code>*</code> marks the node you are currently connected to. <strong>Leader</strong> = the active Raft leader (the boss). Only managers have a value in the <code>MANAGER STATUS</code> column.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. NODE MANAGEMENT */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning"><i className="bi bi-sliders"></i></div>
                            <h2 className="doc-card-heading text-warning">4. Managing Nodes</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-success"><i className="bi bi-arrow-up-circle-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Promote a Worker</h5>
                                        </div>
                                        <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">{`docker node promote worker1`}</pre>
                                        <p className="small text-secondary mt-2 mb-0">Makes a worker into a manager. Now it participates in Raft voting.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-danger"><i className="bi bi-arrow-down-circle-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Demote a Manager</h5>
                                        </div>
                                        <pre className="doc-code-block mb-0 border-danger text-danger bg-dark x-small">{`docker node demote manager2`}</pre>
                                        <p className="small text-secondary mt-2 mb-0">Removes Raft responsibilities. Still runs containers as a worker.</p>
                                    </div>
                                </div>
                            </div>

                            <h5 className="fw-bold text-warning mt-4 mb-3">Node Availability States</h5>
                            <table className="table table-dark table-bordered small">
                                <thead>
                                    <tr>
                                        <th>State</th>
                                        <th>Meaning</th>
                                        <th>Command</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-success"><code>Active</code></td>
                                        <td>Normal — can receive tasks</td>
                                        <td><code>... --availability active</code></td>
                                    </tr>
                                    <tr>
                                        <td className="text-warning"><code>Pause</code></td>
                                        <td>No new tasks, existing ones keep running</td>
                                        <td><code>... --availability pause</code></td>
                                    </tr>
                                    <tr>
                                        <td className="text-danger"><code>Drain</code></td>
                                        <td>All tasks evicted and rescheduled elsewhere</td>
                                        <td><code>... --availability drain</code></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Gotcha: Drain is for maintenance!</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        When you drain a node, Swarm <strong>immediately reschedules all its tasks</strong> onto other available nodes. Use this before doing OS updates or hardware maintenance on a machine.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. RAFT CONSENSUS */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-patch-check-fill"></i></div>
                            <h2 className="doc-card-heading text-danger">5. DCA Boss Level: Raft Consensus &amp; Quorum</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                When you have multiple managers, they must all <strong>agree</strong> on every decision (like scheduling a new container). This agreement is handled by the <strong>Raft algorithm</strong>.
                            </p>
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-info text-center">
                                        <i className="bi bi-people-fill fs-2 text-info mb-2"></i>
                                        <h6 className="fw-bold text-info">Quorum</h6>
                                        <p className="small text-secondary mb-0">More than <strong>50% of managers</strong> must be alive for the cluster to make decisions. Without quorum, the swarm is frozen.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-warning text-center">
                                        <i className="bi bi-123 fs-2 text-warning mb-2"></i>
                                        <h6 className="fw-bold text-warning">Odd Numbers Rule</h6>
                                        <p className="small text-secondary mb-0">Always use <strong>1, 3, 5, or 7</strong> managers. Never 2 or 4 — even numbers can cause a tie vote (split-brain).</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-danger text-center">
                                        <i className="bi bi-calculator fs-2 text-danger mb-2"></i>
                                        <h6 className="fw-bold text-danger">Fault Tolerance</h6>
                                        <p className="small text-secondary mb-0"><strong>3 managers</strong> = tolerate 1 failure.<br/><strong>5 managers</strong> = tolerate 2 failures.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 rounded bg-dark border border-danger border-opacity-25">
                                <h6 className="fw-bold text-danger mb-3"><i className="bi bi-table me-2"></i>Quorum Cheat Sheet</h6>
                                <table className="table table-dark table-sm small mb-0">
                                    <thead><tr><th>Managers</th><th>Quorum Needed</th><th>Max Failures</th></tr></thead>
                                    <tbody>
                                        <tr><td>1</td><td>1</td><td>0</td></tr>
                                        <tr><td>3</td><td>2</td><td>1</td></tr>
                                        <tr><td>5</td><td>3</td><td>2</td></tr>
                                        <tr><td>7</td><td>4</td><td>3</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* LEAVE / REMOVE */}
                    <div className="doc-section-card shadow-lg border-secondary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary"><i className="bi bi-box-arrow-right"></i></div>
                            <h2 className="doc-card-heading">6. Leaving &amp; Removing Nodes</h2>
                        </div>
                        <div className="doc-card-body">
                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`# On the node you want to remove:
$ docker swarm leave

# Force-remove a node from the manager:
$ docker node rm worker1

# Force a manager to leave (dangerous!):
$ docker swarm leave --force`}
                            </pre>
                            <div className="doc-alert doc-alert-warning">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Gotcha</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Dead nodes stay in <code>docker node ls</code> as <strong>"Down"</strong> until you manually remove them. Always clean up with <code>docker node rm</code> after decommissioning a machine.
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
