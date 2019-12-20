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
  questions: Question[];
  listQuestionCurrent: Question[] = [];
  createQuizForm: FormGroup;
  category: Category;
  question: Question;
  quiz: Quiz;
  isSuccess: boolean;
  isChoseCategory: boolean;

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
      const quiz = this.createQuizForm.value;
      this.quizService.createQuiz(quiz).subscribe(result => {
        this.quiz = result;
        this.isSuccess = true;
        this.createQuizForm.reset();
      }, error => {
        this.isSuccess = false;
      });
    }
  }

  addQuestionToQuiz(id: number) {
    this.getQuestionById(id);
  }

  updateQuiz() {
    this.listQuestionCurrent.push(this.question);
    console.log(this.listQuestionCurrent.length);
    this.quiz.questions = this.questions;
    this.quizService.updateQuiz(this.quiz).subscribe(result => {
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  getQuestionById(id: number) {
    this.questionService.getQuestionById(id).subscribe(result => {
      this.question = result;
      this.updateQuiz();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  getListCategory() {
    this.categoryService.getAllListCategory().subscribe(result => {
      this.categories = result;
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  getListQuestionByCategory(id: number) {
    this.getAllListQuestionByCategory(id);
  }

  getAllListQuestionByCategory(id: number) {
    this.questionService.getAllQuestionByCategoryId(id).subscribe(result => {
      this.questions = result;
      this.isChoseCategory = true;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }



}
