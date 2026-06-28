import React from 'react';
import type { Metadata } from 'next';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';

export const metadata: Metadata = {
  title: "Kubernetes Architecture - CKA Documentation",
  description: "Deep dive into the Kubernetes Control Plane and Worker Nodes, covering API Server, etcd, Kubelet, and Kube-proxy."
};

export default function ArchitecturePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info text-dark fs-5 p-2">Core Concepts</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Cluster Architecture</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Understanding the Control Plane (Master) and Worker Nodes.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* SECTION: Architecture Flow Diagram */}
        <div className="doc-section-card shadow-lg border-primary mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">The Architecture Flow</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              When a developer runs a command like <code>kubectl run my-app</code>, an intricate flow of communication occurs between the Control Plane and the Worker Nodes. Here is the exact architectural pathway:
            </p>

            <div className="mb-5 text-center">
              <h3 className="text-secondary mb-3 border-bottom border-secondary pb-2">1. High-Level Overview</h3>
              <img src="/arch.png" alt="Simple Kubernetes Architecture" className="img-fluid rounded shadow border border-secondary p-2 bg-dark" style={{ maxHeight: '450px' }} />
            </div>

            <div className="d-flex flex-column align-items-center mb-5 w-100">
              <h3 className="text-secondary mb-3 border-bottom border-secondary pb-2 w-100 text-center">2. Detailed State Flow (Interactive)</h3>
              <p className="text-secondary small mb-3">Use the zoom controls in the top right to inspect the detailed declarative network flow.</p>
              <ArchitectureDiagram />
            </div>
          </div>
        </div>

        {/* SECTION: The Control Plane */}
        <div className="doc-section-card shadow-lg mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-cpu-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Control Plane (Master Node)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              The Control Plane is the brain of the cluster. It makes global decisions (like scheduling) and detects/responds to cluster events (like starting up a new pod when a node dies).
            </p>

            <div className="row g-4">
              <div className="col-12">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-door-open-fill text-primary me-2"></i>kube-apiserver</h5>
                  <p className="text-secondary small mb-2">
                    The absolute center of Kubernetes. Every single request—whether from a user, a worker node, or another control plane component—must go through the API server.
                  </p>
                  <p className="text-secondary small mb-0">
                    <strong>Flow:</strong> It receives the request, <em>Authenticates</em> the user, <em>Validates</em> the request syntax, and then writes the new desired state to etcd.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-database-fill text-warning me-2"></i>etcd</h5>
                  <p className="text-secondary small mb-2">
                    A highly-available, distributed key-value store. It is the single source of truth for the cluster. It stores all configuration data, state data, and metadata.
                  </p>
                  <p className="text-secondary small mb-0">
                    <strong className="text-danger">Crucial Rule:</strong> If etcd data is lost, your entire cluster is destroyed. The API server is the <em>only</em> component allowed to talk directly to etcd.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-calendar2-check-fill text-success me-2"></i>kube-scheduler</h5>
                  <p className="text-secondary small mb-2">
                    The matchmaker. When the API server says "we need a new Pod", the Scheduler looks at all available Worker Nodes to pick the absolute best Node for the Pod to run on.
                  </p>
                  <p className="text-secondary small mb-0">
                    <strong className="text-info">Crucial Detail:</strong> The scheduler <em>does not</em> physically scan or ping the nodes. Instead, it reads the <code>Node</code> objects cached in the API Server (which the Kubelets continuously update with their CPU/Memory availability). It analyzes these constraints and anti-affinity rules, and simply tells the API server "Bind this Pod to Node X". It does <em>not</em> run the Pod itself.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-arrow-repeat text-info me-2"></i>kube-controller-manager</h5>
                  <p className="text-secondary small mb-0">
                    The enforcer. It runs infinite loops watching the actual state of the cluster and comparing it to the desired state (stored in etcd). If you declared "I want 3 replicas" and one crashes, the controller manager notices the discrepancy and tells the API server to spin up a new one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: The Worker Nodes */}
        <div className="doc-section-card shadow-lg border-success mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-server"></i>
            </div>
            <h2 className="doc-card-heading text-success">The Worker Nodes</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Worker nodes are the physical or virtual machines that actually run your application workloads (Pods).
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success border-opacity-50 h-100">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-robot text-success me-2"></i>kubelet</h5>
                  <p className="text-secondary small mb-0">
                    The captain of the worker node. It registers the node with the API server. When the Scheduler assigns a Pod to this node, the kubelet receives the instruction, commands the Container Runtime to pull the image and start the container, and continually reports the health status back to the API server.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-success border-opacity-50 h-100">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-router-fill text-success me-2"></i>kube-proxy &amp; CNI</h5>
                  <p className="text-secondary small mb-2">
                    The network traffic cop. It runs on every node and watches the API server for new Services. It then writes <strong>iptables or IPVS rules</strong> locally on that node.
                  </p>
                  <p className="text-secondary small mb-0">
                    <strong className="text-warning">How cross-node routing works:</strong> If a request hits Node A, but the Pod is on Node B, <code>kube-proxy</code> uses its iptables to rewrite the destination IP to the Pod's IP (NAT). However, <code>kube-proxy</code> doesn't physically transport the packet across nodes! The actual cross-node networking (the overlay network/virtualization) is handled by the <strong>CNI (Container Network Interface)</strong> plugin, like Calico or Flannel.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-box text-light me-2"></i>Container Runtime</h5>
                  <p className="text-secondary small mb-0">
                    The engine that physically runs the containers. Kubernetes doesn't run containers itself; it outsources this to runtimes like <code>containerd</code>, <code>CRI-O</code>, or (formerly) Docker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Interview Focus */}
        <div className="doc-section-card shadow-lg border-danger mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Interview Focus (CKA Essentials)</h2>
          </div>
          <div className="doc-card-body">

            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: What happens to the cluster if the API Server goes down?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                The cluster enters a "headless" state. The existing Pods on the Worker Nodes will <strong>continue to run and serve traffic normally</strong> because kube-proxy network rules remain intact. However, you cannot deploy new apps, delete pods, or auto-scale, because all cluster management operations require the API Server.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: Can a Worker Node communicate directly with etcd?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                No. For extreme security and data integrity, <strong>only the API Server</strong> is permitted to interact with etcd. The kubelet on a worker node must ask the API server to fetch or update any state.
              </p>
            </div>

            <div>
              <h6 className="text-light fw-bold">Q: What is the difference between kubelet and kube-proxy?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                The <code>kubelet</code> manages the <em>lifecycle</em> of the Pods (starting, stopping, and reporting health to the API server). The <code>kube-proxy</code> manages the <em>networking</em> for those Pods (maintaining iptables to route inbound traffic to the correct container IP).
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
