import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
// import { GlobalsProvider } from '../globals/globals';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

	// URLs
  private POINTER: string = environment.SERVER_PATH;
  private ADD_TODO_URL : string = this.POINTER+"/addtodo";
  private GET_TODO_URL : string = this.POINTER+"/gettodo";
  private UPDATE_TODO_URL : string = this.POINTER+"/updatetodo";
  private GENERATE_FILE: string = this.POINTER+"/generatingFile";

  constructor(private http: HttpClient) { }

  // To add Todo to List
  addtodo(todo): Observable<{}> {
    return this.http.post(this.ADD_TODO_URL, todo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // To Get list of Todos
  gettodo(): Observable<{}> {
    return this.http.get(this.GET_TODO_URL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // To Update Particular Todo
  updatetodo(todo): Observable<{}> {
    return this.http.put(this.UPDATE_TODO_URL,todo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  //Generating File
  generatingFile(type): Observable<{}> {
    return this.http.get(this.GENERATE_FILE,{params:{type:type}}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // For Response Beautifier
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // For Error Beautifier
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(error);
    return Observable.throw(errMsg);
  }
}