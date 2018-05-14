import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/authorization/login/login.component';
import { RouteListComponent } from '../pages/route-list/route-list.component';
import { TicketListComponent } from '../pages/ticket-list/ticket-list.component';
import { RouteNavigationComponent } from '../pages/route-navigation/route-navigation.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(
        public platform: Platform,
        public menu: MenuController,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
    ) {
        this.initializeApp();
        this.pages = [
            { title: 'Login', component: LoginComponent, icon: 'md-log-in' },
            { title: 'Routes', component: RouteListComponent, icon: 'home' },
            { title: 'Navigation', component: RouteNavigationComponent, icon: 'home' },
        ];
    }

    ngOnInit() {

    }

    initializeApp() {
        this.platform.ready().then((resp) => {
            if (resp == 'cordova') {
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            let self = this;
            self.rootPage = HomeComponent;
        })
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    openPage(page) {
        this.menu.close();
        this.nav.push(page.component);
    }
}
