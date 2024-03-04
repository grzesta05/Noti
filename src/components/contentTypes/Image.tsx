import { MDXEditor } from "@mdxeditor/editor";
import NoteBlock from "../NoteBlock";
import { MODES } from "./MODES";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { TextField } from "@mui/material";

type Props = {
  content: IMAGE;
  setContent: React.Dispatch<React.SetStateAction<IMAGE>>;
  mode: MODES;
};

export type IMAGE = {
  url: string;
  description: string;
};

export function makeImageQuiz(content: IMAGE) {
  const dict = {
    description: `What is this? <br> <img style="width:100%;" src="${content.url}" />`,
  };
  const questions = [];
  for (const [key, value] of Object.entries(content)) {
    //@ts-ignore
    if (dict[key] && value != "") {
      //@ts-ignore
      questions.push({ question: dict[key], answer: value });
    }
  }

  return questions;
}

function ImageBlockView(content: IMAGE) {
  return (
    <>
      <img style={{ width: "100%" }} src={content.url} alt="" />
      <h2 style={{ textAlign: "center" }}>{content.description}</h2>
    </>
  );
}

function ImageBlockEdit(
  content: IMAGE,
  setContent: React.Dispatch<React.SetStateAction<IMAGE>>
) {
  return (
    <>
      <img src={content.url} style={{ width: "100%" }} alt="Preview" />
      <TextField
        fullWidth
        margin="dense"
        label={"Image Source"}
        value={content.url}
        onChange={(e) => setContent({ ...content, url: e.target.value })}
      />
      <TextField
        fullWidth
        margin="dense"
        label={"Image Description"}
        value={content.description}
        onChange={(v) =>
          setContent({ ...content, description: v.target.value })
        }
      />
    </>
  );
}
export default function ImageBlock({ content, setContent, mode }: Props) {
  return (
    <div>
      {mode == MODES.EDIT
        ? ImageBlockEdit(content, setContent)
        : ImageBlockView(content)}
    </div>
  );
}
