import { Injectable } from '@angular/core';
import { Blogpost } from './blogpost';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  Serverurl = 'http://localhost/dev/blogger/';
  errordata: {};

  constructor(private http:HttpClient) { }

  getBlogs() {
    return this.http.get<Blogpost>(this.Serverurl+'api/blogs').pipe(
      catchError(this.handleError)
    )
  }

  
  getFeaturedBlogs() {
    return this.http.get<Blogpost>(this.Serverurl+'api/featured_blogs').pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
      if (error.error instanceof ErrorEvent){
        console.error('An Error occupied',error.error.message);
      }
      else {
        console.error(`Backend returned code ${error.status},`+`body was: ${error.error}`);
      }

      this.errordata = {
        errorTitle: 'Oops: Request for Document failed',
        errorDesc: 'Something bad happended,Please try again later'
      };

      return throwError(this.errordata);
  }
}
