import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username, password){
    if(username==='chatyra' && password === 'dummy'){
      sessionStorage.setItem('authenticatedUser', username)
      return true;
    } else {
      return false
    }
  }

  isUserSignedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user === null)
  }

  // isUserSignedOut(){
  //   let user =sessionStorage.getItem('authenticatedUser')
  //   return (user === null)
  // }

  signout(){
    sessionStorage.removeItem('authenticatedUser')
  }
  executeBasicAuthenticationService(username, password){
    let basicAuthHeaderString = 'Basic' + window.btoa(username + ':' + password)
    
    let headers = new HttpHeaders(
      {
        Authorization: basicAuthHeaderString
      })
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticatedUser', username);
          return data;
        }
      )
    );
  }

}
export class AuthenticationBean{
  constructor(public message:string){}
  
}
