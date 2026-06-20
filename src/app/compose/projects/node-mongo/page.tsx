import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project: Node.js + MongoDB - Docker Compose",
  description: "Build a MEAN/MERN stack backend using Docker Compose with Node.js, MongoDB, and Mongo Express."
};

export default function ComposeProjectNodeMongoPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-node-plus-fill text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Project: Node.js + MongoDB</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 6.4 — Build a JavaScript backend with a NoSQL database and a web-based DB admin panel.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* OVERVIEW */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Architecture Overview</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              This stack introduces a third container to the mix — a database GUI. We will run:
            </p>
            <ul className="text-secondary small mb-3">
              <li><strong>api:</strong> Our custom Node.js Express server.</li>
              <li><strong>mongo:</strong> The MongoDB NoSQL database.</li>
              <li><strong>mongo-express:</strong> A web-based administrative GUI for MongoDB (like phpMyAdmin, but for Mongo).</li>
            </ul>
          </div>
        </div>

        {/* COMPOSE FILE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-file-earmark-code-fill"></i></div>
            <h2 className="doc-card-heading">The Compose File</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`# compose.yaml
services:

  # 1. Custom Node.js API
  api:
    image: node:20-alpine
    working_dir: /app
    # Mock command for demo purposes — usually you'd 'build:' your Dockerfile here
    command: node -e "setInterval(() => console.log('API running...'), 5000)"
    ports:
      - "3000:3000"
    environment:
      # MongoDB connection string using service name and credentials
      - MONGO_URL=mongodb://admin:secretpass@mongo:27017/
    depends_on:
      - mongo

  # 2. MongoDB Database
  mongo:
    image: mongo:6.0
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secretpass
    volumes:
      - mongo-data:/data/db

  # 3. Mongo Express Web GUI
  mongo-express:
    image: mongo-express:latest
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=secretpass
      - ME_CONFIG_MONGODB_URL=mongodb://admin:secretpass@mongo:27017/
    depends_on:
      - mongo

volumes:
  mongo-data:`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
