import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tech with Nana - Docker Documentation",
  description: "Reflections and Q&A from the TechWorld with Nana Docker course."
};

export default function TechWithNanaPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Tech with Nana</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Reflections and Q&A from the TechWorld with Nana course.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* CARD 1: PULL vs. RUN */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-terminal-fill"></i>
              </div>
              <h2 className="doc-card-heading">Command Intelligence: Pull vs. Run</h2>
            </div>
            <div className="doc-card-body">
              
              <div className="qa-item mb-4 mt-3">
                <h5 className="text-primary font-monospace">1. Anatomy of "docker run": How do I find the Image name?</h5>
                <p className="text-secondary text-sm">
                  The standard syntax is: <code className="text-white">docker run [FLAGS] IMAGE [COMMAND]</code>. <br/><br/>
                  <strong className="text-white">Pro Tip (Order Matters):</strong> All Docker flags (like <code>--name</code> or <code>-d</code>) must come <strong>BEFORE</strong> the image name. 
                  Anything typed after the image name is treated as a command to be executed <em>inside</em> the container.<br/><br/>
                  <strong>Correct:</strong> <code>docker run --name my-db postgres</code> <br/>
                  <strong>Wrong:</strong> <code>docker run postgres --name my-db</code> (Docker will try to run a command called &quot;--name&quot; inside postgres and fail).
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">2. docker pull vs. docker run — What is the difference?</h5>
                <p className="text-secondary text-sm">
                  <strong className="text-white">docker pull:</strong> Only downloads the image from the registry (like Docker Hub) to your local machine. It does <em>not</em> start a container. <br/>
                  <strong className="text-white">docker run:</strong> This is a multi-step command. It checks if the image exists locally; if not, it <strong>pulls</strong> it automatically, then <strong>creates</strong> a container, and finally <strong>starts</strong> it.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">3. Does docker pull check the cache?</h5>
                <p className="text-secondary text-sm">
                  Yes, it uses cached layers to save time, but it <strong>always contacts the registry</strong> to see if a newer version of the tag exists. 
                  In contrast, <code>docker run</code> will just use the local image if it exists, even if it is outdated compared to the registry.
                </p>
              </div>

              <div className="qa-item mb-2">
                <h5 className="text-primary font-monospace">4. How do I give my container a custom name?</h5>
                <p className="text-secondary text-sm">
                  Use the <code className="text-white">--name</code> flag during <code>docker run</code>. <br/>
                  <strong>Example:</strong> <code>docker run --name my-db postgres</code> <br/>
                  If you forget this, Docker will assign a random name (like <em>&quot;zen_mayer&quot;</em>).
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: LISTING CONTAINERS */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-list-task"></i>
              </div>
              <h2 className="doc-card-heading">Monitoring: docker ps</h2>
            </div>
            <div className="doc-card-body">
              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">5. What do the different "docker ps" flags do?</h5>
                <p className="text-secondary text-sm">
                  The <code>ps</code> command is your primary tool for seeing the status of containers on your machine:
                </p>
                <ul className="text-secondary text-sm mt-3">
                  <li className="mb-2">
                    <strong className="text-white font-monospace">docker ps</strong>: This is the default. It lists only <strong>currently running</strong> containers.
                  </li>
                  <li className="mb-2">
                    <strong className="text-white font-monospace">docker ps -a</strong>: Short for &quot;all&quot;. It lists every container on your system, including those that have stopped, exited, or crashed.
                  </li>
                  <li className="mb-2">
                    <strong className="text-white font-monospace">docker ps -l</strong>: Short for &quot;latest&quot;. It shows only the <strong>single most recently created</strong> container (even if it is stopped).
                  </li>
                </ul>
              </div>

              <div className="qa-item mb-2">
                <h5 className="text-primary font-monospace">6. Why didn't my "pulled" image show up in "docker ps -a"?</h5>
                <p className="text-secondary text-sm">
                  Because <code>docker ps</code> only lists <strong>Containers</strong> (running instances). 
                  A <code>pull</code> only downloads the <strong>Image</strong> (the blueprint/frozen pizza). 
                  To see the images you have pulled, you must use <code>docker images</code> instead.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: LOCAL IMAGES & REGISTRIES */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-hdd-network-fill"></i>
              </div>
              <h2 className="doc-card-heading">Local Images & Registries</h2>
            </div>
            <div className="doc-card-body">
              
              <div className="qa-item mb-4 mt-3">
                <h5 className="text-primary font-monospace">7. Can I "pull" an image from my own local machine?</h5>
                <p className="text-secondary text-sm">
                  Strictly speaking, <strong className="text-white">no</strong>. <code>docker pull</code> always looks for a <strong className="text-white">Registry</strong> (a server like Docker Hub). If the image is already on your machine, it's already "there"—you just <code>run</code> it.
                </p>
              </div>

              <div className="qa-item mb-2">
                <h5 className="text-primary font-monospace">8. How do I share my custom Alpines without Docker Hub?</h5>
                <p className="text-secondary text-sm">
                  <strong className="text-white">Option A (Local Registry):</strong> You can run a small <code>registry</code> container on your machine and push/pull from <code>localhost:5000</code>. <br/>
                  <strong className="text-white">Option B (Tarballs):</strong> Use <code>docker save -o my-image.tar my-image</code> to create a file, and <code>docker load -i my-image.tar</code> to bring it back on another machine.
                </p>
              </div>

            </div>
          </div>

          {/* CARD 4: DCA EXAM INSIGHTS */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h2 className="doc-card-heading">DCA Exam Insights: Advanced ps</h2>
            </div>
            <div className="doc-card-body">
              <div className="qa-item mb-4 mt-3">
                <h5 className="text-primary font-monospace">9. Which flags are most important for the DCA?</h5>
                <ul className="text-secondary text-sm">
                  <li className="mb-2"><strong className="text-white">-q (Quiet):</strong> Returns only Container IDs. Essential for automation tasks like: <code>docker rm $(docker ps -aq)</code>.</li>
                  <li className="mb-2"><strong className="text-white">-s (Size):</strong> Displays the container's writable layer size and virtual size (the image size).</li>
                  <li className="mb-2"><strong className="text-white">--no-trunc:</strong> Disables truncation, allowing you to see the full 64-character Container ID.</li>
                </ul>
              </div>

              <div className="qa-item mb-2">
                <h5 className="text-primary font-monospace">10. How do I filter or format output for automation?</h5>
                <p className="text-secondary text-sm">
                  <strong className="text-white">Filtering:</strong> Use <code>docker ps -f &quot;status=exited&quot;</code> to find only stopped containers. Other filters include <code>name</code>, <code>ancestor</code> (image), and <code>label</code>.<br/><br/>
                  <strong className="text-white">Formatting:</strong> Use <code>docker ps --format &quot;&#123;&#123;.ID&#125;&#125;: &#123;&#123;.Names&#125;&#125;&quot;</code> to return only the specific pieces of data needed for a script.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 5: TROUBLESHOOTING & BULK CLEANUP */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-trash-fill text-danger"></i>
              </div>
              <h2 className="doc-card-heading">Troubleshooting: Bulk Cleanup</h2>
            </div>
            <div className="doc-card-body">
              <div className="qa-item mb-4 mt-3">
                <h5 className="text-primary font-monospace">11. Why did "docker rm -f" fail with a "requires 1 argument" error?</h5>
                <p className="text-secondary text-sm">
                  Because <code className="text-white">-f</code> is just a <strong>flag</strong> (an option). Docker still needs a <strong>target</strong> to act upon. 
                  When you run it alone, you are telling Docker to &quot;Forcefully remove...&quot; but you haven&apos;t said what to remove. 
                  You must provide at least one Container ID or name.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">12. How do I "Nuke" every container at once?</h5>
                <p className="text-secondary text-sm">
                  Use the sub-command syntax to feed all IDs into the delete command:<br/><br/>
                  <code className="text-white">docker rm -f $(docker ps -aq)</code><br/><br/>
                  <strong className="text-white">The Logic:</strong>
                </p>
                <ul className="text-secondary text-sm">
                  <li className="mb-2"><strong>$(...)</strong>: This executes the command inside the parentheses first and passes its output to the main command.</li>
                  <li className="mb-2"><strong>docker ps -aq</strong>: Lists <strong>all</strong> IDs in <strong>quiet</strong> mode (no headers, just IDs).</li>
                  <li className="mb-0"><strong>-f</strong>: Ensures even running containers are stopped and deleted instantly.</li>
                </ul>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">13. If I delete all containers, why are my images still there?</h5>
                <p className="text-secondary text-sm">
                  Because images and containers are different things! <code className="text-white">docker rm</code> only deletes the <strong>Containers</strong> (ephemeral instances). 
                  The <strong>Image</strong> is the static blueprint. Think of it like this: You deleted the <strong>printed documents</strong>, but the <strong>template file</strong> is still on your hard drive. 
                  To delete the templates, you must use <code className="text-white">docker rmi</code>.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">14. How do I "Nuke" all images at once?</h5>
                <p className="text-secondary text-sm">
                  Just like with containers, use the sub-command syntax:<br/><br/>
                  <code className="text-white">docker rmi -f $(docker images -aq)</code><br/><br/>
                  This finds every Image ID and forces a deletion, even if the image is tagged. Note: This will only fail if a <strong>container</strong> is still using that image (which is why you usually nuke containers first!).
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">15. Why did "docker rmi -f $(docker images)" explode with errors?</h5>
                <p className="text-secondary text-sm">
                  Because without the <code className="text-white">-q</code> (quiet) flag, Docker outputs a human-readable table with headers like <strong>IMAGE</strong>, <strong>ID</strong>, and <strong>DISK USAGE</strong>. 
                  The <code className="text-white">$()</code> expansion turns that table into a list of words, and <code className="text-white">rmi</code> tried to &quot;delete&quot; those headers as if they were image names! <br/><br/>
                  <strong>Lesson:</strong> Always use <code className="text-white">-q</code> for automation so you get a clean list of IDs, not a mess of human text.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">16. Why did "docker rmi -f $(docker images -q)" fail with "requires 1 argument"?</h5>
                <p className="text-secondary text-sm">
                  It failed because <strong>there was nothing left to delete!</strong> <br/><br/>
                  When <code className="text-white">docker images -q</code> finds zero images, it returns an empty list. 
                  The command then becomes <code className="text-white">docker rmi -f [EMPTY]</code>. Just like with containers, Docker requires you to point at <em>something</em>. <br/><br/>
                  <strong>Lesson:</strong> In bulk automation, the &quot;requires 1 argument&quot; error is often a sign of success—it means your cleanup command worked so well that there is nothing left!
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">17. What is the solution to "Host Port Conflicts"?</h5>
                <p className="text-secondary text-sm">
                  The solution is <strong>Port Mapping</strong> to unique external ports. <br/><br/>
                  Even if multiple containers use port 6379 internally, you map them to different &quot;Entrance Doors&quot; on your PC: <br/>
                  <code className="text-white">-p 6001:6379</code> and <code className="text-white">-p 6002:6379</code>. <br/><br/>
                  <strong>Analogy:</strong> Every office in a building can have an &quot;Extension 101&quot;, but the building must have different direct-dial phone numbers to reach those specific offices from the outside.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">18. But aren't Docker IPs dynamic? Won't that break connections?</h5>
                <p className="text-secondary text-sm">
                  Yes, they are 100% dynamic! Relying on IPs is the &quot;IP Trap.&quot; <br/><br/>
                  <strong>The Solution:</strong> Docker has an <strong>Embedded DNS</strong>. On custom networks, you can use the <strong>Container Name</strong> (like <code>&quot;my-redis&quot;</code>) as the hostname. <br/><br/>
                  Docker tracks the current IP of that name and ensures that <code>http://my-redis:6379</code> always works, even after a restart.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">19. Can two containers both use the same internal port (e.g., 6379)?</h5>
                <p className="text-secondary text-sm">
                  <strong>YES.</strong> Because each container has its own private IP address, they are like houses on a street. Both houses can have a &quot;front door&quot; (port 6379). <br/><br/>
                  As long as you use their <strong>Names</strong> (e.g., <code>http://redis-v5:6379</code> and <code>http://redis-v6:6379</code>), the network routes you to the correct house door every time.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">20. Is the DNS name the same as the "Image:Tag" name?</h5>
                <p className="text-secondary text-sm">
                  <strong>No.</strong> The &quot;Image:Tag&quot; (like <code>redis:5</code>) is just the blueprint. You talk to containers using the <strong>Container Name</strong> assigned via the <code className="text-white">--name</code> flag. <br/><br/>
                  Example: <code>docker run --name my-cache redis:5</code> <br/>
                  Your app should connect to <code>http://my-cache:6379</code>. Docker DNS does not recognize image names as network addresses.
                </p>
              </div>

              <div className="qa-item mb-4">
                <h5 className="text-primary font-monospace">21. Why did "docker pull redis7.4.8-alpine" fail?</h5>
                <p className="text-secondary text-sm">
                  Because you forgot the <strong>Colon (:)</strong>! <br/><br/>
                  Docker expects the repository and tag to be separated by a colon. Without it, Docker thinks the whole string <code>&quot;redis7.4.8-alpine&quot;</code> is the repository name. <br/><br/>
                  <strong>Correct:</strong> <code className="text-white">docker pull redis:7.4.8-alpine</code>
                </p>
              </div>

              <div className="qa-item mb-2">
                <h5 className="text-primary font-monospace">22. Can I use wildcards (like redis:7.*) in Docker commands?</h5>
                <p className="text-secondary text-sm">
                  <strong>No.</strong> Docker does NOT support wildcards (<code className="text-white">*</code>) for image tags. You must specify an exact version or use a <strong>Floating Tag</strong>. <br/><br/>
                  <strong>Floating Tag Example:</strong> Use <code className="text-white">redis:7-alpine</code> to automatically get the latest patch of version 7. Unlike a wildcard, this is a predefined label maintained by the developers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
