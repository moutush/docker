import CkaSidebar from "@/components/CkaSidebar";
import SearchBar from "@/components/SearchBar";

export default function CkaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="app-wrapper">
            <CkaSidebar />
            <main className="main-content" id="main-content">
                {/* Topbar */}
                <header className="topbar border-bottom border-secondary border-opacity-50">
                    <div className="container-fluid px-4 d-flex align-items-center">
                        <div className="text-secondary fw-bold me-4 d-none d-md-block">
                            <i className="bi bi-bezier2 text-primary me-2"></i>
                            CKA Course
                        </div>
                        <div className="flex-grow-1">
                            <SearchBar />
                        </div>
                    </div>
                </header>

                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
}
