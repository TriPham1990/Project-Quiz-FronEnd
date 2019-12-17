import {Question} from './question';

export interface Answer {
  id: number;
  correct: boolean;
  name: string;
  question?: Question;
}
