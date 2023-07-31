"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import { useReducer, useState } from "react";

const links = [
    { text: "About", href: "/" },
    { text: "Blog", href: "/blog" },
    { text: "Talks", href: "/talks" },
];

export default function Header() {
    const pathname = usePathname();
    const [isNavMenuOpen, toggleIsNavMenuOpen] = useReducer((value) => !value, false);

    return (
        <header className={styles.header}>
            {isNavMenuOpen && <div className={styles.backdrop} onClick={toggleIsNavMenuOpen}></div>}
            <label htmlFor="isNavMenuOpen" role="button" aria-controls="primary-navigation" aria-expanded={isNavMenuOpen}>
                <svg viewBox="0 0 100 100" width="1em" stroke="currentColor" fill="currentColor">
                    <rect width={80} height={10} x={10} y={25} rx={5} />
                    <rect width={80} height={10} x={10} y={45} rx={5} />
                    <rect width={80} height={10} x={10} y={65} rx={5} />
                </svg>
                <span className={styles.visuallyHidden}>Open menu</span>
            </label>
            <input id="isNavMenuOpen" type="checkbox" checked={isNavMenuOpen} onClick={toggleIsNavMenuOpen} />
            <nav id="primary-navigation">
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
