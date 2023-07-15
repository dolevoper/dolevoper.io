import { readdir, readFile } from "fs/promises";
import * as path from "path";
import matter from "gray-matter";

const postsRoot = path.join(process.cwd(), "posts");

export type Post = Awaited<ReturnType<typeof getPost>>;

export const getSlugs = () => readdir(postsRoot);

export const getPost = async (slug: string) => {
    const post = await readFile(path.join(postsRoot, slug, "index.md"), "utf-8");
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
        content
    };
};