import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {CategoryService} from '../../../../services/category/category.service';
import {Category} from '../../../../interface/category';
import {QuestionService} from '../../../../services/question/question.service';
import {Question} from '../../../../interface/question';
import {Quiz} from '../../../../interface/quiz';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  categories: Category[];
  listQuestionGetByCategoryId: Question[];
  listQuestionRandom: Question[] = [];
  listQuestionCurrent: Question[] = [];
  createQuizForm: FormGroup;
  quiz: Quiz;
  isSuccess: boolean;
  isChoseCategory: boolean;
  listIdCategoriesCurrent: number[] = [];
  checkboxes: any;

  pageActual = 1;

  constructor(private fb: FormBuilder, private quizService: QuizService, private categoryService: CategoryService,
              private questionService: QuestionService) {
  }

  ngOnInit() {
    this.createQuizForm = this.fb.group({
      name: [null, Validators.required],
      questionCount: [null, Validators.required]
    });
    this.getListCategory();
  }

  createQuiz() {
    if (this.createQuizForm.valid) {
      this.getListIdCategoriesCurrent();
      this.getAllQuestionByListCategoriesCurrent(this.listIdCategoriesCurrent);
      const quiz = this.createQuizForm.value;
      this.quizService.createQuiz(quiz).subscribe(result => {
        this.quiz = result;
        this.isSuccess = true;
      }, error => {
        this.isSuccess = false;
      });
    }
  }


  getAllQuestionByListCategoriesCurrent(listIdCategoriesCurrent: number[]) {
    this.listIdCategoriesCurrent.forEach(value => {
      this.getQuestionsByCategoryId(value);
    });
  }
  getQuestionsByCategoryId(id: number) {
    this.questionService.getAllQuestionByCategoryId(id).subscribe(result => {
      this.listQuestionGetByCategoryId = result;
      this.addQuestionToListQuestionRandom();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  addQuestionToListQuestionRandom() {
    this.listQuestionRandom = this.listQuestionRandom.concat(this.listQuestionGetByCategoryId);
  }


  getListCategory() {
    this.categoryService.getAllListCategory().subscribe(result => {
      this.categories = result;
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  choseCategory() {
    this.isChoseCategory = true;
  }

  getListIdCategoriesCurrent() {
    this.checkboxes = document.getElementsByName('category');

    this.checkboxes.forEach(value => {
      if (value.checked === true) {
        this.listIdCategoriesCurrent.push(value.value);
      }
    });
  }


}
