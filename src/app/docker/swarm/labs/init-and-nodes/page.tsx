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
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-info h-100">
                                        <h6 className="fw-bold text-info mb-2"><i className="bi bi-info-circle me-2"></i>What <code>--advertise-addr</code> does</h6>
                                        <p className="small text-secondary mb-0">Tells other nodes which IP address to reach <em>this</em> manager on. Required when the machine has multiple network interfaces.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-success h-100">
                                        <h6 className="fw-bold text-success mb-2"><i className="bi bi-search me-2"></i>How to find your IP</h6>
                                        <p className="x-small text-secondary mb-2">Run one of these in your terminal to find your local network IP:</p>
                                        <ul className="x-small text-secondary ps-3 mb-0">
                                            <li><strong>Linux:</strong> <code>hostname -I</code> or <code>ip route get 1.1.1.1</code></li>
                                            <li><strong>macOS:</strong> <code>ipconfig getifaddr en0</code></li>
                                            <li><strong>Windows (Cmd):</strong> <code>ipconfig</code></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="doc-sub-card border-warning h-100">
                                        <h6 className="fw-bold text-warning mb-2"><i className="bi bi-shield-lock me-2"></i>Port 2377</h6>
                                        <p className="small text-secondary mb-0">This is the cluster management port. <strong>Only open this to Swarm nodes</strong>, never to the public internet.</p>
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
                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Crucial Rule: Run "init" ONLY Once!</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        You <strong>never</strong> run <code>docker swarm init</code> on multiple machines. You run it <strong>only once</strong> on the first Manager node to initialize the cluster. All other nodes—whether they are Workers or additional Managers—join the cluster using <code>docker swarm join</code> with the correct token.
                                    </p>
                                </div>
                            </div>
                            <p>Run this on each machine you want to add to the cluster:</p>
                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
{`# Option A: To join as a WORKER node:
$ docker swarm join \\
  --token SWMTKN-1-WORKER-TOKEN-HERE \\
  192.168.1.10:2377

# Option B: To join as an additional MANAGER node:
$ docker swarm join \\
  --token SWMTKN-1-MANAGER-TOKEN-HERE \\
  192.168.1.10:2377`}
                            </pre>
                            <h5 className="fw-bold text-light mb-3">Verify with <code>node ls</code></h5>
                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`$ docker node ls

ID          HOSTNAME   STATUS  AVAILABILITY  MANAGER STATUS
abc123 *    manager1   Ready   Active        Leader
def456      worker1    Ready   Active
ghi789      worker2    Ready   Active`}
                            </pre>
                            <div className="row g-3 mt-3">
                                <div className="col-md-6">
                                    <div className="doc-alert doc-alert-info h-100 mb-0">
                                        <i className="bi bi-info-circle-fill"></i>
                                        <div>
                                            <h6 className="fw-bold mb-1 text-info">Reading the output</h6>
                                            <p className="mb-0 x-small text-secondary">
                                                The <code>*</code> marks the node you are currently connected to. <strong>Leader</strong> = the active Raft leader (the boss). Only managers have a value in the <code>MANAGER STATUS</code> column.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-alert doc-alert-warning h-100 mb-0">
                                        <i className="bi bi-question-diamond-fill"></i>
                                        <div>
                                            <h6 className="fw-bold mb-1 text-warning">How does Docker know which Swarm to show?</h6>
                                            <p className="mb-0 x-small text-secondary">
                                                A single Docker Engine (daemon) <strong>can only belong to exactly one Swarm at a time</strong>. When you run <code>docker node ls</code>, your CLI asks your current active Docker daemon context, which only knows about the single Swarm it's currently joined to. There is no mixing of multiple swarms on a single daemon.
                                            </p>
                                        </div>
                                    </div>
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
                            <p className="small text-secondary mb-3">
                                <strong>If running on your local machine:</strong> Your current terminal window is already the "node's shell". You don't need to SSH anywhere. 
                                <br />
                                <strong>If running a multi-node cluster:</strong> You must first connect to the target machine's shell.
                            </p>
                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`# 1. Access the node's shell (usually via SSH, Multipass, or Vagrant):
$ ssh user@node-ip-address

# 2. Once inside the node, tell it to leave the Swarm:
$ docker swarm leave

# 3. Then, on a Manager node, remove it from the Swarm registry:
$ docker node rm worker1

# Force a manager to leave (dangerous!):
$ docker swarm leave --force`}
                            </pre>
                             <div className="doc-alert doc-alert-warning mb-3">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Gotcha: Status remains "Down"</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        When a node leaves, it stays in the Manager's <code>docker node ls</code> registry with a status of <strong>"Down"</strong>. It is not deleted automatically. A Manager must explicitly run <code>docker node rm &lt;node-name&gt;</code> to fully erase it.
                                    </p>
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-question-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">What happens if you run "leave" on your local machine?</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Running <code>docker swarm leave</code> targets the <strong>local Docker Daemon</strong> you are currently connected to:
                                        <br />
                                        • If your local machine joined as a <strong>Worker</strong>: Your machine immediately stops all swarm containers (tasks), disconnects from the swarm, and reverts to standalone Docker mode.
                                        <br />
                                        • If your local machine is the <strong>Manager/Leader</strong>: Docker will block you and say you cannot leave a swarm you are managing. You must run <code>docker swarm leave --force</code>. Once forced, the manager leaves, and because it was the only manager, the entire Swarm database is destroyed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. LOCAL MULTI-MANAGER LAB (DIND) */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-cpu-fill"></i></div>
                            <h2 className="doc-card-heading text-info">7. Hands-on: Local Multi-Manager Swarm from Scratch</h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="mb-4">
                                Normally, a multi-manager Swarm requires multiple physical or virtual machines. 
                                However, we can simulate a full production-like cluster on your <strong>single local machine</strong> using <strong>Docker-in-Docker (DinD)</strong>.
                                We will launch 3 Docker containers that run Docker *inside* them, connect them together, and deploy a 3-tier application stack.
                            </p>

                            <h4 className="fs-5 fw-bold text-light mb-3">Step 1: Create the Virtual Nodes (Containers)</h4>
                            <p className="small text-secondary">
                                Run these commands in your local machine terminal to create an isolated network and launch 3 independent Docker daemons (2 Managers, 1 Worker):
                            </p>
                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
{`# 1. Create a network for our virtual nodes to communicate
$ docker network create --driver bridge swarm-local-net

# 2. Spin up Node 1 (First Manager)
$ docker run -d --privileged --name node1 --network swarm-local-net -p 2377:2377 docker:dind

# 3. Spin up Node 2 (Second Manager)
$ docker run -d --privileged --name node2 --network swarm-local-net docker:dind

# 4. Spin up Node 3 (Worker Node)
$ docker run -d --privileged --name node3 --network swarm-local-net docker:dind`}
                            </pre>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h6 className="fw-bold text-danger mb-2"><i className="bi bi-shield-slash-fill me-2"></i>What does <code>--privileged</code> do?</h6>
                                        <p className="x-small text-secondary mb-0">
                                            By default, Docker isolates containers for security. However, to run a <strong>Docker daemon inside a container</strong> (Docker-in-Docker / DinD), the container needs host-level root permissions to manage namespaces, mount systems, and network routing. 
                                            <br />
                                            <span className="text-warning">⚠️ WARNING:</span> Never use <code>--privileged</code> in production for standard applications, as it poses a high security risk.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-warning h-100">
                                        <h6 className="fw-bold text-warning mb-2"><i className="bi bi-diagram-3-fill me-2"></i>Why Port <code>2377</code>?</h6>
                                        <p className="x-small text-secondary mb-0">
                                            <strong>Port 2377/TCP</strong> is the official default port Docker Swarm uses for cluster management communications, including leader elections and Raft replication. 
                                            <br />
                                            Mapping <code>-p 2377:2377</code> on <code>node1</code> allows your host machine's CLI to communicate directly with this virtual cluster's manager daemon.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="fs-5 fw-bold text-light mb-3">Step 2: Initialize the Swarm and Join the Nodes</h4>
                            <p className="small text-secondary">
                                Now we will execute commands *inside* these containers to configure the Swarm cluster:
                            </p>
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`# 1. Initialize the Swarm on Node 1 (Manager 1)
$ docker exec -it node1 docker swarm init --advertise-addr node1

# 2. Get the Manager Join Token from Node 1
$ docker exec -it node1 docker swarm join-token manager

# 3. Use the token to join Node 2 as a Manager (run this in your host terminal):
$ docker exec -it node2 docker swarm join --token <TOKEN-FROM-STEP-2> node1:2377

# 4. Get the Worker Join Token from Node 1
$ docker exec -it node1 docker swarm join-token worker

# 5. Use the token to join Node 3 as a Worker (run this in your host terminal):
$ docker exec -it node3 docker swarm join --token <TOKEN-FROM-STEP-4> node1:2377`}
                            </pre>

                            <h5 className="fw-bold text-light mb-3">Verify the Cluster Topology</h5>
                            <p className="small text-secondary">
                                Ask Node 1 to list all nodes in the Swarm. You should see 2 managers (one Leader, one Reachable) and 1 worker node:
                            </p>
                            <pre className="doc-code-block mb-4 border-secondary text-light bg-dark x-small">
{`$ docker exec -it node1 docker node ls

ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
abc123xxxxxxxxx *             node1      Ready     Active         Leader           24.0.5
def456xxxxxxxxx               node2      Ready     Active         Reachable        24.0.5
ghi789xxxxxxxxx               node3      Ready     Active                          24.0.5`}
                            </pre>

                            <hr className="my-4 border-secondary border-opacity-25" />

                            <h4 className="fs-5 fw-bold text-light mb-3">Step 3: Deploy the 6-Container Application Stack</h4>
                            <p className="small text-secondary mb-3">
                                We will deploy a 3-tier architecture. Docker Swarm uses <strong>Stacks</strong> (using a Compose file format) to launch multi-container apps:
                                <br />
                                • <strong>MySQL DB:</strong> 2 replicas (clustered/failover simulation).
                                <br />
                                • <strong>PHP API:</strong> 2 replicas (backend server processing api requests).
                                <br />
                                • <strong>HTML/JS Web App:</strong> 2 replicas (frontend static content server).
                            </p>

                            <div className="doc-alert doc-alert-info mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Conceptual Alert: Do 6 replicas require 6 nodes?</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        <strong>No!</strong> Replicas represent <strong>containers</strong>, not physical nodes/servers. 
                                        A single node (like a single computer) can run multiple containers at the same time. 
                                        In our 3-node virtual cluster, the Swarm Manager will automatically distribute the 6 containers (replicas) across the 3 available nodes (typically 2 containers per node). 
                                        You could even run 50 replicas on just 1 or 2 high-resource servers!
                                    </p>
                                </div>
                            </div>

                            <h5 className="fw-bold text-warning mb-2">1. Write the Stack Configuration</h5>
                            <p className="x-small text-secondary mb-2">
                                Run this command in your host terminal to write the <code>docker-compose.yml</code> file directly inside the manager node (<code>node1</code>):
                            </p>
                            <pre className="doc-code-block mb-4 border-warning text-warning bg-dark x-small">
{`$ docker exec -i node1 sh -c "cat > docker-compose.yml" << 'EOF'
version: '3.8'

services:
  # Database Tier (2 Replicas)
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret_db_pass
      MYSQL_DATABASE: app_db
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure

  # API Backend Tier (2 Replicas)
  api:
    image: php:8.2-apache
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure

  # Frontend Web Tier (2 Replicas)
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
EOF`}
                            </pre>

                            <h5 className="fw-bold text-success mb-2">2. Deploy the Stack to the Swarm</h5>
                            <p className="x-small text-secondary mb-2">
                                Run this command to instruct the Swarm to fetch the images, create the overlay network, and distribute the tasks across the nodes:
                            </p>
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker exec -it node1 docker stack deploy -c docker-compose.yml my-app`}
                            </pre>

                            <h5 className="fw-bold text-light mb-2">3. Verify the Running Services</h5>
                            <p className="x-small text-secondary mb-2">
                                Verify that all 6 containers are scheduled and running across the cluster:
                            </p>
                            <pre className="doc-code-block mb-4 border-secondary text-light bg-dark x-small">
{`$ docker exec -it node1 docker stack services my-app

ID             NAME         MODE         REPLICAS   IMAGE               PORTS
xyz123abc      my-app_db    replicated   2/2        mysql:8.0           
xyz123def      my-app_api   replicated   2/2        php:8.2-apache      
xyz123ghi      my-app_web   replicated   2/2        nginx:alpine        *:80->80/tcp`}
                            </pre>

                            <hr className="my-4 border-secondary border-opacity-25" />

                            <h4 className="fs-5 fw-bold text-light mb-3">Step 4: Cleanup the Lab Environment</h4>
                            <p className="small text-secondary">
                                Once you are finished, you can completely clean up the local containers and networks with:
                            </p>
                            <pre className="doc-code-block mb-0 border-danger text-danger bg-dark x-small">
{`# Delete the running virtual node containers
$ docker rm -f node1 node2 node3

# Delete the bridge network
$ docker network rm swarm-local-net`}
                            </pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
