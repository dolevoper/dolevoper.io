import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./page.module.css";
import { getPost, getSlugs } from "../posts";

export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map((slug) => ({ slug }));
}

type PostProps = {
    params: { slug: string }
};
export default async function Post({ params }: PostProps) {
    const post = await getPost(params.slug);

    return (
        <article className={styles.article}>
            <header>
                <h1>{post.title}</h1>
                <time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
                <p>{post.description}</p>
                <div className={styles.heroImageWrapper}>
                    <Image
                        src={post.heroImage.src}
                        alt={post.heroImage.alt}
                        loading="eager"
                        fill
                        priority />
                </div>
                <p className={styles.heroImageCredit}>Photo by <a href={post.heroImage.credit.href}>{post.heroImage.credit.text}</a></p>
            </header>
            <ReactMarkdown>
                {post.content}
            </ReactMarkdown>
        </article>
    )
}

