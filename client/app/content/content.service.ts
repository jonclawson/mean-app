import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Content } from './content';

@Injectable()
export class ContentService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/content').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/content/' + _id).map((response: Response) => response.json());
    }

    create(content: Content) {
        return this.http.post('/content/', content);
    }

    update(content: Content) {
        return this.http.put('/content/' + content._id, content);
    }

    delete(_id: string) {
        return this.http.delete('/content/' + _id);
    }
}