import { getCookie, setCookie } from "../cookies";
import { Notebook } from "../model/Notebook";
import { Topic } from "../model/Topic";
import { demoString } from "../storage/demo";
import { COOKIE_NAME } from "./useNotebooks";

export function addNotebook(notebook: Notebook) {
  const notebooks = [...getNotebooks(), notebook];
  localStorage.setItem(COOKIE_NAME, JSON.stringify(notebooks));
}
export function getNotebooks() {
  if (localStorage.getItem(COOKIE_NAME) == null) {
    setNotebooks(demoString as unknown as Notebook[]);
  }
  return JSON.parse(localStorage.getItem(COOKIE_NAME)!) as Notebook[];
}
export function setNotebooks(notebooks: Notebook[]) {
  localStorage.setItem(COOKIE_NAME, JSON.stringify(notebooks));
}
export function updateNotebook(notebook: Notebook, id: string) {
  const notebooks = getNotebooks();
  const index = notebooks.findIndex((v) => v.id == id);
  notebooks[index] = notebook;
  setNotebooks(notebooks);
}
export function getNotebookForTopic(id: string) {
  const notebooks = getNotebooks();
  return notebooks.find((v) => v.topics.find((o: Topic) => o.id == id));
}
export function deleteNotebook(id: string) {
  const notebooks = getNotebooks();
  const index = notebooks.findIndex((v) => v.id == id);
  notebooks.splice(index, 1);
  setNotebooks(notebooks);
}
