import {Question} from './question';

export interface Answer {
  id?: number;
  correct: boolean;
  content: string;
  question?: Question;
}
