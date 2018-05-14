import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* Components */
import { LoginComponent } from '../pages/authorization/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { RouteListComponent } from '../pages/route-list/route-list.component';
import { TicketListComponent } from '../pages/ticket-list/ticket-list.component';
import { RouteNavigationComponent } from '../pages/route-navigation/route-navigation.component';

/* Services */
import { AppService } from './app.service';
import { AuthorizationService } from '../pages/authorization/authorization.service';
import { HttpService } from '../services/http.service';
import { HttpModule } from '@angular/http';
import { ToastService } from '../services/toast-service';
import { RouteService } from '../pages/route-list/route.service';
import { TicketService } from '../pages/ticket-list/ticket.service';

let pages = [
    HomeComponent,
    LoginComponent,
    RouteListComponent,
    TicketListComponent,
    RouteNavigationComponent,
    MyApp
];

export function declarations() {
    return [
        pages,
    ];
}

export function entryComponents() {
    return [
        pages
    ];
}

@NgModule({
    declarations: declarations(),
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom', tabsHideOnSubPages: true }),
    ],
    bootstrap: [IonicApp],
    entryComponents: entryComponents(),
    providers: [
        StatusBar,
        SplashScreen,
        AppService,
        AuthorizationService,
        HttpService,
        ToastService,
        RouteService,
        TicketService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
