import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Content } from './content';
import { User } from '../_models/index';

@Injectable()
export class ContentService {
    currentUser: User;
    constructor(private http: Http) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }

    search(params: any) {
        return this.http.get('/content', {params: params}).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/content').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/content/' + _id).map((response: Response) => response.json());
    }

    create(content: Content) {
        content.createdBy = this.currentUser._id;
        return this.http.post('/content/', content);
    }

    update(content: Content) {
        content.updatedBy = this.currentUser._id;
        return this.http.put('/content/' + content._id, content);
    }

    delete(_id: string) {
        return this.http.delete('/content/' + _id);
    }
}