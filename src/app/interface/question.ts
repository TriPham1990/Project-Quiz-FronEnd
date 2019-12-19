import {Answer} from './answer';
import {KindOfQuestion} from './kindOfQuestion';
import {Category} from './category';
import {Quiz} from './quiz';

export interface Question {
  id?: number;
  content?: string;
  answers?: Answer[];
  kindOfQuestion?: KindOfQuestion;
  category?: Category;
  quiz?: Quiz;
}
