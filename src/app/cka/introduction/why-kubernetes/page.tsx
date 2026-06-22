import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Kubernetes? - CKA Documentation",
  description: "Understand the core operational problems Kubernetes solves, transitioning from Docker containers to cluster orchestration."
};

export default function WhyKubernetesPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Introduction</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Why Kubernetes?</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Understanding the transition from containerization to container orchestration.
        </p>
      </div>

      <div className="doc-content-grid">
        
        {/* SECTION: The Problem Statement */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-patch-question-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">The Problem Statement</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-light fw-bold fs-5">
              "If Docker containers already work perfectly, why do we need Kubernetes?"
            </p>
            <p className="text-secondary">
              Docker is incredible at packaging an application so it runs identically on any laptop or server. However, running a container on a single server is fundamentally different from running an enterprise application at scale.
            </p>
            <p className="text-secondary">
              Imagine you have a Docker container running your backend API. What happens when:
            </p>
            <ul className="text-secondary mb-0 pl-3">
              <li className="mb-2">The physical server running your container catches fire or loses network connectivity?</li>
              <li className="mb-2">Your application goes viral and you suddenly need to run 50 identical copies of your container to handle the traffic?</li>
              <li className="mb-2">You need to update your application to a new version without dropping a single user request (zero-downtime deployment)?</li>
              <li>You have 10 different microservices, and they all need to securely find and communicate with each other across 5 different servers?</li>
            </ul>
            <div className="mt-4 p-3 bg-dark rounded border border-secondary border-opacity-50">
              <p className="text-info small fw-bold mb-0">
                Docker is a packaging tool. Kubernetes is an operational orchestration platform.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: The Evolution Matrix */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Container Evolution</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-bordered table-hover mb-0 text-secondary align-middle small">
                <thead className="table-secondary text-dark">
                  <tr>
                    <th>Tool</th>
                    <th>Primary Function</th>
                    <th>Scope</th>
                    <th>Production Scale Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">Docker Engine</strong></td>
                    <td>Builds images and runs individual containers.</td>
                    <td>Single Machine</td>
                    <td>Very Low. No automatic recovery if the host fails.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Docker Compose</strong></td>
                    <td>Links multiple containers together (e.g., API + Database).</td>
                    <td>Single Machine</td>
                    <td>Low. Excellent for local development, but still restricted to one physical host.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Docker Swarm</strong></td>
                    <td>Schedules containers across multiple machines.</td>
                    <td>Multi-Node Cluster</td>
                    <td>Medium. Good for small to medium businesses, but lacks advanced features like complex routing, deep RBAC, and massive scalability.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Kubernetes (K8s)</strong></td>
                    <td>Enterprise-grade container orchestration.</td>
                    <td>Massive Clusters</td>
                    <td>Extremely High. Automates scaling, self-healing, advanced networking, and resource management across thousands of nodes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION: Real-World Operational Problems */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-tools"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Real-World Problems Solved by Kubernetes</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2">1. High Availability & Self-Healing</h6>
                  <p className="text-secondary x-small mb-0">
                    If a server (Node) crashes, Kubernetes detects the failure and instantly reschedules all containers (Pods) that were running on the dead server onto healthy servers. It ensures your desired state (e.g., "always keep 5 replicas running") is strictly maintained.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2">2. Load Balancing & Service Discovery</h6>
                  <p className="text-secondary x-small mb-0">
                    Kubernetes gives your containers their own IP addresses and a single DNS name for a set of containers. If you run 10 backend instances, the Kubernetes Service acts as an internal load balancer, distributing traffic evenly without manual configuration.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2">3. Scaling & Resource Management</h6>
                  <p className="text-secondary x-small mb-0">
                    During a traffic spike (e.g., Black Friday), Kubernetes can automatically spin up more container instances (Horizontal Pod Autoscaler). Furthermore, it packs containers onto servers intelligently based on their CPU and Memory requirements to maximize hardware efficiency.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border border-secondary border-opacity-50 rounded h-100 bg-dark">
                  <h6 className="text-light fw-bold mb-2">4. Automated Rollouts & Rollbacks</h6>
                  <p className="text-secondary x-small mb-0">
                    Deploying version 2.0? Kubernetes gradually replaces instances of your application (Rolling Update). If version 2.0 starts failing health checks, Kubernetes halts the deployment and automatically rolls back to version 1.9.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION: Swarm vs K8s */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-arrow-left-right"></i>
            </div>
            <h2 className="doc-card-heading text-success">Swarm vs. Kubernetes: The Trade-off</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small">
              Docker Swarm was Docker's native attempt at solving these problems. It is drastically simpler to install and learn. So why did the industry unanimously choose Kubernetes, despite its steep learning curve and operational overhead?
            </p>
            
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <ul className="text-secondary small mb-0 pl-3">
                <li className="mb-3">
                  <strong className="text-light">Extensibility:</strong> Kubernetes is not just a container runner; it is a highly extensible API framework. You can plug in custom networking (CNI), custom storage (CSI), and custom resource definitions (CRDs). Swarm is relatively closed.
                </li>
                <li className="mb-3">
                  <strong className="text-light">Cloud Native Ecosystem:</strong> Every major cloud provider (AWS EKS, Google GKE, Azure AKS) offers managed Kubernetes. It became the vendor-neutral operating system of the cloud.
                </li>
                <li>
                  <strong className="text-light">Fine-Grained Control:</strong> Swarm lacks advanced features like deep Role-Based Access Control (RBAC), complex deployment strategies (Canary, Blue-Green via service meshes), and advanced scheduling policies (Node Affinity, Taints, and Tolerations).
                </li>
              </ul>
            </div>
            
            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">The Cost of Complexity</h6>
                <p className="mb-0 x-small text-secondary">
                  Kubernetes requires a dedicated team of engineers to maintain the control plane (if self-hosting), manage certificates, and handle complex networking. Companies accept this cost because the operational resilience at scale far outweighs the infrastructure overhead.
                </p>
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
            <h2 className="doc-card-heading text-danger">Interview Focus</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: What is the main difference between Docker and Kubernetes?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Docker is a containerization platform used to build, package, and run applications in isolated environments on a single host. Kubernetes is an orchestration platform used to manage, scale, and maintain high availability of those containers across a cluster of multiple hosts.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: How does Kubernetes handle application failure?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Kubernetes continuously monitors the state of applications against the desired state declared in configuration files. If a container crashes or a node fails, the control plane immediately detects the discrepancy and schedules replacement containers on healthy nodes to restore the desired state.
              </p>
            </div>

            <div>
              <h6 className="text-light fw-bold">Q: Why would a company use Docker Compose in local development but Kubernetes in production?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Docker Compose is lightweight and excellent for spinning up a multi-container stack on a developer's laptop without consuming massive resources. However, it cannot distribute containers across multiple servers, auto-scale based on CPU metrics, or perform zero-downtime rolling updates—features that are strictly required in production environments and provided by Kubernetes.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION: Summary */}
        <div className="doc-section-card shadow-lg mb-5">
          <div className="doc-card-body text-center p-4">
            <h4 className="text-primary fw-bold mb-3">Concise Summary</h4>
            <p className="text-light fs-5 mb-0" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Docker packages your application. Kubernetes manages the operations, ensuring your packaged application stays running, scales to meet demand, and survives server failures automatically.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
