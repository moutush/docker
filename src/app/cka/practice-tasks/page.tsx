"use client";

import React, { useState } from 'react';

interface PracticeTask {
  id: string;         // unique across all groups e.g. "A1", "B3"
  title: string;
  description: string;
  solution: string;
  hint?: string;
}

interface TaskGroup {
  id: string;
  label: string;
  icon: string;
  color: string;        // Bootstrap text-* color
  borderColor: string;  // Bootstrap border-* color
  badgeClass: string;
  docHref: string;
  tasks: PracticeTask[];
}

const TASK_GROUPS: TaskGroup[] = [
  {
    id: 'A',
    label: 'Create a Cluster',
    icon: 'bi-plus-circle-fill',
    color: 'text-primary',
    borderColor: 'border-primary',
    badgeClass: 'bg-primary',
    docHref: '/cka/architecture/create-cluster',
    tasks: [
      {
        id: 'A1',
        title: 'Create a Single-Node Cluster',
        description: "Install a single-node Kind cluster named 'cka-single' on your local machine using Kubernetes v1.34.0.",
        solution: 'kind create cluster --name cka-single --image kindest/node:v1.34.0',
        hint: "Use the --name flag to give your cluster a specific name and --image to pin the Kubernetes version. Kind will prefix this name with 'kind-' in your kubeconfig.",
      },
      {
        id: 'A2',
        title: 'View All Clusters',
        description: "Run both commands below and observe the output. Both should list 'cka-single', but they look in completely different places — can you spot the difference?\n\n• kind get clusters\n• kubectl config get-clusters",
        solution: `# Option A — asks Kind (checks Docker containers):
kind get clusters
# Output: cka-single

# Option B — asks kubectl (reads ~/.kube/config):
kubectl config get-clusters
# Output: kind-cka-single

# KEY DIFFERENCE:
# 'kind get clusters'            → lists clusters by scanning running Docker containers.
#                                   Name shown is the raw cluster name (cka-single).
# 'kubectl config get-clusters'  → lists clusters from ~/.kube/config.
#                                   Name shown is prefixed with 'kind-' (kind-cka-single).
#
# They can go out of sync! If you manually stop a Kind Docker container
# without running 'kind delete cluster', kubectl still shows it but Kind won't.`,
        hint: "'kind get clusters' talks to Docker. 'kubectl config get-clusters' reads ~/.kube/config. Same cluster — different lenses.",
      },
      {
        id: 'A3',
        title: 'Delete the Single-Node Cluster',
        description: "Delete the 'cka-single' cluster you created in Task A1.",
        solution: 'kind delete cluster --name cka-single',
        hint: "Since you gave the cluster an explicit name, you must pass --name. Omitting it would try to delete the default cluster named 'kind'.",
      },
      {
        id: 'A4',
        title: 'Create a Multi-Node Cluster',
        description: "Install a multi-node Kind cluster using the following details:\n- Cluster Name: cka-cluster2\n- Nodes: 1 Control plane and 3 worker nodes\n- Kubernetes Version: v1.34.0",
        solution: `# Create a config file named config.yaml:
cat <<EOF > config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: cka-cluster2
nodes:
  - role: control-plane
    image: kindest/node:v1.34.0
  - role: worker
    image: kindest/node:v1.34.0
  - role: worker
    image: kindest/node:v1.34.0
  - role: worker
    image: kindest/node:v1.34.0
EOF

# Create the cluster:
kind create cluster --config config.yaml`,
        hint: "You must use a configuration file for multi-node clusters. The 'name' field in the YAML sets the cluster name.",
      },
      {
        id: 'A5',
        title: 'Set Current Context',
        description: "Set your kubectl context to the newly created multi-node cluster 'cka-cluster2'.",
        solution: 'kubectl config use-context kind-cka-cluster2',
        hint: "Kind prefixes the cluster name with 'kind-' when adding it to your kubeconfig.",
      },
      {
        id: 'A6',
        title: 'Verify Nodes are Ready',
        description: 'Run a command to confirm all 4 nodes in your multi-node cluster are Ready.',
        solution: 'kubectl get nodes -o wide',
        hint: "This should list 1 control-plane node and 3 worker nodes, all with STATUS 'Ready'. The -o wide flag adds IP and runtime columns.",
      },
      {
        id: 'A7',
        title: 'View All Clusters',
        description: "View a list of all clusters configured in your kubeconfig. You should now see 'kind-cka-cluster2'.",
        solution: 'kubectl config get-clusters',
        hint: "Remember: 'kind get clusters' checks Docker containers, 'kubectl config get-clusters' checks your ~/.kube/config.",
      },
      {
        id: 'A8',
        title: 'Delete the Multi-Node Cluster',
        description: "Clean up by deleting the 'cka-cluster2' multi-node cluster.",
        solution: 'kind delete cluster --name cka-cluster2',
        hint: "Since the cluster name isn't the default, you must pass the --name flag to Kind.",
      },
    ],
  },
  {
    id: 'B',
    label: 'List Clusters & Nodes',
    icon: 'bi-list-ul',
    color: 'text-info',
    borderColor: 'border-info',
    badgeClass: 'bg-info',
    docHref: '/cka/architecture/list-clusters',
    tasks: [
      {
        id: 'B1',
        title: 'Ask Kind what clusters exist',
        description: "Run the Kind command to list clusters. Note the output — what format is the cluster name in?\n\nExpected output after creating 'cka-single':\n  cka-single",
        solution: 'kind get clusters',
        hint: "Kind scans Docker containers labeled as Kind nodes. The name shown is the raw cluster name — no 'kind-' prefix here.",
      },
      {
        id: 'B2',
        title: 'Ask kubectl what clusters exist',
        description: "Run the kubectl command to list clusters from your kubeconfig. How does the name differ from the Kind output?\n\nExpected output:\n  NAME\n  kind-cka-single",
        solution: 'kubectl config get-clusters',
        hint: "This reads ~/.kube/config and shows cluster names as stored there. Kind always prefixes them with 'kind-' when it writes the kubeconfig entry.",
      },
      {
        id: 'B3',
        title: 'List all contexts and spot the active one',
        description: "List all contexts and identify which one is currently active. The active context has a '*' in the CURRENT column.",
        solution: 'kubectl config get-contexts',
        hint: "Contexts bundle a cluster + user + namespace together. The '*' row is where all your kubectl commands are being sent right now.",
      },
      {
        id: 'B4',
        title: 'Print only the active context name',
        description: "Print just the name of the currently active context — no table, just the name.",
        solution: 'kubectl config current-context',
        hint: "Use this as a quick sanity check before running exam tasks: 'am I talking to the right cluster?'",
      },
      {
        id: 'B5',
        title: 'Switch to a different context',
        description: "Switch your active context to the multi-node cluster 'kind-cka-cluster2' (created in task A4). Then verify the switch worked.",
        solution: `kubectl config use-context kind-cka-cluster2

# Verify:
kubectl config current-context
# Output: kind-cka-cluster2`,
        hint: "The context name must match exactly — use 'kubectl config get-contexts' first to see the exact names available. Kind always prefixes the cluster name with 'kind-' when writing to kubeconfig.",
      },
      {
        id: 'B6',
        title: 'List nodes in the active cluster',
        description: "List all nodes in your currently active cluster. What is the STATUS of each node?",
        solution: 'kubectl get nodes',
        hint: "This makes a live call to the Kubernetes API server. Node names include the cluster name, so you can confirm you're in the right cluster just by reading the output.",
      },
      {
        id: 'B7',
        title: 'List nodes with extended details',
        description: "List all nodes, but include extra columns showing the node's internal IP, OS image, and container runtime.",
        solution: 'kubectl get nodes -o wide',
        hint: "The -o flag sets the output format. 'wide' adds INTERNAL-IP, EXTERNAL-IP, OS-IMAGE, KERNEL-VERSION, and CONTAINER-RUNTIME columns.",
      },
      {
        id: 'B8',
        title: "Get nodes of a different cluster — without switching context",
        description: "Your active context is 'kind-cka-multi'.\nWithout switching context, get the list of nodes from 'kind-cka-single'.\nAfter the command, verify your active context is still 'kind-cka-multi' — it must not have changed.",
        solution: `kubectl get nodes --context kind-cka-single

# Confirm your active context is still unchanged:
kubectl config current-context`,
        hint: "The --context flag is a one-shot override — it never touches ~/.kube/config. Use it any time you need to peek at another cluster without committing to a full context switch. Works with any kubectl command.",
      },
      {
        id: 'B9',
        title: 'Confirm cluster connectivity',
        description: "Run a command that makes a live call to the active cluster's API server and prints its URL and the CoreDNS address.",
        solution: 'kubectl cluster-info',
        hint: "If this command succeeds, your kubeconfig context is pointing to a real, reachable cluster. If it fails, the cluster might be stopped or the context might be wrong.",
      },
    ],
  },
  {
    id: 'C',
    label: 'Pods',
    icon: 'bi-box-seam-fill',
    color: 'text-success',
    borderColor: 'border-success',
    badgeClass: 'bg-success',
    docHref: '/cka/core-concepts/pods',
    tasks: [
      {
        id: 'C1',
        title: 'Prerequisite: Create a Cluster',
        description: 'Before working with Pods, ensure you have a running Kubernetes cluster. Create a single-node cluster using Kind named "cka-single".',
        solution: 'kind create cluster --name cka-single --image kindest/node:v1.34.0',
        hint: 'Use `kind create cluster`. Refer to the "Create a Cluster" section if you forget the syntax.',
      },
      {
        id: 'C2',
        title: 'Create a Pod using Dry-Run',
        description: `Generate a Pod manifest named hello-pod.yaml using the kubectl dry-run feature with the following spec, and then apply it:
- name: hello-pod
- label:  app=hello
- image:  nginx:1.25
- port:   80
- restartPolicy: Always`,
        solution: `# Generate the YAML using dry-run and save to file:
kubectl run hello-pod --image=nginx:1.25 --labels="app=hello" --port=80 --restart=Always --dry-run=client -o yaml > hello-pod.yaml

# Apply the generated YAML:
kubectl apply -f hello-pod.yaml
# Output: pod/hello-pod created`,
        hint: 'Use `kubectl run ... --dry-run=client -o yaml > pod.yaml` to generate the file without writing it by hand.',
      },
      {
        id: 'C3',
        title: 'List all Pods and understand the columns',
        description: `List all Pods in the default namespace.
What does each column mean?
- READY
- STATUS
- RESTARTS

Expected output when healthy:
  NAME        READY   STATUS    RESTARTS   AGE
  hello-pod   1/1     Running   0          12s`,
        solution: `kubectl get pods

# Column meanings:
# READY 1/1   → 1 out of 1 containers is running. If 0/1, container hasn't started yet.
# STATUS      → Pod phase: Pending → ContainerCreating → Running → Completed/Error
# RESTARTS    → How many times the container crashed and was restarted. Non-zero means trouble.`,
        hint: 'READY shows <running containers>/<total containers>. RESTARTS > 0 is always worth investigating.',
      },
      {
        id: 'C4',
        title: 'Delete the Pod — two ways',
        description: `Delete the hello-pod you created.
Try both methods — by name and by file.
Also: what is the difference between a normal delete and --force?`,
        solution: `# By name:
kubectl delete pod hello-pod

# By file (same effect):
kubectl delete -f hello-pod.yaml

# Force delete — skips the 30-second graceful shutdown:
kubectl delete pod hello-pod --force

# Normal delete: sends SIGTERM, waits terminationGracePeriodSeconds (default 30s), then SIGKILL.
# --force:       sends SIGKILL immediately. Use in the exam to save time.`,
        hint: 'Use --force in the CKA exam whenever you just want the Pod gone quickly. Waiting 30s per delete adds up.',
      },
      {
        id: 'C5',
        title: 'Corrupt a Pod — create it with a bad image',
        description: `Re-create the Pod from C2, but intentionally use a broken image tag:
- image: nginx:this-tag-does-not-exist

Apply it. Then list Pods — what STATUS do you see?`,
        solution: `# Edit hello-pod.yaml, change the image line to:
#   image: nginx:this-tag-does-not-exist

kubectl delete pod hello-pod 2>/dev/null; kubectl apply -f hello-pod.yaml

# List pods:
kubectl get pods
# NAME        READY   STATUS             RESTARTS   AGE
# hello-pod   0/1     ImagePullBackOff   0          23s

# ErrImagePull appears first, then becomes ImagePullBackOff after Kubernetes backs off retrying.`,
        hint: 'You must delete the existing Pod first — bare Pods have immutable specs, you cannot change the image of a running Pod by re-applying.',
      },
      {
        id: 'C6',
        title: 'Debug the broken Pod with kubectl describe',
        description: `The hello-pod is in ImagePullBackOff.
Run the describe command on it.
Where in the output do you find the actual error message?
What does the Events section tell you?`,
        solution: `kubectl describe pod hello-pod

# Scroll to the bottom — look at the Events section:
# Events:
#   Type     Reason     Age   From               Message
#   ----     ------     ----  ----               -------
#   Normal   Scheduled  35s   default-scheduler  Successfully assigned default/hello-pod to node-1
#   Normal   Pulling    34s   kubelet            Pulling image "nginx:this-tag-does-not-exist"
#   Warning  Failed     31s   kubelet            Failed to pull image: ... not found
#   Warning  Failed     31s   kubelet            Error: ErrImagePull
#   Warning  BackOff    18s   kubelet            Back-off pulling image "nginx:this-tag-does-not-exist"

# The Events section is your first stop for ANY broken Pod.
# It tells you exactly what happened and in what order.`,
        hint: 'kubectl describe gives you the full story. Always read the Events section at the bottom first — it tells you exactly what Kubernetes tried and what failed.',
      },
      {
        id: 'C7',
        title: 'Fix the Pod with kubectl edit',
        description: `Use kubectl edit to fix the broken image tag on hello-pod.
Change the image back to nginx:1.25.
What are the limitations of kubectl edit on a bare Pod?`,
        solution: `kubectl edit pod hello-pod
# Opens the Pod spec in vi/vim.
# Find:    image: nginx:this-tag-does-not-exist
# Change:  image: nginx:1.25
# Save:    :wq

# Verify it's fixed:
kubectl get pods
# NAME        READY   STATUS    RESTARTS   AGE
# hello-pod   1/1     Running   0          ...

# LIMITATIONS of kubectl edit on a bare Pod:
# - Most fields are IMMUTABLE (container name, volumes, resource limits).
# - You can only edit: labels, annotations, image, activeDeadlineSeconds, tolerations.
# - For immutable field changes: delete and recreate the Pod.

# ALTERNATIVE if edit doesn't work:
kubectl delete pod hello-pod && kubectl apply -f hello-pod.yaml`,
        hint: 'If kubectl edit rejects your change with "field is immutable", the only option is delete + recreate. Fix the YAML file first, then: kubectl delete pod hello-pod && kubectl apply -f hello-pod.yaml',
      },
      {
        id: 'C8',
        title: 'Enter the running Pod',
        description: `Open an interactive shell inside hello-pod.
Once inside, run: nginx -v
Then exit back to your machine.
Also: run a single command inside the Pod without opening a shell.`,
        solution: `# Interactive shell:
kubectl exec -it hello-pod -- /bin/bash
# Now you're inside the container:
nginx -v      # → nginx version nginx/1.25.x
exit          # → back to your machine

# One-off command (no shell):
kubectl exec hello-pod -- cat /etc/hosts

# Flag breakdown:
# -i  → keep stdin open (required for interactive use)
# -t  → allocate a pseudo-terminal (makes it feel like a real shell)
# --  → everything after this runs inside the container, not on your machine`,
        hint: 'Use /bin/bash for Debian/Ubuntu-based images. Use /bin/sh for Alpine-based images (bash is not installed there). If you get "exec: bash: not found", try /bin/sh.',
      },
      {
        id: 'C9',
        title: 'Generate Pod YAML with dry-run — never write from scratch',
        description: `Generate a Pod YAML for an nginx Pod named web-pod (image: nginx:1.25, port: 80) WITHOUT creating anything.
Save it to web-pod.yaml.
Then add a label  tier=frontend  to the file and apply it.`,
        solution: `# Generate and save to file (nothing is created yet):
kubectl run web-pod --image=nginx:1.25 --port=80 --dry-run=client -o yaml > web-pod.yaml

# Open the file:
vi web-pod.yaml

# Under metadata.labels, add:
#   tier: frontend

# Apply:
kubectl apply -f web-pod.yaml

# Verify:
kubectl get pods --show-labels
# NAME      READY   STATUS    ... LABELS
# web-pod   1/1     Running   ... run=web-pod,tier=frontend

# Flag breakdown:
# --dry-run=client  → go through all the motions but do NOT send to API server
# -o yaml           → print the object as YAML instead of a summary line
# > web-pod.yaml    → shell redirection: write output to file`,
        hint: '--dry-run=client -o yaml is the most important kubectl pattern for the CKA exam. Never write YAML from scratch — generate it, edit it, apply it.',
      },
      {
        id: 'C10',
        title: 'Get all info about a Pod — wide output and full YAML',
        description: `For the web-pod running from C8:
1. List it with extra columns (IP and Node)
2. Get the complete YAML as Kubernetes sees it`,
        solution: `# Extended view — adds IP address and Node name:
kubectl get pods -o wide
# NAME      READY   STATUS    RESTARTS   AGE   IP            NODE
# web-pod   1/1     Running   0          2m    10.244.1.15   kind-worker

# Full object YAML (includes status, uid, resourceVersion added by Kubernetes):
kubectl get pod web-pod -o yaml

# When to use -o wide:
# → Debugging network issues (which IP is this Pod at?)
# → Diagnosing node-level problems (are all broken Pods on the same node?)`,
        hint: '-o wide is your first tool when something is wrong at the network or scheduling level. The IP and Node columns are often the answer.',
      },
      {
        id: 'C11',
        title: 'Filter Pods by label',
        description: `You have two Pods running — hello-pod (app=hello) and web-pod (tier=frontend).
1. List only Pods with label app=hello
2. Show the labels column for all Pods
3. Add a new label  owner=me  to hello-pod without editing the YAML file`,
        solution: `# Filter by label:
kubectl get pods -l app=hello
# Only shows hello-pod

# Show labels column:
kubectl get pods --show-labels

# Add a label to a running Pod imperatively:
kubectl label pod hello-pod owner=me

# Verify:
kubectl get pod hello-pod --show-labels
# LABELS: app=hello,owner=me

# Change an existing label:
kubectl label pod hello-pod app=nginx --overwrite

# Remove a label (add a dash at the end of the label key):
kubectl label pod hello-pod owner-`,
        hint: 'Labels are the glue of Kubernetes — Services and ReplicaSets use them to find Pods. Always label your Pods, even in the exam. The -l flag uses the same selector syntax.',
      },
      {
        id: 'C12',
        title: 'Look up any YAML field without leaving the terminal',
        description: `Without opening a browser or this study guide, find:
1. What fields are available under pod.spec.containers?
2. What values are valid for pod.spec.restartPolicy?
3. What is the correct apiVersion for a Pod?`,
        solution: `# 1. Fields under containers:
kubectl explain pod.spec.containers

# 2. restartPolicy values (look at the DESCRIPTION field):
kubectl explain pod.spec.restartPolicy
# → Always, OnFailure, Never

# 3. Correct apiVersion:
kubectl api-resources | grep -i pod
# NAME   SHORTNAMES  APIVERSION  NAMESPACED  KIND
# pods   po          v1          true        Pod
# → apiVersion: v1

# kubectl explain is available during the CKA exam.
# Use it every time you forget a field name or valid value.`,
        hint: 'kubectl explain is your in-exam documentation. You can drill down as deep as needed: kubectl explain pod.spec.containers.resources.limits',
      },
      {
        id: 'C13',
        title: 'Schedule a Pod to a specific Node using nodeName',
        description: `Create a pod named 'pinned-pod' using the 'nginx' image.
Ensure this pod is scheduled exactly on the node 'cka-single'.
Verify the node assignment using the appropriate flag.`,
        solution: `# 1. Generate the YAML using dry-run
kubectl run pinned-pod --image=nginx --dry-run=client -o yaml > pinned.yaml

# 2. Edit the YAML
vi pinned.yaml
# Add nodeName under spec:
# spec:
#   nodeName: cka-single
#   containers: ...

# 3. Apply it
kubectl apply -f pinned.yaml

# 4. Verify node assignment
kubectl get pods -o wide`,
        hint: 'Use the nodeName field under the spec section in your Pod YAML to bypass the scheduler entirely.',
      },
      {
        id: 'C14',
        title: 'Schedule a Pod using nodeSelector',
        description: `1. Label your node 'cka-single' with 'environment=production'.
2. Create a pod named 'labeled-pod' using the 'nginx' image.
3. Configure the pod to only be scheduled on nodes with the 'environment=production' label.`,
        solution: `# 1. Label the node
kubectl label nodes cka-single environment=production

# 2. Generate the YAML using dry-run
kubectl run labeled-pod --image=nginx --dry-run=client -o yaml > labeled.yaml

# 3. Edit the YAML
vi labeled.yaml
# Add nodeSelector under spec:
# spec:
#   nodeSelector:
#     environment: production
#   containers: ...

# 4. Apply it
kubectl apply -f labeled.yaml`,
        hint: 'First label the node using `kubectl label nodes <node> <key>=<val>`. Then add nodeSelector under spec in the Pod YAML.',
      },
      {
        id: 'C15',
        title: 'Check declared resource requests and limits on a Pod',
        description: `The 'hello-pod' from C2 has resource requests and limits defined.
Without opening any file, find out:
- What CPU and memory is it requesting?
- What CPU and memory is it limited to?`,
        solution: `kubectl describe pod hello-pod
# Scroll to the Containers section. Look for:
#   Limits:
#     cpu:     200m
#     memory:  128Mi
#   Requests:
#     cpu:     100m
#     memory:  64Mi

# Alternatively, get the raw YAML:
kubectl get pod hello-pod -o yaml
# Look for the 'resources:' block under spec.containers`,
        hint: '`kubectl describe pod` is the fastest way. Scroll to the Containers section — requests and limits are listed right below the image name.',
      },
      {
        id: 'C16',
        title: 'Check actual live resource usage of a Pod',
        description: `Run a command to see the actual CPU and memory your 'hello-pod' is consuming right now (not what was declared, but what it is actually using).
What command do you need, and what output format should you expect?`,
        solution: `kubectl top pod hello-pod
# NAME        CPU(cores)   MEMORY(bytes)
# hello-pod   1m           3Mi

# To see all pods at once:
kubectl top pods

# NOTE: This requires the Metrics Server to be installed.
# On Kind, you may get "Metrics API not available" locally.
# In the CKA exam, the Metrics Server is pre-installed — this command will work.`,
        hint: '`kubectl top` shows live usage. `kubectl describe` shows declared limits. They are different things — do not confuse them in the exam.',
      },
      {
        id: 'C17',
        title: 'Clean up — delete Pods by name and by label',
        description: `Delete all the Pods created in this section.
Try both: deleting by Pod name and deleting all Pods matching a label.`,
        solution: `# Delete by name:
kubectl delete pod hello-pod web-pod

# Delete by label (deletes ALL pods with app=hello):
kubectl delete pods -l app=hello

# Delete using the YAML file:
kubectl delete -f hello-pod.yaml

# Verify everything is gone:
kubectl get pods
# No resources found in default namespace.`,
        hint: 'Deleting by label is powerful — and dangerous. Always double-check what matches your selector with kubectl get pods -l <selector> before running delete.',
      },
    ],
  },
  {
    id: 'RS',
    label: 'ReplicaSets',
    icon: 'bi-diagram-2-fill',
    color: 'text-info',
    borderColor: 'border-info',
    badgeClass: 'bg-info',
    docHref: '/cka/core-concepts/replicaset',
    tasks: [
      {
        id: 'RS1',
        title: 'Create a ReplicaSet YAML and Apply',
        description: 'Write a ReplicaSet manifest named `nginx-rs.yaml` with 3 replicas, using the `nginx:1.25` image, matching selector `app=frontend`, and container port 80. Then apply it.',
        solution: `# Save to nginx-rs.yaml:
cat <<EOF > nginx-rs.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-rs
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
EOF

# Apply:
kubectl apply -f nginx-rs.yaml`,
        hint: 'ReplicaSet uses `apiVersion: apps/v1`. Ensure `spec.selector.matchLabels` matches `spec.template.metadata.labels` exactly.',
      },
      {
        id: 'RS2',
        title: 'Verify ReplicaSet Status & Created Pods',
        description: 'Inspect the newly created ReplicaSet and list all Pods managed by it.',
        solution: `kubectl get replicaset nginx-rs
kubectl get rs
kubectl get pods -l app=frontend`,
        hint: 'Check that DESIRED, CURRENT, and READY columns show 3.',
      },
      {
        id: 'RS3',
        title: 'Observe Self-Healing',
        description: 'Delete one of the Pods created by `nginx-rs` and verify that the ReplicaSet automatically creates a replacement Pod.',
        solution: `# Get pod name:
kubectl get pods -l app=frontend

# Delete one pod:
kubectl delete pod <pod-name>

# Immediately check pods:
kubectl get pods -l app=frontend`,
        hint: 'ReplicaSet constantly monitors cluster state and replaces missing Pods automatically.',
      },
      {
        id: 'RS4',
        title: 'Scale a ReplicaSet Imperatively',
        description: 'Scale the `nginx-rs` ReplicaSet from 3 replicas up to 5 replicas using `kubectl scale`.',
        solution: `kubectl scale replicaset nginx-rs --replicas=5

# Verify:
kubectl get rs nginx-rs`,
        hint: '`kubectl scale rs <name> --replicas=<count>` is the fastest speed trick for CKA.',
      },
      {
        id: 'RS5',
        title: 'Scale a ReplicaSet Live via Edit',
        description: 'Scale `nginx-rs` down to 2 replicas using `kubectl edit`.',
        solution: `kubectl edit rs nginx-rs
# Change "replicas: 5" to "replicas: 2", save and exit (:wq)

# Verify:
kubectl get rs nginx-rs`,
        hint: '`kubectl edit` edits live cluster resources in your default terminal text editor.',
      },
      {
        id: 'RS6',
        title: 'Delete ReplicaSet with Orphaned Pods',
        description: 'Delete the `nginx-rs` ReplicaSet without deleting its running Pods (keep Pods running as orphans).',
        solution: `kubectl delete rs nginx-rs --cascade=orphan

# Verify RS is gone but Pods are still running:
kubectl get rs
kubectl get pods`,
        hint: 'Use `--cascade=orphan` to delete the controller without deleting the managed Pods.',
      },
      {
        id: 'RS7',
        title: 'Troubleshoot Selector Mismatch in ReplicaSet',
        description: 'Fix the issue in this ReplicaSet manifest:\n\n```yaml\napiVersion: apps/v1\nkind: ReplicaSet\nmetadata:\n  name: my-rs\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      tier: frontend\n  template:\n    metadata:\n      labels:\n        tier: web\n    spec:\n      containers:\n      - name: nginx\n        image: nginx\n```',
        solution: `# Issue: selector.matchLabels has "tier: frontend", but template.metadata.labels has "tier: web".

# Fixed YAML:
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-rs
spec:
  replicas: 2
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx`,
        hint: 'The selector labels must match the template metadata labels exactly.',
      },
      {
        id: 'RS8',
        title: 'Complex Debugging 1: Pod Adoption & Replica Eviction Conflict',
        description: `Scenario: You apply a ReplicaSet with replicas=2 and selector app=payment. But when you run kubectl get pods, you see 5 running pods with app=payment, and the ReplicaSet is actively deleting 3 pods that belong to another application!

What caused this bug, how do you debug it, and how do you resolve it safely?`,
        solution: `# Diagnosis:
# Another workload (or standalone Pods) were created with the label app=payment.
# Because ReplicaSets track Pods strictly via selector labels, this ReplicaSet "adopted" all 5 pods in the namespace matching app=payment.
# Since desired replicas=2, the ReplicaSet started terminating 3 of those pods to reconcile state to 2!

# Debug steps:
kubectl get pods -l app=payment --show-labels
kubectl describe rs <replicaset-name>

# Fix:
# 1. Update the ReplicaSet's spec.selector.matchLabels and spec.template.metadata.labels to a more specific/unique label (e.g. app=payment, tier=backend, release=v1).
# 2. Re-apply or edit the ReplicaSet object:
kubectl edit rs <replicaset-name>`,
        hint: 'ReplicaSets adopt any Pods matching `spec.selector.matchLabels` regardless of who created them.',
      },
      {
        id: 'RS9',
        title: 'Complex Debugging 2: Image Update Does Not Restart Pods',
        description: `Scenario: A developer updated the image in an existing ReplicaSet manifest from nginx:1.24 to nginx:1.25 and ran kubectl apply -f rs.yaml.
However, running kubectl get pods -o wide shows that all running Pods are still using nginx:1.24!

Why didn't the Pods update to nginx:1.25, and how do you force the update?`,
        solution: `# Diagnosis:
# ReplicaSets ONLY reconcile the NUMBER of running Pods (count). 
# They DO NOT perform rolling updates or restart existing Pods when the pod template changes!

# Fix Option A (Manual Pod deletion):
# Manually delete existing Pods. As the ReplicaSet replaces them, new Pods will use nginx:1.25:
kubectl delete pod -l app=nginx

# Fix Option B (Production standard):
# Migrate the workload from a ReplicaSet to a Deployment, which supports automated rolling updates via "kubectl set image" or "kubectl apply".`,
        hint: 'ReplicaSets do not update existing Pods on template changes. You must delete Pods manually or use a Deployment.',
      },
      {
        id: 'RS10',
        title: 'Complex Debugging 3: ImagePullBackOff + FailedCreate Event Analysis',
        description: `Scenario: A ReplicaSet named web-rs shows DESIRED=3, CURRENT=0, READY=0.
Running kubectl get pods shows no Pods running or created.

How do you debug why the ReplicaSet is unable to create Pods or why Pods are stuck?`,
        solution: `# Step 1: Inspect ReplicaSet events
kubectl describe rs web-rs

# Look at the "Events:" section at the bottom.
# Common failure causes revealed in RS events:
# - FailedCreate: quota exceeded (ResourceQuota limit reached)
# - FailedCreate: invalid spec or nonexistent secret/configmap referenced
# - FailedCreate: forbidden PSP or SecurityContext restriction

# Step 2: If Pods WERE created but are failing to start:
kubectl get pods -l app=web
kubectl describe pod <pod-name>
kubectl logs <pod-name>

# Common pod causes: ImagePullBackOff (invalid image tag/private registry) or CrashLoopBackOff.`,
        hint: 'Always check `kubectl describe rs <rs-name>` events first when DESIRED > 0 but CURRENT = 0.',
      },
    ],
  },
  {
    id: 'D',
    label: 'Deployments',
    icon: 'bi-layers-fill',
    color: 'text-warning',
    borderColor: 'border-warning',
    badgeClass: 'bg-warning',
    docHref: '/cka/core-concepts/deployment',
    tasks: [
      {
        id: 'D1',
        title: 'Create a Deployment named nginx',
        description: 'Create a Deployment named nginx with 3 replicas. The Pods should use the nginx:1.23.0 image and the name nginx. The Deployment uses the label tier=backend. The Pod template should use the label app=v1.',
        solution: `# Step 1: Generate YAML with dry-run
kubectl create deployment nginx --image=nginx:1.23.0 --replicas=3 --dry-run=client -o yaml > deploy.yaml

# Step 2: Edit deploy.yaml to set Deployment label tier=backend and Pod label app=v1
# metadata.labels: tier=backend
# spec.selector.matchLabels: app=v1
# spec.template.metadata.labels: app=v1

# Step 3: Apply
kubectl apply -f deploy.yaml`,
        hint: 'Generate the base manifest using `kubectl create deployment --dry-run=client -o yaml > deploy.yaml`, then update the labels before applying.',
      },
      {
        id: 'D2',
        title: 'List the Deployment and verify replicas',
        description: 'List the Deployment and ensure the correct number of replicas is running.',
        solution: `kubectl get deployment nginx
kubectl get pods -l app=v1`,
        hint: 'Check that READY column shows 3/3.',
      },
      {
        id: 'D3',
        title: 'Update the image to nginx:1.23.4 (Upgrade)',
        description: 'Update the container image of the nginx Deployment to nginx:1.23.4.',
        solution: 'kubectl set image deployment/nginx nginx=nginx:1.23.4',
        hint: 'Use `kubectl set image deployment/<deployment-name> <container-name>=<new-image>`.',
      },
      {
        id: 'D4',
        title: 'Verify rollout status and container image',
        description: 'Verify that the change has been rolled out to all replicas.',
        solution: `kubectl rollout status deployment/nginx
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'`,
        hint: 'Use `kubectl rollout status` to track completion.',
      },
      {
        id: 'D5',
        title: 'Assign change cause annotation',
        description: 'Assign the change cause "Pick up patch version" to the revision.',
        solution: 'kubectl annotate deployment/nginx kubernetes.io/change-cause="Pick up patch version" --overwrite',
        hint: 'Set the annotation key `kubernetes.io/change-cause`.',
      },
      {
        id: 'D6',
        title: 'Scale the Deployment',
        description: 'Scale the Deployment to 5 replicas.',
        solution: 'kubectl scale deployment nginx --replicas=5',
        hint: 'Use `kubectl scale deployment nginx --replicas=5`.',
      },
      {
        id: 'D7',
        title: 'View Deployment rollout history',
        description: 'Have a look at the Deployment rollout history.',
        solution: 'kubectl rollout history deployment/nginx',
        hint: 'Use `kubectl rollout history deployment/<name>`.',
      },
      {
        id: 'D8',
        title: 'Revert Deployment to revision 1 (Rollback)',
        description: 'Revert the Deployment to revision 1.',
        solution: 'kubectl rollout undo deployment/nginx --to-revision=1',
        hint: 'Use `kubectl rollout undo deployment/<name> --to-revision=1`.',
      },
      {
        id: 'D9',
        title: 'Verify image version after rollback',
        description: 'Ensure that the Pods use the image nginx:1.23.0.',
        solution: `kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'
kubectl describe deployment nginx | grep -i image`,
        hint: 'Check container image spec using jsonpath or describe.',
      },
      {
        id: 'D10',
        title: 'Troubleshoot issue 1: Invalid apiVersion',
        description: `Apply the below YAML and fix the issue with it:

\`\`\`yaml
apiVersion: v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    env: demo
spec:
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
        - containerPort: 80
  replicas: 3
  selector:
    matchLabels:
      env: demo
\`\`\``,
        solution: `# Issue: "apiVersion: v1" is invalid for Deployment. Deployments belong to the "apps/v1" API group.

# Fixed YAML:
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
        - containerPort: 80`,
        hint: 'Deployments must use `apiVersion: apps/v1`. Core `v1` is only for Pods, Services, Namespaces, etc.',
      },
      {
        id: 'D11',
        title: 'Troubleshoot issue 2: Selector label mismatch & apiVersion',
        description: `Apply the below YAML and fix the issue with it:

\`\`\`yaml
apiVersion: v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    env: demo
spec:
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
        - containerPort: 80
  replicas: 3
  selector:
    matchLabels:
      env: dev
\`\`\``,
        solution: `# Issues:
# 1. "apiVersion: v1" is invalid for Deployment (must be "apps/v1").
# 2. Selector mismatch: matchLabels has "env: dev", but pod template metadata has "env: demo". They must match exactly!

# Fixed YAML:
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
        - containerPort: 80`,
        hint: '1) Change `apiVersion` to `apps/v1`. 2) Ensure `spec.selector.matchLabels` matches `spec.template.metadata.labels` (`env: demo`).',
      },
    ],
  },
];

export default function PracticeTasksPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ A: true });

  const toggleReveal = (id: string) =>
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleGroup = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-warning text-dark fs-5 p-2">Interactive Drill</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Practice Tasks</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Try each task yourself before revealing the solution. Click a group header to expand it.
        </p>
      </div>

      <div className="doc-content-grid">
        {TASK_GROUPS.map(group => {
          const isOpen = !!expanded[group.id];
          return (
            <div key={group.id} className={`doc-section-card shadow-lg ${group.borderColor} mb-4`}>

              {/* GROUP HEADER — clickable */}
              <div
                className="doc-card-header-wrapper"
                onClick={() => toggleGroup(group.id)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div className={`heading-icon ${group.color}`}>
                  <i className={`bi ${group.icon}`}></i>
                </div>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center gap-3">
                    <h2 className={`doc-card-heading ${group.color} mb-0`}>{group.label}</h2>
                    <span className={`badge ${group.badgeClass} text-dark`} style={{ fontSize: '0.75rem' }}>
                      {group.tasks.length} tasks
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      href={group.docHref}
                      className="btn btn-sm btn-outline-secondary text-nowrap"
                      style={{ fontSize: '0.75rem' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <i className="bi bi-book me-1"></i>Study Notes
                    </a>
                    <i
                      className="bi bi-chevron-down text-secondary"
                      style={{
                        fontSize: '1rem',
                        transition: 'transform 0.2s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'block',
                      }}
                    ></i>
                  </div>
                </div>
              </div>

              {/* TASKS — shown when group is open */}
              {isOpen && (
                <div className="doc-card-body pt-0">
                  <p className="text-secondary x-small mb-4">
                    Group <strong className="text-light">{group.id}</strong>
                    {' · '}Tasks numbered {group.id}1–{group.id}{group.tasks.length}
                  </p>

                  {group.tasks.map((task, idx) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded border border-secondary border-opacity-25 bg-dark${
                        idx < group.tasks.length - 1 ? ' mb-3' : ''
                      }`}
                    >
                      <div className="d-flex align-items-start gap-2 mb-2">
                        <span
                          className={`badge ${group.badgeClass} text-dark flex-shrink-0 mt-1`}
                          style={{ fontSize: '0.8rem', minWidth: '2.4rem', textAlign: 'center' }}
                        >
                          {task.id}
                        </span>
                        <h5 className="text-light fw-bold mb-0" style={{ fontSize: '1rem' }}>
                          {task.title}
                        </h5>
                      </div>

                      <div className="text-secondary small ms-4 mb-3" style={{ whiteSpace: 'pre-line' }}>
                        {task.description}
                      </div>

                      <div className="ms-4 pt-2 border-top border-secondary border-opacity-25">
                        <button
                          className={revealed[task.id] ? 'btn btn-sm btn-outline-secondary' : 'btn btn-sm btn-outline-warning'}
                          onClick={() => toggleReveal(task.id)}
                        >
                          {revealed[task.id] ? 'Hide Solution' : 'Reveal Solution'}
                        </button>

                        {revealed[task.id] && (
                          <div className="mt-3 animation-fade-in">
                            {task.hint && (
                              <div className="mb-2 text-info x-small">
                                <i className="bi bi-lightbulb-fill me-2"></i>
                                {task.hint}
                              </div>
                            )}
                            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mt-1">
                              {task.solution}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
