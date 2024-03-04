//@ts-nocheck
import { useNavigate, useParams } from "react-router-dom";
import { getTopicById, updateTopic } from "../hooks/topic";
import { useRef, useState } from "react";
import { CONTENT_TYPES } from "../model/NoteBlock";
import { BIO, makeBioQuiz } from "../components/contentTypes/BioBlock";
import Markdown from "react-markdown";
import { Topic } from "../model/Topic";
import rehypeRaw from "rehype-raw";
import { makeImageQuiz } from "../components/contentTypes/Image";
import { makeTextQuiz } from "../components/contentTypes/TextBlock";
import { makeFlashCardsQuiz } from "../components/contentTypes/FlashCards";
import styles from "../styles/train.module.css";
import generalStyles from "../styles/general.module.css";
import { Button } from "@mui/material";
import { makeDefinitionsQuiz } from "../components/contentTypes/definitions";
import { getNotebookForTopic } from "../hooks/notebooks";

function getQuizGeneratingFunction(type: CONTENT_TYPES) {
  switch (type) {
    case CONTENT_TYPES.BIO:
      return makeBioQuiz;
    case CONTENT_TYPES.IMAGE:
      return makeImageQuiz;
    case CONTENT_TYPES.TEXT:
      return makeTextQuiz;
    case CONTENT_TYPES.FLASHCARDS:
      return makeFlashCardsQuiz;
    case CONTENT_TYPES.DEFINITIONS:
      return makeDefinitionsQuiz;
  }
}
export default function Train() {
  const { topicID } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(getTopicById(topicID!));
  const [questions, setQuestions] = useState(
    topic?.noteBlocks
      //@ts-ignore
      .map((v) => getQuizGeneratingFunction(v.contentType)!(v.content))
      .flat()
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 10)
  );
  const [answersCorrectness, setAnswersCorectness] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dialogRef = useRef();
  const handleAnswered = (correctly: boolean) => {
    setShowAnswer(false);
    setTopic(Topic.answer(topic!, correctly));
    if (correctly) {
      setAnswersCorectness((v) => ({ ...v, correct: v.correct + 1 }));
    } else {
      setAnswersCorectness((v) => ({ ...v, incorrect: v.incorrect + 1 }));
    }
    if (currentQuestionIndex + 1 < questions!.length) {
      setCurrentQuestionIndex((old) => old + 1);
    } else {
      updateTopic(topic!, topic!.id);
      dialogRef.current.showModal();
    }
  };

  return (
    <div className={styles.container}>
      <dialog
        className={generalStyles.dialog + " " + generalStyles.floatingBox}
        ref={dialogRef}
      >
        <h2>Congratulations!</h2>
        <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Answered:
          <span style={{ color: "green" }}>
            {" " + answersCorrectness.correct} correctly
          </span>{" "}
          and{" "}
          <span style={{ color: "red" }}>
            {answersCorrectness.incorrect} incorrectly
          </span>
        </p>
        <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
          {Math.round(
            (100 * answersCorrectness.correct) /
              (answersCorrectness.correct + answersCorrectness.incorrect)
          )}{" "}
          %
        </h3>
        <Button
          onClick={() => {
            navigate("/notebook/" + getNotebookForTopic(topicID)?.id);
          }}
        >
          Go back
        </Button>
      </dialog>
      <div className={generalStyles.floatingBox + " " + styles.card}>
        <Markdown rehypePlugins={[rehypeRaw]}>
          {questions![currentQuestionIndex].question}
        </Markdown>
        <div>
          {!showAnswer ? (
            <Button onClick={() => setShowAnswer(true)}>Show answer</Button>
          ) : (
            <>
              <Markdown className={styles.answer}>
                {questions![currentQuestionIndex].answer}
              </Markdown>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAnswered(true)}
                >
                  Correct!
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleAnswered(false)}
                >
                  Incorrect :c
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
