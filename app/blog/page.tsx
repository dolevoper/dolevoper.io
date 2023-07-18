import Link from "next/link";
import Image from "next/image";
import { getPost, getSlugs } from "./posts";
import styles from "./page.module.css";

export default async function Blog() {
    const slugs = await getSlugs();
    const posts = await Promise.all(slugs.map(getPost));

    posts.sort((a, b) => +b.date - (+a.date));

    return (
        <>
            <h1>Blog</h1>
            <ol className={styles.catalog}>
                {posts.map((post) => (
                    <li key={post.slug} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image src={post.heroImage.src} alt={post.heroImage.alt} fill />
                        </div>
                        <time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
                        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ol>
        </>
    );
}