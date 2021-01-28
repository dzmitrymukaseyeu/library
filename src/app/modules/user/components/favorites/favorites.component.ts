import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
