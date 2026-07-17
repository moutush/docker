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
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>--name cka-single</code></td>
                    <td className="text-secondary">Names the cluster. Kind stores it in kubeconfig as <code>kind-cka-single</code> (always prefixes with <code>kind-</code>)</td>
                  </tr>
                  <tr>
                    <td><code>--image kindest/node:v1.34.0</code></td>
                    <td className="text-secondary">Selects the node container image — this is how you pin the exact Kubernetes version. Omitting it uses Kind&apos;s default version</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
            <div className="mt-2 mb-3">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-file-earmark-code-fill me-1 text-info"></i>YAML field breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>kind: Cluster</code></td>
                    <td className="text-secondary">Tells Kind what type of resource this file describes. Always <code>Cluster</code> for cluster configs (Kind also has other resource types like <code>InitConfiguration</code>)</td>
                  </tr>
                  <tr>
                    <td><code>apiVersion: kind.x-k8s.io/v1alpha4</code></td>
                    <td className="text-secondary">The schema version Kind uses to parse this file. <code>v1alpha4</code> is the current stable version — it determines which fields are valid</td>
                  </tr>
                  <tr>
                    <td><code>name: cka-single</code></td>
                    <td className="text-secondary">The cluster name. Kind stores it in kubeconfig as <code>kind-cka-single</code> (always prefixes with <code>kind-</code>). This overrides any <code>--name</code> CLI flag</td>
                  </tr>
                  <tr>
                    <td><code>nodes:</code></td>
                    <td className="text-secondary">A list of node definitions. Each <code>-</code> entry becomes one Docker container acting as a Kubernetes node</td>
                  </tr>
                  <tr>
                    <td><code>role: control-plane</code></td>
                    <td className="text-secondary">Marks this node as the control plane — it runs the API server, scheduler, etcd, and controller manager. Every cluster needs exactly one</td>
                  </tr>
                  <tr>
                    <td><code>image: kindest/node:v1.34.0</code></td>
                    <td className="text-secondary">The Docker image for this node. The tag (<code>v1.34.0</code>) is the Kubernetes version that will be installed on this node</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-secondary small">Then apply the config:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --config single-node.yaml`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>--config single-node.yaml</code></td>
                    <td className="text-secondary">Points Kind to a YAML file for cluster definition. The cluster name, node roles, and image are all declared inside — no extra CLI flags needed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 1.3 Verify */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.3: Verify the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# List all clusters defined in your kubeconfig:
kubectl config get-clusters

# Check nodes (should show 1 node, Ready status):
kubectl get nodes

# Check system pods:
kubectl get pods -n kube-system

# Inspect cluster info:
kubectl cluster-info --context kind-cka-single`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>config get-clusters</code></td>
                    <td className="text-secondary">Sub-command of <code>kubectl config</code> — reads your <code>~/.kube/config</code> and lists every cluster entry by name</td>
                  </tr>
                  <tr>
                    <td><code>get pods -n kube-system</code></td>
                    <td className="text-secondary"><code>-n</code> (short for <code>--namespace</code>) scopes the query to a specific namespace. <code>kube-system</code> holds the core control-plane pods</td>
                  </tr>
                  <tr>
                    <td><code>cluster-info --context kind-cka-single</code></td>
                    <td className="text-secondary"><code>--context</code> tells kubectl which cluster to target for this one command, without changing your active context permanently</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
            <div className="mt-2 mb-3">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-file-earmark-code-fill me-1 text-info"></i>YAML field breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>kind / apiVersion</code></td>
                    <td className="text-secondary">Same as single-node — <code>Cluster</code> resource type, <code>v1alpha4</code> schema. These two lines are always identical in Kind configs</td>
                  </tr>
                  <tr>
                    <td><code>name: cka-multi</code></td>
                    <td className="text-secondary">Cluster name, stored in kubeconfig as <code>kind-cka-multi</code>. Defined here in the file so no <code>--name</code> flag is needed on the CLI</td>
                  </tr>
                  <tr>
                    <td><code>nodes:</code></td>
                    <td className="text-secondary">List of nodes. Each <code>-</code> entry becomes a separate Docker container. The order determines boot sequence — control-plane always comes first</td>
                  </tr>
                  <tr>
                    <td><code>role: control-plane</code></td>
                    <td className="text-secondary">This node hosts the Kubernetes control plane components (API server, etcd, scheduler, controller manager). A cluster has exactly one</td>
                  </tr>
                  <tr>
                    <td><code>role: worker</code></td>
                    <td className="text-secondary">A pure workload node — no control plane components. Pods you schedule will run here. Add as many <code>- role: worker</code> entries as you need</td>
                  </tr>
                  <tr>
                    <td><code>image: kindest/node:v1.34.0</code></td>
                    <td className="text-secondary">Set per-node. Each node can have a different image (and therefore a different K8s version) — useful for testing version skew scenarios</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="doc-alert doc-alert-info mt-3 mb-4">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Where is the cluster name?</h6>
                <p className="mb-0 x-small text-secondary">
                  Notice the <code>name: cka-multi</code> field in the YAML file. When using a config file, Kind uses this field to name the cluster. You don't need to pass the <code>--name</code> flag in the CLI command, as the config file takes precedence.
                </p>
              </div>
            </div>

            {/* 2.2 Create */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.2: Create the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --config multi-node.yaml`}
            </pre>
            <div className="mt-2 mb-3">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>--config multi-node.yaml</code></td>
                    <td className="text-secondary">Reads the cluster topology from the YAML file — number of nodes, their roles, images, and the cluster name are all declared there. No extra flags needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-secondary small mt-2">
              Kind will pull the node image once and reuse it for each node container. This may take a few minutes the first time.
            </p>

            {/* 2.3 Verify */}
            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.3: Verify the Cluster</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# List all clusters defined in your kubeconfig to see your new multi-node cluster:
kubectl config get-clusters

# All 3 nodes should appear as Ready:
kubectl get nodes -o wide

# Check the active context:
kubectl config current-context

# Describe a specific worker node:
kubectl describe node cka-multi-worker`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>get nodes -o wide</code></td>
                    <td className="text-secondary"><code>-o wide</code> (output format) adds extra columns like internal IP, OS image, and container runtime — more detail than the default view</td>
                  </tr>
                  <tr>
                    <td><code>config current-context</code></td>
                    <td className="text-secondary">Prints only the name of whichever context is currently active — confirms your commands are targeting the right cluster</td>
                  </tr>
                  <tr>
                    <td><code>describe node &lt;name&gt;</code></td>
                    <td className="text-secondary">Shows full details for one node: labels, taints, conditions, resource capacity, and all pods scheduled on it</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
{`# List all clusters known to kubectl (from your kubeconfig):
kubectl config get-clusters

# Delete a specific cluster (stops containers, removes kubeconfig context):
kind delete cluster --name cka-single
kind delete cluster --name cka-multi

# Delete ALL Kind clusters at once:
kind delete clusters --all`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'42%'}}><code>delete cluster --name &lt;name&gt;</code></td>
                    <td className="text-secondary">Targets a named cluster for deletion. Without <code>--name</code>, Kind defaults to deleting the cluster named <code>kind</code> — you&apos;d silently delete the wrong one</td>
                  </tr>
                  <tr>
                    <td><code>delete clusters --all</code></td>
                    <td className="text-secondary">Note the plural <code>clusters</code>. Stops all Kind Docker containers and removes every Kind entry from your kubeconfig in one shot</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                    <td className="text-light">List all clusters in kubeconfig</td>
                    <td><code>kubectl config get-clusters</code></td>
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
