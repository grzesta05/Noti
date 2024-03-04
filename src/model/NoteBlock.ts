import { Component } from "react";

export enum CONTENT_TYPES {
  IMAGE,
  DEFINITIONS,
  BIO,
  FORMULA,
  QUOTE,
  TEXT,
  TIMELINE,
  FLASHCARDS,
}
export enum QUESTION_TYPES {
  FLASHCARD,
  QUIZ,
  OPEN,
}

export interface NoteBlock {
  contentType: CONTENT_TYPES;
  content: object;
  generateQuiz: () => Array<object>;
}
