import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username:any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.getUserFromLocalStorage)
    this.username = this.userService.getUserFromLocalStorage.uName || 'User';
  }

  logOut(){
    alert(this.userService.deleteUserFromLocalStorage());
  }
}
