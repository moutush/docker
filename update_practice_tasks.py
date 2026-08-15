import re

with open("src/app/cka/practice-tasks/page.tsx", "r") as f:
    content = f.read()

# 1. Increment C ids
def increment_c_id(match):
    num = int(match.group(1))
    return f"id: 'C{num+1}'"

# Find the section C tasks block to avoid accidentally matching something else.
# Looking for `id: 'C',` which is the start of the section.
c_section_start = content.find("id: 'C',")

if c_section_start != -1:
    before_c = content[:c_section_start]
    c_and_after = content[c_section_start:]
    
    # We only increment IDs like id: 'C1', id: 'C2', etc. (not id: 'C')
    c_and_after = re.sub(r"id: 'C(\d+)'", increment_c_id, c_and_after)
    
    content = before_c + c_and_after
    
# 2. Update C2 (which was C1) and insert C1
old_c2 = """      {
        id: 'C2',
        title: 'Create a Pod — declaratively',
        description: `Write a Pod manifest named hello-pod.yaml with the following spec and apply it:
- name: hello-pod
- label:  app=hello
- image:  nginx:1.25
- port:   80
- restartPolicy: Always`,
        solution: `# hello-pod.yaml:
apiVersion: v1
kind: Pod
metadata:
  name: hello-pod
  labels:
    app: hello
spec:
  containers:
    - name: hello
      image: nginx:1.25
      ports:
        - containerPort: 80
  restartPolicy: Always

# Apply it:
kubectl apply -f hello-pod.yaml
# Output: pod/hello-pod created`,
        hint: 'Remember: apiVersion for Pods is v1. containers is a list (starts with -). labels go under metadata, not spec.',
      },"""

new_c1_and_c2 = """      {
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
      },"""

if old_c2 in content:
    content = content.replace(old_c2, new_c1_and_c2)
    with open("src/app/cka/practice-tasks/page.tsx", "w") as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find old C2 block")
