import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker Swarm Overview - Docker Documentation",
    description: "A beginner-friendly overview of Docker Swarm, including Managers, Workers, Services, Tasks, and manager elections."
};

export default function SwarmOverviewPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker Swarm: An Overview
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        A beginner-friendly guide to understanding what Docker Swarm is and how it works under the hood.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS A SWARM */}
                    <div className="doc-section-card shadow-lg border-primary mb-5 overflow-hidden">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What is a Swarm? (The Noob-Friendly Version)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary mb-3">
                                Imagine you have a single laptop running Docker, and you want to host an important web application.
                                If that laptop breaks or loses power, your app goes offline. To prevent this, you'd want to buy several
                                laptops and have them work together as a team. If one fails, the others keep the app running.
                            </p>
                            <div className="p-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded mb-3">
                                <p className="mb-0 text-primary">
                                    <strong>Docker Swarm</strong> is just a group of individual machines (physical or virtual) running Docker that are joined together into a single, unified cluster.
                                </p>
                            </div>
                            <p className="small text-secondary mb-0">
                                Instead of interacting with multiple individual computers, you tell the <strong>Swarm</strong> what you want, and the Swarm figures out which machine will run it. It abstracts the computers away and presents you with one giant "super-machine."
                            </p>
                        </div>
                    </div>

                    {/* MANAGER AND WORKER */}
                    <div className="doc-section-card shadow-lg border-info mb-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Team Roles: Manager vs Worker
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary opacity-75 mb-4">
                                In a swarm, every machine is called a <strong>Node</strong>. But not all nodes wear the same hat. They are divided into two main roles:
                            </p>
                            <div className="row g-4 align-items-stretch">
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded border border-info bg-dark bg-opacity-50">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="bi bi-person-badge-fill fs-3 text-info me-3"></i>
                                            <h3 className="fs-5 fw-bold mb-0 text-info">The Manager</h3>
                                        </div>
                                        <p className="small text-secondary mb-3">
                                            The Manager is the <strong>Brain</strong> or the <strong>Boss</strong> of the cluster.
                                        </p>
                                        <ul className="small text-secondary list-unstyled">
                                            <li className="mb-2"><i className="bi bi-check-circle-fill text-info me-2"></i> Knows the "Desired State" (what you want running).</li>
                                            <li className="mb-2"><i className="bi bi-check-circle-fill text-info me-2"></i> Gives orders to other nodes.</li>
                                            <li><i className="bi bi-check-circle-fill text-info me-2"></i> Monitors the cluster health (if a worker dies, it notices).</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 h-100 rounded border border-secondary bg-dark bg-opacity-50">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="bi bi-tools fs-3 text-secondary me-3"></i>
                                            <h3 className="fs-5 fw-bold mb-0 text-secondary">The Worker</h3>
                                        </div>
                                        <p className="small text-secondary mb-3">
                                            The Worker is the <strong>Muscle</strong>. It doesn't make big decisions; it just follows orders.
                                        </p>
                                        <ul className="small text-secondary list-unstyled">
                                            <li className="mb-2"><i className="bi bi-check-circle-fill text-secondary me-2"></i> Only executes assigned jobs.</li>
                                            <li className="mb-2"><i className="bi bi-check-circle-fill text-secondary me-2"></i> Reports back its status to the Manager.</li>
                                            <li><i className="bi bi-check-circle-fill text-secondary me-2"></i> Doesn't know the full picture of the cluster.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="doc-alert mt-4 bg-info bg-opacity-10 border-info border-opacity-25 p-3 rounded">
                                <p className="mb-0 x-small text-info text-center">
                                    <strong>Fun Fact:</strong> By default, a Manager node is <em>also</em> a Worker node! It can give orders and run tasks itself at the same time.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SERVICE AND TASK */}
                    <div className="doc-section-card shadow-lg border-warning mb-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-gear-wide-connected"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Service vs. Task
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary opacity-75 mb-4">
                                When working with normal Docker, you run a <strong>Container</strong>. But in Docker Swarm, you create a <strong>Service</strong>. What's the difference?
                            </p>

                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="p-4 rounded bg-dark border border-warning border-opacity-25 h-100">
                                        <h3 className="fs-5 fw-bold text-warning mb-3">Service (The Blueprint)</h3>
                                        <p className="small text-secondary mb-3">
                                            A Service is your declaration of <strong>what you want</strong>. It is the blueprint or the plan.
                                        </p>
                                        <div className="p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 rounded mb-3">
                                            <p className="x-small text-secondary mb-0 fst-italic">
                                                "I want 5 copies of Nginx running across the cluster, using port 80."
                                            </p>
                                        </div>
                                        <p className="x-small text-secondary mb-0">
                                            You aren't directly creating containers. You are creating a rule that the Manager must enforce.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-4 rounded bg-dark border border-primary border-opacity-25 h-100">
                                        <h3 className="fs-5 fw-bold text-primary mb-3">Task (The Actual Container)</h3>
                                        <p className="small text-secondary mb-3">
                                            A Task is the actual, physical unit of work created by the Manager. <strong>One Task = One running Container.</strong>
                                        </p>
                                        <div className="p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 rounded mb-3">
                                            <p className="x-small text-secondary mb-0 fst-italic">
                                                "Task 1 is running Nginx on Node A. Task 2 is running Nginx on Node B."
                                            </p>
                                        </div>
                                        <p className="x-small text-secondary mb-0">
                                            If a Task (container) crashes, the Service (plan) says "we need 5", so the Manager spins up a new Task to replace it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INTERCONNECTION */}
                    <div className="doc-section-card shadow-lg border-success mb-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-bezier2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                How They All Connect (Under the Hood)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary opacity-75 mb-3">
                                When you type a Swarm command, here is exactly who talks to whom:
                            </p>
                            <ol className="small text-secondary mb-4">
                                <li className="mb-2"><strong>You run the command:</strong> You type <code>docker service create...</code> on the command line. This CLI command is sent directly to the <strong>Docker Engine (Daemon) running on the Manager node</strong>. You only ever send deployment/management commands to a Manager, never directly to Workers.</li>
                                <li className="mb-2"><strong>The Manager processes it:</strong> The Manager's Docker Engine receives the request, stores the blueprint, and decides how to divide the work.</li>
                                <li><strong>The Engines talk:</strong> The Manager's Docker Engine contacts the <strong>Docker Engines running on the Worker nodes</strong> via secure internal networking (gRPC) and says: <em>"Hey, pull this image and start a container (Task) for me."</em></li>
                            </ol>

                            <div className="p-4 bg-dark bg-opacity-25 border border-success border-opacity-25 rounded">
                                <div className="row text-center align-items-center g-3">
                                    <div className="col-md-2">
                                        <div className="p-2 border border-secondary rounded">
                                            <div className="text-white fw-bold">Docker CLI</div>
                                            <div className="x-small text-secondary">"Run 3 Web apps"</div>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <i className="bi bi-arrow-right fs-3 text-success opacity-50"></i>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2 border border-info bg-info bg-opacity-10 rounded">
                                            <div className="text-info fw-bold">Manager Daemon</div>
                                            <div className="x-small text-secondary">Docker Engine receives command, decides scheduling</div>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <i className="bi bi-arrow-right fs-3 text-success opacity-50"></i>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="p-2 border border-secondary rounded bg-dark">
                                                <div className="text-white x-small">Tells Worker A's <strong>Docker Engine</strong> to run Task 1</div>
                                            </div>
                                            <div className="p-2 border border-secondary rounded bg-dark">
                                                <div className="text-white x-small">Tells Worker B's <strong>Docker Engine</strong> to run Task 2</div>
                                            </div>
                                            <div className="p-2 border border-secondary rounded bg-dark">
                                                <div className="text-white x-small">Tells own <strong>Docker Engine</strong> (as worker) to run Task 3</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded">
                                <h4 className="fs-6 fw-bold text-success mb-2">The Pulse (Heartbeat)</h4>
                                <p className="x-small text-secondary mb-0">
                                    Every few milliseconds, the <strong>Docker Engines on the Workers</strong> send a "Heartbeat" signal back to the <strong>Docker Engine on the Manager</strong>.
                                    They are essentially saying: <em>"I'm alive, and Task 1 is still running!"</em>
                                    If the Manager's Docker Engine stops hearing the heartbeat from Node A, it assumes the node exploded, and immediately creates a new Task on a healthy node's Docker Engine to replace it.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RAFT CONSENSUS / MANAGER DEATH */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                What if the Manager Dies? (Raft Consensus)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary opacity-75 mb-3">
                                If you only have one Manager and it crashes, the cluster freezes. Existing tasks keep running, but no new tasks can be created, and self-healing stops.
                                To prevent this, production swarms always have <strong>multiple Manager nodes</strong> (usually 3, 5, or 7).
                            </p>

                            <div className="p-4 bg-dark bg-opacity-50 border border-danger border-opacity-25 rounded mb-4">
                                <h4 className="fs-5 fw-bold text-danger mb-3">The Election Process</h4>
                                <p className="small text-secondary mb-3">
                                    Even if there are 5 Managers, only <strong>ONE</strong> is the true boss at any given time. This boss is called the <strong>Leader</strong>. The other Managers are "Followers."
                                </p>
                                <p className="small text-secondary mb-0">
                                    If the Leader server catches fire and dies, the remaining Follower Managers notice that the Leader's heartbeat has stopped.
                                    They immediately hold a democratic <strong>Election</strong> to vote for a new Leader.
                                </p>
                            </div>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="p-4 border border-secondary border-opacity-50 rounded h-100 bg-dark bg-opacity-25">
                                        <h4 className="fs-6 fw-bold text-light mb-2">The Raft Consensus Algorithm</h4>
                                        <p className="x-small text-secondary mb-0">
                                            The algorithm Docker uses to run this election is called <strong>Raft</strong>.
                                            Raft ensures that all Managers agree on who the leader is, and they all keep exact copies of the cluster state.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 border border-secondary border-opacity-50 rounded h-100 bg-dark bg-opacity-25">
                                        <h4 className="fs-6 fw-bold text-light mb-2">Why odd numbers? (3, 5, 7)</h4>
                                        <p className="x-small text-secondary mb-0">
                                            To elect a leader, a <strong>Quorum</strong> (strict majority) is needed.
                                            If you have 2 managers and they lose connection to each other, they might both vote for themselves, causing a tie (Split-Brain).
                                            An odd number ensures a clear winner can always be chosen!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SELF-HEALING FAQ: DEADB CONTAINER SCENARIOS */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-question-circle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Swarm FAQs: Setup, Costs & Real-World Scenarios
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4 mb-4 pb-4 border-bottom border-secondary border-opacity-10">
                                <div className="col-md-6 border-end border-white border-opacity-10 pe-md-4">
                                    <h4 className="fs-6 fw-bold text-light mb-2">
                                        Q: If I ask for 5 replicas and 1 dies, does the Manager replace it or operate with 4?
                                    </h4>
                                    <p className="small text-secondary mb-0">
                                        The Manager will <strong>immediately start a brand-new container (Task)</strong> to replace the dead one. 
                                        Docker Swarm is declarative—it continuously matches the <em>Actual State</em> (currently 4) to your <em>Desired State</em> (5). 
                                        It will not rest until 5 healthy replicas are running.
                                    </p>
                                </div>
                                <div className="col-md-6 ps-md-4">
                                    <h4 className="fs-6 fw-bold text-light mb-2">
                                        Q: If a "dead" node/container wakes up later, who cleans up the stale zombie container?
                                    </h4>
                                    <p className="small text-secondary mb-0">
                                        <strong>Docker Swarm handles the cleanup automatically.</strong> 
                                        When the lost node reconnects to the swarm, its local Docker Engine checks in with the Manager. 
                                        The Manager informs it: <em>"Hey, those tasks you were running have been rescheduled. Destroy them."</em> 
                                        The local Engine then terminates the stale containers to ensure you don't waste resources or double-pay for duplicate services.
                                    </p>
                                </div>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-6 border-end border-white border-opacity-10 pe-md-4">
                                    <h4 className="fs-6 fw-bold text-light mb-2">
                                        Q: Are there two types of Swarms? Single Manager vs. Multiple Managers?
                                    </h4>
                                    <p className="small text-secondary mb-0">
                                        Yes! Practically speaking, there are two cluster topologies:
                                        <br />
                                        1. <strong>Single Manager:</strong> Cheap and simple. Perfect for development, but has a Single Point of Failure. If the manager dies, Swarm orchestration stops.
                                        <br />
                                        2. <strong>Multi-Manager (High Availability):</strong> Uses Raft consensus (3, 5, or 7 managers). If the leader dies, another manager takes over instantly. Best for production.
                                    </p>
                                </div>
                                <div className="col-md-6 ps-md-4">
                                    <h4 className="fs-6 fw-bold text-light mb-2">
                                        Q: Who decides the costing of a Swarm?
                                    </h4>
                                    <p className="small text-secondary mb-0">
                                        <strong>Docker Swarm itself is 100% free and open-source</strong> (built right into the free Docker Engine). 
                                        The cost is determined entirely by your <strong>infrastructure provider</strong> (AWS, Google Cloud, DigitalOcean, or your own hardware). 
                                        You only pay for the servers (virtual or physical) you spin up. Thus, <em>you</em> decide the cost based on how many nodes (and what sizes) you choose to provision!
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
