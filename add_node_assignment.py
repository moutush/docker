import re

with open("src/app/cka/core-concepts/pods/page.tsx", "r") as f:
    content = f.read()

# Rename existing Section 9 and 10 to 10 and 11
content = content.replace("SECTION 9: LABELS", "SECTION 10: LABELS")
content = content.replace("9. Why Labels Matter", "10. Why Labels Matter")
content = content.replace("SECTION 10: CKA SURVIVAL BOX", "SECTION 11: CKA SURVIVAL BOX")
content = content.replace("10. CKA Survival Box", "11. CKA Survival Box")

# Create the new section 9 content
new_section = """        {/* ── SECTION 9: NODE ASSIGNMENT ───────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-hdd-network-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">9. Node Assignment — Where Does the Pod Go?</h2>
          </div>
          <div className="doc-card-body">
            <h5 className="text-light fw-bold mb-3">How Kubernetes chooses automatically</h5>
            <p className="text-secondary mb-3">
              When you create a Pod without specifying a node, the <strong>kube-scheduler</strong> automatically decides where it should run. It evaluates all available nodes, filters out those that cannot host the Pod (due to lack of CPU/memory or specific "taints"), and schedules the Pod on the best match.
            </p>
            <p className="text-secondary mb-3">
              By default, control-plane nodes have a <code>NoSchedule</code> taint, meaning regular Pods are restricted to worker nodes.
            </p>
            
            <h5 className="text-light fw-bold mb-3">How to see which Node your Pod is on</h5>
            <p className="text-secondary mb-3">
              As covered earlier, append the <code>-o wide</code> flag to your get command. The <strong>NODE</strong> column reveals the assignment.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`kubectl get pods -o wide`}
            </pre>

            <h5 className="text-light fw-bold mb-3">How to override the Scheduler (Manual Scheduling)</h5>
            <p className="text-secondary mb-3">
              Sometimes you need a Pod on a specific node. <code>kubectl run</code> doesn't have a simple flag for this, so you must use the dry-run workflow to generate YAML, then add either <code>nodeName</code> or <code>nodeSelector</code> to the <code>spec</code>.
            </p>
            
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <p className="text-secondary x-small fw-semibold mb-1">Method 1: nodeName (Bypasses scheduler completely)</p>
                <pre className="bg-dark text-success p-3 rounded border border-success border-opacity-25 small mb-0">
{`# 1. Generate YAML
kubectl run pin-pod --image=nginx --dry-run=client -o yaml > pin.yaml

# 2. Edit pin.yaml
vi pin.yaml
# Add nodeName under spec:
spec:
  nodeName: cka-single
  containers:
  - image: nginx`}
                </pre>
              </div>
              <div className="col-md-6">
                <p className="text-secondary x-small fw-semibold mb-1">Method 2: nodeSelector (Uses labels)</p>
                <pre className="bg-dark text-success p-3 rounded border border-success border-opacity-25 small mb-0">
{`# 1. Label the node first
kubectl label nodes cka-single disktype=ssd

# 2. Generate and edit YAML
spec:
  nodeSelector:
    disktype: ssd
  containers:
  - image: nginx`}
                </pre>
              </div>
            </div>

            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong>Exam Tip:</strong> If the question asks you to schedule a Pod on a specific node, <code>nodeName</code> is the fastest, most reliable way to guarantee it runs exactly there.
                </p>
              </div>
            </div>
          </div>
        </div>

"""

# Insert right before SECTION 10: LABELS
insert_idx = content.find("{/* ── SECTION 10: LABELS")
if insert_idx != -1:
    content = content[:insert_idx] + new_section + content[insert_idx:]
    with open("src/app/cka/core-concepts/pods/page.tsx", "w") as f:
        f.write(content)
    print("Pods page updated successfully.")
else:
    print("Could not find insertion point in pods/page.tsx")
