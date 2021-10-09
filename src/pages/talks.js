import * as React from "react";
import Layout from "../components/layout";
import { container, talk } from "./talks.module.css";
import talks from "./talks.json";

const TalksPage = () => {
    return (
        <Layout title="Talks">
            <main className={container}>
                <h2>Talks</h2>
                {talks.sort((a, b) => new Date(b.date) - new Date(a.date)).map(({ title, date, url }, i) => (
                    <article key={i} className={talk}>
                        <h3>{title}</h3>
                        <figure>
                            <iframe src={url} title={title} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </figure>
                        <small>{date}</small>
                    </article>
                ))}
            </main>
        </Layout>
    );
};

export default TalksPage;
