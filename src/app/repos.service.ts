import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  private repos = []
  private reposUpdated = new Subject()
  
  constructor(private http:HttpClient) { }

  getReposUpdateListener(){
    return this.reposUpdated.asObservable();
  }

  getRepos(userLogin){
    this.http.get<any>(`https://api.github.com/users/${userLogin}/repos`)
    .subscribe(result=>{
      result.map(repo => repo.selected = false)    
      
      this.repos = result
      this.reposUpdated.next([...this.repos])
    })
  }
 
}
