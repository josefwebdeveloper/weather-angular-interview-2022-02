import {Component, OnInit} from '@angular/core';
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: User;




  constructor(private accountService: AccountService,
              private router: Router) {
    if (this.accountService.userValue) {
      this.router.navigate(['/forecast']);
    } else {
      this.router.navigate(['/account/login'])
    }

  }

  ngOnInit(): void {
  }


}
