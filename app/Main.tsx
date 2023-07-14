import { PropsWithChildren } from "react";
import styles from "./Main.module.css";

export default function Main({
    children,
}: PropsWithChildren) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    );
}
