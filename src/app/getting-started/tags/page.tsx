import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Docker Tags - Docker Documentation",
  description: "Learn how to version and manage your Docker images using tags."
};

export default function TagsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Understanding Tags</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Learn how to version your images and keep your production environments stable.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: The Analogy */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-lightbulb-fill"></i>
              </div>
              <h2 className="doc-card-heading">What are Tags? (The Noob Way)</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary mb-4">
                Imagine you are storing physical boxes in a warehouse. Every box has a name, like <strong>"Clothes"</strong>. 
                But as time goes on, you might have different versions of that box: <strong>"Clothes:Winter"</strong>, 
                <strong>"Clothes:Summer"</strong>, or <strong>"Clothes:Old"</strong>.
              </p>
              
              <div className="p-4 bg-dark rounded border border-secondary bg-opacity-50">
                <p className="text-white mb-0">
                  A <strong>Tag</strong> is simply a label applied to an image. It tells you exactly <strong>which version</strong> 
                  of that image you are holding. Without tags, every image would just be a bucket of code with no identity.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: Why do we need them? */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-question-diamond-fill"></i>
              </div>
              <h2 className="doc-card-heading">Why do we need them?</h2>
            </div>
            <div className="doc-card-body">
              <ul className="list-unstyled text-secondary">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check2-circle text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Versioning:</strong>
                    <p className="text-sm mb-0">It allows you to run <code className="text-white">nginx:1.24</code> in production while testing <code className="text-white">nginx:1.25</code> in development.</p>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check2-circle text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Stability:</strong>
                    <p className="text-sm mb-0">By pinning a specific tag, you ensure your app doesn't break when a "latest" image gets a buggy update.</p>
                  </div>
                </li>
                <li className="mb-0 d-flex align-items-start">
                  <i className="bi bi-check2-circle text-success me-3 mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Environment Controls:</strong>
                    <p className="text-sm mb-0">You can tag images specifically for <code className="text-white">dev</code>, <code className="text-white">stage</code>, or <code className="text-white">prod</code>.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION: The Syntax */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className="bi bi-code-slash"></i>
              </div>
              <h2 className="doc-card-heading">The Syntax</h2>
            </div>
            <div className="doc-card-body text-center py-5">
              <div className="d-inline-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
                <div className="p-4 rounded border border-primary bg-primary bg-opacity-10 text-primary fw-bold" style={{ minWidth: '150px' }}>
                  REPOSITORY
                  <small className="d-block text-secondary fw-normal mt-1 opacity-75">e.g. nginx</small>
                </div>
                <div className="fs-2 text-secondary px-2">:</div>
                <div className="p-4 rounded border border-info bg-info bg-opacity-10 text-info fw-bold" style={{ minWidth: '150px' }}>
                  TAG
                  <small className="d-block text-secondary fw-normal mt-1 opacity-75">e.g. 1.25.1</small>
                </div>
              </div>
              
              <div className="mt-5">
                <p className="text-secondary text-sm">Example Command:</p>
                <code className="p-3 bg-dark rounded border border-secondary text-white d-inline-block">
                  docker pull alpine:3.18
                </code>
              </div>
            </div>
          </div>

          {/* SECTION: The "latest" Trap */}
          <div className="doc-section-card shadow-lg col-12 border-primary">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-primary">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <h2 className="doc-card-heading">The "Latest" Trap</h2>
            </div>
            <div className="doc-card-body">
              <p className="text-secondary">
                If you don't specify a tag, Docker automatically adds <strong>:latest</strong> by default. 
                While convenient, this is dangerous for production systems.
              </p>
              
              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <div className="h-100 p-3 rounded border border-danger border-opacity-25 bg-danger bg-opacity-10">
                    <h4 className="text-danger fs-6 mb-2">The Issue</h4>
                    <p className="text-secondary text-xs mb-0">
                      "latest" is just a moving pointer. If you pull it today, you might get Version 5. 
                      If your colleague pulls it tomorrow, they might get Version 6. Your environments are no longer identical.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-3 rounded border border-success border-opacity-25 bg-success bg-opacity-10">
                    <h4 className="text-success fs-6 mb-2">The Solution</h4>
                    <p className="text-secondary text-xs mb-0">
                      Always pin your version! Use <code className="text-white">nginx:1.25.1</code>. This guarantees 
                      that everyone on your team is running the exact same code, regardless of when they pull.
                    </p>
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
