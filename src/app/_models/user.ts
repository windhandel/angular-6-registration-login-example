import { converters, dataType } from 'angular-http-deserializer/decorators';
import { Role } from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    @converters({
        'number:': (value: number) => new Date(value)
    })
    signedIn: Date;
    
    @dataType(Role, true)
    roles: Role[];

    hasRole(role: string): boolean {
        return this.roles && this.roles.find(r => r.name == role) != null;
    }
}
