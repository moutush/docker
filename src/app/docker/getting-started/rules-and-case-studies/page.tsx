import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "10 Essential Rules and Real-World Case Studies - Docker Documentation",
  description: "Master Docker with 10 essential rules and learn from 8 real-world case studies that show how to apply them in production."
};

export default function Page10EssentialRulesAndRealWorldCaseStudiesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>10 Essential Rules and Real-World Case Studies</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Master Docker with 10 essential rules and learn from 8 real-world case studies that show how to apply them in production.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightbulb-fill"}></i>
              </div>
              <h2 className="doc-card-heading">10 Essential Rules for Docker Mastery</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Master these rules to avoid common pitfalls and excel in Docker certifications and interviews.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-eye-slash-fill"></i></div>
      <h3 class="doc-sub-card-title">1. The "Invisible" File Rule</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker images are made of read-only layers. Once a layer is created, it never changes. Deleting a file in a later layer simply adds a "note" to ignore it; the file still exists in the previous layer, taking up space.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine writing a secret with a <strong>Pencil</strong> and then trying to "delete" it by covering it with <strong>Permanent Ink</strong>. The ink hides the pencil mark, but the lead is still physically on the paper. To truly remove it, you must erase the pencil mark <em>before</em> applying the ink (i.e., in the same <code>RUN</code> command).</p>
      <p><strong>The Exam Solution:</strong> Always use <code>&&</code> to <code>ADD</code> and <code>rm</code> in one instruction to keep images slim.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu"></i></div>
      <h3 class="doc-sub-card-title">2. The PID 1 "Life Spark"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> A container is bound to the life of its primary process (PID 1). If that process ends, the container dies. If that process moves to the background (forks), the container thinks its work is done and exits.</p>
      <p><strong>Noob-Friendly Example:</strong> A container is like a <strong>Heartbeat Monitor</strong>. As long as the heart (PID 1) is beating, the machine stays on. If the heart stops or is "backgrounded" to another room, the monitor registers a flatline and shuts down the container.</p>
      <p><strong>The Exam Solution:</strong> If a container keeps crashing, it's likely because the process finished. Use <code>tail -f /dev/null</code> to keep it alive for debugging.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-diagram-3"></i></div>
      <h3 class="doc-sub-card-title">3. Namespaces vs. cgroups</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> These are the two pillars of containerization. Namespaces handle *isolation* (what you can see), while cgroups handle *resources* (what you can use).</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine an <strong>Apartment Building</strong>. 
        <ul>
          <li><strong>Namespaces:</strong> Are the <strong>Walls and Curtains</strong>. They ensure you can't see into your neighbor's kitchen or use their stove.</li>
          <li><strong>cgroups:</strong> Are the <strong>Circuit Breakers</strong>. They ensure that if your neighbor plugs in 10 space heaters, they don't blow the fuse for the whole building or hog all the electricity.</li>
        </ul>
      </p>
      <p><strong>Interview Tip:</strong> Visibility issues = Namespace. Resource hogging/crashing host = cgroup.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-lightning-fill"></i></div>
      <h3 class="doc-sub-card-title">4. The UnionFS Performance "Tax"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> The Union File System (Overlay2) has to do extra math to "merge" all layers together every time you read or write a file. This "overhead" makes disk I/O slower than native hardware.</p>
      <p><strong>Noob-Friendly Example:</strong> It's like wearing <strong>5 pairs of gloves</strong>. You can still pick up a glass of water, but it's much slower and clumsier than using your bare hands. <strong>Volumes</strong> are like taking the gloves off and touching the glass directly.</p>
      <p><strong>The Exam Solution:</strong> Use Volumes for any app that needs high-speed disk access (Databases, Loggers).</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stack"></i></div>
      <h3 class="doc-sub-card-title">5. The "Layer Cake" Cache</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker builds images in a specific order. If you change a layer, every layer *after* it must be rebuilt from scratch because the foundation has changed.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine building a <strong>Lego Tower</strong>. If you decide to change the color of the <strong>bottom brick</strong>, you have to take apart the whole tower and rebuild it. If you change the <strong>top brick</strong>, the rest of the tower stays perfect.</p>
      <p><strong>The Exam Solution:</strong> Put heavy, stable things (OS, NPM install) at the top. Put frequently changing things (Source Code) at the bottom.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cloud-slash"></i></div>
      <h3 class="doc-sub-card-title">6. The "Amnesia" Factor</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Containers are designed to be temporary and replaceable. Any data written directly to the container's file system is deleted the moment the container is removed.</p>
      <p><strong>Noob-Friendly Example:</strong> A container is like a <strong>Rental Car</strong>. You can adjust the seat, change the radio station, and put trash in the door pocket. But when you return the car, all those changes are wiped for the next customer. If you want to keep your music, you need a <strong>USB Drive (Volume)</strong>.</p>
      <p><strong>The Exam Solution:</strong> Never store state (DBs, uploads) inside a container. Use Volumes for "Long-term memory."</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-pci-card"></i></div>
      <h3 class="doc-sub-card-title">7. The Architecture "Ship"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker doesn't virtualize the CPU hardware. It uses the Host's Kernel. Therefore, an image built for one type of CPU (e.g., Apple M4/ARM) cannot run on another (e.g., Intel/AMD) without special emulation.</p>
      <p><strong>Noob-Friendly Example:</strong> It's like trying to play a <strong>PlayStation disc in an Xbox</strong>. Even though they are both "game consoles" (Linux systems), the underlying hardware "language" they speak is different.</p>
      <p><strong>The Exam Solution:</strong> Ensure your build architecture matches your deployment target, or use <code>buildx</code> for multi-arch builds.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stop-circle-fill"></i></div>
      <h3 class="doc-sub-card-title">8. The "Stop" vs. "Kill" Signal</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> <code>docker stop</code> sends a <code>SIGTERM</code> (Termination) signal. This is a request for the app to finish its work and exit gracefully. <code>SIGKILL</code> is a forced shutdown by the OS.</p>
      <p><strong>Noob-Friendly Example:</strong> 
        <ul>
          <li><strong>Stop:</strong> Is like your mom saying "It's time for dinner, finish your game and come down." You have a few minutes to save your progress.</li>
          <li><strong>Kill:</strong> Is your mom <strong>pulling the plug out of the wall</strong>. No saving, just instant darkness.</li>
        </ul>
      </p>
      <p><strong>The Exam Solution:</strong> If a container hangs for 10s on stop, your app isn't "listening." Fix your signal handling!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-box-arrow-in-down-right"></i></div>
      <h3 class="doc-sub-card-title">9. The "Mount" Priority</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> When you mount a volume, it sits "on top" of the image directory. If files existed in the image's folder, they are hidden (but not deleted) by the volume.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine you have a <strong>Coffee Table</strong> with a book on it. If you put a <strong>Tablecloth (Volume)</strong> over the table, the book is still there, but you can't see or touch it until you remove the cloth.</p>
      <p><strong>The Exam Solution:</strong> Be careful where you mount! Mounting to <code>/etc</code> might hide critical system configs and crash your container.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-scissors"></i></div>
      <h3 class="doc-sub-card-title">10. Multi-Stage "Slimming"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> To build an app, you need compilers and tools. To run an app, you only need the final binary. Multi-stage builds let you build in one image and ship only the results in a second, smaller image.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine a <strong>Restaurant</strong>.
        <ul>
          <li><strong>The Kitchen (Stage 1):</strong> Has messy flour, raw eggs, and big ovens to bake a cake.</li>
          <li><strong>The Dining Room (Stage 2):</strong> Only has the <strong>Finished Cake on a Plate</strong>. You don't bring the flour and the whole oven to the customer's table!</li>
        </ul>
      </p>
      <p><strong>The Exam Solution:</strong> Use Multi-stage builds to reduce image size and hide source code from production.</p>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-briefcase-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Real-World Case Studies</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Apply the rules above to solve these common production scenarios.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-database-exclamation"></i></div>
      <h3 class="doc-sub-card-title">Case Study 1: The "Vanishing" Database</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You are running a MySQL database inside a container. After a reboot, you start the container again. You log in, and the database is completely empty.</p>
      <p><strong>The Problem:</strong> Which "Rule" was broken?</p>
      <p><strong>The Solution:</strong> <strong>The Amnesia/Persistence Rule.</strong> You likely saved data to the container's Writable Layer instead of a Volume.</p>
      <p><strong>The Fix:</strong> Map a Volume to the database's data folder (e.g., <code>/var/lib/mysql</code>).</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hourglass-split"></i></div>
      <h3 class="doc-sub-card-title">Case Study 2: The "10-Second Delay"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> Every time you run <code>docker stop</code>, the container hangs for exactly 10 seconds before finally dying.</p>
      <p><strong>The Problem:</strong> The <strong>PID 1 / Signal Rule</strong>.</p>
      <p><strong>The Solution:</strong> Your script is running as PID 1 but it isn't "listening" for the SIGTERM. Docker waits 10 seconds, then sends a SIGKILL.</p>
      <p><strong>The Fix:</strong> Ensure your script handles signals or use <code>exec</code> to make your app the actual PID 1.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-textarea-t"></i></div>
      <h3 class="doc-sub-card-title">Case Study 3: The "Bloated" Image</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You have one <code>RUN</code> to download a 500MB SDK, another to build, and a third to delete the SDK. The final image is still over 600MB.</p>
      <p><strong>The Problem:</strong> The <strong>Immutability / Layer Rule</strong>.</p>
      <p><strong>The Solution:</strong> Deleting it in a later layer only adds a "mask"—the 500MB is still physically taking up space in the previous layer.</p>
      <p><strong>The Fix:</strong> Use <code>&&</code> to download, build, and delete all in one single <code>RUN</code> command.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 4: The "Mystery" Crash</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> App-A gets a traffic spike. A few minutes later, the entire physical server crashes, and App-B is also gone.</p>
      <p><strong>The Problem:</strong> The <strong>cgroup / Resource Budget Rule</strong>.</p>
      <p><strong>The Solution:</strong> Without cgroups, App-A ate all the host's RAM, causing a Kernel panic.</p>
      <p><strong>The Fix:</strong> Set <code>--memory</code> and <code>--cpus</code> limits on your containers.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-lock-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 5: The "Permission Denied" Wall</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You mount your local source code, but the app says <code>Error: EACCES: permission denied</code>.</p>
      <p><strong>The Problem:</strong> The <strong>Mount / User ID Rule</strong>.</p>
      <p><strong>The Solution:</strong> The User ID inside the container doesn't match the Owner of the file on your host machine.</p>
      <p><strong>The Fix:</strong> Ensure the User ID (UID) inside the container matches the UID on the host.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-slash"></i></div>
      <h3 class="doc-sub-card-title">Case Study 6: The "Ghost" Connection</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You have a Frontend container and a Backend container running on the same server. You try to <code>ping backend</code> from the frontend, but it says "Destination Host Unreachable."</p>
      <p><strong>The Problem:</strong> The <strong>Namespace / Networking Rule</strong>.</p>
      <p><strong>The Solution:</strong> By default, containers are isolated in their own "Magic Blinders." They cannot see or talk to each other unless they are explicitly invited to the same <strong>Docker Network</strong>.</p>
      <p><strong>The Fix:</strong> Create a user-defined network (<code>docker network create my-net</code>) and join both containers to it.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-boxes"></i></div>
      <h3 class="doc-sub-card-title">Case Study 7: The "Mismatched" Ship</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> Your developer builds an image on their shiny New MacBook (M4 chip). You push it to the production server (Intel Xeon). The container refuses to start, saying <code>exec format error</code>.</p>
      <p><strong>The Problem:</strong> The <strong>Architecture Rule</strong>.</p>
      <p><strong>The Solution:</strong> Docker images are not magic—they contain binaries compiled for a specific CPU language (ARM vs. x86). The Intel server can't read the ARM "language" built on the Mac.</p>
      <p><strong>The Fix:</strong> Use <code>docker buildx build --platform linux/amd64</code> to build the correct version for your server.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-file-earmark-lock2-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 8: The "Security Leak"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You are building a Private App. You <code>COPY</code> an SSH key into the image to download private code, then <code>rm</code> the key at the end of the Dockerfile. A security auditor tells you they can still find your SSH key in the image.</p>
      <p><strong>The Problem:</strong> The <strong>Immutability / Multi-Stage Rule</strong>.</p>
      <p><strong>The Solution:</strong> Just like the "Bloated Image," the key was baked into an early layer. Your <code>rm</code> command only hid it. Anyone with a tool like <code>dive</code> can look into the old layers and steal your key.</p>
      <p><strong>The Fix:</strong> Use <strong>Multi-Stage Build</strong>. Download the code in Stage 1, and only copy the <em>software</em> to Stage 2. The SSH key stays in the messy kitchen (Stage 1) and never makes it to the plate.</p>
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
