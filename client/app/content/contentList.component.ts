import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ContentService } from './content.service';
import { FormApiService, AlertService } from '../_services/index';
import { Form } from '../_models/index';

@Component({
    moduleId: module.id,
    selector: 'contentList',
    templateUrl: 'contentList.component.html'
})

export class ContentListComponent implements OnChanges{
    contentList: any;

    contentForm: any;

    showFields: any;

    @Input() format: any;

    @Input() filterId: any;

    @Input() filterValue: any;

    constructor(
    private contentService: ContentService,
    private formApiService: FormApiService,
    private alertService: AlertService
    ) { }

    ngOnChanges() {
       this.loadAllContent();

    }
    ngOnInit(){
        this.loadAllContent();
    }
    deleteContent(_id: string) {
        this.contentService.delete(_id).subscribe(() => { this.loadAllContent() });
    }

    loadAllContent() {
         this.contentService.getAll().subscribe(
         contentList => {
            this.contentList = contentList;
            if(this.filterId && this.filterValue){
                let content = this.contentList;
                this.contentList = [];
                 for(let i in content){
                     if(content[i][this.filterId] == this.filterValue)
                         this.contentList[i] = content[i];
                 }
            }
         });

              if(this.format){
                 switch(this.format){
                     case 'fields':
                     console.log('fielcs');
                     this.showFields = true;
                     break;
                 }
                }
                if(this.filterId == 'form'){
                     this.formApiService.getById(this.filterValue).subscribe(
                         data =>{
                             this.contentForm = data;
                         },
                         error =>{

                     });
                }
    }
    saveContent(form:any){ console.log('saveContent()')
            let content:any = {};
            if(form.form){
                content = form;
            }else{
                content = {
                    name: form.title + ' Entry',
                    fields: form.fields,
                    form: form._id
                }
                if(form.contentId){
                    content._id = form.contentId;
                }
            }
             if(!content._id){
                this.contentService.create(content)
                    .subscribe(
                        data => {
                            this.alertService.success('Content Created', true);

                            this.loadAllContent();
                        },
                        error => {
                            this.alertService.error(error);
                           this.loadAllContent();
                        });
            }else{
                this.contentService.update(content)
                    .subscribe(
                        data => {
                            this.alertService.success('Content Updated', true);

                           this.loadAllContent();
                        },
                        error => {
                            this.alertService.error(error);
                            this.loadAllContent();
                        });
            }
        }
        editContent(content: any){
            this.contentForm = content;
        }
}