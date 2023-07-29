import Link from "next/link";
import { getSiblings } from "../posts";

import styles from "./PostFooter.module.css";

type PostFooterProps = {
    slug: string
};
export default async function PostFooter({ slug }: PostFooterProps) {
    const { previous, next } = await getSiblings(slug);

    return (
        <footer className={styles.footer}>
            <nav>
                <ul className={styles.navLinks}>
                    {next && <li>
                        <Link href={next.slug}>Next: {next.title}</Link>
                    </li>}
                    {previous && <li>
                        <Link href={previous.slug}>Back to: {previous.title}</Link>
                    </li>}
                    <li className={styles.backToTop}><Link href="#">Back to top</Link></li>
                </ul>
            </nav>
        </footer>
    );
}

