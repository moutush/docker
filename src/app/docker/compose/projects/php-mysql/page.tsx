import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project: PHP + MySQL - Docker Compose",
  description: "A practical Docker Compose project connecting a PHP-Apache container to a MySQL database with named volumes and networks."
};

export default function ComposeProjectPhpMysqlPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-filetype-php text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Project: PHP + MySQL</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 6.2 — Build a 2-tier architecture connecting a web server to a database.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* PROJECT OVERVIEW */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-info-circle-fill"></i></div>
            <h2 className="doc-card-heading">Project Overview</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              In this project, we graduate to a multi-container setup. We'll run a <strong>PHP-Apache</strong> container to serve dynamic web pages, and a <strong>MySQL</strong> container to store data. We'll use Docker Compose's built-in networking so PHP can talk to MySQL, and a named volume to ensure our database doesn't vanish when we shut down.
            </p>
            <div className="p-3 bg-dark rounded border border-secondary">
              <h6 className="text-light small mb-2">Folder Structure:</h6>
              <pre className="x-small text-info mb-0">
                {`php-mysql-app/
├── compose.yaml
├── Dockerfile
└── src/
    └── index.php`}
              </pre>
            </div>
          </div>
        </div>

        {/* STEP 1 */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-1-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 1: Create the PHP File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create a <code>src</code> folder, and inside it, create <code>index.php</code>. This script simply connects to MySQL and prints a success message.</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
              {`<?php
// We read the credentials from the environment variables passed by Docker Compose
$host = getenv('MYSQL_HOST'); // This MUST match the service name in compose.yaml!
$user = getenv('MYSQL_USER');
$pass = getenv('MYSQL_PASS');
$db   = getenv('MYSQL_DB');

// Wait briefly for DB to boot (hacky, but simple for this demo)
sleep(2);

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "<h1 style='color:green'>Connected successfully to MySQL! 🚀</h1>";
?>`}
            </pre>
          </div>
        </div>

      </div>

      {/* STEP 2 - NEW: DOCKERFILE */}
      <div className="doc-section-card shadow-lg">
        <div className="doc-card-header-wrapper">
          <div className="heading-icon text-info"><i className="bi bi-2-circle-fill"></i></div>
          <h2 className="doc-card-heading">Step 2: Create the Dockerfile</h2>
        </div>
        <div className="doc-card-body">
          <p className="text-secondary small mb-2">The official PHP image doesn't include the MySQL extension by default. Create a <code>Dockerfile</code> in the root folder to install it:</p>
          <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
            {`FROM php:8.2-apache
# Install the mysqli extension needed to connect to the database
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli`}
          </pre>
          <div className="doc-alert doc-alert-info mb-0 mt-3">
            <i className="bi bi-info-circle-fill"></i>
            <div>
              <strong className="text-info">Why do we need a Dockerfile? Why can't Compose do this?</strong>
              <p className="x-small text-secondary mb-2 mt-1">
                Docker Compose is purely an <em>orchestrator</em> — it manages networks, volumes, and ports. It <strong>cannot</strong> install software or permanently modify the internal architecture of a base image.
              </p>
              <p className="x-small text-secondary mb-0">
                While you <em>could</em> technically use a hacky Compose <code>command:</code> to install the extension at runtime, the container would have to download and compile the PHP extension <strong>every single time it boots up</strong>, making your boot times agonizingly slow (minutes instead of milliseconds). By using a <code>Dockerfile</code>, Docker compiles the extension exactly once, caches the result as a new image on your laptop, and gives you blazing fast restarts. This is the ultimate speed optimization!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="doc-section-card shadow-lg">
        <div className="doc-card-header-wrapper">
          <div className="heading-icon text-info"><i className="bi bi-3-circle-fill"></i></div>
          <h2 className="doc-card-heading">Step 3: Create the Compose File</h2>
        </div>
        <div className="doc-card-body">
          <p className="text-secondary small mb-2">In the root folder, create <code>compose.yaml</code>:</p>
          <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
            {`services:
  web:
    # Instead of an old pre-packaged image, we build our modern PHP 8.2 image!
    build: .
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html    # Standard Apache web root
    environment:
      - MYSQL_HOST=db
      - MYSQL_USER=myuser
      - MYSQL_PASS=mypassword
      - MYSQL_DB=mydb
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootsecret
      - MYSQL_DATABASE=mydb
      - MYSQL_USER=myuser
      - MYSQL_PASSWORD=mypassword
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:   # Crucial: Without this, DB data is lost on compose down`}
          </pre>
          <div className="doc-alert doc-alert-info mb-0">
            <i className="bi bi-info-circle-fill"></i>
            <div className="x-small text-secondary">
              <strong className="text-info">Notice the Networking:</strong> We didn't define a network! Compose creates a default one. Because the database service is named <code>db</code>, the PHP script connects to host <code>db</code>.
            </div>
          </div>
          <div className="doc-alert doc-alert-warning mb-0 mt-3">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div className="x-small text-secondary">
              <strong className="text-warning">Why the trailing colon?</strong> Look at the very bottom: <code>db-data:</code>. The colon is required! In YAML, a trailing colon means "this is a Dictionary key with default/empty settings." If you forget the colon and just write <code>db-data</code>, the YAML parser thinks it's a plain string and Docker Compose will crash with a syntax error.
            </div>
          </div>
        </div>
      </div>

      {/* STEP 4 */}
      <div className="doc-section-card shadow-lg border-success">
        <div className="doc-card-header-wrapper">
          <div className="heading-icon text-success"><i className="bi bi-4-circle-fill"></i></div>
          <h2 className="doc-card-heading text-success">Step 4: Run and Test</h2>
        </div>
        <div className="doc-card-body">
          <pre className="doc-code-block bg-dark text-success border-success p-3 x-small mb-3">
            {`# Start the stack
docker compose up -d

# Watch the database boot up
docker compose logs -f db`}
          </pre>
          <p className="text-secondary small mb-0">
            Open your browser to <code className="text-info">http://localhost:8080</code>. You should see the green success message.
            <br /><br />
            <strong>Test the Volume:</strong> Run <code>docker compose down</code>, then run <code>docker compose up -d</code> again. Because of the named volume, MySQL boots up much faster the second time because it doesn't have to initialize an empty database!
          </p>
        </div>
      </div>

    </div>
  );
}
