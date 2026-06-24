import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Understanding Pods - CKA Documentation",
  description: "Learn why Kubernetes uses Pods instead of bare containers, how they share namespaces, and how to write a Pod manifest."
};

export default function PodsPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      {/* PAGE HEADER */}
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <span className="badge bg-primary text-light fs-5 p-2">Core Concepts</span>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Understanding Pods</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          The smallest deployable computing unit in Kubernetes.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* SECTION: The Fundamental Shift */}
        <div className="doc-section-card shadow-lg border-primary mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary">
              <i className="bi bi-box-seam-fill"></i>
            </div>
            <h2 className="doc-card-heading text-primary">The Fundamental Shift</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-light fw-bold fs-5">
              "If I know Docker, why can't Kubernetes just run my Docker containers directly?"
            </p>
            <p className="text-secondary">
              This is the most common question for engineers transitioning into Kubernetes. The answer is that Kubernetes does not manage containers directly; it manages <strong>Pods</strong>.
            </p>

            <div className="d-flex flex-column align-items-center mb-4 mt-4">
              {/* Visual Diagram: The Peapod */}
              <div className="border border-success border-2 rounded-pill d-flex align-items-center justify-content-center p-3 bg-dark shadow-lg position-relative" style={{ width: '400px', height: '140px' }}>
                <span className="position-absolute top-0 start-50 translate-middle-x mt-n3 px-3 bg-dark text-success fw-bold border border-success rounded-pill x-small">
                  The Pod (The Peapod)
                </span>
                
                <div className="d-flex gap-4">
                  <div className="rounded-circle bg-success bg-opacity-25 border border-success d-flex flex-column align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-box-fill text-success fs-4 mb-1"></i>
                    <span className="text-success x-small fw-bold">App</span>
                  </div>
                  <div className="rounded-circle bg-info bg-opacity-25 border border-info d-flex flex-column align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-box-fill text-info fs-4 mb-1"></i>
                    <span className="text-info x-small fw-bold">Logger</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-secondary">
              A Pod is like a "peapod" that holds one or more "peas" (containers). Kubernetes scales the <em>entire peapod</em> up or down. If you need more capacity, Kubernetes does not inject another container into an existing Pod; it creates a brand new replica of the entire Pod.
            </p>
          </div>
        </div>

        {/* SECTION: Shared Namespaces */}
        <div className="doc-section-card shadow-lg mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info">
              <i className="bi bi-diagram-2-fill"></i>
            </div>
            <h2 className="doc-card-heading">Why Group Containers? (Shared Namespaces)</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-4">
              When multiple containers are placed inside the same Pod, they are not isolated from each other in the same way standard Docker containers are. They share specific Linux namespaces.
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50 h-100">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-hdd-network-fill text-info me-2"></i>Shared Network Namespace</h5>
                  <p className="text-secondary small mb-0">
                    Containers in the same Pod share the exact same IP address and port space. This means Container A and Container B inside the same Pod can communicate with each other simply by using <code>localhost</code>. (e.g., The App container can reach the database container at <code>localhost:5432</code>).
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-dark rounded border border-secondary border-opacity-50 h-100">
                  <h5 className="text-light fw-bold mb-2"><i className="bi bi-hdd-fill text-warning me-2"></i>Shared Storage Volumes</h5>
                  <p className="text-secondary small mb-0">
                    You can define a Volume at the Pod level, and mount it into multiple containers inside that Pod. This allows containers to easily read and write to the same shared directory (e.g., an App writes logs to a folder, and a Log Shipper container reads from that same folder).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: The Pause Container */}
        <div className="doc-section-card shadow-lg border-warning mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-warning">
              <i className="bi bi-pause-circle-fill"></i>
            </div>
            <h2 className="doc-card-heading text-warning">Deep Dive: The Hidden "Pause" Container</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small">
              How exactly do multiple containers share the same network namespace? This is a frequent advanced interview question.
            </p>

            <div className="p-3 bg-dark rounded border border-warning border-opacity-25 mt-3 shadow-sm">
              <p className="text-secondary small mb-3">
                When Kubernetes schedules a Pod to a Node, the Kubelet instructs the container runtime to start a very specific, lightweight container first. This is called the <strong>pause container</strong>.
              </p>
              <ul className="text-secondary small mb-0 pl-3">
                <li className="mb-2">
                  <strong className="text-light">Its only job:</strong> The pause container boots up, claims an IP address, establishes the network namespace, and then literally "pauses" (goes to sleep).
                </li>
                <li>
                  <strong className="text-light">The Attach Phase:</strong> Once the pause container is holding the network namespace open, Kubernetes boots up your actual application containers and forces them to <em>join</em> the pause container's pre-existing network namespace.
                </li>
              </ul>
            </div>
            
            <div className="doc-alert doc-alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <h6 className="fw-bold mb-1 text-info">Why is this necessary?</h6>
                <p className="mb-0 x-small text-secondary">
                  If Container A held the network namespace, and Container A crashed, the namespace would be destroyed, killing the IP address for the whole Pod. By giving the namespace to an indestructible "pause" container, Container A can crash and restart continuously without the Pod losing its IP address.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Translation to YAML */}
        <div className="doc-section-card shadow-lg border-success mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success">
              <i className="bi bi-file-earmark-code-fill"></i>
            </div>
            <h2 className="doc-card-heading text-success">Translation: Docker CLI to Pod YAML</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-4">
              In Docker, you use imperative commands. In Kubernetes, you use declarative YAML manifests. Here is how a Docker command translates into a K8s Pod.
            </p>

            <div className="row g-4">
              <div className="col-md-5">
                <h6 className="text-info fw-bold small mb-2">Docker Command</h6>
                <div className="p-3 bg-dark rounded border border-secondary h-100">
                  <pre className="text-light x-small mb-0" style={{ whiteSpace: 'pre-wrap' }}>
{`docker run \\
  --name nginx-web \\
  -p 80:80 \\
  -e ENV=prod \\
  nginx:latest`}
                  </pre>
                </div>
              </div>

              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-right-circle-fill fs-1 text-secondary d-none d-md-block"></i>
                <i className="bi bi-arrow-down-circle-fill fs-1 text-secondary d-md-none my-3"></i>
              </div>

              <div className="col-md-5">
                <h6 className="text-success fw-bold small mb-2">Kubernetes Pod YAML (pod.yaml)</h6>
                <div className="p-3 bg-dark rounded border border-success border-opacity-50 h-100">
                  <pre className="text-light x-small mb-0">
{`apiVersion: v1
kind: Pod
metadata:
  name: nginx-web
  labels:
    app: web
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
    env:
    - name: ENV
      value: "prod"`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-secondary small">
                To deploy this to the cluster, you run: <br/>
                <code className="bg-dark p-1 rounded border border-secondary text-light">kubectl apply -f pod.yaml</code>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Interview Focus */}
        <div className="doc-section-card shadow-lg border-danger mb-5">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-danger">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <h2 className="doc-card-heading text-danger">Interview Focus (CKA Essentials)</h2>
          </div>
          <div className="doc-card-body">
            
            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: When should you put multiple containers in a single Pod?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                You should only combine containers if they are tightly coupled and must scale together (e.g., the Sidecar pattern). For example, putting a Node.js API and a Redis Cache in the same Pod is an anti-pattern because you might need 5 copies of the API but only 1 copy of the Cache. They should be in separate Pods.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-light fw-bold">Q: How do two containers in the same Pod communicate?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                Because they share the same network namespace via the pause container, they can communicate directly over <code>localhost</code> using standard port numbers.
              </p>
            </div>

            <div>
              <h6 className="text-light fw-bold">Q: If one container inside a Pod crashes, does the Pod die?</h6>
              <p className="text-secondary small border-start border-3 border-secondary ps-3 py-1">
                No. The kubelet monitors the individual containers. If one crashes, the kubelet will restart that specific container while the rest of the Pod remains running and maintains its IP address.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
