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
    users:  any = [];
    userData:  any = [];
    barChartOptions: any = {};
    pieChartOptions: any = {};
    lineChartOptions: any = {};
    constructor(private userService: UserService, private contentService: ContentService) {

    }

    ngOnInit(){
        this.userService.getAll().subscribe(users => {
            this.users = users;
            //console.log('users', this.users)
           // let userData = [];
            this.users.forEach((user: User) => {
                this.userData.push({
                    label: user.firstName,
                    value: user.content? user.content.length: 0
                })
                this.contentService.search({updatedBy: user._id}).subscribe(contents => {

                })
            })
            console.log('userData', this.userData);
            this.barChartOptions = {
                yLabel: 'Content',
                data: this.userData
            }
           this.pieChartOptions = {
                data: this.userData
            }
        });
        var content = this.contentService.getAll();


   }

}