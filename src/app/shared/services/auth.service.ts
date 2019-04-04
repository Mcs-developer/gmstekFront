import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    get isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') ? true : false;
    }

    get getUserName(): any {
        let user;
        if (localStorage.getItem('currentUser')) {
            user = JSON.parse(localStorage.getItem('currentUser'));
        }
        return user ? user.userName : user;
    }

    register(username: string, email: string, password: string) {
        return this.http.post<any>(`${environment.api}/account/create`, { username, email , password })
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    }
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.api}/account/login`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
