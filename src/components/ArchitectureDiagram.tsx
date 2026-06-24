"use client";

import React, { useState } from "react";

export default function ArchitectureDiagram() {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6));
  const handleReset = () => setZoom(1);

  return (
    <div className="w-100 bg-dark p-4 rounded-4 shadow-lg border border-secondary border-opacity-25 position-relative">
      
      {/* Zoom Controls */}
      <div className="position-absolute top-0 end-0 m-3 z-3 d-flex gap-2 bg-dark p-2 rounded shadow border border-secondary">
        <button onClick={handleZoomOut} className="btn btn-sm btn-outline-info" title="Zoom Out">
          <i className="bi bi-zoom-out"></i>
        </button>
        <button onClick={handleReset} className="btn btn-sm btn-outline-secondary" title="Reset Zoom">
          100%
        </button>
        <button onClick={handleZoomIn} className="btn btn-sm btn-outline-info" title="Zoom In">
          <i className="bi bi-zoom-in"></i>
        </button>
      </div>

      {/* Scrollable Container for Zoom */}
      <div className="w-100 overflow-auto" style={{ minHeight: '600px' }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-in-out', minWidth: '950px' }}>
          <svg viewBox="0 0 1000 850" className="w-100 h-100" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <defs>
              {/* User Request Color */}
              <marker id="arrowhead-user" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#20c997" />
              </marker>
              {/* State Persistence Color */}
              <marker id="arrowhead-etcd" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#0dcaf0" />
              </marker>
              {/* Scheduling Color */}
              <marker id="arrowhead-sched" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ffc107" />
              </marker>
              {/* Node Management Color */}
              <marker id="arrowhead-node" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#d63384" />
              </marker>
              {/* Internal Worker Color */}
              <marker id="arrowhead-internal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6c757d" />
              </marker>
            </defs>

            {/* ==================== BACKGROUND BOXES ==================== */}
            
            {/* Master Node Background */}
            <rect x="40" y="80" width="450" height="520" rx="15" fill="none" stroke="#198754" strokeWidth="2" />
            <rect x="50" y="580" width="20" height="15" fill="#0dcaf0" rx="3" />
            <rect x="55" y="595" width="10" height="5" fill="#6c757d" />
            <path d="M 45 600 L 75 600" stroke="#6c757d" strokeWidth="2" />
            <text x="85" y="595" fill="#20c997" fontSize="18" fontWeight="bold">CONTROL PLANE/MASTER NODE</text>

            {/* Worker Node 1 Background */}
            <rect x="620" y="80" width="350" height="220" rx="15" fill="none" stroke="#0d6efd" strokeWidth="2" />
            <rect x="630" y="275" width="20" height="15" fill="#0dcaf0" rx="3" />
            <rect x="635" y="290" width="10" height="5" fill="#6c757d" />
            <path d="M 625 295 L 655 295" stroke="#6c757d" strokeWidth="2" />
            <text x="665" y="290" fill="#20c997" fontSize="18" fontWeight="bold">WORKER NODE 1</text>

            {/* Worker Node 2 Background */}
            <rect x="620" y="360" width="350" height="220" rx="15" fill="none" stroke="#0d6efd" strokeWidth="2" />
            <rect x="630" y="555" width="20" height="15" fill="#0dcaf0" rx="3" />
            <rect x="635" y="570" width="10" height="5" fill="#6c757d" />
            <path d="M 625 575 L 655 575" stroke="#6c757d" strokeWidth="2" />
            <text x="665" y="570" fill="#20c997" fontSize="18" fontWeight="bold">WORKER NODE 2</text>


            {/* ==================== PATHS & ARROWS ==================== */}

            {/* User to Kubectl */}
            <path d="M 500 50 L 500 80" fill="none" stroke="#20c997" strokeWidth="3" markerEnd="url(#arrowhead-user)" />

            {/* Kubectl to API Server (Green) */}
            <path d="M 500 115 Q 500 280 440 280" fill="none" stroke="#20c997" strokeWidth="3" markerEnd="url(#arrowhead-user)" />
            
            {/* API Server to Kubectl (Green Dashed) */}
            <path d="M 430 300 Q 550 300 530 115" fill="none" stroke="#20c997" strokeWidth="3" markerEnd="url(#arrowhead-user)" strokeDasharray="5,5" />
            
            {/* API Server to ETCD (Cyan) */}
            <path d="M 230 320 L 160 320" fill="none" stroke="#0dcaf0" strokeWidth="3" markerEnd="url(#arrowhead-etcd)" />
            {/* ETCD to API Server (Cyan) */}
            <path d="M 160 350 L 230 350" fill="none" stroke="#0dcaf0" strokeWidth="3" markerEnd="url(#arrowhead-etcd)" strokeDasharray="5,5" />
            
            {/* Scheduler Watches API Server (Yellow) */}
            <path d="M 310 310 L 310 200" fill="none" stroke="#ffc107" strokeWidth="3" markerEnd="url(#arrowhead-sched)" strokeDasharray="5,5" />

            {/* Scheduler Binds Node (Yellow) */}
            <path d="M 350 200 L 350 310" fill="none" stroke="#ffc107" strokeWidth="3" markerEnd="url(#arrowhead-sched)" />

            {/* Controller Watches API Server (Yellow) */}
            <path d="M 330 480 L 330 380" fill="none" stroke="#ffc107" strokeWidth="3" markerEnd="url(#arrowhead-sched)" strokeDasharray="5,5" />

            {/* API Server to Kubelet 1 (Pink) */}
            <path d="M 430 330 Q 530 330 530 180 L 680 180" fill="none" stroke="#d63384" strokeWidth="3" markerEnd="url(#arrowhead-node)" />

            {/* API Server to Kube Proxy 1 (Pink) */}
            <path d="M 430 340 Q 560 340 560 120 L 730 120" fill="none" stroke="#d63384" strokeWidth="3" markerEnd="url(#arrowhead-node)" />

            {/* API Server to Kubelet 2 (Pink) */}
            <path d="M 430 350 Q 500 350 500 480 L 680 480" fill="none" stroke="#d63384" strokeWidth="3" markerEnd="url(#arrowhead-node)" />

            {/* API Server to Kube Proxy 2 (Pink) */}
            <path d="M 430 360 Q 540 360 540 420 L 730 420" fill="none" stroke="#d63384" strokeWidth="3" markerEnd="url(#arrowhead-node)" />

            {/* Internal Worker 1: Kubelet to Pod */}
            <path d="M 750 185 L 750 210" fill="none" stroke="#6c757d" strokeWidth="3" markerEnd="url(#arrowhead-internal)" />
            
            {/* Internal Worker 2: Kubelet to Pod */}
            <path d="M 750 485 L 750 510" fill="none" stroke="#6c757d" strokeWidth="3" markerEnd="url(#arrowhead-internal)" />


            {/* ==================== COMPONENTS ==================== */}
            
            {/* User Icon */}
            <g transform="translate(480, 0)">
              <circle cx="20" cy="15" r="10" fill="none" stroke="#f8f9fa" strokeWidth="2" />
              <path d="M 5 40 Q 20 25 35 40" fill="none" stroke="#f8f9fa" strokeWidth="2" />
              <text x="45" y="25" fill="#f8f9fa" fontSize="20">User</text>
            </g>

            {/* Kubectl */}
            <g transform="translate(460, 85)">
              <rect x="0" y="0" width="80" height="30" rx="5" fill="#1e2124" stroke="#adb5bd" strokeWidth="1" />
              <text x="12" y="20" fill="#f8f9fa" fontSize="14" letterSpacing="1">kubectl</text>
            </g>

            {/* APISERVER */}
            <g transform="translate(230, 310)">
              <rect x="0" y="0" width="200" height="70" rx="5" fill="#1e2124" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 10 20 L 25 10 L 40 20 L 40 35 L 25 45 L 10 35 Z" fill="#0d6efd" />
              <circle cx="20" cy="22" r="3" fill="#fff" />
              <circle cx="30" cy="22" r="3" fill="#fff" />
              <circle cx="25" cy="32" r="3" fill="#fff" />
              <text x="50" y="42" fill="#f8f9fa" fontSize="20" letterSpacing="1">APISERVER</text>
            </g>

            {/* ETCD */}
            <g transform="translate(80, 310)">
              <ellipse cx="40" cy="20" rx="30" ry="10" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 10 20 L 10 70 A 30 10 0 0 0 70 70 L 70 20" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <ellipse cx="40" cy="45" rx="30" ry="10" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 30 25 L 40 15 L 50 25 L 50 35 L 40 45 L 30 35 Z" fill="#0d6efd" />
              <circle cx="40" cy="25" r="3" fill="#fff" />
              <text x="15" y="105" fill="#f8f9fa" fontSize="18">ETCD</text>
            </g>

            {/* SCHEDULER */}
            <g transform="translate(230, 140)">
              <rect x="0" y="0" width="200" height="60" rx="5" fill="#1e2124" stroke="#adb5bd" strokeWidth="2" />
              <text x="25" y="38" fill="#f8f9fa" fontSize="20" letterSpacing="1">SCHEDULER</text>
            </g>

            {/* CONTROLLER MANAGER */}
            <g transform="translate(230, 480)">
              <rect x="0" y="0" width="200" height="70" rx="5" fill="#1e2124" stroke="#adb5bd" strokeWidth="2" />
              <text x="35" y="30" fill="#f8f9fa" fontSize="16" letterSpacing="1">CONTROLLER</text>
              <text x="55" y="55" fill="#f8f9fa" fontSize="16" letterSpacing="1">MANAGER</text>
            </g>

            {/* ==================== WORKER 1 COMPONENTS ==================== */}
            
            {/* Kube-Proxy */}
            <g transform="translate(730, 100)">
              <rect x="0" y="0" width="140" height="35" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <text x="15" y="25" fill="#f8f9fa" fontSize="16" letterSpacing="1">KUBE-PROXY</text>
            </g>

            {/* Kubelet */}
            <g transform="translate(690, 150)">
              <path d="M 10 20 L 25 10 L 40 20 L 40 35 L 25 45 L 10 35 Z" fill="#0d6efd" />
              <text x="50" y="35" fill="#f8f9fa" fontSize="18" letterSpacing="1">KUBELET</text>
            </g>

            {/* Pods W1 */}
            <g transform="translate(720, 210)">
              <rect x="0" y="0" width="60" height="50" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 15 20 L 30 10 L 45 20 L 45 35 L 30 45 L 15 35 Z" fill="#0d6efd" />
              <circle cx="30" cy="27" r="3" fill="#fff" />
            </g>
            <g transform="translate(800, 210)">
              <rect x="0" y="0" width="60" height="50" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 15 20 L 30 10 L 45 20 L 45 35 L 30 45 L 15 35 Z" fill="#0d6efd" />
              <circle cx="30" cy="27" r="3" fill="#fff" />
            </g>
            <text x="880" y="245" fill="#f8f9fa" fontSize="18">POD</text>


            {/* ==================== WORKER 2 COMPONENTS ==================== */}
            
            {/* Kube-Proxy */}
            <g transform="translate(730, 400)">
              <rect x="0" y="0" width="140" height="35" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <text x="15" y="25" fill="#f8f9fa" fontSize="16" letterSpacing="1">KUBE-PROXY</text>
            </g>

            {/* Kubelet */}
            <g transform="translate(690, 450)">
              <path d="M 10 20 L 25 10 L 40 20 L 40 35 L 25 45 L 10 35 Z" fill="#0d6efd" />
              <text x="50" y="35" fill="#f8f9fa" fontSize="18" letterSpacing="1">KUBELET</text>
            </g>

            {/* Pods W2 */}
            <g transform="translate(720, 510)">
              <rect x="0" y="0" width="60" height="50" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 15 20 L 30 10 L 45 20 L 45 35 L 30 45 L 15 35 Z" fill="#0d6efd" />
              <circle cx="30" cy="27" r="3" fill="#fff" />
            </g>
            <g transform="translate(800, 510)">
              <rect x="0" y="0" width="60" height="50" rx="5" fill="none" stroke="#adb5bd" strokeWidth="2" />
              <path d="M 15 20 L 30 10 L 45 20 L 45 35 L 30 45 L 15 35 Z" fill="#0d6efd" />
              <circle cx="30" cy="27" r="3" fill="#fff" />
            </g>
            <text x="880" y="545" fill="#f8f9fa" fontSize="18">POD</text>


            {/* ==================== DETAILED LEGEND ==================== */}
            <g transform="translate(40, 640)">
              <rect x="0" y="0" width="930" height="180" rx="10" fill="#1e2124" stroke="#6c757d" strokeWidth="1" />
              <text x="20" y="30" fill="#f8f9fa" fontSize="18" fontWeight="bold">Detailed Legend: Declarative Flow Types</text>
              
              {/* Column 1 */}
              <line x1="20" y1="60" x2="60" y2="60" stroke="#20c997" strokeWidth="3" markerEnd="url(#arrowhead-user)" />
              <text x="75" y="65" fill="#f8f9fa" fontSize="14" fontWeight="bold">Green Solid:</text>
              <text x="170" y="65" fill="#adb5bd" fontSize="14">User executes 'kubectl apply'. Client sends HTTP POST to API Server.</text>

              <line x1="20" y1="90" x2="60" y2="90" stroke="#20c997" strokeWidth="3" markerEnd="url(#arrowhead-user)" strokeDasharray="5,5" />
              <text x="75" y="95" fill="#f8f9fa" fontSize="14" fontWeight="bold">Green Dashed:</text>
              <text x="180" y="95" fill="#adb5bd" fontSize="14">API Server returns HTTP Response (e.g., 201 Created) to kubectl.</text>

              <line x1="20" y1="120" x2="60" y2="120" stroke="#0dcaf0" strokeWidth="3" markerEnd="url(#arrowhead-etcd)" />
              <text x="75" y="125" fill="#f8f9fa" fontSize="14" fontWeight="bold">Cyan Solid:</text>
              <text x="160" y="125" fill="#adb5bd" fontSize="14">API Server persists newly submitted desired state directly into ETCD.</text>

              <line x1="20" y1="150" x2="60" y2="150" stroke="#0dcaf0" strokeWidth="3" markerEnd="url(#arrowhead-etcd)" strokeDasharray="5,5" />
              <text x="75" y="155" fill="#f8f9fa" fontSize="14" fontWeight="bold">Cyan Dashed:</text>
              <text x="175" y="155" fill="#adb5bd" fontSize="14">ETCD acknowledges writes or returns requested state back to API Server.</text>

              {/* Column 2 */}
              <line x1="500" y1="60" x2="540" y2="60" stroke="#ffc107" strokeWidth="3" markerEnd="url(#arrowhead-sched)" strokeDasharray="5,5" />
              <text x="555" y="65" fill="#f8f9fa" fontSize="14" fontWeight="bold">Yellow Dashed:</text>
              <text x="665" y="65" fill="#adb5bd" fontSize="14">Scheduler/Controller continuously watch API Server for changes.</text>

              <line x1="500" y1="90" x2="540" y2="90" stroke="#ffc107" strokeWidth="3" markerEnd="url(#arrowhead-sched)" />
              <text x="555" y="95" fill="#f8f9fa" fontSize="14" fontWeight="bold">Yellow Solid:</text>
              <text x="650" y="95" fill="#adb5bd" fontSize="14">Scheduler assigns Node or Controller submits reconciliation state.</text>

              <line x1="500" y1="120" x2="540" y2="120" stroke="#d63384" strokeWidth="3" markerEnd="url(#arrowhead-node)" />
              <text x="555" y="125" fill="#f8f9fa" fontSize="14" fontWeight="bold">Pink Solid:</text>
              <text x="635" y="125" fill="#adb5bd" fontSize="14">API Server broadcasts Assignments to Kubelet and Rules to Proxy.</text>

              <line x1="500" y1="150" x2="540" y2="150" stroke="#6c757d" strokeWidth="3" markerEnd="url(#arrowhead-internal)" />
              <text x="555" y="155" fill="#f8f9fa" fontSize="14" fontWeight="bold">Grey Solid:</text>
              <text x="635" y="155" fill="#adb5bd" fontSize="14">Kubelet instructs local Container Runtime to spin up actual Pod.</text>

            </g>

          </svg>
        </div>
      </div>
    </div>
  );
}
