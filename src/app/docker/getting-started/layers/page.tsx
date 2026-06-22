import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Layers and Images - Docker Documentation",
  description: "Deep dive into Docker layers, the Union File System, layer caching, and the architecture that makes Docker efficient."
};

export default function LayersAndImagesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Layers and Images</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Deep dive into Docker layers, the Union File System, layer caching, and the architecture that makes Docker efficient.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-layers-fill"}></i>
              </div>
              <h2 className="doc-card-heading">What is a Docker Image?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>A Docker Image is a <strong>read-only template</strong> containing instructions for creating a container. It is not a single large file (like an .iso); it is a collection of stacked, immutable layers.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-info-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong> Think of an image as a <strong>Frozen Pizza</strong>. It's a finished product in the freezer. You can't change the toppings once it's frozen, but you use it as a template to create a hot meal (the container).</div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-exclamation-triangle-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Why not one big file?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>If images were monolithic "bricks" (one big file), we would run into massive efficiency problems:</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hdd-fill"></i></div>
      <h3 class="doc-sub-card-title">Wasted Space</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Updating just one line of code would force you to re-download a 500MB "brick" every single time.</p>
    </div>
  </div>
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-files"></i></div>
      <h3 class="doc-sub-card-title">Redundancy</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Running 10 different Python apps would mean having 10 identical copies of the Python runtime taking up space on your disk.</p>
    </div>
  </div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-success">
  <i class="bi bi-check-circle-fill"></i>
  <div><strong>The Solution:</strong> Layers allow Docker to <strong>share</strong> parts of images. 
  <br><br>
  <strong>The Pizza Analogy:</strong> Instead of a 50kg solid brick of pre-mixed dough and sauce, Docker keeps them separate. To change pepperoni to mushrooms, you only swap the 1kg topping layer, not the 49kg base.</div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-stack-overflow"}></i>
              </div>
              <h2 className="doc-card-heading">How Layers Work (Step-by-Step)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Each instruction in a <code>Dockerfile</code> creates a new layer. These layers are <strong>Read-Only</strong> and <strong>Immutable</strong>.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Example: Building a FastAPI Image</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem; margin-bottom: 2rem;">
  <li><code>FROM python:3.9</code>: <strong>The Crust.</strong> This is your foundation.</li>
  <li><code>RUN apt install ...</code>: <strong>The Sauce.</strong> Spread over the base.</li>
  <li><code>COPY requirements.txt .</code>: <strong>The Cheese.</strong> Essential before the "fun" stuff.</li>
  <li><code>RUN pip install ...</code>: <strong>The Seasoning.</strong> Baked into the cheese.</li>
  <li><code>COPY . .</code>: <strong>The Toppings.</strong> (Your FastAPI code). What makes your pizza unique.</li>
</ul>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-file-earmark-diff"}></i>
              </div>
              <h2 className="doc-card-heading">The "Copy-on-Write" (CoW) Strategy</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>When you start a container, Docker adds one <strong>thin, writable layer</strong> on top of the Read-Only stack.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-info-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong> Imagine placing a sheet of <strong>Transparent Plastic Foil</strong> over the pizza.
  <ul style="margin-top:0.5rem; margin-bottom:0px;">
    <li><strong>The Rule:</strong> You can't touch the frozen pizza, but you can write on the foil with a marker.</li>
    <li><strong>The Action:</strong> If your app needs to "modify" a file in the crust, Docker copies that bit of crust onto the foil and modifies it there.</li>
    <li><strong>The Outcome:</strong> The original "Frozen Pizza" (Image) stays perfect in the freezer for the next container to use.</li>
  </ul>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Layer Caching: The DevOps Secret</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Docker caches each layer. If a layer hasn't changed, Docker skips the work.<br/><strong>The Rule:</strong> If one layer changes, all layers above it must be rebuilt. <br/> <strong>The DevOps Secret:</strong> This is why we order our Dockerfile from bottom to top (copying code last). If we copy code first, any tiny typo invalidates the entire cache, and the build takes forever. </p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-warning">
  <i class="bi bi-exclamation-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong>
  You prepare pizzas like this:
  <ul>
    <li>Dough</li>
    <li>Sauce</li>
    <li>Cheese</li>
    <li>Toppings</li>
  </ul>
  If the sauce recipe changes:
  <ul>
    <li>You must redo:</li>
    <li>Sauce</li>
    <li>Cheese</li> 
    <li>Toppings</li>
  </ul>
  But you don't redo the dough.
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-diagram-3"}></i>
              </div>
              <h2 className="doc-card-heading">The Union File System (UnionFS)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>This is the technology that "squashes" these layers together into a single view.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-secondary">
  <i class="bi bi-cpu-fill"></i>
  <div><strong>How Overlay2 Works (The Tech):</strong> Overlay2 divides your file system into three main parts:
    <ul class="mt-2 mb-0">
      <li><strong>lowerdir:</strong> The Read-Only layers (the Image). Consider these the foundation.</li>
      <li><strong>upperdir:</strong> The Writable layer (the Container). Where your current changes live.</li>
      <li><strong>merged:</strong> The "Union" view. This is what the application actually sees—an overlay of the upper on top of the lower.</li>
    </ul>
  </div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-info mt-3">
  <i class="bi bi-eye-fill"></i>
  <div><strong>The Tracing Paper Analogy (Noob-Friendly):</strong> 
    <p class="mt-2 mb-1">Imagine you have a beautiful <strong>Base Drawing</strong> (your <code>lowerdir</code>). You want to add a hat to the character but don't want to ruin the original art.</p>
    <ul>
      <li><strong>The Layer:</strong> You place a sheet of <strong>Transparent Tracing Paper</strong> (your <code>upperdir</code>) on top.</li>
      <li><strong>The Change:</strong> You draw the hat on the tracing paper.</li>
      <li><strong>The Result:</strong> When you look at the desk, you see the character wearing a hat! That finished look is the <strong>merged</strong> view. The base drawing remains untouched underneath, and if you throw away the tracing paper, the character is back to normal.</li>
    </ul>
  </div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-success mt-3">
  <i class="bi bi-lightning-charge-fill"></i>
  <div><strong>Why it's fast:</strong> Overlay2 doesn't copy the whole "Base Drawing." It only records the "Hat" you drew. If you try to change a building in the background, it "Copies-on-Write" (CoW) just that building onto your tracing paper and modifies it there.</div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-diagram-2"}></i>
              </div>
              <h2 className="doc-card-heading">Inter-Container Layer Sharing</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p><strong>The Pizza Analogy:</strong> If "Wolf's Shop" and "Gemini's Shop" both use the same brand of frozen crust, we share one warehouse for those crusts. This is why you can run 50 containers without filling your hard drive; they all point to the same physical "crust" bytes.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-question-circle-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Tricky Questions (DevOps Prep)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-trash3-fill"></i></div>
      <h3 class="doc-sub-card-title">Q1: Does <code>RUN rm -rf /temp</code> make an image smaller?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: Not if the files were created in a previous RUN.</strong></p>
      <p><strong>Pizza Logic:</strong> If you drop a hair on the sauce and then cover it with cheese, you can't "pick it off." Adding an rm command later is just putting a sticker on the foil that says "Ignore the hair." The hair is still baked into the box taking up space.</p>
      <p><strong>DevOps Tip:</strong> Create and delete temp files in the <em>same</em> RUN command.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-lock-fill"></i></div>
      <h3 class="doc-sub-card-title">Q2: Can two containers modify the same image layer?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: No.</strong> Image layers are 100% read-only. Each container gets its own private "Foil" (Writable Layer). They share the base but never interfere with each other.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hash"></i></div>
      <h3 class="doc-sub-card-title">Q3: Change a comment in <code>requirements.txt</code>?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A:</strong> The file hash changes. Docker's cache breaks, and it will re-run <code>pip install</code> from scratch. Keep your <code>requirements.txt</code> clean!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stack-overflow"></i></div>
      <h3 class="doc-sub-card-title">Q4: Is there a layer limit?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: Yes (usually 127 layers).</strong></p>
      <p><strong>Pizza Logic:</strong> You can't stack 1,000 layers of cheese without the pizza collapsing. Combine related commands using <code>&&</code> to keep your stack lean.</p>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-gear-fill"}></i>
              </div>
              <h2 className="doc-card-heading">The 127-Layer Limit</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-gear-fill"></i>
  <div><strong>Technical Fact:</strong> The 127-layer limit isn't just an arbitrary number; it's a structural limitation of storage drivers like <strong>AUFS</strong> or <strong>Overlay2</strong>. Each layer adds overhead for the file system to track. This is why we use <code>&&</code> to squash commands into a single layer.</div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-success mt-3">
  <i class="bi bi-lightbulb-fill"></i>
  <div><strong>Noob-Friendly Example:</strong> 
  <p class="mt-2 mb-1">Imagine you're making 50 small pizzas for a party. You have two choices:</p>
  <ul>
    <li><strong>The "Bad" Way (127 Layers):</strong> You put a sauce layer on all pizzas, then go back and put cheese on all, then go back for pepperoni... by the 100th trip to the kitchen, you're exhausted!</li>
    <li><strong>The "Squashed" Way (<code>&&</code>):</strong> You grab the sauce, cheese, and pepperoni in ONE go and dress each pizza fully before moving on. One trip, one layer, much faster!</li>
  </ul>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-fingerprint"}></i>
              </div>
              <h2 className="doc-card-heading">How Docker Identifies Layers (SHA256)</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-fingerprint"></i>
  <div><strong>The Digital Fingerprint:</strong> Docker doesn't identify layers by human names (like "Sauce Layer"). Instead, it uses a <strong>SHA256 Hash</strong>—a unique string generated from the <em>exact</em> contents of that layer.</div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-card mt-3">
  <div class="doc-sub-card-header">
    <div class="doc-sub-card-icon"><i class="bi bi-clock-history"></i></div>
    <h3 class="doc-sub-card-title">The Cache Ripple Effect</h3>
  </div>
  <div class="doc-sub-card-body">
    <p>If you change a single comma in <code>requirements.txt</code>, its "Fingerprint" (Hash) changes. Docker sees this as a <strong>brand new layer</strong>.</p>
    <ul>
      <li><strong>Layers Below (OS, Python):</strong> Stay cached. They haven't changed!</li>
      <li><strong>The Modified Layer:</strong> Rebuilds from scratch.</li>
      <li><strong>Layers Above (Code, Entrypoint):</strong> Must also rebuild, because their "base" has shifted.</li>
    </ul>
    <p><strong>Pizza Logic:</strong> If you change the brand of sauce, the crust stays the same (below), but you must re-add the cheese and toppings (above) because they sit on top of the new sauce!</p>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-database-fill-check"}></i>
              </div>
              <h2 className="doc-card-heading">Volumes: Persistence Outside the Stack</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-alert doc-alert-warning">
  <i class="bi bi-database-fill-check"></i>
  <div><strong>Wait, what about my data?</strong> If layers are immutable and "foil" layers are deleted when the container stops, how do we save data? <strong>Volumes.</strong></div>
</div>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-card mt-3">
  <div class="doc-sub-card-header">
    <div class="doc-sub-card-icon"><i class="bi bi-box-seam-fill"></i></div>
    <h3 class="doc-sub-card-title">Layers vs. Volumes</h3>
  </div>
  <div class="doc-sub-card-body">
    <p>Volumes live <strong>outside</strong> the Onion File System. They are not part of the image hash and don't care about "layers."</p>
    <p><strong>Pizza Logic:</strong> Imagine your pizza is in a <strong>Storage Bin</strong>. You can change the pizza, throw it away, or swap it for a different one—but the storage bin and everything else in it stays exactly as it was. The bin is the <strong>Volume</strong>; the pizza is the <strong>Container</strong>.</p>
  </div>
</div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
