import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import { File } from '../_models/index';

@Injectable()
export class FileService {
    constructor(private http: Http, private sanitizer:DomSanitizer) { }

    getAll() {
        return this.http.get('/files').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/files/' + _id).map((response: Response) => response.json());
    }

    getFileBlob(file: File, fileOptions: any){
        let fileDestination = '';
        if( !fileOptions ){
             fileDestination = file.destination + file.filename;
        }else{
            if(fileOptions.width || fileOptions.height){
               fileDestination = 'files/thumbnail/' + file._id;
            }

        }
        let fileUrl = '/' + fileDestination;
        return this.http.get(fileUrl,  {
            responseType: ResponseContentType.Blob
        })
        .map(res => {
            return res.blob();
        })
        .map(blob => {
            return  this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        })

    }

    create(files:any) {
        return this.http.post('/files/', files).map((response: Response) => response.json());
    }

//    update(files: Array) {
//        return this.http.put('/files/' + file._id, files);
//    }

    delete(_id: string) {
        return this.http.delete('/files/' + _id);
    }
}