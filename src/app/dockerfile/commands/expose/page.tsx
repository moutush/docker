import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dockerfile EXPOSE Command - Docker Documentation",
  description: "Learn how to use the EXPOSE command to document container network ports."
};

export default function DockerfileExposePage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-secondary fs-5 p-2">Metadata / Ports</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>EXPOSE Command</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Informs Docker that the container listens on specified network ports at runtime. Excellent for documentation.
        </p>
      </div>

      <div className="doc-content-grid">
        {/* SECTION: Quick Look */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <h2 className="doc-card-heading">Quick Look</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">Syntax:</p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-2 x-small">
              {`# 1. Expose a single port (defaults to TCP)
EXPOSE 80

# 2. Expose multiple ports
EXPOSE 80 443

# 3. Expose port specifying protocol (UDP)
EXPOSE 53/udp`}
            </pre>
            <p className="text-secondary mb-0">
              The <code>EXPOSE</code> instruction does **not** actually publish the port.
              It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published.
            </p>
          </div>
        </div>

        {/* SECTION: Analogy */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-egg-fried"></i>
            </div>
            <h2 className="doc-card-heading text-success">Real-World Analogy</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              Imagine buying a kitchen appliance from a shop:
            </p>
            <div className="p-3 bg-dark rounded border border-success border-opacity-25 mt-3">
              <p className="text-secondary small mb-0">
                On the outside of the box, the manufacturer prints a small icon saying: *"Requires 110V wall outlet"* (<code>EXPOSE 110</code>).
                <br /><br />
                The printing on the box doesn't supply electricity, nor does it plug the machine in for you. It is just **written instruction** informing you what connection it needs to work. You must still supply the plug and connect it to your house outlet (<code>-p HOST:CONTAINER</code>) to run the machine.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Document vs Publish */}
        <div className="doc-section-card shadow-lg border-danger">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-shield-exclamation"></i>
            </div>
            <h2 className="doc-card-heading text-danger">The Expose vs. Publish Trap (DCA Favorite!)</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-danger">EXPOSE DOES NOT PUBLISH PORTS</h6>
                <p className="mb-0 x-small text-secondary">
                  Writing <code>EXPOSE 8080</code> inside your Dockerfile **does not make port 8080 accessible from your computer's browser**.
                  If you run <code>docker run my-app</code>, and try to visit `http://localhost:8080`, it will fail!
                  You **must** still publish it explicitly at runtime:
                  <br />
                  <code className="text-white">docker run -p 8080:8080 my-app</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: The -P flag */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-arrow-right-square-fill"></i>
            </div>
            <h2 className="doc-card-heading">The Magic -P (Capital P) Flag</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary">
              If you expose ports inside your Dockerfile, Docker allows you to auto-publish *all* of them at runtime by using the **capital `-P` flag**:
              <br />
              <code className="text-white bg-dark p-1 rounded">docker run -d -P nginx</code>
            </p>
            <p className="text-secondary mt-3 mb-0">
              Docker will scan the image's metadata for <code>EXPOSE</code> instructions, and **map each exposed port to a random high-numbered port (between 32768 and 60999)** on your host machine automatically.
              You can check which ports were mapped using `docker ps`.
            </p>
          </div>
        </div>

        {/* SECTION: Examples */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-code-slash"></i>
            </div>
            <h2 className="doc-card-heading">Code Examples</h2>
          </div>
          <div className="doc-card-body">
            <h6 className="text-light fw-bold">Example: DNS Server (TCP and UDP)</h6>
            <p className="small text-secondary">
              A domain name server needs to listen on both TCP and UDP port 53:
            </p>
            <pre className="doc-code-block mb-3 bg-dark text-light border-secondary p-3 x-small">
              {`FROM alpine:3.18
RUN apk add --no-cache bind

# Expose port 53 for both protocols
EXPOSE 53/tcp
EXPOSE 53/udp

CMD ["named", "-g"]`}
            </pre>
          </div>
        </div>

        {/* SECTION: Interview Tips */}
        <div className="doc-section-card shadow-lg border-warning">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Interview Questions (DCA Level)</h2>
          </div>
          <div className="doc-card-body">
            <div className="doc-alert doc-alert-info mb-3">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Question: Can containers communicate inside a bridge network without EXPOSE?</h6>
                <p className="mb-0 x-small text-secondary">
                  <strong>Yes!</strong> Any container on a shared Docker network can talk to another container's port directly without needing <code>EXPOSE</code> or port publishing flags. <code>EXPOSE</code> and <code>-p</code> are only required to make ports accessible to **traffic originating outside the Docker host**.
                </p>
              </div>
            </div>
            <div className="doc-alert doc-alert-warning mb-0">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-warning">Question: How do you check what ports an image EXPOSEs?</h6>
                <p className="mb-0 x-small text-secondary">
                  You can inspect the image metadata using the docker inspect engine format filter:
                  <br />
                  <code>docker inspect --format='{"{{.Config.ExposedPorts}}"}' &lt;image-name&gt;</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Common Mistakes */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-bug-fill"></i>
            </div>
            <h2 className="doc-card-heading">Common Mistakes</h2>
          </div>
          <div className="doc-card-body">
            <ul className="text-secondary small mb-0">
              <li className="mb-2">
                <span className="text-danger fw-bold">Confusing EXPOSE with -p syntax:</span> Writing <code>EXPOSE 8080:80</code> inside a Dockerfile. This is syntax error! EXPOSE only takes a single port number inside the container (e.g. <code>EXPOSE 80</code>). Mapping host-to-container port pairs is strictly a runtime operations decision (using `-p` flag).
              </li>
              <li>
                <span className="text-danger fw-bold">Exposing ports your app isn't actually using:</span> Writing <code>EXPOSE 80</code> when your node server is configured to listen on port 3000. It doesn't break the container, but it will confuse operations teams trying to map port 80.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION: Mini Exercise */}
        <div className="doc-section-card shadow-lg border-info">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h2 className="doc-card-heading text-info">Mini Exercise</h2>
          </div>
          <div className="doc-card-body">
            <p className="small text-secondary">
              Let's test the capital `-P` flag:
            </p>
            <ol className="small text-secondary pl-3 mb-0">
              <li className="mb-2">Run a container in the background with capital P: <code>docker run -d -P --name web nginx:alpine</code></li>
              <li className="mb-2">Run <code>docker ps</code> and check the **"PORTS"** column.</li>
              <li>Notice that Nginx's exposed port 80 is mapped to a random high port, like: <code>0.0.0.0:32769-{'>'}80/tcp</code>. Visit `http://localhost:32769` to verify!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
