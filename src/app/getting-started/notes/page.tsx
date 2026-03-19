import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Getting Started Revision Notes - Docker Documentation",
  description: "A quick reference guide summarizing all key concepts, mental models, and technical details from the Getting Started section."
};

export default function RevisionNotesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Getting Started: Revision Notes</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            A quick reference guide summarizing all key concepts, mental models, and technical details from the Getting Started section.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* Core Mental Models */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightbulb-fill"}></i>
              </div>
              <h2 className="doc-card-heading">1. The Core Mental Models</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-box-seam-fill"></i></div>
                    <h3 class="doc-sub-card-title">Images vs. Containers</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p><strong>The Concept:</strong> An Image is a read-only template, and a Container is a running instance of that template.</p>
                    <p><strong>Noob-Friendly Example:</strong> An Image is the <strong>"Frozen Pizza"</strong> (the recipe and raw ingredients frozen in time). A Container is the <strong>"Cooked Pizza"</strong> coming out of the oven. You can cook exactly the same pizza 100 times from the same frozen box. <a href="/getting-started/images-containers" class="text-primary text-decoration-underline ms-2">Read more</a></p>
                  </div>
                </div>

                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-layers-fill"></i></div>
                    <h3 class="doc-sub-card-title">Docker Layers (UnionFS)</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p><strong>The Concept:</strong> Images are composed of multiple immutable layers stacked on top of each other. They allow maximum caching and re-usability.</p>
                    <p><strong>Noob-Friendly Example:</strong> It's like a <strong>"Layer Cake"</strong>. Layer 1 is the Crust (Base OS), Layer 2 is the Sauce (Node.js), Layer 3 is the Cheese (Your Code). If you change your code (Cheese), you don't rebuild the Crust and Sauce—you reuse them! <a href="/getting-started/layers" class="text-primary text-decoration-underline ms-2">Read more</a></p>
                  </div>
                </div>

                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-laptop"></i></div>
                    <h3 class="doc-sub-card-title">VMs vs. Docker Containers</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p><strong>The Concept:</strong> Virtual Machines emulate hardware and run a full OS. Containers share the Host OS kernel.</p>
                    <p><strong>Noob-Friendly Example:</strong> A VM is like buying a whole new <strong>"House"</strong> with its own plumbing and electricity just for one person. A Container is like renting an <strong>"Apartment"</strong>—everyone shares the main building's electricity (the Kernel), but keeps their own private space. <a href="/getting-started/virtual-machines" class="text-primary text-decoration-underline ms-2">Read more</a></p>
                  </div>
                </div>
              </div>` }} />
            </div>
          </div>

          {/* Architecture & Mechanics */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-cpu-fill"}></i>
              </div>
              <h2 className="doc-card-heading">2. Architecture & Under the Hood Mechanics</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
                <div class="doc-sub-card border-info">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-server text-info"></i></div>
                    <h3 class="doc-sub-card-title text-info">Client-Server Model</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
                      <li><strong>Docker Client:</strong> The "Remote Control" you use in your terminal (<code>docker run</code>).</li>
                      <li><strong>Docker Daemon:</strong> The "Brain" (<code>dockerd</code>) running in the background doing the heavy lifting.</li>
                      <li><strong>Registry:</strong> The "Warehouse" (like Docker Hub) where images are stored.</li>
                    </ul>
                    <a href="/getting-started/docker-architecture" class="text-primary text-decoration-underline d-inline-block mt-2">Read more</a>
                  </div>
                </div>

                <div class="doc-sub-card border-warning">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-layout-wtf text-warning"></i></div>
                    <h3 class="doc-sub-card-title text-warning">Namespaces vs cgroups</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p>The two pillars of Linux containerization:</p>
                    <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
                      <li><strong>Namespaces (Isolation):</strong> The <strong>"Magic Blinders"</strong>. They make the container think it has its own private process tree (PID), network (NET), and filesystem (MNT).</li>
                      <li><strong>cgroups (Resources):</strong> The <strong>"Budget"</strong>. They limit how much CPU or RAM a container can use, preventing a single hungry app from taking down the whole host.</li>
                    </ul>
                    <a href="/getting-started/docker-architecture" class="text-primary text-decoration-underline d-inline-block mt-2">Read more</a>
                  </div>
                </div>
              </div>` }} />
            </div>
          </div>

          {/* Storage & Data */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-hdd-fill"}></i>
              </div>
              <h2 className="doc-card-heading">3. Managing State (Data Persistence)</h2>
            </div>
            <div className="doc-card-body">
               <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
                <div class="doc-sub-card border-danger border-opacity-25">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-exclamation-triangle-fill text-danger"></i></div>
                    <h3 class="doc-sub-card-title text-danger">The Amnesia Effect</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p>Containers are ephemeral. Just like a <strong>"Goldfish"</strong>, they forget everything inside their internal writable layer when restarted. If you put database rows inside the container memory, they are deleted forever when the container dies.</p>
                  </div>
                </div>

                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-safe-fill"></i></div>
                    <h3 class="doc-sub-card-title">Volumes vs. Bind Mounts</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
                      <li><strong>Volumes (The External Hard Drive):</strong> Managed entirely by Docker inside a hidden root directory. The safest way to store Database data or uploads. They survive container deletions.</li>
                      <li><strong>Bind Mounts (The Open Window):</strong> Directly linking a folder from your actual OS (e.g., your Desktop project folder) into the container. Excellent for <strong>"Live Reloading"</strong> during development.</li>
                    </ul>
                    <a href="/getting-started/volumes-bind-mounts" class="text-primary text-decoration-underline d-inline-block mt-2">Read more</a>
                  </div>
                </div>
              </div>` }} />
            </div>
          </div>

          {/* Clustering & Swarm */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-diagram-3-fill"}></i>
              </div>
              <h2 className="doc-card-heading">4. Clustering & Swarm (Orchestration)</h2>
            </div>
            <div className="doc-card-body">
               <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
               
                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-diagram-2"></i></div>
                    <h3 class="doc-sub-card-title">Cluster vs Load Balancer</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <p>An AWS Load Balancer is a <strong>"Traffic Cop"</strong>. A Cluster Orchestrator (like Swarm or Kubernetes) is the <strong>"Restaurant Manager"</strong>—it directs traffic AND manages hiring/firing nodes and healing broken containers. <a href="/getting-started/cluster" class="text-primary text-decoration-underline ms-2">Read more</a></p>
                  </div>
                </div>

                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-people-fill"></i></div>
                    <h3 class="doc-sub-card-title">Swarm Roles: Manager vs Worker</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
                      <li><strong>Manager Nodes (The Brain):</strong> Wears the "Boss Hat". Maintains the desired state, holds elections via Raft Consensus, and assigns workloads.</li>
                      <li><strong>Worker Nodes (The Muscle):</strong> Mindlessly execute tasks assigned by the manager.</li>
                    </ul>
                  </div>
                </div>

                <div class="doc-sub-card">
                  <div class="doc-sub-card-header">
                    <div class="doc-sub-card-icon"><i class="bi bi-activity"></i></div>
                    <h3 class="doc-sub-card-title">Failure Detection & Routing</h3>
                  </div>
                  <div class="doc-sub-card-body">
                    <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
                      <li><strong>Silence is the Signal:</strong> Managers expect constant Heartbeats. If a leader stops talking, elections trigger. If a worker goes silent, tasks are immediately moved.</li>
                      <li><strong>Single Manager Crash:</strong> Workers go "blind" but keep running existing tasks. Self-healing stops. (FROZEN state).</li>
                      <li><strong>Routing Persistence:</strong> The Network Plane (Routing Mesh IPVS) is decentralized. Because every worker has a "Map", traffic still reaches running containers even if the "GPS Manager" crashes.</li>
                    </ul>
                    <a href="/getting-started/swarm" class="text-primary text-decoration-underline d-inline-block mt-2">Read more</a>
                  </div>
                </div>

              </div>` }} />
            </div>
          </div>

          {/* Quick Rules */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-list-check"}></i>
              </div>
              <h2 className="doc-card-heading">5. The 10 Golden Rules (Quick Reference)</h2>
            </div>
            <div className="doc-card-body">
               <div dangerouslySetInnerHTML={{ __html: `<ul style="color:var(--text-secondary);line-height:2.2;padding-left:1.5rem">
                  <li><strong>1. Invisible File:</strong> Deleting a file in a later layer only masks it. Remove files in the same <code>RUN</code> layer using <code>&& rm</code>.</li>
                  <li><strong>2. PID 1 (Life Spark):</strong> A container dies the exact moment its PID 1 process finishes.</li>
                  <li><strong>3. Namespaces vs cgroups:</strong> Namespace = Isolation (Visibility). cgroup = Limits (Resources).</li>
                  <li><strong>4. UnionFS Tax:</strong> Layer merging causes heavy disk overhead. Use Volumes for high I/O (Databases).</li>
                  <li><strong>5. Layer Cake Cache:</strong> Put heavy, unchanging commands (like <code>apt-get install</code>) at the top of your Dockerfile, and your fast-changing source code at the bottom.</li>
                  <li><strong>6. Amnesia:</strong> Don't write permanent state directly into a container. Once deleted, all internal data vanishes.</li>
                  <li><strong>7. Architecture Match:</strong> Ensure the image's CPU architecture matches the server where it'll run (ARM vs AMD/x86).</li>
                  <li><strong>8. Stop vs Kill:</strong> <code>SIGTERM</code> (Stop) gives the app grace time to save before quitting. <code>SIGKILL</code> kills instantly.</li>
                  <li><strong>9. Mount Priority:</strong> Mounting a volume hides the existing files underneath it like a tablecloth.</li>
                  <li><strong>10. Multi-Stage Slimming:</strong> Build inside a fat container (kitchen), copy only the final binary to a slim container (dining table), and discard the compiler junk (flour mess).</li>
               </ul>
               <a href="/getting-started/rules-and-case-studies" class="text-primary text-decoration-underline d-inline-block mt-3">Read full rules & case studies</a>
               ` }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
