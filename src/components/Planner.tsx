import { Link, useParams } from "react-router-dom";
import useNotebooks from "../hooks/useNotebooks";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pl";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import styles from "../styles/planer.module.css";
import generalStyles from "../styles/general.module.css";
import { Badge, Button } from "@mui/material";
import { Topic } from "../model/Topic";

function planRepetitions(topics: Topic[], deadline: Dayjs) {
  const topicsCopy = structuredClone(topics);
  const delta = deadline.diff(dayjs(), "day");
  const plannedRepetitions = [];
  for (let i = 0; i < delta + 1; i++) {
    let repeatedTopics = 0;
    const plannedForThisDay = [];
    for (let o = 0; o < topicsCopy.length; o++) {
      if (topicsCopy[o].familiarity < 60) {
        plannedForThisDay.push(topicsCopy[o]);
        topicsCopy[o].familiarity = topicsCopy[o].familiarity + 25;
      }
      if (repeatedTopics > 3) {
        break;
      }
    }
    for (let o = 0; o < topicsCopy.length; o++) {
      topicsCopy[o].familiarity = topicsCopy[o].familiarity / (1 + 4 / delta);
    }
    plannedRepetitions.push(plannedForThisDay);
  }
  console.log(delta);
  return plannedRepetitions;
}
export default function Planner() {
  const { id } = useParams();
  const [deadline, setDeadline] = useState(new Date());
  const [notebooks, setNotebooks] = useNotebooks(id);
  const notebook = notebooks[0];
  useEffect(() => {
    if (notebook != undefined && notebook.deadline != undefined) {
      setDeadline(notebook.deadline);
    }
  }, [notebooks]);

  const updateDeadlineInStorage = (newDate: Dayjs | undefined) => {
    console.log(newDate);
    //@ts-ignore
    setDeadline(newDate?.toDate());
    setNotebooks([{ ...notebooks[0], deadline: newDate?.toDate() }]);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "5vh",
          gap: "5vh",
        }}
      >
        <div className={styles.date + " " + generalStyles.floatingBox}>
          <h2>Calendar</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DateCalendar
              disablePast
              value={dayjs(notebook?.deadline)}
              onChange={(newDate) =>
                updateDeadlineInStorage(newDate || undefined)
              }
            />
            <DatePicker
              disablePast
              label="Set the deadline"
              value={dayjs(notebook?.deadline) || null}
              onChange={(newDate) =>
                updateDeadlineInStorage(newDate || undefined)
              }
            />
          </LocalizationProvider>
        </div>
        <div
          className={
            styles.repetitionsContainer + " " + generalStyles.floatingBox
          }
        >
          <h2>Repetitions</h2>
          {notebook &&
            planRepetitions(notebook.topics, dayjs(deadline)).map((v, k) => {
              const date = dayjs().add(k, "days");
              if (v.length == 0) return;
              return (
                <>
                  <h3>{date.toString().substring(0, 16)}</h3>
                  <ul>
                    {v.map((v) => (
                      <li>
                        <Link to={"/topic/" + v.id}>{v.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              );
            })}
        </div>
      </div>
      <p style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        Select deadline to properly space repetitions. Go through calendar and
        see what topics should you train on specific days
      </p>
    </>
  );
}
