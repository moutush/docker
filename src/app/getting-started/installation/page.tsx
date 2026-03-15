import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Installing Docker - Docker Documentation",
  description: "Step-by-step guide to install Docker on Windows, Linux, and macOS with proper configuration."
};

export default function InstallingDockerPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Installing Docker</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Step-by-step guide to install Docker on Windows, Linux, and macOS with proper configuration.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-download"}></i>
              </div>
              <h2 className="doc-card-heading">Installing Docker</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Before diving into containers, you need to set up the engine. Installation looks completely different depending on your operating system (Windows vs Linux) and your preference (Server vs Graphical Interface).</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<h3 style="color: var(--text-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Docker Engine vs. Docker Desktop (GUI)</h3>
<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-terminal-fill"></i></div>
      <h3 class="doc-sub-card-title">Docker Engine (CLI/Server)</h3>
    </div>
    <div class="doc-sub-card-body">
      <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
        <li><strong>What is it?</strong> The core, native background process (daemon) and the terminal commands (CLI) to control it.</li>
        <li><strong>No Interface:</strong> There are no buttons to click. You interact purely via terminal (<code>docker run ...</code>).</li>
        <li><strong>Where to use:</strong> Linux servers, cloud deployments (AWS, DigitalOcean), and pure development environments.</li>
      </ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-mouse-fill"></i></div>
      <h3 class="doc-sub-card-title">Docker Desktop (GUI)</h3>
    </div>
    <div class="doc-sub-card-body">
      <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
        <li><strong>What is it?</strong> A full graphical application built <em>on top</em> of Docker Engine.</li>
        <li><strong>Visual Interface:</strong> Includes a dashboard to click-and-manage containers, images, and volumes, plus built-in Kubernetes.</li>
        <li><strong>Where to use:</strong> Mac and Windows workstations (because macOS and Windows cannot run native Linux containers without a Virtual Machine—Desktop sets this VM up for you automatically!).</li>
      </ul>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-windows"}></i>
              </div>
              <h2 className="doc-card-heading">Installation on Windows (WSL2)</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Docker containers are deeply tied to the Linux Kernel. Because Windows does not have a Linux Kernel by default, Docker cannot run natively. To solve this, Microsoft created <strong>WSL2 (Windows Subsystem for Linux 2)</strong>—a highly optimized, invisible Linux virtual machine inside Windows. Docker Desktop uses this WSL2 backbone to run its engine.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<h4 style="color: var(--text-primary); margin-top: 1rem; margin-bottom: 0.8rem;">Windows Setup Steps</h4>
<ol style="color:var(--text-secondary);line-height:2.2;padding-left:1.5rem">
  <li><strong>Step 1: Install WSL2.</strong> Open your Windows terminal (PowerShell or Command Prompt) as Administrator and run:<br>
    <pre class="doc-code-block"><code class="language-bash">wsl --install</code></pre>
    Restart your machine if prompted.
  </li>
  <li><strong>Step 2: Download Docker Desktop.</strong> Go to the official <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" style="color:var(--accent-blue)">Docker website</a> and download the Windows installer.</li>
  <li><strong>Step 3: Run Installer.</strong> Double-click the <code>.exe</code>. During installation, ensure the checkbox for <strong>"Use WSL 2 instead of Hyper-V"</strong> is checked (it usually is by default).</li>
  <li><strong>Step 4: Launch.</strong> Open Docker Desktop from your start menu. You will see the Docker whale icon in your system tray on the bottom right.</li>
  <li><strong>Step 5: Verify.</strong> Open PowerShell and type <code>docker --version</code>. If it spits out a version number, you're ready to go!</li>
</ol>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-terminal-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Installation on Linux (Debian/Ubuntu)</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Linux is Docker's native home! It runs directly on the kernel without any virtual machines. However, you must choose between installing just the Engine (Servers) or the Desktop GUI (Workstations).</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-server"}></i>
              </div>
              <h2 className="doc-card-heading">Method A: Docker Engine (The Server Way)</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>This is the standard approach for cloud servers and developers who prefer the terminal. We will use the official <code>apt</code> repository.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# 1. Uninstall old, conflicting packages
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

# 2. Add Docker's official GPG key
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. Add the repository to Apt sources
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Install the Engine and Compose
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Verify Installation
sudo docker run hello-world`}</code>
              </pre>

              <div dangerouslySetInnerHTML={{ __html: `<div style="background: rgba(88, 166, 255, 0.1); border-left: 3px solid var(--accent-blue); padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; margin-bottom: 1.5rem;">
  <div style="color: var(--accent-blue); margin-bottom: 0.5rem; font-weight: 600;">Linux Pro-Tip: Running without sudo</div>
  <p style="color: var(--text-secondary); margin: 0;">By default, the Docker daemon binds to a Unix socket owned by the <code>root</code> user. If you want to run <code>docker start</code> without typing <code>sudo</code> every time, you must add your user to the <code>docker</code> group:</p>
  <pre class="doc-code-block" style="margin-top: 0.5rem;"><code class="language-bash">sudo usermod -aG docker $USER</code></pre>
  <p style="color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 0;">Then log out and log back in!</p>
</div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-mouse-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Method B: Docker Desktop (The GUI Way)</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>If you are running Ubuntu or Debian with a graphical Desktop Environment (like GNOME or KDE) on your personal laptop, you can install the visual dashboard.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<ol style="color:var(--text-secondary);line-height:2.2;padding-left:1.5rem">
  <li>Ensure your CPU supports virtualization.</li>
  <li>Download the <code>.deb</code> package for Docker Desktop from the Docker docs.</li>
  <li>Run the installer using the package manager:
    <pre class="doc-code-block"><code class="language-bash">sudo apt-get update
sudo apt-get install ./docker-desktop-<version>-<arch>.deb</code></pre>
  </li>
  <li>Search your application launcher for "Docker Desktop" and start it.</li>
</ol>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
