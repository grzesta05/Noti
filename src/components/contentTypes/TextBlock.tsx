import { MDXEditor } from "@mdxeditor/editor";
import NoteBlock from "../NoteBlock";
import { MODES } from "./MODES";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Button, TextField } from "@mui/material";
type Props = {
  content: TEXT;
  setContent: React.Dispatch<React.SetStateAction<TEXT>>;
  mode: MODES;
};
type question = {
  question: string;
  answer: string;
};
export type TEXT = {
  header: string;
  content: string;
  questions?: question[];
};

export function makeTextQuiz(content: TEXT) {
  return content.questions ? content.questions : [];
}

function TextBlockView(content: TEXT) {
  return (
    <>
      <h2>{content.header}</h2>
      <Markdown rehypePlugins={[rehypeRaw]}>{content.content}</Markdown>
      {content.questions && content.questions.length != 0 && (
        <>
          <h3>Questions:</h3>
          {content.questions.map((v) => (
            <div>
              <p>
                <b>{v.question}</b>
              </p>
              <p>
                <i>{v.answer}</i>
              </p>
            </div>
          ))}
        </>
      )}
    </>
  );
}

function TextBlockEdit(
  content: TEXT,
  setContent: React.Dispatch<React.SetStateAction<TEXT>>
) {
  return (
    <>
      <TextField
        label="Header"
        fullWidth
        margin="dense"
        value={content.header}
        onChange={(v) => setContent({ ...content, header: v.target.value })}
      />
      <NoteBlock
        markdown={content.content}
        setMarkdown={(v: string) => setContent({ ...content, content: v })}
      />
      {content.questions &&
        content.questions.map((v, k) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              color="error"
              onClick={() => {
                content.questions?.splice(k, 1);
                setContent(content);
              }}
            >
              x
            </Button>
            <>
              <TextField
                label="Question"
                fullWidth
                margin="dense"
                value={v.question}
                onChange={(e) => {
                  const newQuestion = v;
                  newQuestion.question = e.target.value;
                  //@ts-ignore
                  content.questions[k] = newQuestion;
                  setContent(content);
                }}
              />
            </>
            <>
              <TextField
                label="Answer"
                fullWidth
                margin="dense"
                value={v.answer}
                onChange={(e) => {
                  const newQuestion = v;
                  newQuestion.answer = e.target.value;
                  //@ts-ignore
                  content.questions[k] = newQuestion;
                  setContent(content);
                }}
              />
            </>
          </div>
        ))}
      <Button
        variant="outlined"
        fullWidth
        onClick={() =>
          setContent({
            ...content,
            questions: [
              ...(content.questions ? content.questions : []),
              { question: "", answer: "" },
            ],
          })
        }
      >
        Add Question
      </Button>
    </>
  );
}
export default function TextBlock({ content, setContent, mode }: Props) {
  return (
    <div>
      {mode == MODES.EDIT
        ? TextBlockEdit(content, setContent)
        : TextBlockView(content)}
    </div>
  );
}
