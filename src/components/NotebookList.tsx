import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Notebook } from "../model/Notebook";
import useNotebooks from "../hooks/useNotebooks";
import styles from "../styles/notebooksList.module.css";
import generalStyles from "../styles/general.module.css";
import { BsBoxArrowRight } from "react-icons/bs";

export default function NotebookList() {
  const [notebooks, setNotebooks] = useNotebooks();
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "7vh",
        minHeight: "contain",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {notebooks != undefined &&
        notebooks.map((noteBook) => {
          const colors = [
            {
              r: Math.round(Math.random() * 155) + 100,
              g: Math.round(Math.random() * 155) + 100,
              b: Math.round(Math.random() * 155) + 100,
            },
            {
              r: Math.round(Math.random() * 155) + 100,
              g: Math.round(Math.random() * 155) + 100,
              b: Math.round(Math.random() * 155) + 100,
            },
          ];
          return (
            <div
              onClick={() => navigate("/notebook/" + noteBook.id)}
              style={{
                background: `linear-gradient(120deg, rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b}) 0%, rgb(${colors[1].r}, ${colors[1].g}, ${colors[1].b}) 200%)`,
              }}
              className={styles.card + " " + generalStyles.floatingBox}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "100% !important",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1vw",
                }}
                key={noteBook.id}
              >
                <>{noteBook.name}</>
                <BsBoxArrowRight />
              </div>
            </div>
          );
        })}
    </div>
  );
}
