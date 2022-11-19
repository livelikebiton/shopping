import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    
    private notification = new Notyf({ duration: 4000, ripple: false, position: { x: "right", y: "top" } });
    
    public success(message: string): void {
        this.notification.success(message);
    }
    
    public error(err: any): void {
        const message = this.getErrorMessage(err);
        this.notification.error(message);
    }
    
    private getErrorMessage(err: any) {

        if (typeof err === "string") {
            return err;
        }

        if (typeof err.error === "string") {
            return err.error;
        }

        if (Array.isArray(err.error)) {
            return err.error[0];
        }


        if (typeof err.response?.data === "string") {
            return err.response.data;
        }

        if (Array.isArray(err.response?.data)) {
            return err.response.data[0];
        }

        if (typeof err.message === "string") {
            return err.message;
        }

        return "Some error occurred, please try again.";
    }
}
