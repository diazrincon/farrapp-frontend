import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string;

  constructor(private http: HttpClient, private authS: AuthService) {
    this.authS.getRoleId.subscribe(userId => {
      this.userId = userId;
    });
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend2}/api/users/${this.userId}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEventById(idCompany: string, idEstablishment: string, idEvent: string): Observable<any> {
    let headers: any;
    if (idCompany === this.userId) {
      headers = new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    console.log(localStorage.getItem('token'));
    return this.http.get<any>(`${environment.backend2}/api/companies/${idCompany}/establishments/${idEstablishment}/events/${idEvent}`,
      {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEstablishmentById(idCompany: string, id: string): Observable<any> {
    let headers: any;
    if (idCompany === this.userId) {
      headers = new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    return this.http.get<any>(`${environment.backend2}/api/companies/${idCompany}/establishments/${id}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changePassword(password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend2}/api/users/${this.userId}`, password, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEvents(): Observable<any> {
    let headers: any;
    if (this.userId !== '') {
      headers = new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    return this.http.get<any>(`${environment.backend2}/api/events`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEstablishments(): Observable<any> {
    let headers: any;
    if (this.userId !== '') {
      headers = new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
    } else {
      headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
    return this.http.get<any>(`${environment.backend2}/api/establishments`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
