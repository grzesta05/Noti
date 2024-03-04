import uuid4 from "uuid4";
import { Topic } from "./Topic";

export class Notebook {
  id: string;
  name: string;
  topics: Array<Topic> = [];
  deadline?: Date;

  constructor(name: string) {
    this.name = name;
    this.id = uuid4();
  }
}
