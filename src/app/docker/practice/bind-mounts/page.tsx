"use client";

import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    command: string;
    hint?: string;
}

const bindMountTasks: Task[] = [
    {
        id: 1,
        title: "Create a Basic Bind Mount",
        description: "Mount your current directory's 'html' folder to the Nginx default web directory.",
        command: "docker run -d --name web-server --mount type=bind,source=\"$(pwd)\"/html,target=/usr/share/nginx/html nginx",
        hint: "To find this path: 1. Check Docker Hub docs. 2. Run 'docker image inspect nginx'. 3. Run a temp container and check /etc/nginx/conf.d/default.conf."
    },
    {
        id: 2,
        title: "The User Identity (UID/GID)",
        description: "Run a container using your host user's identity to avoid root-owned files in the mount.",
        command: "docker run -d --user $(id -u):$(id -g) --mount type=bind,source=\"$(pwd)\",target=/app alpine sleep 1000",
        hint: "$(id -u) and $(id -g) ensure the container writes files that you still own on the host."
    },
    {
        id: 3,
        title: "Read-Only Security",
        description: "Mount a 'config' directory as read-only so the container cannot modify your host files.",
        command: "docker run -d --mount type=bind,source=\"$(pwd)\"/config,target=/etc/app/config,readonly nginx",
        hint: "Adding ',readonly' is a critical security best practice for config files."
    },
    {
        id: 4,
        title: "The Absolute Path Trap",
        description: "Try to create a bind mount using a relative path like './html' and observe the error.",
        command: "docker run --mount type=bind,source=./html,target=/app nginx",
        hint: "This will FAIL. Docker --mount syntax strictly requires absolute paths for the source."
    },
    {
        id: 5,
        title: "The Overwrite Shadow",
        description: "Mount an empty host folder over a container directory that already has files (like /etc).",
        command: "mkdir ./empty\ndocker run --rm --mount type=bind,source=\"$(pwd)\"/empty,target=/etc alpine ls /etc",
        hint: "DANGER: This hides all system configs in /etc. The container would likely crash in a real app. This proves Bind Mounts REPLACE the directory view entirely; they do NOT merge files."
    },
    {
        id: 6,
        title: "Live Code Reloading",
        description: "Verify that changing a file on the host reflects inside the container instantly.",
        command: "echo 'v1' > html/index.html\ndocker exec web-server cat /usr/share/nginx/html/index.html",
        hint: "This is why developers love bind mounts—no need to rebuild the image for every change."
    },
    {
        id: 7,
        title: "Inspect the Portal",
        description: "Use docker inspect to find the 'Mounts' section and verify the Source and Destination.",
        command: "docker inspect web-server --format '{{ json .Mounts }}'",
        hint: "Pro Tip: If you forget the --format code, just use 'docker inspect web-server | grep -A 10 Mounts' to find it manually."
    },
    {
        id: 8,
        title: "Finding the Target",
        description: "Use image inspect to find where a container expects its data (the WorkingDir).",
        command: "docker image inspect nginx --format '{{ .Config.WorkingDir }}'",
        hint: "Shortcut: If you don't want to memorize .Config.WorkingDir, just run 'docker image inspect nginx | grep WorkingDir'."
    },
    {
        id: 9,
        title: "The Single File Sniper",
        description: "Mount a single file (not a folder) from your host to a specific file path inside a container.",
        command: "touch my-config.conf\ndocker run --rm -v $(pwd)/my-config.conf:/etc/app.conf alpine ls -l /etc/app.conf",
        hint: "IMPORTANT: Types must match! If your source is a FILE, your target path must also end in a FILENAME (e.g. /etc/app.conf). You cannot mount a file over a directory."
    },
    {
        id: 10,
        title: "Mount Propagation (Boss Level)",
        description: "Set a bind mount to 'rshared' propagation so sub-mounts are visible to both host and container.",
        command: "docker run -d --mount type=bind,source=\"$(pwd)\",target=/app,bind-propagation=rshared alpine sleep 1000",
        hint: "This is high-level DCA material. Propagation defines if mounts inside the mount are shared."
    },
    {
        id: 11,
        title: "The -v Phantom Trap",
        description: "Observe how -v creates a directory if the source doesn't exist (DANGEROUS).",
        command: "docker run --rm -v $(pwd)/missing-folder:/data alpine ls /data\nls -d missing-folder",
        hint: "Docker automatically creates 'missing-folder' as ROOT on your host. This is a common DCA question!"
    },
    {
        id: 12,
        title: "The --mount Safety Net",
        description: "Contrast the previous task by using --mount with a missing directory.",
        command: "docker run --mount type=bind,source=\"$(pwd)\"/not-here,target=/data alpine",
        hint: "This will ERROR. --mount is preferred because it prevents you from accidentally creating 'phantom' folders on your host."
    }
];

function PracticeCard({ task }: { task: Task }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="doc-section-card shadow-sm mb-4 border-info">
            <div className="doc-card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <span className="badge bg-info text-dark mb-2">Drill #{task.id}</span>
                        <h4 className="fw-bold text-light">{task.title}</h4>
                    </div>
                    <button 
                        onClick={() => setRevealed(!revealed)}
                        className={`btn btn-sm ${revealed ? 'btn-outline-secondary' : 'btn-info text-dark fw-bold'}`}
                    >
                        {revealed ? 'Hide Solution' : 'Reveal CLI'}
                    </button>
                </div>
                
                <p className="text-secondary mb-3">{task.description}</p>
                
                {revealed && (
                    <div className="animate-fade-in">
                        <pre className="doc-code-block mb-2 border-info text-info bg-dark">
                            {task.command}
                        </pre>
                        {task.hint && (
                            <div className="x-small text-secondary opacity-75 italic">
                                <i className="bi bi-lightbulb me-1"></i> {task.hint}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BindMountPracticePage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5">
                <h1 className="doc-section-title">Daily Drill: Bind Mounts</h1>
                <p className="text-secondary">Master the portal between your host and the container. Absolute paths and permissions are key.</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {bindMountTasks.map(task => (
                        <PracticeCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-5">
                <p className="small text-secondary">Diamond Level Mastery: Don't just run commands, understand the "Why".</p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/practice/volumes" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Back to Volumes
                    </a>
                    <a href="/storage/labs/bind-mounts" className="btn btn-outline-info">
                        Back to Lab <i className="bi bi-flask ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
