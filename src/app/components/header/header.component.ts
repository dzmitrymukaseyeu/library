import { Component, OnInit } from '@angular/core';
import { UserDefinition } from './../../shared/interfaces';
import { UserService } from './../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:UserDefinition = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.userService.userData$
    //   .subscribe(res => this.userData = res);
  }

  onLogOut() {
    this.userService.userData$.next(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

}
