import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Common Linux Commands - Docker Documentation",
  description: "Essential Linux commands for Docker developers - navigation, files, permissions, and command substitution."
};

interface SubCardProps {
  title: string;
  icon: string;
  whatItDoes: string;
  syntax?: string;
  code?: string;
  noobExample: string;
  commonFlags?: { flag: string; desc: string }[];
  related?: string[];
  warning?: string;
  accent?: string;
}

const SubCard: React.FC<SubCardProps> = ({ 
  title, icon, whatItDoes, syntax, code, noobExample, commonFlags, related, warning, accent 
}) => (
  <div className={`doc-sub-card border-${accent || 'secondary'} h-100`}>
    <div className="doc-sub-card-header">
      <div className={`doc-sub-card-icon text-${accent || 'white'}`}><i className={`bi bi-${icon}`}></i></div>
      <h3 className="doc-sub-card-title"><code>{title.split(' ')[0]}</code> {title.includes(' ') ? `— ${title.split(' ').slice(1).join(' ')}` : ''}</h3>
    </div>
    <div className="doc-sub-card-body">
      <p className="text-secondary text-sm"><strong>Purpose:</strong> {whatItDoes}</p>
      
      {syntax && (
        <div className="mb-3">
          <small className="text-uppercase text-secondary opacity-50 fw-bold d-block mb-1">Syntax</small>
          <code className="text-white bg-dark p-2 rounded d-block border border-secondary border-opacity-25">{syntax}</code>
        </div>
      )}

      {code && (
        <pre className="doc-code-block mt-3 mb-3">
          <code className="language-bash">{code}</code>
        </pre>
      )}

      <div className="p-3 rounded bg-dark bg-opacity-50 border border-secondary border-opacity-25 mb-3">
        <small className="text-uppercase text-secondary opacity-50 fw-bold d-block mb-1">Noob Analogy</small>
        <p className="text-secondary text-sm mb-0">{noobExample}</p>
      </div>

      {commonFlags && (
        <div className="mt-3">
          <small className="text-uppercase text-secondary opacity-50 fw-bold d-block mb-1">Common Flags</small>
          <ul className="list-unstyled text-secondary text-sm mb-0">
            {commonFlags.map((f, i) => (
              <li key={i} className="mb-1"><code className="text-white">{f.flag}</code> — {f.desc}</li>
            ))}
          </ul>
        </div>
      )}

      {warning && (
        <div className="mt-3 p-2 rounded bg-danger bg-opacity-10 border border-danger text-danger text-xs">
          <i className="bi bi-exclamation-triangle-fill me-2"></i><strong>Warning:</strong> {warning}
        </div>
      )}
    </div>
  </div>
);

export default function CommonLinuxCommandsPage() {
  return (
    <div className="content-area">
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Common Linux Commands</h1>
          <p className="text-secondary opacity-75 fs-5 mb-0">
            Essential Debian/Ubuntu commands for Docker developers. Navigation, permissions, and shell triggers.
          </p>
        </div>

        <div className="doc-content-grid">

          {/* SECTION: NAVIGATION & IDENTITY */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon"><i className="bi bi-compass-fill"></i></div>
              <h2 className="doc-card-heading">Identity & Navigation</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <SubCard 
                    title="whoami Show Current User"
                    icon="person-circle"
                    whatItDoes="Displays the username of the currently logged-in user."
                    syntax="whoami"
                    code="whoami\n# Output: root"
                    noobExample="Like asking 'Which account am I using right now?' Extremely useful when switching between 'root' and your normal user."
                    accent="primary"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="pwd Print Working Directory"
                    icon="geo-alt-fill"
                    whatItDoes="Shows the full path of the folder you are currently in."
                    syntax="pwd"
                    code="pwd\n# Output: /home/user/projects"
                    noobExample="Like a GPS for your terminal. It tells you exactly where you are standing in the file system."
                    accent="info"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="ls List Files"
                    icon="list-ul"
                    whatItDoes="Lists all files and folders in your current directory."
                    syntax="ls [OPTIONS] [DIRECTORY]"
                    code="ls -la\nls -lh"
                    noobExample="Like opening a folder in File Explorer to see what is inside."
                    commonFlags={[
                      { flag: "-a", desc: "Show hidden files (starting with .)" },
                      { flag: "-l", desc: "Long format (shows sizes, permissions)" },
                      { flag: "-h", desc: "Human readable sizes (KB, MB)" }
                    ]}
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="cd Change Directory"
                    icon="arrow-right-circle"
                    whatItDoes="Moves you into a different folder."
                    syntax="cd [DIRECTORY]"
                    code="cd /var/lib/docker\ncd ..\ncd ~"
                    noobExample="Like double-clicking a folder to open it, or the back button."
                    commonFlags={[
                      { flag: "..", desc: "Go up one level" },
                      { flag: "~", desc: "Jump to home folder" },
                      { flag: "-", desc: "Go back to previous folder" }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: FILE OPERATIONS */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon"><i className="bi bi-files"></i></div>
              <h2 className="doc-card-heading">File & Directory Management</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-md-6 col-lg-4">
                  <SubCard 
                    title="mkdir Make Directory"
                    icon="folder-plus"
                    whatItDoes="Creates a brand new folder."
                    syntax="mkdir [OPTIONS] DIRECTORY"
                    code="mkdir my-project\nmkdir -p a/b/c"
                    noobExample="Right-clicking and choosing 'New Folder'."
                    commonFlags={[
                      { flag: "-p", desc: "Create parents - builds nested folders all at once." }
                    ]}
                  />
                </div>
                <div className="col-md-6 col-lg-4">
                  <SubCard 
                    title="cp Copy Files"
                    icon="files"
                    whatItDoes="Copies files or folders to a new location."
                    syntax="cp [OPTIONS] SOURCE DEST"
                    code="cp config.json config.backup.json\ncp -r folder/ backup/"
                    noobExample="Copy and Paste (Ctrl+C, Ctrl+V)."
                    commonFlags={[
                      { flag: "-r", desc: "Recursive - needed for copying entire folders." }
                    ]}
                  />
                </div>
                <div className="col-md-6 col-lg-4">
                  <SubCard 
                    title="mv Move / Rename"
                    icon="arrow-left-right"
                    whatItDoes="Moves files or renames them."
                    syntax="mv [OPTIONS] SOURCE DEST"
                    code="mv old-name.txt new-name.txt\nmv f.txt ~/docs/"
                    noobExample="Renaming a file or cutting and pasting (Ctrl+X, Ctrl+V)."
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="rm Remove Files"
                    icon="trash3-fill"
                    whatItDoes="Deletes files or folders permanently."
                    syntax="rm [OPTIONS] FILE"
                    code="rm unwanted.log\nrm -rf /tmp/cache/"
                    noobExample="Throwing something in the trash, but there is NO Recycle Bin. Once deleted, it is gone forever."
                    commonFlags={[
                      { flag: "-r", desc: "Recursive (for folders)" },
                      { flag: "-f", desc: "Force (don't ask for permission)" }
                    ]}
                    warning="rm is immediate and permanent. There is no undo."
                    accent="danger"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="touch Create Empty File"
                    icon="file-earmark-plus"
                    whatItDoes="Creates a new empty file or updates the timestamp of an existing one."
                    syntax="touch FILE"
                    code="touch environment.env\ntouch Dockerfile"
                    noobExample="Like creating a 'New Text Document' in a folder."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: THE SHELL GAME CHANGER */}
          <div className="doc-section-card shadow-lg col-12 border-primary">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon text-primary"><i className="bi bi-lightning-fill"></i></div>
              <h2 className="doc-card-heading">The Shell Game-Changer: $()</h2>
            </div>
            <div className="doc-card-body">
              <h3 className="text-white fs-5 mb-3 font-monospace">Command Substitution</h3>
              <p className="text-secondary mb-4">
                Command substitution allows you to take the <strong>output</strong> of one command and use it as an <strong>argument</strong> for another. 
                This is how you perform bulk actions in Docker.
              </p>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-secondary border-opacity-25 shadow-sm">
                    <h4 className="text-info fs-6 mb-3">The "Math" Analogy</h4>
                    <p className="text-secondary text-sm">
                      Think of it like a math equation with parentheses: <code>5 * (2 + 3)</code>. <br/><br/>
                      You solve the inside <code>(2 + 3)</code> first, get <code>5</code>, and then the main formula becomes <code>5 * 5</code>. 
                      In Linux, Docker solves the command inside <code>$()</code> first, and then hands the result to the main command.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-4 rounded bg-dark border border-primary border-opacity-25 shadow-sm">
                    <h4 className="text-primary fs-6 mb-3">The "Nuke" Example</h4>
                    <code className="d-block p-2 bg-dark rounded border border-primary text-primary text-xs mb-3">
                      docker rm -f $(docker ps -aq)
                    </code>
                    <p className="text-secondary text-sm mb-0">
                      1. First, Docker runs <code>docker ps -aq</code> to find all container IDs.<br/>
                      2. Then, it plugs those IDs into <code>docker rm -f [LIST_OF_IDS]</code>.<br/>
                      3. Result: Every container is instantly deleted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: SEARCH & VIEWING */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon"><i className="bi bi-search"></i></div>
              <h2 className="doc-card-heading">Searching & Inspecting</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <SubCard 
                    title="cat Concatenate / View"
                    icon="file-text"
                    whatItDoes="Displays the entire contents of a file on your screen."
                    syntax="cat FILE"
                    code="cat Dockerfile\ncat config.yml"
                    noobExample="Like opening a text file just to read what is inside."
                    accent="info"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="grep Global Search"
                    icon="search"
                    whatItDoes="Finds specific text inside a file or output."
                    syntax="grep [OPTIONS] PATTERN FILE"
                    code="grep 'error' logs.txt\ndocker ps | grep nginx"
                    noobExample="Like using Ctrl+F to find a word in a huge document."
                    commonFlags={[
                      { flag: "-i", desc: "Ignore case (finds Error or error)" },
                      { flag: "-v", desc: "Invert match (show lines WITHOUT the word)" }
                    ]}
                    accent="success"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="tail View Tail"
                    icon="arrow-bar-down"
                    whatItDoes="Shows the very end of a file. Perfect for logs."
                    syntax="tail [OPTIONS] FILE"
                    code="tail -f app.log\ntail -n 50 app.log"
                    noobExample="Like scrolling to the very bottom of a chat thread to see the latest messages."
                    commonFlags={[
                      { flag: "-f", desc: "Follow - wait and show new lines as they appear." },
                      { flag: "-n", desc: "Number of lines (e.g. -n 50)." }
                    ]}
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="find Find Files"
                    icon="binoculars"
                    whatItDoes="Searches for files and folders across your whole machine."
                    syntax="find [PATH] -name 'PATTERN'"
                    code="find . -name '*.js'\nfind / -name Dockerfile"
                    noobExample="The system-wide Search bar, but much faster and more powerful."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: PERMISSIONS */}
          <div className="doc-section-card shadow-lg col-12">
            <div className="doc-card-header-wrapper">
              <div className="heading-icon"><i className="bi bi-shield-lock-fill"></i></div>
              <h2 className="doc-card-heading">Permissions & Ownership</h2>
            </div>
            <div className="doc-card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <SubCard 
                    title="chmod Change Mode"
                    icon="key-fill"
                    whatItDoes="Changes who can read, write, or run (execute) a file."
                    syntax="chmod [PERMISSIONS] FILE"
                    code="chmod +x script.sh\nchmod 755 config.json"
                    noobExample="Like setting a folder to 'Read Only' or 'Hidden'."
                    accent="warning"
                  />
                </div>
                <div className="col-md-6">
                  <SubCard 
                    title="chown Change Owner"
                    icon="person-fill-lock"
                    whatItDoes="Changes which user owns a specific file."
                    syntax="chown USER[:GROUP] FILE"
                    code="chown root:root settings.conf"
                    noobExample="Like transferring ownership of a car from one person to another."
                    accent="warning"
                  />
                </div>
                <div className="col-md-12">
                  <SubCard 
                    title="sudo SuperUser Do"
                    icon="lightning-charge-fill"
                    whatItDoes="Runs a command with administrator (root) privileges."
                    syntax="sudo COMMAND"
                    code="sudo apt update\nsudo su"
                    noobExample="Like 'Run as Administrator' on Windows. It gives you the power to do everything."
                    warning="sudo can break your system if used incorrectly. Never use it unless needed."
                    accent="danger"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
