import { readdir, readFile } from "fs/promises";
import * as path from "path";
import matter from "gray-matter";
import Link from "next/link";

type Post = {
    slug: string;
    date: Date;
    title: string;
    content: string;
};

const postsRoot = path.join(process.cwd(), "posts");

export default async function Blog() {
    const slugs = await readdir(postsRoot);
    const posts = await Promise.all(slugs.map(async (slug) => {
        const post = await readFile(path.join(postsRoot, slug, "index.md"), "utf-8");
        const { data, content } = matter(post);

        return {
            slug,
            metadata: {
                title: data.title,
                date: new Date(data.date)
            },
            content
        };
    }));
    posts.sort((a, b) => +b.metadata.date - (+a.metadata.date));

    return (
        <div>
            <h1>Blog</h1>
            <ol>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}