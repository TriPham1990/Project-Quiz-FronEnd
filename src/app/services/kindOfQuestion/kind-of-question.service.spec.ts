import { TestBed } from '@angular/core/testing';

import { KindOfQuestionService } from './kind-of-question.service';

describe('KindOfquestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KindOfQuestionService = TestBed.get(KindOfQuestionService);
    expect(service).toBeTruthy();
  });
});
