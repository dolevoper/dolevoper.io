import { FiExternalLink } from "react-icons/fi";

import styles from "./ExternalLink.module.css";

type ExternalLinkProps = JSX.IntrinsicElements["a"] & {
    hideExternalIcon?: boolean;
};
export default function ExternalLink({ hideExternalIcon, children, ...props }: ExternalLinkProps) {
    return (
        <a target="_blank" rel="noopener noreferrer" {...props}>
            {children}
            {!hideExternalIcon && <FiExternalLink className={styles.icon} />}
        </a>
    );
}
