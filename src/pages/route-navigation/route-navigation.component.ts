import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { ToastService } from '../../services/toast-service';

declare var google;
@Component({
    selector: 'route-navigation',
    templateUrl: 'route-navigation.template.html'
})
export class RouteNavigationComponent {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'chicago, il';
    end = 'chicago, il';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    formattedAdress: any;
    sourceAddress: any;
    destinationAddress: any;
    autoCompleteItems: any = [];
    city: any;
    state: any;
    zipCode: any;
    location: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        private appService: AppService,
        private toastService: ToastService,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }
    ionViewDidLoad() {
        this.initMap(location);
    }

    initMap(location) {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
        });

        this.directionsDisplay.setMap(this.map);
    }

    calculateAndDisplayRoute(address: string) {
        this.directionsService.route({
            origin: this.sourceAddress,
            destination: this.destinationAddress,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
                console.log(response)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    /**
     * Address List
     * @param event
     */
    bindSourceAddresses(event): void {
        let env = this;
        if (this.sourceAddress === '') {
            this.autoCompleteItems = [];
            return;
        }
        let autoCompleteService = new google.maps.places.AutocompleteService();
        autoCompleteService.getPlacePredictions({ input: this.sourceAddress, componentRestrictions: { country: 'au' } }, function (predictions, status) {
            env.autoCompleteItems = predictions;
            console.log(env.autoCompleteItems);
        });
    }
    bindDestinationAddresses(event): void {
        let env = this;
        if (this.destinationAddress === '') {
            this.autoCompleteItems = [];
            return;
        }
        let autoCompleteService = new google.maps.places.AutocompleteService();
        autoCompleteService.getPlacePredictions({ input: this.destinationAddress, componentRestrictions: { country: 'au' } }, function (predictions, status) {
            env.autoCompleteItems = predictions;
            console.log(env.autoCompleteItems);
        });
    }

    /**
     * Choose Address
     * @param address
     */
    chooseItem(address: string) {
        this.formattedAdress = address;
        let env = this;
        let lat: number;
        let lng: number;
        this.appService.showLoading();

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (results[0] != null) {
                this.city = results[0].address_components[results[0].address_components.length - 4].long_name;
                this.state = results[0].address_components[results[0].address_components.length - 3].long_name;
                this.zipCode = results[0].address_components[results[0].address_components.length - 1].long_name;
            } else {
                this.toastService.showToast("Enter complete address!", 'error-toast');
                return;
            }

            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();

            let location = { lat: lat, lng: lng };
            this.location = location;
            env.initMap(location);
            this.appService.hideLoading();
        });
        this.dismiss();
    }

    /**
     * Dismiss Search
    */
    dismiss() {
        this.autoCompleteItems = [];
    }
}
