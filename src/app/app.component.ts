import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService, UserService, ApiService} from './services';
import { UserDefinition } from '../app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'library';
  private destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    public tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken');

    this.tokenService.tokenData$.next({
      accessToken,
      refreshToken: localStorage.getItem('refreshToken')
    });

    if (accessToken) {
      this.apiService.getUserData()
        .pipe (
          takeUntil(this.destroy$)
        )
        .subscribe((res: UserDefinition) => {
          console.log(res);
          this.userService.userData$.next(res)
        });
    }

    this.userService.userData$
    .subscribe((res: UserDefinition) => console.log(res));
  }

    ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}


