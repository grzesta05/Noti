//@ts-nocheck
import Header from "../components/Header";
import { BsBook } from "react-icons/bs";
import { BsMortarboard } from "react-icons/bs";
import NotebookList from "../components/NotebookList";
import { useRef, useState } from "react";
import { addNotebook } from "../hooks/notebooks";
import { Notebook } from "../model/Notebook";
import { Button, TextField } from "@mui/material";
import styles from "../styles/topicsList.module.css";
import generalStyles from "../styles/general.module.css";
export default function NoteBooks() {
  const dialogRef = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notebookForm, setNotebookForm] = useState({
    name: "",
    wasFilled: false,
  });
  const handleAddNotebook = () => {
    addNotebook(new Notebook(notebookForm.name));
    window.location.reload();
  };
  return (
    <div>
      <dialog
        ref={dialogRef}
        className={generalStyles.dialog + " " + generalStyles.floatingBox}
      >
        <h2>Add Notebook!</h2>
        <TextField
          error={notebookForm.name == "" && notebookForm.wasFilled}
          label={"Name"}
          variant="filled"
          value={notebookForm.name}
          onChange={(e) => {
            setNotebookForm((old) => ({
              ...old,
              name: e.target.value,
              wasFilled: true,
            }));
          }}
        />
        <Button variant="contained" onClick={handleAddNotebook}>
          Add Notebook!
        </Button>
        <Button variant="outline" onClick={() => dialogRef.current.close()}>
          Cancel
        </Button>
      </dialog>
      <Header />
      <div
        style={{
          display: "flex",

          flexDirection: "column",
        }}
      >
        <NotebookList />
        <Button
          className={styles.addTopic}
          style={{
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
          onClick={() => dialogRef.current.showModal()}
        >
          <BsMortarboard />
          <div>Add Notebook</div>
        </Button>
      </div>
    </div>
  );
}
