"use client";

import React from 'react';
import Link from 'next/link';

export default function RootLandingPage() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white p-4">
      <div className="text-center mb-5 mt-n5">
        <i className="bi bi-hexagon-fill text-primary display-1 mb-3"></i>
        <h1 className="display-4 fw-bold mb-3">DevOps Mastery Platform</h1>
        <p className="lead text-secondary">Select your learning path</p>
      </div>

      <div className="row g-4 w-100 mx-auto" style={{ maxWidth: '900px' }}>
        <div className="col-md-6">
          <Link href="/docker" className="text-decoration-none h-100 d-block">
            <div className="card bg-dark border-primary h-100 course-card position-relative overflow-hidden group">
              <div className="card-body p-5 text-center">
                <i className="bi bi-box-seam-fill text-primary display-3 mb-4"></i>
                <h2 className="text-white mb-3 fw-bold">Docker & Compose</h2>
                <p className="text-secondary mb-0">
                  Comprehensive curriculum covering Docker fundamentals, build optimization, Compose orchestration, and DCA certification prep.
                </p>
                <div className="mt-4 pt-3 border-top border-primary border-opacity-25 text-primary fw-bold">
                  Enter Course <i className="bi bi-arrow-right ms-2"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark border-secondary border-opacity-50 h-100 opacity-75">
            <div className="card-body p-5 text-center">
              <div className="position-absolute top-0 end-0 p-3">
                <span className="badge bg-warning text-dark">Coming Soon</span>
              </div>
              <i className="bi bi-bezier2 text-secondary display-3 mb-4 opacity-75"></i>
              <h2 className="text-white mb-3 opacity-75 fw-bold">Kubernetes (CKA)</h2>
              <p className="text-secondary mb-0">
                Advanced Kubernetes administration, cluster architecture, troubleshooting, and CKA exam preparation.
              </p>
              <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 text-secondary">
                In Development
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .course-card {
          transition: all 0.3s ease;
          cursor: pointer;
          background: linear-gradient(145deg, rgba(33,37,41,1) 0%, rgba(20,22,25,1) 100%);
        }
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(13, 110, 253, 0.15);
          border-color: #0d6efd !important;
        }
      `}</style>
    </div>
  );
}
