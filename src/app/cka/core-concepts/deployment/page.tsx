import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Deployment - CKA Study Guide",
  description: "Understand Deployments in Kubernetes: what they are, why they are needed over ReplicaSets, scaling, rolling updates, rollbacks, and step-by-step hands-on tasks for CKA.",
};

export default function DeploymentPage() {
  return (
    <div className="container-fluid py-5 px-md-5">

      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Workloads</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Deployment</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The ultimate workload controller for managing application lifecycles, zero-downtime rolling updates, scaling, and rollbacks.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* ── SECTION 1: WHAT IS A DEPLOYMENT ─────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-layers-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. What is a Deployment?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A <strong>Deployment</strong> is a high-level Kubernetes API object that declaratively manages a set of identical Pods.
            </p>
            <p className="text-secondary mb-3">
              Rather than managing Pods directly, a Deployment creates and manages a <strong>ReplicaSet</strong> underneath. The ReplicaSet then manages the actual Pods.
            </p>

            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`Deployment (Manages updates & rollbacks)
      │
      └──▶ ReplicaSet (Manages Pod counts & self-healing)
                │
                ├──▶ Pod-1
                ├──▶ Pod-2
                └──▶ Pod-3`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 2: WHY IS A DEPLOYMENT NEEDED? ─────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-question-square-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">2. Why is a Deployment Needed? (ReplicaSet vs Deployment)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              While a ReplicaSet ensures that a specified number of Pods are running, it cannot update those Pods without downtime or manual intervention.
            </p>

            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Feature</th>
                    <th>ReplicaSet</th>
                    <th>Deployment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">Pod Self-Healing & Scaling</strong></td>
                    <td>Yes</td>
                    <td>Yes (via underlying ReplicaSet)</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Imperative Dry-Run Support</strong></td>
                    <td>No (kubectl create rs does not exist)</td>
                    <td>Yes (kubectl create deploy ... --dry-run=client -o yaml)</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Zero-Downtime Rolling Updates</strong></td>
                    <td>No (Must delete Pods manually)</td>
                    <td>Yes (Automatic progressive replacement)</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Revision History & Rollbacks</strong></td>
                    <td>No</td>
                    <td>Yes (kubectl rollout undo)</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Pause & Resume Rollouts</strong></td>
                    <td>No</td>
                    <td>Yes (kubectl rollout pause/resume)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>Key Takeaway:</strong> In production and in CKA exam scenarios, Deployments are preferred for stateless applications because they allow seamless image updates and instant rollbacks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: SCALING, UPDATES, AND ROLLBACKS EXPLAINED ─────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-sliders"></i>
            </div>
            <h2 className="doc-card-heading text-success">3. Scaling, Rolling Updates, and Rollbacks</h2>
          </div>
          <div className="doc-card-body">
            <h5 className="text-light fw-bold mb-2">1. Scaling</h5>
            <p className="text-secondary mb-3">
              Scaling changes the number of replicas dynamically without interrupting traffic.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`kubectl scale deployment nginx --replicas=5`}
            </pre>

            <h5 className="text-light fw-bold mb-2">2. Rolling Updates (Upgrades)</h5>
            <p className="text-secondary mb-3">
              When you update the pod template (e.g., container image), the Deployment creates a new ReplicaSet and scales it up while scaling down the old ReplicaSet gradually.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
              {`kubectl set image deployment/nginx nginx=nginx:1.23.4`}
            </pre>

            <h5 className="text-light fw-bold mb-2">3. Rollbacks</h5>
            <p className="text-secondary mb-3">
              If an update causes issues or crashes, Kubernetes keeps track of previous revisions so you can instantly revert to a safe revision.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
              {`kubectl rollout undo deployment/nginx --to-revision=1`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 4: STEP-BY-STEP HANDS-ON PRACTICE TASKS ─────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-terminal-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">4. Complete Hands-On Practice Tasks (Tasks 1 to 9)</h2>
          </div>
          <div className="doc-card-body">

            {/* Task 1 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 1: Create a Deployment named <code>nginx</code> with 3 replicas
              </h5>
              <p className="text-secondary small mb-2">
                Requirements: Image <code>nginx:1.23.0</code>, Container name <code>nginx</code>, Deployment label <code>tier=backend</code>, Pod template label <code>app=v1</code>.
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
                {`# Step A: Generate dry-run YAML
kubectl create deployment nginx --image=nginx:1.23.0 --replicas=3 --dry-run=client -o yaml > deploy.yaml`}
              </pre>
              <p className="text-secondary small mb-2">
                Edit <code>deploy.yaml</code> to set Deployment labels (<code>tier=backend</code>) and Pod template labels (<code>app=v1</code>):
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
                {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    tier: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: v1
  template:
    metadata:
      labels:
        app: v1
    spec:
      containers:
      - name: nginx
        image: nginx:1.23.0`}
              </pre>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`# Step B: Apply the manifest
kubectl apply -f deploy.yaml`}
              </pre>
            </div>

            {/* Task 2 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 2: List the Deployment & ensure correct replicas running
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl get deployment nginx
# NAME    READY   UP-TO-DATE   AVAILABLE   AGE
# nginx   3/3     3            3           20s

kubectl get pods -l app=v1`}
              </pre>
            </div>

            {/* Task 3 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 3: Update the image to <code>nginx:1.23.4</code> (Upgrade)
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl set image deployment/nginx nginx=nginx:1.23.4`}
              </pre>
            </div>

            {/* Task 4 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 4: Verify that the change has been rolled out to all replicas
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl rollout status deployment/nginx
# Output: deployment "nginx" successfully rolled out

kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'
# Output: nginx:1.23.4 nginx:1.23.4 nginx:1.23.4`}
              </pre>
            </div>

            {/* Task 5 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 5: Assign the change cause "Pick up patch version" to the revision
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl annotate deployment/nginx kubernetes.io/change-cause="Pick up patch version" --overwrite`}
              </pre>
            </div>

            {/* Task 6 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 6: Scale the Deployment to 5 replicas
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl scale deployment nginx --replicas=5

# Verify:
kubectl get deployment nginx`}
              </pre>
            </div>

            {/* Task 7 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 7: Have a look at the Deployment rollout history
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl rollout history deployment/nginx

# View details of a specific revision:
kubectl rollout history deployment/nginx --revision=2`}
              </pre>
            </div>

            {/* Task 8 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 8: Revert the Deployment to revision 1
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl rollout undo deployment/nginx --to-revision=1`}
              </pre>
            </div>

            {/* Task 9 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 9: Ensure that the Pods use the image <code>nginx:1.23.0</code>
              </h5>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'
# Output: nginx:1.23.0 nginx:1.23.0 nginx:1.23.0 nginx:1.23.0 nginx:1.23.0

kubectl describe deployment nginx | grep -i image`}
              </pre>
            </div>

            {/* Task 10 */}
            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
              <h5 className="text-light fw-bold mb-2">
                Task 10: Troubleshooting Issue 1 — Invalid <code>apiVersion</code>
              </h5>
              <p className="text-secondary small mb-2">
                <strong>Issue:</strong> The manifest uses <code>apiVersion: v1</code>, which causes an error because Deployments belong to <code>apps/v1</code>.
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`# Fixed Manifest:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    env: demo
spec:
  replicas: 3
  selector:
    matchLabels:
      env: demo
  template:
    metadata:
      labels:
        env: demo
      name: nginx
    spec:
      containers:
      - image: nginx
        name: nginx
        ports:
        - containerPort: 80`}
              </pre>
            </div>

            {/* Task 11 */}
            <div>
              <h5 className="text-light fw-bold mb-2">
                Task 11: Troubleshooting Issue 2 — Selector Mismatch &amp; <code>apiVersion</code>
              </h5>
              <p className="text-secondary small mb-2">
                <strong>Issue:</strong> 1) <code>apiVersion: v1</code> is invalid for Deployment. 2) Selector mismatch: <code>matchLabels</code> specifies <code>env: dev</code> while pod template labels specify <code>env: demo</code>.
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
                {`# Fixed Manifest:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    env: demo
spec:
  replicas: 3
  selector:
    matchLabels:
      env: demo
  template:
    metadata:
      labels:
        env: demo
      name: nginx
    spec:
      containers:
      - image: nginx
        name: nginx
        ports:
        - containerPort: 80`}
              </pre>
            </div>

          </div>
        </div>

        {/* ── SECTION 5: IS UPGRADE NEEDED HERE? ─────────────────────────── */}
        <div className="doc-section-card shadow-lg border-danger mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <h2 className="doc-card-heading text-danger">5. Is Upgrade Needed Here? (Explaining Task 3 & Updates)</h2>
          </div>
          <div className="doc-card-body">
            <h5 className="text-light fw-bold mb-2">Yes, Upgrade is Step 3 of the Workflow</h5>
            <p className="text-secondary mb-3">
              In Kubernetes Deployments, an <strong>upgrade</strong> refers to updating the pod specification (such as container image version from <code>nginx:1.23.0</code> to <code>nginx:1.23.4</code>).
            </p>
            <p className="text-secondary mb-3">
              When an upgrade is triggered:
            </p>
            <ul className="text-secondary mb-4">
              <li className="mb-2">A new ReplicaSet is generated with the new image specification.</li>
              <li className="mb-2">Kubernetes performs a rolling update, incrementally creating Pods with the new version while terminating old Pods.</li>
              <li className="mb-2">If the upgrade fails or needs to be reverted, `kubectl rollout undo` allows reverting back to the original revision.</li>
            </ul>
            <div className="doc-alert doc-alert-success mb-0">
              <i className="bi bi-check-circle-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>Summary:</strong> Step 3 (updating image to <code>nginx:1.23.4</code>) represents the upgrade phase, while Step 8 (rolling back to revision 1) demonstrates how to safely undo an upgrade.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
