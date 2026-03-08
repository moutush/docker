import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import BootstrapInit from "@/components/BootstrapInit";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
    title: "Admin Panel | Dark Theme",
    description: "Professional dark-themed admin panel built with Next.js and Bootstrap 5",
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
