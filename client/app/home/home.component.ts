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
    promiseUserData: any = [];
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
                let data = {
                               label: user.firstName,
                               value: user.content? user.content.length: 0,
                               values: [0],
                           }
                let promiseContent = new Promise((resolve, reject) => {
                       this.contentService.search({updatedBy: user._id}).subscribe(contents => {
                            data.values = contents.map((content: Content) => {
                                if(content.updatedAt) {
                                    return {
                                        x_value: new Date(content.updatedAt).getTime(),
                                        y_value: content.description.length,
                                    }
                                }
                            })
                            resolve(data);
                        }, error => {
                            resolve(data);
                        })
                })
                promiseContent.then( data => {
                    this.userData.push(data)
                })
                this.promiseUserData.push(promiseContent);

            })
            Promise.all(this.promiseUserData).then( success => {
                console.log('userData', this.userData);
                this.barChartOptions = {
                    yLabel: 'Content',
                    data: this.userData
                }
                this.pieChartOptions = {
                    data: this.userData
                }
                this.lineChartOptions = {
                    data: this.userData,
                }
            })
        });
   }

}