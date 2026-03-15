import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Docker Volumes - Docker Storage",
    description: "Learn how Docker Volumes persist container data and why they are preferred in production environments."
};

export default function DockerVolumesPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Docker Volumes
                    </h1>

                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Persistent storage managed completely by Docker.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* WHAT IS VOLUME */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className={"bi " + "bi-database-fill"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                What is a Docker Volume?
                            </h2>
                        </div>

                        <div className="doc-card-body">

                            <p>
                                A <strong>Docker Volume</strong> is a special storage location
                                used to store data <strong>outside a container</strong>.
                            </p>

                            <p>
                                Containers are temporary by design. If a container is removed,
                                everything stored inside it disappears.
                            </p>

                            <p>
                                Volumes solve this problem by keeping important data stored
                                safely on the Docker host machine.
                            </p>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-lightbulb-fill"></i>
                                <div>
                                    <strong>Noob Analogy (The Shared Bank Vault):</strong><br />
                                    Think of a container as a <strong>Temporary Employee</strong> and a volume 
                                    as a <strong>Shared Bank Vault</strong>. The employee can use the money (data) 
                                    while they work, but if they get fired (container deleted), the money stays safe 
                                    in the vault. Even better, a <strong>New Employee</strong> can walk in and 
                                    access the same vault immediately!
                                </div>
                            </div>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-hdd"></i>
                                <div>
                                    <strong>Location Example:</strong><br />
                                    Docker usually stores volumes inside
                                    <code> /var/lib/docker/volumes/</code>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* WHY VOLUMES */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-gear-fill"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Why Volumes Are Preferred
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <ul style={{ lineHeight: 2 }}>
                                <li>Data survives even if the container is deleted</li>
                                <li>Docker automatically manages the storage</li>
                                <li>Easy to backup or migrate</li>
                                <li>Multiple containers can share the same data</li>
                                <li>Better performance than container filesystem</li>
                            </ul>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-server"></i>
                                <div>
                                    In production environments, <strong>volumes are usually preferred</strong>
                                    for databases, logs, uploaded files, and persistent application data.
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* PERSISTENCE */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-clock-history"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Data Persistence
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Containers are temporary. If a container is deleted,
                                its internal data disappears.
                            </p>

                            <p>
                                But if that data is stored in a <strong>volume</strong>,
                                the data survives even after the container is removed.
                            </p>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-database"></i>
                                <div>
                                    <strong>Real Example:</strong><br />
                                    A MySQL container stores database files inside a volume.
                                    If the container crashes or is recreated, the database remains safe.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BASIC COMMAND */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-terminal"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Mounting a Volume
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                When starting a container, you can attach a volume so the
                                container can read or write data to it.
                            </p>

                            <div className="doc-sub-card">

                                <div className="doc-sub-card-body">

                                    <p><strong>Recommended syntax</strong></p>

                                    <pre>
                                        {`docker run --mount type=volume,src=myvolume,dst=/data`}
                                    </pre>

                                    <p><strong>Short syntax</strong></p>

                                    <pre>
                                        {`docker run -v myvolume:/data`}
                                    </pre>

                                    <p>
                                        Both commands create a volume named <strong>myvolume</strong>
                                        and mount it inside the container at <code>/data</code>.
                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                    {/* CREATE VOLUME */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-plus-circle"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Create and Manage Volumes
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Volumes can be created and managed independently from containers.
                            </p>

                            <pre>{`docker volume create mydata`}</pre>
                            <pre>{`docker volume ls`}</pre>
                            <pre>{`docker volume inspect mydata`}</pre>
                            <pre>{`docker volume rm mydata`}</pre>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-tools"></i>
                                <div>
                                    This allows multiple containers to reuse the same storage.
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* REAL WORLD EXAMPLE */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-globe"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Real World Example (Database Storage)
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Databases require persistent storage to prevent data loss.
                            </p>

                            <pre>
                                {`docker run -d \
--name mysql-db \
-v mysqldata:/var/lib/mysql \
mysql:8`}
                            </pre>

                            <p>
                                The database files are stored inside the
                                <strong> mysqldata volume</strong>.
                            </p>

                            <ul style={{ lineHeight: 2 }}>
                                <li>Deleting the container does not delete the database</li>
                                <li>A new container can reuse the same data</li>
                                <li>This is how databases run safely in production</li>
                            </ul>

                        </div>
                    </div>

                    {/* NAMED VS ANONYMOUS */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-tags"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Named vs Anonymous Volumes
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p><strong>Named Volume</strong></p>

                            <pre>{`docker run -v mydata:/app`}</pre>

                            <p>
                                The volume has a specific name (<strong>mydata</strong>) and can
                                be reused by other containers.
                            </p>

                            <p><strong>Anonymous Volume</strong></p>

                            <pre>{`docker run -v /app`}</pre>

                            <p>
                                Docker automatically creates a random name. These are harder
                                to manage and usually avoided in production systems.
                            </p>

                        </div>
                    </div>

                    {/* READ ONLY */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-lock-fill"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Read Only Volumes
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <p>
                                Sometimes a container only needs to read files from a volume.
                            </p>

                            <pre>
                                {`docker run -v myvolume:/data:ro`}
                            </pre>

                            <p>
                                The <strong>:ro</strong> option makes the volume read-only so the
                                container cannot modify the data.
                            </p>

                        </div>
                    </div>

                    {/* VOLUME DRIVERS */}
                    <div className="doc-section-card shadow-lg border-info">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-cloud-upload-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Volume Drivers (Plugins)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                By default, Docker uses the <code>local</code> driver (storing data on your host). 
                                However, senior architectures use <strong>Volume Drivers</strong> to store data 
                                on external cloud storage or network drives.
                            </p>
                            <ul className="mb-0">
                                <li><strong>NFS:</strong> Share volumes across multiple servers.</li>
                                <li><strong>AWS EBS / Azure Disk:</strong> Persists data even if the host machine dies.</li>
                                <li><strong>DigitalOcean Block Storage:</strong> Seamless scaling for containers.</li>
                            </ul>
                        </div>
                    </div>

                    {/* BACKUP AND RESTORE */}
                    <div className="doc-section-card shadow-lg border-warning">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Backup & Restore (The Senior Pattern)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Since volumes are managed by Docker, you can't just "copy-paste" them. 
                                The official way to backup is to use a <strong>temporary container</strong> 
                                that tars the volume data.
                            </p>
                            <h4 className="fs-6 text-uppercase opacity-75">Backup Command:</h4>
                            <pre className="doc-code-block">
{`docker run --rm --volumes-from db_container \\
  -v $(pwd):/backup ubuntu \\
  tar cvf /backup/backup.tar /var/lib/mysql`}
                            </pre>
                            <p className="small text-secondary mt-2">
                                <strong>Explanation:</strong> This starts a temporary container, 
                                connects to the existing volume, tars the content, and drops it 
                                into your current host folder (via a bind mount).
                            </p>
                        </div>
                    </div>

                    {/* MOUNT PROPAGATION */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-arrows-expand"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Senior Topic: Mount Propagation
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                This defines whether mounts created <em>inside</em> a container's volume are 
                                visible to the host (or vice-versa).
                            </p>
                            <table className="table table-dark table-sm mb-0">
                                <thead>
                                    <tr>
                                        <th>Mode</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>shared</code></td>
                                        <td>Sub-mounts are visible to both host and container.</td>
                                    </tr>
                                    <tr>
                                        <td><code>slave</code></td>
                                        <td>Host sub-mounts visible to container, but not vice-versa.</td>
                                    </tr>
                                    <tr>
                                        <td><code>private</code></td>
                                        <td>Sub-mounts are never shared. (Default)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* CLEANUP */}
                    <div className="doc-section-card shadow-lg">

                        <div className="doc-card-header-wrapper">

                            <div className="heading-icon">
                                <i className={"bi " + "bi-trash"}></i>
                            </div>

                            <h2 className="doc-card-heading">
                                Remove Unused Volumes
                            </h2>

                        </div>

                        <div className="doc-card-body">

                            <pre>{`docker volume prune`}</pre>

                            <p>
                                This command removes all unused volumes and frees disk space.
                            </p>

                        </div>

                    </div>

                    {/* VOLUMES IN DOCKER COMPOSE */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-file-earmark-code"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Volumes with Docker Compose
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker Compose makes volumes even more powerful by allowing you to share 
                                them across multiple services.
                            </p>

                            <pre className="doc-code-block">
{`services:
  db:
    image: postgres:latest
    volumes:
      - db_data:/var/lib/postgresql/data # Use a named volume

  adminer:
    image: adminer:latest
    ports:
      - 8080:8080

volumes:
  db_data: # Crucial: Named volumes must be declared here!`}
                            </pre>

                            <div className="doc-alert doc-alert-info mt-3">
                                <i className="bi bi-exclamation-circle-fill"></i>
                                <div>
                                    <strong>Important:</strong> If you use a <strong>named volume</strong> 
                                    (like <code>db_data</code>), you must declare it at the bottom-level 
                                    <code>volumes:</code> key, or Compose will throw an error.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}