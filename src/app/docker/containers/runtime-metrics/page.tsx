import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Runtime Metrics: The Smart Dashboard - Docker Documentation",
    description: "Understand how Docker tracks and exposes real-time performance data with simple analogies and examples."
};

export default function RuntimeMetricsPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-4 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Runtime Metrics
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        Is your app drowning? Let's check the dashboard.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* ANALOGY SECTION (INTRO) */}
                    <div className="doc-section-card shadow-lg mb-4 border-primary border-opacity-25">
                        <div className="doc-card-header-wrapper text-primary">
                            <div className="heading-icon">
                                <i className="bi bi-lightbulb-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Analogy: Your Container's Smart Meter
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p className="text-secondary small mb-0">
                                Think of your server like a house. <strong>`docker stats`</strong> is the smart dashboard on your phone showing live usage, while **`cgroups`** are the actual hardware sensors hidden in your walls measuring every watt of electricity.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 1: DOCKER STATS (THE DASHBOARD) */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-info">
                            <div className="heading-icon">
                                <i className="bi bi-bar-chart-line-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="dashboard">
                                1. The Dashboard: `docker stats`
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-3">
                                <code>docker stats</code> is your primary tool for seeing <strong>real-time (live) streaming data</strong> about your containers.
                            </p>

                            <div className="doc-code-block mb-3">
                                <div className="doc-code-header">
                                    <span className="small text-secondary fw-bold"> terminal</span>
                                </div>
                                <pre className="bg-dark p-3 rounded border border-secondary border-opacity-25 mb-0 overflow-auto">
                                    <code className="text-info">
{`$ docker stats redis1 redis2

CONTAINER           CPU %               MEM USAGE / LIMIT     MEM %
redis1              0.07%               796 KB / 64 MB        1.21%
redis2              0.07%               2.74 MB / 64 MB       4.29%`}
                                    </code>
                                </pre>
                            </div>

                            <div className="doc-alert doc-alert-info mb-0">
                                <i className="bi bi-patch-question-fill"></i>
                                <div>
                                    <h5 className="fs-6 fw-bold mb-1">Common Noob Questions:</h5>
                                    <ul className="small text-secondary mb-0">
                                        <li><strong>Are redis1 and redis2 same?</strong> No, these are <strong>two separate, independent containers</strong> running on your machine. We are monitoring both at once.</li>
                                        <li><strong>Is it real-time?</strong> Yes! The screen will blink and update every second as usage changes.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: CGROUPS (THE SENSORS) */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-success">
                            <div className="heading-icon">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h2 className="doc-card-heading" id="sensors">
                                2. The Sensors: Control Groups (cgroups)
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-2">
                                If <code>docker stats</code> is just a "pretty dashboard," where does it get the real data from? It reads it from Linux <strong>Control Groups (cgroups)</strong>.
                            </p>
                            
                            <p className="text-secondary small mb-3">
                                <strong>Why do we care?</strong> Because while humans use <code>docker stats</code>, professional monitoring software (like Prometheus or Grafana) reads the <strong>raw data</strong> directly from these cgroup sensors.
                            </p>

                            <div className="doc-grid-2 g-4 mb-3">
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">The "Where" Command</h5>
                                    <p className="text-secondary small mb-2">To find where these sensors are "hidden" on your machine, you run:</p>
                                    <code>grep cgroup /proc/mounts</code>
                                    <p className="text-secondary x-small mt-2"><em>*Note: The output will look different on every machine depending on the OS version!</em></p>
                                </div>
                                <div className="doc-sub-card">
                                    <h5 className="doc-sub-card-title small text-uppercase">cgroup v1 vs v2</h5>
                                    <p className="text-secondary small mb-0"><strong>v1 (Old):</strong> Like a scattered library with different buildings for CPU and Memory. <br/><strong>v2 (Modern):</strong> A single, unified center where everything is in one place. Most modern Linux (Ubuntu 22.04+) uses v2.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: THE PRACTICAL EXAMPLE */}
                    <div className="doc-section-card shadow-lg mb-4 border-warning border-opacity-25">
                        <div className="doc-card-header-wrapper text-warning">
                            <div className="heading-icon">
                                <i className="bi bi-shield-fill-exclamation"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Noob-Friendly Scenario: The Leaky Script
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-3">
                                Imagine you wrote a Python script that reads a 10GB file but accidentally loads the <strong>entire file into memory</strong> instead of reading it line-by-line.
                            </p>

                            <div className="doc-alert doc-alert-secondary mb-3">
                                <ol className="small text-secondary mb-0">
                                    <li>You run the container with <code>--memory="1g"</code> (1GB limit).</li>
                                    <li>You run <code>docker stats my-python-app</code>.</li>
                                    <li><strong>The "Aha!" Moment:</strong> You see the <code>MEM %</code> climb rapidly: 10%... 50%... 90%!</li>
                                    <li><strong>The Crash:</strong> At 100%, the script hits the wall and crashes (OOM Killed). You just used Metrics to diagnose a "Memory Leak" before it crashed your entire server!</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: METRICS BREAKDOWN (SPEED ROUND) */}
                    <div className="doc-section-card shadow-lg mb-4">
                        <div className="doc-card-header-wrapper text-purple" style={{ color: '#a855f7' }}>
                            <div className="heading-icon text-white" style={{ backgroundColor: '#a855f7' }}>
                                <i className="bi bi-speedometer2"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                The Quick Stats Guide
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <div className="table-responsive">
                                <table className="doc-table">
                                    <thead>
                                        <tr>
                                            <th>Stat</th>
                                            <th>Translated to Human</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>CPU %</strong></td>
                                            <td>How hard is the "brain" working? (Setting to 0.5 means half of one core).</td>
                                        </tr>
                                        <tr>
                                            <td><strong>NET I/O</strong></td>
                                            <td>How many "packets" of info moved through the internet cable?</td>
                                        </tr>
                                        <tr>
                                            <td><strong>BLOCK I/O</strong></td>
                                            <td>How many times did we read from the actual physical disk?</td>
                                        </tr>
                                        <tr>
                                            <td><strong>RSS</strong></td>
                                            <td>Memory actually being used by YOUR code (stacks, heaps).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: ADVANCED TIP */}
                    <div className="doc-section-card shadow-lg border-danger border-opacity-25 mb-4">
                        <div className="doc-card-header-wrapper text-danger">
                            <div className="heading-icon">
                                <i className="bi bi-rocket-takeoff-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Pro Tip: Catching the Ghost
                            </h2>
                        </div>

                        <div className="doc-card-body">
                            <p className="text-secondary small mb-0">
                                Normally, when a container dies, its performance history dies with it. To "catch the ghost," monitoring tools like <strong>Netdata</strong> or <strong>Datadog</strong> stay connected to those <code>cgroups</code> sensors even after the container stops, so you can see exactly why it crashed at 3 AM.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
