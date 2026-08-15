import re

with open("src/app/cka/core-concepts/pods/page.tsx", "r") as f:
    content = f.read()

# Extract the sections using regex
# We will match the entire Section 6 and Section 7 blocks.
# Using standard string manipulation because regex might be tricky with large text
sec6_start = content.find("{/* ── SECTION 6: HANDS-ON WORKFLOW")
sec7_start = content.find("{/* ── SECTION 7: DRY RUN WORKFLOW")
sec8_start = content.find("{/* ── SECTION 8: GET ALL INFO")

if sec6_start != -1 and sec7_start != -1 and sec8_start != -1:
    pre_sec6 = content[:sec6_start]
    sec6_content = content[sec6_start:sec7_start]
    sec7_content = content[sec7_start:sec8_start]
    post_sec7 = content[sec8_start:]
    
    # 1. Update Section Titles
    # Change Section 6 to Section 7 in its content
    sec6_content = sec6_content.replace("SECTION 6: HANDS-ON WORKFLOW", "SECTION 7: HANDS-ON WORKFLOW")
    sec6_content = sec6_content.replace("6. Hands-On", "7. Hands-On")
    
    # Change Section 7 to Section 6 in its content
    sec7_content = sec7_content.replace("SECTION 7: DRY RUN WORKFLOW", "SECTION 6: DRY RUN WORKFLOW")
    sec7_content = sec7_content.replace("7. Why Not", "6. Why Not")
    
    # 2. Update Step 2 in Hands-On Workflow
    old_step2 = """            {/* Step 2 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 2</span>Create the hello-pod
              </h6>
              <p className="text-secondary small mb-2">Save the YAML from Section 4 as <code>hello-pod.yaml</code>, then apply it:</p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl apply -f hello-pod.yaml
# Output: pod/hello-pod created`}
              </pre>
            </div>"""
    
    new_step2 = """            {/* Step 2 */}
            <div className="mb-4 pb-4 border-bottom border-secondary border-opacity-25">
              <h6 className="text-light fw-bold mb-2">
                <span className="badge bg-success text-dark me-2">Step 2</span>Create the hello-pod
              </h6>
              <p className="text-secondary small mb-2">Generate the Pod YAML using dry-run, then apply it:</p>
              <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small mb-0">
{`kubectl run hello-pod --image=nginx:1.25 --dry-run=client -o yaml > hello-pod.yaml
kubectl apply -f hello-pod.yaml
# Output: pod/hello-pod created`}
              </pre>
            </div>"""
            
    sec6_content = sec6_content.replace(old_step2, new_step2)
    
    # 3. Assemble and save
    new_content = pre_sec6 + sec7_content + sec6_content + post_sec7
    
    with open("src/app/cka/core-concepts/pods/page.tsx", "w") as f:
        f.write(new_content)
    print("Success")
else:
    print("Could not find sections")

