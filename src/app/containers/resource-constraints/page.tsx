import React from 'react';

export default function ResourceConstraintsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-4 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Resource Constraints
                    </h1>

                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Stop memory leaks from taking down your entire server.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* SECTION 1: THE OOM KILLER */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-x-octagon-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="oom-killer">
                                Beware the OOM Killer
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-2">
                                By default, Docker containers have <strong>absolutely no limits</strong>. A container can consume 100% of your host server's Memory (RAM) and CPU.
                            </p>
                            
                            <p className="text-secondary small">
                                What happens if an app (like a faulty Python script parsing a massive CSV) gobbles up all available memory? The Linux operating system gets scared. To save itself from crashing, the Linux kernel throws an <code>Out Of Memory Exception (OOME)</code> and unleashes the <strong>OOM Killer</strong>. This process literally starts "assassinating" running applications to free up RAM—and it might accidentally kill your database instead of the faulty script!
                            </p>

                            <div className="doc-alert doc-alert-danger mb-4">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <div>
                                    <strong>The Lesson:</strong><br/>
                                    Never let untrusted or heavy background tasks run without a memory limit in production.
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-warning mb-0 shadow-sm">
                                <i className="bi bi-question-circle-fill"></i>
                                <div>
                                    <strong>Wait, do memory limits protect my container if ANOTHER app hogs all the memory?</strong><br/>
                                    <strong>No!</strong> This is a crucial concept. Memory limits protect the <em>Host Server</em> from the <em>Container</em>. If another faulty process outside of Docker (or a neighboring unlimited container) eats 100% of the server's RAM, the Linux OOM Killer will panic and start killing processes. Because the OOM Killer acts blindly to save the server, it might randomly assassinate your perfectly healthy, limited container just to free up space! This is why <em>all</em> heavy processes on a server must have caps.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: MEMORY LIMITS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-info">
                            <div className="heading-icon">
                                <i className="bi bi-memory"></i>
                            </div>
                            <h2 className="doc-card-heading" id="memory-limits">
                                Setting Memory Limits
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                Docker helps you prevent uncontrolled memory consumption using three primary flags.
                            </p>

                            <div className="table-responsive mb-4">
                                <table className="doc-table">
                                    <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>What it does</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>-m</code> or <code>--memory=</code></td>
                                            <td><strong>The Hard Limit.</strong> Sets the absolute physical maximum memory the container can use (e.g. <code>500m</code>, <code>2g</code>). If exceeded, the container crashes securely.</td>
                                        </tr>
                                        <tr>
                                            <td><code>--memory-reservation</code></td>
                                            <td><strong>The Soft Limit.</strong> A lower target for normal operation. (e.g., set to <code>300m</code> when <code>-m</code> is <code>500m</code>).</td>
                                        </tr>
                                        <tr>
                                            <td><code>--memory-swap</code></td>
                                            <td>Total Memory + Swap allowed. If set equal to <code>-m</code>, it <strong>disables swap</strong> entirely.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="doc-alert doc-alert-secondary mb-4">
                                <i className="bi bi-patch-question-fill"></i>
                                <div>
                                    <h5 className="fs-6 fw-bold mb-2">Expert Q&A: Memory Limits Explained</h5>
                                    
                                    <p className="mb-1 fw-bold text-light">Q: What exactly is the Soft Limit doing and how does the container reduce memory?</p>
                                    <p className="small text-secondary mb-3">Docker doesn't magically rewrite your code to use less memory. If your Host Server is running out of RAM, Docker asks the Linux kernel to aggressively reclaim memory from your soft-limited container. The kernel does this by dropping idle filesystem caches, clearing unused buffers, or moving data to Swap. If your app strictly needs the RAM and can't give it back, it will keep using it up until it hits the Hard Limit.</p>
                                    
                                    <p className="mb-1 fw-bold text-light">Q: When should I use Soft Limits vs Hard Limits?</p>
                                    <p className="small text-secondary mb-3">Use <strong>Hard Limits</strong> (<code>-m</code>) always. Period. This protects your server from crashing. Use <strong>Soft Limits</strong> for capacity planning—saying to Docker: "I am giving this container a Hard Limit of 1GB so it doesn't crash the server, but it normally only needs 500MB (Soft Limit). If another container needs memory, feel free to squeeze this one back down to 500MB."</p>

                                    <p className="mb-1 fw-bold text-light">Q: When should I use Swap?</p>
                                    <p className="small text-secondary mb-0">For performance-critical apps like Databases, <strong>you should disable swap entirely</strong> (by setting <code>--memory-swap</code> perfectly equal to <code>-m</code>). Why? Because swapping moving data from RAM to disk is incredibly slow. You only use swap for non-critical background jobs where you'd rather the job run slowly than crash entirely.</p>
                                </div>
                            </div>

                            <h5 className="fs-6 fw-bold mb-2">Example: The "Gold Standard" Background Worker</h5>
                            <p className="text-secondary small mb-2">Give a script 1GB absolute max (Hard Limit), expect it to use 500MB (Soft Limit), and disable swap so it fails fast instead of slowing down the disk:</p>
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0">
                                <code className="text-info">docker run -d --name worker -m 1g --memory-reservation 500m --memory-swap 1g python-script</code>
                            </pre>
                        </div>
                    </div>

                    {/* SECTION 3: CPU LIMITS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-success">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="cpu-limits">
                                Setting CPU Limits
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                While memory limits protect the server from crashing, CPU limits guarantee that a runaway "While True" loop in Python won't freeze your entire server by maxing out all processors. 
                            </p>

                            <ul className="text-secondary small mb-4">
                                <li className="mb-2">
                                    <code>--cpus="&lt;value&gt;"</code>: <strong>The easy way.</strong> It acts like a global CPU throttle. Setting <code>--cpus="1.5"</code> means the container can use a maximum amount of CPU equivalent to 1 and a half cores, regardless of which core it actually runs on.
                                </li>
                                <li>
                                    <code>--cpuset-cpus</code>: <strong>The hardware way.</strong> Pins a container to specific CPU cores. Examples: <code>0-3</code> (first 4 cores) or <code>1,3</code> (cores 2 and 4).
                                </li>
                            </ul>

                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0">
                                <code>docker run -it --cpus="0.5" ubuntu /bin/bash</code>
                            </pre>
                        </div>
                    </div>

                    {/* SECTION 4: DISK LIMITS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-purple" style={{ color: '#a855f7' }}>
                            <div className="heading-icon text-white bg-purple" style={{ backgroundColor: '#a855f7' }}>
                                <i className="bi bi-device-hdd-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="disk-limits">
                                What about Disk Space?
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-2">
                                If a faulty infinite loop starts spitting out a giant 10GB log file inside the container, standard RAM and CPU limits will <em>not</em> stop it. The host server's hard drive will fill up and crash.
                            </p>
                            
                            <p className="text-secondary small">
                                Docker doesn't have a simple <code>--disk=10g</code> flag across the board because it depends entirely on your storage driver. Here's how you protect your hard drive:
                            </p>

                            <ul className="text-secondary small mb-0">
                                <li className="mb-2"><strong>Log Rotation:</strong> By far the most common cause of disk exhaustion is Docker logs. Use <code>--log-opt max-size=10m --log-opt max-file=3</code> to ensure logs never exceed 30MB total.</li>
                                <li className="mb-2"><strong>tmpfs Mounts:</strong> If your code generates temporary worker files, write them to a <code>tmpfs</code> mount instead of the container's disk. <code>tmpfs</code> stores files in RAM (which is strictly controlled by your Memory Limits), so it can never fill up the hard drive!</li>
                                <li><strong>Project Quotas:</strong> If you use the <code>overlay2</code> driver running on an <code>xfs</code> backing filesystem, you can strictly limit the container's writable layer using <code>--storage-opt size=5G</code>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* SECTION 5: GPU LIMITS */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-primary">
                            <div className="heading-icon">
                                <i className="bi bi-motherboard-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="gpu-limits">
                                What about GPUs?
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-2">
                                For Machine Learning and heavy computational workloads, Docker allows you to pass your Host's GPU directly into the container using the <code>--gpus</code> flag.
                            </p>
                            <p className="text-secondary small mb-3">
                                Keep in mind that unlike memory or CPU, establishing "limits" on a GPU doesn't work via fractional throttling (like "use 50%"). Instead, you isolate physical hardware—you tell Docker exactly <em>which</em> dedicated GPUs the container is allowed to see (e.g., passing 1 specific NVIDIA card from a server that has 4).
                            </p>
                            
                            <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mt-3 mb-3">
                                <code className="text-success">docker run -it --gpus all ubuntu /bin/bash</code>
                            </pre>

                            <ul className="text-secondary small mb-0 list-unstyled">
                                <li className="mb-1"><code className="text-light">docker run</code>: Creates and starts a brand new container.</li>
                                <li className="mb-1"><code className="text-light">-it</code>: <strong>Interactive + TTY</strong>. This means "keep the terminal open and tie my keyboard to the container so I can type actual commands live."</li>
                                <li className="mb-1"><code className="text-light">--gpus all</code>: Instructs Docker to expose every physical NVIDIA GPU available on the host machine to this container so libraries like TensorFlow can see them.</li>
                                <li className="mb-1"><code className="text-light">ubuntu</code>: The base OS image to use for the container limit tests.</li>
                                <li><code className="text-light">/bin/bash</code>: The primary process or command to run inside the container (starts a terminal shell).</li>
                            </ul>
                        </div>
                    </div>

                    {/* SECTION 6: THE ALIEN TECH */}
                    <div className="doc-section-card shadow-lg border-warning border-opacity-25 mb-4">
                        <div className="doc-card-header-wrapper text-warning">
                            <div className="heading-icon">
                                <i className="bi bi-cone-striped"></i>
                            </div>
                            <h2 className="doc-card-heading" id="alien-tech">
                                Alien Tech (Settings You Likely Don't Need)
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small">
                                The Docker documentation mentions several extremely low-level Linux kernel features. Unless you are building high-frequency trading algorithms or embedded systems, you will never touch these:
                            </p>
                            
                            <ul className="text-secondary small mb-0">
                                <li className="mb-2"><strong>The Real-Time Scheduler:</strong> Commands like <code>--cpu-rt-runtime</code> and compiling custom kernels to give a container split-second priority over standard Linux OS processes.</li>
                                <li className="mb-2"><strong>Kernel Memory Limits:</strong> (<code>--kernel-memory</code>) Limiting the actual Linux kernel structs the container generates. Running out of this throws specialized OOMs that are used for debugging OS-level bugs.</li>
                                <li><strong>Swappiness Tweaking:</strong> (<code>--memory-swappiness</code>) Fine-tuning the exact percentage probability the Linux kernel will swap anonymous memory pages out for this container.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
