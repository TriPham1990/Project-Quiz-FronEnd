import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../../interface/answer';
import {Observable} from 'rxjs';
import {Question} from '../../interface/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private API_URL = 'http://localhost:8080/api/auth/answers';

  constructor(private http: HttpClient) {
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.API_URL}`, answer);
  }

  getAllAnswerByQuestionId(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.API_URL}/findByQuestion/${id}`);
  }

  getAllListAnswer(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.API_URL}`);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.API_URL}/${answer.id}`, answer);
  }

  deleteAnswer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
