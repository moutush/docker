import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "docker search / tag - Docker Documentation",
  description: "Search Docker Hub for public images, or tag a local image with a new name."
};

export default function DockerSearchTagPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>docker search / tag</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Search Docker Hub for public images, or tag a local image with a new name.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightning-charge-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Quick Look</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker search [OPTIONS] TERM</code><br><code>docker tag SOURCE_IMAGE TARGET_IMAGE</code></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker search</code> queries Docker Hub and returns matching public images with their star ratings and official status. <code>docker tag</code> creates an additional tag pointing to the same image — a way to rename or version an image before pushing it to a registry.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-emoji-smile-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Noob-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p><code>docker search</code> is the command-line equivalent of searching Docker Hub's website. <code>docker tag</code> is like putting a second label on a jar — same contents, different name. Use it to retag an image with your Docker Hub username before pushing.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Search Docker Hub for nginx images
docker search nginx

# Tag a local image with your username for pushing
docker tag my-app:latest yourusername/my-app:v1.0`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-code-slash"}></i>
              </div>
              <h2 className="doc-card-heading">Tech-Friendly Example</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Filter search results to show only official images with at least 1000 stars, then tag and push a local image to a private registry.</p>` }} />

              <pre className="doc-code-block mt-3 mb-3">
                <code className="language-bash">{`# Search for official images only with star count
docker search --filter "is-official=true" --filter "stars=1000" python

# Tag an image for a private registry and push
docker tag my-app:latest registry.mycompany.com/team/my-app:2.1.0
docker push registry.mycompany.com/team/my-app:2.1.0`}</code>
              </pre>

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-table"}></i>
              </div>
              <h2 className="doc-card-heading">Flag / Parameter Reference</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `
        <div className="doc-table-wrapper shadow-sm mt-4">
            <table className="table table-dark table-hover doc-table mb-0">
                <thead>
                    <tr>
                        <th>Flag / Argument</th>
                        <th>Type</th>
                        <th>What it does</th>
                    </tr>
                </thead>
                <tbody>
        <tr>
            <td><code>docker search --filter</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Filter results: is-official=true, is-automated=true, stars=N.</td>
        </tr>
        <tr>
            <td><code>docker search --limit N</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Limit results to N images (default 25, max 100).</td>
        </tr>
        <tr>
            <td><code>docker search --format</code></td>
            <td><span className="badge bg-secondary">Option</span></td>
            <td>Format output with a Go template.</td>
        </tr>
        <tr>
            <td><code>docker tag SOURCE</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The existing local image name:tag or image ID to retag.</td>
        </tr>
        <tr>
            <td><code>docker tag TARGET</code></td>
            <td><span className="badge bg-secondary">Argument</span></td>
            <td>The new name:tag (can include registry host, org, repo, and tag).</td>
        </tr></tbody>
            </table>
        </div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
