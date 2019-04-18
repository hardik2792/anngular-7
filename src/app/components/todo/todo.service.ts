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
  private GET_TODO_URL: string = this.POINTER+"/signIn";

  constructor(private http: HttpClient) { }

  // For Authenticating Employee
  authEmployee(authData): Observable<{}> {
      return this.http.post(this.GET_TODO_URL, authData).pipe(
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
    console.error(JSON.stringify(error.error));
    return Observable.throw(errMsg);
  }
}