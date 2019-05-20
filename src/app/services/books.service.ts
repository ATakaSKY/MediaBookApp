import { Injectable } from '@angular/core';
import uuidv4 from 'uuidv4';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  // private books = [];
  private countBooks = new Subject();
  private countFavorites = new Subject();

  constructor(private router:Router) { }
  
  getBookCountListener() {
    return this.countBooks.asObservable();
  }
  
  getBookFavoritesListener() {
    return this.countFavorites.asObservable();
  }
  
  returnBookCount(){
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    return booksFromStorage ? booksFromStorage.length : 0;
  }
  
  returnFavoritesCount(){
    const favoriteBooksFromStorage = JSON.parse(localStorage.getItem('favorites'));
    return favoriteBooksFromStorage ? favoriteBooksFromStorage.length : 0;
  }
  
  addBook(bookName, author, price){
    const book = {
      id:uuidv4(),
      bookName,
      author,
      price,
      isAddedToFavorites:false
    }
    
    // this.books.push(book);
    this.saveBooksToLocalStorage(book);
    
    // this.countBooks.next(this.books.length);
    this.router.navigate(['/booklist']);
  }
  
  getBooksFromFavorites(){
    return JSON.parse(localStorage.getItem('favorites'));
  }
  
  getBooks(){
    return JSON.parse(localStorage.getItem('books'));
  }
  
  deleteBookFromFavorites(bookId){
    let favoriteBooksFromStorage = JSON.parse(localStorage.getItem('favorites'));
    let filteredFavoriteBooks = favoriteBooksFromStorage.filter(book => book.id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(filteredFavoriteBooks));
    
    //change isAddedToFavorites on books storage 
    this.updateAddedToFavoritesOnBookStorage(bookId,false);
    
    // emit favorite value to navbar
      this.countFavorites.next(JSON.parse(localStorage.getItem('favorites')).length);
  }
  
  deleteBook(bookId){
    let bookFromStorage = JSON.parse(localStorage.getItem('books'));
    let filteredBook = bookFromStorage.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(filteredBook));
    
    //delete book from favorites as well
    let favoriteBookFromStorage = JSON.parse(localStorage.getItem('favorites'));
    let filteredFavoriteBook = favoriteBookFromStorage.filter(book => book.id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(filteredFavoriteBook));
    
    // emit book value to navbar
    this.countBooks.next(JSON.parse(localStorage.getItem('books')).length);
    
    
    // emit favorites value to navbar
    this.countFavorites.next(JSON.parse(localStorage.getItem('favorites')).length);
  }
  
  addToFavorites(book){
    if(JSON.parse(localStorage.getItem('favorites')) && JSON.parse(localStorage.getItem('favorites')).length > 0){
      let localStorageBooks = JSON.parse(localStorage.getItem('favorites'));
      
      const ifAddedToFavorites = localStorageBooks.findIndex(bookStorage => bookStorage.id === book.id);
      if(ifAddedToFavorites === -1){
        book.isAddedToFavorites = true;
        localStorageBooks.push(book);
        localStorage.setItem('favorites', JSON.stringify(localStorageBooks));
        
        //change isAddedToFavorites on books storage 
        this.updateAddedToFavoritesOnBookStorage(book.id, true);
        
      }else{
        book.isAddedToFavorites = false;
        this.deleteBookFromFavorites(book.id);
        
        //change isAddedToFavorites on books storage 
        this.updateAddedToFavoritesOnBookStorage(book.id,false);
      }
      
      // emit favorite value to navbar
      this.countFavorites.next(JSON.parse(localStorage.getItem('favorites')).length);
    }else{
      let books = [];
      book.isAddedToFavorites = true;
      books.push(book);
      localStorage.setItem('favorites', JSON.stringify(books));
      
      //change isAddedToFavorites on books storage 
      this.updateAddedToFavoritesOnBookStorage(book.id,true);
      
      // emit favorite value to navbar
      this.countFavorites.next(JSON.parse(localStorage.getItem('favorites')).length);
    }
  }
  
  saveBooksToLocalStorage(book){
    if(JSON.parse(localStorage.getItem('books')) && JSON.parse(localStorage.getItem('books')).length > 0){
      let localStorageBooks = JSON.parse(localStorage.getItem('books'));
      localStorageBooks.push(book);
      localStorage.setItem('books', JSON.stringify(localStorageBooks));
      
      // emit total books value to navbar
      this.countBooks.next(JSON.parse(localStorage.getItem('books')).length);
    }else{
      let books = [];
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      
      // emit total books value to navbar
      this.countBooks.next(JSON.parse(localStorage.getItem('books')).length);
    }
  }
  
  updateAddedToFavoritesOnBookStorage(bookId,status){
    const books = JSON.parse(localStorage.getItem('books'));
    const index = books.findIndex(b => b.id === bookId);
    books[index].isAddedToFavorites = status;
    localStorage.setItem('books', JSON.stringify(books));
  }
}
