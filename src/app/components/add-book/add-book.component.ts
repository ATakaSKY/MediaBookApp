import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  submitted:boolean;

  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }
  
  
  onAddBook(form:NgForm){
    this.submitted = true;
    if(form.invalid){
      return;
    }
    this.submitted = false;
    this.bookService.addBook(form.value.bookName,form.value.author,form.value.bookPrice);
  }

}
