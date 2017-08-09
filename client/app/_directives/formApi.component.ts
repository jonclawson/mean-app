import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';

import {Form} from '../_models/index';
import { FormApiService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'formApi',
    templateUrl: 'formApi.component.html'
})

export class FormApiComponent implements OnChanges{

    form: Form;

    formList: Array<any>;

    @Output() formChange = new EventEmitter();

    @Output() formSubmit = new EventEmitter();

    @Input() showSubmit: string;

    @Input() formObject: Form;

    @Input() formFields: any = [];

    @Input() formId: string;

    @Input() formOptions: any;

    @Input() formEdit: boolean;

    constructor(
        private formApiService: FormApiService,
        private alertService: AlertService
    ) { }

    ngOnChanges(changes:any):void {
        if(this.formId)
            this.formApiService.getById(this.formId).subscribe(
                 data => {
                    this.form = data;
                    //this.alertService.success('Form loaded', true);
                 },
                 error => {
                     this.alertService.error(error);
                 }
             );

         if(this.formObject)
            this.form = this.formObject;

//         if(this.formFields && this.form)
//            this.form.fields = this.formFields;

        this.formApiService.getAll().subscribe(
                         data => {
                            console.log('formList', data);

                            this.formList = [];
                            for(let i in data){
                                if(data[i].public)
                                    this.formList.push(data[i]);
                            }
                            //this.alertService.success('Form loaded', true);
                         },
                         error => {
                             this.alertService.error(error);
                         }
                     );
            console.log('change', this.form)
    }

    removeField(field: any){
        this.form.fields.splice(this.form.fields.indexOf(field), 1);
         this.formChange.emit(this.form);
    }

    onChange(event:any){
      this.formChange.emit(this.form);
    }
    onSubmit(event:any){
        this.formSubmit.emit(this.form);
    }
    setFile(file:File){
            //Directly integrated with fileInput.component.ts
        }
}