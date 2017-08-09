import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';

import {File} from '../_models/index';
import { FileService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'file-input',
    templateUrl: 'fileInput.component.html'
})



export class FileComponent implements OnChanges{

    file: File;
    blob: any;

    @Output() fileChange = new EventEmitter();

    @Input() fileId: string;

    @Input() fileOptions: any;

    @Input() formApiField: any;

    constructor(
        private fileService: FileService,
        private alertService: AlertService
    ) { }

    ngOnChanges(changes:any):void {
            this.fileService.getById(this.fileId).subscribe(
                 data => {
                    this.file = data;
                    // this.alertService.success('Registration successful', true);
                    this.fileService.getFileBlob(this.file, this.fileOptions).subscribe(
                    blob => {
                            this.blob = blob;
                    });
                 },
                 error => {
                     //this.alertService.error(error);
                 }
             );
    }


    onChange(event:any){
        let files = event.srcElement.files;
        let upload = files[0];
        let formData = new FormData();
        formData.append('file', upload, upload.name);
        this.fileService.create(formData).subscribe(
         data => {
            this.file = data;
            // this.alertService.success('Registration successful', true);
            this.fileService.getFileBlob(this.file, this.fileOptions)
                .subscribe(
                    blob => {
                         this.blob = blob;
                         this.fileChange.emit(this.file);
                });
                if(this.formApiField){
                    this.formApiField.value = this.file._id;
                }
         },
         error => {
             //this.alertService.error(error);
         });
    }
}