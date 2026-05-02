"use client";

import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    command: string;
    hint?: string;
}

const containerTasks: Task[] = [
    {
        id: 1,
        title: "Pull the Image",
        description: "Pull the latest official Nginx image from Docker Hub.",
        command: "docker pull nginx:latest",
        hint: "Use the 'pull' command followed by the image name and tag."
    },
    {
        id: 2,
        title: "Run a Container",
        description: "Start a new container named 'web-server' in the background.",
        command: "docker run -d --name web-server nginx",
        hint: "Don't forget the -d flag for detached mode."
    },
    {
        id: 3,
        title: "List All Containers",
        description: "List all containers, including those that have stopped.",
        command: "docker ps -a",
        hint: "Essential for finding containers that crashed on startup."
    },
    {
        id: 4,
        title: "Container Logs",
        description: "Fetch the logs of the 'web-server' container.",
        command: "docker logs web-server",
        hint: "The first place you look when things go wrong."
    },
    {
        id: 5,
        title: "Deep Investigation",
        description: "Use the inspect command to find the IP address of the 'web-server'.",
        command: "docker inspect web-server | grep IPAddress",
        hint: "Inspect returns a massive JSON; grep helps you filter it."
    },
    {
        id: 6,
        title: "Process Monitoring",
        description: "See the actual Linux processes running inside the container.",
        command: "docker top web-server",
        hint: "Shows PID and user info inside the container namespace."
    },
    {
        id: 7,
        title: "Environment Variables",
        description: "Run a container and pass an environment variable named 'APP_COLOR=blue'.",
        command: "docker run -d --name env-app -e APP_COLOR=blue nginx",
        hint: "Use the -e flag to pass configuration to your applications."
    },
    {
        id: 8,
        title: "Resource Constraints",
        description: "Run a container and limit it to exactly 512MB of RAM.",
        command: "docker run -d --name limited-app --memory='512m' nginx",
        hint: "Critical for production stability."
    },
    {
        id: 9,
        title: "Restart Policies",
        description: "Run a container that will automatically restart unless manually stopped.",
        command: "docker run -d --name persistent-app --restart unless-stopped nginx",
        hint: "A core DCA requirement for service reliability."
    },
    {
        id: 10,
        title: "Filesystem Diff",
        description: "See every file that has been changed, added, or deleted inside 'web-server'.",
        command: "docker diff web-server",
        hint: "C = Changed, A = Added, D = Deleted."
    },
    {
        id: 11,
        title: "The Name Fix",
        description: "Rename your 'web-server' container to 'prod-web'.",
        command: "docker rename web-server prod-web",
        hint: "Saves you from having to recreate a container."
    },
    {
        id: 12,
        title: "Execute & Investigate",
        description: "Access the bash shell inside 'prod-web' to explore its filesystem.",
        command: "docker exec -it prod-web bash",
        hint: "Use -it (interactive terminal) to stay connected."
    },
    {
        id: 13,
        title: "List All Images",
        description: "See all the images that are currently stored locally.",
        command: "docker images",
        hint: "Shows the size, tag, and ID of your local images."
    },
    {
        id: 14,
        title: "Total Cleanup",
        description: "Remove all containers and all images on the system.",
        command: "docker rm -f $(docker ps -aq) && docker rmi $(docker images -q)",
        hint: "The ultimate reset."
    }
];

function PracticeCard({ task }: { task: Task }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="doc-section-card shadow-sm mb-4 border-info">
            <div className="doc-card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <span className="badge bg-info text-dark mb-2">Task #{task.id}</span>
                        <h4 className="fw-bold text-light">{task.title}</h4>
                    </div>
                    <button 
                        onClick={() => setRevealed(!revealed)}
                        className={`btn btn-sm ${revealed ? 'btn-outline-secondary' : 'btn-info'}`}
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

export default function ContainerPracticePage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5">
                <h1 className="doc-section-title">Daily Drill: Containers</h1>
                <p className="text-secondary">Sharpen your muscle memory. Try to guess the command before revealing it!</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {containerTasks.map(task => (
                        <PracticeCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-5">
                <p className="small text-secondary">Finished? Move on to the next drill.</p>
                <a href="/practice/volumes" className="btn btn-outline-info">
                    Next: Volumes Drill <i className="bi bi-arrow-right ms-2"></i>
                </a>
            </div>
        </div>
    );
}
