"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
    title: string;
    slug: string;
    snippet: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Click outside to close map
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (!query.trim()) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
                setIsOpen(true);
            } catch (err) {
                console.error("Fetch search error:", err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Navigate when keyboard Enter logic hits top default
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && results.length > 0) {
            router.push(results[0].slug);
            setIsOpen(false);
        }
    };

    return (
        <div className="search-bar-wrapper position-relative w-100" ref={wrapperRef}>
            <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-secondary">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    type="text"
                    className="form-control bg-dark border-secondary text-light"
                    placeholder="Search the Docker documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    style={{ boxShadow: "none" }}
                />
                {loading && (
                    <span className="input-group-text bg-dark border-secondary">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </span>
                )}
            </div>

            {isOpen && (
                <div className="search-dropdown position-absolute start-0 w-100 mt-2 bg-dark rounded border shadow-lg z-3 border-secondary" style={{ overflow: "hidden" }}>
                    {results.length > 0 ? (
                        <div className="list-group list-group-flush">
                            {results.map((result, idx) => (
                                <Link
                                    key={`${result.slug}-${idx}`}
                                    href={result.slug}
                                    className="list-group-item list-group-item-action bg-dark text-light border-secondary hover-bg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="d-flex w-100 justify-content-between mb-1">
                                        <h6 className="mb-1 fw-bold text-primary">{result.title}</h6>
                                    </div>
                                    <p className="mb-0 text-secondary" style={{ fontSize: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {result.snippet || "View page..."}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-3 text-center text-secondary" style={{ fontSize: 14 }}>
                            No results found for &quot;{query}&quot;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
