import Image from "next/image";
import styles from "./page.module.css";
import { getPost } from "../posts";

type PostHeaderProps = {
    slug: string
};
export default async function PostHeader({ slug }: PostHeaderProps) {
    const post = await getPost(slug);

    return (
        <header>
            <h1>{post.title}</h1>
            <div className={styles.stats}>
                <time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
                <span>{post.readingTime.text}</span>
            </div>
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

    );
}
