import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker inspect - Docker Documentation",
  description: "Return detailed low-level information about containers, images, volumes, or networks in JSON format."
};

export default function DockerInspectPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker inspect</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Return detailed low-level information about containers, images, volumes, or networks in JSON format.
          </p>
        </div>
        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Syntax: <code>docker inspect [OPTIONS] NAME|ID [NAME|ID...]</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker inspect</code> dumps a detailed JSON structure about any Docker object — containers, images, volumes, or networks. It exposes everything: IP addresses, environment variables, mount points, restart policies, health checks, and much more.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-emoji-smile-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Noob-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Think of a container as a mystery box. <code>docker ps</code> tells you the box label. <code>docker inspect</code> opens the box and X-rays everything inside — every wire, spring, and screw. It is the go-to command when something is not working and you need to know exactly how Docker configured something.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Inspect a container by name
docker inspect my-nginx

# Pretty-print only the IP address using a Go template
docker inspect --format '{{.NetworkSettings.IPAddress}}' my-nginx`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-code-slash"}></i>
              </div>
              <h2 className="doc-card-heading">Tech-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Extract just the environment variables of a container to audit secrets and config without entering the container.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Get all environment variables of a running container
docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' my-app

# Check the restart policy
docker inspect --format '{{.HostConfig.RestartPolicy.Name}}' my-app

# Inspect multiple objects at once
docker inspect my-nginx my-postgres`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-table"}></i>
              </div>
              <h2 className="doc-card-heading">Flag / Parameter Reference</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `
        <div className="doc-table-wrapper shadow-sm mt-4">
            <table className="table table-dark table-hover doc-table mb-0">
                <thead>
                    <tr>
                        <th>Flag / Argument</th>
                        <th>Type</th>
                        <th>What it does</th>
                    </tr>
                </thead>
                <tbody>
        <tr>
            <td><code>NAME|ID</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>Name or ID of any Docker object: container, image, volume, or network. Multiple accepted.</td>
        </tr>
        <tr>
            <td><code>--format STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format the output using a Go template. Extracts specific fields instead of showing the entire JSON.</td>
        </tr>
        <tr>
            <td><code>--type STRING</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Disambiguate when a name refers to multiple object types: container, image, volume, network, node, service, task.</td>
        </tr>
        <tr>
            <td><code>-s / --size</code></td>
            <td><span className="badge bg-secondary">Flag</span></td>
            <td>For containers: display the total file sizes (SizeRootFs and SizeRw).</td>
        </tr></tbody>
            </table>
        </div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
