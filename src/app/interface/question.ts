import {Answer} from './answer';
import {KindOfQuestion} from './kindOfQuestion';
import {Category} from './category';

export interface Question {
  id: number;
  name: string;
  answers?: Answer[];
  kindOfQuestion?: KindOfQuestion;
  category: Category;
}
