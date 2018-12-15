import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import deserializer, { deepDeserializeSig } from 'angular-http-deserializer';

@Injectable()
export class UserService {
    userArrayDeserializer: deepDeserializeSig<User[]> = deserializer<User[]>(User);
    userDeserializer: deepDeserializeSig<User> = deserializer<User>(User);
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${config.apiUrl}/users`)
            // Comment the below line out to see the user no longer serialized.
            .pipe(map(this.userArrayDeserializer))
            ;
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${config.apiUrl}/users/` + id)
            .pipe(map(this.userDeserializer))
            ;
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
}