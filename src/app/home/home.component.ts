import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import deserializer, { deepDeserializeSig } from 'angular-http-deserializer';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    userDeserializer: deepDeserializeSig<User> = deserializer<User>(User);
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser =  this.userDeserializer(JSON.parse(localStorage.getItem('currentUser')));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            users.map(user => console.log(`User ${user.firstName} + ${user.lastName} Is InstanceOf User: `, user instanceof User));
            this.users = users; 
        });
    }
}