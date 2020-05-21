import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

   async addItem(repo, userLogin){    
    let repos = await JSON.parse(localStorage.getItem(`${userLogin}`))
      repos.push(repo)
      await localStorage.setItem(`${userLogin}`, JSON.stringify(repos))
     
  }
  async removeItem(repo, userLogin){    
    let repos = await JSON.parse(localStorage.getItem(`${userLogin}`))
      let index = repos.findIndex(item => item.id == repo.id)
      repos.splice(index,1)      
      await localStorage.setItem(`${userLogin}`, JSON.stringify(repos))
      
  }
  getItems(userLogin){
    return JSON.parse(localStorage.getItem(`${userLogin}`))
  }
}
