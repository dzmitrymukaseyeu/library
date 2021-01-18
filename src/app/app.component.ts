import { Component, OnInit } from '@angular/core';
import { UserService } from './services';
import { ApiService } from './services/api/api.service';
import { ResUserDefinition } from '../app/shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'library';

  constructor(
    private apiService: ApiService,
    public userService: UserService
  ) { }


  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.apiService.getUserData()
        .subscribe((res: ResUserDefinition) => {
          console.log(res);
          this.userService.userData$.next(res.content.user)
        });
    }
  }
}


