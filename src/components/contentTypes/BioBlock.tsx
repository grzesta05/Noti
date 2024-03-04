import { MDXEditor } from "@mdxeditor/editor";
import NoteBlock from "../NoteBlock";
import { MODES } from "./MODES";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { TextField } from "@mui/material";
type Props = {
  content: BIO;
  setContent: React.Dispatch<React.SetStateAction<BIO>>;
  mode: MODES;
};

export type BIO = {
  name: string;
  photoURL?: string;
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  biography: string;
};

export function makeBioQuiz(content: BIO) {
  const dict = {
    birthDate: `When was <b>${content.name}</b> born?`,
    birthPlace: `Where was <b>${content.name}</b> born?`,
    deathDate: `When did <b>${content.name}</b> die`,
    deathPlace: `Where did <b>${content.name}</b> die`,
  };
  const questions = [];
  for (const [key, value] of Object.entries(content)) {
    //@ts-ignore
    if (dict[key] && value != "") {
      //@ts-ignore
      questions.push({ question: dict[key], answer: value });
    }
  }
  questions.push({
    question: `About who is this fragment? \n ${content.biography.substring(
      0,
      content.biography.length - 1 > 500 ? 500 : content.biography.length - 1
    )}`,
    answer: content.name,
  });
  return questions;
}

function BioBlockView(content: BIO) {
  return (
    <>
      <img src={content.photoURL} alt="" />
      <h2>{content.name}</h2>
      {(content.birthDate || content.birthPlace) && (
        <p>
          Born {content.birthDate} {content.birthPlace}
        </p>
      )}
      {(content.deathDate || content.deathPlace) && (
        <p>
          Died {content.deathDate} {content.deathPlace}
        </p>
      )}
      <Markdown rehypePlugins={[rehypeRaw]}>{content.biography}</Markdown>
    </>
  );
}

function BioBlockEdit(
  content: BIO,
  setContent: React.Dispatch<React.SetStateAction<BIO>>
) {
  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        label="Full Name"
        value={content.name}
        onChange={(e) => setContent({ ...content, name: e.target.value })}
      />
      <div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TextField
            fullWidth
            margin="dense"
            label="Date of Birth"
            value={content.birthDate}
            onChange={(v) =>
              setContent({ ...content, birthDate: v.target.value })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Place of Birth"
            onChange={(v) =>
              setContent({ ...content, birthPlace: v.target.value })
            }
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TextField
            fullWidth
            margin="dense"
            label="Date of Death"
            value={content.deathDate}
            onChange={(v) =>
              setContent({ ...content, deathDate: v.target.value })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Place of Death"
            value={content.deathPlace}
            onChange={(v) =>
              setContent({ ...content, deathPlace: v.target.value })
            }
          />
        </div>
      </div>
      <div>
        <TextField
          fullWidth
          margin="dense"
          label="Image Source"
          value={content.photoURL}
          onChange={(e) => setContent({ ...content, photoURL: e.target.value })}
        />
        <img src={content.photoURL} alt="Preview" />
      </div>
      <NoteBlock
        markdown={content.biography}
        setMarkdown={(v: string) => setContent({ ...content, biography: v })}
      />
    </>
  );
}
export default function BioBlock({ content, setContent, mode }: Props) {
  return (
    <div>
      {mode == MODES.EDIT
        ? BioBlockEdit(content, setContent)
        : BioBlockView(content)}
    </div>
  );
}
