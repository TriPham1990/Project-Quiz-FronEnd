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
      this.addQuiz(quiz);
    }
  }

  addQuiz(quiz: Quiz) {
    this.quizService.createQuiz(quiz).subscribe(result => {
      this.quiz = result;
      this.isSuccess = true;
      this.updateQuestionsToQuiz(this.quiz.questionCount, this.listQuestionRandom);
    }, error => {
      this.isSuccess = false;
    });
  }

  updateQuestionsToQuiz(questionCount: number, listQuestionsRandom: Question[]) {
    for (let i = 0; i < questionCount; i++) {
      const numberRandom = Math.floor(Math.random() * listQuestionsRandom.length);
      this.listQuestionCurrent.push(listQuestionsRandom[numberRandom]);
      listQuestionsRandom.splice(numberRandom, 1);
    }
    this.quiz.questions = this.listQuestionCurrent;
    this.addQuestionsToQuiz(this.quiz);
  }

  addQuestionsToQuiz(quiz: Quiz) {
    this.quizService.updateQuiz(this.quiz).subscribe(result => {
      console.log(result.questions);
      console.log('them duoc roi');
    }, error => {
      console.log('ko them dc roi');
    });

  }

  getAllQuestionByListCategoriesCurrent(listIdCategoriesCurrent: number[]) {
    this.listIdCategoriesCurrent.forEach(value => {
      this.getQuestionsByCategoryId(value);
    });
  }

  getQuestionsByCategoryId(id: number) {
    this.questionService.getAllQuestionByCategoryId(id).subscribe(result => {
      this.listQuestionGetByCategoryId = result;
      this.addQuestionsToListQuestionRandom();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  addQuestionsToListQuestionRandom() {
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
