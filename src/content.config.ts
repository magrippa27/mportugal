import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";

const blog = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.blogConnection();

    return postsResponse.data.blogConnection.edges
      ?.filter((post) => !!post)
      .map((post) => {
        const node = post?.node;
        
        let heroImage = node?.heroImage;
        if (heroImage && typeof heroImage === 'object' && heroImage !== null) {
          heroImage = (heroImage as any).src || (heroImage as any).url || heroImage;
        }
        if (typeof heroImage !== 'string') {
          heroImage = null;
        }

        return {
          ...node,
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node?._sys,
          heroImage,
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
    categories: z.array(z.string()).optional(),
    language: z.enum(['en', 'es', 'pt']),
  }),
});

const books = defineCollection({
  loader: async () => {
    const booksResponse = await client.queries.booksConnection();

    return booksResponse.data.booksConnection.edges
      ?.filter((book) => !!book)
      .map((book) => {
        const node = book?.node;
        
        let coverImage = node?.coverImage;
        if (coverImage && typeof coverImage === 'object' && coverImage !== null) {
          coverImage = (coverImage as any).src || (coverImage as any).url || coverImage;
        }
        if (typeof coverImage !== 'string') {
          coverImage = '';
        }

        return {
          ...node,
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node?._sys,
          coverImage,
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    category: z.enum(['radio', 'tobacco', 'other']),
    publicationDate: z.coerce.date(),
    coverImage: z.string(),
    summary: z.string(),
    authorNote: z.string(),
    downloadUrl: z.string().optional(),
    language: z.enum(['en', 'es', 'pt']),
  }),
});

const page = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.pageConnection();

    // Map Tina posts to the correct format for Astro
    return postsResponse.data.pageConnection.edges
      ?.filter((p) => !!p)
      .map((p) => {
        const node = p?.node;

        return {
          ...node,
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          tinaInfo: node?._sys, // Include Tina system info if needed
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    seoTitle: z.string(),
    body: z.any(),
  }),
})
export const collections = { blog, books, page };
