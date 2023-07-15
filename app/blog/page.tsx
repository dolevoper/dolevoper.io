import Link from "next/link";
import { getPost, getSlugs } from "./posts";

export default async function Blog() {
    const slugs = await getSlugs();
    const posts = await Promise.all(slugs.map(getPost));
    posts.sort((a, b) => +b.date - (+a.date));

    return (
        <div>
            <h1>Blog</h1>
            <ol>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}