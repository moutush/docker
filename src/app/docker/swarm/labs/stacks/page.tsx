import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lab: Swarm Stacks & Compose - Docker Documentation",
    description: "Deploy multi-service applications to Docker Swarm using Stacks and Compose files.",
};

export default function SwarmStacksPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab 4: Stacks &amp; Compose
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Deploy entire multi-service applications with a single command.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. WHAT IS A STACK */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary"><i className="bi bi-stack"></i></div>
                            <h2 className="doc-card-heading text-primary">1. What is a Stack?</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                A <strong>Stack</strong> is a group of interrelated services that share resources and are deployed together. It is the <strong>Swarm equivalent of Docker Compose</strong>.
                            </p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon"><i className="bi bi-file-code-fill"></i></div>
                                            <h5 className="doc-sub-card-title">Docker Compose</h5>
                                        </div>
                                        <ul className="small text-secondary ps-3 mb-0">
                                            <li className="mb-1">Runs on a <strong>single machine</strong>.</li>
                                            <li className="mb-1">For local development.</li>
                                            <li>Uses <code>docker compose up</code>.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-primary h-100">
                                        <div className="doc-sub-card-header">
                                            <div className="doc-sub-card-icon text-primary"><i className="bi bi-stack"></i></div>
                                            <h5 className="doc-sub-card-title">Swarm Stack</h5>
                                        </div>
                                        <ul className="small text-secondary ps-3 mb-0">
                                            <li className="mb-1">Runs across a <strong>cluster of machines</strong>.</li>
                                            <li className="mb-1">For production deployments.</li>
                                            <li>Uses <code>docker stack deploy</code>.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. COMPOSE FILE FOR SWARM */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success"><i className="bi bi-file-earmark-code-fill"></i></div>
                            <h2 className="doc-card-heading text-success">2. The Compose File (Swarm Version)</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>The same <code>docker-compose.yml</code> format, but with a special <code>deploy:</code> key for Swarm:</p>
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`version: "3.8"

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        max_attempts: 3

  api:
    image: my-api:1.0
    deploy:
      replicas: 2
      placement:
        constraints:
          - "node.role == worker"

networks:
  default:
    driver: overlay`}
                            </pre>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-info">
                                        <h6 className="fw-bold text-info mb-2"><i className="bi bi-gear me-2"></i><code>deploy:</code> key</h6>
                                        <p className="small text-secondary mb-0">Everything under <code>deploy:</code> is <strong>Swarm-specific</strong>. Docker Compose (local) ignores it entirely.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-warning">
                                        <h6 className="fw-bold text-warning mb-2"><i className="bi bi-pin-map me-2"></i>Placement Constraints</h6>
                                        <p className="small text-secondary mb-0">Force tasks to run only on specific nodes (e.g., only workers, or nodes with a specific label).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DEPLOY & MANAGE */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info"><i className="bi bi-terminal-fill"></i></div>
                            <h2 className="doc-card-heading text-info">3. Deploying &amp; Managing Stacks</h2>
                        </div>
                        <div className="doc-card-body">
                            <div className="row g-4">
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">Deploy a stack</h6>
                                    <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
{`$ docker stack deploy -c docker-compose.yml myapp

# myapp is the "stack name" — it prefixes all service names
# Services become: myapp_web, myapp_api`}
                                    </pre>
                                </div>
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">Manage your stacks</h6>
                                    <pre className="doc-code-block mb-0 border-secondary text-light bg-dark x-small">
{`$ docker stack ls          # List all stacks
$ docker stack ps myapp    # List all tasks in a stack
$ docker stack services myapp  # List all services in a stack
$ docker stack rm myapp    # Remove the entire stack`}
                                    </pre>
                                </div>
                            </div>
                            <div className="doc-alert doc-alert-info mt-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Re-deploying is an Update</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        Running <code>docker stack deploy</code> on an already-deployed stack performs a <strong>rolling update</strong>. It only changes services whose definition has changed in the compose file.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. DCA GOTCHA: IGNORED KEYS */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger"><i className="bi bi-exclamation-octagon-fill"></i></div>
                            <h2 className="doc-card-heading text-danger">4. DCA Gotcha: Keys Ignored in Swarm Mode</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Not all Compose file keys work in Swarm. These are <strong>silently ignored</strong> — Docker won't error, but they also won't work:
                            </p>
                            <table className="table table-dark table-bordered small mt-3">
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Why it's ignored</th>
                                        <th>Swarm Alternative</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code className="text-danger">build:</code></td>
                                        <td>Swarm can't build images at deploy time — it only pulls from a registry.</td>
                                        <td>Build and push the image first, then reference it.</td>
                                    </tr>
                                    <tr>
                                        <td><code className="text-danger">depends_on:</code></td>
                                        <td>Swarm doesn't manage startup order — all services start simultaneously.</td>
                                        <td>Add health checks and retry logic to your app code.</td>
                                    </tr>
                                    <tr>
                                        <td><code className="text-danger">container_name:</code></td>
                                        <td>Swarm generates task names automatically (e.g., <code>myapp_web.1</code>).</td>
                                        <td>Use <code>--name</code> on the service, not the container.</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-warning">DCA Exam Tip</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        The exam loves to ask: <em>"What happens if you include a <code>build:</code> key in a Swarm compose file?"</em> The answer: <strong>it is silently ignored</strong>. Docker will not throw an error.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. OVERLAY NETWORK */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning"><i className="bi bi-diagram-3-fill"></i></div>
                            <h2 className="doc-card-heading text-warning">5. Overlay Networks in Stacks</h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Services in a stack talk to each other using an <strong>Overlay Network</strong> — a virtual network that spans all nodes in the cluster.
                            </p>
                            <pre className="doc-code-block mb-3 border-warning text-warning bg-dark x-small">
{`# Services talk to each other by service name:
# In the 'api' container, you can reach 'web' via:
http://web:80

# The overlay network handles the routing automatically.`}
                            </pre>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Automatic Network Creation</h6>
                                    <p className="mb-0 x-small text-secondary">
                                        When you deploy a stack, Docker automatically creates an overlay network for it (named <code>stackname_default</code>). All services in the stack join this network automatically.
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
