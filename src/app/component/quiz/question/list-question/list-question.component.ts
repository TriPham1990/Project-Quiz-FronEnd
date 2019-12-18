import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../../../services/question/question.service';
import {Question} from '../../../../interface/question';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {

  questions: Question[];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questionService.getAllListQuestion().subscribe(result => {
      this.questions = result;
      console.log('success');
    }, () => {
      console.log('error');
    });
  }

}
