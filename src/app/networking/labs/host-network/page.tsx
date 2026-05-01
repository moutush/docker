import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Host Network Lab - Docker Documentation",
    description: "Learn how to bypass Docker's network stack entirely for maximum performance using the host network driver."
};

export default function HostNetworkLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: The Host Network
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Shattering the NAT barrier for ultimate bare-metal performance.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE LATENCY PROBLEM */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-barrier-split"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The NAT Latency
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                A custom bridge network is excellent for isolation, but isolation comes at a cost. When you publish a port using <code>-p 8080:80</code>, your traffic doesn't go straight to the container. It goes through an obstacle course.
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-funnel text-warning me-2"></i>The Obstacle Course</h5>
                                        <ol className="small text-secondary mb-0">
                                            <li className="mb-2">Traffic hits your Host's physical network card.</li>
                                            <li className="mb-2">It hits the Linux Kernel <strong>iptables</strong> (NAT rule).</li>
                                            <li className="mb-2">It gets passed to the <code>docker-proxy</code> (a userland process).</li>
                                            <li className="mb-2">The proxy forwards it to the <code>docker0</code> virtual switch.</li>
                                            <li className="mb-2">It travels down the <code>veth</code> virtual wire.</li>
                                            <li>It finally arrives at the container.</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h5 className="fw-bold fs-6 text-danger"><i className="bi bi-stopwatch me-2"></i>The Impact</h5>
                                        <p className="small text-secondary mb-2">
                                            For a standard website, this takes fractions of a millisecond. It doesn't matter.
                                        </p>
                                        <p className="small text-secondary mb-0">
                                            But what if you are running a <strong>High-Frequency Trading Engine</strong>, an intense <strong>Gaming Server</strong>, or a massive <strong>HAProxy Load Balancer</strong> handling 100,000 requests per second? That proxy overhead creates a massive CPU bottleneck and ruins latency.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 2. THE BENCHMARK EXPERIMENT */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-speedometer"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                2. The Benchmark Experiment
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="mb-4">
                                Let's imagine we run a load-testing tool like <code>wrk</code> against an Nginx server running on a standard Bridge network vs a Host network. Here is what that "wall" looks like in the real world:
                            </p>

                            <div className="doc-alert px-3 py-2 mb-4 border-info" style={{ background: 'rgba(13, 202, 253, 0.05)', borderLeft: '4px solid #0dcaf0' }}>
                                <p className="mb-0 small text-secondary">
                                    <strong className="text-info">What is wrk?</strong> It is an industry-standard, ultra-fast HTTP benchmarking tool written in C. It uses multiple threads to hammer a web server with tens of thousands of requests to measure its maximum throughput and precise latency. It is the perfect weapon to expose tiny network bottlenecks like Docker's NAT proxy.
                                </p>
                            </div>

                            <div className="p-3 rounded border border-secondary mb-4" style={{ background: 'rgba(108, 117, 125, 0.05)' }}>
                                <h6 className="fw-bold text-light mb-2"><i className="bi bi-terminal me-2"></i>Understanding the Command:</h6>
                                <p className="small text-secondary mb-1">
                                    <code>wrk -t12 -c400 -d30s http://localhost</code>
                                </p>
                                <ul className="x-small text-secondary mb-0">
                                    <li><code>-t12</code> : Use 12 threads to generate the load.</li>
                                    <li><code>-c400</code> : Keep 400 HTTP connections open concurrently.</li>
                                    <li><code>-d30s</code> : Run the test for a duration of 30 seconds.</li>
                                </ul>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <h6 className="fw-bold fs-6 text-warning text-center">Bridge Network (-p 80:80)</h6>
                                    <pre className="doc-code-block mb-0 border-warning text-warning bg-dark x-small">
{`$ wrk -t12 -c400 -d30s http://localhost
...
Latency:    15.42ms
Req/Sec:  45,120.30
CPU Usage (docker-proxy): 85%`}
                                    </pre>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="fw-bold fs-6 text-success text-center">Host Network (--network host)</h6>
                                    <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
{`$ wrk -t12 -c400 -d30s http://localhost
...
Latency:     2.10ms  <-- 7x Faster!
Req/Sec: 112,500.45  <-- 2.5x More Throughput!
CPU Usage (docker-proxy): 0% (Bypassed)`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE HOST NETWORK SOLUTION */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-lightning-charge-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                3. The Solution: Total Network Surrender
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                To bypass the proxy and NAT completely, we use the <code>host</code> driver. This driver tells Docker: <em>"Do not create a network namespace for this container. Just let it use the host server's networking directly."</em>
                            </p>

                            <h5 className="fw-bold fs-6 mt-4">Step 1: Run Nginx on the Host Network</h5>
                            <p className="small text-secondary mb-2">Notice that we do <strong>NOT</strong> use the <code>-p</code> flag. Port mapping is meaningless here.</p>
                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker run -d \\
  --name fast-nginx \\
  --network host \\
  nginx`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4">Step 2: Verify Direct Access</h5>
                            <p className="small text-secondary mb-2">
                                Nginx defaults to port 80 inside the container. Because it's on the host network, it has immediately claimed Port 80 on your actual laptop/server. Open your browser and go to <code>http://localhost</code>. It works instantly without any proxy.
                            </p>

                            <div className="doc-alert doc-alert-success mt-4 p-3">
                                <div>
                                    <strong className="d-block mb-1">The Security Trade-off</strong>
                                    <p className="mb-0 x-small text-dark">
                                        By using the host network, the container is no longer isolated. It can see all network interfaces on your host machine (eth0, wlan0, localhost). It can intercept traffic meant for the host. You trade <strong>Security Isolation</strong> for <strong>Maximum Performance</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE GOTCHA: PORT COLLISIONS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                4. The DCA Gotcha: Port Collisions
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Because host-networked containers act like native applications on the host operating system, they are subject to standard OS limitations. <strong>Two applications cannot listen on the same port at the same time.</strong>
                            </p>

                            <p className="small text-secondary">Let's try to run a second Nginx container on the host network:</p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
{`$ docker run -d \\
  --name second-nginx \\
  --network host \\
  nginx`}
                            </pre>

                            <h5 className="fw-bold fs-6 text-danger mt-4">The Result: Silent Failure</h5>
                            <p className="small text-secondary mb-2">
                                Docker will accept the command and start the container, but if you run <code>docker ps</code>, the second container will have instantly exited. Let's check the logs:
                            </p>

                            <pre className="doc-code-block mb-0 border-danger text-danger bg-dark x-small">
{`$ docker logs second-nginx

2026/04/29 10:45:12 [emerg] 1#1: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)`}
                            </pre>

                            <div className="mt-4 p-3 rounded" style={{ background: 'rgba(255, 193, 7, 0.05)', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
                                <p className="mb-0 small">
                                    <strong>Exam Tip:</strong> On the DCA exam, if a question asks how to run <em>multiple instances</em> of the same web server on a single host machine, the <strong>host network is the WRONG answer</strong> because of inevitable port collisions. You must use a bridge network and map to different host ports (e.g., <code>-p 8081:80</code>, <code>-p 8082:80</code>).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. THE GOTCHA: OS LIMITATIONS */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-windows"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                5. The DCA Gotcha: OS Limitations
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The host networking driver relies heavily on how the Linux Kernel handles network namespaces. Therefore, it comes with a massive platform restriction that is frequently tested on the DCA exam.
                            </p>

                            <div className="p-3 rounded border border-danger mb-0" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-x-octagon-fill me-2"></i>The Platform Rule</h5>
                                <p className="small text-light mb-2">
                                    The <code>host</code> networking driver <strong>ONLY works on Linux hosts</strong>. 
                                </p>
                                <ul className="small text-secondary mb-0">
                                    <li>It does <strong>not</strong> work on Docker Desktop for Mac.</li>
                                    <li>It does <strong>not</strong> work on Docker Desktop for Windows.</li>
                                    <li>It does <strong>not</strong> work on Windows Server containers.</li>
                                </ul>
                            </div>
                            
                            <p className="small text-secondary mt-3 mb-0">
                                If you run <code>--network host</code> on a Mac or Windows machine, Docker will silently ignore the flag and fallback to bridge-like behavior. You will not get host network performance or port binding.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
