import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';





@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor() { 


  }


  login(username:string, password:string): Observable<any> {
    //TODO: Call the API to authenticate the user (this is temporary to do the tech test)

    if(username=="admin" && password=="admin") {
      return of({success:true});
    

  }else 
  {
    return of({success:false});
  }
}

logout(): Observable<any> {
  return of({success:true});
}

}