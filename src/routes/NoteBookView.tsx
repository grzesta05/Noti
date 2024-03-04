//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import { BsBook } from "react-icons/bs";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Topic } from "../model/Topic";
import { addTopicTo } from "../hooks/topic";
import styles from "../styles/notebookView.module.css";
import generalStyles from "../styles/general.module.css";
import { Button, TextField } from "@mui/material";
import Header from "../components/Header";
import { deleteNotebook } from "../hooks/notebooks";
export default function NoteBookView() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ padding: "2vh" }}>
        <Button>
          <Link style={{ textDecoration: "none" }} to="/notebooksList">
            List of all Notebooks
          </Link>
        </Button>
        <Button
          style={{ float: "right" }}
          color="error"
          onClick={() => {
            deleteNotebook(id);
            navigate("/notebooksList/");
          }}
        >
          Delete this Topic
        </Button>
      </div>
      <div className={styles.linkContainer}>
        <Link to="" className={styles.link}>
          Topics
        </Link>
        <Link className={styles.link} to="planner">
          Planner
        </Link>
        <Link className={styles.link} to="statistics">
          Statistics
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
