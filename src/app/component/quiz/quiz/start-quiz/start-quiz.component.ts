import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../interface/quiz';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {Question} from '../../../../interface/question';
import {Answer} from '../../../../interface/answer';
import {AnswerService} from '../../../../services/answer/answer.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  quiz: Quiz;
  questions: Question[];
  answers: Answer[] = [];
  answerGetByQuestionId: Answer[];
  answerChose: Answer;
  index = 0;
  check: any;
  complete = false;
  listAnswerOfQuestion: Answer[];
  score = 0;
  numberOfCorrectAnswer = 0;
  numberOfAnswerChoseCorrect = 0;


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
  }

  getAnswerById(id: number) {
    this.answerService.getAnswerById(id) .subscribe(result => {
      this.answerChose = result;
      if (this.answerChose.correct === true) {
        this.numberOfAnswerChoseCorrect++;
      }
    }, error => {
      console.log('error');
    });
    // this.answerService.getAnswerById(id).pipe(map(result => {
    //     this.answerChose = result;
    //     if (this.answerChose.correct === true) {
    //       this.numberOfAnswerChoseCorrect++;
    //     }
    // }));
  }

  checkAnswer() {

    this.check = document.getElementsByName('answer');
    this.check.forEach(value => {
      if (value.checked === true) {
        this.getAnswerById(value.value);
      }
    });
    this.getListAnswerCheck(this.questions[this.index].id);
  }

  getListAnswerCheck(id: number) {
    this.answerService.getAllAnswerByQuestionId(id).subscribe(result => {
      this.listAnswerOfQuestion = result;
      this.listAnswerOfQuestion.forEach(answer => {
        if (answer.correct === true) {
          this.numberOfCorrectAnswer++;
        } else {
          this.numberOfCorrectAnswer--;
        }
      });
      if (this.numberOfAnswerChoseCorrect === this.numberOfCorrectAnswer) {
        this.score++;
      }
      this.numberOfCorrectAnswer = 0;
      this.numberOfAnswerChoseCorrect = 0;

      if (this.index < this.questions.length - 1) {
        this.index += 1;
      } else {
        this.complete = true;
      }
      console.log(this.score);
    });
  }

}
