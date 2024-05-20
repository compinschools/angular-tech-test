import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class StorageService {

  constructor() { }

  clean(){
    window.sessionStorage.clear();
  }

  public saveUser(user: any){
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() : any{
    const user = window.sessionStorage.getItem('user');
    if(user == null){
      return {};
    }
    return JSON.parse(user);
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('user');
    return user ? true : false;
  }
}
