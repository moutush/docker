import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "dev.db";
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

// ─── Shared helper: builds an HTML flag/parameter reference table ─────────────
function flagTable(rows: { flag: string; type: string; description: string }[]) {
    const rowsHtml = rows.map(r => `
        <tr>
            <td><code>${r.flag}</code></td>
            <td><span class="badge bg-secondary">${r.type}</span></td>
            <td>${r.description}</td>
        </tr>`).join("");
    return `
        <div class="doc-table-wrapper shadow-sm">
            <table class="table table-dark table-hover doc-table mb-0">
                <thead>
                    <tr>
                        <th>Flag / Argument</th>
                        <th>Type</th>
                        <th>What it does</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>`;
}

async function main() {
    console.log("🌱 Seeding database...");

    // ── Cleanup ───────────────────────────────────────────────────────────────
    await prisma.menuItem.deleteMany();
    await prisma.pageComponent.deleteMany();
    await prisma.page.deleteMany();

    // =========================================================================
    // PAGES — GETTING STARTED
    // =========================================================================

    // 1. Introduction to Docker
    const pIntro = await prisma.page.create({
        data: {
            title: "Introduction to Docker",
            slug: "/introduction",
            description: "Learn what Docker is and why it's a game-changer for modern development.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "Introduction to Docker",
                        icon: "bi-info-square-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Normally, when you write a program (like a website), it works on your computer but might break on your friend's computer because they have a different version of Python, a different Windows update, or missing files.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Docker allows you to \"wrap\" your code, along with every single tiny file and setting it needs to run, into one neat package called an <strong>Image</strong>.</p>",
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "Real World Example",
                        icon: "bi-lightbulb-fill",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Imagine you want to send a delicate strawberry cake from India to a friend in London.</p>",
                        order: 5,
                    },
                    {
                        type: "paragraph",
                        content: "<h3>The Old Way (Without Containers):</h3>",
                        order: 6,
                    },
                    {
                        type: "paragraph",
                        content: "<p>You put the cake on a ship. But the ship also carries heavy iron pipes, smelly fish, and chemicals. The pipes might crush your cake, or the smell of the fish might ruin the flavor. Plus, the ship in London might be a different size, and your cake box doesn't fit the crane. Everything breaks.</p>",
                        order: 7,
                    },
                    {
                        type: "paragraph",
                        content: "<h3>The Docker Way (The Shipping Container):</h3>",
                        order: 8,
                    },
                    {
                        type: "paragraph",
                        content: "<p>You put your cake inside a standard Shipping Container. This container has its own cooling system and strong walls. It doesn't matter if the ship is carrying fish or iron; the cake is safe inside its own \"little world.\" Whether the ship is big, small, or a truck, the Container fits perfectly because it is a standard size.</p>",
                        order: 9,
                    },
                    {
                        type: "paragraph",
                        content: `
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
                        </div>`,
                        order: 10,
                    },
                    {
                        type: "heading",
                        heading: "The Three Main Parts of Docker",
                        icon: "bi-grid-3x3-gap-fill",
                        content: "<p>To be a pro, you just need to understand these three words:</p>",
                        order: 11,
                    },
                    { type: "paragraph", content: "<p><strong>1. The Dockerfile (The Recipe)</strong></p>", order: 12 },
                    { type: "paragraph", content: "<p>Think of this as a text file where you write step-by-step instructions for building your image.</p>", order: 13 },
                    { type: "paragraph", content: "<p><strong>2. The Image (The Frozen Meal)</strong></p>", order: 14 },
                    { type: "paragraph", content: "<p>When you \"build\" your Dockerfile, it creates an Image — like a frozen pizza. It has all the ingredients, but it is not \"alive\" yet. You can send this image to anyone in the world.</p>", order: 15 },
                    { type: "paragraph", content: "<p><strong>3. The Container (The Cooked Meal)</strong></p>", order: 16 },
                    { type: "paragraph", content: "<p>When you \"run\" an image, it becomes a Container. This is the living, breathing process running on your computer. You can start, stop, or delete it without affecting your actual computer's files.</p>", order: 17 },
                ],
            },
        },
    });

    // 2. Docker Architecture
    const pDockerArchitecture = await prisma.page.create({
        data: {
            title: "Docker Architecture",
            slug: "/docker-architecture",
            description: "Understand how Docker works under the hood - client-server model, namespaces, cgroups, and union file system.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "How Docker Actually Works (The Architecture)",
                        icon: "bi-cpu-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Docker isn't one single program; its a team of components working together in a <strong>Client-Server relationship</strong>.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-terminal-fill"></i></div>
      <h3 class="doc-sub-card-title">The Docker Client (The Remote)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is you. When you type <code>docker run</code>, you are using the Client. Its just a <strong>messenger</strong> that sends your "orders" to the brain.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu-fill"></i></div>
      <h3 class="doc-sub-card-title">The Docker Daemon / Host (The Brain)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is a background service called <code>dockerd</code> that lives on your computer. It does the <strong>heavy lifting</strong>: building, running, and managing your containers.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shop-window"></i></div>
      <h3 class="doc-sub-card-title">The Registry (The Warehouse)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>This is where Images are stored (like <strong>Docker Hub</strong>).</p>
    </div>
  </div>
</div>`,
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "The \"Secret Sauce\" (Linux Magic)",
                        icon: "bi-magic",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Docker doesn't invent \"containers\" from scratch; it uses two powerful features already built into the Linux Kernel to create the \"illusion\" of an isolated computer.</p>",
                        order: 5,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-eye-slash-fill"></i></div>
      <h3 class="doc-sub-card-title">A. Namespaces (The \"Magic Blinders\")</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Namespaces provide <strong>Isolation</strong>. When a container starts, Docker creates a "Namespace" for it.</p>
      <ul style="color:var(--text-secondary);line-height:1.6;padding-left:1.5rem;margin-bottom:1rem">
        <li><strong>PID Namespace:</strong> The container thinks its main process is "Process #1," even if your real computer has 3,000 other processes.</li>
        <li><strong>NET Namespace:</strong> The container gets its own virtual network card and IP address.</li>
        <li><strong>MNT Namespace:</strong> The container thinks its folder is the "Root" (/) of the machine.</li>
      </ul>
      <div class="doc-alert doc-alert-info" style="margin-top:0.5rem">
        <i class="bi bi-lightbulb-fill"></i>
        <div><strong>Analogy:</strong> Its like a horse wearing blinders; it can only see whats directly in front of it and doesn't know the rest of the world exists.</div>
      </div>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-bar-chart-steps"></i></div>
      <h3 class="doc-sub-card-title">B. Control Groups / cgroups (The \"Budget\")</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>If Namespaces provide privacy, <strong>cgroups</strong> provide <strong>Limits</strong>.</p>
      <p>They make sure a single "greedy" container doesn't eat all your RAM or CPU and crash your entire laptop.</p>
      <div class="doc-alert doc-alert-info" style="margin-top:0.5rem">
        <i class="bi bi-cash-stack"></i>
        <div><strong>Analogy:</strong> Its like a parent giving a kid an allowance. "You can play, but you only have $20 and 2 hours."</div>
      </div>
    </div>
  </div>
</div>`,
                        order: 6,
                    },
                    {
                        type: "heading",
                        heading: "The \"Union File System\" (The Layer Cake)",
                        icon: "bi-layers-fill",
                        content: "",
                        order: 7,
                    },
                    {
                        type: "paragraph",
                        content: "<p>This is how Docker stays so tiny (MBs instead of GBs). Images are made of <strong>Layers</strong>.</p>",
                        order: 8,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-card">
  <div class="doc-sub-card-body">
    <p><strong>Example: Creating a PHP App on Ubuntu</strong></p>
    <p>Imagine you are building a website using PHP. Here is how Docker stacks those layers:</p>
    <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem;margin-bottom:1.5rem">
      <li><strong>Layer 1:</strong> Base OS (e.g., Ubuntu 22.04) - <em>Read Only</em></li>
      <li><strong>Layer 2:</strong> PHP & Apache (Installed via <code>apt-get</code>) - <em>Read Only</em></li>
      <li><strong>Layer 3:</strong> Your PHP Code (<code>index.php</code>) - <em>Read Only</em></li>
      <li><strong>Layer 4:</strong> Configuration (<code>php.ini</code>) - <em>Read Only</em></li>
      <li><strong>The Container Layer:</strong> Temporary files/session data - <strong>Read/Write</strong></li>
    </ul>
    <p><strong>Why is this cool?</strong> If you have 10 different PHP apps all based on the same "Ubuntu + PHP" image, Docker only stores <strong>one copy</strong> of those bottom layers on your hard drive. They all "share" the heavy stuff and only keep their own unique code and temporary data in the tiny top layer.</p>
  </div>
</div>`,
                        order: 9,
                    },
                    {
                        type: "heading",
                        heading: "The Immutability Secret (Cattle vs. Pets)",
                        icon: "bi-shield-check",
                        content: "",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p>In the Docker world, we don't treat containers like \"Pets\" that we nurse back to health. We treat them like <strong>Cattle</strong>: if one is broken, we replace it with a fresh one.</p>",
                        order: 11,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
<div class="doc-sub-card">
<div class="doc-sub-card-header">
<div class="doc-sub-card-icon"><i class="bi bi-pencil-square"></i></div>
<h3 class="doc-sub-card-title">The "Copy-on-Write" Magic</h3>
</div>
<div class="doc-sub-card-body">
<p>Image layers are<strong>Read-Only</strong>. When you "change" a file inside a container:
<ol style="color:var(--text-secondary);line-height:1.6;padding-left:1.5rem;margin-top:0.5rem">
<li>Docker<strong>copies</strong>it from the read-only layer to the top<strong>Read/Write layer</strong>.</li>
<li>You edit the copy, and the original remains safe below.</li>
</ol>
</p>
</div>
</div>

<div class="doc-sub-card">
<div class="doc-sub-card-header">
<div class="doc-sub-card-icon"><i class="bi bi-bug-fill"></i></div>
<h3 class="doc-sub-card-title">Scenario: Fixing a Production Bug</h3>
</div>
<div class="doc-sub-card-body">
<p>Imagine you accidentally left a<code>die();</code>in your PHP code on the server. How do you fix it?</p>
 
<p style="margin-top:1rem"><strong>The "Bandaid" Way (Beginner):</strong><br/>
 You<code>docker exec</code>into the container and edit the file manually.
<span style="color:var(--text-warning);display:block;margin-top:0.3rem"><em>Risk: The moment the container restarts, your fix is GONE!</em></span></p>

<p style="margin-top:1rem"><strong>The "Pro" Way (Immutable):</strong><br/>
 1. Fix the code on your machine.<br/>
 2. Build a<strong>new image</strong>(<code>v2</code>).<br/>
 3. Kill the buggy container and start a new one from<code>v2</code>.<br/>
<span style="color:#28a745;display:block;margin-top:0.3rem"><em>Result: Your fix is permanent and documented in the image.</em></span></p>
</div>
</div>
</div>`,
                        order: 12,
                    },
                ],
            },
        },
    });

    // 3. Images and Containers
    const pImagesContainers = await prisma.page.create({
        data: {
            title: "Images and Containers",
            slug: "/images-containers",
            description: "Understand the fundamental difference between Docker images (blueprints) and containers (running instances).",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "So, What Exactly is an Image?",
                        icon: "bi-layers-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>A Docker Image is the <strong>blueprint</strong>. It is a read-only, static snapshot that contains everything needed to run your app.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Think of it like a <strong>class in programming</strong> — it's the definition, not the running thing. Or think of it as a <strong>frozen pizza</strong>: it has all the ingredients, but it's not \"food\" yet until you put it in the oven.</p>",
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "And What is a Container?",
                        icon: "bi-box-seam-fill",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>A container is the <strong>running instance</strong>. It's a live, isolated process on your machine spawned from an image.</p>",
                        order: 5,
                    },
                    {
                        type: "heading",
                        heading: "The Comparison Table",
                        icon: "bi-table",
                        content: "",
                        order: 6,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-table-wrapper shadow-sm">
<table class="table table-dark table-hover doc-table mb-0">
<thead>
<tr>
<th>Feature</th>
<th>Docker Image</th>
<th>Docker Container</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>What it is</strong></td>
<td>A static blueprint</td>
<td>A live running instance</td>
</tr>
<tr>
<td><strong>State</strong></td>
<td>Read-Only (Immutable)</td>
<td>Read/Write (Mutable)</td>
</tr>
<tr>
<td><strong>Analogy</strong></td>
<td>Frozen Pizza</td>
<td>Cooked Pizza</td>
</tr>
<tr>
<td><strong>Lifespan</strong></td>
<td>Permanent</td>
<td>Temporary (Ephemeral)</td>
</tr>
</tbody>
</table>
</div>`,
                        order: 7,
                    },
                    {
                        type: "heading",
                        heading: "How an Image Becomes a Container (The Mechanical Process)",
                        icon: "bi-lightning-charge-fill",
                        content: "<p>Think of this as <strong>\"The 4-Step Magic Trick.\"</strong> When you hit Enter on <code>docker run</code>, the Docker Engine performs these steps in milliseconds:</p>",
                        order: 8,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-layers-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 1: The Layer "Snapshot" (Filesystem)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>An Image is just a stack of read-only layers (like a frozen "Save Point" in a game).</p>
      <p><strong>The Transition:</strong> Docker takes that stack and adds a thin, empty "Writable Layer" on the very top.</p>
      <p class="mt-3"><small class="text-secondary"><strong>Note:</strong> Because layers are shared, if you pull an image that is 500MB, but you already have 450MB of its base layers from a previous image, Docker only downloads the 50MB of new layers. This is why Docker is so much faster than downloading a new VM every time.</small></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-shaded"></i></div>
      <h3 class="doc-sub-card-title">Step 2: The "Namespace" Bubble (Isolation)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker tells the Linux Kernel: "Start a new process, but put blinders on it."</p>
      <p><strong>What happens:</strong> The kernel creates Namespaces. These are like invisible walls.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 3: The "cgroup" Budget (Resource Control)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker sets the "Allowance" for this new process using Control Groups (cgroups).</p>
      <p><strong>The Transition:</strong> It tells the CPU and RAM: "This container can only use 512MB of RAM and 10% of the CPU."</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-lightning-charge-fill"></i></div>
      <h3 class="doc-sub-card-title">Step 4: The "Life Spark" (The Entrypoint)</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Every Image has a "Start Command" baked into it (called the CMD or ENTRYPOINT).</p>
      <p><strong>The Transition:</strong> Docker executes that one specific command (e.g., <code>python app.py</code> or <code>postgres</code>).</p>
    </div>
  </div>
</div>`,
                        order: 9,
                    },
                    {
                        type: "paragraph",
                        content: "<div class=\"alert alert-info mt-4\"><strong>Crucial Rule:</strong> A Container only stays alive as long as its Main Process is running. If your Python script finishes or your Database crashes, the \"Life Spark\" goes out, and the container stops immediately.</div>",
                        order: 10,
                    },
                    {
                        type: "heading",
                        heading: "Interview Corner: Can a Container Run Forever?",
                        icon: "bi-question-circle-fill",
                        content: "<p>This is a classic \"Senior Docker Engineer\" interview question. The answer is <strong>Yes</strong>, but you must understand the \"Foreground Rule.\"</p>",
                        order: 11,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu"></i></div>
      <h3 class="doc-sub-card-title">1. The Foreground Rule</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker monitors the process defined in <code>CMD</code>. If that process finishes or goes into the background, the "Life Spark" goes out and the container stops.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-infinity"></i></div>
      <h3 class="doc-sub-card-title">2. The "Immortal Hack" Breakdown</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Engineers use <code>tail -f /dev/null</code> to keep a container alive for debugging. Here is why it works:</p>
      <ul>
        <li><strong>tail:</strong> Normally shows the end of a file.</li>
        <li><strong>-f (Follow):</strong> Tells tail to stay open and wait for new lines forever.</li>
        <li><strong>/dev/null:</strong> A "Black Hole" file that is always empty.</li>
      </ul>
      <p><strong>The Synergy:</strong> tail waits forever for lines to be added to a file that can never have them. It uses <strong>0% CPU</strong> and keeps the container alive.</p>
      <p><small class="text-secondary">Note: <code>sleep infinity</code> is a modern, more readable alternative.</small></p>
    </div>
  </div>
</div>`,
                        order: 12,
                    },
                    {
                        type: "paragraph",
                        content: "<div class=\"alert alert-warning mt-4\"><strong>Common Pitfall:</strong> Running <code>service nginx start</code> usually fails because it starts the service in the <em>background</em>. The start command then finishes, and Docker kills the container immediately.</div>",
                        order: 13,
                    },
                ],
            },
        },
    });

    // 5. Layers and Images
    const pLayers = await prisma.page.create({
        data: {
            title: "Layers and Images",
            slug: "/layers",
            description: "Deep dive into Docker layers, the Union File System, layer caching, and the architecture that makes Docker efficient.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "What is a Docker Image?",
                        icon: "bi-layers-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>A Docker Image is a <strong>read-only template</strong> containing instructions for creating a container. It is not a single large file (like an .iso); it is a collection of stacked, immutable layers.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-info-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong> Think of an image as a <strong>Frozen Pizza</strong>. It's a finished product in the freezer. You can't change the toppings once it's frozen, but you use it as a template to create a hot meal (the container).</div>
</div>`,
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "Why not one big file?",
                        icon: "bi-exclamation-triangle-fill",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>If images were monolithic \"bricks\" (one big file), we would run into massive efficiency problems:</p>",
                        order: 5,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hdd-fill"></i></div>
      <h3 class="doc-sub-card-title">Wasted Space</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Updating just one line of code would force you to re-download a 500MB "brick" every single time.</p>
    </div>
  </div>
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-files"></i></div>
      <h3 class="doc-sub-card-title">Redundancy</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Running 10 different Python apps would mean having 10 identical copies of the Python runtime taking up space on your disk.</p>
    </div>
  </div>
</div>`,
                        order: 6,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-success">
  <i class="bi bi-check-circle-fill"></i>
  <div><strong>The Solution:</strong> Layers allow Docker to <strong>share</strong> parts of images. 
  <br><br>
  <strong>The Pizza Analogy:</strong> Instead of a 50kg solid brick of pre-mixed dough and sauce, Docker keeps them separate. To change pepperoni to mushrooms, you only swap the 1kg topping layer, not the 49kg base.</div>
</div>`,
                        order: 7,
                    },
                    {
                        type: "heading",
                        heading: "How Layers Work (Step-by-Step)",
                        icon: "bi-stack-overflow",
                        content: "",
                        order: 8,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Each instruction in a <code>Dockerfile</code> creates a new layer. These layers are <strong>Read-Only</strong> and <strong>Immutable</strong>.</p>",
                        order: 9,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Example: Building a FastAPI Image</p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: `<ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem; margin-bottom: 2rem;">
  <li><code>FROM python:3.9</code>: <strong>The Crust.</strong> This is your foundation.</li>
  <li><code>RUN apt install ...</code>: <strong>The Sauce.</strong> Spread over the base.</li>
  <li><code>COPY requirements.txt .</code>: <strong>The Cheese.</strong> Essential before the "fun" stuff.</li>
  <li><code>RUN pip install ...</code>: <strong>The Seasoning.</strong> Baked into the cheese.</li>
  <li><code>COPY . .</code>: <strong>The Toppings.</strong> (Your FastAPI code). What makes your pizza unique.</li>
</ul>`,
                        order: 11,
                    },
                    {
                        type: "heading",
                        heading: "The \"Copy-on-Write\" (CoW) Strategy",
                        icon: "bi-file-earmark-diff",
                        content: "",
                        order: 12,
                    },
                    {
                        type: "paragraph",
                        content: "<p>When you start a container, Docker adds one <strong>thin, writable layer</strong> on top of the Read-Only stack.</p>",
                        order: 13,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-info-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong> Imagine placing a sheet of <strong>Transparent Plastic Foil</strong> over the pizza.
  <ul style="margin-top:0.5rem; margin-bottom:0px;">
    <li><strong>The Rule:</strong> You can't touch the frozen pizza, but you can write on the foil with a marker.</li>
    <li><strong>The Action:</strong> If your app needs to "modify" a file in the crust, Docker copies that bit of crust onto the foil and modifies it there.</li>
    <li><strong>The Outcome:</strong> The original "Frozen Pizza" (Image) stays perfect in the freezer for the next container to use.</li>
  </ul>
  </div>
</div>`,
                        order: 14,
                    },
                    {
                        type: "heading",
                        heading: "Layer Caching: The DevOps Secret",
                        icon: "bi-lightning-charge-fill",
                        content: "",
                        order: 15,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Docker caches each layer. If a layer hasn't changed, Docker skips the work. <strong>The Rule:</strong> If one layer changes, all layers below it must be rebuilt.</p>",
                        order: 16,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-warning">
  <i class="bi bi-exclamation-circle-fill"></i>
  <div><strong>The Pizza Analogy:</strong> You keep a stack of Pre-Baked crusts with sauce. When an order comes in, you just throw on cheese. But if you change the sauce recipe, you must throw away all pre-baked crusts and start from the bottom.</div>
</div>`,
                        order: 17,
                    },
                    {
                        type: "heading",
                        heading: "The Union File System (UnionFS)",
                        icon: "bi-diagram-3",
                        content: "",
                        order: 18,
                    },
                    {
                        type: "paragraph",
                        content: "<p>This is the technology that \"squashes\" these layers together into a single view.</p>",
                        order: 19,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-secondary">
  <i class="bi bi-cpu-fill"></i>
  <div><strong>How Overlay2 Works (The Tech):</strong> Overlay2 divides your file system into three main parts:
    <ul class="mt-2 mb-0">
      <li><strong>lowerdir:</strong> The Read-Only layers (the Image). Consider these the foundation.</li>
      <li><strong>upperdir:</strong> The Writable layer (the Container). Where your current changes live.</li>
      <li><strong>merged:</strong> The "Union" view. This is what the application actually sees—an overlay of the upper on top of the lower.</li>
    </ul>
  </div>
</div>`,
                        order: 20,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info mt-3">
  <i class="bi bi-eye-fill"></i>
  <div><strong>The Tracing Paper Analogy (Noob-Friendly):</strong> 
    <p class="mt-2 mb-1">Imagine you have a beautiful <strong>Base Drawing</strong> (your <code>lowerdir</code>). You want to add a hat to the character but don't want to ruin the original art.</p>
    <ul>
      <li><strong>The Layer:</strong> You place a sheet of <strong>Transparent Tracing Paper</strong> (your <code>upperdir</code>) on top.</li>
      <li><strong>The Change:</strong> You draw the hat on the tracing paper.</li>
      <li><strong>The Result:</strong> When you look at the desk, you see the character wearing a hat! That finished look is the <strong>merged</strong> view. The base drawing remains untouched underneath, and if you throw away the tracing paper, the character is back to normal.</li>
    </ul>
  </div>
</div>`,
                        order: 21,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-success mt-3">
  <i class="bi bi-lightning-charge-fill"></i>
  <div><strong>Why it's fast:</strong> Overlay2 doesn't copy the whole "Base Drawing." It only records the "Hat" you drew. If you try to change a building in the background, it "Copies-on-Write" (CoW) just that building onto your tracing paper and modifies it there.</div>
</div>`,
                        order: 22,
                    },
                    {
                        type: "heading",
                        heading: "Inter-Container Layer Sharing",
                        icon: "bi-diagram-2",
                        content: "",
                        order: 23,
                    },
                    {
                        type: "paragraph",
                        content: "<p><strong>The Pizza Analogy:</strong> If \"Wolf's Shop\" and \"Gemini's Shop\" both use the same brand of frozen crust, we share one warehouse for those crusts. This is why you can run 50 containers without filling your hard drive; they all point to the same physical \"crust\" bytes.</p>",
                        order: 24,
                    },
                    {
                        type: "heading",
                        heading: "Tricky Questions (DevOps Prep)",
                        icon: "bi-question-circle-fill",
                        content: "",
                        order: 25,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-trash3-fill"></i></div>
      <h3 class="doc-sub-card-title">Q1: Does <code>RUN rm -rf /temp</code> make an image smaller?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: Not if the files were created in a previous RUN.</strong></p>
      <p><strong>Pizza Logic:</strong> If you drop a hair on the sauce and then cover it with cheese, you can't "pick it off." Adding an rm command later is just putting a sticker on the foil that says "Ignore the hair." The hair is still baked into the box taking up space.</p>
      <p><strong>DevOps Tip:</strong> Create and delete temp files in the <em>same</em> RUN command.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-lock-fill"></i></div>
      <h3 class="doc-sub-card-title">Q2: Can two containers modify the same image layer?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: No.</strong> Image layers are 100% read-only. Each container gets its own private "Foil" (Writable Layer). They share the base but never interfere with each other.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hash"></i></div>
      <h3 class="doc-sub-card-title">Q3: Change a comment in <code>requirements.txt</code>?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A:</strong> The file hash changes. Docker's cache breaks, and it will re-run <code>pip install</code> from scratch. Keep your <code>requirements.txt</code> clean!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stack-overflow"></i></div>
      <h3 class="doc-sub-card-title">Q4: Is there a layer limit?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>A: Yes (usually 127 layers).</strong></p>
      <p><strong>Pizza Logic:</strong> You can't stack 1,000 layers of cheese without the pizza collapsing. Combine related commands using <code>&&</code> to keep your stack lean.</p>
    </div>
  </div>
</div>`,
                        order: 26,
                    },
                    {
                        type: "heading",
                        heading: "The 127-Layer Limit",
                        icon: "bi-gear-fill",
                        content: "",
                        order: 27,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-gear-fill"></i>
  <div><strong>Technical Fact:</strong> The 127-layer limit isn't just an arbitrary number; it's a structural limitation of storage drivers like <strong>AUFS</strong> or <strong>Overlay2</strong>. Each layer adds overhead for the file system to track. This is why we use <code>&&</code> to squash commands into a single layer.</div>
</div>`,
                        order: 28,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-success mt-3">
  <i class="bi bi-lightbulb-fill"></i>
  <div><strong>Noob-Friendly Example:</strong> 
  <p class="mt-2 mb-1">Imagine you're making 50 small pizzas for a party. You have two choices:</p>
  <ul>
    <li><strong>The "Bad" Way (127 Layers):</strong> You put a sauce layer on all pizzas, then go back and put cheese on all, then go back for pepperoni... by the 100th trip to the kitchen, you're exhausted!</li>
    <li><strong>The "Squashed" Way (<code>&&</code>):</strong> You grab the sauce, cheese, and pepperoni in ONE go and dress each pizza fully before moving on. One trip, one layer, much faster!</li>
  </ul>
  </div>
</div>`,
                        order: 29,
                    },
                    {
                        type: "heading",
                        heading: "How Docker Identifies Layers (SHA256)",
                        icon: "bi-fingerprint",
                        content: "",
                        order: 30,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info">
  <i class="bi bi-fingerprint"></i>
  <div><strong>The Digital Fingerprint:</strong> Docker doesn't identify layers by human names (like "Sauce Layer"). Instead, it uses a <strong>SHA256 Hash</strong>—a unique string generated from the <em>exact</em> contents of that layer.</div>
</div>`,
                        order: 31,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-card mt-3">
  <div class="doc-sub-card-header">
    <div class="doc-sub-card-icon"><i class="bi bi-clock-history"></i></div>
    <h3 class="doc-sub-card-title">The Cache Ripple Effect</h3>
  </div>
  <div class="doc-sub-card-body">
    <p>If you change a single comma in <code>requirements.txt</code>, its "Fingerprint" (Hash) changes. Docker sees this as a <strong>brand new layer</strong>.</p>
    <ul>
      <li><strong>Layers Below (OS, Python):</strong> Stay cached. They haven't changed!</li>
      <li><strong>The Modified Layer:</strong> Rebuilds from scratch.</li>
      <li><strong>Layers Above (Code, Entrypoint):</strong> Must also rebuild, because their "base" has shifted.</li>
    </ul>
    <p><strong>Pizza Logic:</strong> If you change the brand of sauce, the crust stays the same (below), but you must re-add the cheese and toppings (above) because they sit on top of the new sauce!</p>
  </div>
</div>`,
                        order: 32,
                    },
                    {
                        type: "heading",
                        heading: "Volumes: Persistence Outside the Stack",
                        icon: "bi-database-fill-check",
                        content: "",
                        order: 33,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-warning">
  <i class="bi bi-database-fill-check"></i>
  <div><strong>Wait, what about my data?</strong> If layers are immutable and "foil" layers are deleted when the container stops, how do we save data? <strong>Volumes.</strong></div>
</div>`,
                        order: 34,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-card mt-3">
  <div class="doc-sub-card-header">
    <div class="doc-sub-card-icon"><i class="bi bi-box-seam-fill"></i></div>
    <h3 class="doc-sub-card-title">Layers vs. Volumes</h3>
  </div>
  <div class="doc-sub-card-body">
    <p>Volumes live <strong>outside</strong> the Onion File System. They are not part of the image hash and don't care about "layers."</p>
    <p><strong>Pizza Logic:</strong> Imagine your pizza is in a <strong>Storage Bin</strong>. You can change the pizza, throw it away, or swap it for a different one—but the storage bin and everything else in it stays exactly as it was. The bin is the <strong>Volume</strong>; the pizza is the <strong>Container</strong>.</p>
  </div>
</div>`,
                        order: 35,
                    },
                ],
            },
        },
    });

    // 6. Volumes and Bind Mounts
    const pVolumesBindMounts = await prisma.page.create({
        data: {
            title: "Volumes and Bind Mounts",
            slug: "/volumes-bind-mounts",
            description: "Master data persistence in Docker - understand volumes for production, bind mounts for development, and Docker Compose.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "Docker Volume",
                        icon: "bi-hdd-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>In the world of Docker, a volume is the preferred mechanism for persisting data generated by and used by Docker containers.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: "<p>By default, any files created inside a container are stored on a writable container layer. This presents two problems: the data doesn't persist if the container is deleted, and it is difficult to get that data out of the container for another process to use. Volumes solve this by decoupling the storage from the container's lifecycle.</p>",
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "The Problem: The \"Amnesia\" Effect",
                        icon: "bi-exclamation-triangle-fill",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Imagine you are building a FastAPI project. You write code that allows users to upload profile pictures.</p>",
                        order: 5,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-warning" style="margin-top:1rem; margin-bottom:1rem;">
  <i class="bi bi-info-circle-fill"></i>
  <div><strong>The Goldfish Memory Effect:</strong> Just like a goldfish is said to have a 3-second memory, a container forgets everything that happened inside it the moment it is deleted or restarted. It starts completely fresh every time.</div>
</div>`,
                        order: 6,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-1-circle-fill"></i></div>
      <h3 class="doc-sub-card-title">The Scenario</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>You run your FastAPI app in a Docker container. A user uploads <code>my-photo.jpg</code>. Docker saves it inside the container's internal folder (e.g., <code>/app/uploads</code>).</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-2-circle-fill"></i></div>
      <h3 class="doc-sub-card-title">The Crash</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Your app crashes or you need to update your code, so you stop and delete the container to start a fresh one.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-3-circle-fill"></i></div>
      <h3 class="doc-sub-card-title">The Loss</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Because the container was deleted, the internal <code>/app/uploads</code> folder is gone forever. Your user's photo is deleted.</p>
    </div>
  </div>
</div>`,
                        order: 7,
                    },
                    {
                        type: "paragraph",
                        content: "<div class=\"doc-alert doc-alert-warning\" style=\"margin-top:1rem\"><i class=\"bi bi-exclamation-circle-fill\"></i><div><strong>The Problem Statement:</strong> Containers are \"ephemeral\" (temporary). Anything written inside them disappears when the container is removed.</div></div>",
                        order: 8,
                    },
                    {
                        type: "heading",
                        heading: "The Solution: Volumes (The \"External Hard Drive\")",
                        icon: "bi-safe-fill",
                        content: "",
                        order: 9,
                    },
                    {
                        type: "paragraph",
                        content: "<p>A volume acts like an external hard drive for your container. You tell Docker: <em>\"Hey, even though this folder looks like it's inside the container, actually save everything to this specific spot on my physical computer.\"</em></p>",
                        order: 10,
                    },
                    {
                        type: "heading",
                        heading: "Noob-Friendly Example: The FastAPI Uploads",
                        icon: "bi-lightbulb-fill",
                        content: "<p>Instead of saving directly to the container's temporary memory, you \"mount\" a volume:</p>",
                        order: 11,
                    },
                    {
                        type: "paragraph",
                        content: `<ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
  <li><strong>Step 1:</strong> You create a volume named <code>user_data</code>.</li>
  <li><strong>Step 2:</strong> You tell Docker: "Link <code>user_data</code> to the container's <code>/app/uploads</code> folder."</li>
  <li><strong>Step 3:</strong> Now, when a user uploads a photo, it bypasses the container's temporary storage and goes straight into <code>user_data</code>.</li>
  <li><strong>Step 4:</strong> You can delete, update, or crash the container 100 times. When the new container starts and links to <code>user_data</code>, the photos are still there waiting for it.</li>
</ul>`,
                        order: 12,
                    },
                    {
                        type: "heading",
                        heading: "Practical CLI Example",
                        icon: "bi-terminal-fill",
                        content: "<p>When running your FastAPI image:</p>",
                        order: 13,
                    },
                    {
                        type: "code",
                        content: `docker run -p 8000:8000 -v user_data:/app/uploads my-fastapi-app`,
                        language: "bash",
                        order: 14,
                    },
                    {
                        type: "paragraph",
                        content: `<ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
  <li><code>-v</code>: This flag creates the volume connection.</li>
  <li><code>user_data</code>: The name of your persistent storage.</li>
  <li><code>/app/uploads</code>: The path inside your FastAPI project where the app expects to find files.</li>
</ul>`,
                        order: 15,
                    },
                    {
                        type: "heading",
                        heading: "Concept-Clearing Q&A",
                        icon: "bi-question-circle-fill",
                        content: "<p>Common questions when starting out with Volumes.</p>",
                        order: 16,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3">

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-database-fill"></i></div>
      <h3 class="doc-sub-card-title">1. Where to keep Database data?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>In the Docker world, every official database image (PostgreSQL, MySQL, MongoDB, etc.) is designed to store its data in a specific internal folder. You just "plug" a volume into that folder.</p>
      <p>For example, if you use PostgreSQL, the internal path where it stores everything is <code>/var/lib/postgresql/data</code>. Your command would look like this:</p>
      <pre style="background:#111827;padding:1rem;border-radius:0.5rem;border:1px solid #374151;color:#a5b4fc;margin-top:0.5rem"><code>docker run -v my_db_data:/var/lib/postgresql/data postgres</code></pre>
      <p style="margin-top: 0.5rem">Now, even if you delete the Postgres container and start a new one, all your tables and rows are perfectly safe inside <code>my_db_data</code>.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-folder-fill"></i></div>
      <h3 class="doc-sub-card-title">2. Do I need 100 volumes for 100 folders?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Technically, yes, if those folders are unrelated. However, in practice:</p>
      <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
        <li><strong>One Volume, Multiple Sub-folders:</strong> You can mount one volume to a "parent" folder. If your app has <code>/app/data/uploads</code> and <code>/app/data/logs</code>, just mount a volume to <code>/app/data</code>.</li>
        <li><strong>Docker Compose:</strong> As a developer, you use a <code>docker-compose.yml</code> file to keep everything organized, so you don't even have to remember the volume mapping commands.</li>
      </ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-diagram-3-fill"></i></div>
      <h3 class="doc-sub-card-title">3. Can multiple containers share the same volume?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>Yes!</strong> This is actually one of the superpowers of Docker volumes.</p>
      <p>For instance, you might have a web server container generating log files into a <code>logs_volume</code>, and a second "log processing" container reading from that exact same <code>logs_volume</code> simultaneously.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-box-seam-fill"></i></div>
      <h3 class="doc-sub-card-title">4. What happens if I mount an empty volume to a folder with files?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p>Docker is smart. If you mount a completely new, empty volume into a container directory that already contains files (baked into the image), Docker will <strong>copy the existing files</strong> into the volume first, and then mount it.</p>
      <p>This means you don't lose the default configurations or files that came with the image!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-robot"></i></div>
      <h3 class="doc-sub-card-title">5. Cross-Compiling (e.g., Tesseract on Windows for Linux)?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p style="margin-bottom:0.5rem"><strong>Question:</strong> "Let's say I am creating a binary of Tesseract using Docker on my Windows machine, but I need it for a Linux zipped deployment (like AWS Lambda). Do I use a Bind Mount for that because I want to copy the zip from my OS back to the cloud?"</p>
      <p><strong>Answer: Yes, absolutely!</strong> This is a perfect use case for a Bind Mount.</p>
      <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
        <li>You spin up a Linux container and "bind mount" a folder from your Windows machine into it.</li>
        <li>The container compiles the Tesseract binary built perfectly for Linux environments.</li>
        <li>The container then places the final <code>.zip</code> file directly into that bind-mounted folder.</li>
        <li>Once the container exits, the Linux-compiled zip is sitting right there on your Windows desktop, ready for you to upload!</li>
      </ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-exclamation"></i></div>
      <h3 class="doc-sub-card-title">6. Can a Volume or Bind Mount infect my Host OS with a virus?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p style="margin-bottom:0.5rem"><strong>Question:</strong> "If a container gets a virus, can it spread to my actual laptop (Host OS) through a Volume or Bind Mount?"</p>
      <p><strong>Answer: Yes, but with conditions!</strong> Volumes and Bind Mounts are direct file-sharing mechanisms.</p>
      <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
        <li>If a malicious container writes a ransomware file or script into a <strong>Bind Mount</strong> folder, that file immediately exists on your Host OS (e.g., your Desktop).</li>
        <li>However, the virus <strong>cannot automatically execute itself</strong> on your Host OS unless you (or another program on your laptop) double-clicks or runs that infected file.</li>
        <li><strong>Security Rule:</strong> Only mount folders that contain files the container absolutely needs to read or write. Never mount your entire <code>C:\\</code> drive or root <code>/</code> directory into a container!</li>
      </ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-usb-symbol"></i></div>
      <h3 class="doc-sub-card-title">7. Are Volumes/Bind Mounts the <em>only</em> way Docker shares with the OS?</h3>
    </div>
    <div class="doc-sub-card-body">
      <p style="margin-bottom:0.5rem"><strong>Question:</strong> "Are these the only possible sharable sections between the OS and Docker?"</p>
      <p><strong>Answer: No!</strong> Volumes and Bind Mounts are for sharing <strong>Files/Storage</strong>. But there are two other massive shared spaces:</p>
      <ul style="color:var(--text-secondary);line-height:1.8;padding-left:1.5rem">
        <li><strong>The Network (Ports):</strong> When you use <code>-p 8000:8000</code>, you are sharing a "doorway" (a network port). Traffic from your Host OS port 8000 goes straight into the container's port 8000.</li>
        <li><strong>System Devices (Advanced):</strong> You can share physical hardware using the <code>--device</code> flag. For example, you can give a container direct access to your USB WebCam (<code>/dev/video0</code>) or your Graphics Card (GPU) for AI training!</li>
      </ul>
    </div>
  </div>

</div>`,
                        order: 17,
                    },
                    {
                        type: "heading",
                        heading: "Summary Table",
                        icon: "bi-table",
                        content: "",
                        order: 18,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-table-wrapper shadow-sm">
  <table class="table table-dark table-hover doc-table mb-0">
    <thead>
      <tr>
        <th>Data Type</th>
        <th>Needs a Volume?</th>
        <th>Why?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Source Code</strong></td>
        <td>No</td>
        <td>It's built into the Image.</td>
      </tr>
      <tr>
        <td><strong>Database Rows</strong></td>
        <td>Yes</td>
        <td>You can't lose your users' accounts!</td>
      </tr>
      <tr>
        <td><strong>User Uploads</strong></td>
        <td>Yes</td>
        <td>You can't ask users to re-upload photos.</td>
      </tr>
      <tr>
        <td><strong>App Logs</strong></td>
        <td>Optional</td>
        <td>Only if you need to analyze them after a crash.</td>
      </tr>
    </tbody>
  </table>
</div>`,
                        order: 19,
                    },
                    {
                        type: "heading",
                        heading: "The \"All-in-One\" Solution: Docker Compose",
                        icon: "bi-stack",
                        content: "",
                        order: 20,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Since you're moving from pure coding toward DevOps, seeing how a database and an app live together is the next logical step. Instead of running two separate, massive commands, we use Docker Compose.</p>",
                        order: 21,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Think of Docker Compose as a blueprint for your entire project. Instead of remembering which volume goes to which container, you write it down once in a file named <code>docker-compose.yml</code>.</p>",
                        order: 22,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Here is how you would set up your FastAPI app and a Postgres Database together:</p>",
                        order: 23,
                    },
                    {
                        type: "code",
                        content: `version: '3.8'

services:
  # Service 1: The Database
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=mypassword

  # Service 2: Your FastAPI App
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - user_uploads:/app/uploads
    depends_on:
      - db

volumes:
  postgres_data:  # This stays safe even if the DB container is deleted
  user_uploads:   # This stays safe even if the FastAPI container is deleted`,
                        language: "yaml",
                        order: 24,
                    },
                    {
                        type: "heading",
                        heading: "Wait, What About Bind Mounts?",
                        icon: "bi-lightning-charge-fill",
                        content: "",
                        order: 25,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Volumes are great for databases and permanent storage. But what if you are actively coding and want to see your changes instantly? Enter <strong>Bind Mounts</strong>.</p>",
                        order: 26,
                    },
                    {
                        type: "paragraph",
                        content: "<p>A Bind Mount is like opening a direct \"window\" from the container into a specific folder on your actual laptop (like <code>/Users/you/project</code>).</p>",
                        order: 27,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-alert doc-alert-info" style="margin-top:1rem; margin-bottom:1.5rem">
  <i class="bi bi-lightbulb-fill"></i>
  <div><strong>Developer Superpower:</strong> If you change a line of code on your laptop, the container sees it instantly through the window. This gives you Live Reloading!</div>
</div>`,
                        order: 28,
                    },
                    {
                        type: "heading",
                        heading: "Volume vs. Bind Mount (The Short Version)",
                        icon: "bi-diagram-2",
                        content: "<p>If you're ever confused about which one to pick, use this simple cheat sheet:</p>",
                        order: 29,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-safe-fill"></i></div>
      <h3 class="doc-sub-card-title">Docker Volume</h3>
    </div>
    <div class="doc-sub-card-body">
      <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
        <li><strong>Who manages it?</strong> Docker.</li>
        <li><strong>Where is it?</strong> Hidden deep in Docker's internal engine files.</li>
        <li><strong>When to use:</strong> Databases (Postgres), user uploads, and production environments.</li>
      </ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-window"></i></div>
      <h3 class="doc-sub-card-title">Bind Mount</h3>
    </div>
    <div class="doc-sub-card-body">
      <ul style="color:var(--text-secondary);line-height:2;padding-left:1.5rem">
        <li><strong>Who manages it?</strong> You (The OS).</li>
        <li><strong>Where is it?</strong> A literal folder on your Desktop or Documents.</li>
        <li><strong>When to use:</strong> Local development (Live code reloading).</li>
      </ul>
    </div>
  </div>
</div>`,
                        order: 30,
                    },
                ],
            },
        },
    });

    // 6. Rules and Case Studies
    const pRulesAndCaseStudies = await prisma.page.create({
        data: {
            title: "10 Essential Rules and Real-World Case Studies",
            slug: "/rules-and-case-studies",
            description: "Master Docker with 10 essential rules and learn from 8 real-world case studies that show how to apply them in production.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "10 Essential Rules for Docker Mastery",
                        icon: "bi-lightbulb-fill",
                        content: "",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Master these rules to avoid common pitfalls and excel in Docker certifications and interviews.</p>",
                        order: 2,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-eye-slash-fill"></i></div>
      <h3 class="doc-sub-card-title">1. The "Invisible" File Rule</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker images are made of read-only layers. Once a layer is created, it never changes. Deleting a file in a later layer simply adds a "note" to ignore it; the file still exists in the previous layer, taking up space.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine writing a secret with a <strong>Pencil</strong> and then trying to "delete" it by covering it with <strong>Permanent Ink</strong>. The ink hides the pencil mark, but the lead is still physically on the paper. To truly remove it, you must erase the pencil mark <em>before</em> applying the ink (i.e., in the same <code>RUN</code> command).</p>
      <p><strong>The Exam Solution:</strong> Always use <code>&&</code> to <code>ADD</code> and <code>rm</code> in one instruction to keep images slim.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cpu"></i></div>
      <h3 class="doc-sub-card-title">2. The PID 1 "Life Spark"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> A container is bound to the life of its primary process (PID 1). If that process ends, the container dies. If that process moves to the background (forks), the container thinks its work is done and exits.</p>
      <p><strong>Noob-Friendly Example:</strong> A container is like a <strong>Heartbeat Monitor</strong>. As long as the heart (PID 1) is beating, the machine stays on. If the heart stops or is "backgrounded" to another room, the monitor registers a flatline and shuts down the container.</p>
      <p><strong>The Exam Solution:</strong> If a container keeps crashing, it's likely because the process finished. Use <code>tail -f /dev/null</code> to keep it alive for debugging.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-diagram-3"></i></div>
      <h3 class="doc-sub-card-title">3. Namespaces vs. cgroups</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> These are the two pillars of containerization. Namespaces handle *isolation* (what you can see), while cgroups handle *resources* (what you can use).</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine an <strong>Apartment Building</strong>. 
        <ul>
          <li><strong>Namespaces:</strong> Are the <strong>Walls and Curtains</strong>. They ensure you can't see into your neighbor's kitchen or use their stove.</li>
          <li><strong>cgroups:</strong> Are the <strong>Circuit Breakers</strong>. They ensure that if your neighbor plugs in 10 space heaters, they don't blow the fuse for the whole building or hog all the electricity.</li>
        </ul>
      </p>
      <p><strong>Interview Tip:</strong> Visibility issues = Namespace. Resource hogging/crashing host = cgroup.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-lightning-fill"></i></div>
      <h3 class="doc-sub-card-title">4. The UnionFS Performance "Tax"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> The Union File System (Overlay2) has to do extra math to "merge" all layers together every time you read or write a file. This "overhead" makes disk I/O slower than native hardware.</p>
      <p><strong>Noob-Friendly Example:</strong> It's like wearing <strong>5 pairs of gloves</strong>. You can still pick up a glass of water, but it's much slower and clumsier than using your bare hands. <strong>Volumes</strong> are like taking the gloves off and touching the glass directly.</p>
      <p><strong>The Exam Solution:</strong> Use Volumes for any app that needs high-speed disk access (Databases, Loggers).</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stack"></i></div>
      <h3 class="doc-sub-card-title">5. The "Layer Cake" Cache</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker builds images in a specific order. If you change a layer, every layer *after* it must be rebuilt from scratch because the foundation has changed.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine building a <strong>Lego Tower</strong>. If you decide to change the color of the <strong>bottom brick</strong>, you have to take apart the whole tower and rebuild it. If you change the <strong>top brick</strong>, the rest of the tower stays perfect.</p>
      <p><strong>The Exam Solution:</strong> Put heavy, stable things (OS, NPM install) at the top. Put frequently changing things (Source Code) at the bottom.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-cloud-slash"></i></div>
      <h3 class="doc-sub-card-title">6. The "Amnesia" Factor</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Containers are designed to be temporary and replaceable. Any data written directly to the container's file system is deleted the moment the container is removed.</p>
      <p><strong>Noob-Friendly Example:</strong> A container is like a <strong>Rental Car</strong>. You can adjust the seat, change the radio station, and put trash in the door pocket. But when you return the car, all those changes are wiped for the next customer. If you want to keep your music, you need a <strong>USB Drive (Volume)</strong>.</p>
      <p><strong>The Exam Solution:</strong> Never store state (DBs, uploads) inside a container. Use Volumes for "Long-term memory."</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-pci-card"></i></div>
      <h3 class="doc-sub-card-title">7. The Architecture "Ship"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> Docker doesn't virtualize the CPU hardware. It uses the Host's Kernel. Therefore, an image built for one type of CPU (e.g., Apple M4/ARM) cannot run on another (e.g., Intel/AMD) without special emulation.</p>
      <p><strong>Noob-Friendly Example:</strong> It's like trying to play a <strong>PlayStation disc in an Xbox</strong>. Even though they are both "game consoles" (Linux systems), the underlying hardware "language" they speak is different.</p>
      <p><strong>The Exam Solution:</strong> Ensure your build architecture matches your deployment target, or use <code>buildx</code> for multi-arch builds.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-stop-circle-fill"></i></div>
      <h3 class="doc-sub-card-title">8. The "Stop" vs. "Kill" Signal</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> <code>docker stop</code> sends a <code>SIGTERM</code> (Termination) signal. This is a request for the app to finish its work and exit gracefully. <code>SIGKILL</code> is a forced shutdown by the OS.</p>
      <p><strong>Noob-Friendly Example:</strong> 
        <ul>
          <li><strong>Stop:</strong> Is like your mom saying "It's time for dinner, finish your game and come down." You have a few minutes to save your progress.</li>
          <li><strong>Kill:</strong> Is your mom <strong>pulling the plug out of the wall</strong>. No saving, just instant darkness.</li>
        </ul>
      </p>
      <p><strong>The Exam Solution:</strong> If a container hangs for 10s on stop, your app isn't "listening." Fix your signal handling!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-box-arrow-in-down-right"></i></div>
      <h3 class="doc-sub-card-title">9. The "Mount" Priority</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> When you mount a volume, it sits "on top" of the image directory. If files existed in the image's folder, they are hidden (but not deleted) by the volume.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine you have a <strong>Coffee Table</strong> with a book on it. If you put a <strong>Tablecloth (Volume)</strong> over the table, the book is still there, but you can't see or touch it until you remove the cloth.</p>
      <p><strong>The Exam Solution:</strong> Be careful where you mount! Mounting to <code>/etc</code> might hide critical system configs and crash your container.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-scissors"></i></div>
      <h3 class="doc-sub-card-title">10. Multi-Stage "Slimming"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Concept:</strong> To build an app, you need compilers and tools. To run an app, you only need the final binary. Multi-stage builds let you build in one image and ship only the results in a second, smaller image.</p>
      <p><strong>Noob-Friendly Example:</strong> Imagine a <strong>Restaurant</strong>.
        <ul>
          <li><strong>The Kitchen (Stage 1):</strong> Has messy flour, raw eggs, and big ovens to bake a cake.</li>
          <li><strong>The Dining Room (Stage 2):</strong> Only has the <strong>Finished Cake on a Plate</strong>. You don't bring the flour and the whole oven to the customer's table!</li>
        </ul>
      </p>
      <p><strong>The Exam Solution:</strong> Use Multi-stage builds to reduce image size and hide source code from production.</p>
    </div>
  </div>
</div>`,
                        order: 3,
                    },
                    {
                        type: "heading",
                        heading: "Real-World Case Studies",
                        icon: "bi-briefcase-fill",
                        content: "",
                        order: 4,
                    },
                    {
                        type: "paragraph",
                        content: "<p>Apply the rules above to solve these common production scenarios.</p>",
                        order: 5,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-database-exclamation"></i></div>
      <h3 class="doc-sub-card-title">Case Study 1: The "Vanishing" Database</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You are running a MySQL database inside a container. After a reboot, you start the container again. You log in, and the database is completely empty.</p>
      <p><strong>The Problem:</strong> Which "Rule" was broken?</p>
      <p><strong>The Solution:</strong> <strong>The Amnesia/Persistence Rule.</strong> You likely saved data to the container's Writable Layer instead of a Volume.</p>
      <p><strong>The Fix:</strong> Map a Volume to the database's data folder (e.g., <code>/var/lib/mysql</code>).</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-hourglass-split"></i></div>
      <h3 class="doc-sub-card-title">Case Study 2: The "10-Second Delay"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> Every time you run <code>docker stop</code>, the container hangs for exactly 10 seconds before finally dying.</p>
      <p><strong>The Problem:</strong> The <strong>PID 1 / Signal Rule</strong>.</p>
      <p><strong>The Solution:</strong> Your script is running as PID 1 but it isn't "listening" for the SIGTERM. Docker waits 10 seconds, then sends a SIGKILL.</p>
      <p><strong>The Fix:</strong> Ensure your script handles signals or use <code>exec</code> to make your app the actual PID 1.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-textarea-t"></i></div>
      <h3 class="doc-sub-card-title">Case Study 3: The "Bloated" Image</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You have one <code>RUN</code> to download a 500MB SDK, another to build, and a third to delete the SDK. The final image is still over 600MB.</p>
      <p><strong>The Problem:</strong> The <strong>Immutability / Layer Rule</strong>.</p>
      <p><strong>The Solution:</strong> Deleting it in a later layer only adds a "mask"—the 500MB is still physically taking up space in the previous layer.</p>
      <p><strong>The Fix:</strong> Use <code>&&</code> to download, build, and delete all in one single <code>RUN</code> command.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 4: The "Mystery" Crash</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> App-A gets a traffic spike. A few minutes later, the entire physical server crashes, and App-B is also gone.</p>
      <p><strong>The Problem:</strong> The <strong>cgroup / Resource Budget Rule</strong>.</p>
      <p><strong>The Solution:</strong> Without cgroups, App-A ate all the host's RAM, causing a Kernel panic.</p>
      <p><strong>The Fix:</strong> Set <code>--memory</code> and <code>--cpus</code> limits on your containers.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-lock-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 5: The "Permission Denied" Wall</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You mount your local source code, but the app says <code>Error: EACCES: permission denied</code>.</p>
      <p><strong>The Problem:</strong> The <strong>Mount / User ID Rule</strong>.</p>
      <p><strong>The Solution:</strong> The User ID inside the container doesn't match the Owner of the file on your host machine.</p>
      <p><strong>The Fix:</strong> Ensure the User ID (UID) inside the container matches the UID on the host.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-shield-slash"></i></div>
      <h3 class="doc-sub-card-title">Case Study 6: The "Ghost" Connection</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You have a Frontend container and a Backend container running on the same server. You try to <code>ping backend</code> from the frontend, but it says "Destination Host Unreachable."</p>
      <p><strong>The Problem:</strong> The <strong>Namespace / Networking Rule</strong>.</p>
      <p><strong>The Solution:</strong> By default, containers are isolated in their own "Magic Blinders." They cannot see or talk to each other unless they are explicitly invited to the same <strong>Docker Network</strong>.</p>
      <p><strong>The Fix:</strong> Create a user-defined network (<code>docker network create my-net</code>) and join both containers to it.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-boxes"></i></div>
      <h3 class="doc-sub-card-title">Case Study 7: The "Mismatched" Ship</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> Your developer builds an image on their shiny New MacBook (M4 chip). You push it to the production server (Intel Xeon). The container refuses to start, saying <code>exec format error</code>.</p>
      <p><strong>The Problem:</strong> The <strong>Architecture Rule</strong>.</p>
      <p><strong>The Solution:</strong> Docker images are not magic—they contain binaries compiled for a specific CPU language (ARM vs. x86). The Intel server can't read the ARM "language" built on the Mac.</p>
      <p><strong>The Fix:</strong> Use <code>docker buildx build --platform linux/amd64</code> to build the correct version for your server.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header">
      <div class="doc-sub-card-icon"><i class="bi bi-file-earmark-lock2-fill"></i></div>
      <h3 class="doc-sub-card-title">Case Study 8: The "Security Leak"</h3>
    </div>
    <div class="doc-sub-card-body">
      <p><strong>The Scenario:</strong> You are building a Private App. You <code>COPY</code> an SSH key into the image to download private code, then <code>rm</code> the key at the end of the Dockerfile. A security auditor tells you they can still find your SSH key in the image.</p>
      <p><strong>The Problem:</strong> The <strong>Immutability / Multi-Stage Rule</strong>.</p>
      <p><strong>The Solution:</strong> Just like the "Bloated Image," the key was baked into an early layer. Your <code>rm</code> command only hid it. Anyone with a tool like <code>dive</code> can look into the old layers and steal your key.</p>
      <p><strong>The Fix:</strong> Use <strong>Multi-Stage Build</strong>. Download the code in Stage 1, and only copy the <em>software</em> to Stage 2. The SSH key stays in the messy kitchen (Stage 1) and never makes it to the plate.</p>
    </div>
  </div>
</div>`,
                        order: 6,
                    },
                ],
            },
        },
    });

    // 7. Installation
    const pInstall = await prisma.page.create({
        data: {
            title: "Installing Docker",
            slug: "/installation",
            description: "Step-by-step guide to install Docker on your machine.",
            components: {
                create: [
                    { type: "heading", heading: "Prerequisites", icon: "bi-clipboard-check-fill", content: "", order: 1 },
                    { type: "paragraph", content: "<p>Before installing, ensure your OS is 64-bit and you have at least 4GB of RAM.</p>", order: 2 },
                    { type: "heading", heading: "Ubuntu/Debian", icon: "bi-terminal-fill", content: "", order: 3 },
                    { type: "code", content: `sudo apt-get update\nsudo apt-get install docker-ce docker-ce-cli containerd.io`, language: "bash", order: 4 },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — COMMANDS
    // =========================================================================

    // ── Common Linux Commands ──────────────────────────────────────────────────
    const pCommonLinuxCommands = await prisma.page.create({
        data: {
            title: "Common Linux Commands (Debian-Based)",
            slug: "/common-linux-commands",
            description: "Essential Linux commands for Docker developers - covers file operations, navigation, permissions, processes, and more on Debian/Ubuntu systems.",
            components: {
                create: [
                    {
                        type: "heading",
                        heading: "Common Linux Commands",
                        icon: "bi-terminal-fill",
                        content: "<p>Master these essential Debian/Ubuntu commands to work efficiently in Docker containers and Linux environments. Each command is shown with its technical purpose, a beginner-friendly example, and all parameter meanings.</p>",
                        order: 1,
                    },
                    {
                        type: "paragraph",
                        content: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-list-ul"></i></div><h3 class="doc-sub-card-title"><code>ls</code> — List Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>ls [OPTIONS] [DIRECTORY]</code>
      <pre class="doc-code-block"><code class="language-bash">ls -l
ls -la /home
ls -lh --sort=size</code></pre>
      <p><strong>What it does:</strong> Shows all files and folders in the current directory.</p>
      <p><strong>Noob Example:</strong> <code>ls</code> is like opening a file explorer window and seeing what's inside a folder.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-l</code> — Long format (shows permissions, size, date)</li>
      <li><code>-a</code> — Show hidden files (starting with .)</li>
      <li><code>-h</code> — Human-readable sizes (KB, MB instead of bytes)</li>
      <li><code>-r</code> — Reverse sort order</li>
      <li><code>-S</code> — Sort by file size</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-arrow-right-circle"></i></div><h3 class="doc-sub-card-title"><code>cd</code> — Change Directory</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>cd [DIRECTORY]</code>
      <pre class="doc-code-block"><code class="language-bash">cd /home/user
cd ~
cd ..</code></pre>
      <p><strong>What it does:</strong> Moves you to a different folder.</p>
      <p><strong>Noob Example:</strong> <code>cd Desktop</code> is like double-clicking a folder to open it.</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>cd /home/user</code> — Go to absolute path</li>
      <li><code>cd ~</code> — Go to home directory</li>
      <li><code>cd ..</code> — Go up one folder</li>
      <li><code>cd -</code> — Go back to previous folder</li>
      <li><code>cd</code> — Jump to home (same as cd ~)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-geo"></i></div><h3 class="doc-sub-card-title"><code>pwd</code> — Print Working Directory</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>pwd [OPTIONS]</code>
      <pre class="doc-code-block"><code class="language-bash">pwd
pwd -P</code></pre>
      <p><strong>What it does:</strong> Shows the full path of the folder you're currently in.</p>
      <p><strong>Noob Example:</strong> <code>pwd</code> is like asking "Where am I right now?" and the system tells you the full address.</p>
      <p><strong>Output:</strong> <code>/home/user/projects/docker-app</code></p>
      <p><strong>Note:</strong> This command has no flags. It just works!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-folder-plus"></i></div><h3 class="doc-sub-card-title"><code>mkdir</code> — Make Directory</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>mkdir [OPTIONS] DIRECTORY</code>
      <pre class="doc-code-block"><code class="language-bash">mkdir my-project
mkdir -p /home/user/a/b/c
mkdir -m 755 my-folder</code></pre>
      <p><strong>What it does:</strong> Creates a new folder.</p>
      <p><strong>Noob Example:</strong> <code>mkdir my-project</code> is like right-clicking and selecting "New Folder" → "my-project".</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-p</code> — Create nested folders (e.g., <code>mkdir -p a/b/c</code> creates all three)</li>
      <li><code>-m 755</code> — Set folder permissions during creation</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-files"></i></div><h3 class="doc-sub-card-title"><code>cp</code> — Copy Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>cp [OPTIONS] SOURCE DEST</code>
      <pre class="doc-code-block"><code class="language-bash">cp file.txt backup.txt
cp -r folder/ backup-folder/
cp -v *.txt ~/backup</code></pre>
      <p><strong>What it does:</strong> Copies a file or folder to another location.</p>
      <p><strong>Noob Example:</strong> <code>cp file.txt backup.txt</code> is like using Ctrl+C and Ctrl+V to duplicate a file.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-r</code> — Copy entire folders (recursive)</li>
      <li><code>-i</code> — Ask before overwriting (interactive)</li>
      <li><code>-v</code> — Show what's being copied (verbose)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-arrow-lr"></i></div><h3 class="doc-sub-card-title"><code>mv</code> — Move/Rename Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>mv [OPTIONS] SOURCE DEST</code>
      <pre class="doc-code-block"><code class="language-bash">mv old-name.txt new-name.txt
mv file.txt ~/Documents/
mv -i file.txt Desktop</code></pre>
      <p><strong>What it does:</strong> Moves a file to a new location OR renames it.</p>
      <p><strong>Noob Example:</strong> <code>mv old-name.txt new-name.txt</code> renames the file, just like right-clicking "Rename".</p>
      <p><strong>Examples:</strong></p>
      <ul><li><code>mv file.txt ~/Documents</code> — Move to Documents folder</li>
      <li><code>mv old.log logs/</code> — Move file into logs folder</li>
      <li><code>mv -i file.txt Desktop/</code> — Ask before overwriting</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-trash"></i></div><h3 class="doc-sub-card-title"><code>rm</code> — Remove Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>rm [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">rm unwanted-file.txt
rm -r folder/
rm -i important.txt
rm -f *.log</code></pre>
      <p><strong>What it does:</strong> Deletes a file permanently (no trash bin!).</p>
      <p><strong>Noob Example:</strong> <code>rm unwanted-file.txt</code> is like throwing a file in the trash (but it's GONE forever, not in a recycle bin).</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-r</code> — Delete entire folders and contents</li>
      <li><code>-i</code> — Ask for confirmation before deleting</li>
      <li><code>-f</code> — Force delete (don't ask)</li>
      <li><code>-v</code> — Show what's being deleted</li></ul>
      <p><strong>⚠️ WARNING:</strong> <code>rm</code> is permanent! There's no undo. Always be careful!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-file-text"></i></div><h3 class="doc-sub-card-title"><code>cat</code> — View/Combine Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>cat [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">cat README.md
cat -n file.txt
cat file1.txt file2.txt > combined.txt</code></pre>
      <p><strong>What it does:</strong> Display the full content of a text file on the screen.</p>
      <p><strong>Noob Example:</strong> <code>cat README.md</code> is like double-clicking a text file to read it, but in the terminal.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-n</code> — Show line numbers</li>
      <li><code>-b</code> — Number only non-empty lines</li>
      <li><code>-s</code> — Squeeze empty lines</li></ul>
      <p><strong>Bonus:</strong> <code>cat file1.txt file2.txt > combined.txt</code> — Join multiple files!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-search"></i></div><h3 class="doc-sub-card-title"><code>grep</code> — Search Text</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>grep [OPTIONS] PATTERN FILE</code>
      <pre class="doc-code-block"><code class="language-bash">grep "ERROR" logfile.log
grep -i "error" file.txt
grep -r "pattern" folder/
grep -c "text" file.txt</code></pre>
      <p><strong>What it does:</strong> Searches for specific text in a file and shows matching lines.</p>
      <p><strong>Noob Example:</strong> <code>grep "ERROR" logfile.log</code> is like using Ctrl+F to find all lines with "ERROR".</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-i</code> — Case-insensitive search</li>
      <li><code>-c</code> — Count matching lines</li>
      <li><code>-n</code> — Show line numbers</li>
      <li><code>-v</code> — Show lines that DON'T match</li>
      <li><code>-r</code> — Search all files in folder (recursive)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-binoculars"></i></div><h3 class="doc-sub-card-title"><code>find</code> — Find Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>find [PATH] [OPTIONS]</code>
      <pre class="doc-code-block"><code class="language-bash">find . -name "*.log"
find /home -type f -size +10M
find . -mtime -7
find ~ -name "Dockerfile" -type f</code></pre>
      <p><strong>What it does:</strong> Searches for files by name, size, date, or other properties.</p>
      <p><strong>Noob Example:</strong> <code>find . -name "*.log"</code> is like using File Explorer's search to find all .log files.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-name</code> — Search by filename</li>
      <li><code>-type f</code> — Find only files (not folders)</li>
      <li><code>-type d</code> — Find only directories</li>
      <li><code>-size +10M</code> — Find files larger than 10MB</li>
      <li><code>-mtime -7</code> — Files modified in last 7 days</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-shield-lock"></i></div><h3 class="doc-sub-card-title"><code>chmod</code> — Change Permissions</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>chmod [OPTIONS] MODE FILE</code>
      <pre class="doc-code-block"><code class="language-bash">chmod +x script.sh
chmod 755 script.sh
chmod -w file.txt
chmod 644 config.ini</code></pre>
      <p><strong>What it does:</strong> Changes who can read, write, or execute a file.</p>
      <p><strong>Noob Example:</strong> <code>chmod +x script.sh</code> makes a script executable (like changing "Read-only" to "Edit allowed").</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>chmod +x file</code> — Make executable</li>
      <li><code>chmod -w file</code> — Remove write permission</li>
      <li><code>chmod 755 file</code> — Owner can do all, others can read+execute</li>
      <li><code>chmod 644 file</code> — Owner can read+write, others read-only</li></ul>
      <p><strong>Permissions: 7=rwx, 5=r-x, 4=r--</strong></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-lightning-charge"></i></div><h3 class="doc-sub-card-title"><code>sudo</code> — Super User Do</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>sudo [OPTIONS] COMMAND</code>
      <pre class="doc-code-block"><code class="language-bash">sudo apt-get install curl
sudo systemctl start docker
sudo su
sudo -l</code></pre>
      <p><strong>What it does:</strong> Run a command with administrator (root) privileges.</p>
      <p><strong>Noob Example:</strong> <code>sudo apt-get install curl</code> installs software (needs admin permission, so we use sudo).</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>sudo command</code> — Run single command as root</li>
      <li><code>sudo su</code> — Become root user permanently</li>
      <li><code>sudo -l</code> — List what you can run as sudo</li></ul>
      <p><strong>⚠️ WARNING:</strong> sudo can delete everything or brick your system. Only use when necessary!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-box-arrow-in-down"></i></div><h3 class="doc-sub-card-title"><code>apt / apt-get</code> — Package Manager</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>apt [COMMAND]</code>
      <pre class="doc-code-block"><code class="language-bash">apt install curl
apt update
apt list --upgradable
apt search python3
apt remove curl</code></pre>
      <p><strong>What it does:</strong> Install, update, or remove software packages on Ubuntu/Debian.</p>
      <p><strong>Noob Example:</strong> <code>apt install curl</code> is like clicking "Install" in an app store, but for Linux command-line tools.</p>
      <p><strong>Common Commands:</strong></p>
      <ul><li><code>apt update</code> — Check for available updates</li>
      <li><code>apt list --upgradable</code> — See which packages need updates</li>
      <li><code>apt upgrade</code> — Install updates</li>
      <li><code>apt search curl</code> — Search for a package</li>
      <li><code>apt remove curl</code> — Uninstall a package</li></ul>
      <p><strong>Note:</strong> Requires sudo for most operations.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-cloud-arrow-down"></i></div><h3 class="doc-sub-card-title"><code>curl</code> — Download Data</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>curl [OPTIONS] URL</code>
      <pre class="doc-code-block"><code class="language-bash">curl https://example.com
curl -o filename.html https://example.com
curl -X POST -d "key=value" https://api.example.com
curl -H "Authorization: Bearer TOKEN" https://api.example.com</code></pre>
      <p><strong>What it does:</strong> Download files or send web requests (GET, POST, etc.).</p>
      <p><strong>Noob Example:</strong> <code>curl https://example.com</code> is like typing a URL in your browser and seeing the HTML.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-o filename</code> — Save to a specific file</li>
      <li><code>-O</code> — Save with original filename</li>
      <li><code>-X POST</code> — Send POST request (not just GET)</li>
      <li><code>-d "key=value"</code> — Send data in request</li>
      <li><code>-H "Header: value"</code> — Add custom header</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-cloud-download"></i></div><h3 class="doc-sub-card-title"><code>wget</code> — Download Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>wget [OPTIONS] URL</code>
      <pre class="doc-code-block"><code class="language-bash">wget https://example.com/file.zip
wget -O myfile.html https://example.com/page
wget -c https://example.com/largefile.iso
wget -r https://example.com/</code></pre>
      <p><strong>What it does:</strong> Download files from the internet (simpler than curl for basic downloads).</p>
      <p><strong>Noob Example:</strong> <code>wget https://example.com/file.zip</code> downloads the ZIP file to your current folder.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-O filename</code> — Save to a specific filename</li>
      <li><code>-q</code> — Quiet mode (no output)</li>
      <li><code>-c</code> — Resume incomplete download</li>
      <li><code>-r</code> — Recursively download (useful for websites)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-archive"></i></div><h3 class="doc-sub-card-title"><code>tar</code> — Archive Files</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>tar [OPTIONS] -f ARCHIVE DIRECTORY</code>
      <pre class="doc-code-block"><code class="language-bash">tar -czf backup.tar.gz my-folder
tar -xzf backup.tar.gz
tar -tf archive.tar.gz
tar -cf mybackup.tar folder/</code></pre>
      <p><strong>What it does:</strong> Bundle multiple files into one archive (like ZIP on Windows).</p>
      <p><strong>Noob Example:</strong> <code>tar -czf archive.tar.gz my-folder</code> is like selecting files, right-clicking "Compress to archive.zip".</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-c</code> — Create archive</li>
      <li><code>-x</code> — Extract archive</li>
      <li><code>-z</code> — Use gzip compression (smaller size)</li>
      <li><code>-f</code> — Specify filename</li>
      <li><code>-v</code> — Verbose (show progress)</li></ul>
      <p><strong>Examples:</strong> <code>tar -czf backup.tar.gz /home/user</code> | <code>tar -xzf backup.tar.gz</code></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-pencil"></i></div><h3 class="doc-sub-card-title"><code>nano</code> — Text Editor</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>nano [FILE]</code>
      <pre class="doc-code-block"><code class="language-bash">nano myfile.txt
nano ~/.bashrc
nano /etc/hostname</code></pre>
      <p><strong>What it does:</strong> Open a simple text editor to create/edit files.</p>
      <p><strong>Noob Example:</strong> <code>nano myfile.txt</code> is like opening Notepad to edit a file.</p>
      <p><strong>Basic Shortcuts (inside nano):</strong></p>
      <ul><li><code>Ctrl+O</code> — Save file</li>
      <li><code>Ctrl+X</code> — Exit nano</li>
      <li><code>Ctrl+W</code> — Search for text</li>
      <li><code>Ctrl+K</code> — Cut entire line</li></ul>
      <p><strong>Alternative:</strong> <code>vi</code> or <code>vim</code> (harder but powerful)</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-activity"></i></div><h3 class="doc-sub-card-title"><code>ps</code> — Process Status</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>ps [OPTIONS]</code>
      <pre class="doc-code-block"><code class="language-bash">ps
ps aux
ps -e
ps -u username
ps -ef | grep python</code></pre>
      <p><strong>What it does:</strong> List all running processes (programs) on your system.</p>
      <p><strong>Noob Example:</strong> <code>ps</code> is like opening Task Manager to see what programs are running.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>ps aux</code> — Show ALL processes with details</li>
      <li><code>ps -e</code> — Every process running</li>
      <li><code>ps -u username</code> — Processes by specific user</li>
      <li><code>ps -ef | grep python</code> — Find Python processes</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-bar-chart"></i></div><h3 class="doc-sub-card-title"><code>top</code> — Monitor System</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>top [OPTIONS]</code>
      <pre class="doc-code-block"><code class="language-bash">top
top -u username
top -b -n 1</code></pre>
      <p><strong>What it does:</strong> Real-time view of CPU, RAM, and all running processes (like Task Manager on Windows).</p>
      <p><strong>Noob Example:</strong> <code>top</code> shows which programs are using the most CPU/RAM RIGHT NOW.</p>
      <p><strong>Useful Keys (inside top):</strong></p>
      <ul><li><code>q</code> — Quit</li>
      <li><code>k</code> — Kill a process</li>
      <li><code>M</code> — Sort by memory usage</li>
      <li><code>P</code> — Sort by CPU usage</li></ul>
      <p><strong>Alternative:</strong> <code>htop</code> (prettier, easier to use)</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-x-octagon"></i></div><h3 class="doc-sub-card-title"><code>kill</code> — Terminate Process</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>kill [OPTIONS] PID</code>
      <pre class="doc-code-block"><code class="language-bash">kill 1234
kill -9 1234
killall process-name
kill -TERM 1234</code></pre>
      <p><strong>What it does:</strong> Force-stop a running program by its Process ID (PID).</p>
      <p><strong>Noob Example:</strong> <code>kill 1234</code> is like force-closing a frozen application.</p>
      <p><strong>Common Signals:</strong></p>
      <ul><li><code>kill PID</code> — Gentle shutdown (SIGTERM)</li>
      <li><code>kill -9 PID</code> — Forced kill (SIGKILL, no mercy)</li>
      <li><code>killall process-name</code> — Kill all processes with that name</li></ul>
      <p><strong>Finding PID:</strong> <code>ps aux | grep process-name</code></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-arrow-bar-down"></i></div><h3 class="doc-sub-card-title"><code>tail</code> — View End of File</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>tail [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">tail logfile.log
tail -n 50 logfile.log
tail -f logfile.log
tail -q file1.txt file2.txt</code></pre>
      <p><strong>What it does:</strong> Show the last lines of a file (opposite of head).</p>
      <p><strong>Noob Example:</strong> <code>tail -20 logfile.log</code> shows only the last 20 lines (useful for logs).</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-n 50</code> — Show last 50 lines</li>
      <li><code>-f</code> — Follow (watch file in real-time as it updates)</li>
      <li><code>-q</code> — Quiet (no filename header)</li></ul>
      <p><strong>Bonus:</strong> <code>tail -f logfile.log</code> is perfect for watching Docker container logs!</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-arrow-bar-up"></i></div><h3 class="doc-sub-card-title"><code>head</code> — View Start of File</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>head [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">head README.md
head -n 20 file.txt
head -c 100 largefile.bin
head -q file1.txt file2.txt</code></pre>
      <p><strong>Full Syntax:</strong></p>
      <code>wc [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">wc file.txt
wc -l file.txt
wc -w file.txt
wc -c file.txt
grep "ERROR" logfile.log | wc -l</code></pre>
      <p><strong>What it does:</strong> Show the first lines of a file.</p>
      <p><strong>Noob Example:</strong> <code>head -10 README.md</code> shows just the first 10 lines.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-n 20</code> — Show first 20 lines</li>
      <li><code>-c 100</code> — Show first 100 bytes (characters)</li>
      <li><code>-q</code> — Quiet (no filename header)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-calculator"></i></div><h3 class="doc-sub-card-title"><code>wc</code> — Word Count</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Count lines, words, or characters in a file.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>sort [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">sort names.txt
sort -r names.txt
sort -n numbers.txt
sort -u file.txt
sort -k 2 data.txt</code></pre>
      <p><strong>Noob Example:</strong> <code>wc -l file.txt</code> tells you how many lines are in the file.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-l</code> — Count lines only</li>
      <li><code>-w</code> — Count words only</li>
      <li><code>-c</code> — Count bytes/characters</li></ul>
      <p><strong>Example:</strong> <code>grep "ERROR" logfile.log | wc -l</code> counts how many ERROR lines exist</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-arrow-down-up"></i></div><h3 class="doc-sub-card-title"><code>sort</code> — Sort Lines</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Sort lines in a file alphabetically or numerically.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>uniq [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">uniq file.txt
uniq -c file.txt
uniq -d file.txt
sort file.txt | uniq</code></pre>
      <p><strong>Noob Example:</strong> <code>sort names.txt</code> arranges all names in alphabetical order.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-r</code> — Reverse order (Z to A)</li>
      <li><code>-n</code> — Sort numerically</li>
      <li><code>-u</code> — Remove duplicates (unique)</li>
      <li><code>-k 2</code> — Sort by column 2</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-diagram-2"></i></div><h3 class="doc-sub-card-title"><code>uniq</code> — Unique Lines</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Remove duplicate consecutive lines from a file.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>echo [OPTIONS] TEXT</code>
      <pre class="doc-code-block"><code class="language-bash">echo "Hello, World!"
echo $HOME
echo "text" > file.txt
echo -e "Line1\nLine2"</code></pre>
      <p><strong>Noob Example:</strong> If a file has the same word repeated 5 times in a row, uniq removes the duplicates.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-c</code> — Count occurrences of each line</li>
      <li><code>-d</code> — Show only duplicated lines</li>
      <li><code>-u</code> — Show only unique lines</li></ul>
      <p><strong>Note:</strong> uniq only removes CONSECUTIVE duplicates. Sort first: <code>sort file | uniq</code></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-chat-left-quote"></i></div><h3 class="doc-sub-card-title"><code>echo</code> — Print Text</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Display text on the screen.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>export [NAME=VALUE]</code>
      <pre class="doc-code-block"><code class="language-bash">export API_KEY="secret123"
export PATH=$PATH:/usr/local/bin
export -p
echo $API_KEY</code></pre>
      <p><strong>Noob Example:</strong> <code>echo "Hello, World!"</code> prints "Hello, World!"</p>
      <p><strong>Common Uses:</strong></p>
      <ul><li><code>echo $HOME</code> — Print home directory path</li>
      <li><code>echo "text" > file.txt</code> — Write text to a file</li>
      <li><code>echo "text" >> file.txt</code> — Append text to a file</li>
      <li><code>echo -e "Line1\nLine2"</code> — Use escape sequences like \n for newline</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-gear"></i></div><h3 class="doc-sub-card-title"><code>export</code> — Set Environment Variables</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Create environment variables that programs can access.</p>
      <p><strong>Noob Example:</strong> <code>export API_KEY="secret123"</code> creates a variable that stays available while you're in that terminal.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>nohup COMMAND [ARGS] &</code>
      <pre class="doc-code-block"><code class="language-bash">nohup python app.py &
nohup ./script.sh > output.log 2>&1 &
nohup npm start > server.log &</code></pre>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>export VAR_NAME=value</code> — Set a variable</li>
      <li><code>echo $VAR_NAME</code> — See the value</li>
      <li><code>env</code> — List all environment variables</li>
      <li><code>export -p</code> — Show all exported variables</li></ul>
      <p><strong>Pro Tip:</strong> Add to ~/.bashrc to make it permanent</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-share"></i></div><h3 class="doc-sub-card-title"><code>nohup</code> — Run in Background</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>nohup COMMAND [ARGS] &</code>
      <pre class="doc-code-block"><code class="language-bash">nohup python app.py &
nohup ./script.sh > output.log 2>&1 &
nohup npm start > server.log &</code></pre>
      <p><strong>What it does:</strong> Run a program that continues even if you close the terminal.</p>
      <p><strong>Noob Example:</strong> <code>nohup python app.py &</code> starts your app and lets you close the terminal without stopping it.</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>nohup command</code> — Run in background</li>
      <li><code>nohup command > output.log 2>&1 &</code> — Capture all output to a file</li></ul>
      <p><strong>Output:</strong> Creates "nohup.out" file with all output</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-power"></i></div><h3 class="doc-sub-card-title"><code>systemctl</code> — Manage Services</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>systemctl [COMMAND] SERVICE</code>
      <pre class="doc-code-block"><code class="language-bash">sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker
sudo systemctl status docker
sudo systemctl enable docker</code></pre>
      <p><strong>What it does:</strong> Start, stop, or manage system services (like Apache web server, Docker daemon, etc.).</p>
      <p><strong>Noob Example:</strong> <code>systemctl start docker</code> starts the Docker service.</p>
      <p><strong>Common Commands:</strong></p>
      <ul><li><code>systemctl start service-name</code> — Start a service</li>
      <li><code>systemctl stop service-name</code> — Stop a service</li>
      <li><code>systemctl restart service-name</code> — Restart a service</li>
      <li><code>systemctl status service-name</code> — Check if running</li>
      <li><code>systemctl enable service-name</code> — Auto-start on boot</li></ul>
      <p><strong>Note:</strong> Most commands require sudo</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-pipe"></i></div><h3 class="doc-sub-card-title">Pipes <code>|</code> — Connect Commands</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>COMMAND1 | COMMAND2</code>
      <pre class="doc-code-block"><code class="language-bash">grep "ERROR" logfile.log | wc -l
cat file.txt | grep "pattern" | sort | uniq
ps aux | grep python
find . -name "*.log" | xargs rm</code></pre>
      <p><strong>What it does:</strong> Send output from one command as input to another.</p>
      <p><strong>Noob Example:</strong> <code>grep "ERROR" logfile.log | wc -l</code> finds all ERROR lines, then counts them.</p>
      <p><strong>Common Patterns:</strong></p>
      <ul><li><code>command1 | command2</code> — Pipe output to another command</li>
      <li><code>command > file.txt</code> — Save output to file</li>
      <li><code>command >> file.txt</code> — Append output to file</li>
      <li><code>command < file.txt</code> — Use file as input</li></ul>
      <p><strong>Power User Tip:</strong> Chain multiple commands: <code>cat file.txt | grep "pattern" | sort | uniq</code></p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-crosshair"></i></div><h3 class="doc-sub-card-title"><code>which</code> — Locate Executable</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>which [OPTIONS] COMMAND</code>
      <pre class="doc-code-block"><code class="language-bash">which python
which docker
which -a python
which ls</code></pre>
      <p><strong>What it does:</strong> Find the full path to a command or executable in your PATH environment variable.</p>
      <p><strong>Noob Example:</strong> <code>which docker</code> tells you exactly where the docker application is installed (usually /usr/bin/docker).</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-a</code> — Show ALL matches (sometimes a command appears in multiple locations)</li></ul>
      <p><strong>Tip:</strong> Use <code>which -a python</code> to see if you have multiple Python installations on your system</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-geo-alt"></i></div><h3 class="doc-sub-card-title"><code>whereis</code> — Locate Command Sources</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>whereis [OPTIONS] COMMAND</code>
      <pre class="doc-code-block"><code class="language-bash">whereis docker
whereis python
whereis -b docker
whereis -m man
whereis -s docker</code></pre>
      <p><strong>What it does:</strong> Find the binary, source code, and manual page for a command (more comprehensive than <code>which</code>).</p>
      <p><strong>Noob Example:</strong> <code>whereis docker</code> shows not just where docker executable is, but also where its manual pages are stored.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-b</code> — Search only for the binary</li>
      <li><code>-m</code> — Search only for manual pages</li>
      <li><code>-s</code> — Search only for source files</li></ul>
      <p><strong>Difference from which:</strong> <code>which</code> is simpler and only shows the executable path, <code>whereis</code> shows binaries, sources, and docs</p>
    </div>
  </div>
</div>`,
                        order: 2,
                    },
                ],
            },
        },
    });

    // ── docker run ────────────────────────────────────────────────────────────
    const pRun = await prisma.page.create({
        data: {
            title: "docker run",
            slug: "/commands/run",
            description: "Create and start a container from an image in a single step.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker run</code> is the most common Docker command. It does two things at once: it <strong>creates</strong> a brand new container from an image, then immediately <strong>starts</strong> it.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Think of a Docker image like a video game disc. <code>docker run</code> is you putting that disc into your console and pressing Play — the game (container) starts running instantly. If you press Play again, a second, completely separate game session starts. Each session is its own world.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Run the official "hello-world" image — the simplest possible test\ndocker run hello-world`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>A real-world scenario: run an Nginx web server in the background, map port 8080 on your machine to port 80 inside the container, and give it a name so you can reference it later.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `docker run -d -p 8080:80 --name my-nginx nginx:alpine`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "paragraph",
                        content: "<p>After running this, opening <code>http://localhost:8080</code> in your browser will show the Nginx welcome page.</p>",
                        order: 70,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 80,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "-d / --detach", type: "Flag", description: "Run the container in the background (detached mode). You get your terminal prompt back immediately." },
                            { flag: "-p HOST:CONTAINER", type: "Option", description: "Publish a port. Maps a port on your machine (HOST) to a port inside the container (CONTAINER)." },
                            { flag: "--name NAME", type: "Option", description: "Assign a human-readable name to the container instead of a random one." },
                            { flag: "-e KEY=VALUE", type: "Option", description: "Set an environment variable inside the container." },
                            { flag: "-v HOST_PATH:CONTAINER_PATH", type: "Option", description: "Mount a volume. Binds a folder on your machine into the container's filesystem." },
                            { flag: "--rm", type: "Flag", description: "Automatically remove the container when it exits. Keeps things clean." },
                            { flag: "-it", type: "Flag", description: "Attach an interactive terminal (-i keeps stdin open, -t allocates a pseudo-TTY). Used when you want a shell inside the container." },
                            { flag: "--network NETWORK", type: "Option", description: "Connect the container to a specific Docker network." },
                            { flag: "IMAGE", type: "Argument", description: "The name (and optional tag) of the image to run, e.g. nginx:alpine or ubuntu:22.04." },
                            { flag: "COMMAND", type: "Argument", description: "Override the default command the container runs on startup." },
                        ]),
                        order: 90,
                    },
                ],
            },
        },
    });

    // ── docker build ──────────────────────────────────────────────────────────
    const pBuild = await prisma.page.create({
        data: {
            title: "docker build",
            slug: "/commands/build",
            description: "Build a Docker image from a Dockerfile.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker build [OPTIONS] PATH | URL</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker build</code> reads a <code>Dockerfile</code> and executes each instruction in it to produce a reusable, shareable <strong>image</strong>. The image is stored locally and can later be run as a container or pushed to a registry.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>If an Image is a frozen meal, then a <code>Dockerfile</code> is the recipe card, and <code>docker build</code> is the chef who follows that recipe and produces the frozen meal. Once the chef is done, you have a meal (image) you can give to anyone.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Build an image and tag it as "my-app:latest"\n# The dot (.) means "look for a Dockerfile in the current directory"\ndocker build -t my-app:latest .`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Build a production image from a Dockerfile that lives in a subfolder, without including development files, using a build argument to embed the app version.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Build from a specific Dockerfile in a subdirectory\n# Pass a build-time argument and tag the resulting image\ndocker build \\\n  -f ./docker/Dockerfile.prod \\\n  --build-arg APP_VERSION=2.1.0 \\\n  -t my-org/my-app:2.1.0 \\\n  .`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "-t / --tag NAME:TAG", type: "Option", description: "Name and tag the resulting image. You can use -t multiple times to apply multiple tags." },
                            { flag: "-f / --file PATH", type: "Option", description: "Path to the Dockerfile. Defaults to ./Dockerfile in the build context." },
                            { flag: "--build-arg KEY=VALUE", type: "Option", description: "Pass a build-time variable that the Dockerfile can access with the ARG instruction." },
                            { flag: "--no-cache", type: "Flag", description: "Ignore layer cache and rebuild every step from scratch." },
                            { flag: "--target STAGE", type: "Option", description: "For multi-stage builds: stop building at a specific stage instead of building the final stage." },
                            { flag: "--platform", type: "Option", description: "Specify the target platform, e.g. linux/amd64 or linux/arm64." },
                            { flag: "PATH", type: "Argument", description: "The build context. Docker sends all files in this directory to the daemon. Use . for the current directory." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker pull ───────────────────────────────────────────────────────────
    const pPull = await prisma.page.create({
        data: {
            title: "docker pull",
            slug: "/commands/pull",
            description: "Download an image from a container registry to your local machine.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker pull [OPTIONS] NAME[:TAG|@DIGEST]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker pull</code> downloads an image from a registry (Docker Hub by default) to your local machine. If you do not specify a tag, Docker pulls the <code>latest</code> tag.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Think of Docker Hub like an App Store for server software. <code>docker pull</code> is you tapping the Download button. Once downloaded, the app (image) lives on your phone (machine) and you can launch it anytime without re-downloading it.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Download the official Ubuntu 22.04 image\ndocker pull ubuntu:22.04`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Pull a specific image by digest (a cryptographic hash) to guarantee you get an exact, immutable version — no surprises from a floating <code>latest</code> tag.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Pull a private image from a custom registry\ndocker pull registry.mycompany.com/backend-api:v3.4.1\n\n# Pull by digest for total reproducibility\ndocker pull nginx@sha256:a5e4a503d9f93bce98e5f316eca7c84a89e01e0d75e5b5d1c9e2de1b63cdb1f4`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "NAME", type: "Argument", description: "The image name, e.g. nginx or ubuntu. Defaults to Docker Hub if no registry is specified." },
                            { flag: ":TAG", type: "Argument", description: "Optional version tag, e.g. :22.04 or :alpine. Defaults to :latest if omitted." },
                            { flag: "@DIGEST", type: "Argument", description: "Pull by exact SHA-256 digest instead of a tag, guaranteeing reproducibility." },
                            { flag: "--all-tags / -a", type: "Flag", description: "Download all tagged versions of the image from the registry." },
                            { flag: "--platform", type: "Option", description: "Pull an image for a specific OS/architecture, e.g. linux/arm64." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker push ───────────────────────────────────────────────────────────
    const pPush = await prisma.page.create({
        data: {
            title: "docker push",
            slug: "/commands/push",
            description: "Upload a local image to a container registry to share it with others.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker push [OPTIONS] NAME[:TAG]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker push</code> is the opposite of <code>docker pull</code>. It uploads a locally built image to a registry so others (or your CI/CD pipeline) can pull and run it.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>You baked a cake (built an image). <code>docker push</code> is mailing that cake to a shared pantry (the registry). Anyone who has the address of that pantry can later grab a copy of your cake using <code>docker pull</code>.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# First, log in to Docker Hub (one-time setup)\ndocker login\n\n# Tag your image with your Docker Hub username\ndocker tag my-app:latest yourusername/my-app:latest\n\n# Push it\ndocker push yourusername/my-app:latest`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>In a CI/CD pipeline, after building and testing, push the image with both a version tag and <code>latest</code> so downstream services always pull the most recent stable build.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Authenticate with a private registry using environment variables\necho "$REGISTRY_PASSWORD" | docker login registry.mycompany.com -u "$REGISTRY_USER" --password-stdin\n\n# Push with two tags simultaneously\ndocker push registry.mycompany.com/backend-api:v3.4.1\ndocker push registry.mycompany.com/backend-api:latest`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "NAME[:TAG]", type: "Argument", description: "The full image name including registry, repository, and tag, e.g. registry.io/org/app:1.0." },
                            { flag: "--all-tags / -a", type: "Flag", description: "Push all locally tagged versions of this image to the registry at once." },
                            { flag: "--quiet / -q", type: "Flag", description: "Suppress verbose push progress output." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker ps ─────────────────────────────────────────────────────────────
    const pPs = await prisma.page.create({
        data: {
            title: "docker ps",
            slug: "/commands/ps",
            description: "List containers — running by default, all with the -a flag.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker ps [OPTIONS]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker ps</code> shows a table of your containers. By default it only shows <strong>running</strong> containers. The output includes Container ID, the image it came from, the command it is running, when it was created, its status, ports, and names.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Think of <code>docker ps</code> as the Task Manager (Windows) or Activity Monitor (Mac) for your containers. It shows you which ones are alive and running right now.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Show only running containers\ndocker ps\n\n# Show ALL containers, including stopped ones\ndocker ps -a`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Extract just the container IDs of all stopped containers and pipe them to <code>docker rm</code> for bulk cleanup.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Filter to show only exited containers\ndocker ps -a --filter "status=exited"\n\n# Get just the IDs (quiet mode) and remove all stopped containers\ndocker rm $(docker ps -aq --filter "status=exited")`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "-a / --all", type: "Flag", description: "Show all containers, not just running ones. Includes stopped, exited, and created containers." },
                            { flag: "-q / --quiet", type: "Flag", description: "Print only container IDs. Useful for scripting and piping into other commands." },
                            { flag: "--filter KEY=VALUE", type: "Option", description: "Filter output by a condition. Common keys: status (running, exited), name, label, ancestor." },
                            { flag: "--format STRING", type: "Option", description: "Pretty-print containers using a Go template, e.g. --format '{{.Names}}\\t{{.Status}}'." },
                            { flag: "-n N / --last N", type: "Option", description: "Show only the last N created containers (regardless of status)." },
                            { flag: "-s / --size", type: "Flag", description: "Display the total file sizes used by each container." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker images ─────────────────────────────────────────────────────────
    const pImages = await prisma.page.create({
        data: {
            title: "docker images",
            slug: "/commands/images",
            description: "List all Docker images stored on your local machine.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker images [OPTIONS] [REPOSITORY[:TAG]]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker images</code> shows the images you have downloaded or built locally. The output shows the repository name, tag, image ID, when it was created, and its compressed disk size.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Your local hard drive is like a freezer. Every image you have pulled or built is a frozen meal stored in that freezer. <code>docker images</code> opens the freezer door and reads out the label on every box — what it is, what version, and how big it is.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# List all local images\ndocker images\n\n# List only Ubuntu images\ndocker images ubuntu`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Find all dangling images (untagged layers left over from old builds) and delete them to reclaim disk space.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Show only dangling (untagged) images\ndocker images --filter "dangling=true"\n\n# Remove all dangling images\ndocker image prune`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "REPOSITORY[:TAG]", type: "Argument", description: "Filter output to only show images matching this name/tag." },
                            { flag: "-a / --all", type: "Flag", description: "Show all images including intermediate layers (hidden by default)." },
                            { flag: "-q / --quiet", type: "Flag", description: "Print only image IDs. Useful for scripting." },
                            { flag: "--filter KEY=VALUE", type: "Option", description: "Filter images. E.g. dangling=true shows untagged images; before=IMAGE shows older images." },
                            { flag: "--format STRING", type: "Option", description: "Format the output using a Go template." },
                            { flag: "--no-trunc", type: "Flag", description: "Do not truncate output — show full image IDs." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker stop ───────────────────────────────────────────────────────────
    const pStop = await prisma.page.create({
        data: {
            title: "docker stop",
            slug: "/commands/stop",
            description: "Gracefully stop one or more running containers.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker stop [OPTIONS] CONTAINER [CONTAINER...]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker stop</code> sends a <strong>SIGTERM</strong> signal to the main process inside the container, giving it time to shut down cleanly. If the container does not stop within the timeout window, Docker sends a <strong>SIGKILL</strong> to force-quit it.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Imagine a container is a running application on your phone. <code>docker stop</code> is pressing the home button — the app gets a polite nudge to save its work and close. It is not forced-quit; it gets a few seconds to clean up first.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Stop a container by name\ndocker stop my-nginx\n\n# Stop a container by ID\ndocker stop a3f5c821b90d`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Stop all currently running containers in a single command for a quick teardown of your local development environment.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Stop all running containers\ndocker stop $(docker ps -q)\n\n# Stop with a shorter timeout (2 seconds instead of default 10)\ndocker stop --time 2 my-nginx`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "CONTAINER", type: "Argument", description: "Container name or ID to stop. You can pass multiple IDs/names separated by spaces." },
                            { flag: "-t N / --time N", type: "Option", description: "Number of seconds to wait for the container to stop before sending SIGKILL. Default is 10." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker rm ─────────────────────────────────────────────────────────────
    const pRm = await prisma.page.create({
        data: {
            title: "docker rm",
            slug: "/commands/rm",
            description: "Remove one or more stopped containers from your system.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker rm [OPTIONS] CONTAINER [CONTAINER...]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker rm</code> deletes a container. The container must be stopped first (unless you use <code>-f</code>). Removing a container does <strong>not</strong> delete the image it was created from — only the running instance.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>A container is like a tent you pitched in your garden. <code>docker stop</code> packs your stuff inside the tent. <code>docker rm</code> takes the tent down entirely and puts the poles and canvas back in storage. The blueprint for the tent (the image) still exists — you can pitch a new one anytime.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Remove a single stopped container\ndocker rm my-nginx`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Force-remove a running container (skips stop), and also remove its anonymous volumes at the same time.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Force remove a running container along with its anonymous volumes\ndocker rm -f -v my-nginx\n\n# Remove all stopped containers at once\ndocker container prune`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "CONTAINER", type: "Argument", description: "Container name or ID to remove. Multiple values are accepted." },
                            { flag: "-f / --force", type: "Flag", description: "Force-remove a running container by sending SIGKILL before deleting it." },
                            { flag: "-v / --volumes", type: "Flag", description: "Remove anonymous volumes attached to the container along with the container itself." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker rmi ────────────────────────────────────────────────────────────
    const pRmi = await prisma.page.create({
        data: {
            title: "docker rmi",
            slug: "/commands/rmi",
            description: "Remove one or more images from your local storage.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker rmi [OPTIONS] IMAGE [IMAGE...]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker rmi</code> removes an image from your local machine. You cannot remove an image while a container (even a stopped one) is using it — you must remove the container first with <code>docker rm</code>.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Images take up disk space — sometimes several hundred megabytes each. <code>docker rmi</code> is like deleting a game from your hard drive because you no longer play it. The console (Docker) is still there, you just freed up some storage.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Remove an image by name and tag\ndocker rmi nginx:alpine\n\n# Remove by image ID\ndocker rmi a3f5c821b90d`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>After a CI build, clean up old build images to keep the build server lean.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Remove all dangling (untagged) images\ndocker image prune\n\n# Remove ALL unused images (not just dangling ones)\ndocker image prune -a\n\n# Force remove a specific image without confirmation\ndocker rmi -f my-org/my-app:old-version`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "IMAGE", type: "Argument", description: "Image name:tag or image ID to remove. Multiple values accepted." },
                            { flag: "-f / --force", type: "Flag", description: "Force removal even if a stopped container references the image." },
                            { flag: "--no-prune", type: "Flag", description: "Do not delete untagged parent layers." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker exec ───────────────────────────────────────────────────────────
    const pExec = await prisma.page.create({
        data: {
            title: "docker exec",
            slug: "/commands/exec",
            description: "Run a command inside an already-running container.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker exec</code> lets you run an additional command inside a container that is already running. The most common use is to open an interactive shell so you can inspect or debug the container from the inside.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Imagine the container is a locked room with a person (process) inside. <code>docker exec</code> is you knocking on the door and handing a note through a slot — you can ask the person to do something without disturbing their main task. Opening a shell is like being teleported inside the room.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# Open an interactive bash shell inside a running container\ndocker exec -it my-nginx bash`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Run a one-off database command inside a running Postgres container without opening a full shell session.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Run psql inside a running Postgres container as the postgres user\ndocker exec -it my-postgres psql -U postgres -c "SELECT version();"\n\n# Run a command as a specific user inside the container\ndocker exec -u www-data my-nginx nginx -t`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "CONTAINER", type: "Argument", description: "Name or ID of the already-running container to target." },
                            { flag: "COMMAND", type: "Argument", description: "The command to run inside the container, e.g. bash, sh, ls, psql." },
                            { flag: "-i / --interactive", type: "Flag", description: "Keep stdin open so you can type input to the command." },
                            { flag: "-t / --tty", type: "Flag", description: "Allocate a pseudo-terminal. Use with -i (-it) for an interactive shell." },
                            { flag: "-d / --detach", type: "Flag", description: "Run the command in the background and return immediately." },
                            { flag: "-e KEY=VALUE", type: "Option", description: "Set an environment variable for this exec session only." },
                            { flag: "-u USER", type: "Option", description: "Run the command as a specific user or UID inside the container." },
                            { flag: "-w DIR", type: "Option", description: "Set the working directory inside the container for this command." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // ── docker logs ───────────────────────────────────────────────────────────
    const pLogs = await prisma.page.create({
        data: {
            title: "docker logs",
            slug: "/commands/logs",
            description: "Fetch and stream the log output from a container.",
            components: {
                create: [
                    {
                        type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill",
                        content: "<p>Syntax: <code>docker logs [OPTIONS] CONTAINER</code></p>",
                        order: 10,
                    },
                    {
                        type: "paragraph",
                        content: "<p><code>docker logs</code> fetches the stdout and stderr output produced by a container's main process. You can view all past output, tail the last N lines, or follow the output live like <code>tail -f</code>.</p>",
                        order: 20,
                    },
                    {
                        type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill",
                        content: "<p>Every container is like a worker quietly doing a job in a sealed room. <code>docker logs</code> is a microphone you hold up to the room's air vent — you can hear everything the worker said since they started, or stay and listen live.</p>",
                        order: 30,
                    },
                    {
                        type: "code",
                        content: `# View all logs from a container\ndocker logs my-nginx\n\n# Follow live log output (like tail -f)\ndocker logs -f my-nginx`,
                        language: "bash", order: 40,
                    },
                    {
                        type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash",
                        content: "<p>Debug a crashing container by viewing the last 50 lines of logs with timestamps, so you can see exactly when and what error occurred before it exited.</p>",
                        order: 50,
                    },
                    {
                        type: "code",
                        content: `# Show last 50 lines with timestamps\ndocker logs --tail 50 --timestamps my-app\n\n# Show logs since a specific time (useful after a deployment)\ndocker logs --since "2024-01-15T10:00:00" my-app\n\n# Follow logs AND show the last 20 lines as a starting point\ndocker logs -f --tail 20 my-app`,
                        language: "bash", order: 60,
                    },
                    {
                        type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table",
                        content: "", order: 70,
                    },
                    {
                        type: "paragraph",
                        content: flagTable([
                            { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container to fetch logs from." },
                            { flag: "-f / --follow", type: "Flag", description: "Stream log output continuously. New lines appear in real-time. Press Ctrl+C to stop." },
                            { flag: "--tail N", type: "Option", description: "Show only the last N lines of logs instead of the full history. Use all for everything." },
                            { flag: "-t / --timestamps", type: "Flag", description: "Prefix each log line with the timestamp of when it was produced." },
                            { flag: "--since TIMESTAMP", type: "Option", description: "Show logs produced after a specific timestamp or duration (e.g. 10m, 1h, 2024-01-15T10:00:00)." },
                            { flag: "--until TIMESTAMP", type: "Option", description: "Show logs produced before a specific timestamp or duration." },
                        ]),
                        order: 80,
                    },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — DEBUGGING
    // =========================================================================

    // ── docker inspect ────────────────────────────────────────────────────────
    const pInspect = await prisma.page.create({
        data: {
            title: "docker inspect",
            slug: "/debugging/inspect",
            description: "Return detailed low-level information about containers, images, volumes, or networks in JSON format.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker inspect [OPTIONS] NAME|ID [NAME|ID...]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker inspect</code> dumps a detailed JSON structure about any Docker object — containers, images, volumes, or networks. It exposes everything: IP addresses, environment variables, mount points, restart policies, health checks, and much more.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Think of a container as a mystery box. <code>docker ps</code> tells you the box label. <code>docker inspect</code> opens the box and X-rays everything inside — every wire, spring, and screw. It is the go-to command when something is not working and you need to know exactly how Docker configured something.</p>", order: 30 },
                    { type: "code", content: `# Inspect a container by name\ndocker inspect my-nginx\n\n# Pretty-print only the IP address using a Go template\ndocker inspect --format '{{.NetworkSettings.IPAddress}}' my-nginx`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Extract just the environment variables of a container to audit secrets and config without entering the container.</p>", order: 50 },
                    { type: "code", content: `# Get all environment variables of a running container\ndocker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' my-app\n\n# Check the restart policy\ndocker inspect --format '{{.HostConfig.RestartPolicy.Name}}' my-app\n\n# Inspect multiple objects at once\ndocker inspect my-nginx my-postgres`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "NAME|ID", type: "Argument", description: "Name or ID of any Docker object: container, image, volume, or network. Multiple accepted." },
                        { flag: "--format STRING", type: "Option", description: "Format the output using a Go template. Extracts specific fields instead of showing the entire JSON." },
                        { flag: "--type STRING", type: "Option", description: "Disambiguate when a name refers to multiple object types: container, image, volume, network, node, service, task." },
                        { flag: "-s / --size", type: "Flag", description: "For containers: display the total file sizes (SizeRootFs and SizeRw)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker stats ──────────────────────────────────────────────────────────
    const pStats = await prisma.page.create({
        data: {
            title: "docker stats",
            slug: "/debugging/stats",
            description: "Display a live stream of container resource usage: CPU, memory, network I/O, and disk I/O.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker stats [OPTIONS] [CONTAINER...]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker stats</code> streams live metrics from one or more containers. It is Docker's built-in <code>top</code>-like resource monitor — showing CPU %, memory usage/limit, network I/O, and block I/O, updating every second.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker stats</code> is like the Activity Monitor or Task Manager, but only for your Docker containers. You can watch in real time if a container is eating too much CPU or RAM and causing trouble.</p>", order: 30 },
                    { type: "code", content: `# Watch live stats for ALL running containers\ndocker stats\n\n# Watch stats for only one container\ndocker stats my-nginx`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Take a one-shot snapshot of all container stats (no live update) and output it as JSON for ingestion into a monitoring pipeline.</p>", order: 50 },
                    { type: "code", content: `# One-shot snapshot (no streaming) in JSON format\ndocker stats --no-stream --format json\n\n# Custom table format: name, CPU, and memory\ndocker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "CONTAINER", type: "Argument", description: "Container name or ID. Omit to show stats for all running containers." },
                        { flag: "--no-stream", type: "Flag", description: "Print a single snapshot of stats and exit. No continuous live update." },
                        { flag: "--no-trunc", type: "Flag", description: "Do not truncate container IDs or names in the output." },
                        { flag: "--format STRING", type: "Option", description: "Format the output using a Go template or the special value json." },
                        { flag: "-a / --all", type: "Flag", description: "Show stats for all containers, including stopped ones (which show zeroes)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker top ────────────────────────────────────────────────────────────
    const pTop = await prisma.page.create({
        data: {
            title: "docker top",
            slug: "/debugging/top",
            description: "Display the running processes inside a container, like the unix 'ps' command.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker top CONTAINER [ps OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker top</code> shows the processes currently running inside a container, using the host's <code>ps</code> command under the hood. It answers the question: \"what is actually running inside this container right now?\"</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Imagine you hired a worker (container) and locked them in a room. <code>docker top</code> lets you look through a window and see exactly what they are doing at this moment — are they working, sleeping, or running something suspicious?</p>", order: 30 },
                    { type: "code", content: `# List processes inside a running container\ndocker top my-nginx`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Pass custom <code>ps</code> options to get a more detailed process view including threads and full command paths.</p>", order: 50 },
                    { type: "code", content: `# Show all processes with full command and user info\ndocker top my-app aux\n\n# Show processes with threads\ndocker top my-app -eLf`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "CONTAINER", type: "Argument", description: "Name or ID of the running container to inspect." },
                        { flag: "[ps OPTIONS]", type: "Argument", description: "Optional arguments passed directly to the unix ps command, e.g. aux, -eLf, -o pid,cmd." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker events ─────────────────────────────────────────────────────────
    const pEvents = await prisma.page.create({
        data: {
            title: "docker events",
            slug: "/debugging/events",
            description: "Stream real-time events from the Docker daemon — container starts, stops, image pulls, and more.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker events [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker events</code> listens to the Docker daemon and prints every event as it happens — container lifecycle events (start, stop, die, kill), image events (pull, push, delete), volume and network events.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Think of the Docker daemon as a busy office. <code>docker events</code> is a security camera feed — you can watch everything that happens in real time. Every time a container starts, crashes, or a new image is downloaded, it shows up on the feed.</p>", order: 30 },
                    { type: "code", content: `# Stream ALL live events from Docker\ndocker events`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Filter events to only show container die/crash events from the last hour, useful for post-mortem debugging of a flapping service.</p>", order: 50 },
                    { type: "code", content: `# Watch only container 'die' events from the last hour\ndocker events --since "1h" --filter "event=die" --filter "type=container"\n\n# Capture events in JSON format for log ingestion\ndocker events --format '{{json .}}' --filter "type=container"`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "--since TIMESTAMP", type: "Option", description: "Show events logged after a timestamp or duration (e.g. 1h, 2024-01-15T10:00:00)." },
                        { flag: "--until TIMESTAMP", type: "Option", description: "Stop streaming after a given timestamp or duration." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Filter events by type (container, image, volume, network), event name, or container/image name." },
                        { flag: "--format STRING", type: "Option", description: "Format output using a Go template. Use {{json .}} for full JSON output." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker diff ───────────────────────────────────────────────────────────
    const pDiff = await prisma.page.create({
        data: {
            title: "docker diff",
            slug: "/debugging/diff",
            description: "Show all filesystem changes made inside a container since it was started.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker diff CONTAINER</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker diff</code> lists all files and directories that have been <strong>Added (A)</strong>, <strong>Changed (C)</strong>, or <strong>Deleted (D)</strong> inside a container's writable layer since the container was created. It compares the current state against the original image.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Imagine Docker gave you a pristine hotel room (the image). <code>docker diff</code> is housekeeping's checklist of everything you moved, added, or broke since you checked in. It only tracks what changed — the original furniture (base image) is not listed.</p>", order: 30 },
                    { type: "code", content: `# See what files changed inside my-nginx since it started\ndocker diff my-nginx\n\n# Example output:\n# C /etc/nginx/nginx.conf     (C = changed)\n# A /var/log/nginx/access.log  (A = added)\n# D /tmp/cache                 (D = deleted)`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Use <code>docker diff</code> during a debugging session to confirm that a config file was correctly written into a running container before committing it into a new image layer.</p>", order: 50 },
                    { type: "code", content: `# 1. Start a container and make a change\ndocker exec my-app sh -c "echo 'debug=true' >> /app/config.ini"\n\n# 2. Verify the change was recorded\ndocker diff my-app\n# A /app/config.ini\n\n# 3. If happy, commit the container state as a new image\ndocker commit my-app my-app:with-debug-config`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container to inspect." },
                        { flag: "A", type: "Output prefix", description: "File or directory was Added (did not exist in the original image)." },
                        { flag: "C", type: "Output prefix", description: "File or directory was Changed (exists in the original image but was modified)." },
                        { flag: "D", type: "Output prefix", description: "File or directory was Deleted (existed in the original image but was removed inside the container)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — CLEANUP
    // =========================================================================

    // ── docker system prune ───────────────────────────────────────────────────
    const pSystemPrune = await prisma.page.create({
        data: {
            title: "docker system prune",
            slug: "/cleanup/system-prune",
            description: "The nuclear option — remove all stopped containers, dangling images, unused networks, and build cache in one command.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker system prune [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker system prune</code> is the all-in-one cleanup command. By default it removes: all <strong>stopped containers</strong>, all <strong>dangling images</strong> (untagged layers), all <strong>unused networks</strong>, and the entire <strong>build cache</strong>. Adding <code>-a</code> also removes any image not referenced by a running container.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>After weeks of experimenting with Docker, your machine accumulates junk — old containers you forgot to delete, half-built images, cached layers. <code>docker system prune</code> is the \"clean my room\" button. One command and all the mess is gone.</p>", order: 30 },
                    { type: "code", content: `# Interactive cleanup (will ask for confirmation)\ndocker system prune\n\n# Skip confirmation prompt\ndocker system prune -f`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>On a CI build server, aggressively reclaim disk space after every pipeline run by removing all unused images and volumes.</p>", order: 50 },
                    { type: "code", content: `# Remove EVERYTHING unused, including all untagged AND unreferenced images\ndocker system prune -a -f\n\n# Also remove unused volumes (adds --volumes flag)\ndocker system prune -a -f --volumes\n\n# See how much space would be freed before committing\ndocker system df`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "-a / --all", type: "Flag", description: "Remove all unused images, not just dangling ones. This is the biggest space saver." },
                        { flag: "-f / --force", type: "Flag", description: "Skip the confirmation prompt. Use in scripts and CI pipelines." },
                        { flag: "--volumes", type: "Flag", description: "Also remove unused volumes. Not included by default to prevent accidental data loss." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Only prune objects matching a filter — e.g. until=24h removes objects older than 24 hours." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker container prune ────────────────────────────────────────────────
    const pContainerPrune = await prisma.page.create({
        data: {
            title: "docker container prune",
            slug: "/cleanup/container-prune",
            description: "Remove all stopped containers, keeping images and volumes intact.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker container prune [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker container prune</code> deletes all containers that are in a <strong>stopped/exited</strong> state. Running containers are never touched. It is a safer and more targeted alternative to <code>docker system prune</code> when you only want to clean up containers.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Running <code>docker run</code> over and over leaves ghost containers piling up — stopped, doing nothing, but still taking up a small amount of disk space and namespace. <code>docker container prune</code> sweeps them all away in one go.</p>", order: 30 },
                    { type: "code", content: `# Remove all stopped containers (prompts for confirmation)\ndocker container prune\n\n# Skip confirmation\ndocker container prune -f`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Remove only containers that exited more than 24 hours ago, leaving recently stopped containers intact for inspection.</p>", order: 50 },
                    { type: "code", content: `# Prune only containers older than 24 hours\ndocker container prune --filter "until=24h" -f`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "-f / --force", type: "Flag", description: "Do not prompt for confirmation. Required for scripting." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Filter which stopped containers to remove. Supports until=DURATION and label=KEY." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker image prune ────────────────────────────────────────────────────
    const pImagePrune = await prisma.page.create({
        data: {
            title: "docker image prune",
            slug: "/cleanup/image-prune",
            description: "Remove dangling or unused images to free up disk space.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker image prune [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker image prune</code> removes <strong>dangling images</strong> by default — these are untagged image layers left behind when you rebuild an image with the same tag. They have no name, no tag, and nothing references them. They are pure wasted disk space.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Every time you rebuild an image using the same tag, the old version loses its label and becomes a \"ghost\" image. Over time these ghosts pile up and eat gigabytes. <code>docker image prune</code> exorcises all the ghosts.</p>", order: 30 },
                    { type: "code", content: `# Remove only dangling (untagged) images\ndocker image prune\n\n# Remove ALL unused images (not just dangling)\ndocker image prune -a`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>On a build server, remove all images older than 48 hours that are no longer referenced by a running or stopped container.</p>", order: 50 },
                    { type: "code", content: `# Remove all unused images older than 48 hours without prompting\ndocker image prune -a --filter "until=48h" -f`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "-a / --all", type: "Flag", description: "Remove all images not referenced by any container (running or stopped), not just dangling ones." },
                        { flag: "-f / --force", type: "Flag", description: "Skip the confirmation prompt." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Only prune images matching a condition, e.g. until=48h removes images older than 48 hours." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker volume prune ───────────────────────────────────────────────────
    const pVolumePrune = await prisma.page.create({
        data: {
            title: "docker volume prune",
            slug: "/cleanup/volume-prune",
            description: "Remove all unused volumes — volumes not mounted by any container.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker volume prune [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker volume prune</code> deletes all volumes that are not currently mounted by any container (running or stopped). Volumes can hold databases and important data — use this command with care.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Volumes are like USB drives plugged into your containers. When you delete a container without its volume, the \"USB drive\" stays behind, floating and unconnected. <code>docker volume prune</code> throws away all the disconnected drives. Be careful — if the drive had important data (like a database), it is gone permanently.</p>", order: 30 },
                    { type: "code", content: `# See which volumes exist and their sizes\ndocker volume ls\n\n# Remove all unused volumes (CAUTION: data is permanently deleted)\ndocker volume prune -f`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>After a full environment teardown in a staging environment, prune volumes that are no longer needed — but only those not labeled as persistent.</p>", order: 50 },
                    { type: "code", content: `# Only prune volumes that do NOT have the label 'keep=true'\ndocker volume prune --filter "label!=keep=true" -f`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "-f / --force", type: "Flag", description: "Skip the confirmation prompt. Essential for automation." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Only prune volumes matching a filter. Supports label and until conditions." },
                        { flag: "-a / --all", type: "Flag", description: "Remove all unused volumes, including those with names (default only removes anonymous volumes in newer Docker versions)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — NETWORKING
    // =========================================================================

    // ── docker network ls ─────────────────────────────────────────────────────
    const pNetworkLs = await prisma.page.create({
        data: {
            title: "docker network ls",
            slug: "/networking/ls",
            description: "List all Docker networks available on this machine.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker network ls [OPTIONS]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker network ls</code> lists every network Docker knows about. By default Docker creates three networks: <code>bridge</code> (the default for containers), <code>host</code> (shares the host's networking stack), and <code>none</code> (no networking). Any networks you create also appear here.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Think of Docker networks as Wi-Fi routers. Each router creates its own private network. <code>docker network ls</code> lists all the routers in your Docker house. Containers on the same router can talk to each other; containers on different routers cannot (unless you bridge them).</p>", order: 30 },
                    { type: "code", content: `# List all networks\ndocker network ls`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Filter to show only user-created bridge networks to audit what custom networks exist in your environment.</p>", order: 50 },
                    { type: "code", content: `# Show only custom bridge networks\ndocker network ls --filter "driver=bridge" --filter "type=custom"\n\n# Show only network IDs (useful for scripting)\ndocker network ls -q`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "-q / --quiet", type: "Flag", description: "Print only network IDs." },
                        { flag: "--filter KEY=VALUE", type: "Option", description: "Filter by driver (bridge, overlay, host), type (custom, builtin), name, or id." },
                        { flag: "--format STRING", type: "Option", description: "Pretty-print the output using a Go template." },
                        { flag: "--no-trunc", type: "Flag", description: "Do not truncate the output. Shows full network IDs." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker network create ─────────────────────────────────────────────────
    const pNetworkCreate = await prisma.page.create({
        data: {
            title: "docker network create",
            slug: "/networking/create",
            description: "Create a custom Docker network so containers can communicate with each other by name.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker network create [OPTIONS] NETWORK</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker network create</code> creates a new isolated network. Containers on the same custom network can reach each other using their container names as hostnames — no IP addresses needed. This is the foundation for multi-container applications.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Imagine you are setting up a small office. You create a private Wi-Fi network called <code>office-net</code>. Anyone connected to <code>office-net</code> can talk to each other just by name (\"Hey, printer\" instead of \"Hey, 192.168.1.45\"). That is exactly what a Docker network does for your containers.</p>", order: 30 },
                    { type: "code", content: `# Create a simple bridge network\ndocker network create my-app-network\n\n# Run containers on that network so they can talk to each other\ndocker run -d --name backend --network my-app-network my-backend-image\ndocker run -d --name frontend --network my-app-network my-frontend-image\n# The frontend container can now reach the backend at http://backend:3000`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Create a custom bridge network with a specific subnet and gateway for a controlled networking environment.</p>", order: 50 },
                    { type: "code", content: `# Create a network with a specific subnet and gateway\ndocker network create \\\n  --driver bridge \\\n  --subnet 172.20.0.0/16 \\\n  --gateway 172.20.0.1 \\\n  --ip-range 172.20.240.0/20 \\\n  production-net`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "NETWORK", type: "Argument", description: "The name to give the new network." },
                        { flag: "-d / --driver STRING", type: "Option", description: "Network driver to use. bridge (default, single-host), overlay (multi-host Swarm), macvlan, none." },
                        { flag: "--subnet STRING", type: "Option", description: "CIDR block for the network, e.g. 172.20.0.0/16." },
                        { flag: "--gateway STRING", type: "Option", description: "IPv4 or IPv6 gateway for the subnet." },
                        { flag: "--ip-range STRING", type: "Option", description: "Allocate container IPs from a sub-range of the subnet." },
                        { flag: "--internal", type: "Flag", description: "Restrict external access — containers on this network cannot reach the internet." },
                        { flag: "--attachable", type: "Flag", description: "Allow standalone containers to attach to this network (required for overlay networks outside Swarm)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker network inspect ────────────────────────────────────────────────
    const pNetworkInspect = await prisma.page.create({
        data: {
            title: "docker network inspect",
            slug: "/networking/inspect",
            description: "Display detailed information about a Docker network, including connected containers and their IPs.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker network inspect [OPTIONS] NETWORK [NETWORK...]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker network inspect</code> prints a detailed JSON description of a network: its driver, subnet, gateway, and most importantly — every container currently connected to it along with their assigned IP addresses.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>If a Docker network is a Wi-Fi router, <code>docker network inspect</code> is the router's admin panel — it shows you the network settings, which devices are connected, and what IP address each device has been assigned.</p>", order: 30 },
                    { type: "code", content: `# Inspect a network by name\ndocker network inspect my-app-network`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Extract just the list of container names and their IPs on a given network using a Go template — useful for scripted service discovery.</p>", order: 50 },
                    { type: "code", content: `# Extract container names and IPs from a network\ndocker network inspect my-app-network \\\n  --format '{{range .Containers}}{{.Name}}: {{.IPv4Address}}{{println}}{{end}}'`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "NETWORK", type: "Argument", description: "Network name or ID. Multiple can be specified." },
                        { flag: "--format STRING", type: "Option", description: "Format output with a Go template to extract specific fields." },
                        { flag: "-v / --verbose", type: "Flag", description: "Show detailed information including services (useful in Swarm mode)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker network connect / disconnect ───────────────────────────────────
    const pNetworkConnect = await prisma.page.create({
        data: {
            title: "docker network connect",
            slug: "/networking/connect",
            description: "Connect a running container to an existing network (or disconnect it) without restarting.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker network connect [OPTIONS] NETWORK CONTAINER</code><br>Syntax: <code>docker network disconnect NETWORK CONTAINER</code></p>", order: 10 },
                    { type: "paragraph", content: "<p>A container can be a member of multiple networks simultaneously. <code>docker network connect</code> plugs a running container into an additional network without restarting it. <code>docker network disconnect</code> does the reverse.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Your laptop can be connected to both your home Wi-Fi and a corporate VPN at the same time. <code>docker network connect</code> does the same for a container — plug it into a second (or third) network while it keeps running normally on its current network.</p>", order: 30 },
                    { type: "code", content: `# Connect a running container to an additional network\ndocker network connect my-app-network my-nginx\n\n# Disconnect a container from a network\ndocker network disconnect my-app-network my-nginx`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Connect a container to a network and assign it a specific static IP address on that network.</p>", order: 50 },
                    { type: "code", content: `# Connect with a specific IP address on the network\ndocker network connect --ip 172.20.0.50 production-net backend-container\n\n# Connect and add a network alias (so other containers can find it by alias)\ndocker network connect --alias db production-net postgres-container`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "NETWORK", type: "Argument", description: "Name or ID of the network to connect or disconnect from." },
                        { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container to connect or disconnect." },
                        { flag: "--ip STRING", type: "Option", description: "Assign a specific IPv4 address to the container on this network." },
                        { flag: "--alias STRING", type: "Option", description: "Add a network-scoped alias — other containers on the network can reach this container by the alias." },
                        { flag: "--link CONTAINER:ALIAS", type: "Option", description: "Add a legacy link (deprecated; prefer DNS-based service discovery)." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker network rm ─────────────────────────────────────────────────────
    const pNetworkRm = await prisma.page.create({
        data: {
            title: "docker network rm",
            slug: "/networking/rm",
            description: "Remove one or more Docker networks. Networks must have no active endpoints.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker network rm NETWORK [NETWORK...]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker network rm</code> deletes one or more networks. A network cannot be removed while containers are still connected to it — you must disconnect or stop all containers first. The three built-in networks (<code>bridge</code>, <code>host</code>, <code>none</code>) cannot be deleted.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Removing a network is like unplugging a Wi-Fi router. You can only unplug it if all devices on the network are disconnected first — otherwise you would cut active connections. Docker enforces this rule automatically.</p>", order: 30 },
                    { type: "code", content: `# Remove a network\ndocker network rm my-app-network\n\n# Remove multiple networks at once\ndocker network rm network-one network-two\n\n# Remove all unused networks at once\ndocker network prune -f`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Tear down all custom networks created for a project by filtering on a label that was applied at creation time.</p>", order: 50 },
                    { type: "code", content: `# Remove all networks labeled with project=myproject\ndocker network prune --filter "label=project=myproject" -f`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "NETWORK", type: "Argument", description: "Name or ID of the network to remove. Multiple accepted." },
                        { flag: "docker network prune", type: "Related cmd", description: "Removes all unused (no active endpoints) networks at once. Supports --filter and -f flags." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — FILE TRANSFER
    // =========================================================================

    // ── docker cp ─────────────────────────────────────────────────────────────
    const pCp = await prisma.page.create({
        data: {
            title: "docker cp",
            slug: "/file-transfer/cp",
            description: "Copy files and directories between a container and the local filesystem in either direction.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH</code><br>Syntax: <code>docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker cp</code> copies files or directories between a container's filesystem and your local machine in either direction. The container does not need to be running — it works on stopped containers too. Think of it as <code>scp</code> but for container filesystems.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Imagine the container is a sealed box. <code>docker cp</code> is a hatch in the box that lets you drop files in or pull files out — no need to open the box (enter the container). Great for copying log files out, or dropping a config file in.</p>", order: 30 },
                    { type: "code", content: `# Copy a log file OUT of the container to your current directory\ndocker cp my-app:/var/log/app.log ./app.log\n\n# Copy a config file INTO the container\ndocker cp ./nginx.conf my-nginx:/etc/nginx/nginx.conf`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Extract an entire directory from a stopped container — useful for recovering build artifacts or database dumps after a container has exited.</p>", order: 50 },
                    { type: "code", content: `# Copy an entire /app/dist directory OUT of a stopped build container\ndocker cp my-build-container:/app/dist ./local-dist/\n\n# Copy a directory INTO a running container\ndocker cp ./migrations/ my-postgres:/docker-entrypoint-initdb.d/\n\n# Use - to pipe a tar archive (stream mode)\ndocker cp my-app:/etc/nginx/. - | tar x -C ./nginx-backup/`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "CONTAINER:SRC_PATH", type: "Argument", description: "Source inside the container. Use container-name:/path/to/file. Container name and path are separated by a colon." },
                        { flag: "DEST_PATH", type: "Argument", description: "Destination on your local machine where the file/directory will be copied to." },
                        { flag: "SRC_PATH", type: "Argument", description: "Source on your local machine when copying INTO the container." },
                        { flag: "CONTAINER:DEST_PATH", type: "Argument", description: "Destination inside the container when copying in." },
                        { flag: "-a / --archive", type: "Flag", description: "Archive mode: preserves the original file UIDs, GIDs, and timestamps." },
                        { flag: "-L / --follow-link", type: "Flag", description: "Follow symbolic links in the source path." },
                        { flag: "- (dash)", type: "Special", description: "Use - as the destination to stream a tar archive to stdout, or as source to stream from stdin." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // ── docker export / import ────────────────────────────────────────────────
    const pExportImport = await prisma.page.create({
        data: {
            title: "docker export / import",
            slug: "/file-transfer/export-import",
            description: "Export a container's entire filesystem as a tar archive, or import a tar archive as a new image.",
            components: {
                create: [
                    { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker export CONTAINER > archive.tar</code><br><code>docker import archive.tar [IMAGE[:TAG]]</code></p>", order: 10 },
                    { type: "paragraph", content: "<p><code>docker export</code> snapshots a container's entire filesystem into a <code>.tar</code> file. <code>docker import</code> does the reverse — it creates a new Docker image from a tar archive. Together they let you transfer or back up container filesystems without using a registry.</p>", order: 20 },
                    { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Export is like making a zip file of everything inside a container. Import is like unzipping that file and turning it into a fresh image you can run again. Useful for moving containers between machines without internet access to Docker Hub.</p>", order: 30 },
                    { type: "code", content: `# Export a container's filesystem to a tar file\ndocker export my-container > my-container-backup.tar\n\n# Import the tar file as a new image\ndocker import my-container-backup.tar my-restored-image:latest\n\n# Run the restored image\ndocker run -it my-restored-image:latest bash`, language: "bash", order: 40 },
                    { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: `<p><strong>export vs save</strong> — an important distinction:
<ul>
  <li><code>docker export</code> exports a <strong>container</strong> filesystem (flattened, no layer history, no metadata).</li>
  <li><code>docker save</code> exports an <strong>image</strong> with all its layers and history intact.</li>
</ul>
Use export/import for lightweight filesystem transfer. Use save/load when you need to preserve the full image layer cache.</p>`, order: 50 },
                    { type: "code", content: `# Export with compression piped through gzip\ndocker export my-container | gzip > my-container.tar.gz\n\n# Import from a compressed archive\ngunzip -c my-container.tar.gz | docker import - my-image:restored\n\n# Import with a custom CMD instruction\ndocker import --change "CMD [\\"node\\", \\"server.js\\"]" backup.tar my-node-app:latest`, language: "bash", order: 60 },
                    { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
                    { type: "paragraph", content: flagTable([
                        { flag: "docker export CONTAINER", type: "Command", description: "Streams the container's filesystem as a tar to stdout. Redirect with > to save to a file." },
                        { flag: "-o / --output FILE", type: "Option (export)", description: "Write the tar directly to a file instead of stdout." },
                        { flag: "docker import SOURCE", type: "Command", description: "Source can be a tar file path, a URL, or - to read from stdin." },
                        { flag: "--change / -c", type: "Option (import)", description: "Apply Dockerfile instructions (CMD, ENV, EXPOSE, etc.) to the imported image." },
                        { flag: "--message / -m", type: "Option (import)", description: "Set a commit message for the imported image." },
                    ]), order: 80 },
                ],
            },
        },
    });

    // =========================================================================
    // PAGES — CONTAINER LIFECYCLE
    // =========================================================================

    const pStart = await prisma.page.create({ data: {
        title: "docker start / restart", slug: "/commands/start-restart",
        description: "Start a stopped container, or restart a running one.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker start CONTAINER</code><br><code>docker restart [OPTIONS] CONTAINER</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker start</code> starts a container that was previously stopped — its filesystem and settings are preserved from when it stopped. <code>docker restart</code> stops then immediately starts a container, useful for applying config changes without recreating it.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker start</code> is like waking up a sleeping computer — all your files and programs are still there. <code>docker restart</code> is like rebooting it. Use restart when a service inside the container is misbehaving and a fresh start might fix it.</p>", order: 30 },
            { type: "code", content: `# Start a stopped container\ndocker start my-nginx\n\n# Restart a running container\ndocker restart my-nginx\n\n# Restart with a 5 second delay before stopping\ndocker restart --time 5 my-nginx`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Start multiple stopped containers in one command, or restart all containers in a compose stack after a config change.</p>", order: 50 },
            { type: "code", content: `# Start multiple containers at once\ndocker start container-a container-b container-c\n\n# Attach to the container's output after starting\ndocker start -a my-app`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container. Multiple accepted by docker start." },
                { flag: "-a / --attach", type: "Flag (start)", description: "Attach stdout/stderr and forward signals after starting." },
                { flag: "-i / --interactive", type: "Flag (start)", description: "Attach the container's stdin." },
                { flag: "--time / -t N", type: "Option (restart)", description: "Seconds to wait before killing the container on restart. Default 10." },
            ]), order: 80 },
        ]},
    }});

    const pKill = await prisma.page.create({ data: {
        title: "docker kill", slug: "/commands/kill",
        description: "Send a signal to a running container — by default SIGKILL, which force-terminates it instantly.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker kill [OPTIONS] CONTAINER [CONTAINER...]</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker kill</code> sends a UNIX signal to a container's main process. The default signal is <code>SIGKILL</code>, which terminates the process immediately with no cleanup. You can send any signal — <code>SIGHUP</code> to reload config, <code>SIGUSR1</code> for custom handlers, etc.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker stop</code> is politely asking a process to quit. <code>docker kill</code> is pulling the power plug — instant termination, no questions asked. Use it when a container is frozen and not responding to stop.</p>", order: 30 },
            { type: "code", content: `# Force-kill a container immediately\ndocker kill my-nginx\n\n# Send SIGHUP instead (e.g. to reload nginx config without restarting)\ndocker kill --signal SIGHUP my-nginx`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>In CI teardown scripts, kill all running containers instantly to ensure a clean state before the next run.</p>", order: 50 },
            { type: "code", content: `# Kill all running containers at once\ndocker kill $(docker ps -q)`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container. Multiple accepted." },
                { flag: "-s / --signal SIGNAL", type: "Option", description: "UNIX signal to send. Default is SIGKILL. Examples: SIGHUP, SIGTERM, SIGUSR1, SIGINT." },
            ]), order: 80 },
        ]},
    }});

    const pPause = await prisma.page.create({ data: {
        title: "docker pause / unpause", slug: "/commands/pause",
        description: "Suspend all processes in a container (freeze it), then resume them.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker pause CONTAINER</code><br><code>docker unpause CONTAINER</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker pause</code> suspends all processes in the container using the cgroup freezer — the container stays alive and in memory but does zero work. <code>docker unpause</code> resumes it exactly where it left off. No data is lost.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Pausing a container is like hitting Pause on a video game. The world freezes in place — the character, enemies, everything. Unpause and the game continues from the exact same frame. The container uses no CPU while paused but still holds its memory.</p>", order: 30 },
            { type: "code", content: `# Pause (freeze) a container\ndocker pause my-nginx\n\n# Resume it\ndocker unpause my-nginx`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Pause a database container while taking a filesystem snapshot to get a consistent backup without shutting it down.</p>", order: 50 },
            { type: "code", content: `# Pause a Postgres container for a consistent snapshot\ndocker pause my-postgres\n# ... take snapshot ...\ndocker unpause my-postgres`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "CONTAINER", type: "Argument", description: "Name or ID of the container to pause or unpause." },
            ]), order: 80 },
        ]},
    }});

    const pRename = await prisma.page.create({ data: {
        title: "docker rename", slug: "/commands/rename",
        description: "Rename an existing container.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker rename CONTAINER NEW_NAME</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker rename</code> changes the name of a container. The container can be running or stopped. Other containers on the same network can reach it by the new name immediately.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>When you run a container without <code>--name</code>, Docker assigns a random name like <code>romantic_curie</code>. <code>docker rename</code> lets you replace that with something meaningful like <code>my-api</code> without recreating the container.</p>", order: 30 },
            { type: "code", content: `# Rename a container\ndocker rename romantic_curie my-api`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Rename a container to match a naming convention after it was created with a temporary name during a blue/green deployment swap.</p>", order: 50 },
            { type: "code", content: `# Swap blue/green: rename old to archived, new to active\ndocker rename app-blue app-blue-archived\ndocker rename app-green app-blue`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "CONTAINER", type: "Argument", description: "Current name or ID of the container to rename." },
                { flag: "NEW_NAME", type: "Argument", description: "The new name to assign. Must be unique among all containers on the host." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // PAGES — VOLUMES
    // =========================================================================

    const pVolumeCreate = await prisma.page.create({ data: {
        title: "docker volume create", slug: "/commands/volume-create",
        description: "Create a named volume for persisting data across container lifecycles.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p>Syntax: <code>docker volume create [OPTIONS] [VOLUME]</code></p>", order: 10 },
            { type: "paragraph", content: "<p>Volumes are the recommended way to persist data in Docker. Unlike bind mounts, volumes are fully managed by Docker, stored in a Docker-controlled directory on the host, and work the same on Windows, Mac, and Linux.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>A container's internal filesystem is temporary — when you delete the container, all data inside it is gone. A volume is an external hard drive you plug into the container. Delete the container, and the hard drive (volume) still exists with all its data intact.</p>", order: 30 },
            { type: "code", content: `# Create a named volume\ndocker volume create my-db-data\n\n# Use it when running a container\ndocker run -d -v my-db-data:/var/lib/postgresql/data postgres:16`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Create a volume with a specific driver for network-attached storage in a production environment.</p>", order: 50 },
            { type: "code", content: `# Create a volume and inspect it\ndocker volume create my-db-data\ndocker volume inspect my-db-data`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "VOLUME", type: "Argument", description: "Name for the volume. Omit for an auto-generated name." },
                { flag: "--driver / -d STRING", type: "Option", description: "Volume driver. Default is local. Others: nfs, aws-efs, etc." },
                { flag: "--opt / -o KEY=VALUE", type: "Option", description: "Driver-specific options (e.g. size, type for cloud volumes)." },
                { flag: "--label KEY=VALUE", type: "Option", description: "Attach metadata labels to the volume for filtering later." },
            ]), order: 80 },
        ]},
    }});

    const pVolumeLs = await prisma.page.create({ data: {
        title: "docker volume ls / inspect / rm", slug: "/commands/volume-manage",
        description: "List, inspect, and remove Docker volumes.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker volume ls</code> — list all volumes<br><code>docker volume inspect VOLUME</code> — detailed JSON info<br><code>docker volume rm VOLUME</code> — delete a volume</p>", order: 10 },
            { type: "paragraph", content: "<p>These three commands let you manage the full lifecycle of volumes. <code>ls</code> shows what exists, <code>inspect</code> shows where data lives on the host and which containers are using it, and <code>rm</code> permanently deletes a volume and all its data.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker volume ls</code> is like checking what hard drives are connected. <code>docker volume inspect</code> opens Device Manager and shows full specs. <code>docker volume rm</code> formats and removes the drive permanently — all data is gone.</p>", order: 30 },
            { type: "code", content: `# List all volumes\ndocker volume ls\n\n# Inspect a volume (shows mountpoint on host)\ndocker volume inspect my-db-data\n\n# Remove a volume (container must be stopped/removed first)\ndocker volume rm my-db-data`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Find the exact host path of a volume's data to back it up directly from the filesystem.</p>", order: 50 },
            { type: "code", content: `# Get the mountpoint path of a volume\ndocker volume inspect my-db-data --format '{{.Mountpoint}}'\n# /var/lib/docker/volumes/my-db-data/_data\n\n# Remove all unused volumes\ndocker volume prune -f`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "docker volume ls --filter", type: "Option", description: "Filter volumes: dangling=true (unused), name=<pattern>, label=<key>." },
                { flag: "docker volume ls -q", type: "Flag", description: "Print only volume names. Useful for piping to docker volume rm." },
                { flag: "docker volume inspect --format", type: "Option", description: "Extract a specific field using a Go template, e.g. {{.Mountpoint}}." },
                { flag: "docker volume rm -f", type: "Flag", description: "Force remove (some drivers support this even if a stopped container references the volume)." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // PAGES — REGISTRY
    // =========================================================================

    const pLogin = await prisma.page.create({ data: {
        title: "docker login / logout", slug: "/commands/login",
        description: "Authenticate with a container registry (Docker Hub or private) to push and pull private images.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker login [SERVER]</code><br><code>docker logout [SERVER]</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker login</code> stores your registry credentials so Docker can authenticate when pulling private images or pushing to your repositories. Credentials are stored in <code>~/.docker/config.json</code>. <code>docker logout</code> removes the stored credentials for that registry.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Docker Hub is like a private library. Logging in gives you access to your private shelf (private images). Without logging in, you can only access the public section. <code>docker logout</code> is checking out of the library — your credentials are cleared from memory.</p>", order: 30 },
            { type: "code", content: `# Log in to Docker Hub (prompts for username + password)\ndocker login\n\n# Log in to a private registry\ndocker login registry.mycompany.com\n\n# Log out from Docker Hub\ndocker logout`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>In CI/CD, pass credentials via environment variables without an interactive prompt — the secure way to authenticate in pipelines.</p>", order: 50 },
            { type: "code", content: `# Non-interactive login using piped password (CI-safe)\necho "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin\n\n# Login to AWS ECR (uses helper tool)\naws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "SERVER", type: "Argument", description: "Registry URL. Omit for Docker Hub (docker.io)." },
                { flag: "-u / --username STRING", type: "Option", description: "Registry username." },
                { flag: "-p / --password STRING", type: "Option", description: "Registry password. Avoid this in scripts — use --password-stdin instead." },
                { flag: "--password-stdin", type: "Flag", description: "Read the password from stdin. Safe for CI/CD pipelines." },
            ]), order: 80 },
        ]},
    }});

    const pSearch = await prisma.page.create({ data: {
        title: "docker search / tag", slug: "/commands/search-tag",
        description: "Search Docker Hub for public images, or tag a local image with a new name.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker search [OPTIONS] TERM</code><br><code>docker tag SOURCE_IMAGE TARGET_IMAGE</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker search</code> queries Docker Hub and returns matching public images with their star ratings and official status. <code>docker tag</code> creates an additional tag pointing to the same image — a way to rename or version an image before pushing it to a registry.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker search</code> is the command-line equivalent of searching Docker Hub's website. <code>docker tag</code> is like putting a second label on a jar — same contents, different name. Use it to retag an image with your Docker Hub username before pushing.</p>", order: 30 },
            { type: "code", content: `# Search Docker Hub for nginx images\ndocker search nginx\n\n# Tag a local image with your username for pushing\ndocker tag my-app:latest yourusername/my-app:v1.0`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Filter search results to show only official images with at least 1000 stars, then tag and push a local image to a private registry.</p>", order: 50 },
            { type: "code", content: `# Search for official images only with star count\ndocker search --filter "is-official=true" --filter "stars=1000" python\n\n# Tag an image for a private registry and push\ndocker tag my-app:latest registry.mycompany.com/team/my-app:2.1.0\ndocker push registry.mycompany.com/team/my-app:2.1.0`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "docker search --filter", type: "Option", description: "Filter results: is-official=true, is-automated=true, stars=N." },
                { flag: "docker search --limit N", type: "Option", description: "Limit results to N images (default 25, max 100)." },
                { flag: "docker search --format", type: "Option", description: "Format output with a Go template." },
                { flag: "docker tag SOURCE", type: "Argument", description: "The existing local image name:tag or image ID to retag." },
                { flag: "docker tag TARGET", type: "Argument", description: "The new name:tag (can include registry host, org, repo, and tag)." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // PAGES — SYSTEM INFO
    // =========================================================================

    const pSystemInfo = await prisma.page.create({ data: {
        title: "docker info / version / system df", slug: "/commands/system-info",
        description: "Inspect the Docker daemon configuration, version details, and disk usage.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker info</code> — daemon config &amp; resource summary<br><code>docker version</code> — client and server version detail<br><code>docker system df</code> — disk usage breakdown</p>", order: 10 },
            { type: "paragraph", content: "<p>These three read-only commands help you understand the current state of your Docker installation without changing anything.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p><code>docker version</code> is like checking what version of an app you installed. <code>docker info</code> opens the full settings panel — how many containers are running, how much memory Docker can use, what OS it is running on. <code>docker system df</code> is checking how much disk space Docker is consuming overall.</p>", order: 30 },
            { type: "code", content: `# Show Docker client and server versions\ndocker version\n\n# Show system-wide Docker information\ndocker info\n\n# Show disk usage by images, containers, and volumes\ndocker system df`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Use these commands at the start of a CI job to log the Docker environment, or to audit how much reclaimable space exists on a build server.</p>", order: 50 },
            { type: "code", content: `# Verbose disk usage (shows each image/container/volume individually)\ndocker system df -v\n\n# Get just the Docker server version as a plain string\ndocker version --format '{{.Server.Version}}'\n\n# Check number of running containers and total memory\ndocker info --format '{{.ContainersRunning}} containers, {{.MemTotal}} bytes RAM'`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "docker info --format", type: "Option", description: "Extract specific fields using a Go template." },
                { flag: "docker version --format", type: "Option", description: "Format version output. Use json for structured output." },
                { flag: "docker system df -v", type: "Flag", description: "Show verbose output: breaks down disk usage per individual image, container, and volume." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // PAGES — IMAGE TRANSFERS
    // =========================================================================

    const pSaveLoad = await prisma.page.create({ data: {
        title: "docker save / load", slug: "/commands/save-load",
        description: "Export a full image (with all layers) to a tar file, or load it back — no registry required.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker save IMAGE > archive.tar</code><br><code>docker load < archive.tar</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker save</code> exports a full image — all layers, tags, and metadata — into a tar file. <code>docker load</code> imports it back, restoring the image exactly as it was. Unlike <code>docker export</code> (which exports a container filesystem), <code>save</code> preserves the complete image layer cache.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smell-fill", content: "<p>Save/load is a USB stick for Docker images. You build an image, <code>docker save</code> it to a <code>.tar</code> file, copy the file to another machine (even one with no internet), and <code>docker load</code> it. The image appears exactly as if you had built it or pulled it from a registry.</p>", order: 30 },
            { type: "code", content: `# Save an image to a tar file\ndocker save my-app:latest > my-app.tar\n\n# Load it on another machine\ndocker load < my-app.tar`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Save multiple images into one archive and transfer them to an air-gapped server with no internet connection.</p>", order: 50 },
            { type: "code", content: `# Save multiple images into one archive\ndocker save my-app:v1 nginx:alpine postgres:16 | gzip > stack-images.tar.gz\n\n# Load on the target machine\ngunzip -c stack-images.tar.gz | docker load\n\n# Save to a file directly (instead of stdout redirect)\ndocker save -o my-app.tar my-app:latest`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "docker save IMAGE [IMAGE...]", type: "Argument", description: "One or more image names/tags to include in the archive." },
                { flag: "docker save -o FILE", type: "Option", description: "Write to a file directly instead of stdout. Equivalent to > redirect." },
                { flag: "docker load -i FILE", type: "Option", description: "Load from a file instead of stdin. Equivalent to < redirect." },
                { flag: "docker load -q", type: "Flag", description: "Suppress output — only print the loaded image names." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // PAGES — DOCKER COMPOSE
    // =========================================================================

    const pComposeUp = await prisma.page.create({ data: {
        title: "docker compose up / down", slug: "/commands/compose-up-down",
        description: "Start your entire multi-container application from a compose file, or tear it all down.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker compose up [OPTIONS]</code><br><code>docker compose down [OPTIONS]</code></p>", order: 10 },
            { type: "paragraph", content: "<p>Docker Compose orchestrates multi-container applications defined in a <code>compose.yaml</code> file. <code>compose up</code> creates and starts all defined services, networks, and volumes. <code>compose down</code> stops and removes them — optionally also removing volumes and images.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>Running a modern app usually needs multiple containers: a web server, a database, a cache. Without Compose, you would start each one manually. <code>docker compose up</code> reads a recipe file (<code>compose.yaml</code>) and starts everything at once. <code>compose down</code> shuts everything down cleanly.</p>", order: 30 },
            { type: "code", content: `# Start all services defined in compose.yaml\ndocker compose up\n\n# Start in background (detached)\ndocker compose up -d\n\n# Stop and remove all containers + networks\ndocker compose down`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Start only a subset of services, force a rebuild of images, and on teardown also remove volumes to get a fully clean state.</p>", order: 50 },
            { type: "code", content: `# Rebuild images then start (ignores cache)\ndocker compose up -d --build\n\n# Start only the backend service (not frontend or db)\ndocker compose up -d backend\n\n# Tear down: remove containers, networks, AND volumes\ndocker compose down -v\n\n# Tear down and also remove the built images\ndocker compose down --rmi all -v`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "-d / --detach", type: "Flag (up)", description: "Run all services in the background and return the prompt." },
                { flag: "--build", type: "Flag (up)", description: "Force rebuild of service images before starting containers." },
                { flag: "--no-deps", type: "Flag (up)", description: "Start only the specified service, without starting its dependencies." },
                { flag: "--scale SERVICE=N", type: "Option (up)", description: "Override the number of replicas for a service." },
                { flag: "-v / --volumes", type: "Flag (down)", description: "Remove named and anonymous volumes declared in compose.yaml." },
                { flag: "--rmi STRING", type: "Option (down)", description: "Remove images. Values: all (all images used), local (only locally built ones)." },
                { flag: "-f / --file FILE", type: "Option (both)", description: "Specify a non-default compose file, e.g. -f docker-compose.prod.yaml." },
            ]), order: 80 },
        ]},
    }});

    const pComposePsLogs = await prisma.page.create({ data: {
        title: "docker compose ps / logs", slug: "/commands/compose-ps-logs",
        description: "Check the status of compose services and view their combined log output.",
        components: { create: [
            { type: "heading", heading: "Quick Look", icon: "bi-lightning-charge-fill", content: "<p><code>docker compose ps</code><br><code>docker compose logs [SERVICE]</code></p>", order: 10 },
            { type: "paragraph", content: "<p><code>docker compose ps</code> lists the containers managed by the current compose stack and their status. <code>docker compose logs</code> aggregates and streams logs from all services in one view — optionally filtered to a single service.</p>", order: 20 },
            { type: "heading", heading: "Noob-Friendly Example", icon: "bi-emoji-smile-fill", content: "<p>After running <code>docker compose up -d</code>, your app is running silently in the background. <code>compose ps</code> tells you which services are healthy and running. <code>compose logs</code> opens the combined log stream of all services so you can spot errors across the whole stack at once.</p>", order: 30 },
            { type: "code", content: `# Check status of all compose services\ndocker compose ps\n\n# View combined logs from all services\ndocker compose logs\n\n# Follow (stream) logs from all services\ndocker compose logs -f`, language: "bash", order: 40 },
            { type: "heading", heading: "Tech-Friendly Example", icon: "bi-code-slash", content: "<p>Follow only the backend service's logs with timestamps, and check which compose services have unhealthy health checks.</p>", order: 50 },
            { type: "code", content: `# Stream logs for only one service with timestamps\ndocker compose logs -f --timestamps backend\n\n# Check services that are not running (exit code != 0)\ndocker compose ps --status exited\n\n# Show only the last 50 lines from each service\ndocker compose logs --tail 50`, language: "bash", order: 60 },
            { type: "heading", heading: "Flag / Parameter Reference", icon: "bi-table", content: "", order: 70 },
            { type: "paragraph", content: flagTable([
                { flag: "docker compose ps --status", type: "Option", description: "Filter by status: running, exited, paused, restarting." },
                { flag: "docker compose ps -q", type: "Flag", description: "Print only container IDs." },
                { flag: "docker compose logs SERVICE", type: "Argument", description: "Filter logs to a specific service name. Omit for all services." },
                { flag: "docker compose logs -f", type: "Flag", description: "Follow log output in real-time." },
                { flag: "docker compose logs --tail N", type: "Option", description: "Show only the last N lines from each service." },
                { flag: "docker compose logs -t", type: "Flag", description: "Include timestamps on each log line." },
            ]), order: 80 },
        ]},
    }});

    // =========================================================================
    // MENU ITEMS
    // =========================================================================

    // Section: Getting Started (order 1)
    const menuGettingStarted = await prisma.menuItem.create({
        data: { label: "Getting Started", icon: "bi-rocket-takeoff-fill", order: 1 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "Introduction", icon: "bi-book-fill", parentId: menuGettingStarted.id, pageId: pIntro.id, order: 1 },
            { label: "Docker Architecture", icon: "bi-cpu-fill", parentId: menuGettingStarted.id, pageId: pDockerArchitecture.id, order: 2 },
            { label: "Images and Containers", icon: "bi-box-seam-fill", parentId: menuGettingStarted.id, pageId: pImagesContainers.id, order: 3 },
            { label: "Layers", icon: "bi-layers-fill", parentId: menuGettingStarted.id, pageId: pLayers.id, order: 4 },
            { label: "Volumes and Bind Mounts", icon: "bi-hdd-fill", parentId: menuGettingStarted.id, pageId: pVolumesBindMounts.id, order: 5 },
            { label: "Rules and Case Studies", icon: "bi-lightbulb-fill", parentId: menuGettingStarted.id, pageId: pRulesAndCaseStudies.id, order: 6 },
            { label: "Installation", icon: "bi-download", parentId: menuGettingStarted.id, pageId: pInstall.id, order: 7 },
        ],
    });

    // Section: Commands (order 2)
    const menuCommands = await prisma.menuItem.create({
        data: { label: "Commands", icon: "bi-terminal-fill", order: 2 },
    });

    // Subsection: Common Linux Commands
    const menuCommonLinuxCommands = await prisma.menuItem.create({
        data: { label: "Common Linux Commands", icon: "bi-terminal-fill", parentId: menuCommands.id, order: 1 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "Common Linux Commands", icon: "bi-terminal-fill", parentId: menuCommonLinuxCommands.id, pageId: pCommonLinuxCommands.id, order: 1 },
        ],
    });

    // Subsection: Core Docker Commands
    const menuCoreDockerCommands = await prisma.menuItem.create({
        data: { label: "Core Docker Commands", icon: "bi-play-circle-fill", parentId: menuCommands.id, order: 2 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "docker run",          icon: "bi-play-circle-fill",    parentId: menuCoreDockerCommands.id, pageId: pRun.id,           order: 1 },
            { label: "docker build",        icon: "bi-hammer",               parentId: menuCoreDockerCommands.id, pageId: pBuild.id,         order: 2 },
            { label: "docker pull",         icon: "bi-cloud-download-fill",  parentId: menuCoreDockerCommands.id, pageId: pPull.id,          order: 3 },
            { label: "docker push",         icon: "bi-cloud-upload-fill",    parentId: menuCoreDockerCommands.id, pageId: pPush.id,          order: 4 },
            { label: "docker ps",           icon: "bi-list-check",           parentId: menuCoreDockerCommands.id, pageId: pPs.id,            order: 5 },
            { label: "docker images",       icon: "bi-layers-fill",          parentId: menuCoreDockerCommands.id, pageId: pImages.id,        order: 6 },
            { label: "docker stop",         icon: "bi-stop-circle-fill",     parentId: menuCoreDockerCommands.id, pageId: pStop.id,          order: 7 },
            { label: "docker rm",           icon: "bi-trash-fill",           parentId: menuCoreDockerCommands.id, pageId: pRm.id,            order: 8 },
            { label: "docker rmi",          icon: "bi-trash2-fill",          parentId: menuCoreDockerCommands.id, pageId: pRmi.id,           order: 9 },
            { label: "docker exec",         icon: "bi-terminal",             parentId: menuCoreDockerCommands.id, pageId: pExec.id,          order: 10 },
            { label: "docker logs",         icon: "bi-file-text-fill",       parentId: menuCoreDockerCommands.id, pageId: pLogs.id,          order: 11 },
            // Container Lifecycle
            { label: "start / restart",     icon: "bi-arrow-clockwise",      parentId: menuCoreDockerCommands.id, pageId: pStart.id,         order: 12 },
            { label: "docker kill",         icon: "bi-x-octagon-fill",       parentId: menuCoreDockerCommands.id, pageId: pKill.id,          order: 13 },
            { label: "pause / unpause",     icon: "bi-pause-circle-fill",    parentId: menuCoreDockerCommands.id, pageId: pPause.id,         order: 14 },
            { label: "docker rename",       icon: "bi-pencil-fill",          parentId: menuCoreDockerCommands.id, pageId: pRename.id,        order: 15 },
            // Volumes
            { label: "volume create",       icon: "bi-hdd-fill",             parentId: menuCoreDockerCommands.id, pageId: pVolumeCreate.id,  order: 16 },
            { label: "volume ls/inspect/rm",icon: "bi-hdd-stack-fill",       parentId: menuCoreDockerCommands.id, pageId: pVolumeLs.id,      order: 17 },
            // Registry
            { label: "login / logout",      icon: "bi-person-badge-fill",    parentId: menuCoreDockerCommands.id, pageId: pLogin.id,         order: 18 },
            { label: "search / tag",        icon: "bi-tags-fill",            parentId: menuCoreDockerCommands.id, pageId: pSearch.id,        order: 19 },
            // System Info
            { label: "info / version / df", icon: "bi-info-circle-fill",     parentId: menuCoreDockerCommands.id, pageId: pSystemInfo.id,    order: 20 },
            // Image Transfers
            { label: "save / load",         icon: "bi-box-arrow-in-down-left",parentId: menuCoreDockerCommands.id, pageId: pSaveLoad.id,     order: 21 },
            // Docker Compose
            { label: "compose up / down",   icon: "bi-stack",                parentId: menuCoreDockerCommands.id, pageId: pComposeUp.id,     order: 22 },
            { label: "compose ps / logs",   icon: "bi-card-list",            parentId: menuCoreDockerCommands.id, pageId: pComposePsLogs.id, order: 23 },
        ],
    });

    // Subsection: Debugging (now under Commands)
    const menuDebugging = await prisma.menuItem.create({
        data: { label: "Debugging", icon: "bi-bug-fill", parentId: menuCommands.id, order: 3 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "docker inspect", icon: "bi-search",              parentId: menuDebugging.id, pageId: pInspect.id, order: 1 },
            { label: "docker stats",   icon: "bi-bar-chart-fill",      parentId: menuDebugging.id, pageId: pStats.id,   order: 2 },
            { label: "docker top",     icon: "bi-cpu-fill",            parentId: menuDebugging.id, pageId: pTop.id,     order: 3 },
            { label: "docker events",  icon: "bi-activity",            parentId: menuDebugging.id, pageId: pEvents.id,  order: 4 },
            { label: "docker diff",    icon: "bi-file-diff-fill",      parentId: menuDebugging.id, pageId: pDiff.id,    order: 5 },
        ],
    });

    // Subsection: Cleanup (now under Commands)
    const menuCleanup = await prisma.menuItem.create({
        data: { label: "Cleanup", icon: "bi-trash3-fill", parentId: menuCommands.id, order: 4 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "system prune",    icon: "bi-nuclear",              parentId: menuCleanup.id, pageId: pSystemPrune.id,    order: 1 },
            { label: "container prune", icon: "bi-box-arrow-right",      parentId: menuCleanup.id, pageId: pContainerPrune.id, order: 2 },
            { label: "image prune",     icon: "bi-image-fill",           parentId: menuCleanup.id, pageId: pImagePrune.id,     order: 3 },
            { label: "volume prune",    icon: "bi-device-hdd-fill",      parentId: menuCleanup.id, pageId: pVolumePrune.id,    order: 4 },
        ],
    });

    // Subsection: Networking (now under Commands)
    const menuNetworking = await prisma.menuItem.create({
        data: { label: "Networking", icon: "bi-diagram-3-fill", parentId: menuCommands.id, order: 5 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "network ls",         icon: "bi-list-ul",           parentId: menuNetworking.id, pageId: pNetworkLs.id,      order: 1 },
            { label: "network create",     icon: "bi-plus-circle-fill",  parentId: menuNetworking.id, pageId: pNetworkCreate.id,  order: 2 },
            { label: "network inspect",    icon: "bi-search",            parentId: menuNetworking.id, pageId: pNetworkInspect.id, order: 3 },
            { label: "network connect",    icon: "bi-plug-fill",         parentId: menuNetworking.id, pageId: pNetworkConnect.id, order: 4 },
            { label: "network rm",         icon: "bi-trash-fill",        parentId: menuNetworking.id, pageId: pNetworkRm.id,      order: 5 },
        ],
    });

    // Subsection: File Transfer (now under Commands)
    const menuFileTransfer = await prisma.menuItem.create({
        data: { label: "File Transfer", icon: "bi-arrow-left-right", parentId: menuCommands.id, order: 6 },
    });
    await prisma.menuItem.createMany({
        data: [
            { label: "docker cp",             icon: "bi-clipboard-fill",   parentId: menuFileTransfer.id, pageId: pCp.id,           order: 1 },
            { label: "export / import",       icon: "bi-box-arrow-in-down",parentId: menuFileTransfer.id, pageId: pExportImport.id, order: 2 },
        ],
    });

    console.log("✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
