import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class AppService {
    loading: any;
    constructor(
        public loadingCtrl: LoadingController,
    ) {
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: false
        });
        this.loading.present();
    }

    _removeMask(value) {
        value = value.replace(/\s/g, '');
        value = value.replace(/_/g, '');
        value = value.replace(/-/g, '');
        value = value.replace(/X/g, '');
        return value;
    }

    processPayment() {
        this.loading = this.loadingCtrl.create({
            content: 'Processing',
            dismissOnPageChange: false
        });
        this.loading.present();
    }

    hideLoading() {
        this.loading.dismiss();
    }
}
