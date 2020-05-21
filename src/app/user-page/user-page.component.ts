import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import {ReposService} from '../repos.service'
import {LocalStorageService} from '../local-storage.service'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  userLogin:string
  private reposListenerSub:Subscription
  repos
  storedRepos = []
  isCollapsed = true;

  constructor(private route:ActivatedRoute,
              private reposService:ReposService,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.userLogin = this.route.snapshot.params['login']
    this.reposService.getRepos(this.userLogin)
    this.reposListenerSub = this.reposService.getReposUpdateListener()
    .subscribe(result => {
      this.repos = result 

      let favoriteRepos = this.localStorageService.getItems(this.userLogin)
     if(favoriteRepos){        
       this.storedRepos = favoriteRepos        
       this.repos.map(repo=>{          
         if(favoriteRepos.some(item =>item.id === repo.id)){
           return repo.selected = true
         }else{
           return repo
         }
       })      
     }else{
       localStorage.setItem(`${this.userLogin}`, JSON.stringify(this.storedRepos))
     } 

     })
     
   
  }

  async showFavourite(){    
    this.isCollapsed = !this.isCollapsed
    this.storedRepos = await JSON.parse(localStorage.getItem(`${this.userLogin}`))
    console.log(this.storedRepos)
  }

  removeItem(storedRepo){    
    this.repos.map(item =>{
      if (item.id == storedRepo.id){
        return item.selected = false
      }
    })
    this.localStorageService.removeItem(storedRepo, this.userLogin)  
    this.removeFromList(storedRepo)   
  }

  removeFromList(storedRepo){
    console.log(this.storedRepos)
    let index = this.storedRepos.findIndex(item => item.id === storedRepo.id)
    console.log(index)
    this.storedRepos.splice(index,1)
    console.log(this.storedRepos)
  }

  ngOnDestroy(){
    this.reposListenerSub.unsubscribe()
  }

}
