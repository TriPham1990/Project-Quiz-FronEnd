import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KindOfQuestion} from '../../interface/kindOfQuestion';

@Injectable({
  providedIn: 'root'
})
export class KindOfQuestionService {

  private API_URL = 'http://localhost:8080/api/auth/kindOfQuestions';

  constructor(private http: HttpClient) {
  }

  getAllListKindOfQuestion(): Observable<KindOfQuestion[]> {
    return this.http.get<KindOfQuestion[]>(`${this.API_URL}`);
  }
}
