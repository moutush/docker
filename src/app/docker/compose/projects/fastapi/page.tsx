import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Project: FastAPI Stack - Docker Compose",
  description: "A complete FastAPI environment using Docker Compose: Nginx, Python-Slim, PostgreSQL, and Redis."
};

export default function ComposeProjectFastAPIPage() {
  return (
    <div className="container-fluid py-5 px-md-5">
      <div className="page-intro-header mb-5 text-center text-md-start">
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
          <i className="bi bi-filetype-py text-info fs-1"></i>
          <h1 className="doc-section-title mb-0" style={{ fontSize: '40px' }}>Project: FastAPI Stack</h1>
        </div>
        <p className="text-secondary opacity-75 fs-5 mb-0">
          Section 6.3 — Build a modern 4-container Python architecture: Reverse Proxy, API, Database, and Cache.
        </p>
      </div>

      <div className="doc-content-grid">

        {/* OVERVIEW */}
        <div className="doc-section-card shadow-lg border-primary">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-primary"><i className="bi bi-diagram-3-fill"></i></div>
            <h2 className="doc-card-heading">Architecture Overview</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary mb-3">
              Modern Python microservices are incredibly fast and lightweight. We will build a complete, production-ready stack utilizing 4 distinct containers:
            </p>
            <ul className="text-secondary small mb-3">
              <li><strong>api:</strong> FastAPI application running via Uvicorn (built on <code>python:3.11-slim</code>)</li>
              <li><strong>web:</strong> Nginx container (acts as a Reverse Proxy, securely routing traffic to the API)</li>
              <li><strong>db:</strong> PostgreSQL container (relational database)</li>
              <li><strong>cache:</strong> Redis container (in-memory caching)</li>
            </ul>
            <div className="p-3 bg-dark rounded border border-secondary">
              <h6 className="text-light small mb-2">Folder Structure:</h6>
              <pre className="x-small text-info mb-0">
{`fastapi-app/
├── compose.yaml
├── Dockerfile
├── requirements.txt
├── nginx/
│   └── default.conf
└── src/
    └── main.py`}
              </pre>
            </div>
          </div>
        </div>

        {/* STEP 1: PYTHON CODE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-1-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 1: The Application Code</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">First, create <code>requirements.txt</code> in the root folder to define our dependencies:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`fastapi==0.110.0
uvicorn==0.29.0`}
            </pre>
            
            <p className="text-secondary small mb-2">Next, create a <code>src</code> folder, and inside it, create <code>main.py</code>. This is a very simple API that reads the environment variables we will pass through Compose:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`import os
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    # Read variables injected by Docker Compose
    db_url = os.getenv("DATABASE_URL", "Not Set")
    redis_url = os.getenv("REDIS_URL", "Not Set")
    
    return {
        "message": "Hello from FastAPI in Docker Compose! 🚀",
        "database": db_url,
        "cache": redis_url
    }`}
            </pre>
          </div>
        </div>

        {/* STEP 2: NGINX CONFIG */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-2-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 2: The Nginx Reverse Proxy Config</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create a folder named <code>nginx</code> and inside it, save this as <code>default.conf</code>:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-3">
{`server {
    listen 80;

    location / {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`}
            </pre>
            <div className="doc-alert doc-alert-info mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div>
                <strong className="text-info">What does each line mean?</strong>
                <ul className="x-small text-secondary mb-0 ps-3 mt-1">
                  <li className="mb-1"><code>proxy_pass http://api:8000;</code> — This tells Nginx to take the incoming request and forward it directly to the Docker container named <strong>api</strong> on port 8000.</li>
                  <li className="mb-1"><code>proxy_set_header Host $host;</code> — Preserves the original domain name the user requested (e.g., yourwebsite.com) so FastAPI knows the real hostname.</li>
                  <li className="mb-1"><code>proxy_set_header X-Real-IP $remote_addr;</code> — When Nginx forwards the traffic, the traffic technically comes from Nginx's IP. This line injects the user's REAL IP address into the headers so FastAPI knows who actually made the request.</li>
                  <li><code>proxy_set_header X-Forwarded-For...</code> — Keeps a chain of all the IP addresses the request passed through, which is critical for security and rate limiting.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: DOCKERFILE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-3-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 3: The Python Dockerfile</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create a <code>Dockerfile</code> in your root directory. We strictly use the <code>-slim</code> variant for a much smaller and more secure image size:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffer stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual application code
COPY ./src /app/src

# Run the Uvicorn server on port 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]`}
            </pre>
          </div>
        </div>

        {/* STEP 4: COMPOSE FILE */}
        <div className="doc-section-card shadow-lg">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-info"><i className="bi bi-4-circle-fill"></i></div>
            <h2 className="doc-card-heading">Step 4: The Compose File</h2>
          </div>
          <div className="doc-card-body">
            <p className="text-secondary small mb-2">Create <code>compose.yaml</code> in the root directory to tie it all together:</p>
            <pre className="doc-code-block bg-dark text-light border-secondary p-3 x-small mb-0">
{`services:
  # 1. Nginx Reverse Proxy
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api

  # 2. FastAPI Application
  api:
    build: .
    volumes:
      # Mount source code for live-reloading during development
      - ./src:/app/src
    environment:
      - DATABASE_URL=postgresql://fastapi_user:supersecret@db:5432/fastapi_db
      - REDIS_URL=redis://cache:6379/0
    depends_on:
      - db
      - cache

  # 3. PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=fastapi_db
      - POSTGRES_USER=fastapi_user
      - POSTGRES_PASSWORD=supersecret
    volumes:
      - db-data:/var/lib/postgresql/data

  # 4. Redis Cache Container
  cache:
    image: redis:alpine
    volumes:
      - redis-data:/data

volumes:
  db-data:
  redis-data:`}
            </pre>
            <div className="doc-alert doc-alert-info mt-3 mb-0">
              <i className="bi bi-info-circle-fill"></i>
              <div className="x-small text-secondary">
                <strong className="text-info">The Power of Docker DNS:</strong> Look at the <code>DATABASE_URL</code> in the API container. Instead of an IP address, Python simply connects to host <code>db</code>. Also, notice Nginx proxies traffic to <code>http://api:8000</code>. Compose maps these names to the correct IP addresses automatically!
              </div>
            </div>
          </div>
        </div>

        {/* STEP 5: RUN & TEST */}
        <div className="doc-section-card shadow-lg border-success">
          <div className="doc-card-header-wrapper">
            <div className="heading-icon text-success"><i className="bi bi-5-circle-fill"></i></div>
            <h2 className="doc-card-heading text-success">Step 5: Run and Test</h2>
          </div>
          <div className="doc-card-body">
            <pre className="doc-code-block bg-dark text-success border-success p-3 x-small mb-3">
{`# 1. Build the Python image and start all 4 containers in the background
docker compose up -d --build

# 2. Check if they are all running
docker compose ps`}
            </pre>
            <p className="text-secondary small mb-3">
              Open your browser and navigate to <code className="text-info">http://localhost:8080</code>.
            </p>
            <p className="text-secondary small mb-0">
              Because Nginx is acting as a reverse proxy, you are hitting Nginx on port 8080, which is secretly forwarding your request to the Python container on port 8000. You should see a JSON response confirming that FastAPI successfully loaded the Database and Redis credentials!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
