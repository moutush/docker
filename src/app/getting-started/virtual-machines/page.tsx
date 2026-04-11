import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Virtual Machines - Docker Documentation",
  description: "Understand the 'old way' of isolation and how it differs from Docker containers."
};

export default function VirtualMachinesPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Virtual Machines vs. Docker</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Understanding the architectural layers of isolation.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: The Three Layers of a PC */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-layers-fill"></i>
              </div>
              <h2 className="doc-card-heading">The Three Layers of a PC</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-4">
                To understand both VMs and Docker, we first need to look at how a standard computer is structured. Every PC is built in three fundamental layers:
              </p>
              
              <div className="row justify-content-center mb-4">
                <div className="col-md-8 col-lg-6">
                  {/* VISUAL STACK */}
                  <div className="d-flex flex-column gap-2 text-center text-uppercase fw-bold">
                    <div className="p-4 rounded shadow-sm border border-info bg-info bg-opacity-10 text-info">
                        Layer 3: Applications
                        <small className="d-block text-secondary text-lowercase fw-normal mt-1 opacity-75">
                          Where your code and programs live
                        </small>
                    </div>
                    <div className="p-4 rounded shadow-sm border border-primary bg-primary bg-opacity-10 text-primary">
                        Layer 2: OS Kernel
                        <small className="d-block text-secondary text-lowercase fw-normal mt-1 opacity-75">
                          The manager that talks to the hardware
                        </small>
                    </div>
                    <div className="p-4 rounded shadow-sm border border-secondary bg-dark text-secondary">
                        Layer 1: Hardware
                        <small className="d-block text-secondary text-lowercase fw-normal mt-1 opacity-75">
                          The physical CPU, RAM, and Disk
                        </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: VM vs Docker Architecture */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-intersect"></i>
              </div>
              <h2 className="doc-card-heading">VM vs Docker: Where they live</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                {/* VM ARCHITECTURE */}
                <div className="col-md-6">
                  <div className="doc-sub-card h-100 border-primary">
                    <div className="doc-sub-card-header">
                      <h3 className="doc-sub-card-title text-primary">Virtual Machine (VM)</h3>
                    </div>
                    <div className="doc-sub-card-body">
                      <p className="text-secondary text-sm mb-4">
                        A VM is essentially <strong>Applications + a Guest Kernel</strong>. It emulates the hardware layer entirely.
                      </p>
                      {/* VM Chart */}
                      <div className="d-flex flex-column gap-1 text-center text-sm font-monospace">
                        <div className="p-2 border border-info bg-info bg-opacity-10 text-info rounded">App / Binaries</div>
                        <div className="p-2 border border-primary bg-primary bg-opacity-25 text-primary rounded fw-bold">Guest OS Kernel</div>
                        <div className="p-1 text-secondary">--- Hypervisor ---</div>
                        <div className="p-2 border border-secondary bg-dark text-secondary rounded">Host OS Kernel</div>
                        <div className="p-2 border border-secondary bg-dark text-secondary rounded">Physical Hardware</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOCKER ARCHITECTURE */}
                <div className="col-md-6">
                  <div className="doc-sub-card h-100 border-success">
                    <div className="doc-sub-card-header">
                      <h3 className="doc-sub-card-title text-success">Docker Container</h3>
                    </div>
                    <div className="doc-sub-card-body">
                      <p className="text-secondary text-sm mb-4">
                        Docker lives on the <strong>Application layer</strong>. It shares the <strong>Host Kernel</strong> directly.
                      </p>
                      {/* Docker Chart */}
                      <div className="d-flex flex-column gap-1 text-center text-sm font-monospace">
                        <div className="p-2 border border-info bg-info bg-opacity-25 text-info rounded fw-bold shadow-sm">
                          Dockered App
                          <small className="d-block opacity-75 fw-normal mt-1">(Acting as root process)</small>
                        </div>
                        <div className="p-1 text-secondary">--- Docker Engine ---</div>
                        <div className="p-2 border border-primary bg-primary bg-opacity-10 text-primary rounded">Host OS Kernel</div>
                        <div className="p-2 border border-secondary bg-dark text-secondary rounded">Physical Hardware</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-dark rounded border border-secondary bg-opacity-50">
                <h4 className="text-white fs-5 mb-3">The "Secret Sauce"</h4>
                <p className="text-secondary mb-0">
                  Because Docker runs on the <strong>application layer</strong> of your host, it doesn't need to boot a whole kernel. 
                  It tricks the app into thinking it's the <strong>only root process</strong> in the whole PC, while actually just 
                  using the host machine's existing management layer. This is why Docker starts in milliseconds, while VMs take minutes.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: Simplified Analogies */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-lightbulb-fill"></i>
              </div>
              <h2 className="doc-card-heading">Simplified Analogies</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-md-6 border-end border-secondary border-opacity-25 px-4">
                  <h4 className="text-primary fs-6 mb-3 font-monospace">VM: The "Mini-Laptop"</h4>
                  <p className="text-secondary text-sm">
                    A VM is like having a <strong>complete mini-laptop</strong> running inside your actual laptop. 
                    It has its own desktop, its own login screen, and its own hard drive. It is a full, heavy identity 
                    living inside a file.
                  </p>
                </div>
                <div className="col-md-6 px-4">
                  <h4 className="text-success fs-6 mb-3 font-monospace">Docker: The "App Install"</h4>
                  <p className="text-secondary text-sm">
                    Docker is like <strong>simply installing an app</strong>. It doesn't need its own battery or 
                    its own screen. It uses your existing OS to do its job, but it stays in its own small "folder" 
                    so it doesn't mess up your other apps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: OS Compatibility & History */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-cpu-fill"></i>
              </div>
              <h2 className="doc-card-heading">OS Compatibility & The Toolbox Era</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-lg-7">
                  <h3 className="text-white fs-6 mb-3 font-monospace">Native vs. Virtualized</h3>
                  <p className="text-secondary text-sm">
                    Docker is a <strong>Linux-native</strong> technology. It relies on features built directly into the Linux kernel (Namespaces and Cgroups).
                  </p>
                  <ul className="text-secondary text-sm">
                    <li className="mb-2"><strong>Linux:</strong> Runs natively. High performance.</li>
                    <li className="mb-2"><strong>Windows / Mac:</strong> They use <strong>Docker Desktop</strong> to provide a lightweight Linux kernel bridge.</li>
                  </ul>
                </div>
                <div className="col-lg-5">
                  <div className="p-3 rounded bg-dark border border-secondary border-opacity-50 h-100">
                    <h3 className="text-info fs-6 mb-2 font-monospace">Legacy: Docker Toolbox</h3>
                    <p className="text-secondary text-xs mb-0">
                      Pre-2016, we used <strong>Docker Toolbox</strong> with <strong>VirtualBox</strong> as a "heavy" workaround. It was slow because it had to emulate an entire computer just to run one container.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: The Modern Way: WSL 2 */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-primary">
                <i className="bi bi-windows"></i>
              </div>
              <h2 className="doc-card-heading">The Modern Way: WSL 2</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-4">
                For Windows users, <strong>WSL 2 (Windows Subsystem for Linux 2)</strong> was the "game changer" that made Docker fast and efficient.
              </p>
              
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <h4 className="text-white fs-6 mb-3">What is WSL 2?</h4>
                  <p className="text-secondary text-sm">
                    Microsoft built a <strong>real Linux kernel</strong> directly into Windows. It&apos;s not an emulation or a slow VM — it&apos;s a high-performance utility that lets Windows run Linux software at native speeds.
                  </p>
                  <div className="p-3 bg-primary bg-opacity-10 border border-primary rounded text-sm text-primary">
                    <strong>Why it matters:</strong> Now, Docker on Windows can share the WSL 2 kernel just like it shares the Host kernel on Linux. No more heavy VirtualBox!
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="doc-sub-card p-4 border border-info border-opacity-25 shadow-sm">
                    <h5 className="text-info fs-6 mb-3">Then vs. Now (Windows)</h5>
                    <ul className="list-unstyled text-secondary text-xs">
                      <li className="mb-3 d-flex align-items-center">
                        <i className="bi bi-x-circle text-danger me-2"></i>
                        <span><strong>2015:</strong> VirtualBox (Toolbox) - <strong>Very Slow</strong></span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className="bi bi-dash-circle text-warning me-2"></i>
                        <span><strong>2018:</strong> Hyper-V - <strong>Faster, but isolated</strong></span>
                      </li>
                      <li className="mb-0 d-flex align-items-center">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        <span><strong>Today:</strong> WSL 2 - <strong>Native Linux Speeds</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: Feature Comparison */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-table"></i>
              </div>
              <h2 className="doc-card-heading">Technical Comparison</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary text-sm mb-4">
                Summary of the performance and resource differences:
              </p>
              <div className="doc-table-wrapper shadow-sm mt-2">
                <table className="table table-dark table-hover doc-table mb-0">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Virtual Machine (VM)</th>
                      <th>Docker Container</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Size (Storage)</strong></td>
                      <td>Gigabytes (Bundles entire OS)</td>
                      <td>Megabytes (Bundles only App/Libs)</td>
                    </tr>
                    <tr>
                      <td><strong>Startup Speed</strong></td>
                      <td>Minutes (Slow OS boot)</td>
                      <td>Milliseconds (Instant start)</td>
                    </tr>
                    <tr>
                      <td><strong>OS Kernel</strong></td>
                      <td>Unique Kernel per VM</td>
                      <td>Shares Host OS Kernel</td>
                    </tr>
                    <tr>
                      <td><strong>Resource Usage</strong></td>
                      <td>High (Fixed allocation)</td>
                      <td>Low (Shared / Dynamic)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
