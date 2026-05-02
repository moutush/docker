import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker Volumes Lab - Docker Documentation",
    description: "Learn how to persistently store data independent of container lifecycles using Docker Volumes."
};

export default function VolumesLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: Docker Volumes
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The ultimate solution for database persistence and decoupling data from containers.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE CONTAINER CRASH */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The Data Wipe
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Imagine you are running a PostgreSQL database for a critical application. You start the container and insert a bunch of customer data.
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-hdd text-warning me-2"></i>The Ephemeral Storage</h5>
                                        <p className="small text-secondary mb-2">
                                            You run the container without specifying any storage flags.
                                        </p>
                                        <p className="small text-danger fw-bold mb-0">
                                            The data is written to the container's writable layer.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h5 className="fw-bold fs-6 text-danger"><i className="bi bi-fire me-2"></i>The Crash</h5>
                                        <ul className="small text-secondary mb-0">
                                            <li className="mb-2">The container process crashes and needs to be replaced.</li>
                                            <li className="mb-2">You run <code>docker rm db</code> and start a new one.</li>
                                            <li><strong>All customer data is permanently lost.</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <h5 className="fw-bold fs-6 text-success mt-4">The Solution: Volumes</h5>
                            <p className="small text-secondary mb-0">
                                Docker Volumes are the preferred mechanism for persisting data. Volumes are completely managed by Docker and are stored in a part of the host filesystem which is managed by Docker (<code>/var/lib/docker/volumes/</code> on Linux).
                            </p>
                        </div>
                    </div>

                    {/* 2. ESSENTIAL VOLUME MANAGEMENT */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                2. Essential Volume Management
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Before mounting, you must know how to create and inspect the storage objects themselves.
                            </p>

                            <div className="row g-4 mt-2">
                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">1. List all volumes</h6>
                                    <pre className="doc-code-block mb-0 border-secondary text-light bg-dark x-small">
{`$ docker volume ls`}
                                    </pre>
                                </div>

                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">2. Inspect a volume (Where is the data stored?)</h6>
                                    <p className="small text-secondary mb-2">
                                        Use <code>inspect</code> to find the <code>Mountpoint</code> property. On Linux, this is where the raw data lives:
                                    </p>
                                    <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">
{`$ docker volume inspect pgdata
[
    {
        "Mountpoint": "/var/lib/docker/volumes/pgdata/_data",
        "Name": "pgdata"
    }
]`}
                                    </pre>
                                </div>

                                <div className="col-12">
                                    <h6 className="fw-bold text-light mb-2">3. Delete a volume</h6>
                                    <p className="small text-secondary mb-2">
                                        Volumes cannot be deleted if a container (even stopped) is still using them.
                                    </p>
                                    <pre className="doc-code-block mb-0 border-danger text-danger bg-dark x-small">
{`$ docker volume rm pgdata`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE DCA GOTCHA: THE PERMISSIONS WALL */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                3. The DCA Gotcha: The Permissions Wall
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker volumes don't magically fix Linux permissions. If your host user and container user don't match, you hit the "Permissions Wall."
                            </p>

                            <div className="p-3 rounded border border-danger mb-4" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-shield-lock-fill me-2"></i>The Immutable Permissions Rule</h5>
                                <p className="small text-light mb-2">
                                    You <strong>cannot</strong> define the owner (chown) directly inside a <code>--mount</code> command. Docker mounts are just pointers; they don't translate UIDs.
                                </p>
                            </div>

                            <h6 className="fw-bold text-light mb-2">The Golden Solution</h6>
                            <p className="small text-secondary mb-2">
                                To avoid "Permission Denied" errors, run the container as your host user:
                            </p>
                            <code className="text-info bg-dark p-2 rounded d-block mb-3 border border-info">
                                docker run --user $(id -u):$(id -g) ...
                            </code>
                        </div>
                    </div>

                    {/* 4. CREATING AND USING A NAMED VOLUME */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-hdd-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                4. Creating a Named Volume
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Now we use <code>--mount</code> with the proper user permissions to ensure our database can actually write its data.
                            </p>

                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker volume create pgdata`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Mounting the Volume</h5>
                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`$ docker run -d \\
  --name my-db \\
  --user $(id -u):$(id -g) \\
  -e POSTGRES_PASSWORD=secret \\
  --mount type=volume,source=pgdata,target=/var/lib/postgresql \\
  postgres:latest`}
                            </pre>

                            <div className="p-3 rounded border border-secondary mb-4" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <h6 className="fw-bold text-light mb-3"><i className="bi bi-puzzle-fill text-primary me-2"></i>Breaking Down the Mount</h6>
                                <ul className="small text-secondary mb-0">
                                    <li className="mb-2">
                                        <strong className="text-success">--user $(id -u):$(id -g)</strong>: Tells Docker to run the process as your specific host user so you have permission to read/write the volume.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-primary">type=volume</strong>: Tells Docker we are using a managed volume, not a bind mount.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-warning">source=pgdata</strong>: The safely managed external volume.
                                    </li>
                                    <li>
                                        <strong className="text-info">target=/var/lib/postgresql</strong>: The internal container path where Postgres stores data.
                                    </li>
                                </ul>
                            </div>

                            <hr className="my-5 border-secondary opacity-25" />

                            <h4 className="fw-bold fs-5 text-light mb-3">Architecture: Multiple Mounts</h4>
                            <p className="small text-secondary mb-2">
                                You can route data to different volumes by using multiple flags:
                            </p>

                            <pre className="doc-code-block mb-0 border-light text-light bg-dark x-small">
{`$ docker run -d \\
  --mount type=volume,source=public_images,target=/app/public/images \\
  --mount type=volume,source=private_docs,target=/app/secure/docs \\
  my-web-image:latest`}
                            </pre>
                        </div>
                    </div>

                    {/* 5. THE DCA GOTCHA: MOUNT VS -v */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-arrow-left-right"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                5. The DCA Gotcha: --mount vs -v
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The DCA exam focuses on the differences between the legacy <code>-v</code> flag and <code>--mount</code>.
                            </p>

                            <table className="table table-dark table-striped table-bordered mt-3 small">
                                <thead>
                                    <tr>
                                        <th className="text-primary">Feature</th>
                                        <th><code>--mount</code> (Modern)</th>
                                        <th><code>-v</code> (Legacy)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Readability</strong></td>
                                        <td>Explicit key-value pairs</td>
                                        <td>Cryptic colon-separated fields</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Swarm Services</strong></td>
                                        <td className="text-success">Required</td>
                                        <td className="text-danger">Not Supported</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Missing Target</strong></td>
                                        <td className="text-danger">Fails instantly</td>
                                        <td className="text-warning">Silently creates root-owned directory</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 6. THE DCA GOTCHA: PRE-POPULATION */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-box-arrow-in-right"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                6. The DCA Gotcha: Pre-population
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                What happens if you mount an <strong>empty volume</strong> into a container directory that <strong>already contains files</strong> in the image? For example, the official <code>nginx</code> image comes pre-packaged with default HTML files inside <code>/usr/share/nginx/html</code>.
                            </p>

                            <div className="p-3 rounded border border-warning mb-3" style={{ background: 'rgba(255, 193, 7, 0.05)' }}>
                                <h5 className="fw-bold text-warning"><i className="bi bi-info-circle-fill me-2"></i>The Pre-population Rule</h5>
                                <p className="small text-light mb-0">
                                    When you mount an <em>empty</em> volume into a container, Docker automatically copies the existing contents of the container's directory into the volume before starting the container.
                                </p>
                            </div>

                            <p className="small text-secondary mb-2">
                                However, with the <code>--mount</code> flag, you can explicitly disable this behavior:
                            </p>
                            <pre className="doc-code-block mb-4 border-warning text-warning bg-dark x-small">
{`$ docker run -d \\
  --name no-copy-app \\
  --mount type=volume,source=myvol,target=/usr/share/nginx/html,volume-nocopy \\
  nginx`}
                            </pre>
                            <p className="small text-secondary mb-0">
                                <strong>Exam Tip:</strong> The <code>volume-nocopy</code> option is ONLY available with the <code>--mount</code> syntax. It is impossible to use this feature with the old <code>-v</code> flag.
                            </p>
                        </div>
                    </div>

                    {/* 7. THE DCA GOTCHA: THE OVERWRITE SHADOW */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-eye-slash-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                7. The DCA Gotcha: The Overwrite Shadow
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                We just learned that an <em>empty</em> volume gets pre-populated. But what if the volume <strong>already has data</strong>?
                            </p>

                            <div className="p-3 rounded border border-info mb-4" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <h5 className="fw-bold text-info"><i className="bi bi-shield-shaded me-2"></i>The Shadowing Rule</h5>
                                <p className="small text-light mb-2">
                                    If the volume is NOT empty, the pre-population rule is completely ignored. Instead, the volume's contents will <strong>obscure (shadow)</strong> the container's contents. 
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> The container's original files are not deleted, they are just hidden while the volume is attached.
                                </p>
                            </div>

                            <h6 className="fw-bold text-light mb-2">Practical Example</h6>
                            <p className="small text-secondary mb-2">
                                If you mount a volume containing a custom website over a fresh Nginx container, the default Nginx welcome page is instantly hidden:
                            </p>
                            <pre className="doc-code-block mb-0 border-info text-info bg-dark x-small">
{`# Assume 'my-custom-vol' already contains our custom index.html
$ docker run -d \\
  --name shadowed-app \\
  --mount type=volume,source=my-custom-vol,target=/usr/share/nginx/html \\
  nginx`}
                            </pre>
                        </div>
                    </div>

                    {/* 8. THE DCA GOTCHA: VOLUME SHARING */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                8. The DCA Gotcha: Volume Sharing
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker volumes are designed to be shared. You can absolutely mount the exact same volume into two or more containers at the same time.
                            </p>

                            <pre className="doc-code-block mb-3 border-primary text-primary bg-dark x-small">
{`$ docker run -d --name app1 --mount type=volume,source=myvol,target=/data ubuntu
$ docker run -d --name app2 --mount type=volume,source=myvol,target=/data ubuntu`}
                            </pre>

                            <div className="p-3 rounded border border-warning mb-4" style={{ background: 'rgba(255, 193, 7, 0.05)' }}>
                                <h5 className="fw-bold text-warning"><i className="bi bi-exclamation-triangle-fill me-2"></i>The Concurrency Risk</h5>
                                <p className="small text-light mb-2">
                                    While Docker allows multiple containers to write simultaneously, <strong>Docker does NOT manage file locking.</strong>
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> If two containers modify the same file at the exact same millisecond, data corruption will occur.
                                </p>
                            </div>

                            <h6 className="fw-bold text-light mb-2">Practical Example: The Race Condition</h6>
                            <pre className="doc-code-block mb-4 border-primary text-primary bg-dark x-small">
{`# App 1 writes "AAAAA..." repeatedly
$ docker run -d --mount type=volume,source=myvol,target=/app/logs ubuntu \\
  bash -c 'while true; do echo "AAAAAAAAAAAAAAAA" >> /app/logs/shared-log.txt; done'

# App 2 writes "BBBBB..." repeatedly
$ docker run -d --mount type=volume,source=myvol,target=/app/logs ubuntu \\
  bash -c 'while true; do echo "BBBBBBBBBBBBBBBB" >> /app/logs/shared-log.txt; done'

# View the corruption:
$ docker run --rm --mount type=volume,source=myvol,target=/app/logs ubuntu cat /app/logs/shared-log.txt
AAAABBBBBAAAAAAA   <-- Data Corruption!`}
                            </pre>
                        </div>
                    </div>

                    {/* 9. THE DCA GOTCHA: ANONYMOUS VOLUMES */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-ghost"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                9. The DCA Gotcha: Anonymous Volumes
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you omit the <code>source</code> in a mount command, Docker creates an <em>Anonymous Volume</em> with a random ID.
                            </p>

                            <pre className="doc-code-block mb-3 border-danger text-danger bg-dark x-small">
{`$ docker run -d --mount type=volume,target=/data nginx`}
                            </pre>

                            <div className="p-3 rounded border border-danger mb-0" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <p className="small text-light mb-0">
                                    <strong>Exam Tip:</strong> Anonymous volumes are easily lost. <code>docker volume prune</code> will delete them if they aren't currently attached to a running container.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 10. THE DCA GOTCHA: NESTED MOUNT INTERCEPTION */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-layers-half"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                10. The DCA Gotcha: Nested Mount Interception
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                When mounting a volume inside a bind mount, the most specific path wins.
                            </p>

                            <pre className="doc-code-block mb-3 border-info text-info bg-dark x-small">
{`$ docker run -d \\
  --mount type=bind,source=/home/user/code,target=/var/www/html \\
  --mount type=volume,source=user-data,target=/var/www/html/uploads \\
  my-app`}
                            </pre>

                            <div className="p-3 rounded border border-info mb-0" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <h5 className="fw-bold text-info"><i className="bi bi-bullseye me-2"></i>The Interceptor</h5>
                                <p className="small text-light mb-2">
                                    Data written to the sub-folder stays in the volume. It does <strong>NOT</strong> "pass through" to your host's bind mount folder.
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Architecture Note:</strong> Think of it as a "Portal." Once you step into the sub-folder, you have left the host filesystem and entered the Docker Volume space.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
