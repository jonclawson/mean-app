import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';

import {DomSanitizer} from '@angular/platform-browser';

import { Form } from '../_models/index';

@Injectable()
export class FormApiService {
    constructor(private http: Http, private sanitizer:DomSanitizer) { }

    getAll() {
        return this.http.get('/forms').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/forms/' + _id).map((response: Response) => response.json());
    }

    create(form:any) {
        return this.http.post('/forms/', form).map((response: Response) => response.json());
    }

    update(form: any) {
        return this.http.put('/forms/' + form._id, form);
    }

    delete(_id: string) {
        return this.http.delete('/forms/' + _id);
    }
}