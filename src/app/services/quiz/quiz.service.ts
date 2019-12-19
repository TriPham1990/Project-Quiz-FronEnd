import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Quiz} from '../../interface/quiz';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = 'http://localhost:8080/api/auth/quizzes';

  constructor(private http: HttpClient) { }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.API_URL}`, quiz);
  }

  getAllListQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API_URL}`);
  }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.API_URL}/${quiz.id}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
