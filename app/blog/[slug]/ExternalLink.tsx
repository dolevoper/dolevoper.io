import { FiExternalLink } from "react-icons/fi";

import styles from "./ExternalLink.module.css";

export default function ExternalLink({ children, ...props }: JSX.IntrinsicElements["a"]) {
    return (
        <a target="_blank" rel="noopener noreferrer" {...props}>
            {children}
            <FiExternalLink className={styles.icon} />
        </a>
    );
}
