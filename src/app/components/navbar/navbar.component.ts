import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  bookCount:number;
  favoritesCount:number;

  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.bookCount = this.bookService.returnBookCount();
    this.favoritesCount = this.bookService.returnFavoritesCount();
    
    this.bookService.getBookCountListener().subscribe((bookCount:any) => {
      this.bookCount = bookCount;
    })
    
    this.bookService.getBookFavoritesListener().subscribe((favbookCount:any) => {
      this.favoritesCount = favbookCount;
    })
  }
  
  

}
