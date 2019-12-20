import {Question} from './question';

export interface Quiz {
  id?: number;
  name: string;
  questionCount: number;
  questions?: Question[];
}
