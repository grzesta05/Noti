import { useState } from "react";
import { getNotebooks } from "../hooks/notebooks";
import useNotebooks from "../hooks/useNotebooks";
import { useParams } from "react-router-dom";
import generalStyle from "../styles/general.module.css";
import styles from "../styles/statistics.module.css";
export default function Statistics() {
  const { id } = useParams();
  const [notebooks, setNotebook] = useNotebooks(id);
  const notebook = notebooks[0];
  console.log(notebook);
  return (
    <div>
      {notebook && notebook.topics.length != 0 ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ width: "100%" }}
            className={generalStyle.floatingBox + " " + styles.header}
          >
            <h2>
              You know the material for: <span> </span>
              {Math.round(
                notebook.topics
                  .map((v) => v.familiarity)
                  .reduce((p, c) => p + c) / notebook.topics.length
              )}
              %
            </h2>
          </div>
          <div
            className={
              generalStyle.floatingBox + " " + styles.percentageContainer
            }
          >
            <h3>Percentage per topics</h3>
            {notebook.topics.map((v) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{v.name}</div>
                <div>
                  <b>{v.familiarity} %</b>
                </div>
              </div>
            ))}
          </div>
          <div
            className={
              generalStyle.floatingBox + " " + styles.percentageContainer
            }
          >
            <h3>Correct and incorrect answers per topics</h3>
            <div>
              {notebook.topics.map((v) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{v.name}</div>
                  <div
                    style={{
                      display: "flex",
                      width: "25%",
                      margin: "1%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={styles.chip}
                      style={{ backgroundColor: "green" }}
                    >
                      {v.answeredCorrectly}
                    </div>
                    <div
                      className={styles.chip}
                      style={{ backgroundColor: "red" }}
                    >
                      {v.answeredIncorrectly}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h2>No statistics to be shown! Try training some topics!</h2>
      )}
    </div>
  );
}
