"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavChild {
  label: string;
  href?: string;
  icon?: string;
  children?: NavChild[];
}

interface NavItem {
  label: string;
  icon: string;
  href?: string;
  badge?: string;
  children?: NavChild[];
  section?: string;
}


export const NAV_CONFIG: NavItem[] = [
  {
    section: "PRACTICE",
    label: "Daily Drills",
    icon: "bi-lightning-charge-fill",
    children: [
      { label: "Containers", icon: "bi-box-seam", href: "/docker/practice/containers" },
      { label: "Volumes", icon: "bi-hdd-fill", href: "/docker/practice/volumes" },
      { label: "Bind Mounts", icon: "bi-link-45deg", href: "/docker/practice/bind-mounts" },
      { label: "Networking", icon: "bi-diagram-3-fill", href: "/docker/practice/networking" },
      { label: "Swarm", icon: "bi-tornado", href: "/docker/practice/swarm" },
    ],
  },
  {
    section: "PLANNING",
    label: "Study Plan",
    icon: "bi-calendar-event-fill",
    href: "/docker/planning",
  },
  {
    section: "GETTING STARTED",
    label: "Getting Started",
    icon: "bi-rocket-takeoff-fill",
    children: [
      { label: "Introduction", icon: "bi-book-fill", href: "/docker/getting-started/introduction" },
      { label: "Virtual Machines", icon: "bi-laptop", href: "/docker/getting-started/virtual-machines" },
      { label: "Docker Architecture", icon: "bi-cpu-fill", href: "/docker/getting-started/docker-architecture" },
      { label: "Images and Containers", icon: "bi-box-seam-fill", href: "/docker/getting-started/images-containers" },
       { label: "Tags", icon: "bi-tags-fill", href: "/docker/getting-started/tags" },
      { label: "Ports and Networking", icon: "bi-diagram-3-fill", href: "/docker/getting-started/ports" },
      { label: "Layers", icon: "bi-layers-fill", href: "/docker/getting-started/layers" },
      { label: "Volumes and Bind Mounts", icon: "bi-hdd-fill", href: "/docker/getting-started/volumes-bind-mounts" },
      { label: "Rules and Case Studies", icon: "bi-lightbulb-fill", href: "/docker/getting-started/rules-and-case-studies" },
      { label: "Understanding Clusters", icon: "bi-diagram-3-fill", href: "/docker/getting-started/cluster" },
      { label: "Docker Swarm", icon: "bi-gear-fill", href: "/docker/getting-started/swarm" },
      { label: "Installation", icon: "bi-download", href: "/docker/getting-started/installation" },
      { label: "Revision Notes", icon: "bi-journal-check", href: "/docker/getting-started/notes" },
      { label: "Knowledge Check", icon: "bi-clipboard-check-fill", href: "/docker/getting-started/quiz" },
    ],
  },

  {
    label: "Commands",
    icon: "bi-terminal-fill",
    children: [
      {
        label: "Common Linux Commands",
        icon: "bi-terminal-fill",
        children: [
          { label: "Common Linux Commands", icon: "bi-terminal-fill", href: "/docker/commands/common-linux-commands" },
          { label: "Practice Challenges", icon: "bi-pencil-square", href: "/docker/commands/practice/linux-commands" },
        ],
      },
      {
        label: "Core Docker Commands",
        icon: "bi-play-circle-fill",
        children: [
          { label: "docker run", icon: "bi-play-circle-fill", href: "/docker/commands/run" },
          { label: "docker build", icon: "bi-hammer", href: "/docker/commands/build" },
          { label: "docker pull", icon: "bi-cloud-download-fill", href: "/docker/commands/pull" },
          { label: "docker push", icon: "bi-cloud-upload-fill", href: "/docker/commands/push" },
          { label: "docker ps", icon: "bi-list-check", href: "/docker/commands/ps" },
          { label: "docker images", icon: "bi-layers-fill", href: "/docker/commands/images" },
          { label: "docker stop", icon: "bi-stop-circle-fill", href: "/docker/commands/stop" },
          { label: "docker rm", icon: "bi-trash-fill", href: "/docker/commands/rm" },
          { label: "docker rmi", icon: "bi-trash2-fill", href: "/docker/commands/rmi" },
          { label: "docker exec", icon: "bi-terminal", href: "/docker/commands/exec" },
          { label: "docker logs", icon: "bi-file-text-fill", href: "/docker/commands/logs" },
          { label: "start / restart", icon: "bi-arrow-clockwise", href: "/docker/commands/start-restart" },
          { label: "docker kill", icon: "bi-x-octagon-fill", href: "/docker/commands/kill" },
          { label: "pause / unpause", icon: "bi-pause-circle-fill", href: "/docker/commands/pause" },
          { label: "docker rename", icon: "bi-pencil-fill", href: "/docker/commands/rename" },
          { label: "volume create", icon: "bi-hdd-fill", href: "/docker/commands/volume-create" },
          { label: "volume ls/inspect/rm", icon: "bi-hdd-stack-fill", href: "/docker/commands/volume-manage" },
          { label: "login / logout", icon: "bi-person-badge-fill", href: "/docker/commands/login" },
          { label: "search / tag", icon: "bi-tags-fill", href: "/docker/commands/search-tag" },
          { label: "info / version / df", icon: "bi-info-circle-fill", href: "/docker/commands/system-info" },
          { label: "save / load", icon: "bi-box-arrow-in-down-left", href: "/docker/commands/save-load" },
          { label: "compose up / down", icon: "bi-stack", href: "/docker/commands/compose-up-down" },
          { label: "compose ps / logs", icon: "bi-card-list", href: "/docker/commands/compose-ps-logs" },
        ],
      },
      {
        label: "Debugging",
        icon: "bi-bug-fill",
        children: [
          { label: "docker inspect", icon: "bi-search", href: "/docker/commands/debugging/inspect" },
          { label: "docker stats", icon: "bi-bar-chart-fill", href: "/docker/commands/debugging/stats" },
          { label: "docker top", icon: "bi-cpu-fill", href: "/docker/commands/debugging/top" },
          { label: "docker events", icon: "bi-activity", href: "/docker/commands/debugging/events" },
          { label: "docker diff", icon: "bi-file-diff-fill", href: "/docker/commands/debugging/diff" },
        ],
      },
      {
        label: "Cleanup",
        icon: "bi-trash3-fill",
        children: [
          { label: "system prune", icon: "bi-nuclear", href: "/docker/commands/cleanup/system-prune" },
          { label: "container prune", icon: "bi-box-arrow-right", href: "/docker/commands/cleanup/container-prune" },
          { label: "image prune", icon: "bi-image-fill", href: "/docker/commands/cleanup/image-prune" },
          { label: "volume prune", icon: "bi-device-hdd-fill", href: "/docker/commands/cleanup/volume-prune" },
        ],
      },
      {
        label: "Networking",
        icon: "bi-diagram-3-fill",
        children: [
          { label: "network ls", icon: "bi-list-ul", href: "/docker/commands/networking/ls" },
          { label: "network create", icon: "bi-plus-circle-fill", href: "/docker/commands/networking/create" },
          { label: "network inspect", icon: "bi-search", href: "/docker/commands/networking/inspect" },
          { label: "network connect", icon: "bi-plug-fill", href: "/docker/commands/networking/connect" },
          { label: "network rm", icon: "bi-trash-fill", href: "/docker/commands/networking/rm" },
        ],
      },
      {
        label: "File Transfer",
        icon: "bi-arrow-left-right",
        children: [
          { label: "docker cp", icon: "bi-clipboard-fill", href: "/docker/commands/file-transfer/cp" },
          { label: "export / import", icon: "bi-box-arrow-in-down", href: "/docker/commands/file-transfer/export-import" },
        ],
      },
    ],
  },
  {
    label: "Storage",
    icon: "bi-hdd-stack-fill",
    children: [
      { label: "Volumes", icon: "bi-hdd-fill", href: "/docker/storage/volumes-deep-dive" },
      { label: "Bind Mounts", icon: "bi-link-45deg", href: "/docker/storage/bind-mounts" },
      { label: "tmpfs Mounts", icon: "bi-lightning-charge-fill", href: "/docker/storage/tmpfs-mounts" },
      { label: "When to Use Which?", icon: "bi-question-circle-fill", href: "/docker/storage/when-to-use" },
      {
        label: "Storage Drivers",
        icon: "bi-layers-fill",
        children: [
          { label: "Drivers Overview", icon: "bi-info-circle-fill", href: "/docker/storage/drivers/overview" },
          { label: "Select a Storage Driver", icon: "bi-question-diamond-fill", href: "/docker/storage/drivers/select" },
          { label: "overlay2", icon: "bi-stack", href: "/docker/storage/drivers/overlay2" },

          { label: "Btrfs", icon: "bi-diagram-2-fill", href: "/docker/storage/drivers/btrfs" },
          { label: "ZFS", icon: "bi-folder-symlink-fill", href: "/docker/storage/drivers/zfs" },
          { label: "Windows Filter", icon: "bi-windows", href: "/docker/storage/drivers/windowsfilter" },
          { label: "VFS", icon: "bi-folder-fill", href: "/docker/storage/drivers/vfs" },
        ],
      },
      { label: "Containerd Image Store", icon: "bi-box-seam-fill", href: "/docker/storage/containerd-store" },
      {
        label: "Labs",
        icon: "bi-flask",
        children: [
          { label: "Volumes", icon: "bi-hdd-fill", href: "/docker/storage/labs/volumes" },
          { label: "Bind Mounts", icon: "bi-link-45deg", href: "/docker/storage/labs/bind-mounts" },
          { label: "tmpfs Mounts", icon: "bi-lightning-charge-fill", href: "/docker/storage/labs/tmpfs-mounts" },
        ]
      },
      { label: "Revision Notes", icon: "bi-journal-check", href: "/docker/storage/revision-notes" },
      { label: "Knowledge Check", icon: "bi-clipboard-check-fill", href: "/docker/storage/quiz" },
    ],
  },
  {
    label: "Swarm",
    icon: "bi-tornado",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/docker/swarm/overview" },
      {
        label: "Labs",
        icon: "bi-flask",
        children: [
          { label: "Init & Nodes", icon: "bi-diagram-3-fill", href: "/docker/swarm/labs/init-and-nodes" },
          { label: "Services & Scaling", icon: "bi-layers-fill", href: "/docker/swarm/labs/services" },
          { label: "Updates & Rollback", icon: "bi-arrow-repeat", href: "/docker/swarm/labs/updates-and-rollback" },
          { label: "Stacks & Compose", icon: "bi-stack", href: "/docker/swarm/labs/stacks" },
          { label: "Secrets & Configs", icon: "bi-shield-lock-fill", href: "/docker/swarm/labs/secrets-and-configs" },
        ],
      },
    ],
  },
  {
    label: "Dockerfile",
    icon: "bi-file-earmark-code-fill",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/docker/dockerfile/overview" },
      { label: "Structure & Caching", icon: "bi-layers-fill", href: "/docker/dockerfile/structure" },
      {
        label: "Commands",
        icon: "bi-terminal-fill",
        children: [
          { label: "FROM", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/from" },
          { label: "RUN", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/run" },
          { label: "CMD", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/cmd" },
          { label: "ENTRYPOINT", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/entrypoint" },
          { label: "COPY", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/copy" },
          { label: "ADD", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/add" },
          { label: "WORKDIR", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/workdir" },
          { label: "ENV", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/env" },
          { label: "ARG", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/arg" },
          { label: "EXPOSE", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/expose" },
          { label: "USER", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/user" },
          { label: "VOLUME", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/volume" },
          { label: "LABEL", icon: "bi-arrow-right-short", href: "/docker/dockerfile/commands/label" },
        ],
      },
      { label: "Intermediate", icon: "bi-gem", href: "/docker/dockerfile/intermediate" },
      { label: "Practical Projects", icon: "bi-flask", href: "/docker/dockerfile/projects" },
      { label: "DevOps Integration", icon: "bi-cpu-fill", href: "/docker/dockerfile/devops" },
    ],
  },
  {
    label: "Docker Compose",
    icon: "bi-stack",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/docker/compose/overview" },
      { label: "Why Compose?", icon: "bi-question-circle-fill", href: "/docker/compose/why-compose" },
      {
        label: "Fundamentals",
        icon: "bi-book-fill",
        children: [
          { label: "File Structure", icon: "bi-file-earmark-code-fill", href: "/docker/compose/fundamentals/file-structure" },
          { label: "Services", icon: "bi-gear-fill", href: "/docker/compose/fundamentals/services" },
          { label: "Ports & Environment", icon: "bi-diagram-3-fill", href: "/docker/compose/fundamentals/ports-env" },
          { label: "CLI Commands", icon: "bi-terminal-fill", href: "/docker/compose/fundamentals/commands" },
          { label: "Restart Policies", icon: "bi-arrow-clockwise", href: "/docker/compose/fundamentals/restart" },
        ],
      },
      {
        label: "Intermediate",
        icon: "bi-gem",
        children: [
          { label: "Volumes & Bind Mounts", icon: "bi-hdd-fill", href: "/docker/compose/intermediate/volumes" },
          { label: "Networks", icon: "bi-diagram-2-fill", href: "/docker/compose/intermediate/networks" },
          { label: "depends_on & Healthchecks", icon: "bi-heart-pulse-fill", href: "/docker/compose/intermediate/depends-on" },
          { label: ".env Files", icon: "bi-file-earmark-lock2-fill", href: "/docker/compose/intermediate/env-files" },
        ],
      },
      {
        label: "Advanced",
        icon: "bi-rocket-takeoff-fill",
        children: [
          { label: "Profiles", icon: "bi-person-badge-fill", href: "/docker/compose/advanced/profiles" },
          { label: "Secrets & Configs", icon: "bi-shield-lock-fill", href: "/docker/compose/advanced/secrets" },
          { label: "Scaling & Resources", icon: "bi-speedometer2", href: "/docker/compose/advanced/scaling" },
          { label: "Production Patterns", icon: "bi-building-fill", href: "/docker/compose/advanced/production" },
        ],
      },
      {
        label: "Projects",
        icon: "bi-flask",
        children: [
          { label: "Nginx Website", icon: "bi-globe", href: "/docker/compose/projects/nginx" },
          { label: "PHP + MySQL", icon: "bi-filetype-php", href: "/docker/compose/projects/php-mysql" },
          { label: "FastAPI Stack", icon: "bi-filetype-py", href: "/docker/compose/projects/fastapi" },
          { label: "Node.js + MongoDB", icon: "bi-node-plus-fill", href: "/docker/compose/projects/node-mongo" },
          { label: "Full-Stack App", icon: "bi-boxes", href: "/docker/compose/projects/fullstack" },
        ],
      },
      { label: "DevOps Integration", icon: "bi-cpu-fill", href: "/docker/compose/devops" },
      { label: "DCA Preparation", icon: "bi-award-fill", href: "/docker/compose/dca-prep" },
      { label: "Interview Prep", icon: "bi-chat-quote-fill", href: "/docker/compose/interview" },
    ],
  },
  {
    label: "Containers",
    icon: "bi-box-seam-fill",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/docker/containers/overview" },
      { label: "Starting Automatically", icon: "bi-arrow-clockwise", href: "/docker/containers/starting-automatically" },
      { label: "Multiple Processes", icon: "bi-diagram-3", href: "/docker/containers/multiple-processes" },
      { label: "Resource Constraints", icon: "bi-speedometer2", href: "/docker/containers/resource-constraints" },
      { label: "Runtime Metrics", icon: "bi-bar-chart-fill", href: "/docker/containers/runtime-metrics" },
      { label: "Other Concepts", icon: "bi-grid-fill", href: "/docker/containers/other-concepts" },
    ],
  },
  {
    label: "Networking",
    icon: "bi-diagram-3-fill",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/docker/networking/overview" },
      { label: "Network Types", icon: "bi-diagram-2", href: "/docker/networking/types" },
      { label: "Port Publishing", icon: "bi-door-open-fill", href: "/docker/networking/publishing" },
      { label: "Legacy Links", icon: "bi-link-45deg", href: "/docker/networking/legacy-links" },
      { label: "Debugging", icon: "bi-bug-fill", href: "/docker/networking/debugging" },
      {
        label: "Labs",
        icon: "bi-flask",
        children: [
          { label: "Default Bridge Network", icon: "bi-hdd-network-fill", href: "/docker/networking/labs/default-docker-bridge" },
          { label: "User-Defined Bridge Network", icon: "bi-shield-check", href: "/docker/networking/labs/user-defined-bridge" },
          { label: "Host Network", icon: "bi-lightning-charge-fill", href: "/docker/networking/labs/host-network" },
          { label: "Macvlan Network", icon: "bi-router-fill", href: "/docker/networking/labs/macvlan-network" },
          { label: "Overlay Network", icon: "bi-diagram-2-fill", href: "/docker/networking/labs/overlay-network" },
        ]
      },
      { label: "Knowledge Check", icon: "bi-clipboard-check-fill", href: "/docker/networking/quiz" },
    ],
  },
  {
    label: "Notes",
    icon: "bi-journal-text",
    children: [
      { label: "Tech with nana", icon: "bi-journal-check", href: "/docker/notes/tech-with-nana" },
    ],
  },
];


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // ── Auto-open ancestor menus for the current URL ──────────────────────────
  useEffect(() => {
    const keysToOpen: Record<string, boolean> = {};

    const walk = (items: NavChild[], parentKey?: string): boolean => {
      return items.some((item) => {
        const key = parentKey ? `${parentKey}-${item.label}` : item.label;
        const selfActive =
          !!item.href &&
          (pathname === item.href || pathname.startsWith(item.href + "/"));
        const childActive = item.children ? walk(item.children, key) : false;
        if (childActive) keysToOpen[key] = true;
        return selfActive || childActive;
      });
    };

    NAV_CONFIG.forEach((item) => {
      const key = item.label;
      const childActive = item.children ? walk(item.children, key) : false;
      if (childActive) keysToOpen[key] = true;
    });

    if (Object.keys(keysToOpen).length > 0) {
      setOpenMenus((prev) => ({ ...prev, ...keysToOpen }));
    }
  }, [pathname]);



  const toggleMenu = useCallback((label: string) => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => {
        setOpenMenus((prev) => ({ ...prev, [label]: true }));
      }, 50);
      return;
    }
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  }, [collapsed]);

  const isActiveParent = useCallback((item: NavItem) => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      const checkChildren = (children: NavChild[]): boolean => {
        return children.some((child) => {
          if (child.href && (pathname === child.href || pathname.startsWith(child.href + "/"))) return true;
          if (child.children) return checkChildren(child.children);
          return false;
        });
      };
      return checkChildren(item.children);
    }
    return false;
  }, [pathname]);

  const isActiveChild = useCallback((href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  }, [pathname]);

  const renderMenuItem = useCallback((item: NavChild, level: number = 0, parentLabel?: string) => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const itemKey = parentLabel ? `${parentLabel}-${item.label}` : item.label;
    const isOpen = !!openMenus[itemKey];
    const isActive = item.href ? isActiveChild(item.href) : false;

    return (
      <div key={itemKey} className="nav-item-wrapper" data-tooltip={collapsed && level === 0 ? item.label : undefined}>
        {hasChildren ? (
          <button
            className={`nav-link-item w-100 text-start${isActive ? " active" : ""}`}
            onClick={() => toggleMenu(itemKey)}
            style={{ paddingLeft: level > 0 ? `${1 + level * 1.5}rem` : undefined }}
          >
            {item.icon && <i className={`bi ${item.icon} nav-link-icon`} />}
            <span className="nav-link-text">{item.label}</span>
            <i className={`bi bi-chevron-right nav-link-arrow${isOpen ? " open" : ""}`} />
          </button>
        ) : (
          <Link
            href={item.href || "#"}
            className={`nav-link-item${isActive ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
            style={{ paddingLeft: level > 0 ? `${1 + level * 1.5}rem` : undefined }}
          >
            {item.icon && <i className={`bi ${item.icon} nav-link-icon`} />}
            <span className="nav-link-text">{item.label}</span>
          </Link>
        )}

        {hasChildren && (
          <div className={`child-menu${isOpen && !collapsed ? " open" : ""}`}>
            {item.children!.map((child) => renderMenuItem(child, level + 1, itemKey))}
          </div>
        )}
      </div>
    );
  }, [collapsed, openMenus, toggleMenu, isActiveChild, setMobileOpen]);

  return (
    <>
      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-lg-none"
          style={{ zIndex: 1039 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        className="sidebar-toggle d-lg-none"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list fs-5" />
      </button>

      <aside className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <i className="bi bi-hexagon-fill" />
          </div>
          <span className="sidebar-brand-text">Docker UI</span>
          <button
            className="sidebar-collapse-btn ms-auto d-none d-md-flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_CONFIG.map((item, idx) => {
            const isActive = isActiveParent(item);

            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {item.section && !collapsed && (
                  <div className="nav-section-label">{item.section}</div>
                )}

                {renderMenuItem(item, 0)}
              </React.Fragment>
            );
          })}

          <div className="nav-section-label mt-4">SETTINGS</div>
          <Link 
            href="/docker/sync" 
            className={`nav-link-item ${pathname === '/docker/sync' ? 'active' : ''}`}
          >
            <i className="bi bi-cloud-arrow-down-fill nav-link-icon" />
            <span className="nav-link-text">Sync for Offline</span>
          </Link>
        </nav>

        {/* <div className="sidebar-footer">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-role">Author</p>
          </div>
        </div> */}
      </aside>
    </>
  );
}
