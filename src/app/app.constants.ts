/* Global variables */
'use strict';

// export let BASE_URL: string = 'http://localhost:53559/';
export let BASE_URL: string = 'http://freshposapp.azurewebsites.net/';
export let APP_LOGO: string = 'assets/imgs/logo/freshposicon1.png';
export let ERROR_MSG: string = "Something went wrong please contact your administrator";
export let COMPANY_ID: number = 2;

export enum HTTP_REQUEST_TYPE {
    POST,
    GET,
    PUT
}

export enum PAYMENT_TYPE {
    PERCENTAGE,
    AMOUNT
}


/**
 * Enums definations ends here
 */


