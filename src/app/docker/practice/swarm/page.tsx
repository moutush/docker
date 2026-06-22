"use client";

import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    command: string;
    hint?: string;
    lab?: string;
}

const swarmTasks: Task[] = [
    {
        id: 1,
        title: "Initialize the Swarm",
        description: "Turn your current machine into a Swarm Manager node.",
        command: "docker swarm init --advertise-addr $(hostname -I | awk '{print $1}')",
        hint: "This starts the Raft engine and prints the join token for workers.",
        lab: "Lab 1"
    },
    {
        id: 2,
        title: "Get the Worker Join Token",
        description: "Display the command needed for a worker node to join this swarm.",
        command: "docker swarm join-token worker",
        hint: "Pro tip: 'docker swarm join-token manager' gives the manager join token instead.",
        lab: "Lab 1"
    },
    {
        id: 3,
        title: "List All Nodes",
        description: "View all nodes in the swarm and their roles/status.",
        command: "docker node ls",
        hint: "The '*' marks the node you are currently connected to. 'Leader' means it is the active Raft leader.",
        lab: "Lab 1"
    },
    {
        id: 4,
        title: "Drain a Node for Maintenance",
        description: "Evict all running tasks from 'worker1' so you can do OS maintenance on it.",
        command: "docker node update --availability drain worker1",
        hint: "Swarm immediately reschedules all tasks from worker1 onto other nodes.",
        lab: "Lab 1"
    },
    {
        id: 5,
        title: "Create a Replicated Service",
        description: "Create an Nginx service named 'web' with 3 replicas on port 80.",
        command: "docker service create --name web --replicas 3 -p 80:80 nginx:latest",
        hint: "Swarm distributes the 3 replicas across available nodes using the 'spread' strategy.",
        lab: "Lab 2"
    },
    {
        id: 6,
        title: "Check Service Health",
        description: "View the per-task (per-container) status of the 'web' service across all nodes.",
        command: "docker service ps web",
        hint: "Use this instead of 'docker ps' when debugging Swarm. 'docker ps' only shows containers on the current machine.",
        lab: "Lab 2"
    },
    {
        id: 7,
        title: "Scale the Service",
        description: "Scale the 'web' service up to 6 replicas.",
        command: "docker service scale web=6",
        hint: "Swarm immediately schedules the 3 new tasks onto available nodes.",
        lab: "Lab 2"
    },
    {
        id: 8,
        title: "Create a Global Service",
        description: "Run a log-collector service that runs on EVERY node in the cluster.",
        command: "docker service create --name log-collector --mode global fluentd",
        hint: "Global mode = 1 task per node. Automatically adds tasks when new nodes join.",
        lab: "Lab 2"
    },
    {
        id: 9,
        title: "Perform a Rolling Update",
        description: "Update the 'web' service to nginx:1.25, replacing 2 containers at a time with a 10s delay.",
        command: "docker service update --image nginx:1.25 --update-parallelism 2 --update-delay 10s --update-failure-action rollback web",
        hint: "Monitor the update with 'docker service ps web' in another terminal.",
        lab: "Lab 3"
    },
    {
        id: 10,
        title: "Roll Back a Service",
        description: "Something went wrong with the update. Roll 'web' back to the previous version instantly.",
        command: "docker service rollback web",
        hint: "Swarm only keeps ONE previous state. Rolling back twice returns you to the bad version.",
        lab: "Lab 3"
    },
    {
        id: 11,
        title: "Deploy a Stack",
        description: "Deploy a multi-service application from a docker-compose.yml file with stack name 'myapp'.",
        command: "docker stack deploy -c docker-compose.yml myapp",
        hint: "All services will be prefixed: myapp_web, myapp_api, etc.",
        lab: "Lab 4"
    },
    {
        id: 12,
        title: "Create a Secret",
        description: "Create a Docker secret named 'db_password' securely from stdin.",
        command: "echo 'mysecretpassword' | docker secret create db_password -",
        hint: "The '-' means read from stdin. This ensures the secret value never touches disk.",
        lab: "Lab 5"
    },
];

const labColors: Record<string, string> = {
    "Lab 1": "primary",
    "Lab 2": "success",
    "Lab 3": "warning",
    "Lab 4": "info",
    "Lab 5": "danger",
};

function PracticeCard({ task }: { task: Task }) {
    const [revealed, setRevealed] = useState(false);
    const color = labColors[task.lab ?? ""] ?? "secondary";

    return (
        <div className={`doc-section-card shadow-sm mb-4 border-${color}`}>
            <div className="doc-card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <div className="d-flex gap-2 mb-2">
                            <span className={`badge bg-${color} text-dark`}>Drill #{task.id}</span>
                            {task.lab && <span className="badge bg-dark border border-secondary text-secondary">{task.lab}</span>}
                        </div>
                        <h4 className="fw-bold text-light">{task.title}</h4>
                    </div>
                    <button
                        onClick={() => setRevealed(!revealed)}
                        className={`btn btn-sm ${revealed ? 'btn-outline-secondary' : `btn-${color} text-dark fw-bold`}`}
                    >
                        {revealed ? 'Hide' : 'Reveal CLI'}
                    </button>
                </div>

                <p className="text-secondary mb-3">{task.description}</p>

                {revealed && (
                    <div className="animate-fade-in">
                        <pre className={`doc-code-block mb-2 border-${color} text-${color} bg-dark`}>
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

export default function SwarmPracticePage() {
    return (
        <div className="container py-5">
            <div className="page-intro-header mb-5">
                <h1 className="doc-section-title">Daily Drill: Docker Swarm</h1>
                <p className="text-secondary">DCA Exam Level — from initialization to secrets. Can you run these from memory?</p>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex flex-wrap gap-2">
                        {Object.entries(labColors).map(([lab, color]) => (
                            <span key={lab} className={`badge bg-${color} text-dark`}>{lab}</span>
                        ))}
                        <span className="small text-secondary align-self-center ms-2">Color = which lab covers this topic</span>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {swarmTasks.map(task => (
                        <PracticeCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="small text-secondary">If you can run all 12 drills from memory, you are DCA-ready on Swarm!</p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/swarm/labs/init-and-nodes" className="btn btn-outline-primary">
                        <i className="bi bi-flask me-2"></i>Back to Labs
                    </a>
                    <a href="/practice/networking" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>Networking Drills
                    </a>
                </div>
            </div>
        </div>
    );
}
