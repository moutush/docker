import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: false,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    fallbacks: {
        document: "/offline",
    },
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
};

export default withPWA(nextConfig);
