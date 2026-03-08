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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [navConfig, setNavConfig] = useState<NavItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          setNavConfig(data);
        }
      } catch (err) {
        console.error("Failed to load nav config", err);
      }
    }
    fetchMenu();
  }, []);

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
            className="sidebar-collapse-btn ms-auto d-none d-lg-flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navConfig.map((item, idx) => {
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
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-role">Author</p>
          </div>
        </div>
      </aside>
    </>
  );
}
