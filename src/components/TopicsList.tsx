//@ts-nocheck
import { Link, useNavigate, useParams } from "react-router-dom";
import useNotebooks from "../hooks/useNotebooks";
import { useRef, useState } from "react";
import { addTopicTo } from "../hooks/topic";
import { Topic } from "../model/Topic";
import { TextField, Button } from "@mui/material";
import { BsBook } from "react-icons/bs";
import generalStyles from "../styles/general.module.css";
import style from "../styles/topicsList.module.css";
export default function TopicsList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notebooks, setNotebooks] = useNotebooks(id);

  const dialogRef = useRef();

  const [topicForm, setTopicForm] = useState({ name: "", wasFilled: false });

  const addTopic = () => {
    if (topicForm.name != "") {
      addTopicTo(new Topic(topicForm.name), id!);
      dialogRef.current!.close();
      window.location.reload();
    }
  };

  return (
    <div className={style.container}>
      <dialog
        ref={dialogRef}
        className={generalStyles.dialog + " " + generalStyles.floatingBox}
      >
        <h2>Add topic!</h2>
        <TextField
          error={topicForm.name == "" && topicForm.wasFilled}
          label={"Name"}
          variant="filled"
          value={topicForm.name}
          onChange={(e) => {
            setTopicForm((old) => ({
              ...old,
              name: e.target.value,
              wasFilled: true,
            }));
          }}
        />
        <Button variant="contained" onClick={addTopic}>
          Add Topic!
        </Button>
        <Button variant="outline" onClick={() => dialogRef.current.close()}>
          Cancel
        </Button>
      </dialog>
      <div className={style.topicsContainer}>
        {notebooks[0]?.topics.map((topic) => (
          <div
            onClick={() => navigate("/topic/" + topic.id)}
            className={generalStyles.floatingBox + " " + style.topic}
          >
            <div
              className={style.chip}
              style={{
                backgroundColor: `rgb(${
                  255 - (255 * topic.familiarity) / 100
                },${(255 * topic.familiarity) / 100},0)`,
              }}
            >
              <div> {topic.familiarity}%</div>
            </div>
            <h3>{topic.name}</h3>
            <Button
              disabled={topic.noteBlocks.length == 0}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/train/" + topic.id);
              }}
            >
              Train topic
            </Button>
          </div>
        ))}
      </div>
      <Button
        style={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
        className={style.addTopic}
        variant={"outlined"}
        onClick={() => dialogRef.current.showModal()}
      >
        <BsBook />
        <div>Add Topic</div>
      </Button>
    </div>
  );
}
