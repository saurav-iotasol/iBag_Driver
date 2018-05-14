import { HttpService } from "../../services/http.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class TicketService extends HttpService<any> {
    constructor(
        public http: Http,
    ) {
        super(http);
    }

    ngOnInit() {
    }

    getTicketsByRoute(routeId): Observable<any> {
        return this.get(`api/route/store/driver/app?companyId=${2}&storeId=${33}`);
    }
}