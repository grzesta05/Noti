import { Topic } from "../model/Topic";
import { getNotebooks, setNotebooks } from "./notebooks";

export function addTopicTo(topic: Topic, notebookID: string) {
  const notebooks = getNotebooks();
  const searchedNotebook = notebooks.find((v) => v.id == notebookID);
  searchedNotebook?.topics.push(topic);
  setNotebooks(notebooks);
}

export function updateTopic(newTopic: Topic, topicID: string) {
  const notebooks = getNotebooks();
  let notebookIndex,
    topicIndex = null;
  notebooks.forEach((v, i) => {
    const temp = v.topics.findIndex((o) => o.id == topicID);
    if (temp != -1) {
      notebookIndex = i;
      topicIndex = temp;
    }
  });
  if (notebookIndex != null && topicIndex != null) {
    console.log("Update made");
    notebooks[notebookIndex].topics[topicIndex] = newTopic;
    setNotebooks(notebooks);
  }
}
export function getTopicById(id: string) {
  const notebooks = getNotebooks();
  for (const notebook of notebooks) {
    const searchResult = notebook.topics.find((topic) => topic.id == id);
    if (searchResult != undefined) {
      return searchResult;
    }
  }
  return undefined;
}

export function deleteTopic(id: string) {
  const notebooks = getNotebooks();
  let notebookIndex,
    topicIndex = null;
  notebooks.forEach((v, i) => {
    const temp = v.topics.findIndex((o) => o.id == id);
    if (temp != -1) {
      notebookIndex = i;
      topicIndex = temp;
    }
  });
  if (notebookIndex != null && topicIndex != null) {
    notebooks[notebookIndex].topics.splice(topicIndex, 1);
    setNotebooks(notebooks);
  }
}
