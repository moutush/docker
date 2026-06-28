import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create a Cluster - CKA Documentation",
  description: "Step-by-step guide to creating a single-node and multi-node Kubernetes cluster locally using Kind (Kubernetes IN Docker) with Kubernetes v1.34.",
};

export default function CreateClusterPage() {
  return (
    <div className="container-fluid py-5 px-md-5">

      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-success text-light fs-5 p-2">Cluster</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Create a Cluster</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Spin up single-node and multi-node Kubernetes clusters locally using Kind and Kubernetes v1.34.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* INFO ALERT */}
        <div className="doc-alert doc-alert-info mb-4">
          <i className="bi bi-info-circle-fill"></i>
          <div>
            <h6 className="fw-bold mb-1 text-info">Prerequisites</h6>
            <p className="mb-0 x-small text-secondary">
              This guide assumes you have already installed <strong>Docker Engine</strong>, <strong>Kind</strong>, and <strong>kubectl</strong> on your system.
              If not, visit the <a href="/cka/introduction/installation" className="text-info text-decoration-underline">Installation guide</a> first.
            </p>
          </div>
        </div>

        {/* ── SECTION 1: SINGLE-NODE CLUSTER ─────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-circle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. Single-Node Cluster</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              A single-node cluster runs the <strong>control plane</strong> and accepts workloads on the same node.
              This is the fastest setup for learning kubectl, exploring the API, and running quick experiments.
            </p>

            {/* 1.1 Minimal one-liner */}
            <h5 className="text-light fw-bold mt-2 mb-3">Step 1.1: Create the Cluster (One-Liner)</h5>
            <p className="text-secondary small">
              The quickest way — Kind pulls the node image and bootstraps the cluster automatically:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --name cka-single --image kindest/node:v1.34.0`}
            </pre>

            <div className="doc-alert doc-alert-warning mt-3 mb-4">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Node Image Version</h6>
                <p className="mb-0 x-small text-secondary">
                  Kind uses pre-built node images tagged per Kubernetes version (<code>kindest/node:v1.34.x</code>).
                  Always verify the exact patch tag available at{' '}
                  <a href="https://github.com/kubernetes-sigs/kind/releases" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-underline">
                    github.com/kubernetes-sigs/kind/releases
                  </a>{' '}
                  before running — use the latest <code>v1.34.x</code> patch listed there.
                </p>
              </div>
            </div>

            {/* 1.2 Config file approach */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.2: Create via Config File (Recommended)</h5>
            <p className="text-secondary small">
              Using a config file gives you reproducible, version-controlled cluster definitions.
              Create a file named <code>single-node.yaml</code>:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# single-node.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: cka-single
nodes:
  - role: control-plane
    image: kindest/node:v1.34.0`}
            </pre>
            <p className="text-secondary small">Then apply the config:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --config single-node.yaml`}
            </pre>

            {/* 1.3 Verify */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.3: Verify the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# List all clusters Kind is managing:
kind get clusters

# Check nodes (should show 1 node, Ready status):
kubectl get nodes

# Check system pods:
kubectl get pods -n kube-system

# Inspect cluster info:
kubectl cluster-info --context kind-cka-single`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference</h6>
                <p className="mb-0 x-small text-secondary">
                  <a href="https://kind.sigs.k8s.io/docs/user/quick-start/#creating-a-cluster" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kind — Creating a Cluster (Quick Start)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: MULTI-NODE CLUSTER ──────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">2. Multi-Node Cluster</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              A multi-node cluster separates the <strong>control plane</strong> from one or more <strong>worker nodes</strong>.
              This mirrors production topology and is essential for practising scheduling, taints, tolerations,
              node affinity, and drain/cordon operations for the CKA exam.
            </p>

            {/* 2.1 Config file */}
            <h5 className="text-light fw-bold mt-2 mb-3">Step 2.1: Write the Cluster Config</h5>
            <p className="text-secondary small">
              Create a file named <code>multi-node.yaml</code>. The example below creates 1 control-plane node and 2 worker nodes:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# multi-node.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: cka-multi
nodes:
  - role: control-plane
    image: kindest/node:v1.34.0
  - role: worker
    image: kindest/node:v1.34.0
  - role: worker
    image: kindest/node:v1.34.0`}
            </pre>

            {/* 2.2 Create */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.2: Create the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --config multi-node.yaml`}
            </pre>
            <p className="text-secondary small mt-2">
              Kind will pull the node image once and reuse it for each node container. This may take a few minutes the first time.
            </p>

            {/* 2.3 Verify */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.3: Verify the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# All 3 nodes should appear as Ready:
kubectl get nodes -o wide

# Check the context Kind registered:
kubectl config current-context

# Describe a specific worker node:
kubectl describe node cka-multi-worker`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference</h6>
                <p className="mb-0 x-small text-secondary">
                  <a href="https://kind.sigs.k8s.io/docs/user/quick-start/#multinode-clusters" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kind — Multi-Node Clusters
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: MANAGING MULTIPLE CLUSTERS ──────────────────────── */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-sliders2-vertical"></i>
            </div>
            <h2 className="doc-card-heading text-info">3. Managing Multiple Clusters</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Kind registers each cluster as a separate <strong>kubeconfig context</strong>.
              Use these commands to switch between them, inspect them, and tear them down when done.
            </p>

            <h5 className="text-light fw-bold mt-2 mb-3">Context Switching</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# List all available contexts:
kubectl config get-contexts

# Switch to the single-node cluster:
kubectl config use-context kind-cka-single

# Switch to the multi-node cluster:
kubectl config use-context kind-cka-multi

# Confirm which context is active:
kubectl config current-context`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Listing and Deleting Clusters</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# List all Kind-managed clusters:
kind get clusters

# Delete a specific cluster (stops containers, removes kubeconfig context):
kind delete cluster --name cka-single
kind delete cluster --name cka-multi

# Delete ALL Kind clusters at once:
kind delete clusters --all`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official References</h6>
                <p className="mb-0 x-small text-secondary">
                  <a href="https://kind.sigs.k8s.io/docs/user/quick-start/#deleting-a-cluster" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kind — Deleting a Cluster
                  </a>
                  {' · '}
                  <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    kubectl — Configure Access to Multiple Clusters
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: QUICK REFERENCE TABLE ───────────────────────────── */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-secondary">
              <i className="bi bi-table"></i>
            </div>
            <h2 className="doc-card-heading">4. Quick Reference</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Task</th>
                    <th>Command</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-light">Create single-node cluster</td>
                    <td><code>kind create cluster --name cka-single --image kindest/node:v1.34.0</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">Create cluster from config file</td>
                    <td><code>kind create cluster --config cluster.yaml</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">List all Kind clusters</td>
                    <td><code>kind get clusters</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">List cluster nodes</td>
                    <td><code>kubectl get nodes -o wide</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">List all kubeconfig contexts</td>
                    <td><code>kubectl config get-contexts</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">Switch active context</td>
                    <td><code>kubectl config use-context kind-&lt;name&gt;</code></td>
                  </tr>
                  <tr>
                    <td className="text-light">Delete a cluster</td>
                    <td><code>kind delete cluster --name &lt;name&gt;</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official References</h6>
                <p className="mb-0 x-small text-secondary">
                  <a href="https://kind.sigs.k8s.io/docs/user/configuration/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kind — Full Configuration Reference
                  </a>
                  {' · '}
                  <a href="https://kubernetes.io/releases/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kubernetes — Official Release History
                  </a>
                  {' · '}
                  <a href="https://github.com/kubernetes-sigs/kind/releases" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                    Kind — GitHub Releases (node image tags)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
