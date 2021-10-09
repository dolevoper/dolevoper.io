import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import ExternalLink from "../components/externalLink";
import Layout from "../components/layout";
import { avatar, contact, container } from "./index.module.css";

const IndexPage = () => {
  return (
    <Layout>
      <main className={container}>
        <article className={avatar}>
          <figure></figure>
          <p>Hi, I'm Omer Dolev, a professional programmer, currently working as a software engineer @ Microsoft. Programming is my passion, I love learning new stuff, experimenting with new technologies and writing beautiful code.</p>
        </article>
        <article className={contact}>
          <ul>
            <li><ExternalLink href="https://github.com/dolevoper"><FontAwesomeIcon icon={faGithub} />github.com/dolevoper</ExternalLink></li>
            <li><a href="mailto:omerdolev90@gmail.com"><FontAwesomeIcon icon={faEnvelope} />omerdolev90@gmail.com</a></li>
          </ul>
        </article>
      </main>
    </Layout>
  );
};

export default IndexPage;
