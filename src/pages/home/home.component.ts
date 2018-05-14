import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ERROR_MSG } from '../../app/app.constants';

@Component({
    selector: 'home',
    templateUrl: 'home.template.html'
})
export class HomeComponent {

    constructor(
        public navCtrl: NavController
    ) { }

}
