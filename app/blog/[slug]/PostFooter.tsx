import Link from "next/link";
import { getSiblings } from "../posts";

type PostFooterProps = {
    slug: string
};
export default async function PostFooter({ slug }: PostFooterProps) {
    const { previous, next } = await getSiblings(slug);

    return (
        <footer>
            <nav>
                <ul>
                    {previous && <li>
                        <Link href={previous.slug}>{previous.title}</Link>
                    </li>}
                    <li><Link href="#">Back to top</Link></li>
                    {next && <li>
                        <Link href={next.slug}>{next.title}</Link>
                    </li>}
                </ul>
            </nav>
        </footer>
    );
}

