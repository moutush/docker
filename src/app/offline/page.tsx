import React from 'react';

export default function OfflinePage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '3rem', color: '#0db7ed' }}>
                <i className="bi bi-cloud-slash"></i>
            </h1>
            <h2 className="mt-4">You're Offline</h2>
            <p className="text-secondary">
                It looks like you're not connected to the internet. 
                Some pages you've visited recently are available offline, 
                but this page hasn't been cached yet.
            </p>
            <button 
                className="btn btn-primary mt-3" 
                onClick={() => window.location.reload()}
            >
                Try Reconnecting
            </button>
        </div>
    );
}
