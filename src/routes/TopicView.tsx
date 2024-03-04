//@ts-nocheck
import { useNavigate, useParams } from "react-router-dom";
import useTopic from "../hooks/useTopic";
import { CONTENT_TYPES, NoteBlock } from "../model/NoteBlock";
import BioBlock, { BIO } from "../components/contentTypes/BioBlock";
import { useEffect, useState } from "react";
import { MODES } from "../components/contentTypes/MODES";
import SideToolbar from "../components/SideToolbar";
import { deleteTopic, updateTopic } from "../hooks/topic";
import ImageBlock, { IMAGE } from "../components/contentTypes/Image";
import TextBlock, { TEXT } from "../components/contentTypes/TextBlock";
import FlashCardsBlock, {
  FLASHCARDS,
} from "../components/contentTypes/FlashCards";
import generalStyles from "../styles/general.module.css";
import styles from "../styles/topicView.module.css";
import { Button } from "@mui/material";
import DefinitionsBlock, {
  DEFINITIONS,
} from "../components/contentTypes/definitions";
import { getNotebookForTopic } from "../hooks/notebooks";

function getComponentForContentType(contentType: CONTENT_TYPES) {
  switch (contentType) {
    case CONTENT_TYPES.BIO:
      return BioBlock;
    case CONTENT_TYPES.IMAGE:
      return ImageBlock;
    case CONTENT_TYPES.TEXT:
      return TextBlock;
    case CONTENT_TYPES.FLASHCARDS:
      return FlashCardsBlock;
    case CONTENT_TYPES.DEFINITIONS:
      return DefinitionsBlock;
  }
}
function castContentTo(content: object, contentType: CONTENT_TYPES) {
  switch (contentType) {
    case CONTENT_TYPES.BIO:
      return content as BIO;
    case CONTENT_TYPES.IMAGE:
      return content as IMAGE;
    case CONTENT_TYPES.TEXT:
      return content as TEXT;
    case CONTENT_TYPES.FLASHCARDS:
      return content as FLASHCARDS;
    case CONTENT_TYPES.DEFINITIONS:
      return content as DEFINITIONS;
  }
}

export default function TopicView() {
  const { topicID } = useParams();
  const topic = useTopic(topicID!);

  const [mode, setMode] = useState<MODES>(MODES.VIEW);
  const [noteBlocks, setNoteBlocks] = useState<Array<NoteBlock>>([]);
  const useFlashcards = useState({ index: 0, showBack: false });
  const navigate = useNavigate();
  useEffect(() => {
    if (topic != undefined) {
      setNoteBlocks(topic.noteBlocks);
      console.log(noteBlocks);
    }
  }, [topic]);
  useEffect(() => {
    if (mode == MODES.EDIT) {
      console.log("AAA");
      window.onbeforeunload = function () {
        return "Are you sure that you want to leave this page?";
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [mode]);
  const saveTopics = () => {
    if (topic && topicID) {
      updateTopic({ ...topic, noteBlocks: noteBlocks }, topicID);
      setMode(MODES.VIEW);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <div>{topic?.name}</div>
        <div>
          <Button
            color="error"
            onClick={() => {
              const notebookID = getNotebookForTopic(topicID)?.id;
              deleteTopic(topicID);
              navigate("/notebook/" + notebookID);
            }}
          >
            Delete this Topic
          </Button>
          {mode == MODES.VIEW ? (
            <Button variant="contained" onClick={() => setMode(MODES.EDIT)}>
              Edit
            </Button>
          ) : (
            <Button variant="outlined" onClick={saveTopics}>
              Save
            </Button>
          )}
        </div>
      </div>

      {mode == MODES.EDIT && <SideToolbar setNoteblocks={setNoteBlocks} />}
      <div className={styles.blocksContainer}>
        {noteBlocks.map((noteBlock, index) => (
          <div
            key={index}
            style={{
              padding: "3rem",
              marginBottom: "1vw",
              position: "relative",
            }}
            className={styles.block}
          >
            {mode == MODES.EDIT && (
              <button
                className={styles.deleteButton}
                onClick={() => {
                  noteBlocks.splice(index, 1);
                  setNoteBlocks([...noteBlocks]);
                  updateTopic({ ...topic, noteBlocks: noteBlocks }, topicID);
                }}
              >
                x
              </button>
            )}
            {getComponentForContentType(noteBlock.contentType)!({
              mode: mode,
              useFlashcards,
              content: castContentTo(noteBlock.content, noteBlock.contentType)!,
              setContent: (v) =>
                setNoteBlocks((old) => {
                  old![index].content = v;
                  return [...old!];
                }),
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
