"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

const links = [
    { text: "About", href: "/" },
    { text: "Blog", href: "/blog" },
    { text: "Talks", href: "/talks" },
];

export default function Header() {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.siteLinks}>
                    {links.map(({ text, href }, index) => (
                        <li key={index}>
                            <Link href={href} data-active={pathname === href ? "" : undefined}>{text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
