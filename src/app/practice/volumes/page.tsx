"use client";

import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    command: string;
    hint?: string;
}

const volumeTasks: Task[] = [
    {
        id: 1,
        title: "Create a Volume",
        description: "Create a new named volume called 'dev-storage'.",
        command: "docker volume create dev-storage",
        hint: "Named volumes are the preferred way to manage persistent data."
    },
    {
        id: 2,
        title: "Inspect Volume",
        description: "Find the physical host location (Mountpoint) of the 'dev-storage' volume.",
        command: "docker volume inspect dev-storage",
        hint: "Look for the 'Mountpoint' field in the JSON output."
    },
    {
        id: 3,
        title: "Mount the Volume",
        description: "Run an interactive ubuntu container named 'helper' and mount 'dev-storage' to '/data'.",
        command: "docker run -it --name helper --mount type=volume,source=dev-storage,target=/data ubuntu bash",
        hint: "Use the --mount flag with type=volume."
    },
    {
        id: 4,
        title: "Write Data",
        description: "Inside the 'helper' container, create a file named 'hello.txt' inside the /data folder.",
        command: "echo 'Persistent Data' > /data/hello.txt",
        hint: "Since /data is the volume mount point, this file will survive container deletion."
    },
    {
        id: 5,
        title: "Cross-Container Sharing",
        description: "Run a second container named 'reader' and mount the same 'dev-storage' volume to '/app'.",
        command: "docker run -d --name reader --mount type=volume,source=dev-storage,target=/app nginx",
        hint: "Both containers will now see and can modify the exact same files."
    },
    {
        id: 6,
        title: "The Security Guard (Read-Only)",
        description: "Run a container named 'secure-reader' and mount 'dev-storage' as read-only.",
        command: "docker run -d --name secure-reader --mount type=volume,source=dev-storage,target=/app,readonly nginx",
        hint: "Adding ',readonly' prevents the container from modifying the volume. Critical for security."
    },
    {
        id: 7,
        title: "The Anonymous Ghost",
        description: "Run a container with a volume but WITHOUT giving it a name. Then find it in 'docker volume ls'.",
        command: "docker run -d --mount type=volume,target=/data nginx && docker volume ls",
        hint: "You will see a volume with a long random hash. This is an 'Anonymous Volume'."
    },
    {
        id: 8,
        title: "Volume Resurrection",
        description: "Delete your 'helper' container, start a NEW one named 'new-helper', and check if 'hello.txt' is still there.",
        command: "docker rm -f helper && docker run --rm -it --name new-helper --mount type=volume,source=dev-storage,target=/data ubuntu ls /data",
        hint: "This proves that volumes decouple data from the container's lifecycle."
    },
    {
        id: 9,
        title: "The Survival Test (Dangling)",
        description: "Remove all remaining containers, then check if 'dev-storage' still exists.",
        command: "docker rm -f reader secure-reader && docker volume ls",
        hint: "Volumes are 'dangling' when no container uses them, but they are NOT deleted automatically."
    },
    {
        id: 10,
        title: "Bulk Cleanup (Prune)",
        description: "Remove all 'dangling' (unused) volumes from your system at once.",
        command: "docker volume prune",
        hint: "Prune only affects volumes NOT attached to any container."
    },
    {
        id: 11,
        title: "Delete Specific Volume",
        description: "Permanently delete the 'dev-storage' volume.",
        command: "docker volume rm dev-storage",
        hint: "Use this for precise cleanup of named resources."
    }
];

function PracticeCard({ task }: { task: Task }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="doc-section-card shadow-sm mb-4 border-success">
            <div className="doc-card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <span className="badge bg-success text-dark mb-2">Task #{task.id}</span>
                        <h4 className="fw-bold text-light">{task.title}</h4>
                    </div>
                    <button 
                        onClick={() => setRevealed(!revealed)}
                        className={`btn btn-sm ${revealed ? 'btn-outline-secondary' : 'btn-success text-dark fw-bold'}`}
                    >
                        {revealed ? 'Hide Solution' : 'Reveal CLI'}
                    </button>
                </div>
                
                <p className="text-secondary mb-3">{task.description}</p>
                
                {revealed && (
                    <div className="animate-fade-in">
                        <pre className="doc-code-block mb-2 border-success text-success bg-dark">
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

export default function VolumePracticePage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5">
                <h1 className="doc-section-title">Daily Drill: Volumes</h1>
                <p className="text-secondary">Persistent storage requires practice. Can you remember the --mount syntax?</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {volumeTasks.map(task => (
                        <PracticeCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-5">
                <p className="small text-secondary">Great work! Keep practicing daily to build muscle memory.</p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/practice/containers" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Back to Containers
                    </a>
                    <a href="/storage/labs/volumes" className="btn btn-outline-info">
                        Back to Lab <i className="bi bi-flask ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
