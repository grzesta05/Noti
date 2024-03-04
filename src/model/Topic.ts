import uuid4 from "uuid4";

import { NoteBlock } from "./NoteBlock";

export class Topic {
  id: string;
  name: string;
  noteBlocks: Array<NoteBlock> = [];
  familiarity: number = 0;
  answeredCorrectly: number = 0;
  answeredIncorrectly: number = 0;

  constructor(name: string) {
    this.name = name;
    this.id = uuid4();
  }

  static answer(topic: Topic, correctly: boolean) {
    if (correctly) {
      topic.answeredCorrectly++;
    } else {
      topic.answeredIncorrectly++;
    }
    topic.familiarity = Math.round(
      (topic.answeredCorrectly /
        (topic.answeredCorrectly + topic.answeredIncorrectly)) *
        100
    );
    return topic;
  }
}
