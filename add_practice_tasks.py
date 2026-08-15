import re

with open("src/app/cka/practice-tasks/page.tsx", "r") as f:
    content = f.read()

# Rename C13 to C15
content = content.replace("id: 'C13',", "id: 'C15',")

new_tasks = """      {
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
"""

# Insert right before C15
insert_idx = content.find("id: 'C15',")
if insert_idx != -1:
    # Go back to the start of the C15 object `      {\n        id: 'C15',`
    insert_block = content.rfind("      {", 0, insert_idx)
    content = content[:insert_block] + new_tasks + content[insert_block:]
    
    with open("src/app/cka/practice-tasks/page.tsx", "w") as f:
        f.write(content)
    print("Practice tasks updated successfully.")
else:
    print("Could not find insertion point in practice-tasks/page.tsx")
