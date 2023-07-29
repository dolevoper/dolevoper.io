import { readdir, readFile } from "fs/promises";
import * as path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";

const postsRoot = path.join(process.cwd(), "posts");

export type Post = Awaited<ReturnType<typeof getPost>>;

export const getSlugs = cache(() => readdir(postsRoot).then((filenames) => filenames.map((filename) => filename.slice(0, -".md".length))));

export const getPost = cache(async (slug: string) => {
    const post = await readFile(path.join(postsRoot, `${slug}.md`), "utf-8");
    const { data, content } = matter(post);

    return {
        slug,
        title: data.title,
        date: new Date(data.date),
        description: data.description,
        heroImage: {
            src: data.hero_image,
            alt: data.hero_image_alt,
            credit: {
                text: data.hero_image_credit_text,
                href: data.hero_image_credit_link
            }
        },
        readingTime: readingTime(content),
        content
    };
});

export const getSiblings = cache(async (slug: string) => {
    const slugs = await getSlugs();
    const posts = await Promise.all(slugs.map(getPost));

    posts.sort((a, b) => (+a.date) - (+b.date));

    const postIndex = posts.findIndex((post) => post.slug === slug);

    return {
        previous: posts[postIndex - 1] as Post | undefined,
        next: posts[postIndex + 1] as Post | undefined
    };
});
