import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'favorites',
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'add',
        component: AddBookComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
