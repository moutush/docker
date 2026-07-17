import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pods - CKA Study Guide",
  description: "Hands-on guide to Kubernetes Pods: what they are, how to create, debug, and manage them — with every step explained for CKA candidates.",
};

export default function PodsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">

      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Core Concepts</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Pods</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The smallest deployable unit in Kubernetes. If you understand Pods, you understand Kubernetes.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* ── SECTION 1: WHAT IS A POD ────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-box-seam-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. What is a Pod?</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              You already know Docker. You know that a container is a running process isolated from the rest of the system.
              Now here&apos;s the question every Docker engineer asks when learning Kubernetes:
            </p>
            <blockquote className="border-start border-3 border-warning ps-3 mb-4">
              <p className="text-light fw-semibold mb-0">&ldquo;If I already understand containers, why does Kubernetes need this extra &ldquo;Pod&rdquo; thing? Why not just run containers directly?&rdquo;</p>
            </blockquote>

            <h5 className="text-light fw-bold mb-3">Why Kubernetes does not manage containers directly</h5>
            <p className="text-secondary mb-3">
              Kubernetes is designed to work with <strong>any</strong> container runtime — Docker, containerd, CRI-O — not just Docker.
              Each of these has a different API. If Kubernetes talked to containers directly, it would need to speak every runtime&apos;s language.
            </p>
            <p className="text-secondary mb-3">
              Instead, Kubernetes introduced a standard wrapper: the <strong>Pod</strong>. Kubernetes only ever creates, schedules, and manages Pods.
              The Pod then tells the container runtime (via the CRI standard) to start the actual containers inside it.
            </p>
            <p className="text-secondary mb-3">
              There&apos;s a second reason too. Some workloads need two containers that must share the same network and storage —
              for example, a web app and a log shipper that reads the app&apos;s log files.
              A Pod gives them a shared environment to live in together.
            </p>

            <h5 className="text-light fw-bold mb-3">So what is a Pod?</h5>
            <p className="text-secondary mb-3">
              A Pod is a thin wrapper around one or more containers. Think of it as a <strong>peapod</strong> — one shell that holds one or more peas (containers).
            </p>
            <p className="text-secondary mb-3">
              Every Pod gets <strong>one IP address</strong>. All containers inside that Pod share that same IP and can talk to each other on <code>localhost</code>.
              They also share any storage volumes defined on the Pod.
            </p>

            <h5 className="text-light fw-bold mb-3">Why Pods are the smallest deployable unit</h5>
            <p className="text-secondary mb-3">
              The Kubernetes Scheduler — the component that decides which machine runs what — only knows about Pods.
              It cannot place an individual container on a node. It places the whole Pod.
              This makes the Pod the atomic, indivisible unit of deployment in Kubernetes.
              You cannot deploy half a Pod. You cannot split a Pod&apos;s containers across two nodes.
            </p>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-lightbulb-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  In production you&apos;ll almost always have <strong>one container per Pod</strong>. The multi-container case is the exception, not the rule.
                  You only group containers in the same Pod when they <em>must</em> scale together and share data or networking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: POD ARCHITECTURE ──────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-diagram-3-fill"></i>
            </div>
            <h2 className="doc-card-heading text-info">2. The Architecture of a Pod</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              A Pod sits inside a Node, which sits inside a Cluster. Every layer has one job:
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`Cluster
  └── Node  (a machine — physical or VM)
        └── Pod  (one IP, one lifecycle unit)
              └── pause container  (holds the network namespace)
              └── your container   (your app runs here)
              └── sidecar (optional — log shipper, proxy, etc.)`}
            </pre>

            <h5 className="text-light fw-bold mb-3">The pause container — the invisible glue</h5>
            <p className="text-secondary small mb-3">
              Every Pod has a hidden container you never write in your YAML — the <strong>pause container</strong>.
              It&apos;s started first and does exactly one thing: it claims the Pod&apos;s IP address and holds the network namespace open.
              Your app containers then join that namespace. This means even if your app crashes and restarts 50 times, the Pod keeps its IP.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`┌────────────────────────────────────────────────────────────┐
│                       Pod  (IP: 10.244.1.5)                │
│                                                            │
│  ┌──────────────┐   ┌────────────────┐   ┌─────────────┐  │
│  │    pause     │   │  your-app      │   │  sidecar    │  │
│  │  (sleeping)  │   │  (nginx:1.25)  │   │  (optional) │  │
│  │  holds IP ──▶│──▶│ joins network  │   │ joins same  │  │
│  └──────────────┘   └────────────────┘   └─────────────┘  │
│                                                            │
│  Shared: localhost, same port space, same volumes          │
└────────────────────────────────────────────────────────────┘`}
            </pre>

            <h5 className="text-light fw-bold mb-3">What happens when you create a Pod (the full flow)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`You run: kubectl apply -f pod.yaml
    │
    ▼  kubectl validates YAML and sends HTTPS request
┌─────────────────┐
│   API Server    │  Authenticates you → Validates the spec → Saves to etcd (status: Pending)
└────────┬────────┘
         │  Scheduler is watching…
         ▼
┌─────────────────┐
│    Scheduler    │  Finds the best node → Writes assignment back to API Server
└────────┬────────┘
         │  kubelet on that node is watching…
         ▼
┌─────────────────┐
│  kubelet        │  Tells the container runtime to pull the image and start containers
└────────┬────────┘
         ▼
┌─────────────────────────┐
│  Container Runtime      │  Starts pause → starts your containers → reports Running
│  (containerd / CRI-O)   │
└─────────────────────────┘`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 3: YAML SYNTAX PRIMER ───────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-code-square"></i>
            </div>
            <h2 className="doc-card-heading text-warning">3. YAML Syntax — Lists and Dicts</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              All Kubernetes objects are written in YAML. YAML has exactly two data structures you need to understand: <strong>dictionaries</strong> (key-value pairs) and <strong>lists</strong> (ordered sequences).
            </p>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <p className="text-secondary x-small fw-semibold mb-1">Dictionary (mapping) — key: value</p>
                <pre className="bg-dark text-success p-3 rounded border border-success border-opacity-25 small mb-0">
{`name: my-app          # string
port: 80              # number
enabled: true         # boolean

# Nested dict:
metadata:
  name: my-pod
  namespace: default`}
                </pre>
              </div>
              <div className="col-md-6">
                <p className="text-secondary x-small fw-semibold mb-1">List — items start with a dash ( - )</p>
                <pre className="bg-dark text-success p-3 rounded border border-success border-opacity-25 small mb-0">
{`# List of strings:
args:
  - "nginx"
  - "-g"
  - "daemon off;"

# List of dicts (most common in K8s):
containers:
  - name: web
    image: nginx
  - name: sidecar
    image: fluentd`}
                </pre>
              </div>
            </div>

            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">YAML is whitespace-sensitive — indentation is everything</h6>
                <p className="mb-0 x-small text-secondary">
                  Use <strong>spaces, never tabs</strong>. The standard in Kubernetes YAML is 2 spaces per indent level.
                  A single misplaced space will break your YAML. This is the #1 source of beginner errors.
                  Use <code>kubectl apply --dry-run=client -f pod.yaml</code> to validate before applying.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: HELLO WORLD POD ──────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-file-earmark-code-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">4. Hello World Pod — Every Field Explained</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Here is a real, working Pod manifest. Read it line by line — every field is annotated.
              Save this as your mental template. All Pod YAMLs follow this same structure.
            </p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`apiVersion: v1        # ① Which Kubernetes API version owns this object type.
                      #   Pods belong to the core API group, so it's just "v1".
                      #   Other objects like Deployments use "apps/v1".

kind: Pod             # ② The type of object. Always capital P for Pod.

metadata:             # ③ Data ABOUT the object (not the object itself).
  name: hello-pod     #   The Pod's name — must be unique in its namespace.
  labels:             #   Labels are key-value tags. Used by Services to find
    app: hello        #   this Pod and route traffic to it. Think of them as
    env: dev          #   searchable sticky notes on the Pod.

spec:                 # ④ The desired state — what you WANT the Pod to look like.

  containers:         # ⑤ A LIST of containers in this Pod (dash = list item).
    - name: hello     #   Name of THIS container. Used by kubectl logs -c hello.

      image: nginx:1.25        # ⑥ The container image. Format: name:tag.
                               #   Always pin a specific tag. Avoid :latest in prod.

      imagePullPolicy: IfNotPresent  # ⑦ When to pull the image from the registry.
                                     #   IfNotPresent = use cached image if available.
                                     #   Always = always pull (use with :latest).
                                     #   Never = image must already be on the node.

      ports:                   # ⑧ Which ports to EXPOSE. Informational only —
        - containerPort: 80    #   doesn't actually open or forward anything.
          protocol: TCP        #   Just documents that the container listens here.

      env:                     # ⑨ Environment variables injected into the container.
        - name: ENVIRONMENT
          value: "development"

      resources:               # ⑩ CPU and memory guardrails.
        requests:              #   MINIMUM guaranteed. Scheduler uses this to decide
          memory: "64Mi"       #   which node has enough room for the Pod.
          cpu: "100m"          #   100m = 100 millicores = 0.1 CPU core.
        limits:                #   MAXIMUM allowed.
          memory: "128Mi"      #   If exceeded → container is OOMKilled.
          cpu: "200m"          #   If exceeded → container is throttled (not killed).

  restartPolicy: Always        # ⑪ What to do when the container exits.
                               #   Always = restart always (default, for servers).
                               #   OnFailure = restart only on non-zero exit.
                               #   Never = never restart (for one-off jobs).`}
            </pre>
            <div className="mt-2">
              <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>#</th>
                    <th>Field</th>
                    <th>Memory trick</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="text-warning">①</td><td><code>apiVersion</code></td><td className="text-secondary">Pods → <code>v1</code>. Anything with &ldquo;apps&rdquo; → <code>apps/v1</code>. Unsure? <code>kubectl api-resources</code></td></tr>
                  <tr><td className="text-warning">②</td><td><code>kind</code></td><td className="text-secondary">Always the object type with a capital letter: Pod, Deployment, Service</td></tr>
                  <tr><td className="text-warning">③</td><td><code>metadata.labels</code></td><td className="text-secondary">Labels = searchable sticky notes. Services use them to find Pods</td></tr>
                  <tr><td className="text-warning">④</td><td><code>spec</code></td><td className="text-secondary">&ldquo;Specification&rdquo; = what you want. Everything describing the desired state lives here</td></tr>
                  <tr><td className="text-warning">⑤</td><td><code>containers</code></td><td className="text-secondary">A list (starts with <code>-</code>). Most Pods have exactly one item</td></tr>
                  <tr><td className="text-warning">⑩</td><td><code>resources</code></td><td className="text-secondary">requests = &ldquo;I need at least this much&rdquo;. limits = &ldquo;don&apos;t let me use more than this&rdquo;</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── SECTION 5: CREATING PODS ────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-plus-circle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">5. Creating Pods — Imperative vs Declarative</h2>
          </div>
          <div className="doc-card-body">

            <h5 className="text-light fw-bold mb-3">Imperative — you give the command directly</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl run hello-pod --image=nginx:1.25`}
            </pre>
            <p className="text-secondary small mb-4">
              Fast. One command. No YAML needed. But not repeatable — if you run this again it errors because the Pod already exists.
              Good for quick tests and the CKA exam when you just need something running fast.
            </p>

            <h5 className="text-light fw-bold mb-3">Declarative — you describe what you want in a file</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl apply -f pod.yaml`}
            </pre>
            <p className="text-secondary small mb-4">
              Reads your YAML and figures out what to create/update/leave alone. <strong>Idempotent</strong> — safe to run multiple times.
              This is the production-grade approach and what most CKA questions expect.
            </p>

            <h5 className="text-light fw-bold mb-3"><code>create</code> vs <code>apply</code> — what&apos;s the difference?</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th></th>
                    <th><code>kubectl create -f pod.yaml</code></th>
                    <th><code>kubectl apply -f pod.yaml</code></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-light fw-semibold">If object doesn&apos;t exist</td>
                    <td>Creates it ✅</td>
                    <td>Creates it ✅</td>
                  </tr>
                  <tr>
                    <td className="text-light fw-semibold">If object already exists</td>
                    <td>Errors ❌ — &ldquo;already exists&rdquo;</td>
                    <td>Updates it with the diff ✅</td>
                  </tr>
                  <tr>
                    <td className="text-light fw-semibold">Safe to re-run?</td>
                    <td>No</td>
                    <td>Yes — idempotent</td>
                  </tr>
                  <tr>
                    <td className="text-light fw-semibold">When to use</td>
                    <td>One-time object creation, scripted fresh installs</td>
                    <td>Everything else. Default to this.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <p className="mb-0 x-small text-secondary">
                  <strong className="text-light">Rule of thumb:</strong> Always use <code>kubectl apply</code> unless you have a specific reason not to. It&apos;s the safer, more flexible option.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 6: HANDS-ON WORKFLOW ─────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-success mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-terminal-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">6. Hands-On — Full Pod Lifecycle Workflow</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Follow every step in order. We&apos;ll create a Pod, break it, diagnose it, fix it, and clean up.
            </p>

            {/* Step 1 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 1</span>Create the hello-pod
              </h6>
              <p className="text-secondary small mb-2">Save the YAML from Section 4 as <code>hello-pod.yaml</code>, then apply it:</p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl apply -f hello-pod.yaml
# Output: pod/hello-pod created`}
              </pre>
            </div>

            {/* Step 2 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 2</span>List all Pods
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl get pods
# NAME        READY   STATUS    RESTARTS   AGE
# hello-pod   1/1     Running   0          12s`}
              </pre>
              <div className="mt-2">
                <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                  <tbody>
                    <tr><td style={{width:'35%'}}><code>READY 1/1</code></td><td className="text-secondary">1 out of 1 containers is running. If it shows 0/1, the container hasn&apos;t started yet</td></tr>
                    <tr><td><code>STATUS</code></td><td className="text-secondary">The Pod&apos;s current phase: Pending → ContainerCreating → Running → Completed/Error</td></tr>
                    <tr><td><code>RESTARTS</code></td><td className="text-secondary">How many times the container has crashed and been restarted. Non-zero means trouble</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 3</span>Delete the Pod
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl delete pod hello-pod
# pod "hello-pod" deleted
# (waits ~30 seconds for graceful shutdown)

# Impatient? Force-delete immediately:
kubectl delete pod hello-pod --force
# Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated.`}
              </pre>
              <p className="text-secondary x-small mb-0">
                <strong className="text-light">What happens:</strong> Kubernetes sends <code>SIGTERM</code> to the container, waits 30s (the <code>terminationGracePeriodSeconds</code>), then sends <code>SIGKILL</code>.
                <code>--force</code> skips the wait and kills immediately. Use it in the exam to save time.
              </p>
            </div>

            {/* Step 4 — Corrupt */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-danger text-light me-2">Step 4</span>Corrupt the Pod — break it on purpose
              </h6>
              <p className="text-secondary small mb-2">
                Re-create the Pod first, then break it by editing the YAML to use a bad image name:
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl apply -f hello-pod.yaml          # create it again

# Now open the file and change the image to something that doesn't exist:
nano hello-pod.yaml
# Change:  image: nginx:1.25
# To:      image: nginx:this-tag-does-not-exist

# Apply the broken version:
kubectl apply -f hello-pod.yaml`}
              </pre>
              <div className="doc-alert doc-alert-warning mb-0">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <div>
                  <p className="mb-0 x-small text-secondary">
                    Note: for a <em>running</em> Pod, changing the image in YAML and re-applying doesn&apos;t work for bare Pods (the spec is immutable).
                    In this exercise, first delete the Pod, edit the YAML, then apply — this creates a fresh broken Pod.
                    <code className="d-block mt-1">kubectl delete pod hello-pod && kubectl apply -f hello-pod.yaml</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 — List broken */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-warning text-dark me-2">Step 5</span>List Pods — spot the broken one
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl get pods
# NAME        READY   STATUS             RESTARTS   AGE
# hello-pod   0/1     ImagePullBackOff   0          23s`}
              </pre>
              <p className="text-secondary x-small mb-0">
                <code>READY 0/1</code> — no containers are running. <code>ImagePullBackOff</code> means Kubernetes tried to pull the image, failed, and is backing off (waiting before retrying).
                The <code>ErrImagePull</code> state appears first, then it becomes <code>ImagePullBackOff</code> after a few attempts.
              </p>
            </div>

            {/* Step 6 — Describe */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-info text-dark me-2">Step 6</span>Debug with <code>kubectl describe</code>
              </h6>
              <p className="text-secondary small mb-2">
                <code>describe</code> is your primary diagnostic tool. It shows the full Pod spec AND the event log at the bottom.
                <strong className="text-light"> Always scroll to the Events section first.</strong>
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl describe pod hello-pod`}
              </pre>
              <pre className="bg-dark text-warning p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`Events:
  Type     Reason     Age   From               Message
  ----     ------     ----  ----               -------
  Normal   Scheduled  35s   default-scheduler  Successfully assigned default/hello-pod to node-1
  Normal   Pulling    34s   kubelet            Pulling image "nginx:this-tag-does-not-exist"
  Warning  Failed     31s   kubelet            Failed to pull image: rpc error: ... not found
  Warning  Failed     31s   kubelet            Error: ErrImagePull
  Warning  BackOff    18s   kubelet            Back-off pulling image "nginx:this-tag-does-not-exist"`}
              </pre>
              <p className="text-secondary x-small mb-0">
                The Events section tells you <em>exactly</em> what went wrong and when. The image tag doesn&apos;t exist. Now you know how to fix it.
              </p>
            </div>

            {/* Step 7 — Edit */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-info text-dark me-2">Step 7</span>Fix it with <code>kubectl edit pod</code>
              </h6>
              <p className="text-secondary small mb-2">
                <code>kubectl edit</code> opens the live Pod spec in your terminal editor (usually <code>vi</code>). You edit it, save, and Kubernetes applies the diff.
              </p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl edit pod hello-pod
# Opens the Pod spec in vi/vim.
# Find the image line:  image: nginx:this-tag-does-not-exist
# Change it to:         image: nginx:1.25
# Save and exit:        :wq  (in vi)
# Output: pod/hello-pod edited`}
              </pre>
              <div className="mt-2 mb-3">
                <p className="text-secondary x-small mb-1 fw-semibold">Alternatives to <code>kubectl edit</code>:</p>
                <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                  <tbody>
                    <tr>
                      <td style={{width:'50%'}}><code>kubectl patch pod hello-pod -p &apos;{`{"spec":{"containers":[{"name":"hello","image":"nginx:1.25"}]}}`}&apos;</code></td>
                      <td className="text-secondary">Patch a specific field inline — no editor needed. Useful in scripts</td>
                    </tr>
                    <tr>
                      <td>Fix the YAML file → <code>kubectl delete pod hello-pod &amp;&amp; kubectl apply -f hello-pod.yaml</code></td>
                      <td className="text-secondary">Delete and recreate — always works, even for immutable fields</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="doc-alert doc-alert-warning mb-0">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <div>
                  <p className="mb-0 x-small text-secondary">
                    <strong className="text-light">Most Pod fields are immutable on a running Pod</strong> — you can&apos;t change the container name, volumes, or resource limits without deleting and recreating.
                    Only a few fields (like labels and annotations) can be edited live. <code>kubectl edit</code> will warn you if you try to change an immutable field.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 8 — Exec */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-primary text-light me-2">Step 8</span>Enter the Pod — run commands inside it
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`# Interactive shell inside the container:
kubectl exec -it hello-pod -- /bin/bash
# You're now inside the container. Try:
nginx -v
cat /etc/nginx/nginx.conf
exit

# Or run a one-off command without opening a shell:
kubectl exec hello-pod -- cat /etc/hosts`}
              </pre>
              <div className="mt-2">
                <table className="table table-dark table-sm small mb-0 border border-secondary border-opacity-25 rounded">
                  <tbody>
                    <tr><td style={{width:'35%'}}><code>exec</code></td><td className="text-secondary">Execute a command inside a running container in the Pod</td></tr>
                    <tr><td><code>-it</code></td><td className="text-secondary"><code>-i</code> = keep stdin open. <code>-t</code> = allocate a terminal. Together = interactive shell. Like <code>docker exec -it</code></td></tr>
                    <tr><td><code>--</code> (double dash)</td><td className="text-secondary">Separates kubectl flags from the command being run inside the container. Everything after <code>--</code> runs in the container</td></tr>
                    <tr><td><code>/bin/bash</code> vs <code>/bin/sh</code></td><td className="text-secondary">Use <code>/bin/bash</code> for Debian/Ubuntu images. Use <code>/bin/sh</code> for Alpine (minimal) images — bash isn&apos;t installed there</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step 9 — Delete */}
            <div className="mb-0">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-danger text-light me-2">Step 9</span>Clean up — delete the Pod
              </h6>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl delete pod hello-pod
# or use the YAML:
kubectl delete -f hello-pod.yaml`}
              </pre>
            </div>
          </div>
        </div>

        {/* ── SECTION 7: DRY RUN WORKFLOW ──────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-warning mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-file-earmark-arrow-down-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">7. Why Not Write YAML by Hand — The Dry Run Workflow</h2>
          </div>
          <div className="doc-card-body">
            <h5 className="text-light fw-bold mb-3">Why writing YAML by hand is risky in the CKA exam</h5>
            <p className="text-secondary mb-3">
              The CKA exam is timed. Writing Pod YAML from scratch is slow and error-prone. One misplaced space and you waste 5 minutes debugging indentation.
              The exam doesn&apos;t test whether you can memorize YAML — it tests whether you can produce working Kubernetes objects. Use the tools.
            </p>

            <h5 className="text-light fw-bold mb-3">The correct workflow: generate → edit → apply</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`# Step 1: Generate the YAML scaffold imperatively (--dry-run=client means "don't create anything")
kubectl run hello-pod --image=nginx:1.25 --dry-run=client -o yaml
# This prints valid Pod YAML to your terminal.

# Step 2: Save it to a file instead of printing it:
kubectl run hello-pod --image=nginx:1.25 --dry-run=client -o yaml > hello-pod.yaml

# Step 3: Open it in vi and add what the question requires:
vi hello-pod.yaml
# Add labels, env vars, resource limits, ports — whatever you need.

# Step 4: Apply it:
kubectl apply -f hello-pod.yaml`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Flag breakdown</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-sm small border border-secondary border-opacity-25 rounded mb-0">
                <tbody>
                  <tr>
                    <td style={{width:'40%'}}><code>--dry-run=client</code></td>
                    <td className="text-secondary">Tells kubectl to go through all the motions but <strong>not send anything to the API server</strong>. Nothing is created. The &ldquo;client&rdquo; part means the validation happens locally in kubectl itself.</td>
                  </tr>
                  <tr>
                    <td><code>-o yaml</code></td>
                    <td className="text-secondary">Output format. Instead of a summary line, print the full object as YAML. Other options: <code>json</code>, <code>wide</code>, <code>name</code>.</td>
                  </tr>
                  <tr>
                    <td><code>&gt; hello-pod.yaml</code></td>
                    <td className="text-secondary">Shell redirection — writes the command&apos;s stdout to a file instead of printing it. Not a kubectl flag; it&apos;s a standard shell feature.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mb-3">Quick vi cheat sheet (exam survival)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`i          → enter Insert mode (you can type now)
Esc        → exit Insert mode (go back to Normal mode)
:wq        → save and quit
:q!        → quit WITHOUT saving (discard changes)
/text      → search for "text" in the file
dd         → delete the current line
yy         → copy (yank) the current line
p          → paste the copied line below
u          → undo
Ctrl+r     → redo`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 8: GET ALL INFO ──────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-info mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-search"></i>
            </div>
            <h2 className="doc-card-heading text-info">8. Getting All Information About a Pod</h2>
          </div>
          <div className="doc-card-body">

            <h5 className="text-light fw-bold mb-3">The need for <code>-o wide</code></h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-2">
{`kubectl get pods             # Basic — name, ready, status, restarts, age
kubectl get pods -o wide     # Extended — adds IP, Node, image, nominated node`}
            </pre>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-3">
{`# -o wide output:
NAME        READY   STATUS    RESTARTS   AGE   IP            NODE           NOMINATED NODE
hello-pod   1/1     Running   0          3m    10.244.1.15   kind-worker    <none>`}
            </pre>
            <p className="text-secondary small mb-4">
              <code>-o wide</code> adds the Pod&apos;s actual <strong>cluster IP</strong> and which <strong>Node</strong> it&apos;s running on.
              Essential when debugging network issues (&ldquo;which IP is this Pod reachable at?&rdquo;)
              or when diagnosing node-level problems (&ldquo;are all broken Pods on the same node?&rdquo;).
            </p>

            <h5 className="text-light fw-bold mb-3">Full YAML output — the entire object as Kubernetes sees it</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`kubectl get pod hello-pod -o yaml
# Returns the complete Pod spec including:
# - Everything you wrote
# - Plus what Kubernetes added (status, resourceVersion, uid, creationTimestamp, etc.)

kubectl get pod hello-pod -o json
# Same but in JSON format`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Listing Pods across namespaces</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl get pods                    # Only in the 'default' namespace
kubectl get pods -n kube-system     # Only in the 'kube-system' namespace
kubectl get pods -A                 # ALL namespaces (adds NAMESPACE column)
# -A and --all-namespaces are the same flag`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 9: LABELS ───────────────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-primary mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-tags-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">9. Why Labels Matter — and How to Filter Pods</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Labels are key-value pairs you attach to a Pod (or any Kubernetes object). They look innocent, but they are the glue that holds Kubernetes together.
            </p>

            <h5 className="text-light fw-bold mb-3">Why labels are critical</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Who uses labels</th>
                    <th>What they do with them</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">Services</strong></td>
                    <td>Use a label selector to find which Pods to route traffic to. e.g., &ldquo;send all incoming requests to Pods where <code>app=hello</code>&rdquo;</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">ReplicaSets / Deployments</strong></td>
                    <td>Use labels to track which Pods they own. If you delete a label from a Pod, the ReplicaSet &ldquo;loses&rdquo; it and creates a replacement</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">kubectl (you)</strong></td>
                    <td>Use <code>-l</code> to filter and operate on specific Pods by label — e.g., delete all Pods in a broken environment</td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Network Policies</strong></td>
                    <td>Use labels to decide which Pods can talk to which other Pods</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mb-3">How to filter Pods by label</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-3">
{`# Show only Pods with the label app=hello:
kubectl get pods -l app=hello

# Multiple labels (AND condition):
kubectl get pods -l app=hello,env=dev

# Show labels in the output:
kubectl get pods --show-labels

# Example output with --show-labels:
# NAME        READY   STATUS    RESTARTS   AGE   LABELS
# hello-pod   1/1     Running   0          5m    app=hello,env=dev`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Add or change a label on a running Pod</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl label pod hello-pod tier=frontend           # add a new label
kubectl label pod hello-pod env=production --overwrite  # change an existing label
kubectl label pod hello-pod env-                    # remove the 'env' label (dash at end)`}
            </pre>
          </div>
        </div>

        {/* ── SECTION 10: CKA SURVIVAL BOX ─────────────────────────────────── */}
        <div className="doc-section-card shadow-lg border-danger mb-4">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-fill-check"></i>
            </div>
            <h2 className="doc-card-heading text-danger">10. CKA Survival Box — Pods</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Everything you need to remember for the CKA exam, condensed into one section.
            </p>

            <h5 className="text-light fw-bold mb-2">The 90-second Pod workflow (memorize this)</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-4">
{`# 1. Generate YAML (never write from scratch):
kubectl run mypod --image=nginx:1.25 --dry-run=client -o yaml > mypod.yaml

# 2. Edit it:
vi mypod.yaml

# 3. Apply:
kubectl apply -f mypod.yaml

# 4. Verify:
kubectl get pods
kubectl get pods -o wide

# 5. If broken — diagnose:
kubectl describe pod mypod     # scroll to Events
kubectl logs mypod             # app-level logs

# 6. Fix — delete and recreate, or edit:
kubectl edit pod mypod         # for small label/annotation changes
kubectl delete pod mypod && kubectl apply -f mypod.yaml  # for real fixes

# 7. Enter the pod:
kubectl exec -it mypod -- /bin/sh

# 8. Clean up:
kubectl delete -f mypod.yaml`}
            </pre>

            <h5 className="text-light fw-bold mb-3">Common Pod statuses and what to do</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Status</th>
                    <th>Meaning</th>
                    <th>First thing to run</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="text-success fw-semibold">Running</span></td>
                    <td>All good</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td><span className="text-warning fw-semibold">Pending</span></td>
                    <td>Waiting to be scheduled or pulling image</td>
                    <td><code>kubectl describe pod</code> → Events</td>
                  </tr>
                  <tr>
                    <td><span className="text-danger fw-semibold">ImagePullBackOff</span></td>
                    <td>Wrong image name or tag, or private registry</td>
                    <td><code>kubectl describe pod</code> → check image name in Events</td>
                  </tr>
                  <tr>
                    <td><span className="text-danger fw-semibold">CrashLoopBackOff</span></td>
                    <td>Container starts and crashes immediately, repeating</td>
                    <td><code>kubectl logs mypod --previous</code> → see crash reason</td>
                  </tr>
                  <tr>
                    <td><span className="text-warning fw-semibold">OOMKilled</span></td>
                    <td>Container exceeded memory limit and was killed</td>
                    <td>Raise <code>resources.limits.memory</code> or fix memory leak</td>
                  </tr>
                  <tr>
                    <td><span className="text-secondary fw-semibold">Terminating</span></td>
                    <td>Pod is being gracefully shut down</td>
                    <td>Wait, or <code>kubectl delete pod --force</code> to skip grace period</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mb-3">Flags you must know by heart</h5>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Flag</th>
                    <th>Works with</th>
                    <th>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>-o wide</code></td><td><code>get pods</code></td><td className="text-secondary">Adds Pod IP and Node name to the output</td></tr>
                  <tr><td><code>-A</code></td><td><code>get pods</code></td><td className="text-secondary">All namespaces</td></tr>
                  <tr><td><code>-n &lt;ns&gt;</code></td><td>most commands</td><td className="text-secondary">Target a specific namespace</td></tr>
                  <tr><td><code>-l app=hello</code></td><td><code>get pods</code></td><td className="text-secondary">Filter by label</td></tr>
                  <tr><td><code>--show-labels</code></td><td><code>get pods</code></td><td className="text-secondary">Add a LABELS column to the output</td></tr>
                  <tr><td><code>--dry-run=client -o yaml</code></td><td><code>run</code>, <code>create</code></td><td className="text-secondary">Generate YAML without creating anything</td></tr>
                  <tr><td><code>--force</code></td><td><code>delete pod</code></td><td className="text-secondary">Skip the 30s graceful shutdown — delete immediately</td></tr>
                  <tr><td><code>--previous</code></td><td><code>logs</code></td><td className="text-secondary">Show logs from the <em>last crashed</em> container, not the current one</td></tr>
                  <tr><td><code>-c &lt;name&gt;</code></td><td><code>logs</code>, <code>exec</code></td><td className="text-secondary">Target a specific container in a multi-container Pod</td></tr>
                  <tr><td><code>-it</code></td><td><code>exec</code></td><td className="text-secondary">Interactive terminal — required for shells like <code>/bin/bash</code></td></tr>
                </tbody>
              </table>
            </div>

            <h5 className="text-light fw-bold mb-3">Two commands to look up anything you forget</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`# Look up any YAML field interactively — available during the exam:
kubectl explain pod.spec.containers
kubectl explain pod.spec.restartPolicy

# Find the correct apiVersion for any resource type:
kubectl api-resources | grep Pod`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
