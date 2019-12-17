import { TestBed } from '@angular/core/testing';

import { KindOfquestionService } from './kind-ofquestion.service';

describe('KindOfquestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KindOfquestionService = TestBed.get(KindOfquestionService);
    expect(service).toBeTruthy();
  });
});
