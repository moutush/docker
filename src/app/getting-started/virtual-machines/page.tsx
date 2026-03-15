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
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Virtual Machines</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Understand the 'old way' of isolation and how it differs from Docker containers.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-laptop"}></i>
              </div>
              <h2 className="doc-card-heading">What is a Virtual Machine?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Before Docker became famous, if you wanted to run several apps on one server without them interfering with each other, you used <strong>Virtual Machines (VMs)</strong>.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-emoji-smile-fill"></i></div>
      <h3 class="doc-sub-card-title">Noob-Friendly: The "Mini-Laptop"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>A VM is like having a <strong>"mini-laptop"</strong> running inside your actual laptop. It has its own desktop, its own login screen, and its own hard drive. It's completely separate from your main computer.</p>
    </div>
  </div>
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu-fill"></i></div>
      <h3 class="doc-sub-card-title">Tech-Friendly: Hardware Emulation</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>A VM uses a <strong>Hypervisor</strong> (like VMware or VirtualBox) to emulate physical hardware. Each VM runs a full <strong>Guest Operating System</strong>, which has its own kernel, binaries, and libraries.</p>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-intersect"}></i>
              </div>
              <h2 className="doc-card-heading">Docker vs. Virtual Machines</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>The biggest difference is <strong>Efficiency</strong>. While VMs emulate a whole computer, Docker only emulates the <strong>Software Environment</strong>.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-table-wrapper shadow-sm">
  <table class="table table-dark table-hover doc-table mb-0">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Virtual Machine (VM)</th>
        <th>Docker Container</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Analogy</strong></td>
        <td>A House (Everything included)</td>
        <td>An Apartment (Shared structure)</td>
      </tr>
      <tr>
        <td><strong>Size</strong></td>
        <td>GBs (Huge)</td>
        <td>MBs (Tiny)</td>
      </tr>
      <tr>
        <td><strong>Boot Time</strong></td>
        <td>Minutes (Slow)</td>
        <td>Milliseconds (Instant)</td>
      </tr>
      <tr>
        <td><strong>Isolation</strong></td>
        <td>Hardware Level (Very secure)</td>
        <td>OS Level (Secure enough)</td>
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
                <i className={"bi " + "bi-question-diamond-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Use Cases: When to use which?</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `
<div class="row g-4">
  <div class="col-md-6">
    <div class="doc-sub-card h-100 border-primary">
      <div class="doc-sub-card-header">
        <div class="doc-sub-card-icon text-primary"><i class="bi bi-shield-lock-fill"></i></div>
        <h3 class="doc-sub-card-title">When to use VMs?</h3>
      </div>
      <div class="doc-sub-card-body">
        <ul class="list-unstyled">
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>Different Kernels:</strong> Run Windows on a Linux server.</li>
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>Legacy Apps:</strong> Old apps that need a specific, old OS version.</li>
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>Maximum Security:</strong> When you cannot risk sharing an OS kernel.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="doc-sub-card h-100 border-info">
      <div class="doc-sub-card-header">
        <div class="doc-sub-card-icon text-info"><i class="bi bi-lightning-fill"></i></div>
        <h3 class="doc-sub-card-title">When to use Docker?</h3>
      </div>
      <div class="doc-sub-card-body">
        <ul class="list-unstyled">
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>Development:</strong> "It works on my machine" every time.</li>
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>Microservices:</strong> Scale hundreds of tiny services instantly.</li>
          <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>CI/CD Pipelines:</strong> Build and test in seconds, not hours.</li>
        </ul>
      </div>
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
