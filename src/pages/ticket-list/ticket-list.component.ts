import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TicketService } from './ticket.service';
import { ToastService } from '../../services/toast-service';
import { ERROR_MSG } from '../../app/app.constants';
import { AppService } from '../../app/app.service';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'ticket-list',
    templateUrl: 'ticket-list.template.html'
})
export class TicketListComponent {
    ticketsLoaded: boolean = false;
    ticketList: any = [];


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        private routeService: TicketService,
        private toastService: ToastService,
        private appService: AppService
    ) {
    }

    ngOnInit() {
        let routeId = this.navParams.get('routeId');
        console.log(routeId);
        if (!isNullOrUndefined(routeId)) {
            this.getTicketsByRoute(routeId);
        }
        else {
            this.toastService.showToast(ERROR_MSG, 'error-toast');
            return;
        }
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    getTicketsByRoute(routeId) {
        this.appService.showLoading();
        this.routeService.getTicketsByRoute(routeId).subscribe((getTicketsByRouteResponse) => {
            if (!getTicketsByRouteResponse.status) {
                this.appService.hideLoading();
                this.toastService.showToast(getTicketsByRouteResponse.message, 'error-toast');
                this.ticketsLoaded = true;
                return;
            }
            this.ticketList = getTicketsByRouteResponse.data;
            this.appService.hideLoading();
            this.ticketsLoaded = true;
        }, error => {
            this.toastService.showToast(ERROR_MSG, 'error-toast');
            this.appService.hideLoading();
            this.ticketsLoaded = true;
            return;
        })
    }
}
