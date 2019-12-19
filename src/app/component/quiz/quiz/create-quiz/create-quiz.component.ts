import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {CategoryService} from '../../../../services/category/category.service';
import {Category} from '../../../../interface/category';
import {QuestionService} from '../../../../services/question/question.service';
import {Question} from '../../../../interface/question';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  categories: Category[];
  questions: Question[];
  createQuizForm: FormGroup;
  category: Category;
  isSuccess: boolean;
  isCreateQuizSuccess: boolean;

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
        this.isSuccess = true;
        this.isCreateQuizSuccess = true;
        this.createQuizForm.reset();
      }, error => {
        this.isSuccess = false;
      });
    }
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
    this.getCategoryById(id);
    this.getAllListQuestionByCategory(this.category);
  }

  getAllListQuestionByCategory(category: Category) {
    this.questionService.getAllListQuestion(category).subscribe(result => {
      this.questions = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe(result => {
      this.category = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

}
