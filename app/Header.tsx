import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.siteLinks}>
                    <li><Link href="/">About</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/talks">Talks</Link></li>
                </ul>
            </nav>
        </header>
    )
}
