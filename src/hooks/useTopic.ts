import { useState } from "react";
import { getTopicById } from "./topic";
import useNotebooks from "./useNotebooks";

export default function useTopic(topicID: string) {
  const [topic, setTopic] = useState(getTopicById(topicID));

  return topic;
}
