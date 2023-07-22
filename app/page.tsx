import Image from "next/image";
import Main from "@/components/Main";
import avatarPic from "./avatar.jpg";
import styles from "./page.module.css";

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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, iste animi odio eius mollitia dolores eos aut labore ea voluptas debitis! Voluptatibus nostrum, commodi hic dolor qui, maiores iure quaerat perspiciatis asperiores alias, aperiam consequuntur! Ratione quaerat reprehenderit ducimus qui.</p>
    </Main>
  );
}
