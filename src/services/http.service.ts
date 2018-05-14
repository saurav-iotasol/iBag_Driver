import { Injectable, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Nav } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { BASE_URL } from '../app/app.constants';
import { isNullOrUndefined } from 'util';

@Injectable()
export class HttpService<TResource> {
    @ViewChild(Nav) nav: Nav;

    constructor(
        public http: Http,
        private errorHandler?: (error: any) => Promise<any>
    ) {
        this.errorHandler = errorHandler || this.handleError;
    }

    get(apiUri: string): Observable<void | TResource> {
        let access_token = localStorage.getItem('access_token');
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf8'
        });

        if (isNullOrUndefined(access_token) || access_token === '') {
            //TODO
            // this.nav.setRoot(LOGIN COMPONENT);
        } else {
            headers.append('Authorization', 'Bearer ' + access_token);
        }

        return this.http
            .get(`${BASE_URL}${apiUri}`, { headers: headers })
            .map((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    post(apiUri: string, resource: TResource): Observable<void | TResource> {
        let access_token = localStorage.getItem('access_token');
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf8'
        });

        if (isNullOrUndefined(access_token) || access_token === '') {
            //TODO
            // this.nav.setRoot(LOGIN COMPONENT);
        } else {
            headers.append('Authorization', 'Bearer ' + access_token);
        }

        return this.http
            .post(`${BASE_URL}${apiUri}`, resource, { headers: headers })
            .map((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    put(apiUri: string, resource: TResource): Observable<void | TResource> {
        let access_token = localStorage.getItem('access_token');
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf8'
        });

        if (isNullOrUndefined(access_token) || access_token === '') {
            //TODO
            // this.nav.setRoot(LOGIN COMPONENT);
        } else {
            headers.append('Authorization', 'Bearer ' + access_token);
        }

        return this.http
            .put(`${BASE_URL}${apiUri}`, resource, { headers: headers })
            .map((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    delete(apiUri: string): Observable<void | TResource> {
        let access_token = localStorage.getItem('access_token');
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf8'
        });

        if (isNullOrUndefined(access_token) || access_token === '') {
            //TODO
            // this.nav.setRoot(LOGIN COMPONENT);
        } else {
            headers.append('Authorization', 'Bearer ' + access_token);
        }

        return this.http
            .delete(`${BASE_URL}${apiUri}`, { headers: headers })
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<void> {
        console.error('An error occurred', error);
        return Promise.reject(error.json());
    }
}
