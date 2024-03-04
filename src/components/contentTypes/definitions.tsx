//@ts-nocheck
import { MDXEditor } from "@mdxeditor/editor";
import NoteBlock from "../NoteBlock";
import { MODES } from "./MODES";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
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
export type DEFINITIONS = {
  cards: Flashcard[];
};

export function makeDefinitionsQuiz(content: FLASHCARDS) {
  return content.cards.map((card) => ({
    question: 'What does <b>"' + card.front + '"</b> mean?',
    answer: card.back,
  }));
}

function DefinitionsBlockView(content: FLASHCARDS) {
  return content.cards[0] ? (
    <div>
      {content.cards.map((v: Flashcard) => (
        <p>
          <b>{v.front}</b> - {v.back}
        </p>
      ))}
    </div>
  ) : (
    <h2>Add Definitions</h2>
  );
}

function DefinitionsBlockEdit(
  content: FLASHCARDS,
  setContent: React.Dispatch<React.SetStateAction<FLASHCARDS>>
) {
  console.log(content);
  return (
    <div>
      {content.cards.map((v, i) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
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
export default function DefinitionsBlock({ content, setContent, mode }: Props) {
  return (
    <div>
      {mode == MODES.VIEW
        ? DefinitionsBlockView(content)
        : DefinitionsBlockEdit(content, setContent)}
    </div>
  );
}
