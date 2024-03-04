import { useEffect, useState } from "react";

import { Notebook } from "../model/Notebook";
import { CONTENT_TYPES } from "../model/NoteBlock";
import { getCookie, setCookie } from "../cookies";
import { getNotebooks, setNotebooks, updateNotebook } from "./notebooks";

export const COOKIE_NAME = "notebooks";

export default function useNotebooks(
  filterForId: string | null = null
): [Notebook[], (newNotebooks: Notebook[]) => void] {
  const [notebooks, rsetNotebooks] = useState<Notebook[]>([]);
  useEffect(() => {
    //getting notebooks
    const fetchedNotebooks = getNotebooks();

    rsetNotebooks(
      filterForId == null
        ? fetchedNotebooks
        : fetchedNotebooks.filter((v) => v.id == filterForId)
    );
  }, []);
  let temp;
  if (filterForId) {
    temp = (newNotebooks: Notebook[]) => {
      rsetNotebooks([newNotebooks[0]]);
      updateNotebook(newNotebooks[0], filterForId);
    };
  } else {
    temp = (newNotebooks: Notebook[]) => {
      rsetNotebooks([...newNotebooks]);
      setNotebooks(newNotebooks);
    };
  }

  return [notebooks, temp];
}
