import Link from "next/link";

export default function Dashboard() {
    const stats = [
        { label: "Total Revenue", value: "$48,295", change: "+12.5%", up: true, icon: "bi-currency-dollar", color: "#1f6feb", bg: "rgba(31,111,235,0.15)" },
        { label: "Active Users", value: "3,842", change: "+8.1%", up: true, icon: "bi-people-fill", color: "#3fb950", bg: "rgba(63,185,80,0.15)" },
        { label: "Orders", value: "1,274", change: "-2.3%", up: false, icon: "bi-cart3", color: "#f78166", bg: "rgba(247,129,102,0.15)" },
        { label: "Conversion", value: "4.6%", change: "+0.4%", up: true, icon: "bi-graph-up-arrow", color: "#d2a8ff", bg: "rgba(210,168,255,0.15)" },
    ];

    const recentActivity = [
        { text: "New user registered: Sarah Johnson", time: "2 min ago", color: "#3fb950" },
        { text: "Order #4821 has been shipped", time: "18 min ago", color: "#1f6feb" },
        { text: "Server CPU usage spike detected", time: "45 min ago", color: "#f78166" },
        { text: "Monthly report generated", time: "2 hrs ago", color: "#d2a8ff" },
        { text: "Webhook integration updated", time: "3 hrs ago", color: "#ffa657" },
    ];

    const quickLinks = [
        { label: "View Analytics", href: "/analytics", icon: "bi-bar-chart-line-fill", color: "#1f6feb" },
        { label: "Manage Users", href: "/users", icon: "bi-people-fill", color: "#3fb950" },
        { label: "Browse Products", href: "/ecommerce/products", icon: "bi-box-seam", color: "#ffa657" },
        { label: "System Settings", href: "/settings", icon: "bi-gear-fill", color: "#d2a8ff" },
    ];

    return (
        <div>
            {/* Page Header */}
            <div className="page-header d-flex align-items-start justify-content-between flex-wrap gap-3">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welcome back, John! Here&apos;s what&apos;s happening today.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-download me-2" />Export
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <i className="bi bi-plus-lg me-2" />New Report
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="row g-3 mb-4">
                {stats.map((s) => (
                    <div key={s.label} className="col-12 col-sm-6 col-xl-3">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                                <i className={`bi ${s.icon}`} />
                            </div>
                            <div>
                                <p className="stat-value">{s.value}</p>
                                <p className="stat-label">{s.label}</p>
                                <p className="stat-change" style={{ color: s.up ? "#3fb950" : "#f78166" }}>
                                    <i className={`bi bi-arrow-${s.up ? "up" : "down"}-short`} />
                                    {s.change} vs last month
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="row g-3">
                {/* Recent Activity */}
                <div className="col-12 col-lg-7">
                    <div className="dash-card h-100">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fw-bold mb-0 text-white">
                                <i className="bi bi-activity me-2 text-primary" />
                                Recent Activity
                            </h6>
                            <Link href="/analytics" className="btn btn-sm btn-outline-secondary" style={{ fontSize: "12px" }}>
                                View All
                            </Link>
                        </div>
                        {recentActivity.map((a, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-dot mt-1" style={{ background: a.color }} />
                                <div className="flex-1">
                                    <p className="mb-1" style={{ fontSize: "14px", color: "var(--text-primary)" }}>{a.text}</p>
                                    <p className="mb-0" style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                                        <i className="bi bi-clock me-1" />{a.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-12 col-lg-5">
                    {/* Quick Access */}
                    <div className="dash-card mb-3">
                        <h6 className="fw-bold mb-3 text-white">
                            <i className="bi bi-lightning-fill me-2 text-warning" />
                            Quick Access
                        </h6>
                        <div className="row g-2">
                            {quickLinks.map((q) => (
                                <div key={q.href} className="col-6">
                                    <Link
                                        href={q.href}
                                        className="d-flex align-items-center gap-2 p-3 rounded-3 text-decoration-none"
                                        style={{ background: "var(--content-bg)", border: "1px solid var(--card-border)", color: "var(--text-secondary)", fontSize: "13px", transition: "all 0.2s" }}
                                    >
                                        <i className={`bi ${q.icon}`} style={{ color: q.color, fontSize: "16px" }} />
                                        {q.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="dash-card">
                        <h6 className="fw-bold mb-3 text-white">
                            <i className="bi bi-hdd-network me-2 text-success" />
                            System Status
                        </h6>
                        {[
                            { label: "CPU Usage", value: 42, color: "#3fb950" },
                            { label: "Memory", value: 67, color: "#ffa657" },
                            { label: "Disk I/O", value: 28, color: "#1f6feb" },
                            { label: "Network", value: 55, color: "#d2a8ff" },
                        ].map((m) => (
                            <div key={m.label} className="mb-3">
                                <div className="d-flex justify-content-between mb-1" style={{ fontSize: "13px" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>{m.label}</span>
                                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{m.value}%</span>
                                </div>
                                <div className="progress" style={{ height: "5px", background: "var(--content-bg)", borderRadius: "4px" }}>
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${m.value}%`, background: m.color, borderRadius: "4px" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
