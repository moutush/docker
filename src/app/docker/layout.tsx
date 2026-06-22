import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export default function DockerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
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
    );
}
