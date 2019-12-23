import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../interface/quiz';
import {QuestionService} from '../../../services/question/question.service';
import {QuizService} from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageActual = 1;
  quizzes: Quiz[];
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getAllListQuiz().subscribe(result => {
      this.quizzes = result;
    }, error => {
      console.log('error');
    });
  }

}
