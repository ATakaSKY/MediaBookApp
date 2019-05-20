import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path: '', redirectTo: 'addBook', pathMatch: 'full'},
  {path:'booklist', component:BooksListComponent},
  {path:'addBook', component:AddBookComponent},
  {path:'favorites', component:FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
