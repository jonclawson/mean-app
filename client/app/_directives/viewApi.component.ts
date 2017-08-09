import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';


import {  AlertService } from '../_services/index';
import {  ContentService } from '../content/index';
import {  Form } from '../_models/index';

@Component({
    moduleId: module.id,
    selector: 'viewApi',
    templateUrl: 'viewApi.component.html'
})

export class ViewApiComponent implements OnChanges{
    view: any;
    @Input('view') viewObject: any;

    constructor(
        private alertService: AlertService,
        private contentService: ContentService
    ) { }

    ngOnChanges(changes:any):void {
        if(this.viewObject){
            this.view = this.viewObject;
        }
    }



}