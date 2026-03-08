import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    console.log("API: Fetching menu items...");
    try {
        const rawItems = await prisma.menuItem.findMany({
            include: {
                page: {
                    select: {
                        slug: true
                    }
                }
            },
            orderBy: [
                { parentId: 'desc' }, // Sort by nesting logic lightly
                { order: 'asc' }
            ]
        });

        // Build full hierarchy recursively
        function buildTree(items: typeof rawItems, parentId: number | null = null): any[] {
            return items
                .filter(item => item.parentId === parentId)
                .map(item => {
                    const children = buildTree(items, item.id);
                    return {
                        label: item.label,
                        icon: item.icon,
                        badge: item.badge || undefined,
                        href: item.page?.slug || undefined,
                        children: children.length > 0 ? children : undefined
                    };
                });
        }

        const topLevel = rawItems.filter(item => item.parentId === null);

        const formattedConfig = topLevel.map(parent => {
            const children = buildTree(rawItems, parent.id);

            return {
                section: parent.order === 1 ? "GETTING STARTED" : parent.order === 2 ? "CORE" : undefined,
                label: parent.label,
                icon: parent.icon,
                badge: parent.badge || undefined,
                href: parent.page?.slug || undefined,
                children: children.length > 0 ? children : undefined
            };
        });

        return NextResponse.json(formattedConfig);
    } catch (error) {
        console.error("Menu fetch error:", error);
        return NextResponse.json([{ label: "Error loading menu", icon: "bi-exclamation-triangle-fill" }], { status: 500 });
    }
}
