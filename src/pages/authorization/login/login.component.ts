import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { APP_LOGO } from '../../../app/app.constants';

@Component({
    selector: 'login',
    templateUrl: 'login.template.html'
})
export class LoginComponent {

    logo: string = APP_LOGO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menu: MenuController
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }


}