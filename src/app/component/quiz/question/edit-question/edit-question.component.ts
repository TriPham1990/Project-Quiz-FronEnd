import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../interface/category';
import {CategoryService} from '../../../../services/category/category.service';
import {KindOfQuestion} from '../../../../interface/kindOfQuestion';
import {KindOfQuestionService} from '../../../../services/kindOfQuestion/kind-of-question.service';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../interface/question';
import {QuestionService} from '../../../../services/question/question.service';
import {Answer} from '../../../../interface/answer';
import {AnswerService} from '../../../../services/answer/answer.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  editQuestionForm: FormGroup;
  categories: Category[];
  kindOfQuestions: KindOfQuestion[];
  answers: Answer[];
  question: Question;
  failMessage: string;
  choseClassifyQuestion: boolean;
  idCategory: number;
  idKindOfQuestion: number;
  isHadCategory: boolean;
  isHadKindOfQuestion: boolean;

  constructor(private fb: FormBuilder,
              private questionService: QuestionService,
              private categoryService: CategoryService,
              private kindOfQuestionService: KindOfQuestionService,
              private answerService: AnswerService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getListCategory();
    this.getListKindOfQuestion();
    const id = +this.route.snapshot.paramMap.get('id');
    this.editQuestionForm = this.fb.group({
      category: [null, Validators.required],
      kindOfQuestion: [null, Validators.required],
      content: [null, Validators.required],
    });
    this.getQuestionById(id);
  }

  getQuestionById(id: number) {
    this.questionService.getQuestionById(id).subscribe(result => {
      this.question = result;
      this.editQuestionForm.patchValue(this.question);

      this.checkExistCategory();

      this.checkExistKindOfQuestion();

      this.checkKindOfQuestion();

      this.getAllListAnswerByQuestionId(id);

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

  getListKindOfQuestion() {
    this.kindOfQuestionService.getAllListKindOfQuestion().subscribe(result => {
      this.kindOfQuestions = result;
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

  getAllListAnswerByQuestionId(id: number) {
    this.answerService.getAllAnswerByQuestionId(id).subscribe(result => {
      this.answers = result;
      console.log(this.answers);
    }, error => {
      console.log('error');
    });
  }

  checkExistCategory() {
    if (this.question.category !== null) {
      this.idCategory = this.question.category.id;
      this.isHadCategory = true;
    } else {
      this.isHadCategory = false;
    }
  }

  checkExistKindOfQuestion() {
    if (this.question.kindOfQuestion !== null) {
      this.idKindOfQuestion = this.question.kindOfQuestion.id;
      this.isHadKindOfQuestion = true;
    } else {
      this.isHadKindOfQuestion = false;
    }
  }

  checkKindOfQuestion() {
    if (this.question.kindOfQuestion.id === 1) {
      this.choseClassifyQuestion = true;
    } else {
      this.choseClassifyQuestion = false;
    }
  }
}
