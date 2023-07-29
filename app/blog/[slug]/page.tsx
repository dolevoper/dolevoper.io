import { Metadata } from "next";
import Main from "@/components/Main";
import PostHeader from "./PostHeader";
import Markdown from "./Markdown";
import PostFooter from "./PostFooter";
import { getPost, getSlugs } from "../posts";

import styles from "./page.module.css";

export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map((slug) => ({ slug }));
}

type PostProps = {
    params: { slug: string }
};

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
    const post = await getPost(params.slug);
    const title = `Dolevoper - ${post.title}`;

    return {
        title,
        description: post.description,
        openGraph: {
            type: "article",
            description: post.description,
            title,
            images: post.heroImage.src
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: post.description,
            images: post.heroImage.src
        }
    };
}

export default async function Post({ params }: PostProps) {
    const post = await getPost(params.slug);

    return (
        <Main>
            <article className={styles.article}>
                <PostHeader slug={params.slug} />
                <Markdown>
                    {post.content}
                </Markdown>
                <PostFooter slug={params.slug} />
            </article>
        </Main>
    );
}

