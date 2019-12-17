import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../../interface/question';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private API_URL = 'http://localhost:8080/api/auth/questions';

  constructor(private http: HttpClient) { }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.API_URL}`, question);
  }

  getAllListQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.API_URL}`);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.API_URL}/${question.id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}