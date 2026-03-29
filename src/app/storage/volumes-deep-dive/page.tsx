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

                            <div className="mt-4 p-4 rounded" style={{ background: '#1c2128', border: '1px solid #30363d' }}>
                                <h4 className="fs-6 text-uppercase text-primary mb-3">What means what?</h4>
                                <div className="vstack gap-3">
                                    <div className="small">
                                        <code className="text-info">services:</code> 
                                        <span className="opacity-75 ms-2">Start here—it tells Docker that "db" and "adminer" are separate containers.</span>
                                    </div>
                                    <div className="small border-top border-secondary pt-2">
                                        <code className="text-info">db:</code> 
                                        <span className="opacity-75 ms-2"> This is a <strong>Service Name</strong>. It's like a hostname—"adminer" can find the database by simply connecting to <code>db:5432</code>.</span>
                                    </div>
                                    <div className="small border-top border-secondary pt-2">
                                        <code className="text-info">ports: 8080:8080</code> 
                                        <span className="opacity-75 ms-2"> Connects your computer's browser (8080) to the container's engine (8080).</span>
                                    </div>
                                    <div className="small border-top border-secondary pt-2">
                                        <code className="text-info">db_data:/var/...</code> 
                                        <span className="opacity-75 ms-2"> This is the <strong>Volume Mount</strong>. It maps the virtual "Bank Vault" (db_data) to the actual database folder.</span>
                                    </div>
                                    <div className="small border-top border-secondary pt-2">
                                        <code className="text-info">volumes: (at the end)</code> 
                                        <span className="opacity-75 ms-2"> This acts as a <strong>Catalog</strong>. It tells Docker: "I plan to use a named volume called db_data—please create it if it doesn't exist."</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPERT Q&A: VOLUME SHARING */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-patch-question-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Expert Q&A: Volume Sharing & Conflicts
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            
                            {/* QUESTION 1 */}
                            <div className="mb-5 pb-4 border-bottom border-secondary border-opacity-25">
                                <h4 className="fs-5 text-info mb-3">
                                    <i className="bi bi-question-circle me-2"></i>
                                    "If two containers use the same volume, will data conflict?"
                                </h4>
                                <p>
                                    The short answer is: <strong>Yes, absolutely.</strong>
                                </p>
                                <p className="small opacity-75">
                                    Docker provides the storage "plumbing," but it <strong>does not provide any locking mechanisms</strong>. 
                                    If two containers try to write to the same file at the exact same time, you risk 
                                    data corruption or "Last Writer Wins" scenarios.
                                </p>
                                
                                <div className="doc-alert doc-alert-info mt-3">
                                    <i className="bi bi-lightbulb-fill"></i>
                                    <div>
                                        <strong>Noob Note:</strong><br />
                                        Think of it like a <strong>shared Word Document</strong> without "Auto-Save" or "Locking". 
                                        If you and your friend both type at the same time, the person who hits "Save" last 
                                        will overwrite whatever the first person wrote!
                                    </div>
                                </div>
                            </div>

                            {/* QUESTION 2 */}
                            <div className="mb-4">
                                <h4 className="fs-5 text-info mb-3">
                                    <i className="bi bi-question-circle me-2"></i>
                                    "Wait, so can I use this to let containers 'talk' to each other?"
                                </h4>
                                <p>
                                    <strong>Yes!</strong> This is actually a very powerful strategy called the <strong>Sidecar Pattern</strong>.
                                </p>

                                <div className="doc-alert doc-alert-success mt-3">
                                    <i className="bi bi-check2-circle"></i>
                                    <div>
                                        <strong>The Goal:</strong><br />
                                        One container <strong>Writes</strong> (e.g., your Web App logs) and another container 
                                        <strong>Reads</strong> (e.g., a Log Shipper like Fluentd) in real-time.
                                    </div>
                                </div>

                                <h5 className="fs-6 text-uppercase text-danger mt-4">The Solution to "Inconsistent Reads"</h5>
                                <p className="small mb-2">
                                    If the Reader starts reading a file while the Writer is still middle of writing 100MB, 
                                    the Reader gets a <strong>corrupted/partial file</strong>.
                                </p>
                                <div className="p-3 rounded mb-3" style={{ background: '#1c2128', border: '1px solid #30363d' }}>
                                    <p className="small fw-bold mb-2">Expert Strategy: Atomic Renames</p>
                                    <ol className="small mb-0 opacity-75">
                                        <li>Writer saves data to <code>file.txt.tmp</code></li>
                                        <li>Writer renames it to <code>file.txt</code> (renames are <strong>atomic</strong> in Linux)</li>
                                        <li>Reader <em>only</em> looks for <code>file.txt</code></li>
                                    </ol>
                                </div>
                            </div>

                            {/* QUESTION 3 */}
                            <div className="mb-0">
                                <h4 className="fs-5 text-info mb-3">
                                    <i className="bi bi-question-circle me-2"></i>
                                    "If a volume already has data and I mount it to a new container, what happens?"
                                </h4>
                                <p>
                                    This is a critical "DCA Exam" topic! The behavior depends on whether the volume is empty or not:
                                </p>
                                <ul className="small opacity-75">
                                    <li className="mb-2"><strong>If Volume is EMPTY:</strong> Docker <strong>initializes</strong> it by copying files from the container into the volume.</li>
                                    <li><strong>If Volume HAS DATA:</strong> The volume <strong>mounts over</strong> the container's folder. It's like putting a physical sticker over a word—the original word (container data) is still there, but you can't see or touch it.</li>
                                </ul>

                                <div className="doc-alert doc-alert-warning mt-3">
                                    <i className="bi bi-shuffle"></i>
                                    <div>
                                        <strong>Merge vs Mount:</strong><br />
                                        Docker volumes <strong>NEVER merge</strong> files. It's not like Git. If your container has <code>A.txt</code> 
                                        and the volume has <code>B.txt</code>, the container will ONLY see <code>B.txt</code>. 
                                        The original <code>A.txt</code> is hidden (shadowed) until the volume is unmounted.
                                    </div>
                                </div>

                                <h5 className="fs-6 text-uppercase text-info mt-4">"So the original file is lost forever?"</h5>
                                <p className="small mb-0 text-success fw-bold">
                                    <i className="bi bi-shield-check me-1"></i>
                                    No! This is the magic of Docker.
                                </p>
                                <p className="small opacity-75 mt-2">
                                    The original file is baked into the <strong>Image Layer</strong>, which is <strong>Read-Only</strong>. 
                                    Docker never deletes files from an image. The volume just "sits on top" of the folder. 
                                    If you run the container again <em>without</em> the volume, your original <code>config.json</code> 
                                    will be right back where it was!
                                </p>

                                <div className="doc-alert doc-alert-danger mt-4 mb-0">
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                    <div>
                                        <strong>The Shared Reality:</strong><br />
                                        While your <strong>Image Layers</strong> are private and safe, a <strong>Volume</strong> is like a shared piece of paper. 
                                        If Container A and Container B both mount Volume V, they <strong>WILL</strong> see each other's changes. 
                                        If Container B edits <code>config.json</code> in the volume, Container A will see that change immediately. 
                                        <strong>This is where clashing happens!</strong>
                                    </div>
                                </div>
                            </div>

                            {/* QUESTION 4 */}
                            <div className="mb-0 mt-5 border-top pt-5" style={{ borderTopColor: '#30363d !important' }}>
                                <h4 className="fs-5 text-info mb-3">
                                    <i className="bi bi-question-circle me-2"></i>
                                    "Can I mount any folder I want as a Volume?"
                                </h4>
                                <p>
                                    This is a common point of confusion! The answer depends on your <strong>Mount Type</strong>:
                                </p>
                                <ul className="small opacity-75">
                                    <li className="mb-2">
                                        <strong>Volumes:</strong> <span className="text-danger">No.</span> Docker manages these. 
                                        They always live in Docker's "private" area (e.g., <code>/var/lib/docker/volumes/</code>). 
                                        You give them a name, and Docker chooses the location.
                                    </li>
                                    <li>
                                        <strong>Bind Mounts:</strong> <span className="text-success">Yes!</span> You can mount 
                                        <em>any</em> folder or file from your host machine (like <code>/home/user/project</code>).
                                    </li>
                                </ul>

                                <div className="doc-alert doc-alert-info mt-3 mb-0">
                                    <i className="bi bi-shield-lock-fill"></i>
                                    <div>
                                        <strong>Expert Insight:</strong><br />
                                        While you <em>can</em> mount any folder as a bind mount, be careful! 
                                        Mounting sensitive host folders like <code>/etc</code> or <code>/root</code> 
                                        to a container is a security risk. If the container is compromised, the host is compromised.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}