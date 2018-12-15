import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alert } from '../_models/alert';
import deserializer, { deepDeserializeSig } from 'angular-http-deserializer';

@Injectable()
export class AlertService {
    alertDeserializer: deepDeserializeSig<Alert> = deserializer<Alert>(Alert);
    
    private subject = new Subject<Alert>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({
            type: 'success',
            text: message
        });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({
            type: 'error',
            text: message
        });
    }

    getMessage(): Observable<Alert> {
        return this.subject.asObservable().pipe(map(this.alertDeserializer));
    }
}