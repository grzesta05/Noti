import { Link } from "react-router-dom";
import NoteBlock from "../components/NoteBlock";
import Header from "../components/Header";
import { useEffect } from "react";
import extractQuestionVia from "../hooks/extractQuestionVia";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { Button } from "@mui/material";
import styles from "../styles/main.module.css";
export default function MainPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.panel}>
        <h1>
          Easier Learning. Faster Progress <br /> Noti
        </h1>
        <Link to={"/notebooksList"}>
          <Button style={{ width: "15vw" }} variant="contained" color="success">
            Start!
          </Button>
        </Link>
      </div>
      <p className={styles.block}>
        <h2>
          Your ultimate solution for effortless note-taking and organization!{" "}
        </h2>
        <p>
          Say goodbye to endless hours spent creating study materials.
          SmartNotes automatically generates quizzes for your notes, saving you
          valuable time and helping you reinforce your knowledge effortlessly.
          Simply input your notes, and let our intelligent algorithms do the
          rest.
        </p>
        <h2>
          Stay ahead of the curve and ace your exams with <b>Noti.</b>
        </h2>
        <p>
          Our user-friendly interface makes it easy to organize your notes by
          subject, topic, or class, ensuring that everything you need is right
          at your fingertips. With seamless syncing across all your devices, you
          can study anytime, anywhere - whether you're on the go or hitting the
          books at home.
        </p>
        <h2>Noti: Your Study Companion - Smarter, Not Harder!</h2>
        <p>
          But that's not all - SmartNotes also offers advanced features such as
          flashcards, interactive diagrams, and audio recordings, allowing you
          to tailor your study experience to suit your learning style.
        </p>
      </p>
    </div>
  );
}
