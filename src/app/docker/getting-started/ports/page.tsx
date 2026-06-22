import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ports and Networking - Docker Documentation",
  description: "Understand how Docker handles communication, port mapping, and container isolation."
};

export default function PortsNetworkingPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Ports & Networking</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            How containers communicate with the outside world and each other.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: The Concept of Isolation */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h2 className="doc-card-heading">The Magic of Isolation</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-4">
                One of the most powerful features of Docker is <strong>Isolation</strong>. Each container has its own virtual network card, its own IP address, and its own range of 65,535 ports.
              </p>

              <div className="row g-4 mb-4 mt-2">
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm text-center">
                    <h4 className="text-info fs-5 mb-3 font-monospace">Case Study: The Two Redis Problem</h4>
                    <p className="text-secondary text-sm text-start">
                      Imagine you run two containers: <strong>Redis V5</strong> and <strong>Redis V6</strong>. Both apps are hard-coded to listen on port <code>6379</code>.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                      <div className="p-2 border border-info rounded bg-info bg-opacity-10">
                        <small className="d-block text-info fw-bold">Redis V5</small>
                        <code className="text-white">6379</code>
                      </div>
                      <div className="align-self-center text-secondary opacity-50"><i className="bi bi-arrow-left-right"></i></div>
                      <div className="p-2 border border-info rounded bg-info bg-opacity-10">
                        <small className="d-block text-info fw-bold">Redis V6</small>
                        <code className="text-white">6379</code>
                      </div>
                    </div>
                    <p className="text-secondary text-sm text-start mt-3">
                      <strong>Do they conflict?</strong> <br/>
                      <span className="text-white">Inside Docker:</span> <strong>NO.</strong> They are in different &quot;rooms.&quot; Each container sees itself as the only thing using port 6379.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="h-100 p-4 rounded bg-dark border border-warning border-opacity-25 shadow-sm">
                    <h4 className="text-warning fs-5 mb-3 font-monospace">The Real Conflict (The Host)</h4>
                    <p className="text-secondary text-sm">
                      The conflict only happens on your <strong>PC (the Host)</strong>. Your real PC only has <em>one</em> port 6379. You cannot map <strong>both</strong> containers to the same physical port on your machine.
                    </p>
                    <div className="mt-3 p-3 rounded bg-warning bg-opacity-10 border border-warning">
                      <p className="text-warning text-xs mb-0 uppercase fw-bold">Rule:</p>
                      <p className="text-secondary text-xs mb-0">Containers can share internal ports, but the HOST ports must be unique.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* THE SOLUTION */}
              <div className="mt-4 p-4 rounded bg-dark border border-success border-opacity-25 shadow-sm">
                <h4 className="text-success fs-5 mb-3 font-monospace">The Solution: Re-Routing</h4>
                <p className="text-secondary text-sm mb-4">
                  The solution is simple: you map the containers to <strong>different</strong> doors on your Host PC.
                </p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 rounded text-center">
                      <small className="d-block text-secondary text-xs uppercase mb-1">Redis V5 (Mapped to 6001)</small>
                      <code className="text-white">docker run -p <span className="text-success" title="Host Port">6001</span>:<span className="text-info" title="Container Port">6379</span> redis:5</code>
                      <div className="mt-2 d-flex justify-content-center gap-2">
                        <span className="badge bg-success bg-opacity-10 border border-success text-success text-xs">Host: 6001</span>
                        <span className="badge bg-info bg-opacity-10 border border-info text-info text-xs">Container: 6379</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 rounded text-center">
                      <small className="d-block text-secondary text-xs uppercase mb-1">Redis V6 (Mapped to 6002)</small>
                      <code className="text-white">docker run -p <span className="text-success" title="Host Port">6002</span>:<span className="text-info" title="Container Port">6379</span> redis:6</code>
                      <div className="mt-2 d-flex justify-content-center gap-2">
                        <span className="badge bg-success bg-opacity-10 border border-success text-success text-xs">Host: 6002</span>
                        <span className="badge bg-info bg-opacity-10 border border-info text-info text-xs">Container: 6379</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-secondary text-sm mt-4 mb-0 italic">
                  Even though both Redis apps think they are on 6379, you are reaching them through unique &quot;Entrance Doors&quot; (6001 and 6002).
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: Port Mapping Syntax */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-box-arrow-in-right"></i>
              </div>
              <h2 className="doc-card-heading">Port Mapping (-p)</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                To talk to a container, you must build a &quot;bridge&quot; between your PC and the container using the <code className="text-white">-p</code> flag.
              </p>
              
              <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 mt-4">
                <code className="text-white fs-5">docker run -p <span className="text-success">6001</span>:<span className="text-info">6379</span> redis</code>
                <hr className="bg-secondary opacity-25"/>
                <ul className="list-unstyled text-sm mb-0">
                  <li className="mb-2"><span className="badge bg-success me-2 text-dark">6001</span> <strong className="text-white">Host Port:</strong> Your PC&apos;s external entrance door.</li>
                  <li className="mb-0"><span className="badge bg-info me-2 text-dark">6379</span> <strong className="text-white">Container Port:</strong> The application&apos;s internal listening door.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION: The Analogy */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-building"></i>
              </div>
              <h2 className="doc-card-heading">The Apartment Analogy</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                Imagine an apartment building (the <strong>PC</strong>).
              </p>
              <ul className="text-secondary text-sm">
                <li className="mb-2">Each apartment is a <strong>Container</strong>.</li>
                <li className="mb-2">Every apartment has its own <code>Kitchen</code> (Port 80). There is no conflict between neighbors having kitchens.</li>
                <li className="mb-2">However, the building only has one <code>Main Lobby</code> (Host Port 80).</li>
                <li className="mb-0">If someone outside wants to reach the kitchen of Apartment 101, you must tell the concierge: &quot;Map the Lobby Door #101 to Apartment 101's kitchen.&quot;</li>
              </ul>
            </div>
          </div>

          {/* SECTION: Internal Networking */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-diagram-3-fill"></i>
              </div>
              <h2 className="doc-card-heading">Internal Networking & The "IP Trap"</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                Containers on the same network can talk to each other directly. However, there is a dangerous trap for beginners.
              </p>
              
              <div className="row g-4 mt-2">
                <div className="col-md-6 text-start">
                  <div className="h-100 p-4 rounded bg-dark border border-danger border-opacity-25 shadow-sm">
                    <h4 className="text-danger fs-5 mb-3 font-monospace">The IP Trap</h4>
                    <p className="text-secondary text-sm">
                      Docker IPs are <strong>dynamic</strong>. Every time a container restarts, its IP can change (e.g., from <code>172.17.0.2</code> to <code>172.17.0.5</code>). 
                    </p>
                    <p className="text-secondary text-sm">
                      If you hard-code IPs in your application strings, your app <strong>will break</strong> as soon as Docker is restarted.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="h-100 p-4 rounded bg-dark border border-success border-opacity-25 shadow-sm">
                    <h4 className="text-success fs-5 mb-3 font-monospace">The Solution: Embedded DNS</h4>
                    <p className="text-secondary text-sm">
                      Docker has a built-in DNS server. On custom networks, you can use <strong>Container Names</strong> (assigned via <code>--name</code>) instead of IPs.
                    </p>
                    <p className="text-secondary text-sm italic">
                      Example: <code>http://redis-v5:6379</code> <br/>
                      Example: <code>http://redis-v6:6379</code>
                    </p>
                    <p className="text-secondary text-sm">
                      <strong>Crucial Distinction:</strong> You talk to the <em>Container Name</em> (the name you chose), not the <em>Image Name</em> (like redis:5).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded bg-dark border border-info border-opacity-25 shadow-sm text-start">
                <h4 className="text-info fs-5 mb-3 font-monospace">Why "Same Port" is Okay Internally</h4>
                <p className="text-secondary text-sm">
                  Think of it like two different houses on the same street. Both houses can have a <strong>"Front Door"</strong> (Port 6379). 
                  As long as you have the right <strong>address (the DNS Name)</strong>, you never end up in the wrong house. 
                  Internal port conflicts are impossible if your containers have unique names.
                </p>
              </div>

              <div className="mt-4 p-3 rounded border border-info bg-info bg-opacity-10 text-center">
                <p className="text-secondary text-sm mb-0">
                  <strong>Pro Tip:</strong> Containers on the <em>default</em> bridge network cannot use DNS names—they must use IPs. This is why you should almost <strong>always</strong> create a custom network.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
