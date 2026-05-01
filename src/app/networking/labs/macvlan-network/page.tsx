import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Macvlan Network Lab - Docker Documentation",
    description: "Learn how to bypass Docker's bridge completely and attach containers directly to your physical network using Macvlan."
};

export default function MacvlanNetworkLabPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Lab: The Macvlan Network
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Giving your containers a physical presence on your company's LAN.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* 1. HITTING THE WALL: THE CORPORATE ROUTER */}
                    <div className="doc-section-card shadow-lg border-danger">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-building-slash"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                1. Hitting the Wall: The Corporate Router
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Imagine you work in a bank. The IT Security team has strict rules: Every single application running on the network must have its own dedicated IP address assigned by the main company router, and its MAC address must be registered for security auditing.
                            </p>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-secondary h-100">
                                        <h5 className="fw-bold fs-6 text-light"><i className="bi bi-shield-lock text-warning me-2"></i>The Bridge Failure</h5>
                                        <p className="small text-secondary mb-2">
                                            You try to deploy an old legacy application using the standard bridge network (<code>-p 8080:80</code>).
                                        </p>
                                        <p className="small text-danger fw-bold mb-0">
                                            The IT team rejects it immediately.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="doc-sub-card border-danger h-100">
                                        <h5 className="fw-bold fs-6 text-danger"><i className="bi bi-eye-slash me-2"></i>Why it failed</h5>
                                        <ul className="small text-secondary mb-0">
                                            <li className="mb-2">Bridge networks use <strong>NAT masquerading</strong>.</li>
                                            <li className="mb-2">To the corporate router, the container's traffic looks exactly like it's coming from the Docker Host server itself.</li>
                                            <li>The router cannot see the container's internal IP (172.17.x.x) or MAC address. It is hidden.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <h5 className="fw-bold fs-6 text-success mt-4">The Solution: Macvlan</h5>
                            <p className="small text-secondary mb-0">
                                The <code>macvlan</code> driver allows us to bypass the Docker bridge entirely. It takes the physical network card of your server (e.g., <code>eth0</code>) and creates virtual sub-interfaces on it. It assigns a true, globally unique MAC address to your container, making it look like a physical machine plugged directly into the company switch.
                            </p>
                        </div>
                    </div>

                    {/* 2. THE RECONNAISSANCE PHASE */}
                    <div className="doc-section-card shadow-lg border-primary mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-primary">
                                <i className="bi bi-search"></i>
                            </div>
                            <h2 className="doc-card-heading text-primary">
                                2. Reconnaissance (Gathering Network Intel)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Unlike Bridge networks, Docker cannot magically guess your physical network topology. To create a Macvlan, you must provide Docker with the exact layout of your physical network. You need three things:
                            </p>

                            <ol className="small text-secondary mb-4">
                                <li>The <strong>Parent Interface</strong> (the physical network card connected to the router).</li>
                                <li>The physical <strong>Subnet</strong>.</li>
                                <li>The physical <strong>Gateway</strong> (the router's IP).</li>
                            </ol>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Command 1: Find the Parent Interface and Gateway</h5>
                            <p className="small text-secondary mb-2">Use the <code>ip route</code> command to see how your host talks to the internet:</p>
                            <pre className="doc-code-block mb-4 border-secondary text-light bg-dark x-small">
{`$ ip -4 route
default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.100 metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100`}
                            </pre>

                            <div className="row g-2 mb-4">
                                <div className="col-md-4">
                                    <div className="p-2 border border-info rounded bg-dark text-center">
                                        <p className="x-small text-secondary mb-0">Gateway</p>
                                        <strong className="text-info fs-6">192.168.1.1</strong>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-2 border border-warning rounded bg-dark text-center">
                                        <p className="x-small text-secondary mb-0">Parent Interface</p>
                                        <strong className="text-warning fs-6">eth0</strong>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-2 border border-success rounded bg-dark text-center">
                                        <p className="x-small text-secondary mb-0">Subnet</p>
                                        <strong className="text-success fs-6">192.168.1.0/24</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. CREATING THE MACVLAN */}
                    <div className="doc-section-card shadow-lg border-success mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-success">
                                <i className="bi bi-tools"></i>
                            </div>
                            <h2 className="doc-card-heading text-success">
                                3. Constructing the Macvlan
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Now that we have the intel, we use the <code>docker network create</code> command with the <code>-d macvlan</code> driver flag and our physical network details.
                            </p>

                            <pre className="doc-code-block mb-4 border-success text-success bg-dark x-small">
{`$ docker network create -d macvlan \\
  --subnet=192.168.1.0/24 \\
  --gateway=192.168.1.1 \\
  -o parent=eth0 \\
  physical_net`}
                            </pre>

                            <h5 className="fw-bold fs-6 mt-4 text-light">Deploying the Legacy App</h5>
                            <p className="small text-secondary mb-2">
                                We can now run our container and attach it to this network. Let's give it a specific IP address on the physical subnet so the corporate IT team is happy.
                            </p>

                            <pre className="doc-code-block mb-3 border-secondary text-light bg-dark x-small">
{`$ docker run -d \\
  --name legacy-app \\
  --network physical_net \\
  --ip 192.168.1.150 \\
  nginx`}
                            </pre>

                            <div className="doc-alert doc-alert-info mt-4 p-3">
                                <div>
                                    <strong className="d-block mb-1">The Result</strong>
                                    <p className="mb-0 x-small text-dark">
                                        If another physical computer on the same office network pings <code>192.168.1.150</code>, it will reach your container directly. The corporate router sees the container's unique MAC address. The container is a full citizen of the physical network.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. THE DCA GOTCHA: HOST ISOLATION */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-shield-slash-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                4. The DCA Gotcha: Host Isolation
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                This is one of the most frequently tested concepts on the DCA exam regarding Macvlan networks.
                            </p>

                            <div className="p-3 rounded border border-danger mb-4" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-x-circle-fill me-2"></i>The Security Rule</h5>
                                <p className="small text-light mb-0">
                                    By design, the Docker host itself <strong>CANNOT</strong> communicate with its own containers over a macvlan interface. 
                                </p>
                            </div>

                            <p className="small text-secondary mb-2">Let's try to ping our container from the Docker Host terminal:</p>
                            
                            <pre className="doc-code-block mb-4 border-danger text-danger bg-dark x-small">
{`$ ping 192.168.1.150
PING 192.168.1.150 (192.168.1.150) 56(84) bytes of data.
From 192.168.1.100 icmp_seq=1 Destination Host Unreachable`}
                            </pre>

                            <h5 className="fw-bold fs-6 text-light mt-4">Why does this happen?</h5>
                            <p className="small text-secondary">
                                Macvlan works by bypassing the host's networking stack entirely. The Linux kernel prevents a physical interface from talking to its own virtual sub-interfaces for security reasons (to prevent routing loops). 
                            </p>
                            
                            <p className="small text-warning fw-bold mt-2">
                                If you need the host to talk to the container, you have to create a complex workaround involving a secondary macvlan interface on the host itself. For the DCA exam, simply knowing that default host-to-container communication is blocked is usually sufficient.
                            </p>

                        </div>
                    </div>

                    {/* 5. THE GOTCHA: VLAN TAGGING */}
                    <div className="doc-section-card shadow-lg border-info mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-info">
                                <i className="bi bi-tags-fill"></i>
                            </div>
                            <h2 className="doc-card-heading text-info">
                                5. The DCA Gotcha: VLAN Tagging (802.1Q)
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Enterprise networks use VLANs to segment traffic. The DCA exam will absolutely test if you know how to connect a container to a specific VLAN.
                            </p>
                            <p className="small text-secondary mb-2">
                                You do this by appending the VLAN ID (e.g., <code>50</code>) directly to the parent interface name using a dot (<code>.</code>):
                            </p>
                            <pre className="doc-code-block mb-3 border-info text-info bg-dark x-small">
{`$ docker network create -d macvlan \\
  --subnet=192.168.50.0/24 \\
  --gateway=192.168.50.1 \\
  -o parent=eth0.50 \\
  vlan50_net`}
                            </pre>
                            <div className="p-3 rounded border border-info mb-0" style={{ background: 'rgba(13, 202, 253, 0.05)' }}>
                                <p className="small text-light mb-0">
                                    <strong>Exam Tip:</strong> By specifying <code>eth0.50</code>, Docker automatically configures the Linux kernel to tag all packets leaving the container with VLAN ID 50.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. THE GOTCHA: PROMISCUOUS MODE */}
                    <div className="doc-section-card shadow-lg border-danger mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-danger">
                                <i className="bi bi-broadcast"></i>
                            </div>
                            <h2 className="doc-card-heading text-danger">
                                6. The DCA Gotcha: Promiscuous Mode
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Macvlan fundamentally changes how your physical network card (NIC) operates. 
                            </p>
                            <div className="p-3 rounded border border-danger mb-0" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                                <h5 className="fw-bold text-danger"><i className="bi bi-exclamation-triangle-fill me-2"></i>The Hardware Requirement</h5>
                                <p className="small text-light mb-2">
                                    A normal NIC drops any incoming packets that don't match its own single MAC address. Because a Macvlan interface hosts <em>multiple</em> MAC addresses (one for the host, one for each container), the physical NIC <strong>MUST be put into promiscuous mode</strong>.
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> If a DCA scenario says "Macvlan was created successfully, but containers cannot communicate with the outside world," the most likely answer is that the physical switch or hypervisor (like AWS/vSwitch) is blocking promiscuous mode traffic.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 7. THE GOTCHA: WI-FI (802.11) LIMITATIONS */}
                    <div className="doc-section-card shadow-lg border-warning mt-5">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon text-warning">
                                <i className="bi bi-wifi-off"></i>
                            </div>
                            <h2 className="doc-card-heading text-warning">
                                7. The DCA Gotcha: Wi-Fi (802.11) Restrictions
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                Throughout this lab, we used <code>eth0</code> as the parent interface. <strong><code>eth0</code></strong> is the classic Linux name for a wired Ethernet network card. 
                            </p>
                            <p className="small text-secondary mb-3">
                                You might wonder: <em>"Can I just use my wireless card (e.g., <code>wlan0</code>) as the parent interface?"</em>
                            </p>
                            <div className="p-3 rounded border border-warning mb-0" style={{ background: 'rgba(255, 193, 7, 0.05)' }}>
                                <h5 className="fw-bold text-warning"><i className="bi bi-exclamation-circle me-2"></i>The 802.11 Protocol Block</h5>
                                <p className="small text-light mb-2">
                                    Macvlan works by generating new MAC addresses for every container and sending them out the parent interface. However, the <strong>802.11 Wi-Fi protocol</strong> heavily restricts this. Most Wi-Fi routers and Access Points will immediately reject any network frames originating from a MAC address that did not explicitly authenticate with the router.
                                </p>
                                <p className="small text-secondary mb-0">
                                    <strong>Exam Tip:</strong> Macvlan generally <strong>fails over Wi-Fi</strong>. If you absolutely must connect containers directly to a physical Wi-Fi network, Docker provides an alternative driver called <code>ipvlan</code>, which shares the host's single MAC address instead of generating new ones.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
