import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Windows Filter Storage Driver - Docker Storage",
    description: "Learn about the default storage driver for Docker on Windows, including its configuration and prerequisites."
};

export default function WindowsFilterPage() {
    return (
        <div className="content-area">
            <div className="container-fluid py-5 px-md-5">

                {/* PAGE HEADER */}
                <div className="page-intro-header mb-5 text-center text-md-start">
                    <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>
                        Windows Filter Storage Driver
                    </h1>
                    <p className="text-secondary opacity-75 fs-5 mb-0">
                        The default driver for Windows-native container storage.
                    </p>
                </div>

                <div className="doc-content-grid">

                    {/* OVERVIEW */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-microsoft"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Driver Overview
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                The <code>windowsfilter</code> driver is the default storage engine for 
                                Docker on Windows. It uses native Windows filesystem layers to manage 
                                container data and volumes.
                            </p>
                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                <strong>Requirement:</strong> This driver only works on file systems 
                                formatted with <strong>NTFS</strong>.
                            </div>

                            <div className="doc-alert doc-alert-info">
                                <i className="bi bi-window-stack me-2"></i>
                                <strong>Noob Analogy:</strong> Think of <code>windowsfilter</code> like 
                                <strong>"The Glass Building Pattern"</strong>. Windows treats each layer 
                                like a sheer filter. When you write a file, it "filters" through the stack, 
                                and Windows ensures the container only sees the final, corrected version 
                                on its virtual drive.
                            </div>
                        </div>
                    </div>

                    {/* CONFIGURATION */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-sliders"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Configuration
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                For most users, no extra configuration is needed. However, here are the 
                                key settings you should know:
                            </p>
                            <div className="doc-sub-cards-grid mt-4">
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Storage Limit</h3>
                                    <p className="doc-sub-card-text">
                                        The default limit is <strong>127GB</strong>. You can change this 
                                        using the <code>size</code> option in your daemon config.
                                    </p>
                                </div>
                                <div className="doc-sub-card">
                                    <h3 className="doc-sub-card-title">Data Root</h3>
                                    <p className="doc-sub-card-text">
                                        By default, data is stored in <code>C:\ProgramData\docker</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHANGING STORAGE PATH */}
                    <div className="doc-section-card shadow-lg border-primary">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon bg-primary text-white">
                                <i className="bi bi-folder-symlink-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Changing the Storage Path
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>
                                To change where Docker stores your images and containers (e.g., to a D: drive), 
                                edit your <code>daemon.json</code>:
                            </p>
                            <pre className="doc-code-block">
                                {`{
  "data-root": "d:\\\\docker"
}`}
                            </pre>
                            <div className="doc-alert doc-alert-warning mt-3">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                <strong>Important:</strong> You must restart the Docker daemon for the 
                                change to take effect.
                            </div>
                        </div>
                    </div>

                    {/* STRUCTURE */}
                    <div className="doc-section-card shadow-lg">
                        <div className="doc-card-header-wrapper">
                            <div className="heading-icon">
                                <i className="bi bi-hdd-fill"></i>
                            </div>
                            <h2 className="doc-card-heading">
                                Where is it on disk?
                            </h2>
                        </div>
                        <div className="doc-card-body">
                            <p>Within your data-root, Docker creates two main subdirectories:</p>
                            <div className="notes-container">
                                <div className="component-note mb-3 p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <i className="bi bi-image text-primary me-2"></i>
                                        <code>\image\</code>: Stores image metadata and layers.
                                    </div>
                                </div>
                                <div className="component-note p-3 d-flex align-items-center" style={{ background: '#161b22', borderLeft: '4px solid #58a6ff' }}>
                                    <div>
                                        <i className="bi bi-filter-square-fill text-primary me-2"></i>
                                        <code>\windowsfilter\</code>: Stores the actual container layers.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
