"use client";

import React, { useState } from 'react';
import { NAV_CONFIG } from '@/components/Sidebar';

export default function SyncPage() {
  const [status, setStatus] = useState<'idle' | 'clearing' | 'syncing' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [totalUrls, setTotalUrls] = useState(0);

  // Helper to extract all URLs from NAV_CONFIG
  const getAllUrls = () => {
    const urls: string[] = ['/', '/offline'];
    const traverse = (items: any[]) => {
      items.forEach(item => {
        if (item.href) urls.push(item.href);
        if (item.children) traverse(item.children);
      });
    };
    traverse(NAV_CONFIG);
    return Array.from(new Set(urls));
  };

  const startSync = async () => {
    try {
      setStatus('clearing');
      
      // 1. Clear Caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      // 2. Register Service Worker if not registered (to ensure it's there)
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/sw.js');
      }

      setStatus('syncing');
      const allUrls = getAllUrls();
      setTotalUrls(allUrls.length);
      
      let completed = 0;
      for (const url of allUrls) {
        setCurrentUrl(url);
        try {
          // Fetch the page to trigger SW caching
          // Adding a cache-busting param to ensure we get fresh content from network first
          await fetch(`${url}?sync=${Date.now()}`, { cache: 'reload' });
          completed++;
          setProgress(Math.round((completed / allUrls.length) * 100));
        } catch (err) {
          console.error(`Failed to sync ${url}`, err);
        }
      }

      setStatus('completed');
    } catch (err) {
      console.error('Sync failed', err);
      setStatus('error');
    }
  };

  return (
    <div className="content-area container-fluid py-5 px-4 px-md-5">
      <div className="doc-section-card shadow-lg p-5 border border-primary border-opacity-10 text-center">
        <div className="mb-4">
          <div className="heading-icon text-primary mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '40px' }}>
            <i className={`bi ${status === 'syncing' ? 'bi-arrow-repeat spin' : 'bi-cloud-download-fill'}`}></i>
          </div>
          <h1 className="doc-card-heading fs-2">Offline Sync Manager</h1>
          <p className="text-secondary opacity-75 fs-5">
            Synchronize all documentation pages and interactive quizzes for offline use.
          </p>
        </div>

        <div className="my-5">
          {status === 'idle' && (
            <button className="btn btn-primary btn-lg px-5 py-3 fw-bold" onClick={startSync}>
              <i className="bi bi-play-fill me-2"></i> Initial Deep Sync
            </button>
          )}

          {(status === 'clearing' || status === 'syncing') && (
            <div className="sync-ui-wrapper">
              <div className="progress mb-3 bg-dark bg-opacity-50" style={{ height: '12px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-primary fw-bold mb-1">{progress}% Complete</p>
              <p className="text-secondary small">
                {status === 'clearing' ? 'Purging old caches...' : `Syncing: ${currentUrl}`}
              </p>
            </div>
          )}

          {status === 'completed' && (
            <div className="animate-fade-in">
              <div className="alert alert-success d-inline-block px-4 py-3 border-0 bg-success bg-opacity-10 text-success">
                <i className="bi bi-check-circle-fill me-2"></i> All {totalUrls} pages synced successfully!
              </div>
              <div className="mt-4">
                <button className="btn btn-outline-primary" onClick={() => setStatus('idle')}>
                  Re-sync
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
             <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> 
                Sync failed. Please check your internet connection and try again.
             </div>
          )}
        </div>

        <div className="doc-alert doc-alert-info text-start mt-5">
          <h5 className="fs-6 fw-bold mb-2"><i className="bi bi-info-circle-fill me-2"></i> Why Sync?</h5>
          <ul className="small mb-0 opacity-75">
            <li>Ensures every single page is available even if you haven't visited it yet.</li>
            <li>Downloads all interactive quiz modules and Docker commands.</li>
            <li>Ideal for traveling or working in environments with restricted internet.</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .spin {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
