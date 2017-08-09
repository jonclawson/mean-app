import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { ContentService } from '../content/content.service';
import {File} from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    model: any = {};
    loading = false;
    contentList: any = [];
    avatarOptions: any;



    constructor(
        private router: Router,
        private contentService: ContentService,
        private alertService: AlertService,
        private userService: UserService,
        private route: ActivatedRoute
         ) {
            this.avatarOptions = {
                width: "150",
                height: "150"
            }
         }

    editProfile() {
        this.loading = true;
        console.log('profile', this.model);
        if(!this.model._id){
            this.userService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Profile Created', true);
                        this.router.navigate(['/home']);
                        this.loading = false;
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }else{
            this.userService.update(this.model)
                        .subscribe(
                            data => {
                                this.alertService.success('Profile Updated', true);
                                this.loading = false;
                            },
                            error => {
                                this.alertService.error(error);
                                this.loading = false;
                            });
        }

    }
    setAvatar(file:File){
        this.model.avatar = file._id;
        this.editProfile();
    }
    ngOnInit() {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.userService.getById(params.get('id')))
          .subscribe(user => { this.model = user; });

        this.contentService.getAll().subscribe(contentList => { this.contentList = contentList; });
    }
}
