import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { Content } from '../content/content';
import { UserService } from '../_services/index';
import { ContentService } from '../content/content.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: [];
    barChartOptions: {};
    constructor(private userService: UserService, private contentService: ContentService) {

    }

    ngOnInit(){
        this.userService.getAll().subscribe(users => {
            this.users = users;
            console.log('users', this.users)
            let userData = [];
            this.users.forEach(user=>{
                userData.push({
                    label: user.firstName + ' ' + user.lastName,
                    value: user.content? user.content.length: 0
                });
            });
            console.log('userData', userData);
            this.barChartOptions = {
                yLabel: 'Content',
                data: userData
            };
        });
        var content = this.contentService.getAll();


   }

}