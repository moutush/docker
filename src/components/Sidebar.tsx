"use client";

import React, { useState, useCallback } from "react";
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
    section: "PLANNING",
    label: "Study Plan",
    icon: "bi-calendar-event-fill",
    href: "/planning",
  },
  {
    section: "GETTING STARTED",
    label: "Getting Started",
    icon: "bi-rocket-takeoff-fill",
    children: [
      { label: "Introduction", icon: "bi-book-fill", href: "/getting-started/introduction" },
      { label: "Virtual Machines", icon: "bi-laptop", href: "/getting-started/virtual-machines" },
      { label: "Docker Architecture", icon: "bi-cpu-fill", href: "/getting-started/docker-architecture" },
      { label: "Images and Containers", icon: "bi-box-seam-fill", href: "/getting-started/images-containers" },
       { label: "Tags", icon: "bi-tags-fill", href: "/getting-started/tags" },
      { label: "Ports and Networking", icon: "bi-diagram-3-fill", href: "/getting-started/ports" },
      { label: "Layers", icon: "bi-layers-fill", href: "/getting-started/layers" },
      { label: "Volumes and Bind Mounts", icon: "bi-hdd-fill", href: "/getting-started/volumes-bind-mounts" },
      { label: "Rules and Case Studies", icon: "bi-lightbulb-fill", href: "/getting-started/rules-and-case-studies" },
      { label: "Understanding Clusters", icon: "bi-diagram-3-fill", href: "/getting-started/cluster" },
      { label: "Docker Swarm", icon: "bi-gear-fill", href: "/getting-started/swarm" },
      { label: "Installation", icon: "bi-download", href: "/getting-started/installation" },
      { label: "Revision Notes", icon: "bi-journal-check", href: "/getting-started/notes" },
      { label: "Knowledge Check", icon: "bi-clipboard-check-fill", href: "/getting-started/quiz" },
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
          { label: "Common Linux Commands", icon: "bi-terminal-fill", href: "/commands/common-linux-commands" },
          { label: "Practice Challenges", icon: "bi-pencil-square", href: "/commands/practice/linux-commands" },
        ],
      },
      {
        label: "Core Docker Commands",
        icon: "bi-play-circle-fill",
        children: [
          { label: "docker run", icon: "bi-play-circle-fill", href: "/commands/run" },
          { label: "docker build", icon: "bi-hammer", href: "/commands/build" },
          { label: "docker pull", icon: "bi-cloud-download-fill", href: "/commands/pull" },
          { label: "docker push", icon: "bi-cloud-upload-fill", href: "/commands/push" },
          { label: "docker ps", icon: "bi-list-check", href: "/commands/ps" },
          { label: "docker images", icon: "bi-layers-fill", href: "/commands/images" },
          { label: "docker stop", icon: "bi-stop-circle-fill", href: "/commands/stop" },
          { label: "docker rm", icon: "bi-trash-fill", href: "/commands/rm" },
          { label: "docker rmi", icon: "bi-trash2-fill", href: "/commands/rmi" },
          { label: "docker exec", icon: "bi-terminal", href: "/commands/exec" },
          { label: "docker logs", icon: "bi-file-text-fill", href: "/commands/logs" },
          { label: "start / restart", icon: "bi-arrow-clockwise", href: "/commands/start-restart" },
          { label: "docker kill", icon: "bi-x-octagon-fill", href: "/commands/kill" },
          { label: "pause / unpause", icon: "bi-pause-circle-fill", href: "/commands/pause" },
          { label: "docker rename", icon: "bi-pencil-fill", href: "/commands/rename" },
          { label: "volume create", icon: "bi-hdd-fill", href: "/commands/volume-create" },
          { label: "volume ls/inspect/rm", icon: "bi-hdd-stack-fill", href: "/commands/volume-manage" },
          { label: "login / logout", icon: "bi-person-badge-fill", href: "/commands/login" },
          { label: "search / tag", icon: "bi-tags-fill", href: "/commands/search-tag" },
          { label: "info / version / df", icon: "bi-info-circle-fill", href: "/commands/system-info" },
          { label: "save / load", icon: "bi-box-arrow-in-down-left", href: "/commands/save-load" },
          { label: "compose up / down", icon: "bi-stack", href: "/commands/compose-up-down" },
          { label: "compose ps / logs", icon: "bi-card-list", href: "/commands/compose-ps-logs" },
        ],
      },
      {
        label: "Debugging",
        icon: "bi-bug-fill",
        children: [
          { label: "docker inspect", icon: "bi-search", href: "/commands/debugging/inspect" },
          { label: "docker stats", icon: "bi-bar-chart-fill", href: "/commands/debugging/stats" },
          { label: "docker top", icon: "bi-cpu-fill", href: "/commands/debugging/top" },
          { label: "docker events", icon: "bi-activity", href: "/commands/debugging/events" },
          { label: "docker diff", icon: "bi-file-diff-fill", href: "/commands/debugging/diff" },
        ],
      },
      {
        label: "Cleanup",
        icon: "bi-trash3-fill",
        children: [
          { label: "system prune", icon: "bi-nuclear", href: "/commands/cleanup/system-prune" },
          { label: "container prune", icon: "bi-box-arrow-right", href: "/commands/cleanup/container-prune" },
          { label: "image prune", icon: "bi-image-fill", href: "/commands/cleanup/image-prune" },
          { label: "volume prune", icon: "bi-device-hdd-fill", href: "/commands/cleanup/volume-prune" },
        ],
      },
      {
        label: "Networking",
        icon: "bi-diagram-3-fill",
        children: [
          { label: "network ls", icon: "bi-list-ul", href: "/commands/networking/ls" },
          { label: "network create", icon: "bi-plus-circle-fill", href: "/commands/networking/create" },
          { label: "network inspect", icon: "bi-search", href: "/commands/networking/inspect" },
          { label: "network connect", icon: "bi-plug-fill", href: "/commands/networking/connect" },
          { label: "network rm", icon: "bi-trash-fill", href: "/commands/networking/rm" },
        ],
      },
      {
        label: "File Transfer",
        icon: "bi-arrow-left-right",
        children: [
          { label: "docker cp", icon: "bi-clipboard-fill", href: "/commands/file-transfer/cp" },
          { label: "export / import", icon: "bi-box-arrow-in-down", href: "/commands/file-transfer/export-import" },
        ],
      },
    ],
  },
  {
    label: "Storage",
    icon: "bi-hdd-stack-fill",
    children: [
      { label: "Volumes", icon: "bi-hdd-fill", href: "/storage/volumes-deep-dive" },
      { label: "Bind Mounts", icon: "bi-link-45deg", href: "/storage/bind-mounts" },
      { label: "tmpfs Mounts", icon: "bi-lightning-charge-fill", href: "/storage/tmpfs-mounts" },
      { label: "When to Use Which?", icon: "bi-question-circle-fill", href: "/storage/when-to-use" },
      {
        label: "Storage Drivers",
        icon: "bi-layers-fill",
        children: [
          { label: "Drivers Overview", icon: "bi-info-circle-fill", href: "/storage/drivers/overview" },
          { label: "Select a Storage Driver", icon: "bi-question-diamond-fill", href: "/storage/drivers/select" },
          { label: "overlay2", icon: "bi-stack", href: "/storage/drivers/overlay2" },

          { label: "Btrfs", icon: "bi-diagram-2-fill", href: "/storage/drivers/btrfs" },
          { label: "ZFS", icon: "bi-folder-symlink-fill", href: "/storage/drivers/zfs" },
          { label: "Windows Filter", icon: "bi-windows", href: "/storage/drivers/windowsfilter" },
          { label: "VFS", icon: "bi-folder-fill", href: "/storage/drivers/vfs" },
        ],
      },
      { label: "Containerd Image Store", icon: "bi-box-seam-fill", href: "/storage/containerd-store" },
      { label: "Revision Notes", icon: "bi-journal-check", href: "/storage/revision-notes" },
      { label: "Knowledge Check", icon: "bi-clipboard-check-fill", href: "/storage/quiz" },
    ],
  },
  {
    label: "Containers",
    icon: "bi-box-seam-fill",
    children: [
      { label: "Overview", icon: "bi-info-circle-fill", href: "/containers/overview" },
      { label: "Starting Automatically", icon: "bi-arrow-clockwise", href: "/containers/starting-automatically" },
      { label: "Multiple Processes", icon: "bi-diagram-3", href: "/containers/multiple-processes" },
      { label: "Resource Constraints", icon: "bi-speedometer2", href: "/containers/resource-constraints" },
      { label: "Runtime Metrics", icon: "bi-bar-chart-fill", href: "/containers/runtime-metrics" },
      { label: "Other Concepts", icon: "bi-grid-fill", href: "/containers/other-concepts" },
    ],
  },
  {
    label: "Notes",
    icon: "bi-journal-text",
    children: [
      { label: "Tech with nana", icon: "bi-journal-check", href: "/notes/tech-with-nana" },
    ],
  },
];


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();



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
            href="/sync" 
            className={`nav-link-item ${pathname === '/sync' ? 'active' : ''}`}
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
