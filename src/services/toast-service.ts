import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings'

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController) { }

    presentToast(message: string) {
        let toastItem = AppSettings.TOAST;
        toastItem["message"] = message;
        let toast = this.toastCtrl.create(toastItem);
        toast.present();
    }

    showToast(message, toastType) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            cssClass: toastType,
            dismissOnPageChange: false
        });
        toast.present();
    }

    networkToast(message, toastType) {
        let toast = this.toastCtrl.create({
            message: message,
            position: 'bottom',
            cssClass: toastType,
            dismissOnPageChange: false,
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        toast.onDidDismiss(() => {
            console.log("Toast buton clicked");
        });
        toast.present();
    }
}
