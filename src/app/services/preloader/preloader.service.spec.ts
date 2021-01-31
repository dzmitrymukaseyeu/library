import { TestBed } from '@angular/core/testing';

import { PreloaderService } from './preloader.service';

xdescribe('PreloaderService', () => {
  let service: PreloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
