import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Installation - CKA Documentation",
  description: "Learn how to install Docker, Go (Golang), Kind (Kubernetes in Docker), and kubectl on Ubuntu Linux, complete with official guide references."
};

export default function InstallationPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Introduction</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Installation</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Tailored guide to set up Docker, Go (Golang), Kind, and kubectl on Ubuntu.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: OS Warning */}
        <div className="doc-alert doc-alert-info mb-4">
          <i className="bi bi-info-circle-fill"></i>
          <div>
            <h6 className="fw-bold mb-1 text-info">Target Operating System</h6>
            <p className="mb-0 x-small text-secondary">
              This installation guide is designed exclusively for **Ubuntu Linux** systems. Make sure your system packages are updated by running <code>sudo apt update && sudo apt upgrade -y</code> before beginning.
            </p>
          </div>
        </div>

        {/* SECTION: 1. Docker Installation */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-box-seam-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">1. Install Docker Engine</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Kind runs Kubernetes nodes as Docker containers, making Docker Engine the fundamental prerequisite for our local cluster.
            </p>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.1: Set up Docker's Apt Repository</h5>
            <p className="text-secondary small">Add Docker's official GPG key and register the repository:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.2: Install Docker Packages</h5>
            <p className="text-secondary small">Install the latest Docker Engine and compose plugin:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 1.3: Post-Installation Steps (Run Docker without sudo)</h5>
            <p className="text-secondary small">Add your current user to the <code>docker</code> group so that you can run Docker commands without prepending <code>sudo</code>:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`sudo groupadd docker
sudo usermod -aG docker $USER
# Apply group membership changes (or log out and log back in):
newgrp docker`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference Docs</h6>
                <p className="mb-0 x-small text-secondary">
                  These instructions are sourced directly from the official guide: <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">Docker Engine Install on Ubuntu</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 2. Golang Installation */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-code-slash"></i>
            </div>
            <h2 className="doc-card-heading">2. Install Go (Golang)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Go is the programming language that Kubernetes and Kind are built on. Installing it is essential for compile tasks, extending Kubernetes resources, or installing Kind from source.
            </p>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.1: Download and Extract Archive</h5>
            <p className="text-secondary small">Remove any previous Go installation and extract the official archive to <code>/usr/local</code>:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# Download latest Go tarball (e.g. v1.22.4):
curl -OL https://go.dev/dl/go1.22.4.linux-amd64.tar.gz

# Remove older installations and extract:
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.4.linux-amd64.tar.gz

# Clean up download:
rm go1.22.4.linux-amd64.tar.gz`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.2: Add Go to PATH Environment Variable</h5>
            <p className="text-secondary small">Append Go binaries path to your local profile to enable global access:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# Add to shell profile (~/.bashrc or ~/.profile)
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

# Reload profile to apply changes
source ~/.bashrc`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 2.3: Verify Installation</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`go version`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference Docs</h6>
                <p className="mb-0 x-small text-secondary">
                  These instructions are sourced directly from the official guide: <a href="https://go.dev/doc/install" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">Go Download and Install Guide</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 3. Kind Installation */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-download"></i>
            </div>
            <h2 className="doc-card-heading text-success">3. Install Kind</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              <strong>Kind (Kubernetes IN Docker)</strong> allows you to run local Kubernetes clusters using Docker container "nodes".
            </p>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 3.1: Download the Binary</h5>
            <p className="text-secondary small">Run the curl command matching your system architecture to download the binary:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# For AMD64 / x86_64 machines:
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64

# For ARM64 machines (e.g. AWS Graviton, Apple Silicon VMs):
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-arm64`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 3.2: Make Executable and Move to PATH</h5>
            <p className="text-secondary small">Grant execute permissions and move the binary to your executable files folder:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 3.3: Verify Installation</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind --version`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 3.4: Spin up a Local Kubernetes Cluster (Optional)</h5>
            <p className="text-secondary small">Verify that kind is integrated with Docker correctly by starting a cluster:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kind create cluster --name cka-labs`}
            </pre>

            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference Docs</h6>
                <p className="mb-0 x-small text-secondary">
                  These instructions are sourced directly from the official guide: <a href="https://kind.sigs.k8s.io/docs/user/quick-start/#installation" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">Kind Quick Start Installation Guide</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 4. kubectl Installation */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-terminal-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">4. Install kubectl</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              <strong>kubectl</strong> is the official Kubernetes command-line tool. It is the primary interface for deploying applications, inspecting resources, and managing your cluster — without it you cannot communicate with the cluster that Kind creates.
            </p>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 4.1: Download the Latest Stable Binary</h5>
            <p className="text-secondary small">Fetch the latest stable kubectl release binary directly from the official Kubernetes release server:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 4.2: Install the Binary</h5>
            <p className="text-secondary small">Make the binary executable and move it to a directory on your PATH:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 4.3: Verify Installation</h5>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`kubectl version --client`}
            </pre>

            <h5 className="text-light fw-bold mt-4 mb-3">Step 4.4: Enable Shell Autocompletion (Recommended)</h5>
            <p className="text-secondary small">kubectl autocompletion saves significant time during CKA exam practice. Add it to your bash profile:</p>
            <pre className="bg-dark text-success p-3 rounded border border-secondary border-opacity-50 small">
{`# Install bash-completion package if not present:
sudo apt-get install -y bash-completion

# Enable kubectl completion for bash:
echo 'source <(kubectl completion bash)' >> ~/.bashrc

# Set up 'k' as a short alias for kubectl with full completion:
echo 'alias k=kubectl' >> ~/.bashrc
echo 'complete -o default -F __start_kubectl k' >> ~/.bashrc

# Apply changes:
source ~/.bashrc`}
            </pre>

            <div className="doc-alert doc-alert-warning mt-4">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">CKA Exam Tip</h6>
                <p className="mb-0 x-small text-secondary">
                  The <code>k</code> alias and tab completion are allowed during the CKA exam. Setting them up now builds the habit of using them efficiently under time pressure.
                </p>
              </div>
            </div>

            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-link-45deg"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Official Reference Docs</h6>
                <p className="mb-0 x-small text-secondary">
                  These instructions are sourced directly from the official guide: <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-underline">Install kubectl on Linux</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Overall Verification */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-check-all"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Overall Verification Checklist</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              Run these commands to ensure all four components are fully active and correctly configured on your system:
            </p>

            <div className="table-responsive">
              <table className="table table-dark table-bordered small text-secondary align-middle">
                <thead>
                  <tr className="table-secondary text-dark">
                    <th>Component</th>
                    <th>Verification Command</th>
                    <th>Expected Output Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="text-light">Docker</strong></td>
                    <td><code>docker --version</code></td>
                    <td><code>Docker version 26.x.x, build ...</code></td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Go Language</strong></td>
                    <td><code>go version</code></td>
                    <td><code>go version go1.22.4 linux/amd64</code></td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">Kind CLI</strong></td>
                    <td><code>kind --version</code></td>
                    <td><code>kind version 0.23.0</code></td>
                  </tr>
                  <tr>
                    <td><strong className="text-light">kubectl</strong></td>
                    <td><code>kubectl version --client</code></td>
                    <td><code>Client Version: v1.30.x</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
