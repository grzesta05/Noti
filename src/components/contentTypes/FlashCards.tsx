//@ts-nocheck
import { MDXEditor } from "@mdxeditor/editor";
import NoteBlock from "../NoteBlock";
import { MODES } from "./MODES";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import styles from "../../styles/flashcards.module.css";
import generalStyles from "../../styles/general.module.css";
import { Button, TextField } from "@mui/material";
type Props = {
  content: FLASHCARDS;
  setContent: React.Dispatch<React.SetStateAction<FLASHCARDS>>;
  mode: MODES;
  useFlashcards: [object, React.Dispatch<React.SetStateAction<object>>];
};
type Flashcard = {
  front: string;
  back: string;
};
export type FLASHCARDS = {
  cards: Flashcard[];
};

export function makeFlashCardsQuiz(content: FLASHCARDS) {
  return content.cards.map((card) => ({
    question: card.front,
    answer: card.back,
  }));
}

function FlashCardsBlockView(
  content: FLASHCARDS,
  index: any,
  setIndex: any,
  showBack: any,
  setShowBack: any
) {
  console.log(index, showBack);
  const goForward = () => {
    if (index + 1 >= content.cards.length) {
      setIndex(0);
    } else setIndex(index + 1);

    setShowBack(false);
  };
  const goBack = () => {
    if (index - 1 < 0) {
      setIndex(content.cards.length - 1);
    } else setIndex(index - 1);

    setShowBack(false);
  };
  return content.cards[0] ? (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <button onClick={() => goBack()}>&larr;</button>
        <div
          className={styles.card + " " + generalStyles.floatingBox}
          onClick={() => setShowBack(!showBack)}
        >
          {!showBack ? content.cards[index].front : content.cards[index].back}
        </div>
        <button onClick={() => goForward()}>&rarr;</button>
      </div>
      <div style={{ margin: "0.4rem" }}>
        {index + 1} of {content.cards.length}
      </div>
      <p>Click Card to reveal answer</p>
    </div>
  ) : (
    <h2>Add Flashcards</h2>
  );
}

function FlashCardsBlockEdit(
  content: FLASHCARDS,
  setContent: React.Dispatch<React.SetStateAction<FLASHCARDS>>
) {
  console.log(content);
  return (
    <div>
      {content.cards.map((v, i) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            margin="dense"
            color="error"
            onClick={() => {
              const newCards = content.cards;
              newCards.splice(i, 1);
              setContent({ content, cards: newCards });
            }}
          >
            x
          </Button>
          <TextField
            fullWidth
            margin="dense"
            label="Front"
            value={v.front}
            onChange={(e) => {
              content.cards[i] = {
                ...content.cards[i],
                front: e.target.value,
              };
              setContent(content);
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Back"
            value={v.back}
            onChange={(e) => {
              content.cards[i] = {
                ...content.cards[i],
                back: e.target.value,
              };
              setContent(content);
            }}
          />
        </div>
      ))}
      <Button
        fullWidth
        variant="outlined"
        onClick={() =>
          setContent({
            ...content,
            cards: [...content.cards, { front: "", back: "" }],
          })
        }
      >
        +
      </Button>
    </div>
  );
}
export default function FlashCardsBlock({
  content,
  setContent,
  mode,
  useFlashcards,
}: Props) {
  return (
    <div>
      {mode == MODES.VIEW
        ? FlashCardsBlockView(
            content,
            useFlashcards[0].index,
            (newIndex) => useFlashcards[1]((v) => ({ ...v, index: newIndex })),
            useFlashcards[0].showBack,
            (newIndex) =>
              useFlashcards[1]((v) => ({ ...v, showBack: newIndex }))
          )
        : FlashCardsBlockEdit(content, setContent)}
    </div>
  );
}
