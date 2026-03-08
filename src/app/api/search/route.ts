import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        // Search across page titles, descriptions, and component content
        const results = await prisma.page.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                    {
                        components: {
                            some: {
                                content: { contains: query },
                            },
                        },
                    },
                ],
            },
            select: {
                title: true,
                slug: true,
                description: true,
            },
            take: 8,
        });

        const formattedResults = results.map((page) => ({
            title: page.title,
            slug: page.slug,
            snippet: page.description,
        }));

        return NextResponse.json({ results: formattedResults });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Failed to search" }, { status: 500 });
    }
}
