import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = []
  private usersUpdated = new Subject()
  private userNotFound = false
  private userNotFoundUpdated = new Subject()
  
  constructor(private http:HttpClient) { }

  getUsersUpdateListener(){
    return this.usersUpdated.asObservable();
  }
  getuserNotFoundUpdated(){
    return this.userNotFoundUpdated.asObservable()
  }

  getUsers(){
    this.http.get<any>('https://api.github.com/users')
    .subscribe(result=>{
      this.users = result
      this.usersUpdated.next([...this.users])
    })
  }
  getUser(queryInput){
    this.http.get<any>(`https://api.github.com/search/users?q=${queryInput}`)
    .subscribe(result =>{
      if(result.total_count > 0){
      this.users = [...result.items,...this.users]
      this.usersUpdated.next([...this.users])
      this.userNotFound = false
      this.userNotFoundUpdated.next(this.userNotFound)
      }else{
        this.userNotFound = true
        this.userNotFoundUpdated.next(this.userNotFound)
      }
    })
  }

}
