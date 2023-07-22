import { PropsWithChildren } from "react";
import styles from "./Main.module.css";

export const defaultMaxWidth = "60ch";

type MainProps = PropsWithChildren<{
    maxWidth?: string;
}>;
export default function Main({
    maxWidth = defaultMaxWidth,
    children,
}: MainProps) {
    return (
        <main className={styles.main} style={{
            "--max-width": maxWidth
        } as any}>
            {children}
        </main>
    );
}
