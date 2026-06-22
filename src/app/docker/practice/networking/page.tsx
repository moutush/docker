"use client";

import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    command: string;
    hint?: string;
}

const networkTasks: Task[] = [
    {
        id: 1,
        title: "List Networks",
        description: "List all Docker networks available on your host.",
        command: "docker network ls",
        hint: "You should see the default 'bridge', 'host', and 'none' networks."
    },
    {
        id: 2,
        title: "Create a Custom Bridge",
        description: "Create a user-defined bridge network named 'production-net'.",
        command: "docker network create production-net",
        hint: "User-defined bridges provide automatic DNS resolution between containers."
    },
    {
        id: 3,
        title: "Create an Internal Network",
        description: "Create a bridge named 'isolated-net' that has NO access to the outside world.",
        command: "docker network create --internal isolated-net",
        hint: "The --internal flag prevents the bridge from creating an iptables NAT rule to the host."
    },
    {
        id: 4,
        title: "Run on Custom Network",
        description: "Run an Nginx container named 'web-srv' attached to 'production-net'.",
        command: "docker run -d --name web-srv --network production-net nginx",
        hint: "Use the --network flag followed by the network name."
    },
    {
        id: 5,
        title: "Port & Host IP Mapping",
        description: "Map host IP 127.0.0.1 and port 8080 to container port 80.",
        command: "docker run -d --name secure-web -p 127.0.0.1:8080:80 nginx",
        hint: "This ensures the container is ONLY accessible from your own machine, not the network."
    },
    {
        id: 6,
        title: "Inspect Network",
        description: "Find the IP addresses of all containers connected to 'production-net'.",
        command: "docker network inspect production-net",
        hint: "Look at the 'Containers' section in the JSON output."
    },
    {
        id: 7,
        title: "Connect on the Fly",
        description: "Connect the existing 'secure-web' container to the 'production-net' network.",
        command: "docker network connect production-net secure-web",
        hint: "A container can be connected to multiple networks simultaneously."
    },
    {
        id: 8,
        title: "The Host Shortcut",
        description: "Run an Nginx container using the 'host' network driver.",
        command: "docker run -d --name host-web --network host nginx",
        hint: "In host mode, the container shares the host's IP and ports directly. No -p is needed!"
    },
    {
        id: 9,
        title: "Static IP Assignment",
        description: "Run a container on 'production-net' with the specific IP address 172.18.0.100.",
        command: "docker run -d --name static-app --network production-net --ip 172.18.0.100 nginx",
        hint: "This requires the network to have a defined subnet."
    },
    {
        id: 10,
        title: "Network Aliases",
        description: "Run a container with the network alias 'db-server' on 'production-net'.",
        command: "docker run -d --name postgres-db --network production-net --network-alias db-server postgres",
        hint: "Other containers can now ping 'db-server' instead of the container name!"
    },
    {
        id: 11,
        title: "Test DNS & Aliases",
        description: "From 'web-srv', try to ping the alias 'db-server'.",
        command: "docker exec -it web-srv ping db-server",
        hint: "Aliases allow you to swap containers behind the scenes without changing app configs."
    },
    {
        id: 12,
        title: "Disconnect and Cleanup",
        description: "Disconnect all containers and then prune all unused networks.",
        command: "docker network disconnect production-net web-srv && docker network prune",
        hint: "Prune only removes user-defined networks, not the default ones."
    }
];

function PracticeCard({ task }: { task: Task }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="doc-section-card shadow-sm mb-4 border-primary">
            <div className="doc-card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <span className="badge bg-primary text-light mb-2">Task #{task.id}</span>
                        <h4 className="fw-bold text-light">{task.title}</h4>
                    </div>
                    <button 
                        onClick={() => setRevealed(!revealed)}
                        className={`btn btn-sm ${revealed ? 'btn-outline-secondary' : 'btn-primary text-light fw-bold'}`}
                    >
                        {revealed ? 'Hide Solution' : 'Reveal CLI'}
                    </button>
                </div>
                
                <p className="text-secondary mb-3">{task.description}</p>
                
                {revealed && (
                    <div className="animate-fade-in">
                        <pre className="doc-code-block mb-2 border-primary text-primary bg-dark">
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

export default function NetworkPracticePage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5">
                <h1 className="doc-section-title">Daily Drill: Networking</h1>
                <p className="text-secondary">Master container communication, bridges, and port publishing.</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {networkTasks.map(task => (
                        <PracticeCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-5">
                <div className="d-flex justify-content-center gap-3">
                    <a href="/practice/volumes" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Back to Volumes
                    </a>
                    <a href="/practice" className="btn btn-outline-info">
                        Practice Hub <i className="bi bi-grid ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
