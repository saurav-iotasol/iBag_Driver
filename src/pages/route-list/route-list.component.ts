import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RouteService } from './route.service';
import { ToastService } from '../../services/toast-service';
import { ERROR_MSG } from '../../app/app.constants';
import { AppService } from '../../app/app.service';
import { TicketListComponent } from '../ticket-list/ticket-list.component';

@Component({
    selector: 'route-list',
    templateUrl: 'route-list.template.html'
})
export class RouteListComponent {
    routeExpanded: boolean = false;
    routesLoaded: boolean = false;
    routeList: any = [];


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        private routeService: RouteService,
        private toastService: ToastService,
        private appService: AppService
    ) {
    }

    ngOnInit() {
        this.getRoutes();
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    getRoutes() {
        this.appService.showLoading();
        this.routeService.getRoutes().subscribe((getRoutesResponse) => {
            if (!getRoutesResponse.status) {
                this.appService.hideLoading();
                this.toastService.showToast(getRoutesResponse.message, 'error-toast');
                this.routesLoaded = true;
                return;
            }
            this.routeList = getRoutesResponse.data;
            this.appService.hideLoading();
            this.routesLoaded = true;
        }, error => {
            this.toastService.showToast(ERROR_MSG, 'error-toast');
            this.appService.hideLoading();
            this.routesLoaded = true;
            return;
        })
    }
    
    toggleRoute(route) {
        if (route.isExpanded) {
            route.isExpanded = false;
        }
        else
            route.isExpanded = true;
    }

    selectRoute(route) {
        this.navCtrl.push(TicketListComponent, { routeId: route.id });
    }
}
