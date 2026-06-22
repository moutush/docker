import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Introduction to Docker - Docker Documentation",
  description: "Learn what Docker is and why it's a game-changer for modern development."
};

export default function IntroductionToDockerPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Introduction to Docker</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Learn what Docker is and why it's a game-changer for modern development.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-info-square-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Introduction to Docker</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Normally, when you write a program (like a website), it works on your computer but might break on your friend's computer because they have a different version of Python, a different Windows update, or missing files.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Docker allows you to "wrap" your code, along with every single tiny file and setting it needs to run, into one neat package called an <strong>Image</strong>.</p>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-lightbulb-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Real World Example</h2>
            </div>
            <div className="doc-card-body">
              
              <div dangerouslySetInnerHTML={{ __html: `<p>Imagine you want to send a delicate strawberry cake from India to a friend in London.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<h3>The Old Way (Without Containers):</h3>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>You put the cake on a ship. But the ship also carries heavy iron pipes, smelly fish, and chemicals. The pipes might crush your cake, or the smell of the fish might ruin the flavor. Plus, the ship in London might be a different size, and your cake box doesn't fit the crane. Everything breaks.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<h3>The Docker Way (The Shipping Container):</h3>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>You put your cake inside a standard Shipping Container. This container has its own cooling system and strong walls. It doesn't matter if the ship is carrying fish or iron; the cake is safe inside its own "little world." Whether the ship is big, small, or a truck, the Container fits perfectly because it is a standard size.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `
                        <div class="doc-table-wrapper shadow-sm">
                            <table class="table table-dark table-hover doc-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Use Case</th>
                                        <th>Without Docker</th>
                                        <th>With Docker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>New Employee</td>
                                        <td>Takes 2 days to install 50 different tools.</td>
                                        <td>They run Docker and are ready in 2 minutes.</td>
                                    </tr>
                                    <tr>
                                        <td>Database Setup</td>
                                        <td>Leaves "trash" files everywhere on your OS.</td>
                                        <td>Run a container, delete it, and OS stays clean.</td>
                                    </tr>
                                    <tr>
                                        <td>"It works on my machine!"</td>
                                        <td>Crashes on the Server.</td>
                                        <td>Container is the same everywhere.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>` }} />

            </div>
          </div>

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-grid-3x3-gap-fill"}></i>
              </div>
              <h2 className="doc-card-heading">The Three Main Parts of Docker</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>To be a pro, you just need to understand these three words:</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><strong>1. The Dockerfile (The Recipe)</strong></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>Think of this as a text file where you write step-by-step instructions for building your image.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><strong>2. The Image (The Frozen Meal)</strong></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>When you "build" your Dockerfile, it creates an Image — like a frozen pizza. It has all the ingredients, but it is not "alive" yet. You can send this image to anyone in the world.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p><strong>3. The Container (The Cooked Meal)</strong></p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<p>When you "run" an image, it becomes a Container. This is the living, breathing process running on your computer. You can start, stop, or delete it without affecting your actual computer's files.</p>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
