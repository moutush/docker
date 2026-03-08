"use client";
import { useEffect } from "react";

export default function BootstrapInit() {
    useEffect(() => {
        // Bootstrap JS is only loaded client-side to avoid SSR issues
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return null;
}
