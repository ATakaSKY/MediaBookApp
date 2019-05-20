import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  books = [];
  booksFiltered = [];

  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.books = this.bookService.getBooksFromFavorites();
    this.booksFiltered = [...this.books];
  }
  
  removeFromFavorites(bookId){
    this.bookService.deleteBookFromFavorites(bookId);
    this.booksFiltered = this.booksFiltered.filter(book => book.id !== bookId);
  }
  
  searchBooks(event){
  const searchInput = event.target.value;
  if(searchInput.length === 0 ){
    this.booksFiltered = [...this.books];
  }
  this.booksFiltered = this.books.filter(book => {
      return book.bookName.includes(searchInput);
    });
  }

}
