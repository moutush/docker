"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  scratchpadPlaceholder: string;
  solution: string;
  hint: string;
  type: "command" | "dockerfile" | "compose" | "explanation";
}

const dockerTasks: Task[] = [
  {
    id: 1,
    title: "Locate Local State and Daemon Config",
    category: "Architecture",
    difficulty: "Easy",
    description: "Write down the default directory path on Linux where Docker stores all its local state (images, containers, volumes, configurations). Also, write down the absolute path of the default daemon configuration file used to customize runtime settings on a Linux system.",
    scratchpadPlaceholder: "Local state path:\nDaemon configuration file path:",
    solution: "Local state path: /var/lib/docker/\nDaemon configuration file: /etc/docker/daemon.json\n\nYou can inspect detailed host storage configuration by running: docker info",
    hint: "The local state directory requires root privileges to browse, and the daemon configuration is a JSON file.",
    type: "explanation"
  },
  {
    id: 2,
    title: "Container Run with Constraints",
    category: "CLI / Lifecycle",
    difficulty: "Medium",
    description: "Start a detached container named 'prod-web' using the 'nginx:alpine' image. It must map host port 8080 to container port 80, limit container memory consumption to exactly 256 megabytes, and be configured with a restart policy that restarts the container automatically unless it is manually stopped.",
    scratchpadPlaceholder: "docker run ...",
    solution: "docker run -d --name prod-web -p 8080:80 --memory=\"256m\" --restart unless-stopped nginx:alpine",
    hint: "Use the -d, --name, -p, --memory, and --restart options.",
    type: "command"
  },
  {
    id: 3,
    title: "Inspect and Extract Container IP Address",
    category: "Debugging",
    difficulty: "Medium",
    description: "Inspect the running 'prod-web' container to retrieve only its IP Address. Do not use 'grep' or 'awk'; instead, use the official Go template formatter flag '--format' provided by the 'docker inspect' CLI command.",
    scratchpadPlaceholder: "docker inspect ...",
    solution: "docker inspect --format '{{.NetworkSettings.IPAddress}}' prod-web",
    hint: "The formatter template starts with a double curly brace, followed by .NetworkSettings.IPAddress, and ends with a double curly brace.",
    type: "command"
  },
  {
    id: 4,
    title: "Resource Limits and Live Metrics",
    category: "CLI / Performance",
    difficulty: "Medium",
    description: "Run a container named 'stress-app' using the 'ubuntu' image that executes a long sleep command ('sleep 1000') in the background. Limit it to exactly 0.5 CPU shares (half a core). Then, write the command used to monitor real-time resource utilization (CPU, Memory, I/O, Network) of this container.",
    scratchpadPlaceholder: "Run container command:\nMonitor resource command:",
    solution: "# Start the container with CPU limits:\ndocker run -d --name stress-app --cpus=\"0.5\" ubuntu sleep 1000\n\n# Monitor live metrics:\ndocker stats stress-app",
    hint: "Use the --cpus option for limiting CPU utilization, and the 'stats' command to verify live metrics.",
    type: "command"
  },
  {
    id: 5,
    title: "Volume Lifecycle and Custom Database Path",
    category: "Storage",
    difficulty: "Medium",
    description: "Create a named volume called 'app-data'. Then, run a PostgreSQL container named 'postgres-db' using the 'postgres:15-alpine' image in detached mode. Mount the named volume 'app-data' to the container's default data folder at '/var/lib/postgresql/data'. Supply the database password 'mysecret' using an environment variable.",
    scratchpadPlaceholder: "docker volume ...\ndocker run ...",
    solution: "docker volume create app-data\n\ndocker run -d --name postgres-db -v app-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=mysecret postgres:15-alpine",
    hint: "First run volume create, then mount it with -v volume_name:container_path and specify environment variables with -e.",
    type: "command"
  },
  {
    id: 6,
    title: "Read-Only Bind Mount",
    category: "Storage",
    difficulty: "Medium",
    description: "Start an Alpine container named 'config-reader' that sleeps for 3600 seconds. Bind mount a host file at '/home/user/app.conf' to a container path at '/app/configs/app.conf' such that it is mounted in read-only mode, preventing the container from modifying it.",
    scratchpadPlaceholder: "docker run ...",
    solution: "docker run -d --name config-reader -v /home/user/app.conf:/app/configs/app.conf:ro alpine sleep 3600",
    hint: "Use the -v flag with host_path:container_path:ro syntax.",
    type: "command"
  },
  {
    id: 7,
    title: "Clean Up System and Unused Images",
    category: "Cleanup",
    difficulty: "Easy",
    description: "Write down the command to remove all stopped containers, unused networks, and dangling build cache in one step. Additionally, write the command to delete all local unused images (not just dangling ones) to free up host disk space.",
    scratchpadPlaceholder: "System prune command:\nImage cleanup command:",
    solution: "# Clean up stopped containers, unused networks, and dangling cache:\ndocker system prune\n\n# Clean up all unused images:\ndocker image prune -a\n# Or to clean up all unused objects and images at once:\ndocker system prune -a --volumes",
    hint: "The system prune command covers dangling resources. Adding the -a flag to image prune removes all unused images.",
    type: "command"
  },
  {
    id: 8,
    title: "User-Defined Bridge Network",
    category: "Networking",
    difficulty: "Medium",
    description: "Create a user-defined bridge network named 'isolated-net' and restrict its subnet range to '192.168.50.0/24'. Then, start an Alpine container named 'db-tier' in the background attached directly to this network.",
    scratchpadPlaceholder: "docker network ...\ndocker run ...",
    solution: "docker network create --subnet=192.168.50.0/24 isolated-net\n\ndocker run -d --name db-tier --network isolated-net alpine sleep 3600",
    hint: "Use the 'network create' command with the --subnet flag, and join the container to the network via the --network option.",
    type: "command"
  },
  {
    id: 9,
    title: "Service Discovery and Internal DNS Routing",
    category: "Networking",
    difficulty: "Medium",
    description: "Connect a new Alpine container named 'app-tier' to the user-defined network 'isolated-net'. Write down the command to test DNS-based service discovery from inside the 'app-tier' container to verify it can resolve and ping 'db-tier' by its container name (send exactly 3 ping packets).",
    scratchpadPlaceholder: "docker run ...\ndocker exec ...",
    solution: "docker run -d --name app-tier --network isolated-net alpine sleep 3600\n\ndocker exec app-tier ping -c 3 db-tier",
    hint: "User-defined networks include built-in DNS service resolution. Execute a ping command inside 'app-tier' targeting the hostname 'db-tier'.",
    type: "command"
  },
  {
    id: 10,
    title: "Dockerfile Layer Optimization",
    category: "Dockerfile",
    difficulty: "Medium",
    description: "Explain why the following Dockerfile runs slowly on rebuilds whenever source files change. Then, rewrite it to optimize build caching by utilizing Docker's layer cache mechanism:\n\nFROM python:3.9-slim\nWORKDIR /app\nCOPY . /app\nRUN pip install --no-cache-dir -r requirements.txt\nCMD [\"python\", \"app.py\"]",
    scratchpadPlaceholder: "Analysis:\n\nOptimized Dockerfile:",
    solution: "Analysis: Copying all files (COPY . /app) before running 'pip install' invalidates the layer cache for package installation whenever any source code file changes. The system must run pip install on every minor code edit.\n\nOptimized Dockerfile:\n\nFROM python:3.9-slim\nWORKDIR /app\n# Copy requirements file first to build and cache dependencies layer\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n# Copy the rest of the application files after packages are installed\nCOPY . .\nCMD [\"python\", \"app.py\"]",
    hint: "Only copy files needed for the package installation step before running the installation command. Copy the remaining source files afterward.",
    type: "dockerfile"
  },
  {
    id: 11,
    title: "Multi-Stage Build and Security Policy",
    category: "Dockerfile",
    difficulty: "Hard",
    description: "Write a complete multi-stage Dockerfile for a Node.js web application. The first stage ('build') should use 'node:18-alpine' to install dev-dependencies, copy the source code, and run 'npm run build'. The second stage ('run') should copy only production dependencies and the output build folder ('dist') from the build stage into a fresh, clean 'node:18-alpine' base. Ensure the application runs under the built-in non-root user 'node', exposes port 3000, and runs 'node dist/main.js' as the default startup directive.",
    scratchpadPlaceholder: "# Stage 1: Build\n...\n\n# Stage 2: Run\n...",
    solution: "# Stage 1: Build stage\nFROM node:18-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production runtime stage\nFROM node:18-alpine\nWORKDIR /app\nENV NODE_ENV=production\nCOPY package*.json ./\nRUN npm ci --only=production\n# Copy assets compiled in the build stage\nCOPY --from=build /app/dist ./dist\n# Apply security principle of least privilege\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"dist/main.js\"]",
    hint: "Use 'FROM node:18-alpine AS build' for Stage 1. Use 'COPY --from=build /app/dist ./dist' in Stage 2 to pull build assets. Set non-root execution with 'USER node'.",
    type: "dockerfile"
  },
  {
    id: 12,
    title: "Decouple Executable from Default Arguments",
    category: "Dockerfile",
    difficulty: "Medium",
    description: "Configure a Dockerfile for a utility image running 'curl' built on top of 'alpine:latest'. Ensure that the 'curl' binary is set as the default immutable entry point executable that cannot be easily overridden at runtime. By default, it must fetch 'https://google.com' if no arguments are passed when running the container.",
    scratchpadPlaceholder: "FROM alpine:latest\n...",
    solution: "FROM alpine:latest\nRUN apk add --no-cache curl\n# ENTRYPOINT defines the immutable core executable\nENTRYPOINT [\"curl\"]\n# CMD serves as the default argument, easily overridden at runtime\nCMD [\"https://google.com\"]",
    hint: "Use ENTRYPOINT for the executable binary and CMD for the default URL parameter.",
    type: "dockerfile"
  },
  {
    id: 13,
    title: "Compose Multi-Container Environment",
    category: "Docker Compose",
    difficulty: "Medium",
    description: "Write a complete 'docker-compose.yml' configuration file containing: (1) A service named 'db' using 'mysql:8' that sets the root database password to 'dbrootpass'. (2) A service named 'backend' built using a Dockerfile located in the './server' directory. The backend must restart on failure and wait to launch until the database container has booted.",
    scratchpadPlaceholder: "version: '3.8'\n...",
    solution: "version: '3.8'\nservices:\n  db:\n    image: mysql:8\n    environment:\n      MYSQL_ROOT_PASSWORD: dbrootpass\n  backend:\n    build: ./server\n    restart: on-failure\n    depends_on:\n      - db",
    hint: "Use environment for database passwords, build config to point to directories, restart: on-failure, and depends_on to order service startup.",
    type: "compose"
  },
  {
    id: 14,
    title: "Compose Healthchecks and Active Startup Order",
    category: "Docker Compose",
    difficulty: "Hard",
    description: "Modify a Docker Compose configuration so that the 'web' service does not just wait for the PostgreSQL database service 'db' to start, but waits until the database is fully ready to accept connections (is healthy). Write the healthcheck block for 'db' executing 'pg_isready -U postgres' every 10 seconds, and use the advanced 'depends_on' condition within the 'web' service definition.",
    scratchpadPlaceholder: "version: '3.8'\n...",
    solution: "version: '3.8'\nservices:\n  db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_PASSWORD: secretpassword\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 10s\n      timeout: 5s\n      retries: 3\n  web:\n    image: myapp:web\n    depends_on:\n      db:\n        condition: service_healthy",
    hint: "Declare a healthcheck inside the db service using test: ['CMD-SHELL', ...]. Inside the web service, use depends_on with service_healthy condition.",
    type: "compose"
  },
  {
    id: 15,
    title: "Image Tagging and Remote Distribution",
    category: "CLI / Distribution",
    difficulty: "Medium",
    description: "You have compiled a local image tagged 'app-service:latest'. Provide the exact CLI command sequence to: (1) Retag this image so it can be pushed to a private secure registry running at 'registry.corp.internal:5000' under the folder path 'devops/app' with tag 'v1.2.0'. (2) Push the newly tagged image to that registry.",
    scratchpadPlaceholder: "Tag command:\nPush command:",
    solution: "# Tag the image with target registry name:\ndocker tag app-service:latest registry.corp.internal:5000/devops/app:v1.2.0\n\n# Push it to the registry:\ndocker push registry.corp.internal:5000/devops/app:v1.2.0",
    hint: "Prefix the tag with the registry host and port, then invoke the tag and push commands.",
    type: "command"
  }
];

interface HistoryEntry {
  id: string;
  date: string;
  duration: number; // in seconds
  completedCount: number;
  timerEnabled: boolean;
}

export default function DockerDashboard() {
  const [mounted, setMounted] = useState(false);

  // Persistence States
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(3600); // 1 hour countdown
  const [secondsElapsed, setSecondsElapsed] = useState(0); // count up stopwatch
  const [isRunning, setIsRunning] = useState(false);
  
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [revealedTasks, setRevealedTasks] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [attemptsHistory, setAttemptsHistory] = useState<HistoryEntry[]>([]);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Summary State
  const [drillFinished, setDrillFinished] = useState(false);
  const [currentResultSummary, setCurrentResultSummary] = useState<{
    timeTaken: number;
    score: number;
    timerEnabled: boolean;
  } | null>(null);

  // Categories list extracted from data
  const categories = ["All", ...Array.from(new Set(dockerTasks.map((t) => t.category)))];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Hydration fix
  useEffect(() => {
    setMounted(true);

    // Read stored settings
    const storedTimerEnabled = localStorage.getItem("docker_drill_timer_enabled");
    if (storedTimerEnabled !== null) setTimerEnabled(storedTimerEnabled === "true");

    const storedSecondsRemaining = localStorage.getItem("docker_drill_seconds_remaining");
    if (storedSecondsRemaining !== null) setSecondsRemaining(parseInt(storedSecondsRemaining, 10));

    const storedSecondsElapsed = localStorage.getItem("docker_drill_seconds_elapsed");
    if (storedSecondsElapsed !== null) setSecondsElapsed(parseInt(storedSecondsElapsed, 10));

    const storedIsRunning = localStorage.getItem("docker_drill_is_running");
    if (storedIsRunning !== null) setIsRunning(storedIsRunning === "true");

    const storedCompleted = localStorage.getItem("docker_drill_completed_tasks");
    if (storedCompleted !== null) {
      try {
        setCompletedTasks(JSON.parse(storedCompleted));
      } catch (e) {
        console.error(e);
      }
    }

    const storedRevealed = localStorage.getItem("docker_drill_revealed_tasks");
    if (storedRevealed !== null) {
      try {
        setRevealedTasks(JSON.parse(storedRevealed));
      } catch (e) {
        console.error(e);
      }
    }

    const storedAnswers = localStorage.getItem("docker_drill_user_answers");
    if (storedAnswers !== null) {
      try {
        setUserAnswers(JSON.parse(storedAnswers));
      } catch (e) {
        console.error(e);
      }
    }

    const storedHistory = localStorage.getItem("docker_drill_history");
    if (storedHistory !== null) {
      try {
        setAttemptsHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error(e);
      }
    }

    const storedFinished = localStorage.getItem("docker_drill_finished");
    if (storedFinished !== null) setDrillFinished(storedFinished === "true");
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_timer_enabled", String(timerEnabled));
  }, [timerEnabled, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_seconds_remaining", String(secondsRemaining));
  }, [secondsRemaining, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_seconds_elapsed", String(secondsElapsed));
  }, [secondsElapsed, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_is_running", String(isRunning));
  }, [isRunning, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_completed_tasks", JSON.stringify(completedTasks));
  }, [completedTasks, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_revealed_tasks", JSON.stringify(revealedTasks));
  }, [revealedTasks, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_user_answers", JSON.stringify(userAnswers));
  }, [userAnswers, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_history", JSON.stringify(attemptsHistory));
  }, [attemptsHistory, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("docker_drill_finished", String(drillFinished));
  }, [drillFinished, mounted]);

  // Stopwatch/Timer Interval
  useEffect(() => {
    if (!isRunning || drillFinished) return;

    const interval = setInterval(() => {
      if (timerEnabled) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setSecondsElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timerEnabled, drillFinished]);

  if (!mounted) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-50">
        <div className="text-center text-secondary">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Initializing practice workspace...</p>
        </div>
      </div>
    );
  }

  // Format Time Helper
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Timer Colors/Alerts
  const getTimerClass = () => {
    if (!timerEnabled) return "text-info";
    if (secondsRemaining <= 120) return "text-danger animate-pulse"; // 2 mins warning
    if (secondsRemaining <= 600) return "text-warning"; // 10 mins warning
    return "text-success";
  };

  // Toggle tasks completion
  const handleToggleTask = (id: number) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  // Toggle task solution view
  const handleToggleSolution = (id: number) => {
    if (revealedTasks.includes(id)) {
      setRevealedTasks(revealedTasks.filter((taskId) => taskId !== id));
    } else {
      setRevealedTasks([...revealedTasks, id]);
    }
  };

  // Scratchpad answer edit
  const handleAnswerChange = (id: number, val: string) => {
    setUserAnswers({
      ...userAnswers,
      [id]: val,
    });
  };

  // Global Solution controls
  const handleRevealAll = () => {
    setRevealedTasks(dockerTasks.map((t) => t.id));
  };

  const handleHideAll = () => {
    setRevealedTasks([]);
  };

  // Reset drill progress
  const handleResetDrill = () => {
    if (window.confirm("Are you sure you want to reset all current checklist progress, user answers, and reload the timer?")) {
      setCompletedTasks([]);
      setRevealedTasks([]);
      setUserAnswers({});
      setSecondsRemaining(3600);
      setSecondsElapsed(0);
      setIsRunning(false);
      setDrillFinished(false);
      setCurrentResultSummary(null);
      localStorage.removeItem("docker_drill_finished");
    }
  };

  // Terminate drill and calculate results
  const handleFinishDrill = () => {
    const timeSpent = timerEnabled ? 3600 - secondsRemaining : secondsElapsed;
    const score = completedTasks.length;

    setIsRunning(false);
    setDrillFinished(true);

    const result = {
      timeTaken: timeSpent,
      score,
      timerEnabled,
    };
    setCurrentResultSummary(result);

    // Save automatically to history list
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      duration: timeSpent,
      completedCount: score,
      timerEnabled,
    };
    setAttemptsHistory([newEntry, ...attemptsHistory]);
  };

  // Clear History logs
  const handleClearHistory = () => {
    if (window.confirm("Delete all logged attempts from database?")) {
      setAttemptsHistory([]);
    }
  };

  // Filter Tasks
  const filteredTasks = dockerTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || t.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const overallProgressPercent = Math.round((completedTasks.length / dockerTasks.length) * 100);

  return (
    <div className="container-fluid py-4 px-md-4">
      {/* HEADER SECTION */}
      <div className="page-header d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 pb-3 border-bottom border-secondary border-opacity-25">
        <div>
          <h1 className="page-title doc-section-title mb-1" style={{ fontSize: "32px" }}>
            Weekly Docker Practice Drill
          </h1>
          <p className="page-subtitle text-secondary mb-0">
            Maintain your Docker muscle memory. A comprehensive review covering core commands, storage systems, networking structures, and Compose configurations. Swarm is excluded.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={handleResetDrill}>
            <i className="bi bi-arrow-counterclockwise me-2" />
            Reset Progress
          </button>
          {!drillFinished && (
            <button className="btn btn-primary btn-sm" onClick={handleFinishDrill}>
              <i className="bi bi-check2-square me-2" />
              Finish Drill
            </button>
          )}
        </div>
      </div>

      {/* CORE INSTRUMENT PANEL / CONTROL DECK */}
      <div className="row g-3 mb-4">
        {/* TIMER / STOPWATCH CARD */}
        <div className="col-12 col-md-4">
          <div className="card h-100 bg-dark bg-opacity-70 border border-secondary border-opacity-50 rounded-4 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-bold text-uppercase">Timer Deck</span>
                  <div className="form-check form-switch m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="timerToggleSwitch"
                      checked={!timerEnabled}
                      onChange={() => {
                        setIsRunning(false);
                        setTimerEnabled(!timerEnabled);
                      }}
                    />
                    <label className="form-check-label text-secondary small" htmlFor="timerToggleSwitch">
                      Disable Timer
                    </label>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className={`display-4 fw-bold font-monospace ${getTimerClass()}`}>
                    {timerEnabled ? formatTime(secondsRemaining) : formatTime(secondsElapsed)}
                  </div>
                  <div>
                    <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-25">
                      {timerEnabled ? "Countdown" : "Stopwatch"}
                    </span>
                  </div>
                </div>
                <p className="text-secondary small mt-2 mb-0">
                  {timerEnabled
                    ? "Time limit: 60 minutes. Complete the tasks before the time runs out."
                    : "No time limit. Counting elapsed time to help track your practice speed."}
                </p>
              </div>
              <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary border-opacity-10">
                {isRunning ? (
                  <button className="btn btn-outline-warning btn-sm flex-grow-1" onClick={() => setIsRunning(false)}>
                    <i className="bi bi-pause-fill me-1" />
                    Pause
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success btn-sm flex-grow-1"
                    disabled={drillFinished || (timerEnabled && secondsRemaining === 0)}
                    onClick={() => setIsRunning(true)}
                  >
                    <i className="bi bi-play-fill me-1" />
                    Start Run
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS CARD */}
        <div className="col-12 col-md-4">
          <div className="card h-100 bg-dark bg-opacity-70 border border-secondary border-opacity-50 rounded-4 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <span className="text-secondary small fw-bold text-uppercase d-block mb-2">Completion Status</span>
                <div className="d-flex justify-content-between align-items-baseline mb-2">
                  <span className="fs-3 fw-bold text-white">
                    {completedTasks.length} / {dockerTasks.length}
                  </span>
                  <span className="text-secondary small">Tasks Completed</span>
                </div>
                <div className="progress bg-secondary bg-opacity-10 mb-3" style={{ height: "8px", borderRadius: "10px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${overallProgressPercent}%`, borderRadius: "10px" }}
                    aria-valuenow={overallProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="pt-2 border-top border-secondary border-opacity-10 d-flex justify-content-between align-items-center">
                <span className="text-secondary small">Drill Status:</span>
                <span className="badge bg-secondary text-white fw-bold">
                  {drillFinished
                    ? "Completed"
                    : isRunning
                    ? "Running"
                    : timerEnabled && secondsRemaining === 0
                    ? "Time Expired"
                    : completedTasks.length > 0
                    ? "In Progress"
                    : "Not Started"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS & REVEALS */}
        <div className="col-12 col-md-4">
          <div className="card h-100 bg-dark bg-opacity-70 border border-secondary border-opacity-50 rounded-4 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <span className="text-secondary small fw-bold text-uppercase d-block mb-2">Assistance Metrics</span>
                <div className="row g-2 text-center mt-1">
                  <div className="col-6 border-end border-secondary border-opacity-25">
                    <span className="fs-4 fw-bold text-warning d-block">{revealedTasks.length}</span>
                    <span className="text-secondary small">Solutions Viewed</span>
                  </div>
                  <div className="col-6">
                    <span className="fs-4 fw-bold text-info d-block">
                      {dockerTasks.length - revealedTasks.length}
                    </span>
                    <span className="text-secondary small">Unassisted Tasks</span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary border-opacity-10">
                <button className="btn btn-outline-secondary btn-sm flex-grow-1" onClick={handleRevealAll}>
                  Reveal All Solutions
                </button>
                <button className="btn btn-outline-secondary btn-sm flex-grow-1" onClick={handleHideAll}>
                  Hide Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY RESULT REPORT (IF COMPLETED) */}
      {drillFinished && currentResultSummary && (
        <div className="card bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-4 mb-4">
          <div className="d-flex align-items-start gap-3">
            <div className="bg-success bg-opacity-20 text-success p-3 rounded-circle">
              <i className="bi bi-award-fill fs-2" />
            </div>
            <div className="flex-grow-1">
              <h4 className="fw-bold text-white mb-2">Practice Session Finished</h4>
              <p className="text-secondary mb-3">
                Your performance data has been logged to your local training history.
              </p>
              <div className="row g-3 max-w-lg mb-3">
                <div className="col-6 col-sm-3">
                  <span className="text-secondary small d-block">Tasks Completed</span>
                  <span className="fw-bold text-white fs-5">{currentResultSummary.score} / 15</span>
                </div>
                <div className="col-6 col-sm-3">
                  <span className="text-secondary small d-block">Time Spent</span>
                  <span className="fw-bold text-white fs-5">{formatTime(currentResultSummary.timeTaken)}</span>
                </div>
                <div className="col-6 col-sm-3">
                  <span className="text-secondary small d-block">Timer Mode</span>
                  <span className="fw-bold text-white fs-5">{currentResultSummary.timerEnabled ? "Countdown" : "Stopwatch"}</span>
                </div>
                <div className="col-6 col-sm-3">
                  <span className="text-secondary small d-block">Assisted Answers</span>
                  <span className="fw-bold text-white fs-5">{revealedTasks.length} / 15</span>
                </div>
              </div>
              <button className="btn btn-success btn-sm text-dark fw-bold" onClick={() => setDrillFinished(false)}>
                Review My Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERING BLOCK */}
      <div className="card bg-dark bg-opacity-40 border border-secondary border-opacity-20 rounded-4 p-3 mb-4">
        <div className="row g-3 align-items-center">
          {/* SEARCH */}
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-dark border-secondary border-opacity-50 text-secondary">
                <i className="bi bi-search" />
              </span>
              <input
                type="text"
                className="form-control bg-dark border-secondary border-opacity-50 text-white"
                placeholder="Search command or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="col-6 col-md-3">
            <div className="d-flex align-items-center gap-2">
              <label className="text-secondary small text-nowrap mb-0">Category:</label>
              <select
                className="form-select form-select-sm bg-dark border-secondary border-opacity-50 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="col-6 col-md-3">
            <div className="d-flex align-items-center gap-2">
              <label className="text-secondary small text-nowrap mb-0">Difficulty:</label>
              <select
                className="form-select form-select-sm bg-dark border-secondary border-opacity-50 text-white"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FILTER METRICS */}
          <div className="col-12 col-md-2 text-md-end">
            <span className="text-secondary small">
              Showing {filteredTasks.length} of {dockerTasks.length} tasks
            </span>
          </div>
        </div>
      </div>

      {/* TASK LIST ACCORDION */}
      <div className="row justify-content-center">
        <div className="col-12">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-5 border border-dashed border-secondary border-opacity-25 rounded-4 bg-dark bg-opacity-20">
              <i className="bi bi-journal-x fs-2 text-secondary d-block mb-2" />
              <span className="text-secondary">No tasks match the active filters</span>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isChecked = completedTasks.includes(task.id);
              const isSolutionRevealed = revealedTasks.includes(task.id);
              const answer = userAnswers[task.id] || "";

              return (
                <div
                  key={task.id}
                  className={`card mb-3 border bg-dark bg-opacity-70 rounded-4 transition-all shadow-sm ${
                    isChecked ? "border-success border-opacity-30" : "border-secondary border-opacity-30"
                  }`}
                  style={{
                    borderLeft: isChecked
                      ? "4px solid var(--bs-success) !important"
                      : "4px solid var(--sidebar-border) !important",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start gap-3">
                      {/* Checkbox selector */}
                      <div className="form-check m-0 pt-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          style={{ width: "22px", height: "22px", cursor: "pointer" }}
                          id={`checkTask-${task.id}`}
                          checked={isChecked}
                          onChange={() => handleToggleTask(task.id)}
                        />
                      </div>

                      {/* Content block */}
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                          <div>
                            <span className="text-secondary small font-monospace d-block mb-1">Task {task.id}</span>
                            <h5 className="fw-bold text-white m-0 d-inline-block align-middle me-2">
                              {task.title}
                            </h5>
                          </div>
                          <div className="d-flex gap-2 align-items-center">
                            <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-25">
                              {task.category}
                            </span>
                            <span
                              className={`badge ${
                                task.difficulty === "Easy"
                                  ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                  : task.difficulty === "Medium"
                                  ? "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"
                                  : "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25"
                              }`}
                            >
                              {task.difficulty}
                            </span>
                          </div>
                        </div>

                        <p className="text-secondary small mb-3 leading-relaxed" style={{ fontSize: "14px" }}>
                          {task.description}
                        </p>

                        {/* Interactive typing box (scratchpad) */}
                        <div className="mb-3">
                          <label className="text-secondary small mb-1" htmlFor={`scratchpad-${task.id}`}>
                            Scratchpad: Practice typing your solution below
                          </label>
                          <textarea
                            id={`scratchpad-${task.id}`}
                            className="form-control form-control-sm bg-dark border-secondary border-opacity-30 text-light font-monospace small"
                            rows={3}
                            placeholder={task.scratchpadPlaceholder}
                            value={answer}
                            onChange={(e) => handleAnswerChange(task.id, e.target.value)}
                          />
                        </div>

                        {/* Solutions controls */}
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            style={{ fontSize: "12px" }}
                            onClick={() => handleToggleSolution(task.id)}
                          >
                            {isSolutionRevealed ? "Hide Solution" : "Reveal Solution"}
                          </button>
                        </div>

                        {/* Collapsed solution panel */}
                        {isSolutionRevealed && (
                          <div className="mt-3 p-3 bg-dark rounded-3 border border-secondary border-opacity-35">
                            <span className="text-secondary small fw-bold d-block mb-1">Correct Solution:</span>
                            <pre
                              className="font-monospace text-info bg-black p-2.5 rounded border border-secondary border-opacity-20 text-start m-0 text-wrap"
                              style={{ fontSize: "13px", lineHeight: "1.6" }}
                            >
                              {task.solution}
                            </pre>
                            {task.hint && (
                              <div className="mt-2 text-secondary small">
                                <i className="bi bi-lightbulb-fill text-warning me-1" />
                                <span className="italic">Hint: {task.hint}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* TRAINING DRILL COMPLETION RECORD HISTORY */}
      <div className="card bg-dark bg-opacity-40 border border-secondary border-opacity-30 rounded-4 p-4 mt-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold text-white m-0">Weekly Practice History</h5>
            <p className="text-secondary small mb-0">Records of completed drill attempts saved on this browser.</p>
          </div>
          {attemptsHistory.length > 0 && (
            <button className="btn btn-outline-danger btn-sm" onClick={handleClearHistory}>
              Clear History
            </button>
          )}
        </div>

        {attemptsHistory.length === 0 ? (
          <div className="text-center py-4 text-secondary small">
            No session history has been recorded yet. Click 'Finish Drill' when you complete your workspace challenges.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover m-0" style={{ fontSize: "13px" }}>
              <thead>
                <tr>
                  <th>Session Date</th>
                  <th>Timer Configuration</th>
                  <th>Time Taken</th>
                  <th>Tasks Completed</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {attemptsHistory.map((entry) => {
                  const successRate = Math.round((entry.completedCount / dockerTasks.length) * 100);
                  return (
                    <tr key={entry.id}>
                      <td className="text-white">{entry.date}</td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-20 text-secondary">
                          {entry.timerEnabled ? "Countdown" : "Stopwatch"}
                        </span>
                      </td>
                      <td className="font-monospace">{formatTime(entry.duration)}</td>
                      <td>{entry.completedCount} / 15</td>
                      <td>
                        <span
                          className={`fw-bold ${
                            successRate >= 80 ? "text-success" : successRate >= 50 ? "text-warning" : "text-danger"
                          }`}
                        >
                          {successRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
