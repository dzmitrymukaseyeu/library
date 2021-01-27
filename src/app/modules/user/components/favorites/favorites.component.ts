import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    protected userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
