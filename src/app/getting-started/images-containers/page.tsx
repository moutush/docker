import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Images and Containers - Docker Documentation",
  description: "Understand the fundamental difference between Docker images (blueprints) and containers (running instances)."
};

export default function ImagesAndContainersPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Images and Containers</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Understand the fundamental difference between Docker images (blueprints) and containers (running instances).
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-layers-fill"}></i>
              </div>
              <h2 className="doc-card-heading">So, What Exactly is an Image?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>A Docker Image is the <strong>blueprint</strong>. It is a read-only, static snapshot that contains everything needed to run your app.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Think of it like a <strong>class in programming</strong> — it's the definition, not the running thing. Or think of it as a <strong>frozen pizza</strong>: it has all the ingredients, but it's not "food" yet until you put it in the oven.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-box-seam-fill"}></i>
              </div>
              <h2 className="doc-card-heading">And What is a Container?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>A container is the <strong>running instance</strong>. It's a live, isolated process on your machine spawned from an image.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-table"}></i>
              </div>
              <h2 className="doc-card-heading">The Comparison Table</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-table-wrapper shadow-sm">
<table class="table table-dark table-hover doc-table mb-0">
<thead>
<tr>
<th>Feature</th>
<th>Docker Image</th>
<th>Docker Container</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>What it is</strong></td>
<td>A static blueprint</td>
<td>A live running instance</td>
</tr>
<tr>
<td><strong>State</strong></td>
<td>Read-Only (Immutable)</td>
<td>Read/Write (Mutable)</td>
</tr>
<tr>
<td><strong>Analogy</strong></td>
<td>Frozen Pizza</td>
<td>Cooked Pizza</td>
</tr>
<tr>
<td><strong>Lifespan</strong></td>
<td>Permanent</td>
<td>Temporary (Ephemeral)</td>
</tr>
</tbody>
</table>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">How an Image Becomes a Container (The Mechanical Process)</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of this as <strong>"The 4-Step Magic Trick."</strong> When you hit Enter on <code>docker run</code>, the Docker Engine performs these steps in milliseconds:</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-layers-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 1: The Layer "Snapshot" (Filesystem)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>An Image is just a stack of read-only layers (like a frozen "Save Point" in a game).</p>
      <p><strong>The Transition:</strong> Docker takes that stack and adds a thin, empty "Writable Layer" on the very top.</p>
      <p class="mt-3"><small class="text-secondary"><strong>Note:</strong> Because layers are shared, if you pull an image that is 500MB, but you already have 450MB of its base layers from a previous image, Docker only downloads the 50MB of new layers. This is why Docker is so much faster than downloading a new VM every time.</small></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-shaded"></i></div>
      <h3 class="doc-sub-card-title">Step 2: The "Namespace" Bubble (Isolation)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker tells the Linux Kernel: "Start a new process, but put blinders on it."</p>
      <p><strong>What happens:</strong> The kernel creates Namespaces. These are like invisible walls.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 3: The "cgroup" Budget (Resource Control)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker sets the "Allowance" for this new process using Control Groups (cgroups).</p>
      <p><strong>The Transition:</strong> It tells the CPU and RAM: "This container can only use 512MB of RAM and 10% of the CPU."</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-lightning-charge-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 4: The "Life Spark" (The Entrypoint)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Every Image has a "Start Command" baked into it (called the CMD or ENTRYPOINT).</p>
      <p><strong>The Transition:</strong> Docker executes that one specific command (e.g., <code>python app.py</code> or <code>postgres</code>).</p>
    </div>
  </div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="alert alert-info mt-4"><strong>Crucial Rule:</strong> A Container only stays alive as long as its Main Process is running. If your Python script finishes or your Database crashes, the "Life Spark" goes out, and the container stops immediately.</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-question-circle-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Interview Corner: Can a Container Run Forever?</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>This is a classic "Senior Docker Engineer" interview question. The answer is <strong>Yes</strong>, but you must understand the "Foreground Rule."</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu"></i></div>
      <h3 class="doc-sub-card-title">1. The Foreground Rule</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker monitors the process defined in <code>CMD</code>. If that process finishes or goes into the background, the "Life Spark" goes out and the container stops.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-infinity"></i></div>
      <h3 class="doc-sub-card-title">2. The "Immortal Hack" Breakdown</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Engineers use <code>tail -f /dev/null</code> to keep a container alive for debugging. Here is why it works:</p>
      <ul>
        <li><strong>tail:</strong> Normally shows the end of a file.</li>
        <li><strong>-f (Follow):</strong> Tells tail to stay open and wait for new lines forever.</li>
        <li><strong>/dev/null:</strong> A "Black Hole" file that is always empty.</li>
      </ul>
      <p><strong>The Synergy:</strong> tail waits forever for lines to be added to a file that can never have them. It uses <strong>0% CPU</strong> and keeps the container alive.</p>
      <p><small class="text-secondary">Note: <code>sleep infinity</code> is a modern, more readable alternative.</small></p>
    </div>
  </div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="alert alert-warning mt-4"><strong>Common Pitfall:</strong> Running <code>service nginx start</code> usually fails because it starts the service in the <em>background</em>. The start command then finishes, and Docker kills the container immediately.</div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
