import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import BootstrapInit from "@/components/BootstrapInit";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
    title: "Docker Documentation | Offline Ready",
    description: "Professional Docker documentation with full offline support and PWA capabilities.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Docker Docs",
    },
    formatDetection: {
        telephone: false,
    },
    icons: {
        shortcut: "/favicon.png",
        apple: "/icons/icon-192x192.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#002451",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-bs-theme="dark">
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <body>
                <BootstrapInit />
                <div className="app-wrapper">
                    <Sidebar />
                    <main className="main-content" id="main-content">
                        {/* Topbar */}
                        <header className="topbar">
                            <div className="container-fluid px-4">
                                <SearchBar />
                            </div>
                        </header>

                        <div className="content-area">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
