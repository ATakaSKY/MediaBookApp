import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books = [];
  booksFiltered = [];
  bookindex = [];
  
  // favoriteAdded:boolean = false;

  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.books = this.bookService.getBooks();
    this.booksFiltered = [...this.books];
    
  }
  
  deleteBook(bookId){
    this.bookService.deleteBook(bookId);
    this.booksFiltered = this.booksFiltered.filter(book => book.id !== bookId);
  }
  
  addToFavorites(book){
    this.bookService.addToFavorites(book);
    // this.bookindex.push(book.id);
  }
  
  checkBookIndex(bookId){
    const index = this.bookindex.findIndex(b => b === bookId);
    if(index !== -1){
      
      return true;
    }
    return false;
    // return bookId === this.bookindex;
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
