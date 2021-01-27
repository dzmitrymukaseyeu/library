import { Component, OnInit } from '@angular/core';
import { UserDefinition } from './../../shared/interfaces';
import { UserService, TokenService} from './../../services';
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
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.userService.userData$.next(null);
    this.tokenService.tokenData$.next(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

}
