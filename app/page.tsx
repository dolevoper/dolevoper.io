import Image from "next/image";
import Main from "@/components/Main";
import { FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";
import ExternalLink from "@/components/ExternalLink";
import avatarPic from "./avatar.jpg";
import styles from "./page.module.css";

export const description = `I'm Omer Dolev. I love writing code, geeking out about code and teaching.
I learned my first programming language (VB6) when I was 11 years old and haven't stopped programming since.
I'm working as a professional full stack web developer for more than 7 years and I occasionaly give talks and write to my tech blog.`;

export default function Home() {
  return (
    <Main>
      <h1>Dolevoper</h1>
      <div className={styles.profilePicContainer}>
        <Image
          src={avatarPic}
          alt="Smiling face in the dark"
          className={styles.profilePic}
          loading="eager"
          priority
          fill />
      </div>
      <h2>About me</h2>
      <p>{description}</p>
      <article className={styles.links}>
        <ExternalLink
          href="https://github.com/dolevoper"
          hideExternalIcon>
          <FaGithub size="3em" />
          <span>github.com/dolevoper</span>
        </ExternalLink>
        <ExternalLink
          href="mailto:omerdolev90@gmail.com"
          hideExternalIcon>
          <FaEnvelope size="3em" />
          <span>omerdolev90@gmail.com</span>
        </ExternalLink>
        <ExternalLink
          href="https://twitter.com/dolevoper"
          hideExternalIcon>
          <FaTwitter size="3em" />
          <span>@dolevoper</span>
        </ExternalLink>
      </article>
    </Main>
  );
}
