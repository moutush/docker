import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bind Mounts Lab - Docker Documentation",
    description: "Learn how to link specific host directories to containers for live code reloading and config injection."
};

export default function BindMountsLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: Bind Mounts
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Direct links to your host filesystem. High performance, but high responsibility.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE REBUILD LOOP */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-arrow-repeat"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The Rebuild Loop
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Imagine you are developing a Node.js web application. You notice a typo on the homepage, so you fix it in your local <code>index.html</code>.
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-hammer text-danger me-2"></i>The Rebuild Cycle</h5>
                                        <p className="small text-secondary mb-2">
                                            To see that 1-letter change, you have to rebuild the image, stop the old container, and start a new one. 
                                        </p>
                                        <p className="small text-danger fw-bold mb-0">
                                            This kills development productivity.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h5 className="fw-bold fs-6 text-success"><i className="bi bi-lightning-fill me-2"></i>The Live Solution</h5>
                                        <p className="small text-secondary mb-2">
                                            Bind mounts map your source code folder directly into the container. 
                                        </p>
                                        <p className="small text-success fw-bold mb-0">
                                            Save a file on your host &rarr; The container sees it instantly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. THE PERMISSIONS WALL (BIND MOUNT EDITION) */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                2. The Permissions Wall
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Bind mounts are much more sensitive to permissions than Volumes because they are just a "portal" to your actual host files.
                            </p>

                            <div className="p-3 rounded border border-danger mb-4" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-exclamation-octagon-fill me-2"></i>The Owner Mismatch</h5>
                                <p className="small text-light mb-2">
                                    If your host folder is owned by <code>your-user (UID 1000)</code> but the Nginx process inside the container runs as <code>nginx (UID 101)</code>, Nginx might fail to read your files.
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> Unlike Volumes, Docker will NEVER change the ownership of a host folder to match the container. You must handle this manually using the <code>--user</code> flag.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. CREATING A BIND MOUNT */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-link-45deg"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                3. Creating a Bind Mount
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The professional way to mount a folder is using absolute paths and explicitly defining the user.
                            </p>

                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker run -d \\
  --name web-dev \\
  --user $(id -u):$(id -g) \\
  --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html \\
  nginx:latest`}
                            </pre>

                            <div className="p-3 rounded border border-secondary mb-0" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <ul className="small text-secondary mb-0">
                                    <li className="mb-2"><strong>type=bind</strong>: Explicitly tells Docker this is a host directory.</li>
                                    <li className="mb-2"><strong>source="$(pwd)"/html</strong>: Bind mounts REQUIRE absolute paths. Using <code>$(pwd)</code> is the standard way to provide this.</li>
                                    <li><strong>target</strong>: The path inside the container to be replaced.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE DCA GOTCHA: THE PATH TRAP */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-signpost-split-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                4. The DCA Gotcha: The Path Trap
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                One of the most common exam questions is: <em>"Why did my bind mount command fail?"</em>
                            </p>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="p-3 border border-danger rounded h-100 bg-dark">
                                        <h6 className="fw-bold text-danger"><i className="bi bi-x-circle me-2"></i>Invalid</h6>
                                        <code className="x-small text-secondary d-block p-2 bg-black rounded mb-2">
                                            source=./html
                                        </code>
                                        <p className="small text-secondary mb-0">
                                            Docker <code>--mount</code> syntax <strong>forbids</strong> relative paths. It will throw an error immediately.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 border border-success rounded h-100 bg-dark">
                                        <h6 className="fw-bold text-success"><i className="bi bi-check-circle me-2"></i>Valid</h6>
                                        <code className="x-small text-secondary d-block p-2 bg-black rounded mb-2">
                                            source=/home/user/app/html
                                        </code>
                                        <p className="small text-secondary mb-0">
                                            Always use the full path or environment variables like <code>$PWD</code>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. THE DCA GOTCHA: MISSING HOST PATHS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-folder-plus"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                5. The DCA Gotcha: Missing Host Paths
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If the host path you are trying to mount doesn't exist, the behavior changes based on which flag you use:
                            </p>

                            <table className="table table-dark table-striped table-bordered mt-3 small">
                                <thead>
                                    <tr>
                                        <th>Flag</th>
                                        <th>Result</th>
                                        <th>Consequence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-warning"><code>-v</code></td>
                                        <td>Creates directory</td>
                                        <td>Silently creates a <strong>root-owned</strong> folder on your host.</td>
                                    </tr>
                                    <tr>
                                        <td className="text-success"><code>--mount</code></td>
                                        <td>Error / Fail</td>
                                        <td>Stops you from making a typo and creating "phantom" folders.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 6. THE DCA GOTCHA: MOUNT PROPAGATION (BOSS LEVEL) */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                6. The DCA Gotcha: Mount Propagation
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                This is a highly technical topic often found in the "Advanced Operation" section of the DCA exam. It defines whether mounts created <strong>inside</strong> a bind mount are visible to the host or other containers.
                            </p>

                            <div className="p-3 rounded border border-info mb-4" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <h6 className="fw-bold text-info mb-3">Propagation Modes:</h6>
                                <div className="table-responsive">
                                    <table className="table table-dark table-sm mb-0 x-small">
                                        <thead>
                                            <tr>
                                                <th>Mode</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><code>private</code></td>
                                                <td>Sub-mounts inside the mount are not visible to the host or container (Default).</td>
                                            </tr>
                                            <tr>
                                                <td><code>shared</code></td>
                                                <td>Sub-mounts created on the host are visible in the container, and vice versa.</td>
                                            </tr>
                                            <tr>
                                                <td><code>slave</code></td>
                                                <td>One-way: Host sub-mounts are visible in the container, but not vice-versa.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="small text-secondary mb-2">
                                You define this using the <code>bind-propagation</code> option:
                            </p>
                            <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">
{`--mount type=bind,source=/app,target=/app,bind-propagation=rshared`}
                            </pre>
                            <p className="x-small text-secondary mt-2 opacity-75">
                                * The <code>r</code> prefix (e.g., <code>rshared</code>) stands for <strong>recursive</strong> propagation.
                            </p>
                        </div>
                    </div>

                    {/* 7. THE DCA GOTCHA: THE OVERWRITE SHADOW */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-eye-slash-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                7. The DCA Gotcha: The Overwrite Shadow
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                <strong>Volumes</strong> pre-populate empty volumes with container data. <br />
                                <strong>Bind Mounts</strong> never do this.
                            </p>

                            <div className="p-3 rounded border border-danger mb-0" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-shield-shaded me-2"></i>The Shadowing Rule</h5>
                                <p className="small text-light mb-2">
                                    When you bind mount a host folder into <code>/etc/config</code> inside a container, the container's <strong>original configs are instantly hidden</strong>.
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> If your container crashes because a "required file is missing" immediately after you added a bind mount, it's because you shadowed the directory and didn't provide that file on your host!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 8. THE DCA GOTCHA: READ-ONLY SECURITY */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                8. The DCA Gotcha: Read-Only Security
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Bind mounts are a security risk because they give a container direct access to your host. Always use <code>readonly</code> for config files.
                            </p>

                            <pre className="doc-code-block mb-3 border-success text-success bg-dark x-small">
{`$ docker run -d \\
  --mount type=bind,source="$(pwd)"/config,target=/etc/app/config,readonly \\
  my-app`}
                            </pre>

                            <div className="doc-alert doc-alert-success mt-3 p-3">
                                <p className="mb-0 x-small text-dark">
                                    <strong>Production Rule:</strong> Never give a container write access to your host filesystem unless absolutely necessary (like for logs or DB storage).
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
