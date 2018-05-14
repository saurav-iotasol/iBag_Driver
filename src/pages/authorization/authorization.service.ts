import { HttpService } from "../../services/http.service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class AuthorizationService extends HttpService<any> {
    constructor(
        public http: Http,
    ) {
        super(http);
    }

    ngOnInit() {
    }
}