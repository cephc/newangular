import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

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
}
