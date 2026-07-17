import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Listing Clusters, Contexts & Nodes - CKA Documentation",
  description: "A beginner-friendly CKA guide to listing Kind clusters, kubectl contexts, and Kubernetes nodes. Covers every command, flag, and common exam mistake.",
};

export default function ListClustersPage() {
  return (
    <div className="container-fluid py-5 px-md-5">

      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-info text-dark fs-5 p-2">Cluster</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Listing Clusters, Contexts &amp; Nodes</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Understand who knows what — Kind, kubectl, and Docker all have different views of your clusters.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* ── SECTION 0: INTUITION FIRST ──────────────────────────────────── */}
        <div className="doc-section-card shadow-lg mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-lightbulb-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">0. Build the Intuition First</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Before running a single command, let&apos;s understand the three separate &quot;address books&quot; that exist on your machine.
              Each one knows about clusters in a different way.
            </p>

            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Who</th>
                    <th>What it knows</th>
                    <th>How it knows</th>
                    <th>Command to ask</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-warning fw-semibold">Kind</td>
                    <td>Kind clusters that currently exist as Docker containers</td>
                    <td>Talks directly to the Docker daemon — looks for containers with the <code>kind</code> label</td>
                    <td><code>kind get clusters</code></td>
                  </tr>
                  <tr>
                    <td className="text-info fw-semibold">kubectl</td>
                    <td>Clusters, contexts, and users registered in your kubeconfig file</td>
                    <td>Reads <code>~/.kube/config</code> — a plain YAML file. Does NOT talk to Docker at all</td>
                    <td><code>kubectl config get-clusters</code></td>
                  </tr>
                  <tr>
                    <td className="text-success fw-semibold">Docker</td>
                    <td>All containers on your machine, including Kind node containers</td>
                    <td>Its own daemon. You can see Kind nodes as containers with <code>docker ps</code></td>
                    <td><code>docker ps --filter label=io.x-k8s.kind.cluster</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">These three can go out of sync!</h6>
                <p className="mb-0 x-small text-secondary">
                  If you manually <code>docker stop</code> a Kind node container without using <code>kind delete cluster</code>,
                  kubectl will still list the cluster (it&apos;s still in <code>~/.kube/config</code>) but Kind won&apos;t find it (no running container).
                  Always use <code>kind delete cluster</code> to clean up properly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: THREE CONCEPTS ───────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. Cluster vs Context vs Node</h2>
          </div>
          <div className="doc-card-body">

            <p className="text-secondary mb-4">Think of it this way.</p>

            <p className="text-secondary mb-3">
              Imagine you&apos;re using SSH. You have two servers:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-1">
{`Server A  →  10.0.0.5
Server B  →  10.0.0.8`}
            </pre>
            <p className="text-secondary small mb-4">These are like <strong className="text-light">clusters</strong> — the actual machines running.</p>

            <p className="text-secondary mb-3">
              Now your <code>~/.ssh/config</code> has:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-1">
{`Host prod
    HostName 10.0.0.5
    User ubuntu

Host dev
    HostName 10.0.0.8
    User rajat`}
            </pre>
            <p className="text-secondary small mb-4">
              <code>prod</code> and <code>dev</code> are like <strong className="text-light">contexts</strong> — saved shortcuts that say <em>which server</em> to connect to and <em>as which user</em>.
            </p>

            <div className="doc-alert doc-alert-info mb-4">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  The server exists independently. The SSH config is just a convenient way to connect to it.
                  <br />
                  Same here — the cluster exists independently. The kubeconfig context is just a saved way to connect to it.
                </p>
              </div>
            </div>

            <h5 className="text-light fw-bold mb-3">For the CKA, this is enough:</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th style={{width:'18%'}}>Concept</th>
                    <th>Definition</th>
                    <th>SSH equivalent</th>
                    <th>In Kind</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="text-primary fw-semibold">Cluster</span></td>
                    <td>The actual Kubernetes environment — control plane + nodes running together</td>
                    <td>The server (<code>10.0.0.5</code>)</td>
                    <td><code>cka-single</code>, <code>cka-multi</code></td>
                  </tr>
                  <tr>
                    <td><span className="text-success fw-semibold">Context</span></td>
                    <td>A saved configuration that tells kubectl <em>which cluster</em> to connect to, <em>which user</em> to authenticate as, and <em>which namespace</em> to default to</td>
                    <td>The <code>Host prod</code> block in <code>~/.ssh/config</code></td>
                    <td><code>kind-cka-single</code>, <code>kind-cka-multi</code></td>
                  </tr>
                  <tr>
                    <td><span className="text-warning fw-semibold">Node</span></td>
                    <td>A single machine inside a cluster that runs workloads. In Kind, each node is one Docker container</td>
                    <td>—</td>
                    <td><code>cka-single-control-plane</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mt-2 mb-3">Why kubectl cannot list all clusters</h5>
            <p className="text-secondary small mb-3">
              You might expect <code>kubectl get clusters</code> — but it doesn&apos;t exist. Here&apos;s why:
            </p>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">kubectl only talks to one cluster at a time</h6>
                <p className="mb-0 x-small text-secondary">
                  kubectl is a client that connects to one API server at a time — whichever your active context points to.
                  The list of all clusters only exists in your local <code>~/.kube/config</code> file, not inside any cluster.
                  So instead of asking a cluster, you query the config file itself:
                  <code className="d-block mt-1">kubectl config get-clusters</code>
                  This never makes a network call — it just reads your local file. Exactly like reading <code>~/.ssh/config</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: KUBECONFIG ANATOMY ───────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-file-earmark-code-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">2. Inside ~/.kube/config</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Every time you create a Kind cluster, Kind writes entries into <code>~/.kube/config</code>.
              Understanding this file makes all the context commands click. Here&apos;s a stripped-down version of what it looks like with two clusters:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# ~/.kube/config  (simplified)
apiVersion: v1
kind: Config

clusters:                          # ← registry of API server addresses
  - name: kind-cka-single
    cluster:
      server: https://127.0.0.1:PORT_A
  - name: kind-cka-multi
    cluster:
      server: https://127.0.0.1:PORT_B

users:                             # ← registry of credentials
  - name: kind-cka-single
    user:
      client-certificate-data: ...
  - name: kind-cka-multi
    user:
      client-certificate-data: ...

contexts:                          # ← named combinations of cluster + user + namespace
  - name: kind-cka-single
    context:
      cluster: kind-cka-single
      user: kind-cka-single
      namespace: default
  - name: kind-cka-multi
    context:
      cluster: kind-cka-multi
      user: kind-cka-multi
      namespace: default

current-context: kind-cka-single   # ← which context kubectl uses right now`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-file-earmark-code-fill me-1 text-info"></i>Key fields:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'35%'}}><code>clusters:</code></td>
                    <td className="text-secondary">List of API server endpoints. Each entry is a cluster kubectl can reach</td>
                  </tr>
                  <tr>
                    <td><code>users:</code></td>
                    <td className="text-secondary">Credentials (certificates, tokens) for authenticating to each cluster</td>
                  </tr>
                  <tr>
                    <td><code>contexts:</code></td>
                    <td className="text-secondary">Named combos binding a cluster + user + namespace. This is what you &quot;switch&quot; between</td>
                  </tr>
                  <tr>
                    <td><code>current-context:</code></td>
                    <td className="text-secondary">The single context that kubectl uses for every command right now. Change this to switch clusters</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: KIND GET CLUSTERS ─────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-collection-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">3. Listing Kind Clusters</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This command asks Kind directly — it talks to Docker and looks for running Kind node containers.
            </p>

            <h5 className="text-light fw-bold mb-3">The Command</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind get clusters`}
            </pre>
            <div className="mt-2 mb-4">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'35%'}}><code>kind</code></td>
                    <td className="text-secondary">The Kind CLI tool you installed. Manages Kind clusters by talking to Docker</td>
                  </tr>
                  <tr>
                    <td><code>get</code></td>
                    <td className="text-secondary">Kind sub-command meaning &quot;retrieve/list&quot;</td>
                  </tr>
                  <tr>
                    <td><code>clusters</code></td>
                    <td className="text-secondary">The resource type to list. Kind looks for Docker containers labeled as Kind cluster nodes and groups them by cluster name</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mb-3">What happens internally</h5>
            <p className="text-secondary small mb-3">
              Kind calls the Docker API and filters containers by the label <code>io.x-k8s.kind.cluster</code>.
              It collects the unique cluster name values from those labels and prints them.
              No network call to any Kubernetes API server happens.
            </p>

            <h5 className="text-light fw-bold mb-3">Example output</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`$ kind get clusters
cka-single
cka-multi`}
            </pre>

            <div className="doc-alert doc-alert-warning mt-3 mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Name difference vs kubectl</h6>
                <p className="mb-0 x-small text-secondary">
                  Kind shows the raw cluster name: <code>cka-single</code>.
                  kubectl shows it prefixed: <code>kind-cka-single</code>.
                  Same cluster — different lenses. Kind added the <code>kind-</code> prefix when it wrote the kubeconfig entry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: KUBECTL CONFIG COMMANDS ──────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-terminal-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">4. kubectl config Commands</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              All of these commands read or modify <code>~/.kube/config</code>. None of them make a live network call to a cluster.
              They are purely local file operations.
            </p>

            {/* 4.1 get-clusters */}
            <h5 className="text-light fw-bold mt-2 mb-3">4.1 List all clusters</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl config get-clusters`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>kubectl config</code></td>
                    <td className="text-secondary">Sub-command group for managing kubeconfig. All <code>kubectl config</code> commands operate on <code>~/.kube/config</code>, not a live cluster</td>
                  </tr>
                  <tr>
                    <td><code>get-clusters</code></td>
                    <td className="text-secondary">Prints the <code>name</code> field from every entry under <code>clusters:</code> in your kubeconfig</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl config get-clusters
NAME
kind-cka-single
kind-cka-multi`}
            </pre>

            {/* 4.2 get-contexts */}
            <h5 className="text-light fw-bold mt-4 mb-3">4.2 List all contexts</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl config get-contexts`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>get-contexts</code></td>
                    <td className="text-secondary">Prints every context in kubeconfig. Shows an asterisk <code>*</code> next to the currently active context. Columns: NAME, CLUSTER, AUTHINFO (user), NAMESPACE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl config get-contexts
CURRENT   NAME               CLUSTER            AUTHINFO           NAMESPACE
*         kind-cka-single    kind-cka-single    kind-cka-single    
          kind-cka-multi     kind-cka-multi     kind-cka-multi     `}
            </pre>
            <p className="text-secondary small mt-2">
              The <code>*</code> in the <code>CURRENT</code> column marks your active context — all kubectl commands
              (like <code>kubectl get pods</code>) will be sent to that cluster.
            </p>

            {/* 4.3 current-context */}
            <h5 className="text-light fw-bold mt-4 mb-3">4.3 View the current context</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl config current-context`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>current-context</code></td>
                    <td className="text-secondary">Prints only the value of <code>current-context:</code> from kubeconfig. Useful as a quick sanity check: &quot;am I talking to the right cluster?&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl config current-context
kind-cka-single`}
            </pre>

            {/* 4.4 use-context */}
            <h5 className="text-light fw-bold mt-4 mb-3">4.4 Switch the active context</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl config use-context kind-cka-multi`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>use-context</code></td>
                    <td className="text-secondary">Updates the <code>current-context:</code> field in <code>~/.kube/config</code> to the given value. All subsequent kubectl commands now target that cluster</td>
                  </tr>
                  <tr>
                    <td><code>kind-cka-multi</code></td>
                    <td className="text-secondary">The exact context name to activate. Must match a name from <code>kubectl config get-contexts</code> exactly (case-sensitive)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl config use-context kind-cka-multi
Switched to context "kind-cka-multi".`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">One-shot context override with --context</h6>
                <p className="mb-0 x-small text-secondary">
                  You can target a specific cluster for a <em>single command</em> without switching your active context permanently:
                  <br />
                  <code className="d-block mt-1">kubectl get nodes --context kind-cka-multi</code>
                  This is useful when you want to quickly inspect another cluster without disrupting your current workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 5: LISTING NODES ─────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-hdd-stack-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">5. Listing Nodes</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Unlike the config commands above, <code>kubectl get nodes</code> makes a <strong>live network call</strong> to the Kubernetes API server
              of your active cluster. The API server responds with the list of nodes registered in that cluster.
            </p>

            {/* 5.1 basic */}
            <h5 className="text-light fw-bold mt-2 mb-3">5.1 Basic node list</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl get nodes`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>kubectl</code></td>
                    <td className="text-secondary">The Kubernetes CLI client. Reads your active context from kubeconfig to know which API server to call</td>
                  </tr>
                  <tr>
                    <td><code>get</code></td>
                    <td className="text-secondary">kubectl verb meaning &quot;list or retrieve&quot;. Works with any Kubernetes resource type (nodes, pods, services, etc.)</td>
                  </tr>
                  <tr>
                    <td><code>nodes</code></td>
                    <td className="text-secondary">The resource type. kubectl calls the Kubernetes API at <code>/api/v1/nodes</code> and returns the list</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl get nodes
NAME                        STATUS   ROLES           AGE   VERSION
cka-single-control-plane    Ready    control-plane   5m    v1.34.0`}
            </pre>
            <div className="mt-2 mb-4">
              <p className="text-secondary x-small mb-1 fw-semibold">Output columns explained:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'35%'}}><code>NAME</code></td>
                    <td className="text-secondary">The node&apos;s hostname inside the cluster. Kind names nodes as <code>&lt;cluster-name&gt;-control-plane</code> or <code>&lt;cluster-name&gt;-worker</code></td>
                  </tr>
                  <tr>
                    <td><code>STATUS</code></td>
                    <td className="text-secondary"><code>Ready</code> = node is healthy and can accept workloads. <code>NotReady</code> = node has a problem (network, disk, etc.)</td>
                  </tr>
                  <tr>
                    <td><code>ROLES</code></td>
                    <td className="text-secondary">Labels applied to the node. <code>control-plane</code> runs the Kubernetes management components. <code>{'<none>'}</code> means it&apos;s a worker</td>
                  </tr>
                  <tr>
                    <td><code>AGE</code></td>
                    <td className="text-secondary">How long ago the node registered with the cluster</td>
                  </tr>
                  <tr>
                    <td><code>VERSION</code></td>
                    <td className="text-secondary">The <code>kubelet</code> version running on this node — directly tied to the <code>kindest/node</code> image tag you used</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5.2 wide */}
            <h5 className="text-light fw-bold mt-4 mb-3">5.2 Wide output — more details</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl get nodes -o wide`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>-o wide</code></td>
                    <td className="text-secondary">Output format flag. <code>wide</code> adds extra columns: INTERNAL-IP, EXTERNAL-IP, OS-IMAGE, KERNEL-VERSION, CONTAINER-RUNTIME. Useful for networking troubleshooting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl get nodes -o wide
NAME                       STATUS   ROLES           AGE   VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION   CONTAINER-RUNTIME
cka-single-control-plane   Ready    control-plane   5m    v1.34.0   172.18.0.2    <none>        Ubuntu 22.04.4 LTS   6.8.0-48-generic   containerd://1.7.13`}
            </pre>

            {/* 5.3 describe */}
            <h5 className="text-light fw-bold mt-4 mb-3">5.3 Full node details</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl describe node cka-single-control-plane`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>describe</code></td>
                    <td className="text-secondary">kubectl verb that fetches the full resource from the API and formats it as a human-readable summary including events, conditions, and resource limits</td>
                  </tr>
                  <tr>
                    <td><code>node</code></td>
                    <td className="text-secondary">Resource type (singular or plural both work: <code>node</code> / <code>nodes</code>)</td>
                  </tr>
                  <tr>
                    <td><code>cka-single-control-plane</code></td>
                    <td className="text-secondary">The specific node name to describe. Get this from <code>kubectl get nodes</code> first</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-secondary small mt-3">
              <code>describe</code> output includes: Labels, Annotations, Taints, Conditions (Ready, MemoryPressure, DiskPressure),
              Capacity (CPU, memory), Allocatable resources, System info, and all Pods currently scheduled on this node.
            </p>
          </div>
        </div>

        {/* ── SECTION 6: CLUSTER INFO ──────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-secondary">
              <i className="bi bi-info-square-fill"></i>
            </div>
            <h2 className="doc-card-heading">6. Cluster Information</h2>
          </div>
          <div className="doc-card-body">

            <h5 className="text-light fw-bold mt-2 mb-3">Cluster endpoint info</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl cluster-info`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Command breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>cluster-info</code></td>
                    <td className="text-secondary">Makes a live call to the active cluster&apos;s API server. Returns the URL of the control plane and CoreDNS addresses. Useful to confirm connectivity is working</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-3">
{`$ kubectl cluster-info
Kubernetes control plane is running at https://127.0.0.1:PORT
CoreDNS is running at https://127.0.0.1:PORT/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Target a specific cluster without switching context</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl cluster-info --context kind-cka-multi`}
            </pre>
            <div className="mt-2 mb-1">
              <p className="text-secondary x-small mb-1 fw-semibold"><i className="bi bi-tag-fill me-1 text-warning"></i>Flag breakdown:</p>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>--context kind-cka-multi</code></td>
                    <td className="text-secondary">Overrides the active context for this single command only. Your <code>current-context</code> in kubeconfig is not changed. Think of it as a temporary impersonation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── SECTION 7: COMMON MISTAKES ───────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-danger mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-bug-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">7. Common Beginner Mistakes</h2>
          </div>
          <div className="doc-card-body">

            <div className="mb-4">
              <h6 className="text-warning fw-bold"><i className="bi bi-x-circle-fill me-2 text-danger"></i>Mistake 1: Running <code>kubectl get clusters</code></h6>
              <pre className="bg-dark text-danger p-3 rounded border border-secondary border-opacity-50 small mt-2">
{`$ kubectl get clusters
error: the server doesn't have a resource type "clusters"`}
              </pre>
              <p className="text-secondary small mt-2 mb-0">
                <strong className="text-light">Why it fails:</strong> <code>clusters</code> is not a Kubernetes API resource. kubectl queries the API server for resource types,
                and the API server has no <code>/clusters</code> endpoint. Use <code>kubectl config get-clusters</code> (reads local file) or <code>kind get clusters</code> instead.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-warning fw-bold"><i className="bi bi-x-circle-fill me-2 text-danger"></i>Mistake 2: Using the wrong name with <code>use-context</code></h6>
              <pre className="bg-dark text-danger p-3 rounded border border-secondary border-opacity-50 small mt-2">
{`$ kubectl config use-context cka-single   # ← missing the 'kind-' prefix
error: no context exists with the name: "cka-single"`}
              </pre>
              <p className="text-secondary small mt-2 mb-0">
                <strong className="text-light">Why it fails:</strong> Kind names the kubeconfig context <code>kind-cka-single</code> (prefixed), but the raw cluster name (what Kind itself knows) is <code>cka-single</code>.
                Always use <code>kubectl config get-contexts</code> to get the exact context name before switching.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-warning fw-bold"><i className="bi bi-x-circle-fill me-2 text-danger"></i>Mistake 3: Forgetting to switch context after creating a new cluster</h6>
              <pre className="bg-dark text-danger p-3 rounded border border-secondary border-opacity-50 small mt-2">
{`# You created cka-multi, but you're still on cka-single:
$ kubectl get nodes
NAME                       STATUS   ROLES           AGE
cka-single-control-plane   Ready    control-plane   1h   # ← wrong cluster!`}
              </pre>
              <p className="text-secondary small mt-2 mb-0">
                <strong className="text-light">Why it happens:</strong> Kind automatically sets the new cluster as the active context — but only when you create it with Kind directly.
                If your context drifted, always verify with <code>kubectl config current-context</code> before running commands.
              </p>
            </div>

            <div className="mb-0">
              <h6 className="text-warning fw-bold"><i className="bi bi-x-circle-fill me-2 text-danger"></i>Mistake 4: Confusing &quot;no clusters&quot; from Kind with &quot;cluster deleted&quot;</h6>
              <pre className="bg-dark text-danger p-3 rounded border border-secondary border-opacity-50 small mt-2">
{`$ kind get clusters
# (no output)
# But the cluster still appears in kubeconfig!`}
              </pre>
              <p className="text-secondary small mt-2 mb-0">
                <strong className="text-light">Why it happens:</strong> If Docker was stopped and restarted, Kind containers may not be running.
                Kind reports nothing because no containers match its filter — but kubeconfig still has the entries.
                Start the Kind cluster again or use <code>kind delete cluster --name &lt;name&gt;</code> to clean up properly.
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 8: CKA EXAM TIPS ─────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-trophy-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">8. CKA Exam Tips</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-warning mb-3">
              <i className="bi bi-trophy-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Always verify your context first</h6>
                <p className="mb-0 x-small text-secondary">
                  In the CKA exam, every question tells you which cluster to work on. The first thing you must do
                  is switch to that cluster&apos;s context. A wrong context = working on the wrong cluster = zero marks for that question.
                  <br/>
                  <code className="d-block mt-1">kubectl config use-context &lt;context-name&gt;</code>
                </p>
              </div>
            </div>

            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-lightning-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Frequently tested context commands</h6>
                <p className="mb-0 x-small text-secondary">
                  The exam environment has multiple clusters pre-configured. These commands will be your most used:
                  <code className="d-block mt-1">kubectl config get-contexts</code>
                  <code className="d-block">kubectl config use-context &lt;name&gt;</code>
                  <code className="d-block">kubectl config current-context</code>
                </p>
              </div>
            </div>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-card-checklist"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Use <code>kubectl get nodes</code> to confirm context</h6>
                <p className="mb-0 x-small text-secondary">
                  After switching context, immediately run <code>kubectl get nodes</code> and check the node names.
                  The node names include the cluster name (e.g., <code>cka-cluster2-control-plane</code>), so you can confirm you&apos;re
                  in the right place before starting the actual task.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 9: REMEMBER THIS ─────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-bookmark-star-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">9. Remember This</h2>
          </div>
          <div className="doc-card-body">
            <div className="table-responsive">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Goal</th>
                    <th>Command</th>
                    <th>Talks to</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-light">List Kind clusters (raw names)</td>
                    <td><code>kind get clusters</code></td>
                    <td>Docker daemon</td>
                  </tr>
                  <tr>
                    <td className="text-light">List clusters in kubeconfig</td>
                    <td><code>kubectl config get-clusters</code></td>
                    <td><code>~/.kube/config</code> file (no network)</td>
                  </tr>
                  <tr>
                    <td className="text-light">List all contexts</td>
                    <td><code>kubectl config get-contexts</code></td>
                    <td><code>~/.kube/config</code> file (no network)</td>
                  </tr>
                  <tr>
                    <td className="text-light">Check active context</td>
                    <td><code>kubectl config current-context</code></td>
                    <td><code>~/.kube/config</code> file (no network)</td>
                  </tr>
                  <tr>
                    <td className="text-light">Switch active context</td>
                    <td><code>kubectl config use-context &lt;name&gt;</code></td>
                    <td><code>~/.kube/config</code> file (no network)</td>
                  </tr>
                  <tr>
                    <td className="text-light">List nodes in active cluster</td>
                    <td><code>kubectl get nodes</code></td>
                    <td>Live Kubernetes API server</td>
                  </tr>
                  <tr>
                    <td className="text-light">List nodes with extra details</td>
                    <td><code>kubectl get nodes -o wide</code></td>
                    <td>Live Kubernetes API server</td>
                  </tr>
                  <tr>
                    <td className="text-light">Full details for one node</td>
                    <td><code>kubectl describe node &lt;name&gt;</code></td>
                    <td>Live Kubernetes API server</td>
                  </tr>
                  <tr>
                    <td className="text-light">Confirm cluster connectivity</td>
                    <td><code>kubectl cluster-info</code></td>
                    <td>Live Kubernetes API server</td>
                  </tr>
                  <tr>
                    <td className="text-light">One-shot context override</td>
                    <td><code>kubectl get nodes --context &lt;name&gt;</code></td>
                    <td>Live API server of that context</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">The mental model in one sentence</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Kind</strong> manages Docker containers → <strong>kubeconfig</strong> records how to reach them →
                  <strong>kubectl</strong> reads kubeconfig to talk to one cluster at a time →
                  <strong>the Kubernetes API server</strong> inside that cluster knows about its own nodes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 10: PRACTICE EXERCISE ───────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-clipboard2-check-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">10. Quick Practice Exercise</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Follow these steps in order. After each command, read the output carefully and match it to what you learned above.
            </p>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">1</span>Ask Kind what clusters exist</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kind get clusters`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Note the raw name — no <code>kind-</code> prefix here</p>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">2</span>Ask kubectl what clusters exist</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl config get-clusters`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Same cluster, but prefixed with <code>kind-</code>. This is what&apos;s in <code>~/.kube/config</code></p>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">3</span>List all contexts and spot the active one</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl config get-contexts`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Find the row with <code>*</code> in the CURRENT column</p>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">4</span>Confirm the active context</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl config current-context`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Should match the <code>*</code> row from step 3</p>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">5</span>List the nodes</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl get nodes`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Node name should contain your cluster name. STATUS should be <code>Ready</code></p>
            </div>

            <div className="mb-3">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">6</span>Get extended node info</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl get nodes -o wide`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ Note the INTERNAL-IP — this is the Docker network IP, not your host IP</p>
            </div>

            <div className="mb-0">
              <h6 className="text-light fw-bold"><span className="badge bg-warning text-dark me-2">7</span>Confirm cluster connectivity</h6>
              <pre className="bg-dark text-success p-2 rounded border border-secondary border-opacity-50 small mt-2 mb-1">
{`kubectl cluster-info`}
              </pre>
              <p className="text-secondary x-small mb-0">✦ The <code>https://127.0.0.1:PORT</code> address is a local port Kind forwarded from the control-plane Docker container to your host</p>
            </div>
          </div>
        </div>

        {/* OFFICIAL REFS */}
        <div className="doc-alert doc-alert-info mb-0">
          <i className="bi bi-link-45deg"></i>
          <div>
            <h6 className="fw-bold mb-1 text-info">Official References</h6>
            <p className="mb-0 x-small text-secondary">
              <a href="https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                Kubernetes — Organizing Cluster Access Using kubeconfig
              </a>
              {' · '}
              <a href="https://kind.sigs.k8s.io/docs/user/quick-start/#interacting-with-your-cluster" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                Kind — Interacting With Your Cluster
              </a>
              {' · '}
              <a href="https://kubernetes.io/docs/reference/kubectl/cheatsheet/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">
                kubectl Cheat Sheet
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
