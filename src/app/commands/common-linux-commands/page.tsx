import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Common Linux Commands (Debian-Based) - Docker Documentation",
  description: "Essential Linux commands for Docker developers - covers file operations, navigation, permissions, processes, and more on Debian/Ubuntu systems."
};

export default function CommonLinuxCommandsDebianBasedPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Common Linux Commands (Debian-Based)</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Essential Linux commands for Docker developers - covers file operations, navigation, permissions, processes, and more on Debian/Ubuntu systems.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION */}
          <div className="doc-section-card shadow-lg">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon">
                <i className={"bi " + "bi-terminal-fill"}></i>
              </div>
              <h2 className="doc-card-heading">Common Linux Commands</h2>
            </div>
            <div className="doc-card-body">
              <div dangerouslySetInnerHTML={{ __html: `<p>Master these essential Debian/Ubuntu commands to work efficiently in Docker containers and Linux environments. Each command is shown with its technical purpose, a beginner-friendly example, and all parameter meanings.</p>` }} />

              <div dangerouslySetInnerHTML={{ __html: `<div class="doc-sub-cards-grid d-flex flex-column gap-3 mb-4">
  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-person-circle"></i></div><h3 class="doc-sub-card-title"><code>whoami</code> — Show Current User</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Displays the username of the currently logged-in user.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>whoami</code>
      <pre class="doc-code-block"><code class="language-bash">whoami
# Output: john</code></pre>
      <p><strong>Noob Example:</strong> <code>whoami</code> asks the system "Who am I?" and it tells you your username. Useful to double-check which user account you're running commands as.</p>
      <p><strong>Common Output:</strong></p>
      <ul><li><code>root</code> — You're the administrator (be careful!)</li>
      <li><code>john</code> — You're logged in as the user 'john'</li>
      <li><code>www-data</code> — Running as a web server process</li></ul>
      <p><strong>Related Commands:</strong></p>
      <ul><li><code>id</code> — Show user ID, group ID, and all groups you're in</li>
      <li><code>groups</code> — List which groups you belong to</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-globe"></i></div><h3 class="doc-sub-card-title">View Your IP Address</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Check Local IP (your network):</strong></p>
      <code>hostname -I</code>
      <pre class="doc-code-block"><code class="language-bash">hostname -I
# Output: 192.168.1.100 10.0.0.5

ip addr
ifconfig</code></pre>
      <p><strong>Check Public IP (internet-facing):</strong></p>
      <code>curl ifconfig.me</code>
      <pre class="doc-code-block"><code class="language-bash">curl ifconfig.me
# Output: 203.45.123.78

curl -s icanhazip.com
wget -qO- https://checkip.amazonaws.com</code></pre>
      <p><strong>What's the Difference?</strong></p>
      <ul><li><strong>Local IP</strong> (192.168.x.x, 10.x.x.x) — Your address on your internal network. Used for docker containers and local communication.</li>
      <li><strong>Public IP</strong> — Your external IP visible to the internet. Used when services need to be accessed remotely or for debugging connection issues.</li></ul>
      <p><strong>Common Commands:</strong></p>
      <ul><li><code>hostname -I</code> — Simple, shows all local IPs</li>
      <li><code>ip addr</code> — Detailed network info (modern systems)</li>
      <li><code>ifconfig</code> — Network interfaces (older systems)</li>
      <li><code>curl ifconfig.me</code> — Public IP (requires internet)</li></ul>
    </div>
  </div>

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
      <p><strong>️ WARNING:</strong> <code>rm</code> is permanent! There's no undo. Always be careful!</p>
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
      <code>find [PATH] [OPTIONS] [EXPRESSION]</code>
      <pre class="doc-code-block"><code class="language-bash">find . -name "*.log"
find /home -type f -size +10M
find . -mtime -7
find ~ -name "Dockerfile" -type f
find . -maxdepth 2 -name "*.py"
find . -type f -name "test_*" ! -path "*/node_modules/*"</code></pre>
      <p><strong>What it does:</strong> Recursively searches for files by name, size, date, or other properties. By default, it searches the entire directory tree below the given path.</p>
      <p><strong>Noob Example:</strong> <code>find . -name "*.log"</code> is like using File Explorer's search to find all .log files, but it looks inside every subfolder too.</p>
      <p><strong>Common Flags:</strong></p>
      <ul><li><code>-name PATTERN</code> — Search by filename (glob pattern with * and ?)</li>
      <li><code>-type f</code> — Find only files (not folders)</li>
      <li><code>-type d</code> — Find only directories</li>
      <li><code>-size +10M</code> — Find files larger than 10MB (+ means greater, - means less)</li>
      <li><code>-mtime -7</code> — Files modified in last 7 days</li>
      <li><code>-maxdepth N</code> — Limit search depth (prevents deep recursion). <code>-maxdepth 1</code> searches only current dir, <code>-maxdepth 2</code> searches 2 levels deep</li>
      <li><code>-not EXPRESSION</code> or <code>! EXPRESSION</code> — Exclude matches (invert the condition)</li></ul>
      <p style="color: #79c0ff; margin-top: 1rem;"><strong> Recursion Gotcha:</strong> <code>find</code> automatically descends into ALL subdirectories. If you run <code>find /</code> on a large system, it can take forever! Use <code>-maxdepth</code> to limit how deep it searches, or <code>-not -path</code> to exclude certain directories like <code>-not -path "*/node_modules/*"</code>.</p>
      <p style="color: #c9d1d9; margin-top: 0.5rem;"><strong>Examples with -maxdepth and -not:</strong></p>
      <ul style="color: #8b949e;"><li><code>find . -maxdepth 1 -type f</code> — Files only in current directory (not subfolders)</li>
      <li><code>find . -maxdepth 3 -name "*.js"</code> — JS files up to 3 levels deep</li>
      <li><code>find . -type f ! -name "*.log"</code> — All files EXCEPT .log files</li>
      <li><code>find . -type f -not -path "./.git/*"</code> — Files but exclude .git directory</li>
      <li><code>find . -name "*.pyc" ! -path "*/venv/*"</code> — Python compiled files, but skip virtual env</li></ul>
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
      <p><strong>The Three Permission Categories:</strong></p>
      <ul><li><strong>User (Owner)</strong> — The person who owns the file</li>
      <li><strong>Group</strong> — A group of users (usually defined by the system)</li>
      <li><strong>Others</strong> — Everyone else on the system</li></ul>
      <p><strong>Understanding the Numbers:</strong></p>
      <p>Each digit in chmod represents one category. For example, <code>chmod 755 file</code>:</p>
      <ul><li><code>7</code> (User) = Read + Write + Execute (4+2+1)</li>
      <li><code>5</code> (Group) = Read + Execute (4+1)</li>
      <li><code>5</code> (Others) = Read + Execute (4+1)</li></ul>
      <p>So 755 means: Owner can do everything, but Group and Others can only read and execute (not modify).</p>
      <p><strong>Permission values:</strong> Read=4, Write=2, Execute=1. Add them up: 4+2+1=7 (rwx), 4+1=5 (r-x), 4=4 (r--).</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>chmod +x file</code> — Make executable for all</li>
      <li><code>chmod -w file</code> — Remove write permission from all</li>
      <li><code>chmod 755 file</code> — Owner: read+write+execute, Group: read+execute, Others: read+execute</li>
      <li><code>chmod 644 file</code> — Owner: read+write, Group: read only, Others: read only</li>
      <li><code>chmod 600 file</code> — Owner: read+write, Group: nothing, Others: nothing (most secure)</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-person-check"></i></div><h3 class="doc-sub-card-title"><code>chown</code> — Change Owner</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>Full Syntax:</strong></p>
      <code>chown [OPTIONS] USER[:GROUP] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">chown john file.txt
chown john:developers file.txt
chown :admin file.txt
chown -R newuser:newgroup /path/to/directory
sudo chown root:root /etc/config.ini</code></pre>
      <p><strong>What it does:</strong> Changes who owns a file (the user and optionally the group). Different from chmod — this is about WHO owns it, not WHAT they can do with it.</p>
      <p><strong>Noob Example:</strong> <code>chown john file.txt</code> is like transferring ownership of a document to John. John is now the owner.</p>
      <p><strong>Common Usage:</strong></p>
      <ul><li><code>chown newuser file</code> — Change owner to newuser</li>
      <li><code>chown newuser:newgroup file</code> — Change owner AND group</li>
      <li><code>chown :newgroup file</code> — Change only the group (keep owner the same)</li>
      <li><code>chown -R user:group /folder</code> — Recursively change ownership of entire folder and contents</li></ul>
      <p style="color: #79c0ff; margin-top: 1rem;"><strong>Important Difference:</strong> <code>chmod</code> changes PERMISSIONS (read/write/execute). <code>chown</code> changes OWNERSHIP. A file can be owned by root but readable by everyone, for example.</p>
      <p style="color: #8b949e; margin-top: 0.5rem;"><strong>Note:</strong> Only root or the owner can change ownership. Usually requires <code>sudo</code>.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-question-circle"></i></div><h3 class="doc-sub-card-title">Why chown instead of chmod 777?</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>The Core Difference:</strong></p>
      <ul><li><code>chown</code> = WHO owns the file (assigns responsibility)</li>
      <li><code>chmod</code> = WHAT permissions they have (read/write/execute)</li></ul>
      <p><strong>Why chmod 777 is terrible:</strong></p>
      <ul><li><code>chmod 777</code> means ANYONE on the system can read, write, and execute your file. Total security nightmare.</li>
      <li>It's lazy and dangerous — like giving keys to your house to every neighbor instead of just giving one to the person who needs it</li>
      <li>The right way uses both commands: assign owner with <code>chown</code>, then restrict access with <code>chmod</code></li></ul>
      <p><strong>Real-world example:</strong></p>
      <pre class="doc-code-block"><code class="language-bash">WRONG: chmod 777 config.ini (everyone can see your secrets!)

RIGHT: 
chown www-data:www-data config.ini
chmod 640 config.ini
(only www-data user and group can read it)</code></pre>
      <p><strong>Why it matters:</strong> System processes (nginx, postgres, docker) run as specific users. They need files owned by them. You can't fix this with chmod 777 — you need the right owner. Plus permissions like 640 (owner reads/writes, group reads, others nothing) are vastly more secure.</p>
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
      <p><strong>Getting Out of sudo su:</strong></p>
      <ul><li><code>exit</code> — Leave the root session and return to your user</li>
      <li><code>Ctrl+D</code> — Also exits the root session (keyboard shortcut)</li>
      <li><code>logout</code> — Alternative way to exit</li></ul>
      <p><strong>Example:</strong></p>
      <pre class="doc-code-block"><code class="language-bash">user@host:~$ sudo su
root@host:/home/user# exit
user@host:~$</code></pre>
      <p><strong>Note:</strong> When you're root, your prompt shows <code>#</code> instead of <code>$</code>. Once you exit, you're back to your normal user.</p>
      <p><strong>️ WARNING:</strong> sudo can delete everything or brick your system. Only use when necessary!</p>
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
echo -e "Line1
Line2"</code></pre>
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
      <code>echo [TEXT]</code>
      <pre class="doc-code-block"><code class="language-bash">echo "Hello, World!"
echo $HOME
echo "text" > file.txt
echo "text" >> file.txt
echo -e "Line1
Line2"</code></pre>
      <p><strong>Noob Example:</strong> <code>echo "Hello, World!"</code> prints "Hello, World!"</p>
      <p><strong>Common Uses:</strong></p>
      <ul><li><code>echo $HOME</code> — Print home directory path</li>
      <li><code>echo "text" > file.txt</code> — Write text to a file</li>
      <li><code>echo "text" >> file.txt</code> — Append text to a file</li>
      <li><code>echo -e "Line1
Line2"</code> — Use escape sequences like 
 for newline</li></ul>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-file-earmark-plus"></i></div><h3 class="doc-sub-card-title"><code>touch</code> — Create or Update File</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Create a new empty file or update the timestamp of an existing file.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>touch [OPTIONS] FILE</code>
      <pre class="doc-code-block"><code class="language-bash">touch newfile.txt
touch file1.txt file2.txt file3.txt
touch -c file.txt
touch -t 202501151430 file.txt</code></pre>
      <p><strong>Noob Example:</strong> <code>touch myfile.txt</code> creates an empty file called myfile.txt if it doesn't exist, or updates its timestamp if it does.</p>
      <p><strong>Common Uses:</strong></p>
      <ul><li><code>touch file.txt</code> — Create a new empty file</li>
      <li><code>touch file1 file2 file3</code> — Create multiple files at once</li>
      <li><code>touch -c file.txt</code> — Update timestamp only if file exists (don't create)</li>
      <li><code>touch -a file.txt</code> — Update only the access time</li>
      <li><code>touch -m file.txt</code> — Update only the modification time</li></ul>
      <p><strong>Pro Tip:</strong> Often used in scripts to create placeholder files or to trigger file-watch systems. Very useful with <code>git</code> to force file synchronization.</p>
    </div>
  </div>

  <div class="doc-sub-card">
    <div class="doc-sub-card-header"><div class="doc-sub-card-icon"><i class="bi bi-gear"></i></div><h3 class="doc-sub-card-title"><code>export</code> — Set Environment Variables</h3></div>
    <div class="doc-sub-card-body">
      <p><strong>What it does:</strong> Create environment variables that programs can access.</p>
      <p><strong>Full Syntax:</strong></p>
      <code>export [NAME=VALUE]</code>
      <pre class="doc-code-block"><code class="language-bash">export API_KEY="secret123"
export PATH=$PATH:/usr/local/bin
export -p
echo $API_KEY</code></pre>
      <p><strong>Noob Example:</strong> <code>export API_KEY="secret123"</code> creates a variable that stays available while you're in that terminal.</p>
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
</div>` }} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
