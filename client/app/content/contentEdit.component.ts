import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Form } from '../_models/index';
import { AlertService, FormApiService } from '../_services/index';
import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    templateUrl: 'contentForm.component.html'
})

export class ContentEditComponent implements OnInit {
    model: any = {};
    fieldOptions: any = [];
    loading = false;
    showFieldOptions: boolean;
    customForm: any;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private formApiService: FormApiService,
        private alertService: AlertService,
         private route: ActivatedRoute,
         ) {
            this.customForm = {};
         }

    editContent() { console.log('editContent');
        this.loading = true;
        //this.updateCustomForm(this.model);
        if(!this.model._id){
            this.contentService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Content Created', true);
                        this.loading = false;
                        //this.router.navigate(['/content/list']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }else{
            this.contentService.update(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Content Updated', true);
                        this.loading = false;
                       // this.router.navigate(['/content/list']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }


    }
    addCustomField(form: Form){console.log('addCustomField');
        let customField = {type: '', options: ''};
        for(let i in form.fields){
            customField[form.fields[i].name] = form.fields[i].value;
        }
        if(this.fieldOptions && (
            customField.type == 'select'  ||
            customField.type == 'radio' ||
            customField.type == 'checkbox')
            ){
            customField.options = this.fieldOptions;
            this.fieldOptions = [];
        }
        this.model.fields = !this.model.fields? []: this.model.fields;
        this.model.fields.push(customField);
        //this.updateCustomForm(this.model);

    }
    addOption(form: any){
        let option = {value: '', label: ''};
        option.value = form.fields[0].value;
        option.label = form.fields[0].value;
        this.fieldOptions.push(option);
        form.fields[0].value = "";
    }
    updateCustomForm(form: any){ console.log('updateCustomForm');
        this.customForm.title = this.model.name + 'Form';
        this.customForm.name = this.model.name.replace(' ', '_').toLowerCase();
        this.customForm.fields = [];
        for(let i in form.fields){
            this.customForm.fields[i] = JSON.parse(JSON.stringify(form.fields[i]));
            this.customForm.fields[i].value = "";
        }
        if(this.model.form){
            this.formApiService.update(this.customForm)
            .subscribe(
                data => {
                    console.log('update form', this.customForm);
                    this.editContent();
                },
                error => {

                });
        }else{
            this.formApiService.create(this.customForm)
            .subscribe(
                data => {
                    this.model.form = data.ops[0]._id;
                    console.log('create form', data);
                    this.editContent();
                },
                error => {

                });
        }

    }
    updateCustomFields(form:Form){ console.log('updateCustomFields');
        this.model.fields = form.fields;
        this.updateCustomForm(this.model);
    }
    readForm(form:Form){
        let field = form.fields.find(function(field){
            return field.name == 'type';
        })
        this.showFieldOptions = (
            field.value == 'select' ||
            field.value == 'radio' ||
            field.value == 'checkbox'
        );
    }

    updateContentFields(form: any){
        if(!this.model.fields){
            this.model.fields = [];
        }
        for(let i in form.fields){
            if(!this.model.fields[i]){
                this.model.fields[i] = form.fields[i];
            }else{
                for(let j in form.fields[i]){
                    if(j != 'value'){
                    this.model.fields[i][j] = form.fields[i][j];
                    }
                }
            }
        }
    }
    ngOnInit() {
        //this.customForm = {};
        this.route.paramMap
          .switchMap((params: ParamMap) => this.contentService.getById(params.get('id')))
              .subscribe(content => {
                this.model = content;
                if(this.model.form){
                 this.formApiService.getById(this.model.form)
                    .subscribe(
                        data => {
                            this.customForm = data;
                             this.updateContentFields(data);
                            console.log('load customForm', this.customForm);
                        },
                        error => {

                        });
                }
        });
    }
}
