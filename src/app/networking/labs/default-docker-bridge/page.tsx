import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Default Bridge Network Deep Dive - Docker Documentation",
    description: "Go behind the scenes and see exactly how Docker uses veth pairs and the default docker0 bridge to connect containers to your host machine."
};

export default function BridgeNetworkPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Default Bridge Network Deep Dive
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Behind the scenes: How Docker hacks the Linux kernel to create virtual hardware.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. THE VIRTUAL HARDWARE METAPHOR */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. The Virtual Hardware Metaphor
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Docker networking isn't just magic "software" - it's a simulation of real-world networking hardware. When you look at your host's network interfaces, you are literally seeing the components of a virtual server room.
                            </p>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-info h-100">
                                        <h4 className="fw-bold text-info"><i className="bi bi-router-fill me-2"></i>docker0 (The Switch)</h4>
                                        <p className="small text-secondary mt-2">
                                            Imagine a giant <strong>Ethernet Switch</strong> sitting inside your computer. This switch is called <code>docker0</code>. It has its own IP (usually <code>172.17.0.1</code>) and it acts as the gateway for all containers.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-success h-100">
                                        <h4 className="fw-bold text-success"><i className="bi bi-alt me-2"></i>veth (The Virtual Wire)</h4>
                                        <p className="small text-secondary mt-2">
                                            Since we can't use physical cables, Docker creates <strong>veth pairs</strong> (Virtual Ethernet). Think of it as a virtual wire. One end is plugged into the <code>docker0</code> switch, and the other end is plugged into the Container.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. TERMINAL REALITY CHECK */}
                    <div className="doc-section-card shadow-lg border-secondary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-secondary">
                                <i className="bi bi-terminal-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-secondary">
                                2. Terminal Reality Check
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you hit <code>ip address</code> in your host's terminal, you'll see these virtual components in the flesh. Here is a breakdown of what that looks like:
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
                                {`# 1. The Central Switch
4: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0

# 2. The Virtual Wires (One for each running container!)
16: veth4b370bd@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> ... master docker0 state UP
18: veth208e511@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> ... master docker0 state UP
19: veth5022db9@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> ... master docker0 state UP`}
                            </pre>

                            <div className="doc-alert px-3 py-2 mt-4 mb-0" style={{ background: 'rgba(108, 117, 125, 0.1)', borderLeft: '4px solid #6c757d' }}>
                                <div>
                                    <strong className="text-secondary d-block mb-1">What did we just see?</strong>
                                    In this example, we see <strong>one</strong> switch (docker0) and <strong>three</strong> virtual wires (veth). Each wire has <code>master docker0</code> next to it, which is Linux's way of saying "This wire is plugged into the docker0 switch."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE INSPECTION - HOW THEY GET IPs */}
                    <div className="doc-section-card shadow-lg border-warning mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-search"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                3. The Inspection (How they get IPs)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                When you run <code>docker inspect bridge</code>, you see the brain of the network. Docker acts like a tiny ISP (Internet Service Provider) for its containers.
                            </p>

                            <pre className="doc-code-block mb-4 border-warning text-warning bg-dark x-small">
                                {`"Containers": {
    "5a3d4a80": { "Name": "redis-7", "IPv4Address": "172.17.0.2/16" },
    "a777fa2e": { "Name": "mongo",   "IPv4Address": "172.17.0.3/16" },
    "7592c8ea": { "Name": "redis-8", "IPv4Address": "172.17.0.4/16" }
}`}
                            </pre>

                            <h5 className="fw-bold fs-6 text-light">Wait... Who gave them those IPs?</h5>
                            <p className="small text-secondary">
                                Docker has a service called <strong>IPAM</strong> (IP Address Management). When a container starts, IPAM checks its records, sees that <code>172.17.0.1</code> is the gateway, and starts handing out the next available numbers in the sequence (0.2, 0.3, 0.4...).
                            </p>

                            <div className="doc-alert doc-alert-info mt-4 py-3">
                                <div>
                                    <strong className="d-block mb-1">The "Funny" Part:</strong>
                                    <p className="mb-0 x-small text-dark">
                                        Your containers think they are on a real physical network with a dedicated ISP. In reality, they are just trapped in a tiny "Matrix" managed entirely by the Docker Engine!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. BRIDGE LINK - THE PHYSICAL PROOF */}
                    <div className="doc-section-card shadow-lg border-success mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-link-45deg"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                4. Bridge Link: The Physical Proof
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                If you want to see the literal status of those virtual wires plugged into the switch, you can use the Linux command <code>bridge link</code>:
                            </p>

                            <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
                                {`$ bridge link
16: veth4b370bd@enp1s0: master docker0 state forwarding ...
18: veth208e511@enp1s0: master docker0 state forwarding ...
19: veth5022db9@enp1s0: master docker0 state forwarding ...`}
                            </pre>

                            <p className="mt-3 small text-secondary">
                                This confirms all three "veth" interfaces are active and forwarding traffic through the <code>docker0</code> master. If you stop a container, the corresponding <code>veth</code> interface instantly vanishes from the host!
                            </p>
                        </div>
                    </div>

                    {/* 5. THE NGINX EXPERIMENT: ISOLATION PROOF */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                5. The Nginx Experiment: Isolation Proof
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Let's run a real experiment. We pull the <code>nginx</code> image and start a container named <code>nginx-server</code> WITHOUT any port publishing flags (no <code>-p</code>).
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
                                {`$ docker run -d --name nginx-server nginx`}
                            </pre>

                            <p>Now, we inspect the bridge network again:</p>

                            <pre className="doc-code-block mb-3 border-danger text-danger bg-dark x-small">
                                {`"nginx-server": {
    "EndpointID": "c51f668f...",
    "MacAddress": "f6:0c:3c:de:6a:b5",
    "IPv4Address": "172.17.0.5/16"
}`}
                            </pre>

                            <div className="doc-alert px-3 py-3 mt-3 mb-4" style={{ background: 'rgba(220, 53, 69, 0.1)', borderLeft: '4px solid #dc3545' }}>
                                <div>
                                    <strong className="text-danger d-block mb-2">The Critical Realization:</strong>
                                    <p className="mb-0 text-light x-small">
                                        The <code>nginx-server</code> is officially "alive" and has its own private IP (<code>172.17.0.5</code>) on the <code>docker0</code> switch.
                                    </p>
                                    <p className="mt-2 mb-0 fw-bold text-danger x-small">
                                        HOWEVER: If you try to visit http://localhost in your browser, it will fail!
                                    </p>
                                    <p className="mt-2 text-light x-small">
                                        Even though the server is running, it is 100% trapped behind the bridge. To anyone outside your physical host machine, this container effectively does not exist.
                                    </p>
                                </div>
                            </div>

                            <p>Here is the physical proof of that trap. Even though your browser can't see it, your host's <code>ip address</code> confirms a <strong>brand new virtual wire</strong> has been plugged in:</p>

                            <pre className="doc-code-block mb-4 border-info text-info bg-dark x-small">
                                {`# The new wire for the nginx-server - it exists but is isolated!
24: veth01b8d26@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> ... master docker0 state UP`}
                            </pre>

                            <h5 className="fw-bold fs-6 text-light mt-4">The Detective Work: Which port does it use?</h5>
                            <p className="small text-secondary">
                                Before we can map the ports, we need to know what port the application inside the container is actually listening on. We can find this out by inspecting the image itself:
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
                                {`$ docker image inspect nginx
...
"ExposedPorts": {
    "80/tcp": {}
}
...`}
                            </pre>
                            <p className="x-small text-secondary mb-4">This tells us the <strong>Internal Port</strong> is <code>80</code>. Now we can finally build the hallway!</p>

                            <h5 className="fw-bold fs-6 text-light mt-4">The Solution: Port Publishing</h5>
                            <p className="small text-secondary">
                                To make this server visible to the world, we must tell Docker to open a "Hallway" from our Host's port (8080) to the Container's port (80). 
                                <em> (We use 8080 on the host to avoid "Permission Denied" errors on privileged port 80).</em>
                            </p>

                            <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
                                {`# Run in detached mode (-d) and publish port 8080 (-p)
docker run -d -p 8080:80 --name nginx-fixed nginx`}
                            </pre>
                            <p className="mt-2 x-small text-secondary">Now you can visit <code>http://localhost:8080</code> and finally see your Nginx welcome page!</p>
                        </div>
                    </div>

                    {/* 6. REAL-WORLD BRIDGE EXPERIMENT: POSTGRES */}
                    <div className="doc-section-card shadow-lg border-primary mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-database-fill-gear"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                6. Real-World Bridge Experiment: Postgres
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Enough with Nginx—let's check a real database on the bridge network! We pull the official Postgres image (using a specific Alpine tag) and find its secrets.
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
                                {`$ docker pull postgres:alpine3.22
$ docker inspect postgres:alpine3.22`}
                            </pre>

                            <p className="small text-secondary">
                                After looking at the <code>ExposedPorts</code>, we confirm it uses <strong>5432</strong>. Now we run it with port publishing and a mandatory environment variable (the password):
                            </p>

                            <pre className="doc-code-block mb-3 border-primary text-primary bg-dark x-small">
                                {`$ docker run -d \\
  -p 5432:5432 \\
  --name postgres \\
  -e POSTGRES_PASSWORD=pass123 \\
  postgres:alpine3.22`}
                            </pre>

                            <p>Let's look at the Bridge Network's "Brain" now that a database is plugged in:</p>

                            <pre className="doc-code-block mb-3 border-secondary text-light x-small">
                                {`❯ docker network inspect bridge
[
    {
        "Name": "bridge",
        "Containers": {
            "d7a59ed8...": {
                "Name": "postgres",
                "IPv4Address": "172.17.0.2/16"
            }
        }
    }
]`}
                            </pre>

                            <div className="doc-alert px-3 py-2 mt-3 mb-4" style={{ background: 'rgba(13, 110, 253, 0.1)', borderLeft: '4px solid #0d6efd' }}>
                                <p className="mb-0 x-small text-light">
                                    This confirms <strong>postgres</strong> is alive at <code>172.17.0.2</code> and listening on port <code>5432</code>. But can another container reach it?
                                </p>
                            </div>

                            <h5 className="fw-bold fs-6 text-light mt-4">The Internal Ping Test</h5>
                            <p className="small text-secondary">
                                We'll spin up a temporary <code>alpine</code> container and try to reach the database using its internal bridge IP:
                            </p>

                            <pre className="doc-code-block mb-0 border-success text-success bg-dark x-small">
                                {`❯ docker run -it alpine sh
/ # ping 172.17.0.2
PING 172.17.0.2(172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.163 ms
64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.123 ms
64 bytes from 172.17.0.2: seq=2 ttl=64 time=0.167 ms`}
                            </pre>
                            <p className="mt-2 x-small text-secondary">
                                <strong>Success!</strong> Communication inside the internal bridge works perfectly as long as we use the IP address.
                            </p>
                        </div>
                    </div>

                    {/* 7. HITTING "THE WALL": THE IDENTITY CRISIS */}
                    <div className="doc-section-card shadow-lg border-danger mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-barrier-split"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                7. Hitting "The Wall" (The Identity Crisis)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                To truly understand why <code>docker0</code> is frustrating, you need to see it fail in two different ways. Let's try to connect our Postgres database to our Alpine app.
                            </p>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <h6 className="fw-bold fs-6">Experiment A: Name-based connection</h6>
                                    <pre className="doc-code-block x-small mb-3">
                                        {`$ docker ps
CONTAINER ID   IMAGE     NAMES
d7a59ed80c43   postgres  postgres

# Try to ping the DB by its name from Alpine
/ # ping postgres`}
                                    </pre>
                                    <h6 className="fw-bold fs-6 text-danger">The Result: Failure</h6>
                                    <pre className="doc-code-block x-small border-danger text-danger bg-dark">
                                        {`ping: bad address 'postgres'`}</pre>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="fw-bold fs-6">Experiment B: The IP Trap</h6>
                                    <p className="x-small text-secondary">
                                        "Fine," you say. "I'll just hardcode the IP address (<code>172.17.0.2</code>) into my app's config file. What could go wrong?"
                                    </p>
                                    <pre className="doc-code-block x-small mb-3">
                                        {`# Restart the database
$ docker restart postgres

# Try to ping the OLD IP again
/ # ping 172.17.0.2`}
                                    </pre>
                                    <h6 className="fw-bold fs-6 text-warning">The Risk: Brittle Connections</h6>
                                    <p className="x-small text-secondary mb-0">
                                        Because you are on the default bridge, if that IP changes (e.g., you start containers in a different order after a reboot), your app is <strong>DEAD</strong>. You'd have to manually update your config files like it's 1995.
                                    </p>
                                </div>
                            </div>

                            <hr className="my-4 border-secondary opacity-25" />

                            <h5 className="text-success fw-bold fs-6 mb-3"><i className="bi bi-star-fill me-2"></i>The Pro Solution: User-Defined Bridge</h5>
                            <p className="small text-secondary">
                                Now, let's try the exact same thing on a <strong>User-Defined Network</strong>.
                            </p>

                            <div className="p-3 rounded border border-success mb-3" style={{ background: 'rgba(25, 135, 84, 0.05)' }}>
                                <pre className="doc-code-block x-small mb-2">
                                    {`# 1. Create a network
docker network create my-app-net

# 2. Start the DB on that network
docker run -d --name postgres-fixed --network my-app-net postgres:alpine3.22

# 3. Start the Web App on the same network
docker run -it --network my-app-net alpine ping postgres-fixed`}
                                </pre>
                            </div>

                            <pre className="doc-code-block x-small border-success text-success bg-dark mb-0">
                                {`64 bytes from postgres-fixed (172.18.0.2): icmp_seq=1 ttl=64 time=0.082 ms`}
                            </pre>
                            <p className="mt-2 x-small text-success fw-bold">
                                Pure magic. Even if the IP changes, the name <code>postgres-fixed</code> follows the container wherever it goes!
                            </p>
                        </div>
                    </div>

                    {/* 8. THE TRAP: DEFAULT VS. USER-DEFINED */}
                    <div className="doc-section-card shadow-lg border-info mt-4">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-shield-exclamation"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                8. The Trap: Default vs. User-Defined
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                You have just mastered the <strong>Default Bridge Network</strong> (<code>docker0</code>). But here is the massive twist:
                            </p>
                            <h5 className="text-danger fw-bold fs-6 mb-3 text-center py-2 bg-danger bg-opacity-10 border border-danger rounded">
                                Docker actually wants you to STOP using the Default Bridge!
                            </h5>

                            <p className="small text-secondary">
                                While <code>docker0</code> is great for learning, Docker considers it a "Second Class Citizen" for real applications. Instead, they recommend you always use <strong>User-Defined Bridge Networks</strong>.
                            </p>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="p-3 rounded border border-danger h-100" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                        <h6 className="fw-bold text-danger"><i className="bi bi-x-circle-fill me-2"></i>The Default Bridge (docker0)</h6>
                                        <ul className="x-small text-light mt-2 mb-0">
                                            <li className="mb-2"><strong>No Automatic DNS:</strong> Containers cannot talk to each other by name.</li>
                                            <li className="mb-2"><strong>No Isolation:</strong> Every container on the host is in the same crowded room.</li>
                                            <li className="mb-0"><strong>Hard to Configure:</strong> You can't change network settings without restarting the Docker daemon.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 rounded border border-success h-100" style={{ background: 'rgba(25, 135, 84, 0.05)' }}>
                                        <h6 className="fw-bold text-success"><i className="bi bi-check-circle-fill me-2"></i>User-Defined Bridges</h6>
                                        <ul className="x-small text-light mt-2 mb-0">
                                            <li className="mb-2"><strong>Automatic DNS:</strong> Just use names: <code>ping database</code> just works!</li>
                                            <li className="mb-2"><strong>Perfect Isolation:</strong> Only containers you explicitly invite to the network can talk to each other.</li>
                                            <li className="mb-0"><strong>Dynamic Security:</strong> You can connect/disconnect running containers at any time.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 rounded" style={{ background: 'rgba(13, 110, 253, 0.05)', border: '1px solid rgba(13, 110, 253, 0.2)' }}>
                                <p className="mb-0 small text-center">
                                    <strong>The DCA Rule of Thumb:</strong> If you are running anything more complex than a single hello-world container, <strong>always</strong> create your own network with <code>docker network create</code>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
