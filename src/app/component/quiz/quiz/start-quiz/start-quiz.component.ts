import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../interface/quiz';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {Question} from '../../../../interface/question';
import {Answer} from '../../../../interface/answer';
import {AnswerService} from '../../../../services/answer/answer.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  quiz: Quiz;
  questions: Question[];
  answers: Answer[] = [];
  pageActual = 1;
  answerGetByQuestionId: Answer[];

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private answerService: AnswerService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getQuizById(id);
  }

  getQuizById(id: number) {
    this.quizService.getQuizById(id).subscribe(result => {
      this.quiz = result;
      this.questions = this.quiz.questions;
      this.getAllAnswers();
    }, error => {
      console.log('error');
    });
  }

  getAllAnswers() {
    this.questions.forEach(value => {
      this.getListAnswerByQuestionId(value.id);
    });
  }

  getListAnswerByQuestionId(id: number) {
    this.answerService.getAllAnswerByQuestionId(id).subscribe(result => {
      this.answerGetByQuestionId = result;
      this.addAnswerToListAnswer();
    }, error => {
      console.log('error');
    });
  }

  addAnswerToListAnswer() {
    this.answers = this.answers.concat(this.answerGetByQuestionId);
    console.log(this.answers);
  }

  checkAnswerOne(id: number) {

  }

  getAnswerById(id: number) {
    this.answerService.
  }
}
