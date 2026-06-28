import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What is a Cluster? - CKA Documentation",
  description: "Learn what a Kubernetes Cluster is, why it exists, how it differs from a single-machine Docker setup, and the roles of Control Plane and Worker Nodes."
};

export default function WhatIsClusterPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info text-dark fs-5 p-2">Core Concepts</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>What is a Cluster?</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The foundation of distributed infrastructure and container orchestration.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Conceptual Overview */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-cloud-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">Understanding the Kubernetes Cluster</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A <strong>Kubernetes Cluster</strong> is a collection of physical or virtual machines (called <strong>Nodes</strong>) that work together to run containerized applications.
            </p>
            <p className="text-secondary mb-3">
              Instead of treating each server as an isolated island, Kubernetes aggregates these separate servers into a single, unified pool of compute resources. When you deploy an application, you do not tell Kubernetes <em>which</em> machine to run it on; you simply describe the desired state of your application to the cluster, and Kubernetes figures out the best way to distribute and manage it.
            </p>
            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Unified Virtual Supercomputer</h6>
                <p className="mb-0 x-small text-secondary">
                  Think of a cluster as a single, virtual supercomputer. Under the hood, it could be made of 3, 30, or 3,000 physical servers running in a cloud or data center, but to you, the developer, it presents itself as one cohesive system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Why It Exists */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-lightbulb-fill"></i>
            </div>
            <h2 className="doc-card-heading">Why Do Clusters Exist?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Modern application hosting requires high reliability, scalability, and efficiency. Single-server systems cannot meet these demands for the following reasons:
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2"><i className="bi bi-shield-fill-check text-success me-2"></i>Fault Tolerance & HA</h6>
                  <p className="text-secondary small mb-0">
                    If an application runs on only one physical machine and that machine crashes, your service goes down. In a cluster, if one Node fails, the workloads are automatically rescheduled on the remaining healthy Nodes, ensuring zero downtime.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2"><i className="bi bi-speedometer2 text-info me-2"></i>Scalability Beyond Limits</h6>
                  <p className="text-secondary small mb-0">
                    A single server has physical constraints (CPU, RAM, Disk). Once you hit those limits, your only choice is vertical scaling (buying a bigger, more expensive machine). Clusters enable horizontal scaling—adding more nodes to the pool to increase capacity indefinitely.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2"><i className="bi bi-arrow-down-up text-primary me-2"></i>Resource Optimization</h6>
                  <p className="text-secondary small mb-0">
                    By grouping resources, Kubernetes can pack containers onto nodes in a way that maximizes hardware utilization, reducing overall cloud infrastructure costs.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2"><i className="bi bi-shuffle text-warning me-2"></i>Seamless Load Distribution</h6>
                  <p className="text-secondary small mb-0">
                    Clusters allow traffic to be balanced dynamically across multiple copies of your container running across different physical host systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Docker Single Machine vs Cluster */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-arrow-left-right"></i>
            </div>
            <h2 className="doc-card-heading text-success">Docker (Single Machine) vs. Kubernetes Cluster</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Understanding the difference between running Docker locally and managing a Kubernetes cluster is essential for CKA. While Docker handles container lifecycle, Kubernetes handles multi-host operations.
            </p>

            <div className="table-responsive">
              <table className="table table-dark table-bordered table-hover mb-0 text-secondary align-middle small">
                <thead className="table-secondary text-dark">
                  <tr>
                    <th>Feature</th>
                    <th>Docker (Single Machine)</th>
                    <th>Kubernetes Cluster</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">Scope</strong></td>
                    <td>Restricted to a single server / host.</td>
                    <td>Spans multiple servers (virtual/physical) representing a single pool.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Host Failure Recovery</strong></td>
                    <td>None. If the host crashes, all containers die and remain offline.</td>
                    <td>Automatic. Workloads are instantly rescheduled on healthy nodes in the cluster.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Scaling</strong></td>
                    <td>Limited to the capacity of the single machine.</td>
                    <td>Horizontal scaling across multiple machines, with automatic scaling support.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Networking</strong></td>
                    <td>Bridge networks on the host. Hard to route across different physical machines.</td>
                    <td>Overlay networks (CNI) allowing containers on different machines to communicate securely.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Load Balancing</strong></td>
                    <td>Requires manual reverse-proxy setups (Nginx, Traefik).</td>
                    <td>Native LoadBalancer and ClusterIP services built directly into the platform.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: Intro to Roles */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-person-workspace"></i>
            </div>
            <h2 className="doc-card-heading text-info">Cluster Roles: Control Plane vs. Worker Nodes</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              A Kubernetes cluster is divided into two primary roles, separating management logic from application execution:
            </p>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="p-4 bg-dark rounded border border-info border-opacity-50 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-info bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center text-info" style={{ width: '45px', height: '45px' }}>
                      <i className="bi bi-cpu-fill fs-4"></i>
                    </div>
                    <h4 className="text-light fw-bold mb-0">1. Control Plane (The Brains)</h4>
                  </div>
                  <p className="text-secondary small mb-3">
                    The Control Plane is responsible for managing the cluster itself. It makes global decisions, monitors state changes, responds to events, and coordinates everything.
                  </p>
                  <ul className="text-secondary small pl-3 mb-0">
                    <li className="mb-2"><strong>Exposes the API:</strong> Receives all user configurations and commands.</li>
                    <li className="mb-2"><strong>State Persistence:</strong> Stores the actual status and configuration of the entire cluster.</li>
                    <li className="mb-2"><strong>Scheduling:</strong> Decides which node should run newly created containers.</li>
                    <li><strong>Event Enforcement:</strong> Runs loops that constantly check the actual state versus the desired state, taking correction actions when they drift.</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="p-4 bg-dark rounded border border-success border-opacity-50 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-success bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center text-success" style={{ width: '45px', height: '45px' }}>
                      <i className="bi bi-server fs-4"></i>
                    </div>
                    <h4 className="text-light fw-bold mb-0">2. Worker Nodes (The Muscle)</h4>
                  </div>
                  <p className="text-secondary small mb-3">
                    Worker Nodes are the machines that physically run the containerized application workloads. They execute commands directed by the Control Plane.
                  </p>
                  <ul className="text-secondary small pl-3 mb-0">
                    <li className="mb-2"><strong>Execute Containers:</strong> Start, stop, and manage container environments.</li>
                    <li className="mb-2"><strong>Manage Networking:</strong> Handle internal and external routing on the host machine.</li>
                    <li className="mb-2"><strong>Report Status:</strong> Continuously monitor and report container health and resource metrics back to the Control Plane.</li>
                    <li><strong>Outsource Execution:</strong> Leverage container engines (like containerd) to run the low-level processes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Interview Focus */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Interview Focus (Basic Cluster Concepts)</h2>
          </div>
          <div className="doc-card-body">
            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: Can a single machine serve as a Kubernetes Cluster?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Yes, for development and local testing purposes. Tools like Minikube, Kind, and MicroK8s run both the Control Plane and Worker Node components on a single virtual or physical host machine. However, this is never used in production because it lacks high availability and node fault tolerance.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: What is horizontal vs. vertical scaling in a cluster?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Vertical scaling involves increasing the CPU and RAM capacity of individual nodes. Horizontal scaling involves adding more node machines to the cluster pool. Kubernetes excels at horizontal scaling, allowing clusters to scale resources dynamically.
              </p>
            </div>

            <div>
              <h6 className="text-light fw-bold">Q: Why are worker nodes isolated from direct administration?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                In Kubernetes, worker nodes act as uniform, expendable compute resource providers. Administering them directly breaks declarative paradigms. Instead, administrators tell the Control Plane what to do, and the Control Plane instructs the nodes. This ensures consistent configuration and lets Kubernetes seamlessly handle failures.
              </p>
            </div>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="doc-section-card shadow-lg mb-5">
          <div className="doc-card-body text-center p-4">
            <h4 className="text-primary fw-bold mb-3">Next Step</h4>
            <p className="text-light fs-5 mb-0" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Now that you understand what a cluster is and the high-level division of labor, let's explore the components making up these nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
