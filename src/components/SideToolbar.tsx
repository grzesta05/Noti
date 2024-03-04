import { CONTENT_TYPES, NoteBlock } from "../model/NoteBlock";
import { makeBioQuiz } from "./contentTypes/BioBlock";
import { makeFlashCardsQuiz } from "./contentTypes/FlashCards";
import { makeImageQuiz } from "./contentTypes/Image";
import { makeTextQuiz } from "./contentTypes/TextBlock";
import style from "../styles/sidetoolbar.module.css";

import { BsCardList } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import { BsParagraph } from "react-icons/bs";
import { BsListColumns } from "react-icons/bs";
import { BsViewList } from "react-icons/bs";
import { Button } from "@mui/material";
import { makeDefinitionsQuiz } from "./contentTypes/definitions";
type Props = {
  setNoteblocks: React.Dispatch<React.SetStateAction<NoteBlock[]>>;
};

export default function SideToolbar({ setNoteblocks }: Props) {
  const noteBlocks = [
    {
      icon: <BsListColumns />,
      name: "Biography",
      contentType: CONTENT_TYPES.BIO,
      generateQuiz: makeBioQuiz,
      content: {
        name: "",
        photoURL: "",
        birthDate: "",
        birthPlace: "",
        deathDate: "",
        deathPlace: "",
        biography: "",
      },
    },
    {
      icon: <BsCardImage />,
      name: "Image",
      contentType: CONTENT_TYPES.IMAGE,
      generateQuiz: makeImageQuiz,
      content: {
        url: "",
        description: "",
      },
    },
    {
      icon: <BsParagraph />,
      name: "Text",
      contentType: CONTENT_TYPES.TEXT,
      generateQuiz: makeTextQuiz,
      content: {
        header: "",
        content: "",
      },
    },
    {
      icon: <BsViewList />,
      name: "Flashcards",
      contentType: CONTENT_TYPES.FLASHCARDS,
      generateQuiz: makeFlashCardsQuiz,
      content: {
        cards: [{ front: "", back: "" }],
      },
    },
    {
      icon: <BsCardList />,
      name: "Definitions",
      contentType: CONTENT_TYPES.DEFINITIONS,
      generateQuiz: makeDefinitionsQuiz,
      content: {
        cards: [{ front: "", back: "" }],
      },
    },
  ];

  const addNoteblock = (type: any) => {
    setNoteblocks((o) => [
      ...o,
      {
        familiarity: 0,
        contentType: type.contentType,
        content: type.content,
        generateQuiz: type.generateQuiz,
      },
    ]);
  };
  return (
    <div className={style.toolbar}>
      {noteBlocks.map((v) => (
        <Button
          style={{ display: "flex", flexDirection: "column" }}
          onClick={() => addNoteblock(v)}
        >
          <h2 className={style.icon}>{v.icon}</h2>
          {v.name}
        </Button>
      ))}
    </div>
  );
}
