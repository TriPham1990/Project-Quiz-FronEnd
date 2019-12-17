import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../interface/question';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../../services/question/question.service';
import {KindOfQuestion} from '../../../../interface/kindOfQuestion';
import {Category} from '../../../../interface/category';
import {CategoryService} from '../../../../services/category/category.service';
import {KindOfQuestionService} from '../../../../services/kindOfQuestion/kind-of-question.service';
import {Answer} from '../../../../interface/answer';
import {AnswerService} from '../../../../services/answer/answer.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  createQuestionForm: FormGroup;
  createAnswerForm: FormGroup;
  kindOfQuestions: KindOfQuestion[];
  categories: Category[];
  questions: Question[];
  failMessage: string;
  isCreateQuestionSuccess: boolean;
  isChoseKindOfQuestion: boolean;
  idQuestionCurrent: number;
  answers: Answer[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService,
              private categoryService: CategoryService, private kindOfQuestionService: KindOfQuestionService,
              private answerService: AnswerService) {
  }

  ngOnInit() {
    this.createQuestionForm = this.fb.group({
      category: [null, Validators.required],
      kindOfQuestion: [null, Validators.required],
      content: [null, Validators.required],
    });

    this.createAnswerForm = this.fb.group({
      correct: [null, Validators.required],
      content: [null, Validators.required]
    });

    this.getListCategory();
    this.getListKindOfQuestion();
    this.getListQuestion();

    this.idQuestionCurrent = this.questions.length + 1;
  }

  getListQuestion() {
    this.questionService.getAllListQuestion().subscribe(result => {
      this.questions = result;
      console.log('success');
    }, () => {
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

  getListKindOfQuestion() {
    this.kindOfQuestionService.getAllListKindOfQuestion().subscribe(result => {
      this.kindOfQuestions = result;
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  createQuestion() {
    const question: Question = {
      category: {id: this.createQuestionForm.get('category').value},
      kindOfQuestion: {id: this.createQuestionForm.get('kindOfQuestion').value},
      content: this.createQuestionForm.get('content').value
    };

    this.questionService.createQuestion(question).subscribe(() => {
      this.isCreateQuestionSuccess = true;
    }, () => {
      this.failMessage = 'Thêm câu hỏi thất bại';
    });
  }

  createAnswer() {
    this.createQuestion();
    if (this.isCreateQuestionSuccess) {
      const answer: Answer = {
        correct: this.createAnswerForm.get('correct').value,
        content: this.createAnswerForm.get('content').value,
        question: {
          id: this.idQuestionCurrent
        }
      };
      this.answerService.createAnswer(answer).subscribe(() => {
        this.answers.push(answer);
        this.createAnswerForm.reset();
      }, () => {
        this.failMessage = 'Thêm câu trả lời thất bại';
      });
    }
  }

  kindOfQuestionForm(id: number) {
    this.isChoseKindOfQuestion = true;
  }

}
