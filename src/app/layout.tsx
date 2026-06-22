import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import BootstrapInit from "@/components/BootstrapInit";

export const metadata: Metadata = {
    title: "DevOps Learning Platform",
    description: "Professional Docker and CKA documentation with full offline support and PWA capabilities.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "DevOps Platform",
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
                {children}
            </body>
        </html>
    );
}
