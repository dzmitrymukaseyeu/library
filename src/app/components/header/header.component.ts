import { Component, OnInit } from '@angular/core';
import { UserDefinition } from './../../shared/interfaces';
import { UserService } from './../../services'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:UserDefinition = null;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userData$
      .subscribe(res => this.userData = res);
  }

}
