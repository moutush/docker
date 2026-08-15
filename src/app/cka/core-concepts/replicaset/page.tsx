import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ReplicaSet - CKA Study Guide",
  description: "Understand ReplicaSets in Kubernetes: what they are, why they exist, how to write the YAML, and how to scale replicas — explained for CKA candidates.",
};

export default function ReplicaSetPage() {
  return (
    <div className="container-fluid py-5 px-md-5">

      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Core Concepts</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>ReplicaSet</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The controller that keeps your Pods alive and running at the count you declared. Never less, never more.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* ── SECTION 1: WHAT IS A REPLICASET ─────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-diagram-2-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. What is a ReplicaSet?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A <strong>ReplicaSet</strong> is a Kubernetes controller that ensures a specified number of identical Pod copies — called <em>replicas</em> — are always running in the cluster at any given time.
            </p>
            <p className="text-secondary mb-3">
              Think of it as a supervisor. You tell it: <em>&ldquo;I want 3 copies of this Pod running, always.&rdquo;</em> The ReplicaSet then continuously watches the cluster. If a Pod crashes, it creates a replacement. If too many are running, it deletes the extra ones.
            </p>

            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`You declare:  "I want 3 replicas of nginx"
                        │
              ReplicaSet keeps watching
                        │
        Pod-1 crashes ──┤──▶ ReplicaSet creates Pod-4 immediately
        Pod-2 running   │
        Pod-3 running   │
                        │
        State is always reconciled back to 3`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Why not just create 3 Pods manually?</h5>
            <p className="text-secondary mb-3">
              You could run <code>kubectl apply</code> three times with the same Pod YAML. But if one of those Pods dies — say the node it was on goes offline — it is gone permanently. Nobody brings it back. You would have to notice it yourself and manually re-create it.
            </p>
            <p className="text-secondary mb-3">
              A ReplicaSet automates this entirely. It is the difference between <em>hoping your Pods stay up</em> and <em>guaranteeing they do</em>.
            </p>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>In production you will almost never create a ReplicaSet directly.</strong> You will use a <strong>Deployment</strong> instead — which manages a ReplicaSet under the hood and adds rolling updates and rollback on top. But you must understand ReplicaSets first, because the CKA exam tests them independently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: HOW IT WORKS ──────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-gear-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">2. How a ReplicaSet Knows Which Pods to Own</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This is the most important concept to get right: a ReplicaSet does <strong>not</strong> track Pods by name or by who created them. It finds its Pods purely by <strong>label selectors</strong>.
            </p>
            <p className="text-secondary mb-3">
              When you create a ReplicaSet, you define a <code>selector</code>. The ReplicaSet constantly scans all Pods in the namespace and counts how many match that selector. If the count is below the desired replicas, it creates more. If it is above, it deletes some.
            </p>

            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`ReplicaSet selector: { app: nginx }

In the cluster right now:
  Pod-A  labels: { app: nginx }  ← owned by this RS
  Pod-B  labels: { app: nginx }  ← owned by this RS
  Pod-C  labels: { app: redis }  ← NOT owned — different label
  Pod-D  labels: { app: nginx }  ← owned by this RS

Count = 3 [OK] No action needed.`}
            </pre>

            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">The selector must match the pod template labels — exactly.</h6>
                <p className="mb-0 x-small text-secondary">
                  If your <code>selector</code> and <code>template.metadata.labels</code> do not match, Kubernetes will reject the ReplicaSet with a validation error. This is the #1 mistake beginners make when writing ReplicaSet YAML.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: YAML ANATOMY ──────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-code-square"></i>
            </div>
            <h2 className="doc-card-heading text-warning">3. ReplicaSet YAML — Every Field Explained</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A ReplicaSet YAML has two main parts: the <strong>ReplicaSet&apos;s own metadata</strong> and a <strong>Pod template</strong> (an embedded Pod spec that the RS uses as a blueprint when creating new Pods).
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`apiVersion: apps/v1       # ① ReplicaSets belong to the "apps" API group
kind: ReplicaSet          # ② The object type

metadata:                 # ③ The ReplicaSet's own name and labels
  name: nginx-rs
  labels:
    app: nginx

spec:
  replicas: 3             # ④ How many Pod copies you want running at all times

  selector:               # ⑤ How the RS finds Pods it owns — must match ⑦
    matchLabels:
      app: nginx

  template:               # ⑥ The Pod blueprint — used when creating new Pods
    metadata:
      labels:
        app: nginx        # ⑦ MUST match the selector above (⑤)

    spec:                 # ⑧ The actual Pod spec — same as writing a Pod YAML
      containers:
        - name: nginx
          image: nginx:1.25
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "100m"
            limits:
              memory: "128Mi"
              cpu: "200m"`}
            </pre>

            <div className="mt-2 mb-0">
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>#</th>
                    <th>Field</th>
                    <th>Memory trick</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="text-warning">①</td><td><code>apiVersion: apps/v1</code></td><td className="text-secondary">Pods use <code>v1</code>. ReplicaSets, Deployments, DaemonSets all use <code>apps/v1</code></td></tr>
                  <tr><td className="text-warning">④</td><td><code>replicas</code></td><td className="text-secondary">The desired count. Omit it and it defaults to 1</td></tr>
                  <tr><td className="text-warning">⑤</td><td><code>selector.matchLabels</code></td><td className="text-secondary">The filter the RS uses to count its Pods. Must equal the template labels</td></tr>
                  <tr><td className="text-warning">⑥</td><td><code>template</code></td><td className="text-secondary">An embedded Pod spec. No <code>apiVersion</code> or <code>kind</code> here — those are implied</td></tr>
                  <tr><td className="text-warning">⑦</td><td><code>template.metadata.labels</code></td><td className="text-secondary">Must match ⑤ exactly — this is how newly-created Pods get &ldquo;adopted&rdquo; by the RS</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: CREATE AND VERIFY ─────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-terminal-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">4. Hands-On — Create, Verify, and Watch Self-Healing</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Follow these steps in order. You will create a ReplicaSet, watch it spin up Pods, delete one Pod manually, and see the ReplicaSet immediately replace it.
            </p>

            {/* Step 1 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 1</span>Save the YAML and apply it
              </h6>
              <p className="text-secondary small mb-2">Save the YAML from Section 3 as <code>nginx-rs.yaml</code> and apply:</p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl apply -f nginx-rs.yaml
# Output: replicaset.apps/nginx-rs created`}
              </pre>
            </div>

            {/* Step 2 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 2</span>Verify the ReplicaSet
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
                {`kubectl get replicaset
# NAME       DESIRED   CURRENT   READY   AGE
# nginx-rs   3         3         3       15s`}
              </pre>
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <tbody>
                  <tr><td style={{ width: '25%' }}><code>DESIRED</code></td><td className="text-secondary">What you declared in <code>replicas:</code></td></tr>
                  <tr><td><code>CURRENT</code></td><td className="text-secondary">How many Pods actually exist with the matching label</td></tr>
                  <tr><td><code>READY</code></td><td className="text-secondary">How many of those Pods have passed their readiness checks</td></tr>
                </tbody>
              </table>
            </div>

            {/* Step 3 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 3</span>List the Pods it created
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
                {`kubectl get pods
# NAME             READY   STATUS    RESTARTS   AGE
# nginx-rs-4xk2p   1/1     Running   0          20s
# nginx-rs-7mbn9   1/1     Running   0          20s
# nginx-rs-q8r3t   1/1     Running   0          20s`}
              </pre>
              <p className="text-secondary x-small mb-0">
                Notice the Pod names: <code>nginx-rs-&lt;random-suffix&gt;</code>. The RS generates the names automatically — you never need to name individual Pods when using a ReplicaSet.
              </p>
            </div>

            {/* Step 4 — self healing */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-danger text-light me-2">Step 4</span>Kill a Pod — watch self-healing in action
              </h6>
              <p className="text-secondary small mb-2">
                Delete one Pod by name. The ReplicaSet will notice the count dropped to 2 and immediately create a replacement:
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
                {`kubectl delete pod nginx-rs-4xk2p

# Now immediately check:
kubectl get pods
# NAME             READY   STATUS              RESTARTS   AGE
# nginx-rs-7mbn9   1/1     Running             0          45s
# nginx-rs-q8r3t   1/1     Running             0          45s
# nginx-rs-wt5p2   0/1     ContainerCreating   0          2s   ← brand new!`}
              </pre>
              <p className="text-secondary x-small mb-0">
                The new Pod (<code>nginx-rs-wt5p2</code>) was created <strong>automatically</strong> within seconds. This is self-healing. This is why you use a ReplicaSet instead of plain Pods.
              </p>
            </div>

            {/* Step 5 */}
            <div className="mb-0">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-info text-dark me-2">Step 5</span>Describe the ReplicaSet for full details
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl describe replicaset nginx-rs
# Shows: selector, replicas status, pod template, and events
# The Events section shows when the RS created or deleted Pods and why`}
              </pre>
            </div>
          </div>
        </div>

        {/* ── SECTION 5: SCALING ───────────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-arrows-expand"></i>
            </div>
            <h2 className="doc-card-heading text-primary">5. Scaling — Increasing and Decreasing Replicas</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              You have three ways to change the replica count. Know all three — the CKA exam uses all of them.
            </p>

            <h5 className="text-light fw-bold mb-3">Method 1: <code>kubectl scale</code> (fastest, imperative)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
              {`# Scale up to 5 replicas:
kubectl scale replicaset nginx-rs --replicas=5

# Scale down to 2 replicas:
kubectl scale replicaset nginx-rs --replicas=2

# Verify:
kubectl get replicaset nginx-rs
# NAME       DESIRED   CURRENT   READY   AGE
# nginx-rs   5         5         5       3m`}
            </pre>
            <p className="text-secondary x-small mb-4">
              Fast, no file editing required. But the change is <strong>not persisted</strong> in your YAML — next time you apply the file, it will revert to whatever <code>replicas:</code> says in the file.
            </p>

            <h5 className="text-light fw-bold mb-3">Method 2: Edit the YAML file and re-apply (declarative)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
              {`# Open the file and change the replicas field:
vi nginx-rs.yaml
# Change:  replicas: 3
# To:      replicas: 5

kubectl apply -f nginx-rs.yaml
# Output: replicaset.apps/nginx-rs configured`}
            </pre>
            <p className="text-secondary x-small mb-4">
              This is the <strong>production-grade approach</strong> — your YAML file stays as the source of truth. Always prefer this for real work.
            </p>

            <h5 className="text-light fw-bold mb-3">Method 3: <code>kubectl edit</code> (live edit)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
              {`kubectl edit replicaset nginx-rs
# Opens the live object in vi.
# Find the line:  replicas: 3
# Change it to:   replicas: 5
# Save and exit:  :wq`}
            </pre>
            <p className="text-secondary x-small mb-4">
              Changes take effect immediately. Useful in the CKA exam when you don&apos;t have a local file — but this modifies the live cluster state, not your local file.
            </p>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">CKA Exam tip: Use <code>kubectl scale</code> for speed</h6>
                <p className="mb-0 x-small text-secondary">
                  In the timed exam, <code>kubectl scale replicaset &lt;name&gt; --replicas=&lt;N&gt;</code> is the fastest way to change replica count. You don&apos;t need to open any file. The change is immediate and the question is answered.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 6: DELETE ────────────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-danger mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-trash3-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">6. Deleting a ReplicaSet</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              When you delete a ReplicaSet, Kubernetes <strong>also deletes all the Pods it owns</strong> by default. This is called a <em>cascading delete</em>.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-3">
              {`# Delete the RS and all its Pods:
kubectl delete replicaset nginx-rs

# Or use the YAML file:
kubectl delete -f nginx-rs.yaml

# Verify everything is gone:
kubectl get pods
# No resources found in default namespace.`}
            </pre>

            <p className="text-secondary mb-3">
              If you want to delete the ReplicaSet <em>without</em> deleting the Pods (they become &ldquo;orphaned&rdquo; — no longer managed), use <code>--cascade=orphan</code>:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
              {`kubectl delete replicaset nginx-rs --cascade=orphan
# The RS is deleted. The Pods keep running but are no longer managed by anyone.`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 7: CKA SURVIVAL BOX ─────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-danger mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-fill-check"></i>
            </div>
            <h2 className="doc-card-heading text-danger">7. CKA Survival Box — ReplicaSets</h2>
          </div>
          <div className="doc-card-body">

            <h5 className="text-light fw-bold mb-2">Commands to memorize</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`# Create:
kubectl apply -f nginx-rs.yaml

# List:
kubectl get replicaset
kubectl get rs                  # 'rs' is the short alias

# Inspect:
kubectl describe rs nginx-rs

# Scale (exam speed trick):
kubectl scale rs nginx-rs --replicas=5

# Delete:
kubectl delete rs nginx-rs`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Things the exam loves to test</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Topic</th>
                    <th>What to know</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">selector mismatch</strong></td>
                    <td>If <code>selector</code> and <code>template.metadata.labels</code> don&apos;t match, the RS is rejected. The field values must be identical.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">apiVersion</strong></td>
                    <td>ReplicaSet is <code>apps/v1</code>, not <code>v1</code>. Writing <code>v1</code> is an instant fail.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">self-healing</strong></td>
                    <td>If a Pod managed by a RS is manually deleted, the RS creates a replacement automatically.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">orphaned Pods</strong></td>
                    <td>If you manually create a Pod with a label that matches an existing RS selector, the RS will <em>adopt</em> it and may immediately delete it if already at desired count.</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">scaling</strong></td>
                    <td><code>kubectl scale rs &lt;name&gt; --replicas=N</code> is the fastest way to change count in the exam.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── SECTION 8: DRAWBACKS & WHY DEPLOYMENTS ARE NECESSARY ─────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">8. Drawbacks of ReplicaSets & Why Deployments are Necessary</h2>
          </div>
          <div className="doc-card-body">
            <h5 className="text-light fw-bold mb-3">1. No Imperative Dry-Run Creation Support</h5>
            <p className="text-secondary mb-3">
              Unlike Pods or Deployments, <code>kubectl</code> does <strong>not</strong> support imperative creation for ReplicaSets.
            </p>
            <pre className="bg-dark text-danger p-3 rounded border border-secondary border-opacity-50 small mb-3">
              {`THIS DOES NOT WORK:
kubectl create replicaset my-rs --image=nginx --dry-run=client -o yaml
# Error: unknown command "replicaset" for "kubectl create"`}
            </pre>
            <div className="doc-alert doc-alert-warning mb-4">
              <i className="bi bi-lightning-charge-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>CKA Speed Trick:</strong> Generate a Deployment manifest with <code>--dry-run=client -o yaml</code> and change <code>kind: Deployment</code> to <code>kind: ReplicaSet</code> in the output YAML.
                </p>
              </div>
            </div>

            <h5 className="text-light fw-bold mb-3">2. Major Production Drawbacks of Standalone ReplicaSets</h5>
            <p className="text-secondary mb-3">
              While ReplicaSets keep Pods alive and scale them easily, they lack essential features required for real-world application lifecycle management:
            </p>
            <ul className="text-secondary mb-4">
              <li className="mb-2">
                <strong className="text-light">No Seamless Application Updates (Rolling Updates):</strong> If you edit the container image in a ReplicaSet manifest and run <code>kubectl apply</code>, existing Pods are <strong>not updated</strong>. They keep running the old image until they are manually deleted and recreated by the ReplicaSet.
              </li>
              <li className="mb-2">
                <strong className="text-light">No Rollback Capabilities:</strong> If you deploy a bad version, ReplicaSets have no built-in revision history or rollback mechanism.
              </li>
              <li className="mb-2">
                <strong className="text-light">No Declarative Update Strategies:</strong> You cannot configure pause/resume functionality or maxUnavailable / maxSurge thresholds during updates.
              </li>
            </ul>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-arrow-right-circle-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>Why Deployments are Necessary:</strong> A <strong>Deployment</strong> is a higher-level abstraction that automatically manages ReplicaSets under the hood. When you update a Deployment, it creates a new ReplicaSet and performs a zero-downtime rolling update (or rollback if needed). That is why in production, Deployments are almost always used instead of standalone ReplicaSets.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
