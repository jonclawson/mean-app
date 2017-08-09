import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Content } from './content';
import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    templateUrl: 'content.component.html'
})

export class ContentComponent implements OnInit {
    content: Content;

    constructor(
        private contentService: ContentService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.contentService.getById(params.get('id')))
          .subscribe(content => { this.content = content; });
    }

}