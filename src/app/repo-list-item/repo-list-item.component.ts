import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {TemplateRef } from '@angular/core';
import {LocalStorageService} from '../local-storage.service'

@Component({
  selector: 'app-repo-list-item',
  templateUrl: './repo-list-item.component.html',
  styleUrls: ['./repo-list-item.component.css']
})
export class RepoListItemComponent implements OnInit {

  @Input()repo
  @Input()userLogin
  modalRef: BsModalRef;
  config = {
    animated: true
  };
  
  constructor(private modalService: BsModalService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    return false
  }

  async onSelected($event){
    $event.preventDefault()
    this.repo.selected = !this.repo.selected
    if(this.repo.selected){
      this.localStorageService.addItem(this.repo, this.userLogin)
    }else{
      this.localStorageService.removeItem(this.repo, this.userLogin)
    }
  }

}
