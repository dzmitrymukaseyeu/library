import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserDefinition } from '@app/shared/interfaces';
import { UserService, TokenService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:UserDefinition = null;

  @Output() public sidenavToggle = new EventEmitter();



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

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
