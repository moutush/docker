import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Practice: Linux Commands - Docker Documentation",
  description: "Interactive challenges to practice Linux commands. Solve challenges in your terminal and expand answers to verify your solution."
};

export default function PracticeLinuxCommandsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Practice: Linux Commands</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Interactive challenges to practice Linux commands. Solve challenges in your terminal and expand answers to verify your solution.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-pencil-square"}></i>
              </div>
              <h2 className="doc-card-heading">Linux Commands Practice</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Test your Linux skills with these hands-on challenges. Solve each challenge in your local terminal, then expand the answer to verify your solution. Start simple and work your way up!</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div style="margin-top: 1.5rem;">
  <!-- BEGINNER CHALLENGES -->
  <h5 style="color: #58a6ff; margin-top: 2rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 700;">
    <i class="bi bi-play-circle-fill" style="color: #58a6ff; font-size: 1.1rem;"></i> Beginner Challenges
  </h5>

  <!-- Challenge 1 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 1: Navigate and List Files</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Navigate to your home directory and list all files including hidden ones in long format. What are the permissions on your .bashrc file?</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans1" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans1" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">cd ~
ls -la
# Look at the .bashrc line for permissions</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">cd ~</code> — Go to your home directory (~ is a shortcut for /home/yourname)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">ls</code> — List files command</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-l</code> — Long format (shows permissions, size, date, owner)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-a</code> — All files (including hidden ones starting with .)</li>
            </ul>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">Expected output:</strong> Your .bashrc permissions will look like: <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-rw-r--r--</code> (read+write for you, read-only for others)</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 2 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 2: Create Nested Directories</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Create a nested directory structure: <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">projects/my-app/src/components</code> in your home directory with a single command.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans2" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans2" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">mkdir -p ~/projects/my-app/src/components
ls -R ~/projects
# Verify the folder structure was created</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">mkdir</code> — Create directory (folder)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-p</code> — Parent flag (creates all missing folders in the path, doesn't error if they exist)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">~</code> — Home directory shortcut</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-R</code> — Recursive list (show folders inside folders)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 3 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 3: Print Your Current Path</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">You're somewhere deep in your file system and lost. Show the absolute path to your current location.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans3" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans3" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">pwd</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What it does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">pwd</code> — Print Working Directory (shows where you are)</li>
            </ul>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">Expected output:</strong> Something like: <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">/home/username/projects/my-app</code></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- INTERMEDIATE CHALLENGES -->
  <h5 style="color: #58a6ff; margin-top: 2.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 700;">
    <i class="bi bi-arrow-right-circle-fill" style="color: #58a6ff; font-size: 1.1rem;"></i> Intermediate Challenges
  </h5>

  <!-- Challenge 4 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 4: Find and Count Files</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">In your home directory, how many files have a <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">.txt</code> extension? Use a pipe to count them.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans4" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans4" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">find ~ -name "*.txt" | wc -l</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">find ~</code> — Search in home directory</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-name "*.txt"</code> — Match files ending in .txt (asterisk * means any characters)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">|</code> — Pipe (send results to next command)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">wc -l</code> — Count lines (each file = one line)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 5 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 5: Copy and Preserve Permissions</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Copy a file from your home directory to an archive folder while preserving its original permissions and timestamps.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans5" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans5" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">mkdir -p ~/archive
cp -p ~/myfile.txt ~/archive/myfile.txt
ls -l ~/myfile.txt ~/archive/myfile.txt
# Compare the timestamps and permissions</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">mkdir -p ~/archive</code> — Create archive folder if it doesn't exist</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">cp</code> — Copy file</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-p</code> — Preserve flag (keeps original permissions, ownership, timestamps)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">ls -l</code> — List to verify permissions match</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 6 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 6: Search Text in Files</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Find all lines containing the word "error" (case-insensitive) in a log file, then count how many there are.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans6" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans6" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">grep -i "error" logfile.log | wc -l
# Or to see the actual lines:
grep -i "error" logfile.log</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">grep</code> — Search for text in a file</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-i</code> — Ignore case (matches ERROR, Error, error, etc.)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">"error"</code> — The text pattern to search for</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">logfile.log</code> — The file to search in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ADVANCED CHALLENGES -->
  <h5 style="color: #58a6ff; margin-top: 2.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 700;">
    <i class="bi bi-lightning-charge-fill" style="color: #58a6ff; font-size: 1.1rem;"></i> Advanced Challenges
  </h5>

  <!-- Challenge 7 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 7: Batch File Operations</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Find all <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">.log</code> files in your entire home directory that are older than 30 days and display them with their sizes.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans7" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans7" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">find ~ -type f -name "*.log" -mtime +30 -ls</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">find ~</code> — Search starting from home directory</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-type f</code> — Only files (not directories)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-name "*.log"</code> — Match .log files</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-mtime +30</code> — Modified more than 30 days ago (+ means older than)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-ls</code> — Display results in long format (shows size)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 8 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 8: Secure File Removal</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Remove all files from a directory but ask for confirmation before removing each one to be extra safe.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans8" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans8" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">rm -i directory_name/*
# -i will prompt before deleting each file
# Answer 'y' to delete or 'n' to skip</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">rm</code> — Remove command</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">-i</code> — Interactive mode (asks before deleting)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">directory_name/*</code> — All files in the directory (asterisk * matches everything)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 9 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 9: Analyze File Content</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Display the last 20 lines of a log file, then filter to only show "WARNING" lines, sort them alphabetically, and remove duplicates.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans9" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans9" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">tail -20 logfile.log | grep "WARNING" | sort | uniq</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does (left to right):</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">tail -20</code> — Show last 20 lines of the file</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">|</code> — Pipe (send output to next command)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">grep "WARNING"</code> — Keep only lines containing "WARNING"</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">sort</code> — Sort alphabetically</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">uniq</code> — Remove duplicate lines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Challenge 10 -->
  <div style="background: rgba(22, 27, 34, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); border-radius: 12px; margin-bottom: 1.5rem; padding: 1.5rem;">
    <h4 style="color: #58a6ff; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600;">Challenge 10: Combine and Verify Files</h4>
    <p style="margin: 0.75rem 0; color: #e6edf3;"><strong>Your Task:</strong></p>
    <p style="margin: 0.75rem 0; color: #c9d1d9;">Combine all <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">*.txt</code> files in your current directory into one file called <code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">combined.txt</code>, then verify its size and line count.</p>
    <div class="accordion accordion-flush" style="margin-top: 1rem;">
      <div class="accordion-item" style="background: transparent; border: none; border-top: 1px solid rgba(82, 121, 255, 0.15);">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ans10" aria-expanded="false" style="background: transparent; color: #79c0ff; padding: 0.5rem 0; font-weight: 500;">
            <i class="bi bi-chevron-down" style="color: #79c0ff;"></i> Show Answer
          </button>
        </h2>
        <div id="ans10" class="accordion-collapse collapse">
          <div class="accordion-body" style="padding: 1rem 0;">
            <pre class="doc-code-block"><code class="language-bash">cat *.txt > combined.txt
# Verify the result:
ls -lh combined.txt
wc -l combined.txt</code></pre>
            <p style="margin: 1rem 0 0 0; color: #8b949e;"><strong style="color: #d2a8ff;">What each part does:</strong></p>
            <ul style="color: #8b949e; margin: 0.5rem 0;">
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">cat *.txt</code> — Read and display all .txt files</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">></code> — Redirect (save output to a file instead of showing it)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">combined.txt</code> — Save everything into this new file</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">ls -lh</code> — List file with human-readable size (-h = human readable)</li>
              <li><code style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(82, 121, 255, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; color: #79c0ff;">wc -l</code> — Count lines in the file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
