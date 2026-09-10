import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog/posts";

type RouteContext = {
  params: Promise<{
    categoria: string;
    slug: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<Response> {
  const { categoria, slug } = await context.params;
  const post = getPostBySlug(slug);

  if (!post || (post.status === "draft" && process.env.NODE_ENV === "production")) {
    return new NextResponse("Artículo no encontrado", { status: 404 });
  }

  const markdownContent = `---
title: "${post.title}"
description: "${post.excerpt}"
date: "${post.date}"
author: "${post.author}"
category: "${post.category}"
url: "https://alquilerdeecografos.com/blog/${post.category}/${post.slug}/"
---

# ${post.title}

${post.content}
`;

  return new NextResponse(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
