import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Docker Architecture - Docker Documentation",
  description: "Understand how Docker works under the hood - client-server model, namespaces, cgroups, and union file system."
};

export default function DockerArchitecturePage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Docker Architecture</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Understand how Docker works under the hood - client-server model, namespaces, cgroups, and union file system.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-cpu-fill"}></i>
              </div>
              <h2 className="doc-card-heading">How Docker Actually Works (The Architecture)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Docker isn't one single program; its a team of components working together in a <strong>Client-Server relationship</strong>.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-terminal-fill"></i></div>
      <h3 class="doc-sub-card-title">The Docker Client (The Remote)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is you. When you type <code>docker run</code>, you are using the Client. Its just a <strong>messenger</strong> that sends your "orders" to the brain.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu-fill"></i></div>
      <h3 class="doc-sub-card-title">The Docker Daemon / Host (The Brain)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is a background service called <code>dockerd</code> that lives on your computer. It does the <strong>heavy lifting</strong>: building, running, and managing your containers.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shop-window"></i></div>
      <h3 class="doc-sub-card-title">The Registry (The Warehouse)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is where Images are stored (like <strong>Docker Hub</strong>).</p>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-magic"}></i>
              </div>
              <h2 className="doc-card-heading">The "Secret Sauce" (Linux Magic)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Docker doesn't invent "containers" from scratch; it uses two powerful features already built into the Linux Kernel to create the "illusion" of an isolated computer.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-eye-slash-fill"></i></div>
      <h3 class="doc-sub-card-title">A. Namespaces (The "Magic Blinders")</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Namespaces provide <strong>Isolation</strong>. When a container starts, Docker creates a "Namespace" for it.</p>
      <ul style="color:var(--text-secondary);line-height:1.6;padding-left:1.5rem;margin-bottom:1rem">
        <li><strong>PID Namespace:</strong> The container thinks its main process is "Process #1," even if your real computer has 3,000 other processes.</li>
        <li><strong>NET Namespace:</strong> The container gets its own virtual network card and IP address.</li>
        <li><strong>MNT Namespace:</strong> The container thinks its folder is the "Root" (/) of the machine.</li>
      </ul>
      <div class="doc-alert doc-alert-info" style="margin-top:0.5rem">
        <i class="bi bi-lightbulb-fill"></i>
        <div><strong>Analogy:</strong> Its like a horse wearing blinders; it can only see whats directly in front of it and doesn't know the rest of the world exists.</div>
      </div>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-bar-chart-steps"></i></div>
      <h3 class="doc-sub-card-title">B. Control Groups / cgroups (The "Budget")</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>If Namespaces provide privacy, <strong>cgroups</strong> provide <strong>Limits</strong>.</p>
      <p>They make sure a single "greedy" container doesn't eat all your RAM or CPU and crash your entire laptop.</p>
      <div class="doc-alert doc-alert-info" style="margin-top:0.5rem">
        <i class="bi bi-cash-stack"></i>
        <div><strong>Analogy:</strong> Its like a parent giving a kid an allowance. "You can play, but you only have $20 and 2 hours."</div>
      </div>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-layers-fill"}></i>
              </div>
              <h2 className="doc-card-heading">The "Union File System" (The Layer Cake)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>This is how Docker stays so tiny (MBs instead of GBs). Images are made of <strong>Layers</strong>.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-card">
  <div class="doc-sub-card-body">
    <p><strong>Example: Creating a PHP App on Ubuntu</strong></p>
    <p>Imagine you are building a website using PHP. Here is how Docker stacks those layers:</p>
    <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem;margin-bottom:1.5rem">
      <li><strong>Layer 1:</strong> Base OS (e.g., Ubuntu 22.04) - <em>Read Only</em></li>
      <li><strong>Layer 2:</strong> PHP & Apache (Installed via <code>apt-get</code>) - <em>Read Only</em></li>
      <li><strong>Layer 3:</strong> Your PHP Code (<code>index.php</code>) - <em>Read Only</em></li>
      <li><strong>Layer 4:</strong> Configuration (<code>php.ini</code>) - <em>Read Only</em></li>
      <li><strong>The Container Layer:</strong> Temporary files/session data - <strong>Read/Write</strong></li>
    </ul>
    <p><strong>Why is this cool?</strong> If you have 10 different PHP apps all based on the same "Ubuntu + PHP" image, Docker only stores <strong>one copy</strong> of those bottom layers on your hard drive. They all "share" the heavy stuff and only keep their own unique code and temporary data in the tiny top layer.</p>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-shield-check"}></i>
              </div>
              <h2 className="doc-card-heading">The Immutability Secret (Cattle vs. Pets)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>In the Docker world, we don't treat containers like "Pets" that we nurse back to health. We treat them like <strong>Cattle</strong>: if one is broken, we replace it with a fresh one.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
<div class="doc-sub-card">
<div class="doc-sub-card-header">
<div class="doc-sub-card-icon"><i class="bi bi-pencil-square"></i></div>
<h3 class="doc-sub-card-title">The "Copy-on-Write" Magic</h3>
</div>
<div class="doc-sub-card-body">
<p>Image layers are<strong>Read-Only</strong>. When you "change" a file inside a container:
<ol style="color:var(--text-secondary);line-height:1.6;padding-left:1.5rem;margin-top:0.5rem">
<li>Docker<strong>copies</strong>it from the read-only layer to the top<strong>Read/Write layer</strong>.</li>
<li>You edit the copy, and the original remains safe below.</li>
</ol>
</p>
</div>
</div>

<div class="doc-sub-card">
<div class="doc-sub-card-header">
<div class="doc-sub-card-icon"><i class="bi bi-bug-fill"></i></div>
<h3 class="doc-sub-card-title">Scenario: Fixing a Production Bug</h3>
</div>
<div class="doc-sub-card-body">
<p>Imagine you accidentally left a<code>die();</code>in your PHP code on the server. How do you fix it?</p>
 
<p style="margin-top:1rem"><strong>The "Bandaid" Way (Beginner):</strong><br/>
 You<code>docker exec</code>into the container and edit the file manually.
<span style="color:var(--text-warning);display:block;margin-top:0.3rem"><em>Risk: The moment the container restarts, your fix is GONE!</em></span></p>

<p style="margin-top:1rem"><strong>The "Pro" Way (Immutable):</strong><br/>
 1. Fix the code on your machine.<br/>
 2. Build a<strong>new image</strong>(<code>v2</code>).<br/>
 3. Kill the buggy container and start a new one from<code>v2</code>.<br/>
<span style="color:#28a745;display:block;margin-top:0.3rem"><em>Result: Your fix is permanent and documented in the image.</em></span></p>
</div>
</div>
</div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
