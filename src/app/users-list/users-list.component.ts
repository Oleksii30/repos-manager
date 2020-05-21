import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {UserService} from '../user.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private usersListenerSub:Subscription
  users
  private userNotFountListenerSub:Subscription
  userNotFound

  inputForm:FormGroup
  queryInput

  constructor(private userService: UserService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      'query':['']
    })
    this.queryInput = this.inputForm.controls['query']
    this.queryInput.valueChanges
    .pipe(debounceTime(1000),
          distinctUntilChanged())
    .subscribe(
      {next: value=>{this.userService.getUser(value)}}
    )

    this.userService.getUsers()
    this.usersListenerSub = this.userService.getUsersUpdateListener()
    .subscribe(users =>{
      this.users = users      
    })

    this.userNotFountListenerSub = this.userService.getuserNotFoundUpdated()
    .subscribe(userState =>{
      this.userNotFound = userState
    })
  }

  ngOnDestroy(){
    this.usersListenerSub.unsubscribe()
    this.userNotFountListenerSub.unsubscribe()
  }

}
